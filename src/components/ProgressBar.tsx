
import React from "react";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  progress: number;
  className?: string;
  showPercentage?: boolean;
  color?: "primary" | "success" | "warning";
  size?: "sm" | "md" | "lg";
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  className,
  showPercentage = false,
  color = "primary",
  size = "md",
}) => {
  const colorVariants = {
    primary: "bg-brand-purple",
    success: "bg-green-500",
    warning: "bg-yellow-500",
  };

  const sizeVariants = {
    sm: "h-1",
    md: "h-2",
    lg: "h-3",
  };

  // Ensure progress is between 0 and 100
  const normalizedProgress = Math.min(100, Math.max(0, progress));

  return (
    <div className="relative w-full">
      <div className={cn("w-full bg-gray-200 rounded-full overflow-hidden", sizeVariants[size], className)}>
        <div
          className={cn(
            "transition-all duration-300 ease-in-out rounded-full",
            colorVariants[color],
            sizeVariants[size]
          )}
          style={{ width: `${normalizedProgress}%` }}
          role="progressbar"
          aria-valuenow={normalizedProgress}
          aria-valuemin={0}
          aria-valuemax={100}
        ></div>
      </div>
      {showPercentage && (
        <div className="mt-1 text-xs text-gray-500 text-right">
          {Math.round(normalizedProgress)}% Complete
        </div>
      )}
    </div>
  );
};

export default ProgressBar;
