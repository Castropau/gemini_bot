"use client";
import { useState } from "react";
import { Settings, Send, X } from "lucide-react";
import { IoMdSend } from "react-icons/io";


interface ChatInputProps {
  onSend: (message: string) => void;
  onOpenSettings: () => void;
}

export default function ChatInput({ onSend, onOpenSettings }: ChatInputProps) {
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value);
  const handleSend = () => {
    if (message.trim()) {
      onSend(message.trim());
      setMessage("");
    }
  };
  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => e.key === "Enter" && handleSend();
  const handleClear = () => setMessage("");

  return (
    <div className="flex items-center p-2 bg-white shadow-md border-t border-gray-200">
      <textarea
        className="flex-1 px-3 py-2 rounded-2xl border border-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
        placeholder="Type a message..."
        value={message}
        onChange={handleChange}
        onKeyDown={handleKeyPress}
        rows={1}
      />

      {message && (
        <button onClick={handleClear} className="ml-2 text-gray-400 hover:text-gray-600">
          <X size={20} />
        </button>
      )}

      {/* <button
        onClick={onOpenSettings}
        className="ml-2 p-2 text-gray-500 hover:text-purple-600 rounded-full hover:bg-gray-100"
      >
        <Settings size={20} />
      </button> */}

      <button
        onClick={handleSend}
        disabled={!message.trim()}
        // className={`ml-2 p-2 rounded-full transition-all ${message.trim() ? "bg-blue-600 text-white hover:bg-blue-700" : " text-gray-400 cursor-not-allowed"}`}
                className={`ml-2 p-2 rounded-full transition-all ${message.trim() ? " text-black" : " text-gray-400 cursor-not-allowed"}`}

      >
        <IoMdSend size={20} />
      </button>
    </div>
  );
}
