// src/components/ui/ChatModal.tsx
"use client";

import { useState } from "react";
import MessageWindow from "./MessageWindow";
import ChatInput from "./ChatInput";
import { ChatHistory, ChatSettings } from "@/types";
import { X } from "lucide-react";

interface ChatModalProps {
  history: ChatHistory;
  onSend: (message: string) => void;
  settings: ChatSettings;
  isOpen: boolean;
  onClose: () => void;
}

export default function ChatModal({ history, onSend, settings, isOpen, onClose }: ChatModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-start px-4">
      {/* Background overlay */}
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal window */}
      <div className="relative z-50 w-80 h-[500px] bg-white shadow-lg rounded-lg flex flex-col overflow-hidden ml-2">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          <X size={20} />
        </button>

        {/* Chat messages */}
        <MessageWindow history={history} />

        {/* Chat input */}
        <ChatInput onSend={onSend} onOpenSettings={() => {}} />
      </div>
    </div>
  );
}
