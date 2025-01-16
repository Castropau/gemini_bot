// src/components/ui/MessageWindow.tsx

"use client";

import { Message, ChatHistory } from "@/types";

interface MessageWindowProps {
  history: ChatHistory;
}

export default function MessageWindow({ history }: MessageWindowProps) {
  return (
    <div className="flex-1 p-4 overflow-y-auto">
      {history.map((msg, index) => (
        <div
          key={index}
          className={`mb-4 flex ${
            msg.role === "user" ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`max-w-xs px-4 py-2 rounded-lg ${
              msg.role === "user"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            {msg.parts.map((part, idx) => (
              <span key={idx}>{part.text}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}