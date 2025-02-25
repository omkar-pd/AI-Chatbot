"use client"

import type React from "react"

import { useState, useEffect } from "react"
import ChatMessage from "../components/ChatMessage"
import ChatInput from "../components/ChatInput"

type Message = {
  id: number
  content: string
  role: "user" | "assistant"
}
export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    // Simulating initial message from the assistant
    setMessages([{ id: 1, content: "Hello! How can I assist you today?", role: "assistant" }])
  }, [])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = { id: messages.length + 1, content: input, role: "user" }
    setMessages((prev) => [...prev, userMessage])
    setInput("")

    // Simulate AI response
    setIsTyping(true)
    setTimeout(() => {
      const aiMessage: Message = {
        id: messages.length + 2,
        content:
          "This is a simulated response from the AI. You can replace this with actual responses from your server.",
        role: "assistant",
      }
      setMessages((prev) => [...prev, aiMessage])
      setIsTyping(false)
    }, 1000)
  }

  return (
    <div className="flex flex-col  bg-gray-100 h-[90vh]">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">AI Chatbot</h1>
        </div>
      </header>
      <main className="flex-grow overflow-auto p-6">
        <div className="max-w-3xl mx-auto space-y-4">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          {isTyping && <div className="text-gray-500 text-sm">AI is typing...</div>}
        </div>
      </main>
      <footer className="bg-white border-t border-gray-200 p-4">
        <div className="max-w-3xl mx-auto">
          <ChatInput input={input} setInput={setInput} onSubmit={handleSubmit} />
        </div>
      </footer>
    </div>
  )
}

