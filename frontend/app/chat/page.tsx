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

  const getResponse = async (query) => {
    try {
      const res = await fetch("http://0.0.0.0:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      if (!res.body) {
        throw new Error("No response body");
      }

      // Read the response stream
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let result = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        result += chunk;

        // Update AI message in real-time
        setMessages((prev) => {
          const lastMessage = prev[prev.length - 1];
          if (lastMessage && lastMessage.role === "assistant") {
            return prev.map((msg, index) =>
              index === prev.length - 1 ? { ...msg, content: result } : msg
            );
          }
          return [...prev, { id: prev.length + 1, content: result, role: "assistant" }];
        });
      }
    } catch (err) {
      console.error("Error fetching response:", err);
    }
  };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = { id: messages.length + 1, content: input, role: "user" };
    setMessages((prev) => [...prev, userMessage]);

    setInput("");

    // Simulate AI response
    setIsTyping(true);
    await getResponse(input);
    setIsTyping(false);
  };


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

