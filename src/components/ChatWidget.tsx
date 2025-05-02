
import React, { useState, useRef, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Search, Plus, Send, MessageSquare } from "lucide-react";
import { toast } from "sonner";
import { Command, CommandInput, CommandList, CommandEmpty } from "@/components/ui/command";

interface ChatWidgetProps {
  className?: string;
}

const ChatWidget: React.FC<ChatWidgetProps> = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [chatHistory, setChatHistory] = useState<Array<{ type: "user" | "bot"; text: string }>>([
    { type: "bot", text: "Hello! How can I help you with your learning today?" },
  ]);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestedPrompts = [
    {
      icon: <Plus size={14} />,
      text: "Draft social media copy for the UX product launch."
    },
    {
      icon: <Plus size={14} />,
      text: "Summarize action items for this lesson."
    },
    {
      icon: <Plus size={14} />,
      text: "What are the key concepts in this lesson?"
    }
  ];

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    
    // Add user message to chat
    setChatHistory([...chatHistory, { type: "user", text: inputValue }]);
    
    // Mock response from the system
    setTimeout(() => {
      let response;
      if (inputValue.toLowerCase().includes("hello") || inputValue.toLowerCase().includes("hi")) {
        response = "Hello there! How can I assist with your learning today?";
      } else if (inputValue.toLowerCase().includes("help")) {
        response = "I can help you with explanations, additional learning resources, or clarity on lesson topics. What specifically would you like help with?";
      } else if (inputValue.toLowerCase().includes("difficult") || inputValue.toLowerCase().includes("hard") || inputValue.toLowerCase().includes("confused")) {
        response = "It's normal to find certain concepts challenging! Breaking it down into smaller parts and practicing with examples usually helps. Would you like me to explain any specific concept?";
      } else {
        response = "Thank you for your message. I'm here to help with any questions about this lesson. Is there anything specific you'd like to know more about?";
      }
      setChatHistory(prev => [...prev, { type: "bot", text: response }]);
    }, 1000);
    
    // Clear input
    setInputValue("");
  };

  const handlePromptClick = (promptText: string) => {
    setInputValue(promptText);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className={className}>
      {!isOpen ? (
        <button
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-brand-blue text-white flex items-center justify-center shadow-lg hover:bg-brand-blue/90 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue"
          onClick={() => setIsOpen(true)}
          aria-label="Open chat"
        >
          <MessageSquare className="h-6 w-6" />
        </button>
      ) : (
        <div className="fixed bottom-6 right-6 w-[95%] sm:w-[450px] bg-white dark:bg-gray-800 rounded-lg shadow-xl flex flex-col overflow-hidden border border-gray-200 dark:border-gray-700">
          <div className="bg-white dark:bg-gray-800 p-4 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
            <h3 className="font-medium text-lg">Learning Assistant</h3>
            <button 
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50 dark:bg-gray-900 max-h-[300px]">
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
          
          <div className="p-3 bg-white dark:bg-gray-800">
            <div className={`rounded-lg border ${isFocused ? 'border-brand-blue' : 'border-gray-200 dark:border-gray-700'} bg-white dark:bg-gray-800 overflow-hidden`}>
              <div className="flex items-center p-2">
                <Search className="w-5 h-5 text-gray-400 ml-1 mr-2" />
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ask anything..."
                  className="flex-1 bg-transparent border-0 focus:ring-0 text-sm focus:outline-none py-1 px-0"
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                />
                <button
                  onClick={handleSend}
                  disabled={!inputValue.trim()}
                  className={`p-1.5 rounded-md ${inputValue.trim() ? 'text-brand-blue hover:bg-gray-100 dark:hover:bg-gray-700' : 'text-gray-300 dark:text-gray-600'}`}
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            {inputValue.length === 0 && (
              <div className="mt-4 grid grid-cols-1 gap-2">
                {suggestedPrompts.map((prompt, idx) => (
                  <button 
                    key={idx}
                    onClick={() => handlePromptClick(prompt.text)}
                    className="flex items-center gap-2 text-sm p-2 rounded-lg bg-blue-50 dark:bg-gray-700 text-left hover:bg-blue-100 dark:hover:bg-gray-600 transition-colors"
                  >
                    <span className="flex-shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-300">
                      {prompt.icon}
                    </span>
                    <span className="text-gray-700 dark:text-gray-200 text-sm">{prompt.text}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
