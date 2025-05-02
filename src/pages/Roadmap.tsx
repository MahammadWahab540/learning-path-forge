
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useLearning } from '@/context/LearningContext';
import ProgressBar from '@/components/ProgressBar';
import LanguageBadge from '@/components/LanguageBadge';
import Button from '@/components/Button';
import { toast } from "sonner";

const Roadmap = () => {
  const { skillId } = useParams<{ skillId: string }>();
  const { skills } = useLearning();
  const navigate = useNavigate();
  const [currentSkill, setCurrentSkill] = useState(skills.find(s => s.id === skillId));
  
  useEffect(() => {
    const skill = skills.find(s => s.id === skillId);
    if (skill) {
      setCurrentSkill(skill);
    } else {
      toast.error("Skill not found");
      navigate("/dashboard");
    }
  }, [skillId, skills, navigate]);
  
  if (!currentSkill) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-purple mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading roadmap...</p>
        </div>
      </div>
    );
  }
  
  const handleSaveProgress = () => {
    toast.success("Progress saved successfully!");
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex-1 min-w-0">
              <div className="flex items-center">
                <Link to="/dashboard" className="mr-4 text-gray-500 hover:text-gray-700">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                </Link>
                <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl truncate">
                  {currentSkill.name} Roadmap
                </h1>
                <span className="ml-3 inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-brand-purple/10 text-brand-purple capitalize">
                  {currentSkill.level}
                </span>
              </div>
              <div className="mt-4 flex items-center">
                <div className="flex-1 mr-4">
                  <ProgressBar progress={currentSkill.progress} showPercentage size="sm" />
                </div>
                <span className="text-sm font-medium text-gray-500">
                  {Math.round(currentSkill.progress)}% Complete
                </span>
              </div>
            </div>
            <div className="mt-4 md:mt-0">
              <Button onClick={handleSaveProgress}>
                Save Progress
              </Button>
            </div>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {currentSkill.stages.map((stage, index) => (
            <div 
              key={stage.id} 
              className={`bg-white rounded-lg shadow-md overflow-hidden ${stage.isLocked ? 'opacity-75' : ''}`}
            >
              {/* Stage header */}
              <div className="bg-gray-50 border-b px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                      stage.isCompleted ? 'bg-green-100 text-green-800' : 
                      stage.isLocked ? 'bg-gray-100 text-gray-500' : 'bg-brand-purple/10 text-brand-purple'
                    }`}>
                      {stage.isCompleted ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        stage.isLocked ? (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0z" />
                          </svg>
                        ) : <span className="text-lg font-bold">{stage.number}</span>
                      )}
                    </div>
                    <h2 className="ml-4 text-lg font-semibold">Stage {stage.number}: {stage.title}</h2>
                  </div>
                  <div className="flex items-center">
                    {stage.isCompleted && (
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Completed
                      </span>
                    )}
                    {!stage.isCompleted && !stage.isLocked && (
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        In Progress
                      </span>
                    )}
                    {stage.isLocked && (
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        Locked
                      </span>
                    )}
                  </div>
                </div>
                <p className="mt-1 text-sm text-gray-500 ml-14">{stage.description}</p>
                <div className="mt-2 ml-14">
                  <ProgressBar progress={stage.progress} size="sm" />
                </div>
              </div>
              
              {/* Stage content */}
              <div className="px-6 py-4">
                <h3 className="text-md font-medium mb-3">Lessons:</h3>
                <ul className="space-y-4">
                  {stage.lessons.map((lesson) => (
                    <li key={lesson.id} className="flex items-start">
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                        lesson.completed ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'
                      }`}>
                        {lesson.type === 'video' && (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        )}
                        {lesson.type === 'article' && (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        )}
                        {lesson.type === 'quiz' && (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{lesson.title}</p>
                            <div className="flex items-center mt-1">
                              <span className="text-xs text-gray-500 capitalize mr-2">{lesson.type}</span>
                              <LanguageBadge language={lesson.language} size="sm" />
                            </div>
                          </div>
                          <div>
                            {stage.isLocked ? (
                              <button 
                                className="px-4 py-2 border border-gray-300 rounded text-sm text-gray-500 cursor-not-allowed"
                                disabled
                              >
                                Locked
                              </button>
                            ) : (
                              <Link to={`/lesson/${skillId}/${stage.id}/${lesson.id}`}>
                                <Button
                                  variant={lesson.completed ? "outline" : "primary"}
                                  size="sm"
                                >
                                  {lesson.completed ? "Review" : "Start"}
                                </Button>
                              </Link>
                            )}
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                
                {stage.quizPassed && (
                  <div className="mt-6 p-4 bg-green-50 border border-green-100 rounded-md">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-green-800">Quiz Completed</h3>
                        <p className="mt-1 text-sm text-green-700">
                          You've successfully passed the quiz for this stage. Well done!
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                
                {!stage.isLocked && !stage.quizPassed && (
                  <div className="mt-6 p-4 bg-yellow-50 border border-yellow-100 rounded-md">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-yellow-800">Quiz Required</h3>
                        <p className="mt-1 text-sm text-yellow-700">
                          Complete all lessons and pass the quiz to unlock the next stage.
                        </p>
                        <div className="mt-2">
                          <Link to={`/lesson/${skillId}/${stage.id}/quiz`}>
                            <Button size="sm" variant="outline">
                              Take Quiz
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {currentSkill.stages.every(stage => stage.isCompleted) && (
            <div className="bg-brand-purple/10 rounded-lg p-6 text-center">
              <h3 className="text-xl font-bold text-brand-purple mb-2">🎉 Congratulations!</h3>
              <p className="mb-4">You've completed all stages of this skill roadmap.</p>
              <Link to="/dashboard">
                <Button>
                  Back to Dashboard
                </Button>
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Roadmap;
