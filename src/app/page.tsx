"use client";

import { useState, useEffect } from "react";
import ChatInput from "@/components/ui/ChatInput";
import MessageWindow from "@/components/ui/MessageWindow";
import SettingsModal from "@/components/ui/SettingsModal";
import { ChatHistory, ChatSettings, Message, MessageRole } from "@/types";

export default function Home() {
  const [history, setHistory] = useState<ChatHistory>([]);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [settings, setSettings] = useState<ChatSettings>({
    temperature: 1,
    model: "gemini-1.5-flash",
    systemInstruction: "you are a helpful assistant",
  });

  // 👇 Add greeting ONLY to UI, not sent to Gemini
  useEffect(() => {
    if (history.length === 0) {
      setHistory([
        {
          role: "model" as MessageRole,
          parts: [{ text: "Good day! 👋 Ask a question about Smartarksys." }],
        },
      ]);
    }
  }, [history]);

  const handleSend = async (message: string) => {
    const newUserMessage: Message = {
      role: "user" as MessageRole,
      parts: [{ text: message }],
    };

    // Keep UI history (including greeting)
    const updatedHistory = [...history, newUserMessage];
    setHistory(updatedHistory);

    try {
      // 👇 Send only "real" messages to API (exclude greeting)
      const filteredHistory = updatedHistory.filter(
        (msg) => msg.role === "user" || msg.role === "model"
      ).filter(
        (_, idx) => !(idx === 0 && history[0]?.role === "model") // drop greeting
      );

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userMessage: message,
          history: filteredHistory,
          settings: settings,
        }),
      });

      const data = await response.json();

      if (data.error) {
        console.error("AI Error:", data.error);
        return;
      }

      const aiMessage: Message = {
        role: "model" as MessageRole,
        parts: [{ text: data.response }],
      };

      setHistory([...updatedHistory, aiMessage]);
    } catch (error) {
      console.error("Request Failed:", error);
    }
  };

  return (
    <div className="flex flex-col py-32">
      <MessageWindow history={history} />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onSave={(newSettings) => setSettings(newSettings)}
        currentSettings={settings}
      />
      <ChatInput onSend={handleSend} onOpenSettings={() => setIsSettingsOpen(true)} />
    </div>
  );
}
