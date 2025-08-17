// src/app/page.tsx
"use client";

import { useState, useEffect } from "react";
// import MessageWindow from "@/components/ui/MessageWindow";
// import ChatInput from "@/components/ui/ChatInput";
import SettingsModal from "@/components/ui/SettingsModal";
import { ChatHistory, ChatSettings, Message } from "@/types";
import { MessageCircle } from "lucide-react";
import MessageWindow from "./MessageWindow2";
import ChatInput from "./ChatInput";

export default function Home() {
  const [history, setHistory] = useState<ChatHistory>([]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [settings, setSettings] = useState<ChatSettings>({
    temperature: 1,
    model: "gemini-1.5-flash",
    systemInstruction: "you are a helpful assistant",
  });
  const [isTyping, setIsTyping] = useState(false); // ✅ Typing indicator

  useEffect(() => {
    if (isChatOpen && history.length === 0) {
      const greeting: Message = {
        role: "model",
        parts: [
          { text: "Hi! How can I help you today? Feel free to ask questions about Smartarksys." },
        ],
      };
      setHistory([greeting]);
    }
  }, [isChatOpen]);

  const handleSend = async (message: string) => {
    const newUserMessage: Message = { role: "user", parts: [{ text: message }] };
    const updatedHistory = [...history, newUserMessage];
    setHistory(updatedHistory);

    setIsTyping(true); // start typing

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userMessage: message, history: updatedHistory, settings }),
      });

      const data = await response.json();
      if (data.error) {
        console.error("AI Error:", data.error);
        setIsTyping(false);
        return;
      }

      const aiMessage: Message = { role: "model", parts: [{ text: data.response }] };
      setHistory([...updatedHistory, aiMessage]);
    } catch (error) {
      console.error("Request Failed:", error);
    } finally {
      setIsTyping(false); // stop typing
    }
  };

  return (
    <div className="relative h-screen w-screen bg-gray-50">
      {/* Chat icon */}
      {!isChatOpen && (
        <div
          className="fixed right-4 top-1/2 transform -translate-y-1/2 cursor-pointer z-50"
          onClick={() => setIsChatOpen(true)}
        >
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-600 shadow-lg hover:bg-blue-700 transition-colors">
            <MessageCircle size={28} className="text-white" />
          </div>
           <div className="absolute right-20 top-1/2 transform -translate-y-1/2 text-gray-700 font-semibold text-sm">
            <p>Assist to our chatbot!</p>
          </div>
        </div>
      )}

      {/* Fullscreen chat modal */}
      {isChatOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-white">
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b shadow-sm">
            <h2 className="text-lg font-semibold">Smartarksys Assistant</h2>
            <button
              className="text-gray-500 hover:text-gray-700"
              onClick={() => setIsChatOpen(false)}
            >
              ✕
            </button>
          </div>

          {/* Chat history */}
          <div className="flex-1 overflow-y-auto p-3">
            <MessageWindow history={history} />
            {/* Typing indicator */}
            {isTyping && (
              <div className="flex items-center space-x-2 mt-2">
                <div className="w-3 h-3 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-3 h-3 bg-gray-400 rounded-full animate-bounce delay-150"></div>
                <div className="w-3 h-3 bg-gray-400 rounded-full animate-bounce delay-300"></div>
                <span className="text-gray-500 text-sm">Smartarksys is typing...</span>
              </div>
            )}
          </div>

          {/* Chat input */}
          <ChatInput onSend={handleSend} onOpenSettings={() => setIsSettingsOpen(true)} />
        </div>
      )}

      {/* Settings modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onSave={(newSettings) => setSettings(newSettings)}
        currentSettings={settings}
      />

      {/* Landing content */}
      <div className="h-full flex items-center justify-center text-center px-4">
        <div>
          <h1 className="text-4xl font-bold text-gray-800">
            Welcome to Smartarksys AI Assistant
          </h1>
          <p className="mt-4 text-gray-600">
            Click the chat icon on the left to start a conversation.
          </p>
        </div>
      </div>



      <div className="h-full flex items-center justify-center text-center px-4">
        <div>
          <h1 className="text-4xl font-bold text-gray-800">
            Welcome to Smartarksys AI Assistant
          </h1>
          <p className="mt-4 text-gray-600">
            Click the chat icon on the left to start a conversation.
          </p>
        </div>
      </div>
      
    </div>
  );
}
