"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, Image, Plus, Quote, Star, Trophy } from "lucide-react"
import { cn } from "@/lib/utils"

type Memory = {
  id: string
  title: string
  description: string
  date: Date
  type: "milestone" | "quote" | "moment" | "photo"
  imageUrl?: string
}

export default function MemoryBook() {
  const [memories, setMemories] = useState<Memory[]>([
    {
      id: "1",
      title: "First Steps",
      description: "Emma took her first steps today! She was so proud of herself.",
      date: new Date(2023, 5, 15),
      type: "milestone",
    },
    {
      id: "2",
      title: "Funny Quote",
      description: '"Mom, when I grow up, I want to be a dinosaur!"',
      date: new Date(2023, 7, 22),
      type: "quote",
    },
    {
      id: "3",
      title: "Beach Day",
      description: "We had such a wonderful day at the beach. The kids built the biggest sandcastle!",
      date: new Date(2023, 8, 5),
      type: "moment",
      imageUrl: "/placeholder.svg?height=300&width=400",
    },
  ])

  const [isAdding, setIsAdding] = useState(false)
  const [newMemory, setNewMemory] = useState<Partial<Memory>>({
    title: "",
    description: "",
    date: new Date(),
    type: "moment",
  })

  const handleAddMemory = () => {
    if (!newMemory.title || !newMemory.description) return

    const memory: Memory = {
      id: Date.now().toString(),
      title: newMemory.title,
      description: newMemory.description,
      date: newMemory.date || new Date(),
      type: newMemory.type as Memory["type"],
      imageUrl: newMemory.type === "photo" ? "/placeholder.svg?height=300&width=400" : undefined,
    }

    setMemories([memory, ...memories])
    setNewMemory({
      title: "",
      description: "",
      date: new Date(),
      type: "moment",
    })
    setIsAdding(false)
  }

  const getMemoryIcon = (type: Memory["type"]) => {
    switch (type) {
      case "milestone":
        return <Trophy className="h-5 w-5" />
      case "quote":
        return <Quote className="h-5 w-5" />
      case "photo":
        return <Image className="h-5 w-5" />
      default:
        return <Star className="h-5 w-5" />
    }
  }

  const getMemoryColor = (type: Memory["type"]) => {
    switch (type) {
      case "milestone":
        return "bg-amber-100 text-amber-800 border-amber-200"
      case "quote":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "photo":
        return "bg-purple-100 text-purple-800 border-purple-200"
      default:
        return "bg-green-100 text-green-800 border-green-200"
    }
  }

  return (
    <div className="space-y-6">
      <Button onClick={() => setIsAdding(!isAdding)} className="w-full md:w-auto">
        <Plus className="h-4 w-4 mr-2" />
        Add New Memory
      </Button>

      {isAdding && (
        <Card className="border-border/50 bg-muted/30">
          <CardContent className="pt-6">
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={newMemory.title}
                  onChange={(e) => setNewMemory({ ...newMemory, title: e.target.value })}
                  placeholder="What's this memory about?"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newMemory.description}
                  onChange={(e) => setNewMemory({ ...newMemory, description: e.target.value })}
                  placeholder="Describe this special moment..."
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {newMemory.date ? format(newMemory.date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={newMemory.date}
                        onSelect={(date) => setNewMemory({ ...newMemory, date })}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label>Type</Label>
                  <select
                    value={newMemory.type}
                    onChange={(e) => setNewMemory({ ...newMemory, type: e.target.value as Memory["type"] })}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <option value="moment">Special Moment</option>
                    <option value="milestone">Milestone</option>
                    <option value="quote">Quote</option>
                    <option value="photo">Photo</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <Button variant="outline" onClick={() => setIsAdding(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddMemory} disabled={!newMemory.title || !newMemory.description}>
                  Save Memory
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="space-y-6">
        {memories.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No memories yet. Start capturing your special moments!
          </div>
        ) : (
          memories.map((memory) => (
            <Card key={memory.id} className="overflow-hidden border-border/50 hover:shadow-md transition-shadow">
              <div className="relative">
                {memory.imageUrl && (
                  <div className="w-full h-48 overflow-hidden">
                    <img
                      src={memory.imageUrl || "/placeholder.svg"}
                      alt={memory.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="absolute top-4 right-4">
                  <span
                    className={cn(
                      "flex items-center gap-1 text-xs px-2 py-1 rounded-full border",
                      getMemoryColor(memory.type),
                    )}
                  >
                    {getMemoryIcon(memory.type)}
                    {memory.type.charAt(0).toUpperCase() + memory.type.slice(1)}
                  </span>
                </div>
              </div>
              <CardContent className={cn("p-6", !memory.imageUrl && "pt-10")}>
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-lg">{memory.title}</h3>
                    <span className="text-sm text-muted-foreground">
                      {format(new Date(memory.date), "MMM d, yyyy")}
                    </span>
                  </div>
                  <p className="text-muted-foreground">
                    {memory.type === "quote" ? (
                      <span className="italic">"{memory.description}"</span>
                    ) : (
                      memory.description
                    )}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}

