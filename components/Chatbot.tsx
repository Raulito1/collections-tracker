import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatbotProps {
  bucketContext?: string; // e.g., "0-30", "30-60", etc.
}

export const Chatbot: React.FC<ChatbotProps> = ({ bucketContext }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: bucketContext 
        ? `Hello! I'm your Seso Collections Assistant. I can help you with tasks for the ${bucketContext} days bucket. Try asking me to send reminder emails or analyze payment patterns.`
        : 'Hello! I\'m your Seso Collections Assistant. How can I help you today?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    // Email automation responses
    if (lowerMessage.includes('email') || lowerMessage.includes('send') || lowerMessage.includes('reminder')) {
      if (bucketContext) {
        return `I'll prepare reminder emails for all clients in the ${bucketContext} days bucket. This will include:\n\n✓ Personalized payment reminders\n✓ Outstanding invoice details\n✓ Payment portal links\n\nWould you like me to proceed with sending these emails?`;
      }
      return 'I can help you send reminder emails. Please specify which aging bucket you\'d like to target (0-30, 30-60, 60-90, or over 90 days).';
    }

    // Analysis requests
    if (lowerMessage.includes('analyze') || lowerMessage.includes('pattern') || lowerMessage.includes('report')) {
      return `I can analyze payment patterns for ${bucketContext || 'all buckets'}. Here's what I found:\n\n📊 Average days to payment: 45 days\n📈 Collection rate: 78%\n⚠️ High-risk accounts: 3\n\nWould you like a detailed breakdown?`;
    }

    // Follow-up suggestions
    if (lowerMessage.includes('follow up') || lowerMessage.includes('contact')) {
      return `Based on payment history, I recommend prioritizing these clients for follow-up:\n\n1. Acme Corp - $15,000 overdue\n2. TechStart Inc - $8,500 overdue\n3. BuildRight LLC - $6,200 overdue\n\nShall I draft personalized follow-up messages?`;
    }

    // Export/download requests
    if (lowerMessage.includes('export') || lowerMessage.includes('download') || lowerMessage.includes('csv')) {
      return `I can export the ${bucketContext || 'current'} data to CSV, Excel, or PDF format. Which format would you prefer?`;
    }

    // Confirmation responses
    if (lowerMessage.includes('yes') || lowerMessage.includes('proceed') || lowerMessage.includes('confirm')) {
      return '✅ Task initiated! I\'ll process this request. You\'ll receive a confirmation once complete. (Note: This is a demo - actual API integration pending)';
    }

    // Default helpful response
    return `I can help you with:\n\n📧 Send reminder emails to clients\n📊 Analyze payment patterns\n📋 Generate collection reports\n🎯 Prioritize follow-ups\n💾 Export data\n\nWhat would you like to do?`;
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot thinking time
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateBotResponse(inputValue),
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-seso-main hover:bg-seso-accent rounded-full shadow-lg flex items-center justify-center transition-all transform hover:scale-110 z-50"
          aria-label="Open chat"
        >
          <MessageCircle className="w-6 h-6 text-white" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-[#09090b] border border-white/10 rounded-2xl shadow-2xl flex flex-col z-50">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/10 bg-seso-main/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-seso-main rounded-full flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Seso Assistant</h3>
                <p className="text-xs text-gray-400">Collections Automation</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.sender === 'user'
                    ? 'bg-gradient-to-br from-seso-main to-seso-accent'
                    : 'bg-white/10'
                }`}>
                  {message.sender === 'user' ? (
                    <User className="w-4 h-4 text-white" />
                  ) : (
                    <Bot className="w-4 h-4 text-seso-accent" />
                  )}
                </div>
                <div className={`max-w-[75%] ${message.sender === 'user' ? 'items-end' : 'items-start'} flex flex-col`}>
                  <div className={`rounded-2xl px-4 py-2 ${
                    message.sender === 'user'
                      ? 'bg-seso-main text-white'
                      : 'bg-white/5 text-gray-200 border border-white/10'
                  }`}>
                    <p className="text-sm whitespace-pre-line">{message.text}</p>
                  </div>
                  <span className="text-xs text-gray-500 mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-seso-accent" />
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl px-4 py-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-white/10">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me to send emails, analyze data..."
                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-seso-accent transition-colors"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                className="w-10 h-10 bg-seso-main hover:bg-seso-accent disabled:opacity-50 disabled:cursor-not-allowed rounded-lg flex items-center justify-center transition-colors"
                aria-label="Send message"
              >
                <Send className="w-4 h-4 text-white" />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              Demo mode - API integration pending
            </p>
          </div>
        </div>
      )}
    </>
  );
};

