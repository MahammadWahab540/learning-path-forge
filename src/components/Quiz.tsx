
import React, { useState } from "react";
import Button from "./Button";
import { toast } from "sonner";

interface Question {
  id: string;
  question: string;
  options: string[];
  correctOptionIndex: number;
}

interface QuizProps {
  questions: Question[];
  onComplete: (score: number, passed: boolean) => void;
  passingScore?: number;
}

const Quiz: React.FC<QuizProps> = ({
  questions,
  onComplete,
  passingScore = 70,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  const handleOptionSelect = (optionIndex: number) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[currentQuestionIndex] = optionIndex;
    setSelectedOptions(newSelectedOptions);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResults(true);
      calculateScore();
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const calculateScore = () => {
    let correctAnswers = 0;
    
    questions.forEach((question, index) => {
      if (selectedOptions[index] === question.correctOptionIndex) {
        correctAnswers++;
      }
    });
    
    const score = (correctAnswers / questions.length) * 100;
    const passed = score >= passingScore;
    
    if (passed) {
      toast.success(`Great job! You scored ${Math.round(score)}%!`);
    } else {
      toast.error(`Quiz failed. You scored ${Math.round(score)}%. You need ${passingScore}% to pass.`);
    }
    
    onComplete(score, passed);
  };

  if (showResults) {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold mb-4">Quiz Results</h3>
        <div className="space-y-4">
          {questions.map((question, index) => {
            const isCorrect = selectedOptions[index] === question.correctOptionIndex;
            return (
              <div key={question.id} className="border-b pb-4">
                <p className="font-medium mb-2">
                  {index + 1}. {question.question}
                </p>
                <div className="ml-4">
                  {question.options.map((option, optIndex) => (
                    <div
                      key={optIndex}
                      className={`p-2 my-1 rounded-md ${
                        selectedOptions[index] === optIndex
                          ? isCorrect
                            ? "bg-green-100 dark:bg-green-900"
                            : "bg-red-100 dark:bg-red-900"
                          : optIndex === question.correctOptionIndex
                          ? "bg-green-50 dark:bg-green-900/30"
                          : ""
                      }`}
                    >
                      {option}
                      {optIndex === question.correctOptionIndex && (
                        <span className="ml-2 text-green-600 dark:text-green-400">✓ Correct answer</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        <Button
          className="mt-6"
          onClick={() => {
            setCurrentQuestionIndex(0);
            setSelectedOptions([]);
            setShowResults(false);
          }}
        >
          Retake Quiz
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-bold">Quiz</h3>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Question {currentQuestionIndex + 1} of {questions.length}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-1">
          <div
            className="bg-brand-purple h-1 rounded-full"
            style={{
              width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`,
            }}
          ></div>
        </div>
      </div>

      <div className="mb-6">
        <h4 className="text-xl mb-4">{currentQuestion.question}</h4>
        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => (
            <div
              key={index}
              className={`p-3 border rounded-md cursor-pointer transition-colors ${
                selectedOptions[currentQuestionIndex] === index
                  ? "bg-brand-purple/10 border-brand-purple"
                  : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
              }`}
              onClick={() => handleOptionSelect(index)}
            >
              <div className="flex items-center">
                <div
                  className={`w-5 h-5 mr-3 flex items-center justify-center rounded-full border ${
                    selectedOptions[currentQuestionIndex] === index
                      ? "border-brand-purple bg-brand-purple text-white"
                      : "border-gray-400"
                  }`}
                >
                  {selectedOptions[currentQuestionIndex] === index && (
                    <svg
                      className="w-3 h-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  )}
                </div>
                <span>{option}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handlePrevQuestion}
          disabled={currentQuestionIndex === 0}
        >
          Previous
        </Button>
        <Button
          onClick={handleNextQuestion}
          disabled={selectedOptions[currentQuestionIndex] === undefined}
        >
          {currentQuestionIndex === questions.length - 1 ? "Submit" : "Next"}
        </Button>
      </div>
    </div>
  );
};

export default Quiz;
