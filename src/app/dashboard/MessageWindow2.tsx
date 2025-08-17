"use client";

import { useRef, useEffect } from "react";
import { ChatHistory } from "@/types";
import { UserCircle } from "lucide-react";
// import { FaRobot } from "react-icons/fa";
import { BsRobot } from "react-icons/bs";




interface MessageWindowProps {
  history: ChatHistory;
  isTyping?: boolean;
}

export default function MessageWindow({ history, isTyping }: MessageWindowProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history, isTyping]);

  return (
    <div className="flex-1 p-3 overflow-y-auto">
      <div className="max-w-3xl mx-auto space-y-3">
        {history.map((msg, index) => {
          const isUser = msg.role === "user";
          return (
            <div
              key={index}
              className={`flex ${isUser ? "justify-end" : "justify-start"}`}
            >
              {/* Bot avatar */}
              {!isUser && (
                <div className="mr-2 flex items-center justify-center w-8 h-8 rounded-full">
                  <BsRobot size={16} className="text-gray-700" />
                </div>
              )}

              {/* Message bubble */}
              <div
                className={`
                  px-4 py-2 rounded-lg shadow-sm max-w-xs sm:max-w-md break-words whitespace-pre-wrap
                  ${isUser ? "bg-gray-300 text-black rounded-br-none" : "bg-white text-gray-800 rounded-bl-none"}
                `}
              >
                {msg.parts.map((part, idx) => (
                  <span key={idx}>{part.text}</span>
                ))}
              </div>

              {/* User avatar */}
              {isUser && (
                
                // <div className="ml-2 flex items-center justify-center w-8 h-8 rounded-full bg-blue-500">
                <div className="ml-2 flex items-center justify-center w-8 h-8 rounded-full bg-blue-500">

                  <UserCircle size={16} className="text-white" />
                </div>
              )}
            </div>
          );
        })}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex justify-start items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
              <BsRobot size={16} className="text-gray-700 animate-pulse" />
            </div>
            <div className="bg-gray-200 text-gray-800 px-3 py-2 rounded-lg animate-pulse">
              Typing...
            </div>
          </div>
        )}

        {/* Invisible element to scroll to bottom */}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}
