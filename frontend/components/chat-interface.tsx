"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Send } from "lucide-react"

type Message = {
  id: string
  content: string
  sender: "user" | "assistant"
  timestamp: Date
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm Parent Whisperer. How can I help with your parenting journey today?",
      sender: "assistant",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSendMessage = () => {
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: getRandomResponse(),
        sender: "assistant",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1500)
  }

  const getRandomResponse = () => {
    const responses = [
      "That's a common concern many parents face. Try establishing a consistent bedtime routine with calming activities like reading or gentle music.",
      "It's completely normal to feel overwhelmed sometimes. Remember to take small breaks for self-care when possible.",
      "Children thrive on consistency and clear boundaries. Try setting simple, age-appropriate rules and stick to them.",
      "That developmental stage can be challenging! Remember that it's temporary and actually shows your child is growing in independence.",
      "Have you tried involving your child in the process? Sometimes giving them a sense of ownership can help with cooperation.",
    ]

    return responses[Math.floor(Math.random() * responses.length)]
  }

  return (
    <div className="flex flex-col h-[600px]">
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/30 rounded-md">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`flex gap-3 max-w-[80%] ${message.sender === "user" ? "flex-row-reverse" : "flex-row"}`}>
              <Avatar className={message.sender === "assistant" ? "bg-transparent p-0 overflow-hidden" : "bg-muted"}>
                {message.sender === "assistant" ? (
                  <img src="/images/logo.png" alt="Parent Whisperer" className="h-full w-full object-cover" />
                ) : (
                  <AvatarFallback>ME</AvatarFallback>
                )}
              </Avatar>
              <div
                className={`p-4 rounded-2xl ${
                  message.sender === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-background border border-border/50"
                }`}
              >
                <p>{message.content}</p>
                <p className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex gap-3">
              <Avatar className="bg-transparent p-0 overflow-hidden">
                <img src="/images/logo.png" alt="Parent Whisperer" className="h-full w-full object-cover" />
              </Avatar>
              <div className="p-4 rounded-2xl bg-background border border-border/50">
                <div className="flex space-x-2">
                  <div
                    className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  ></div>
                  <div
                    className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  ></div>
                  <div
                    className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="p-4 border-t border-border/50 bg-background rounded-b-md">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSendMessage()
          }}
          className="flex items-center space-x-2"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1"
            disabled={isLoading}
          />
          <Button type="submit" size="icon" disabled={isLoading || !input.trim()} className="rounded-full">
            <Send className="h-4 w-4" />
            <span className="sr-only">Send message</span>
          </Button>
        </form>
      </div>
    </div>
  )
}

