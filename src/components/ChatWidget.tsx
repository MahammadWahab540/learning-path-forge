
import React, { useState, useRef, useEffect } from "react";
import { Plus, Search, Send, Mic, Volume, Link, FileText } from "lucide-react";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

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

  // Questions or topics the user might be interested in
  const suggestedQuestions = [
    "What are the key concepts in this lesson?",
    "Explain this topic in simpler terms",
    "Give me practice exercises for this concept",
    "How does this relate to real-world applications?"
  ];

  // Web articles with summaries
  const webArticles = [
    {
      title: "Understanding JavaScript Promises",
      source: "MDN Web Docs",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise",
      summary: "A comprehensive guide to JavaScript Promises, explaining how to handle asynchronous operations elegantly. Covers Promise creation, chaining, error handling, and common patterns."
    },
    {
      title: "Modern CSS Layout Techniques",
      source: "CSS-Tricks",
      url: "https://css-tricks.com/guides/layout/",
      summary: "Explores the latest CSS layout methods including Grid, Flexbox, and positioning. Provides practical examples to build responsive and maintainable layouts."
    },
    {
      title: "React Hooks In Depth",
      source: "React Documentation",
      url: "https://reactjs.org/docs/hooks-intro.html",
      summary: "Detailed explanation of React Hooks and how they enable functional components to use state and lifecycle features. Covers useState, useEffect, useContext, and custom hooks."
    },
    {
      title: "Web Accessibility Guidelines",
      source: "W3C",
      url: "https://www.w3.org/WAI/standards-guidelines/",
      summary: "Official Web Content Accessibility Guidelines (WCAG) explaining how to make web content more accessible to people with disabilities. Essential knowledge for all web developers."
    },
    {
      title: "Introduction to GraphQL",
      source: "Apollo Blog",
      url: "https://www.apollographql.com/blog/graphql/basics/",
      summary: "Beginner-friendly introduction to GraphQL API technology. Explains how it differs from REST, its advantages, and how to implement basic queries and mutations."
    },
    {
      title: "Performance Optimization Strategies",
      source: "Web.dev",
      url: "https://web.dev/fast/",
      summary: "Google's comprehensive guide on web performance optimization. Covers critical rendering path, resource prioritization, lazy loading, and measuring performance metrics."
    },
    {
      title: "Understanding TypeScript's Type System",
      source: "TypeScript Handbook",
      url: "https://www.typescriptlang.org/docs/handbook/2/everyday-types.html",
      summary: "Deep dive into TypeScript's type system, covering basic and advanced types, type narrowing, type guards, and best practices for ensuring type safety in your projects."
    }
  ];

  // Case study data
  const caseStudy = {
    title: "Building a Scalable E-commerce Platform",
    company: "TechRetail Inc.",
    challenge: "TechRetail faced critical performance issues with their legacy e-commerce platform during peak shopping seasons, leading to lost sales and customer frustration.",
    solution: "The development team implemented a complete rebuild using React for the frontend, a GraphQL API layer, and a microservices architecture on the backend.",
    technologies: ["React", "GraphQL", "Node.js", "Redis", "PostgreSQL", "Docker", "Kubernetes"],
    results: [
      "Page load times reduced by 65%",
      "Shopping cart abandonment decreased by 28%",
      "Mobile conversions increased by 42%",
      "System maintained 99.99% uptime during Black Friday sales"
    ],
    learningPoints: [
      "Progressive loading strategies significantly impact perceived performance",
      "Database query optimization is crucial for handling high traffic loads",
      "Distributed caching systems prevent bottlenecks during peak usage",
      "Infrastructure as code enables rapid scaling and deployment"
    ]
  };

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

  const handleQuestionClick = (question: string) => {
    setInputValue(question);
    // Focus the input
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className={`w-full bg-gray-50 dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 ${className}`}>
      <Tabs defaultValue="chat" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="chat" className="flex-1">Chat</TabsTrigger>
          <TabsTrigger value="caseStudy" className="flex-1">Case Study</TabsTrigger>
          <TabsTrigger value="articles" className="flex-1">Articles</TabsTrigger>
        </TabsList>
        
        <TabsContent value="chat" className="p-0">
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

            {/* Suggested questions */}
            {!inputValue.trim() && (
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
            )}
          </div>
        </TabsContent>

        <TabsContent value="caseStudy">
          <div className="p-6">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">{caseStudy.title}</h3>
              <div className="text-sm text-gray-500 mb-4">Case study from {caseStudy.company}</div>
              
              <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-5 mb-5">
                <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">The Challenge</h4>
                <p className="text-gray-600 dark:text-gray-400">{caseStudy.challenge}</p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-5 mb-5">
                <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">The Solution</h4>
                <p className="text-gray-600 dark:text-gray-400 mb-3">{caseStudy.solution}</p>
                
                <h5 className="font-medium text-sm text-gray-600 dark:text-gray-400 mt-3">Technologies Used:</h5>
                <div className="flex flex-wrap gap-2 mt-2">
                  {caseStudy.technologies.map((tech, idx) => (
                    <span key={idx} className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 text-xs px-2.5 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-5 mb-5">
                <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Results</h4>
                <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-400">
                  {caseStudy.results.map((result, idx) => (
                    <li key={idx}>{result}</li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-5">
                <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Key Learning Points</h4>
                <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-400">
                  {caseStudy.learningPoints.map((point, idx) => (
                    <li key={idx}>{point}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="articles">
          <div className="p-6">
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">Relevant Articles</h3>
            
            <div className="space-y-4">
              {webArticles.map((article, idx) => (
                <Collapsible key={idx} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
                  <CollapsibleTrigger className="flex items-center justify-between w-full p-4 text-left">
                    <div>
                      <h4 className="font-medium text-gray-800 dark:text-gray-200">{article.title}</h4>
                      <div className="text-sm text-gray-500 flex items-center mt-1">
                        <FileText className="w-3.5 h-3.5 mr-1" />
                        {article.source}
                      </div>
                    </div>
                    <div className="text-blue-600">
                      <Plus size={18} className="transition-transform ui-open:rotate-45" />
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="px-4 pb-4">
                      <div className="border-t border-gray-200 dark:border-gray-700 pt-3 mb-3" />
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        {article.summary}
                      </p>
                      <div className="mt-3">
                        <a 
                          href={article.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          <Link className="w-4 h-4 mr-1.5" />
                          View Full Article
                        </a>
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ChatWidget;
