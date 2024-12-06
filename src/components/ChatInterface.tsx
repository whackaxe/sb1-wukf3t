import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { ChatMessage } from './ChatMessage';
import { sendMessage } from '../api';

export function ChatInterface() {
  const [messages, setMessages] = useState<Array<{ text: string; isBot: boolean }>>([
    { text: "Hello! I'm your university assistant. How can I help you today?", isBot: true },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setInput('');
    setMessages((prev) => [...prev, { text: userMessage, isBot: false }]);
    setIsLoading(true);

    try {
      const history = messages.map((msg) => msg.text);
      const response = await sendMessage(userMessage, history);
      setMessages((prev) => [...prev, { text: response.response, isBot: true }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { text: 'Sorry, I encountered an error. Please try again.', isBot: true },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <ChatMessage key={index} message={message.text} isBot={message.isBot} />
        ))}
        {isLoading && (
          <div className="flex gap-2 items-center text-gray-500 p-4">
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-indigo-500 border-t-transparent" />
            Thinking...
          </div>
        )}
      </div>

      <div className="border-t p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={handleSend}
            disabled={isLoading}
            className="bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700 transition duration-200 disabled:opacity-50"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}