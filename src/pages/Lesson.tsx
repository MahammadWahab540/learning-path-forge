import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useLearning } from '@/context/LearningContext';
import ProgressBar from '@/components/ProgressBar';
import LanguageBadge from '@/components/LanguageBadge';
import Quiz from '@/components/Quiz';
import ChatWidget from '@/components/ChatWidget';
import Button from '@/components/Button';
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Lesson = () => {
  const { skillId, stageId, lessonId } = useParams<{ skillId: string; stageId: string; lessonId: string }>();
  const { skills, completeLesson, passQuiz, preferredLanguage } = useLearning();
  const navigate = useNavigate();
  
  const [currentSkill, setCurrentSkill] = useState(skills.find(s => s.id === skillId));
  const [currentStage, setCurrentStage] = useState(currentSkill?.stages.find(s => s.id === stageId));
  const [currentLesson, setCurrentLesson] = useState(currentStage?.lessons.find(l => l.id === lessonId));
  const [showQuiz, setShowQuiz] = useState(lessonId === 'quiz');
  const [showCaseStudy, setShowCaseStudy] = useState(false);
  
  useEffect(() => {
    const skill = skills.find(s => s.id === skillId);
    if (!skill) {
      toast.error("Skill not found");
      navigate("/dashboard");
      return;
    }
    
    setCurrentSkill(skill);
    
    const stage = skill.stages.find(s => s.id === stageId);
    if (!stage) {
      toast.error("Stage not found");
      navigate(`/roadmap/${skillId}`);
      return;
    }
    
    setCurrentStage(stage);
    
    if (lessonId === 'quiz') {
      setShowQuiz(true);
    } else {
      const lesson = stage.lessons.find(l => l.id === lessonId);
      if (!lesson) {
        toast.error("Lesson not found");
        navigate(`/roadmap/${skillId}`);
        return;
      }
      
      setCurrentLesson(lesson);
    }
  }, [skillId, stageId, lessonId, skills, navigate]);
  
  const handleLessonCompletion = () => {
    if (skillId && stageId && lessonId && lessonId !== 'quiz') {
      completeLesson(skillId, stageId, lessonId);
      toast.success("Lesson marked as completed!");
    }
  };
  
  const handleQuizCompletion = (score: number, passed: boolean) => {
    if (passed && skillId && stageId) {
      passQuiz(skillId, stageId);
      setShowCaseStudy(true);
    }
  };
  
  if (!currentSkill || !currentStage || (!currentLesson && !showQuiz)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-purple mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading lesson content...</p>
        </div>
      </div>
    );
  }
  
  const getNextLessonLink = () => {
    if (!currentStage || !currentLesson) return null;
    
    const currentLessonIndex = currentStage.lessons.findIndex(l => l.id === currentLesson.id);
    if (currentLessonIndex < currentStage.lessons.length - 1) {
      const nextLesson = currentStage.lessons[currentLessonIndex + 1];
      return `/lesson/${skillId}/${stageId}/${nextLesson.id}`;
    }
    
    // If this is the last lesson, go to quiz
    return `/lesson/${skillId}/${stageId}/quiz`;
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <div className="flex-1 min-w-0">
              {/* Breadcrumbs */}
              <nav className="flex" aria-label="Breadcrumb">
                <ol className="flex items-center space-x-2">
                  <li>
                    <Link to="/dashboard" className="text-gray-500 hover:text-gray-700">
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <span className="text-gray-500">/</span>
                  </li>
                  <li>
                    <Link to={`/roadmap/${skillId}`} className="text-gray-500 hover:text-gray-700">
                      {currentSkill.name}
                    </Link>
                  </li>
                  <li>
                    <span className="text-gray-500">/</span>
                  </li>
                  <li>
                    <span className="text-gray-900 font-medium">
                      {showQuiz 
                        ? `Stage ${currentStage.number} Quiz` 
                        : `${currentLesson?.title}`
                      }
                    </span>
                  </li>
                </ol>
              </nav>
              
              <div className="mt-2 flex items-center">
                <h1 className="text-2xl font-bold text-gray-900">
                  {showQuiz 
                    ? `Quiz: ${currentStage.title}`
                    : `${currentLesson?.title}`
                  }
                </h1>
                {!showQuiz && currentLesson && (
                  <LanguageBadge language={currentLesson.language} className="ml-3" />
                )}
              </div>
            </div>
            
            {!showQuiz && (
              <div className="mt-4 md:mt-0 flex">
                <Link to={`/roadmap/${skillId}`}>
                  <Button variant="outline" size="sm" className="mr-2">
                    Back to Roadmap
                  </Button>
                </Link>
                {currentLesson && !currentLesson.completed && (
                  <Button size="sm" onClick={handleLessonCompletion}>
                    Mark as Completed
                  </Button>
                )}
              </div>
            )}
          </div>
          
          {/* Progress */}
          <div className="mt-4">
            <div className="flex items-center">
              <span className="text-sm text-gray-500 mr-2">
                {showQuiz 
                  ? "Quiz Progress" 
                  : `Stage ${currentStage.number} Progress`
                }
              </span>
              <div className="flex-1">
                <ProgressBar progress={currentStage.progress} size="sm" />
              </div>
            </div>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {showQuiz ? (
          <>
            <Quiz 
              questions={currentStage.quiz.questions} 
              onComplete={handleQuizCompletion} 
              passingScore={70}
            />
            
            {showCaseStudy && (
              <div className="mt-8 bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold">Case Study: Practical Application</h3>
                  <Button 
                    variant="ghost" 
                    onClick={() => setShowCaseStudy(false)}
                    size="sm"
                  >
                    Close
                  </Button>
                </div>
                <p className="mb-4">
                  Now that you've completed this stage, let's see how these concepts apply in the real world:
                </p>
                <div className="bg-gray-50 p-4 rounded-md">
                  <h4 className="font-medium mb-2">Real-World Example:</h4>
                  <p className="text-gray-700">
                    [This is a placeholder for a case study that would be relevant to the completed stage. 
                    It would show how the concepts learned in this stage are applied in real-world scenarios.]
                  </p>
                </div>
                <div className="mt-6">
                  <Link to={`/roadmap/${skillId}`}>
                    <Button>
                      Continue to Next Stage
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </>
        ) : (
          <Tabs defaultValue={currentLesson?.type || "video"} className="w-full">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="video">Video</TabsTrigger>
              <TabsTrigger value="article">Articles</TabsTrigger>
              <TabsTrigger value="chat">Chat</TabsTrigger>
            </TabsList>
            
            <TabsContent value="video">
              <div className="bg-white rounded-lg shadow-md p-6">
                {currentLesson?.type === 'video' && currentLesson?.language === preferredLanguage ? (
                  <div className="aspect-w-16 aspect-h-9">
                    <iframe
                      src={currentLesson.content}
                      title={currentLesson.title}
                      allowFullScreen
                      className="w-full h-96 rounded-md"
                    ></iframe>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-64">
                    <svg
                      className="h-12 w-12 text-gray-400 mb-4"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                    <p className="text-lg text-gray-500">
                      No video available in your preferred language {preferredLanguage}.
                    </p>
                    <p className="mt-2 text-sm text-gray-500">
                      Try checking the Articles tab for content in your language.
                    </p>
                  </div>
                )}
                
                <div className="mt-6 flex justify-between">
                  <Button variant="outline" onClick={() => navigate(`/roadmap/${skillId}`)}>
                    Back to Roadmap
                  </Button>
                  
                  {!currentLesson?.completed && (
                    <Button onClick={handleLessonCompletion}>
                      Mark as Completed
                    </Button>
                  )}
                  
                  {getNextLessonLink() && (
                    <Link to={getNextLessonLink() || '#'}>
                      <Button>
                        Next Lesson
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="article">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="prose max-w-none">
                  {currentLesson?.type === 'article' ? (
                    <div>
                      <h3 className="text-xl font-bold mb-4">{currentLesson.title}</h3>
                      <p>{currentLesson.content}</p>
                    </div>
                  ) : (
                    <div className="text-gray-500 italic">
                      <p>This lesson doesn't have any articles attached. Check the video tab for the main content.</p>
                    </div>
                  )}
                </div>
                
                <div className="mt-6 flex justify-between">
                  <Button variant="outline" onClick={() => navigate(`/roadmap/${skillId}`)}>
                    Back to Roadmap
                  </Button>
                  
                  {!currentLesson?.completed && (
                    <Button onClick={handleLessonCompletion}>
                      Mark as Completed
                    </Button>
                  )}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="chat">
              <ChatWidget className="w-full" />
            </TabsContent>
          </Tabs>
        )}
      </main>
    </div>
  );
};

export default Lesson;
