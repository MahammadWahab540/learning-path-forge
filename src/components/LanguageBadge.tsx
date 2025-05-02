
import React from "react";
import { cn } from "@/lib/utils";

interface LanguageBadgeProps {
  language: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const LanguageBadge: React.FC<LanguageBadgeProps> = ({
  language,
  size = "md",
  className,
}) => {
  const sizeStyles = {
    sm: "text-xs px-1.5 py-0.5",
    md: "text-sm px-2 py-1",
    lg: "px-2.5 py-1.5",
  };

  const getLanguageStyle = (language: string) => {
    // A simple mapping of languages to colors
    const languageColors: Record<string, string> = {
      English: "bg-blue-100 text-blue-800",
      Spanish: "bg-green-100 text-green-800",
      Hindi: "bg-orange-100 text-orange-800",
      Telugu: "bg-purple-100 text-purple-800",
      French: "bg-indigo-100 text-indigo-800",
      German: "bg-red-100 text-red-800",
      Chinese: "bg-yellow-100 text-yellow-800",
      Japanese: "bg-pink-100 text-pink-800",
      Russian: "bg-cyan-100 text-cyan-800",
      // Default for other languages
      default: "bg-gray-100 text-gray-800",
    };

    return languageColors[language] || languageColors.default;
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-medium",
        sizeStyles[size],
        getLanguageStyle(language),
        className
      )}
    >
      <span className="flex items-center">
        <svg
          className="mr-1 h-2 w-2"
          fill="currentColor"
          viewBox="0 0 8 8"
        >
          <circle cx="4" cy="4" r="3" />
        </svg>
        {language}
      </span>
    </span>
  );
};

export default LanguageBadge;
