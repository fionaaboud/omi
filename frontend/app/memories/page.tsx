import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import MemoryBook from "@/components/memory-book"

export default function MemoriesPage() {
  return (
    <div className="container py-10 max-w-5xl">
      <div className="flex flex-col space-y-6">
        <div className="space-y-2 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full overflow-hidden">
              <img src="/images/logo.png" alt="Parent Whisperer Logo" className="w-full h-full object-cover" />
            </div>
          </div>
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary">Memory Book</h1>
          <p className="text-muted-foreground max-w-[700px] mx-auto">
            Capture and cherish special moments, milestones, and quotes from your children.
          </p>
        </div>

        <Card className="border-border/50 shadow-sm">
          <CardHeader>
            <CardTitle>Your Family Memories</CardTitle>
            <CardDescription>Record the precious moments that make parenting so special.</CardDescription>
          </CardHeader>
          <CardContent>
            <MemoryBook />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

