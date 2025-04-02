//geminiclone/src/components/ui/MessageWindow.tsx
"use client";

import { useRef, useEffect } from "react";
import { ChatHistory } from "@/types";

interface MessageWindowProps {
  history: ChatHistory;
}

export default function MessageWindow({ history }: MessageWindowProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);
  return (
    <div className="flex-1 p-3 overflow-y-auto ">
      <div className="max-w-3xl mx-auto">
        {history.map((msg, index) => {
          return (
            <div
              key={index}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              } `}
            >
              <div
                className={`
                  px-4 py-2 shadow-sm
                  ${
                    msg.role === "user"
                      ? "bg-purple-600 text-white rounded-br-none"
                      : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-bl-none"
                  }
                 rounded-lg
                  max-w-xs sm:max-w-md
                `}
              >
                <div className="whitespace-pre-wrap break-words">
                  {msg.parts.map((part, idx) => (
                    <span key={idx}>{part.text}</span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}

        {/* Invisible element to help scroll to bottom */}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}
