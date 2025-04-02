"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Plus, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"

type Todo = {
  id: string
  text: string
  completed: boolean
  category: "urgent" | "important" | "routine" | "self-care"
}

const categoryColors = {
  urgent: "bg-red-100 text-red-800 border-red-200",
  important: "bg-amber-100 text-amber-800 border-amber-200",
  routine: "bg-blue-100 text-blue-800 border-blue-200",
  "self-care": "bg-green-100 text-green-800 border-green-200",
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([
    {
      id: "1",
      text: "Schedule pediatrician appointment",
      completed: false,
      category: "important",
    },
    {
      id: "2",
      text: "Buy diapers and wipes",
      completed: false,
      category: "urgent",
    },
    {
      id: "3",
      text: "Prepare healthy snacks for the week",
      completed: true,
      category: "routine",
    },
    {
      id: "4",
      text: "Take a relaxing bath",
      completed: false,
      category: "self-care",
    },
  ])
  const [newTodo, setNewTodo] = useState("")
  const [newCategory, setNewCategory] = useState<Todo["category"]>("routine")

  const handleAddTodo = () => {
    if (!newTodo.trim()) return

    const todo: Todo = {
      id: Date.now().toString(),
      text: newTodo,
      completed: false,
      category: newCategory,
    }

    setTodos([...todos, todo])
    setNewTodo("")
  }

  const handleToggleTodo = (id: string) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }

  const handleDeleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-2">
          <Input
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new task..."
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAddTodo()
              }
            }}
          />
          <div className="flex">
            <select
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value as Todo["category"])}
              className="rounded-l-md border border-r-0 border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <option value="routine">Routine</option>
              <option value="important">Important</option>
              <option value="urgent">Urgent</option>
              <option value="self-care">Self-care</option>
            </select>
            <Button onClick={handleAddTodo} className="rounded-l-none" disabled={!newTodo.trim()}>
              <Plus className="h-4 w-4 mr-2" />
              Add
            </Button>
          </div>
        </div>
      </div>

      <div className="space-y-1">
        {todos.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">No tasks yet. Add some tasks to get started!</div>
        ) : (
          todos.map((todo) => (
            <div
              key={todo.id}
              className={cn(
                "flex items-center justify-between p-4 rounded-lg border",
                todo.completed ? "bg-muted/50" : "bg-background",
              )}
            >
              <div className="flex items-center space-x-3 flex-1">
                <Checkbox
                  id={`todo-${todo.id}`}
                  checked={todo.completed}
                  onCheckedChange={() => handleToggleTodo(todo.id)}
                />
                <div className="flex flex-col md:flex-row md:items-center gap-2 flex-1">
                  <Label
                    htmlFor={`todo-${todo.id}`}
                    className={cn("flex-1", todo.completed ? "line-through text-muted-foreground" : "")}
                  >
                    {todo.text}
                  </Label>
                  <span className={cn("text-xs px-2 py-1 rounded-full border", categoryColors[todo.category])}>
                    {todo.category.charAt(0).toUpperCase() + todo.category.slice(1)}
                  </span>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDeleteTodo(todo.id)}
                className="text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Delete</span>
              </Button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

