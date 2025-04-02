"use client"

import { useEffect, useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { processWebhookData, storeWebhookData, getStoredWebhookData } from "@/lib/webhook-utils"

export default function WebhookListener() {
  const { toast } = useToast()
  const [connected, setConnected] = useState(false)
  const [usingPolling, setUsingPolling] = useState(false)

  // Setup polling as a fallback for real-time updates
  const setupPolling = () => {
    setUsingPolling(true)

    // Mock data for demonstration in preview mode
    const mockData = [
      {
        type: "insight",
        title: "Sleep Pattern Detected",
        content:
          "Your child seems to sleep better after a warm bath. Consider making this part of your bedtime routine.",
        timestamp: new Date().toISOString(),
        priority: "normal",
      },
      {
        type: "reminder",
        title: "Pediatrician Appointment",
        dueDate: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
        description: "Annual checkup with Dr. Smith",
        completed: false,
      },
    ]

    // Store initial mock data if none exists
    const existingInsights = getStoredWebhookData("insights")
    if (existingInsights.length === 0) {
      storeWebhookData("insights", mockData[0])
    }

    const existingReminders = getStoredWebhookData("reminders")
    if (existingReminders.length === 0) {
      storeWebhookData("reminders", mockData[1])
    }

    // Set up polling interval to check for new data
    const pollInterval = setInterval(() => {
      // In a real app, this would make an API call to check for new data
      console.log("Polling for new webhook data...")

      // Simulate receiving new data occasionally (every ~5 polls)
      if (Math.random() < 0.2) {
        const randomIndex = Math.floor(Math.random() * mockData.length)
        const newData = {
          ...mockData[randomIndex],
          title: `${mockData[randomIndex].title} (${new Date().toLocaleTimeString()})`,
          timestamp: new Date().toISOString(),
        }
        console.log("Received new data via polling:", newData)
        handleNewData(newData)
      }
    }, 30000) // Poll every 30 seconds

    return () => clearInterval(pollInterval)
  }

  // Function to handle new data regardless of source (WebSocket or polling)
  const handleNewData = (data: any) => {
    // Process the data based on its type
    const processedData = processWebhookData(data)

    // Store the data for use in the UI
    if (data.type === "insight") {
      storeWebhookData("insights", processedData)
      toast({
        title: "New Parenting Insight",
        description: processedData.title,
      })
    } else if (data.type === "reminder") {
      storeWebhookData("reminders", processedData)
      toast({
        title: "New Reminder",
        description: processedData.title,
      })
    } else if (data.type === "memory") {
      storeWebhookData("memories", processedData)
      toast({
        title: "New Memory",
        description: processedData.title,
      })
    }
  }

  useEffect(() => {
    // Try WebSocket first, fall back to polling if WebSocket fails
    const websocketUrl = process.env.NEXT_PUBLIC_WEBSOCKET_URL

    // If no WebSocket URL is provided, use polling immediately
    if (!websocketUrl) {
      console.log("No WebSocket URL provided, using polling instead")
      setupPolling()
      return
    }

    let socket: WebSocket | null = null
    let reconnectAttempts = 0
    const maxReconnectAttempts = 3
    let reconnectTimeout: NodeJS.Timeout | null = null

    const connectWebSocket = () => {
      try {
        socket = new WebSocket(websocketUrl)

        socket.onopen = () => {
          console.log("WebSocket connected")
          setConnected(true)
          reconnectAttempts = 0
        }

        socket.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data)
            console.log("Received webhook data via WebSocket:", data)
            handleNewData(data)
          } catch (error) {
            console.error("Error processing WebSocket message:", error)
          }
        }

        socket.onclose = (event) => {
          console.log("WebSocket disconnected:", event.code, event.reason)
          setConnected(false)

          // Attempt to reconnect if the connection was closed unexpectedly
          if (event.code !== 1000 && reconnectAttempts < maxReconnectAttempts) {
            reconnectAttempts++
            const timeout = Math.min(1000 * Math.pow(2, reconnectAttempts), 30000)
            console.log(`Attempting to reconnect in ${timeout}ms...`)

            if (reconnectTimeout) clearTimeout(reconnectTimeout)
            reconnectTimeout = setTimeout(connectWebSocket, timeout)
          } else if (reconnectAttempts >= maxReconnectAttempts) {
            console.log("Max reconnect attempts reached, falling back to polling")
            setupPolling()
          }
        }

        socket.onerror = (error) => {
          console.error("WebSocket error:", error)
          // If we get an error on the first connection attempt, switch to polling
          if (reconnectAttempts === 0) {
            console.log("Initial WebSocket connection failed, falling back to polling")
            if (socket) {
              socket.close()
              socket = null
            }
            setupPolling()
          }
        }
      } catch (error) {
        console.error("Error connecting to WebSocket:", error)
        setupPolling()
      }
    }

    // Start with WebSocket connection
    connectWebSocket()

    // Clean up
    return () => {
      if (socket) {
        socket.close(1000, "Component unmounted")
      }
      if (reconnectTimeout) {
        clearTimeout(reconnectTimeout)
      }
    }
  }, [toast])

  // This component doesn't render anything visible
  return null
}

