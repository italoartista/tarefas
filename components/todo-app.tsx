'use client'

import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Trash2, Edit2 } from 'lucide-react'

type Todo = {
  id: string
  text: string
  completed: boolean
}

export function TodoAppComponent() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodo, setNewTodo] = useState('')

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault()
    if (newTodo.trim()) {
      setTodos([...todos, { id: uuidv4(), text: newTodo.trim(), completed: false }])
      setNewTodo('')
    }
  }

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const removeTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const updateTodo = (id: string, newText: string) => {
    if (newText.trim()) {
      setTodos(todos.map(todo =>
        todo.id === id ? { ...todo, text: newText.trim() } : todo
      ))
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto mt-10">
      <CardHeader>
        <CardTitle>Lista de Tarefas</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={addTodo} className="flex mb-4">
          <Input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Adicionar nova tarefa"
            className="flex-grow mr-2"
          />
          <Button type="submit">Adicionar</Button>
        </form>
        <div className="space-y-2">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={toggleTodo}
              onRemove={removeTodo}
              onUpdate={updateTodo}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function TodoItem({ todo, onToggle, onRemove, onUpdate }: {
  todo: Todo
  onToggle: (id: string) => void
  onRemove: (id: string) => void
  onUpdate: (id: string, newText: string) => void
}) {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(todo.text)

  const handleUpdate = () => {
    onUpdate(todo.id, editText)
    setIsEditing(false)
  }

  return (
    <div className="flex items-center justify-between p-2 border rounded">
      {isEditing ? (
        <Input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleUpdate}
          onKeyPress={(e) => e.key === 'Enter' && handleUpdate()}
          className="flex-grow mr-2"
        />
      ) : (
        <div className="flex items-center flex-grow">
          <Checkbox
            id={`todo-${todo.id}`}
            data-test='checkbox'
            checked={todo.completed}
            onCheckedChange={() => onToggle(todo.id)}
          />
          <Label
            htmlFor={`todo-${todo.id}`}
            className={`ml-2 ${todo.completed ? 'line-through text-gray-500' : ''}`}
          >
            {todo.text}
          </Label>
        </div>
      )}
      <div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsEditing(!isEditing)}
          className="mr-2"
        >
          <Edit2 className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          data-test='delete'
          onClick={() => onRemove(todo.id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}