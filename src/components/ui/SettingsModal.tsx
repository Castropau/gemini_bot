// src/components/ui/SettingsModal.tsx

"use client";

import { useState } from "react";
import { Settings } from "lucide-react";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (settings: {
    temperature: number;
    model: string;
    systemInstruction: string;
  }) => void;
  currentSettings: {
    temperature: number;
    model: string;
    systemInstruction: string;
  };
}

export default function SettingsModal({
  isOpen,
  onClose,
  onSave,
  currentSettings,
}: SettingsModalProps) {
  const [temperature, setTemperature] = useState(currentSettings.temperature);
  const [model, setModel] = useState(currentSettings.model);
  const [systemInstruction, setSystemInstruction] = useState(
    currentSettings.systemInstruction
  );

  if (!isOpen) return null;

  const handleSave = () => {
    onSave({ temperature, model, systemInstruction });
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-80">
        <h2 className="text-xl mb-4">Settings</h2>
        <div className="mb-4">
          <label className="block text-sm mb-1">Temperature</label>
          <input
            type="number"
            min="0"
            max="2"
            step="0.1"
            value={temperature}
            onChange={(e) => setTemperature(parseFloat(e.target.value))}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm mb-1">Model</label>
          <input
            type="text"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="gemini-1.5-flash"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm mb-1">System Instruction</label>
          <textarea
            value={systemInstruction}
            onChange={(e) => setSystemInstruction(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            rows={3}
          ></textarea>
        </div>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 mr-2 border rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}