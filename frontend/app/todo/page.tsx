import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import TodoList from "@/components/todo-list"

export default function TodoPage() {
  return (
    <div className="container py-10 max-w-5xl">
      <div className="flex flex-col space-y-6">
        <div className="space-y-2 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full overflow-hidden">
              <img src="/images/logo.png" alt="Parent Whisperer Logo" className="w-full h-full object-cover" />
            </div>
          </div>
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary">To-Do List</h1>
          <p className="text-muted-foreground max-w-[700px] mx-auto">
            Stay organized with a simple, intuitive task manager designed for busy parents.
          </p>
        </div>

        <Card className="border-border/50 shadow-sm">
          <CardHeader>
            <CardTitle>Your Parenting Tasks</CardTitle>
            <CardDescription>Keep track of important tasks and never forget a thing.</CardDescription>
          </CardHeader>
          <CardContent>
            <TodoList />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

