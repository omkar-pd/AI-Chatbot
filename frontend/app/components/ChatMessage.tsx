interface ChatMessageProps {
    message: {
      content: string
      role: "user" | "assistant"
    }
  }
  
  export default function ChatMessage({ message }: ChatMessageProps) {
    return (
      <div className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
        <div
          className={`max-w-sm rounded-lg p-4 ${
            message.role === "user" ? "bg-blue-500 text-white" : "bg-white text-gray-800"
          }`}
        >
          <p>{message.content}</p>
        </div>
      </div>
    )
  }
  
  