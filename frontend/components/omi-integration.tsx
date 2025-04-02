"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Link, Unlink } from "lucide-react"

export default function OmiIntegration() {
  const [isConnected, setIsConnected] = useState(false)
  const [deviceId, setDeviceId] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleConnect = () => {
    if (!deviceId.trim()) return

    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsConnected(true)
      setIsLoading(false)
    }, 1500)
  }

  const handleDisconnect = () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsConnected(false)
      setDeviceId("")
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="space-y-6">
      {!isConnected ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Connect Your Device</h3>
              <p className="text-muted-foreground">
                Enter your Omi device ID to connect and start syncing your data with Parent Whisperer.
              </p>
              <div className="space-y-2">
                <Label htmlFor="deviceId">Omi Device ID</Label>
                <Input
                  id="deviceId"
                  value={deviceId}
                  onChange={(e) => setDeviceId(e.target.value)}
                  placeholder="Enter your device ID (e.g., OMI-12345)"
                />
              </div>
              <Button onClick={handleConnect} disabled={!deviceId.trim() || isLoading} className="w-full md:w-auto">
                {isLoading ? "Connecting..." : "Connect Device"}
                <Link className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Benefits of Connecting</h3>
              <ul className="space-y-2">
                {[
                  "Track your child's sleep patterns",
                  "Monitor activity levels throughout the day",
                  "Receive personalized parenting insights",
                  "Set reminders for important activities",
                  "Share data with healthcare providers",
                ].map((benefit, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <Card className="bg-muted/30 border-border/50">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">
                <strong>Note:</strong> You can find your Omi device ID on the back of your wearable or in the Omi mobile
                app under Settings &gt; Device Information.
              </p>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <p className="text-green-800">Your OMi device is successfully connected!</p>
          </div>

          <Card className="border-border/50">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Device Information</h3>
                  <Button variant="outline" size="sm" onClick={handleDisconnect} disabled={isLoading}>
                    {isLoading ? "Disconnecting..." : "Disconnect"}
                    <Unlink className="ml-2 h-4 w-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Device ID</p>
                    <p className="font-medium">{deviceId}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Status</p>
                    <p className="font-medium text-green-600">Connected</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Last Synced</p>
                    <p className="font-medium">Just now</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Battery Level</p>
                    <p className="font-medium">85%</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Connected Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  title: "Sleep Tracking",
                  description: "Monitor your child's sleep patterns and quality",
                  icon: "🌙",
                },
                {
                  title: "Activity Monitoring",
                  description: "Track daily activity levels and exercise",
                  icon: "🏃‍♂️",
                },
                {
                  title: "Health Insights",
                  description: "Receive personalized health recommendations",
                  icon: "❤️",
                },
              ].map((feature, index) => (
                <Card key={index} className="border-border/50">
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    <div className="text-3xl mb-2">{feature.icon}</div>
                    <h4 className="font-medium">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

