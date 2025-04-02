"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getStoredWebhookData } from "@/lib/webhook-utils"
import { Badge } from "@/components/ui/badge"

// This component displays real-time insights received from webhooks
export default function RealTimeInsights() {
  const [insights, setInsights] = useState<any[]>([])

  useEffect(() => {
    // Load initial insights from storage
    setInsights(getStoredWebhookData("insights"))

    // Set up an interval to check for new insights
    const intervalId = setInterval(() => {
      const latestInsights = getStoredWebhookData("insights")
      if (JSON.stringify(latestInsights) !== JSON.stringify(insights)) {
        setInsights(latestInsights)
      }
    }, 5000)

    return () => clearInterval(intervalId)
  }, []) // Remove insights.length from the dependency array to avoid excessive re-renders

  if (insights.length === 0) {
    return (
      <Card className="border-border/50 shadow-sm">
        <CardHeader>
          <CardTitle>Parenting Insights</CardTitle>
          <CardDescription>Real-time personalized insights will appear here as they become available.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            No insights yet. Connect your Omi device to start receiving personalized parenting insights.
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-border/50 shadow-sm">
      <CardHeader>
        <CardTitle>Parenting Insights</CardTitle>
        <CardDescription>Personalized insights based on your parenting journey</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {insights.map((insight) => (
            <Card key={insight.id} className="border-border/50">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium">{insight.title}</h3>
                  <Badge variant={insight.priority === "high" ? "destructive" : "secondary"}>
                    {insight.priority === "high" ? "Important" : "Tip"}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{insight.content}</p>
                <p className="text-xs text-muted-foreground mt-2">{new Date(insight.timestamp).toLocaleString()}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

