import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import ChatInterface from "@/components/chat-interface"

export default function ChatPage() {
  return (
    <div className="container py-10 max-w-5xl">
      <div className="flex flex-col space-y-6">
        <div className="space-y-2 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full overflow-hidden">
              <img src="/images/logo.png" alt="Parent Whisperer Logo" className="w-full h-full object-cover" />
            </div>
          </div>
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary">Parenting Chat</h1>
          <p className="text-muted-foreground max-w-[700px] mx-auto">
            Get advice, support, and answers to your parenting questions anytime.
          </p>
        </div>

        <Card className="border-border/50 shadow-sm">
          <CardHeader>
            <CardTitle>Chat with Parent Whisperer</CardTitle>
            <CardDescription>Ask any parenting question and get supportive, helpful advice.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChatInterface />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

