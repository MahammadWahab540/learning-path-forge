
import React, { useState } from "react";
import Button from "./Button";
import { toast } from "sonner";

interface ChatWidgetProps {
  className?: string;
}

const ChatWidget: React.FC<ChatWidgetProps> = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<Array<{ type: "user" | "bot"; text: string }>>([
    { type: "bot", text: "Hello! How can I help you with your learning today?" },
  ]);

  const handleSend = () => {
    if (!message.trim()) return;
    
    // Add user message to chat
    setChatHistory([...chatHistory, { type: "user", text: message }]);
    
    // Mock response from the system
    setTimeout(() => {
      let response;
      if (message.toLowerCase().includes("hello") || message.toLowerCase().includes("hi")) {
        response = "Hello there! How can I assist with your learning today?";
      } else if (message.toLowerCase().includes("help")) {
        response = "I can help you with explanations, additional learning resources, or clarity on lesson topics. What specifically would you like help with?";
      } else if (message.toLowerCase().includes("difficult") || message.toLowerCase().includes("hard") || message.toLowerCase().includes("confused")) {
        response = "It's normal to find certain concepts challenging! Breaking it down into smaller parts and practicing with examples usually helps. Would you like me to explain any specific concept?";
      } else {
        response = "I'll echo what you said: " + message;
      }
      setChatHistory(prev => [...prev, { type: "bot", text: response }]);
    }, 1000);
    
    // Clear input
    setMessage("");
  };

  return (
    <div className={className}>
      {!isOpen ? (
        <button
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-brand-blue text-white flex items-center justify-center shadow-lg hover:bg-brand-blue/90 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue"
          onClick={() => setIsOpen(true)}
          aria-label="Open chat"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </button>
      ) : (
        <div className="fixed bottom-6 right-6 w-80 h-96 bg-white dark:bg-gray-800 rounded-lg shadow-xl flex flex-col overflow-hidden border border-gray-200 dark:border-gray-700">
          <div className="bg-brand-blue text-white p-4 flex justify-between items-center">
            <h3 className="font-medium">Learning Assistant</h3>
            <button 
              className="text-white hover:text-gray-200 focus:outline-none"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {chatHistory.map((entry, index) => (
              <div 
                key={index} 
                className={`${
                  entry.type === "user" ? "ml-auto bg-brand-purple text-white" : "mr-auto bg-gray-100 dark:bg-gray-700 text-black dark:text-white"
                } p-3 rounded-lg max-w-[85%]`}
              >
                {entry.text}
              </div>
            ))}
          </div>
          
          <div className="p-3 border-t border-gray-200 dark:border-gray-700 flex">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type your message..."
              className="flex-1 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-l-md py-2 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-brand-blue dark:text-white"
            />
            <button
              onClick={handleSend}
              className="bg-brand-blue hover:bg-brand-blue/90 text-white px-4 py-2 rounded-r-md focus:outline-none focus:ring-1 focus:ring-brand-blue"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
