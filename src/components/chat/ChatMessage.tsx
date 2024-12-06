import React from 'react';
import { Bot, User } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface ChatMessageProps {
  message: string;
  isBot: boolean;
}

export function ChatMessage({ message, isBot }: ChatMessageProps) {
  return (
    <div className={`flex gap-3 ${isBot ? 'bg-gray-50' : ''} p-4 rounded-lg`}>
      {isBot ? (
        <Bot className="w-6 h-6 text-indigo-600 flex-shrink-0" />
      ) : (
        <User className="w-6 h-6 text-gray-600 flex-shrink-0" />
      )}
      <div className="flex-1 prose prose-sm max-w-none">
        <ReactMarkdown>{message}</ReactMarkdown>
      </div>
    </div>
  );
}