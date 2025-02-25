import type { FormEvent } from "react"

interface ChatInputProps {
  input: string
  setInput: (input: string) => void
  onSubmit: (e: FormEvent<HTMLFormElement>) => void
}

export default function ChatInput({ input, setInput, onSubmit }: ChatInputProps) {
  return (
    <form onSubmit={onSubmit} className="flex space-x-4">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message..."
        className="flex-grow rounded-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="rounded-full bg-blue-500 px-6 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Send
      </button>
    </form>
  )
}

