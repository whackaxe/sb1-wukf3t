import React from 'react';
import { MessageCircle } from 'lucide-react';

interface Message {
  text: string;
  isBot: boolean;
}

interface ChatSession {
  id: string;
  messages: Message[];
}

interface ChatHistoryProps {
  sessions: ChatSession[];
  onNewChat: () => void;
  onSelectChat: (id: string) => void;
  onClear: () => void;
}

export function ChatHistory({
  sessions,
  onNewChat,
  onSelectChat,
  onClear,
}: ChatHistoryProps) {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="bg-gray-50 w-64 border-r p-4 hidden md:block">
      {/* Header with Clear Button */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-gray-700">Chat History</h2>
        <button
          onClick={onClear}
          className="text-sm text-red-600 hover:text-red-700"
        >
          Clear
        </button>
      </div>

      {/* New Chat Button */}
      <button
        onClick={onNewChat}
        className="flex items-center gap-2 bg-white rounded-lg p-3 shadow-sm w-full mb-3 hover:bg-gray-100 transition-colors"
      >
        <MessageCircle className="w-4 h-4 text-indigo-600" />
        <span className="text-sm font-medium text-gray-800">New Chat</span>
      </button>

      {/* List of Existing Chats */}
      <div className="space-y-2">
        {sessions.map((session) => {
          const firstMessage = session.messages[0];
          const lastMessage = session.messages[session.messages.length - 1];
          const date = session.messages.length ? formatDate(new Date()) : ''; // Replace with an actual date if you store it

          return (
            <div
              key={session.id}
              onClick={() => onSelectChat(session.id)}
              className="bg-white rounded-lg p-3 shadow-sm cursor-pointer hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-2 mb-1">
                <MessageCircle className="w-4 h-4 text-indigo-600" />
                <span className="text-sm font-medium text-gray-800">
                  {firstMessage?.text.slice(0, 20) || 'Untitled Chat'}
                </span>
              </div>
              {date && <div className="text-xs text-gray-500 mb-1">{date}</div>}
              {lastMessage && (
                <div className="text-sm text-gray-600 line-clamp-2">
                  {lastMessage.text}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
