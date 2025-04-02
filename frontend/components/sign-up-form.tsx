"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle } from "lucide-react"

export default function SignUpForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState("account")
  const [deviceId, setDeviceId] = useState("")
  const [connectOmi, setConnectOmi] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      // Handle success
    }, 1500)
  }

  return (
    <Card className="w-full shadow-lg border-border/50">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center text-primary">Create an Account</CardTitle>
        <CardDescription className="text-center">
          Enter your information to get started with Parent Whisperer
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={currentStep} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="account" onClick={() => setCurrentStep("account")}>
              Account
            </TabsTrigger>
            <TabsTrigger value="omi" onClick={() => setCurrentStep("omi")}>
              Omi Device
            </TabsTrigger>
          </TabsList>

          <TabsContent value="account" className="space-y-4">
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="Jane" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Doe" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="jane.doe@example.com" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input id="confirmPassword" type="password" required />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" />
                <Label htmlFor="terms" className="text-sm font-normal">
                  I agree to the{" "}
                  <a href="/terms" className="text-primary hover:underline">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="/privacy" className="text-primary hover:underline">
                    Privacy Policy
                  </a>
                </Label>
              </div>

              <div className="pt-2">
                <Button type="button" className="w-full rounded-full" onClick={() => setCurrentStep("omi")}>
                  Continue
                </Button>
              </div>
            </form>
          </TabsContent>

          <TabsContent value="omi" className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="connectOmi"
                  checked={connectOmi}
                  onCheckedChange={(checked) => {
                    if (checked === true || checked === false) {
                      setConnectOmi(checked)
                    }
                  }}
                />
                <Label htmlFor="connectOmi" className="font-medium">
                  Connect an Omi device
                </Label>
              </div>

              {connectOmi && (
                <div className="space-y-4 p-4 bg-muted/30 rounded-md">
                  <div className="space-y-2">
                    <Label htmlFor="deviceId">Omi Device ID</Label>
                    <Input
                      id="deviceId"
                      value={deviceId}
                      onChange={(e) => setDeviceId(e.target.value)}
                      placeholder="Enter your device ID (e.g., OMI-12345)"
                    />
                    <p className="text-xs text-muted-foreground">
                      You can find your Omi device ID on the back of your wearable or in the Omi mobile app under
                      Settings &gt; Device Information.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium">Benefits of connecting:</p>
                    <ul className="space-y-1">
                      {["Receive personalized parenting insights", "Keep track of to-do lists", "Record memories"].map(
                        (benefit, index) => (
                          <li key={index} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-primary" />
                            <span>{benefit}</span>
                          </li>
                        ),
                      )}
                    </ul>
                  </div>
                </div>
              )}

              {!connectOmi && (
                <p className="text-sm text-muted-foreground">
                  You can always connect your Omi device later from your account settings.
                </p>
              )}

              <div className="flex flex-col space-y-2 pt-2">
                <Button
                  type="submit"
                  className="w-full rounded-full"
                  disabled={isLoading || (connectOmi && !deviceId.trim())}
                  onClick={handleSubmit}
                >
                  {isLoading ? "Creating Account..." : "Create Account"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full rounded-full"
                  onClick={() => setCurrentStep("account")}
                >
                  Back
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex flex-col">
        <div className="text-center text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-primary hover:underline">
            Sign in
          </a>
        </div>
      </CardFooter>
    </Card>
  )
}

