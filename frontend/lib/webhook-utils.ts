// This file contains utility functions for working with webhook data

// Function to verify webhook signature
export function verifyWebhookSignature(signature: string, payload: string, secret: string): boolean {
  // In a real implementation, you would use crypto to verify HMAC signatures
  // This is a simplified example
  const crypto = require("crypto")
  const hmac = crypto.createHmac("sha256", secret)
  const expectedSignature = hmac.update(payload).digest("hex")
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))
}

// Function to process webhook data and return formatted data for the UI
export function processWebhookData(data: any) {
  // Process different types of webhook data
  switch (data.type) {
    case "insight":
      return {
        type: "insight",
        title: data.title || "New Parenting Insight",
        content: data.content || "No content provided",
        timestamp: data.timestamp || new Date().toISOString(),
        priority: data.priority || "normal",
      }
    case "reminder":
      return {
        type: "reminder",
        title: data.title || "Reminder",
        dueDate: data.dueDate || new Date().toISOString(),
        description: data.description || "",
        completed: data.completed || false,
      }
    case "memory":
      return {
        type: "memory",
        title: data.title || "New Memory",
        description: data.description || "",
        date: data.date || new Date().toISOString(),
        category: data.category || "moment",
        imageUrl: data.imageUrl,
      }
    default:
      return data
  }
}

// Add this function to check if we're in a preview environment

// Function to check if we're in a preview environment
export function isPreviewEnvironment(): boolean {
  if (typeof window === "undefined") return false

  // Check for common preview environment indicators
  const hostname = window.location.hostname
  return (
    hostname.includes("vercel.app") ||
    hostname.includes("localhost") ||
    hostname.includes("127.0.0.1") ||
    hostname.includes("preview")
  )
}

// Update the storeWebhookData function to handle preview mode
export function storeWebhookData(key: string, data: any) {
  if (typeof window !== "undefined") {
    try {
      const existingData = localStorage.getItem(key)
      const dataArray = existingData ? JSON.parse(existingData) : []

      // Add a unique ID if not present
      const newData = {
        ...data,
        id: data.id || `webhook-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      }

      // Add to the beginning of the array for newest first
      dataArray.unshift(newData)

      // Limit array size to prevent localStorage from getting too large
      const limitedArray = dataArray.slice(0, 50)

      localStorage.setItem(key, JSON.stringify(limitedArray))
      return true
    } catch (error) {
      console.error("Error storing webhook data:", error)
      return false
    }
  }
  return false
}

// Function to retrieve stored webhook data
export function getStoredWebhookData(key: string) {
  if (typeof window !== "undefined") {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : []
  }
  return []
}

