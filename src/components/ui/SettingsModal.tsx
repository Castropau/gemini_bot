"use client";

import { useState, useEffect } from "react";
import { X, Sliders, Bot, FileText } from "lucide-react";

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

// Models data
const MODEL_OPTIONS = [
  { id: "gemini-2.5-pro-exp-03-25", name: "Gemini 2.5 Pro Experimental 03-25", tag: "NEW" },
  { id: "gemini-2.0-flash", name: "Gemini 2.0 Flash", tag: "" },
  { id: "gemini-2.0-flash-exp-image-generation", name: "Gemini 2.0 Flash (Image Generation)", tag: "HOT" },
  { id: "gemini-2.0-flash-lite", name: "Gemini 2.0 Flash-Lite", tag: "" },
  { id: "gemini-2.0-flash-thinking-exp-01-21", name: "Gemini 2.0 Flash Thinking Experimental", tag: "" }
];

export default function SettingsModal({
  isOpen, onClose, onSave, currentSettings
}: SettingsModalProps) {
  const [temperature, setTemperature] = useState(currentSettings.temperature);
  const [model, setModel] = useState(currentSettings.model);
  const [systemInstruction, setSystemInstruction] = useState(currentSettings.systemInstruction);
  const [modelDropdownOpen, setModelDropdownOpen] = useState(false);

  // Reset states when modal opens
  useEffect(() => {
    if (isOpen) {
      setTemperature(currentSettings.temperature);
      setModel(currentSettings.model);
      setSystemInstruction(currentSettings.systemInstruction);
    }
  }, [isOpen, currentSettings]);

  // Handle backdrop and escape key
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => { if (isOpen && e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleEscKey);
    return () => window.removeEventListener("keydown", handleEscKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50 transition-all duration-200"
         onClick={handleBackdropClick}>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md mx-4 animate-in slide-in-from-bottom-10 duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b dark:border-gray-700">
          <h2 className="text-xl font-medium text-gray-800 dark:text-white">Settings</h2>
          <button onClick={onClose} className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700">
            <X size={20} />
          </button>
        </div>
        
        {/* Content */}
        <div className="p-5 max-h-[70vh] overflow-y-auto space-y-6">
          {/* Temperature */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sliders size={18} className="text-purple-500" />
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Temperature: {temperature.toFixed(1)}</label>
            </div>
            <input type="range" min="0" max="2" step="0.1" value={temperature}
                  onChange={(e) => setTemperature(parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full accent-purple-600" />
            <div className="mt-2 grid grid-cols-3 text-xs text-gray-500 dark:text-gray-400">
              <div>More predictable</div>
              <div className="text-center">Balanced</div>
              <div className="text-right">More creative</div>
            </div>
          </div>

          {/* Model Selection */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Bot size={18} className="text-purple-500" />
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Model</label>
            </div>
            <div className="relative">
              <button type="button" className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 
                     rounded-xl text-left flex justify-between items-center shadow-sm hover:bg-gray-100 dark:hover:bg-gray-600"
                     onClick={() => setModelDropdownOpen(!modelDropdownOpen)}>
                <span className="truncate text-gray-800 dark:text-gray-200">{MODEL_OPTIONS.find(m => m.id === model)?.name || model}</span>
                <span className={`text-gray-400 transition-transform duration-200 ${modelDropdownOpen ? 'rotate-180' : ''}`}>▼</span>
              </button>
              
              {modelDropdownOpen && (
                <div className="absolute z-10 w-full mt-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 
                               rounded-xl shadow-lg max-h-64 overflow-y-auto">
                  {MODEL_OPTIONS.map((option) => (
                    <button key={option.id} className={`w-full p-3 text-left hover:bg-gray-100 dark:hover:bg-gray-600 
                                                       flex justify-between items-center first:rounded-t-xl last:rounded-b-xl
                                                       ${model === option.id ? 'bg-purple-50 dark:bg-purple-900/30 border-l-4 border-purple-500' : ''}`}
                            onClick={() => { setModel(option.id); setModelDropdownOpen(false); }}>
                      <span className="truncate text-gray-800 dark:text-gray-200">{option.name}</span>
                      {option.tag && (
                        <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${
                          option.tag === 'NEW' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300' : 
                          'bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-300'}`}>
                          {option.tag}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* System Instruction */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <FileText size={18} className="text-purple-500" />
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">System Instruction</label>
            </div>
            <textarea value={systemInstruction} onChange={(e) => setSystemInstruction(e.target.value)}
                     className="w-full p-3 border border-gray-200 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 
                               text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-purple-500 focus:outline-none shadow-sm"
                     rows={4} placeholder="Add system instructions..."></textarea>
          </div>
        </div>
        
        {/* Footer */}
        <div className="p-5 bg-gray-50 dark:bg-gray-800/50 border-t dark:border-gray-700 flex justify-end gap-3">
          <button onClick={onClose}
                 className="px-5 py-2.5 border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 
                           text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
            Cancel
          </button>
          <button onClick={() => { onSave({ temperature, model, systemInstruction }); onClose(); }}
                 className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl shadow-sm transition-colors">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}