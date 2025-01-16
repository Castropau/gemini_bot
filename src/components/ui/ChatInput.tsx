// src/components/ui/ChatInput.tsx

"use client";

import { useState } from "react";
import { Settings } from "lucide-react";

interface ChatInputProps {
  onSend: (message: string) => void;
  onOpenSettings: () => void;
}

export default function ChatInput({ onSend, onOpenSettings }: ChatInputProps) {
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleSend = () => {
    if (message.trim()) {
      onSend(message.trim());
      setMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="flex items-center p-4 border-t">
      <input
        type="text"
        className="flex-1 px-4 py-2 border rounded-md focus:outline-none"
        placeholder="Type your message..."
        value={message}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
      />
      <button
        className="ml-2 p-2 text-gray-500 hover:text-gray-700"
        onClick={onOpenSettings}
      >
        <Settings />
      </button>
      <button
        className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        onClick={handleSend}
      >
        Send
      </button>
    </div>
  );
}