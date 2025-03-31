"use client";

import { useRef, useEffect } from "react";
import {  ChatHistory } from "@/types";

interface MessageWindowProps {
  history: ChatHistory;
}

export default function MessageWindow({ history }: MessageWindowProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  // Check if message is the first in a consecutive group from the same sender
  const isFirstInGroup = (currentIndex: number): boolean => {
    if (currentIndex === 0) return true;
    const currentMsg = history[currentIndex];
    const prevMsg = history[currentIndex - 1];
    return currentMsg.role !== prevMsg.role;
  };

  // Check if message is the last in a consecutive group from the same sender
  const isLastInGroup = (currentIndex: number): boolean => {
    if (currentIndex === history.length - 1) return true;
    const currentMsg = history[currentIndex];
    const nextMsg = history[currentIndex + 1];
    return currentMsg.role !== nextMsg.role;
  };

  return (
    <div className="flex-1 p-3 overflow-y-auto ">
      <div className="max-w-3xl mx-auto">
        {history.map((msg, index) => {
          const isFirst = isFirstInGroup(index);
          const isLast = isLastInGroup(index);
          
          return (
            <div
              key={index}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              } ${index !== 0 && !isFirst ? "mt-1" : "mt-3"}`}
            >
              {/* Avatar for assistant (only shown for first message in group) */}
              {msg.role !== "user" && isFirst && (
                <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white mr-2 flex-shrink-0 shadow-sm">
                  A
                </div>
              )}
              
              {/* Spacer div when avatar is not shown */}
              {msg.role !== "user" && !isFirst && <div className="w-8 mr-2"></div>}
              
              {/* Message bubble with dynamic corners based on position in group */}
              <div
                className={`
                  px-4 py-2 shadow-sm
                  ${msg.role === "user" 
                    ? "bg-purple-600 text-white" 
                    : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                  }
                  ${isFirst && isLast 
                    ? `rounded-2xl ${msg.role === "user" ? "rounded-br-md" : "rounded-bl-md"}` 
                    : isFirst 
                      ? `${msg.role === "user" 
                          ? "rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl rounded-br-md" 
                          : "rounded-tl-2xl rounded-tr-2xl rounded-br-2xl rounded-bl-md"
                        }` 
                      : isLast 
                        ? `${msg.role === "user" 
                            ? "rounded-tl-2xl rounded-bl-2xl rounded-br-md" 
                            : "rounded-tr-2xl rounded-br-2xl rounded-bl-md"
                          }` 
                        : `${msg.role === "user" 
                            ? "rounded-tl-2xl rounded-bl-2xl" 
                            : "rounded-tr-2xl rounded-br-2xl"
                          }`
                  }
                  max-w-xs sm:max-w-md
                `}
              >
                <div className="whitespace-pre-wrap break-words">
                  {msg.parts.map((part, idx) => (
                    <span key={idx}>{part.text}</span>
                  ))}
                </div>
              </div>
              
              {/* Avatar for user (only shown for first message in group) */}
              {msg.role === "user" && isFirst && (
                <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-gray-700 dark:text-gray-300 ml-2 flex-shrink-0 shadow-sm">
                  U
                </div>
              )}
              
              {/* Spacer div when avatar is not shown */}
              {msg.role === "user" && !isFirst && <div className="w-8 ml-2"></div>}
            </div>
          );
        })}
        
        {/* Invisible element to help scroll to bottom */}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}