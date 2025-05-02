
import React from "react";
import { Link } from "react-router-dom";
import ProgressBar from "./ProgressBar";
import { cn } from "@/lib/utils";

interface StageCardProps {
  id: string;
  skillId: string;
  title: string;
  description: string;
  progress: number;
  marketingStat?: string;
  isLocked?: boolean;
}

const StageCard: React.FC<StageCardProps> = ({
  id,
  skillId,
  title,
  description,
  progress,
  marketingStat,
  isLocked = false,
}) => {
  return (
    <div 
      className={cn(
        "relative flex flex-col p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl",
        isLocked ? "opacity-60 cursor-not-allowed" : "cursor-pointer"
      )}
    >
      {isLocked && (
        <div className="absolute inset-0 bg-gray-100 dark:bg-gray-900 bg-opacity-50 dark:bg-opacity-50 rounded-lg flex items-center justify-center z-10">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
            <div className="flex items-center text-gray-600 dark:text-gray-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
              Complete previous stages to unlock
            </div>
          </div>
        </div>
      )}
      
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300">{description}</p>
      </div>
      
      <div className="mt-auto space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500 dark:text-gray-400">Progress</span>
            <span className="text-sm font-medium">{Math.round(progress)}%</span>
          </div>
          <ProgressBar progress={progress} size="sm" />
        </div>
        
        {marketingStat && (
          <div className="text-xs text-gray-500 dark:text-gray-400 italic border-t pt-2">
            {marketingStat}
          </div>
        )}
        
        {!isLocked && (
          <Link to={`/roadmap/${skillId}`}>
            <button className="w-full mt-4 py-2 px-4 bg-brand-purple hover:bg-brand-purple/90 text-white rounded transition-colors">
              {progress > 0 ? "Continue" : "Start Learning"}
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default StageCard;
