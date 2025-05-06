
import React, { useState, useRef, useEffect } from "react";
import { Plus, Search, Send, Mic, Volume } from "lucide-react";
import { toast } from "sonner";

interface ChatWidgetProps {
  className?: string;
}

const ChatWidget: React.FC<ChatWidgetProps> = ({ className }) => {
  const [inputValue, setInputValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [chatHistory, setChatHistory] = useState<Array<{ type: "user" | "bot"; text: string }>>([
    { type: "bot", text: "Hello! How can I help you with your learning today?" },
  ]);
  
  const inputRef = useRef<HTMLInputElement>(null);

  // Suggested actions
  const suggestedActions = [
    {
      icon: <Plus size={14} />,
      text: "Search",
      action: "search"
    },
    {
      icon: <Plus size={14} />,
      text: "Deep research",
      action: "research" 
    },
    {
      icon: <Plus size={14} />,
      text: "Create image",
      action: "image"
    }
  ];

  // Questions or topics the user might be interested in
  const suggestedQuestions = [
    "What are the key concepts in this lesson?",
    "Explain this topic in simpler terms",
    "Give me practice exercises for this concept",
    "How does this relate to real-world applications?"
  ];

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

  const handleActionClick = (action: string) => {
    let message = "";
    switch(action) {
      case "search":
        message = "Searching for relevant information...";
        break;
      case "research":
        message = "Initiating deeper research on this topic...";
        break;
      case "image":
        message = "Creating visual representation of this concept...";
        break;
      default:
        message = "Processing your request...";
    }
    
    toast.info(message);
  };

  const handleQuestionClick = (question: string) => {
    setInputValue(question);
    // Focus the input
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className={`w-full bg-gray-50 dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 ${className}`}>
      {/* Chat history section */}
      <div className="p-4 overflow-y-auto max-h-[300px] space-y-4 mb-2">
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
      
      {/* Main input area */}
      <div className="p-4 bg-white dark:bg-gray-800 rounded-b-lg border-t border-gray-200 dark:border-gray-700">
        <div className="text-center text-xl text-gray-700 dark:text-gray-300 mb-4">
          Ready when you are.
        </div>

        {/* Input field with search icon */}
        <div className={`rounded-full border ${isFocused ? 'border-brand-blue ring-2 ring-blue-100 dark:ring-blue-900' : 'border-gray-300 dark:border-gray-600'} bg-white dark:bg-gray-800 mb-4`}>
          <div className="flex items-center p-2">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask anything..."
              className="flex-1 bg-transparent border-0 focus:ring-0 text-sm focus:outline-none px-3 py-2"
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
            {inputValue.trim() ? (
              <button
                onClick={handleSend}
                className="p-2 rounded-full text-gray-500 hover:text-brand-blue hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <Send className="w-5 h-5" />
              </button>
            ) : (
              <div className="flex space-x-1 mx-2">
                <button className="p-2 rounded-full text-gray-500 hover:text-brand-blue hover:bg-gray-100 dark:hover:bg-gray-700">
                  <Mic className="w-5 h-5" />
                </button>
                <button className="p-2 rounded-full text-gray-500 hover:text-brand-blue hover:bg-gray-100 dark:hover:bg-gray-700">
                  <Volume className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Suggested actions - shown when no input */}
        {!inputValue.trim() && (
          <>
            <div className="flex flex-wrap gap-2 justify-center mb-4">
              {suggestedActions.map((action, idx) => (
                <button 
                  key={idx}
                  onClick={() => handleActionClick(action.action)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 text-sm transition-colors"
                >
                  <span className="w-5 h-5 flex items-center justify-center">
                    {action.icon}
                  </span>
                  <span>{action.text}</span>
                </button>
              ))}
              <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 text-sm transition-colors">
                <span>···</span>
              </button>
            </div>

            {/* Suggested questions */}
            <div className="mt-6">
              <div className="text-sm text-gray-500 mb-3">Suggested questions:</div>
              <div className="grid grid-cols-1 gap-2">
                {suggestedQuestions.map((question, idx) => (
                  <button 
                    key={idx}
                    onClick={() => handleQuestionClick(question)}
                    className="text-left p-3 rounded-lg bg-blue-50 dark:bg-gray-700 hover:bg-blue-100 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 text-sm transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ChatWidget;
