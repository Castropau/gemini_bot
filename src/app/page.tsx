// src/app/page.tsx

"use client";

import { useState } from "react";
import ChatInput from "@/components/ui/ChatInput";
import MessageWindow from "@/components/ui/MessageWindow";
import SettingsModal from "@/components/ui/SettingsModal";
import { ChatHistory, ChatSettings } from "@/types";

export default function Home() {
  const [history, setHistory] = useState<ChatHistory>([]);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [settings, setSettings] = useState<ChatSettings>({
    temperature: 1,
    model: "gemini-1.5-flash",
    systemInstruction: "you are a helpful assistant",
  });

  const handleSend = async (message: string) => {
    const newUserMessage = {
      role: "user",
      parts: [{ text: message }],
    };

    const updatedHistory = [...history, newUserMessage];
    setHistory(updatedHistory);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userMessage: message,
          history: updatedHistory,
          settings: settings,
        }),
      });

      const data = await response.json();

      if (data.error) {
        console.error("AI Error:", data.error);
        return;
      }

      const aiMessage = {
        role: "model",
        parts: [{ text: data.response }],
      };

      setHistory([...updatedHistory, aiMessage]);
    } catch (error) {
      console.error("Request Failed:", error);
    }
  };

  const handleOpenSettings = () => {
    setIsSettingsOpen(true);
  };

  const handleCloseSettings = () => {
    setIsSettingsOpen(false);
  };

  const handleSaveSettings = (newSettings: ChatSettings) => {
    setSettings(newSettings);
  };

  return (
    <div className="flex flex-col h-screen">
      <MessageWindow history={history} />
      <ChatInput onSend={handleSend} onOpenSettings={handleOpenSettings} />
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={handleCloseSettings}
        onSave={handleSaveSettings}
        currentSettings={settings}
      />
    </div>
  );
}