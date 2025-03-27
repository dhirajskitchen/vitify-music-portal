
import React, { useState, useRef, useEffect } from "react";
import { Send, X, MessageCircle, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const initialMessages: Message[] = [
  {
    id: "1",
    content: "Hi there! I'm your music assistant. Ask me anything about artists, songs, charts, or news.",
    sender: "bot",
    timestamp: new Date()
  }
];

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      sender: "user",
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    
    // Simulate AI response
    setTimeout(() => {
      const botResponses = [
        "I found several new releases from your favorite artists this week. Would you like me to list them?",
        "Based on your interests, I think you might enjoy the latest album by HAIM.",
        "Taylor Swift is currently topping the charts with her new single.",
        "The upcoming Coachella lineup includes some amazing artists like Billie Eilish and Harry Styles.",
        "Drake and The Weeknd have both released new music recently. Their tracks are trending in the Top 10."
      ];
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: botResponses[Math.floor(Math.random() * botResponses.length)],
        sender: "bot",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const toggleChat = () => {
    setIsOpen(prev => !prev);
    if (!isOpen) {
      toast({
        title: "Chat Assistant",
        description: "Ask me anything about music, artists or trends!",
      });
    }
  };

  return (
    <>
      {/* Chat toggle button */}
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-vitify-800 dark:bg-vitify-700 text-white flex items-center justify-center shadow-lg hover:bg-vitify-700 dark:hover:bg-vitify-600 transition-all duration-300 group"
      >
        {isOpen ? (
          <X className="h-6 w-6 transform transition-transform duration-300 group-hover:rotate-90" />
        ) : (
          <MessageCircle className="h-6 w-6 transform transition-transform duration-300 group-hover:scale-110" />
        )}
      </button>
      
      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-96 max-w-[calc(100vw-3rem)] h-[32rem] max-h-[calc(100vh-10rem)] flex flex-col rounded-2xl overflow-hidden shadow-xl bg-white dark:bg-vitify-900 border border-vitify-200 dark:border-vitify-700/50 animate-scale-in">
          {/* Chat header */}
          <div className="p-4 bg-vitify-100 dark:bg-vitify-800/50 border-b border-vitify-200 dark:border-vitify-700/50 flex justify-between items-center">
            <div className="flex items-center">
              <Bot className="h-5 w-5 text-vitify-700 dark:text-vitify-300 mr-2" />
              <h3 className="font-semibold text-vitify-900 dark:text-white">Vitify Assistant</h3>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleChat}
              className="text-vitify-700 dark:text-vitify-300 hover:text-vitify-900 dark:hover:text-white hover:bg-vitify-200/50 dark:hover:bg-vitify-700/50"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Chat messages */}
          <div className="flex-grow overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div 
                  className={`max-w-[80%] rounded-2xl p-3 ${
                    msg.sender === "user" 
                      ? "bg-vitify-700 text-white rounded-tr-none" 
                      : "bg-vitify-100 dark:bg-vitify-800/40 text-vitify-900 dark:text-white rounded-tl-none"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    {msg.sender === "bot" ? (
                      <Bot className="h-4 w-4 text-vitify-700 dark:text-vitify-300" />
                    ) : (
                      <User className="h-4 w-4 text-white" />
                    )}
                    <span className={`text-xs ${msg.sender === "user" ? "text-white/80" : "text-vitify-600 dark:text-vitify-400"}`}>
                      {msg.sender === "bot" ? "Vitify" : "You"}
                    </span>
                  </div>
                  <p className="text-sm">{msg.content}</p>
                  <div className={`text-xs mt-1 text-right ${msg.sender === "user" ? "text-white/70" : "text-vitify-500 dark:text-vitify-500"}`}>
                    {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-2xl p-3 bg-vitify-100 dark:bg-vitify-800/40 text-vitify-900 dark:text-white rounded-tl-none">
                  <div className="flex items-center gap-2 mb-1">
                    <Bot className="h-4 w-4 text-vitify-700 dark:text-vitify-300" />
                    <span className="text-xs text-vitify-600 dark:text-vitify-400">Vitify</span>
                  </div>
                  <div className="flex space-x-1">
                    <div className="h-2 w-2 rounded-full bg-vitify-400 dark:bg-vitify-500 animate-pulse"></div>
                    <div className="h-2 w-2 rounded-full bg-vitify-400 dark:bg-vitify-500 animate-pulse" style={{ animationDelay: "0.2s" }}></div>
                    <div className="h-2 w-2 rounded-full bg-vitify-400 dark:bg-vitify-500 animate-pulse" style={{ animationDelay: "0.4s" }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          {/* Chat input */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-vitify-200 dark:border-vitify-700/50">
            <div className="flex gap-2">
              <Input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about music, artists or trends..."
                className="flex-grow rounded-full bg-vitify-100/70 dark:bg-vitify-800/30 border-vitify-200 dark:border-vitify-700/50 focus-visible:ring-vitify-300 dark:focus-visible:ring-vitify-600"
                disabled={isLoading}
              />
              <Button 
                type="submit" 
                size="icon" 
                disabled={isLoading || !input.trim()}
                className="rounded-full bg-vitify-700 dark:bg-vitify-600 text-white hover:bg-vitify-600 dark:hover:bg-vitify-500"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatBot;
