import React, { useState } from 'react';
import { ChatInput } from './ChatInput';
import { ChatMessageList } from './ChatMessageList';
import { ChatHeader } from './ChatHeader';
import { ChatHistory } from './ChatHistory';
import { sendMessage } from '../../api';

export function ChatInterface() {
  const [messages, setMessages] = useState<Array<{ text: string; isBot: boolean }>>([
    { text: "Hello! I'm your university assistant. How can I help you today?", isBot: true },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async (userMessage: string) => {
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

  const handleClearChat = () => {
    setMessages([
      { text: "Hello! I'm your university assistant. How can I help you today?", isBot: true },
    ]);
  };

  return (
    <div className="h-screen flex flex-col">
      <ChatHeader />
      <div className="flex-1 flex overflow-hidden">
        <ChatHistory messages={messages} onClear={handleClearChat} />
        <div className="flex-1 flex flex-col bg-white">
          <ChatMessageList messages={messages} isLoading={isLoading} />
          <ChatInput onSend={handleSend} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}