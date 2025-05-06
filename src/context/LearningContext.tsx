
import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchRoadmap } from '../data/mockRoadmap';
import { toast } from "sonner";

export interface Lesson {
  id: string;
  title: string;
  type: 'video' | 'article' | 'quiz';
  language: string;
  content: string;
  completed: boolean;
}

export interface Quiz {
  id: string;
  questions: {
    id: string;
    question: string;
    options: string[];
    correctOptionIndex: number;
  }[];
}

export interface Stage {
  id: string;
  number: number;
  title: string;
  description: string;
  lessons: Lesson[];
  quiz: Quiz;
  isLocked: boolean;
  isCompleted: boolean;
  quizPassed: boolean;
  progress: number;
}

export interface Skill {
  id: string;
  name: string;
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  stages: Stage[];
  progress: number;
  marketingStat: string;
}

export interface LearningContextType {
  careerGoal: string;
  setCareerGoal: (goal: string) => void;
  skills: Skill[];
  selectedSkills: string[];
  setSelectedSkills: (skills: string[]) => void;
  level: 'beginner' | 'intermediate' | 'advanced';
  setLevel: (level: 'beginner' | 'intermediate' | 'advanced') => void;
  preferredLanguage: string;
  setPreferredLanguage: (language: string) => void;
  learningStreak: number;
  generateRoadmap: (params: { 
    goal: string; 
    skills: string[]; 
    level: 'beginner' | 'intermediate' | 'advanced';
    language: string;
  }) => Promise<void>;
  completeLesson: (skillId: string, stageId: string, lessonId: string) => void;
  passQuiz: (skillId: string, stageId: string) => void;
  loading: boolean;
}

const LearningContext = createContext<LearningContextType | undefined>(undefined);

export const useLearning = () => {
  const context = useContext(LearningContext);
  if (!context) {
    throw new Error('useLearning must be used within a LearningProvider');
  }
  return context;
};

export const LearningProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [careerGoal, setCareerGoal] = useState<string>('');
  const [skills, setSkills] = useState<Skill[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [level, setLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');
  const [preferredLanguage, setPreferredLanguage] = useState<string>('English');
  const [learningStreak, setLearningStreak] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  // Load learning state from localStorage on component mount
  useEffect(() => {
    const storedLearningData = localStorage.getItem('learningData');
    if (storedLearningData) {
      const data = JSON.parse(storedLearningData);
      setCareerGoal(data.careerGoal || '');
      setSkills(data.skills || []);
      setSelectedSkills(data.selectedSkills || []);
      setLevel(data.level || 'beginner');
      setPreferredLanguage(data.preferredLanguage || 'English');
      setLearningStreak(data.learningStreak || 0);
    }
  }, []);

  // Save learning state to localStorage whenever it changes
  useEffect(() => {
    const learningData = {
      careerGoal,
      skills,
      selectedSkills,
      level,
      preferredLanguage,
      learningStreak,
    };
    localStorage.setItem('learningData', JSON.stringify(learningData));
    
    // Show autosave toast only if we have skills data (meaning the user has started learning)
    if (skills.length > 0) {
      const debouncedToast = setTimeout(() => {
        toast.success("Progress autosaved", {
          id: "autosave-toast",
          duration: 1500
        });
      }, 2000);
      
      return () => clearTimeout(debouncedToast);
    }
  }, [careerGoal, skills, selectedSkills, level, preferredLanguage, learningStreak]);

  const generateRoadmap = async (params: { 
    goal: string; 
    skills: string[]; 
    level: 'beginner' | 'intermediate' | 'advanced';
    language: string;
  }) => {
    try {
      setLoading(true);
      // Set the parameters to the context
      setCareerGoal(params.goal);
      setSelectedSkills(params.skills);
      setLevel(params.level);
      setPreferredLanguage(params.language);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Fetch roadmap data
      const roadmapData = await fetchRoadmap();
      
      // Filter resources based on selected language
      const filteredSkills = roadmapData.filter(skill => 
        params.skills.includes(skill.name.toLowerCase())
      ).map(skill => ({
        ...skill,
        level: params.level,
      }));
      
      setSkills(filteredSkills);
      setLearningStreak(1); // Start streak
      
      toast.success("Your learning path is ready!");
      
    } catch (error) {
      toast.error("Failed to generate roadmap: " + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  const completeLesson = (skillId: string, stageId: string, lessonId: string) => {
    setSkills(prevSkills => 
      prevSkills.map(skill => {
        if (skill.id === skillId) {
          const updatedStages = skill.stages.map(stage => {
            if (stage.id === stageId) {
              const updatedLessons = stage.lessons.map(lesson => 
                lesson.id === lessonId ? { ...lesson, completed: true } : lesson
              );
              
              // Calculate lesson completion percentage
              const completedLessons = updatedLessons.filter(l => l.completed).length;
              const totalLessons = updatedLessons.length;
              const progress = (completedLessons / totalLessons) * 100;
              
              return { 
                ...stage, 
                lessons: updatedLessons,
                progress,
              };
            }
            return stage;
          });
          
          // Calculate overall skill progress
          const totalStages = updatedStages.length;
          const skillProgress = updatedStages.reduce((acc, stage) => acc + stage.progress, 0) / totalStages;
          
          return { ...skill, stages: updatedStages, progress: skillProgress };
        }
        return skill;
      })
    );
    
    // Update streak (in a real app, this would check if this is a new day)
    setLearningStreak(prev => prev + 1);
    
    toast.success("Lesson completed!");
  };

  const passQuiz = (skillId: string, stageId: string) => {
    setSkills(prevSkills => 
      prevSkills.map(skill => {
        if (skill.id === skillId) {
          const stageIndex = skill.stages.findIndex(s => s.id === stageId);
          
          if (stageIndex === -1) return skill;
          
          const updatedStages = [...skill.stages];
          
          // Mark current stage as completed and quiz as passed
          updatedStages[stageIndex] = {
            ...updatedStages[stageIndex],
            isCompleted: true,
            quizPassed: true,
            progress: 100
          };
          
          // Unlock next stage if it exists
          if (stageIndex < updatedStages.length - 1) {
            updatedStages[stageIndex + 1] = {
              ...updatedStages[stageIndex + 1],
              isLocked: false
            };
          }
          
          // Calculate overall skill progress
          const totalStages = updatedStages.length;
          const skillProgress = updatedStages.reduce((acc, stage) => acc + stage.progress, 0) / totalStages;
          
          return { 
            ...skill, 
            stages: updatedStages,
            progress: skillProgress 
          };
        }
        return skill;
      })
    );
    
    toast.success("Quiz passed! Next stage unlocked!");
  };

  const value = {
    careerGoal,
    setCareerGoal,
    skills,
    selectedSkills,
    setSelectedSkills,
    level,
    setLevel,
    preferredLanguage,
    setPreferredLanguage,
    learningStreak,
    generateRoadmap,
    completeLesson,
    passQuiz,
    loading
  };

  return <LearningContext.Provider value={value}>{children}</LearningContext.Provider>;
};

export default LearningContext;
