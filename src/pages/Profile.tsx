import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from '@/context/AuthContext';
import { useLearning } from '@/context/LearningContext';
import { Award, Check, FileText, Flame, List, Pencil, Star, TrendingUp } from 'lucide-react';
import EditProfileModal from '@/components/EditProfileModal';
import AchievementCard from '@/components/AchievementCard';
import ProjectCard from '@/components/ProjectCard';
import StatsItem from '@/components/StatsItem';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from "@/components/ui/card";
import { Badge } from '@/components/ui/badge';
import { generatePdf } from '@/utils/resumeToPdf';
import ProgressBar from '@/components/ProgressBar';

const Profile = () => {
  const { user } = useAuth();
  const { 
    skills, 
    learningStreak,
    preferredLanguage
  } = useLearning();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Mock data (in a real app, these would come from the LearningContext)
  const mockAchievements = [
    { id: '1', title: 'First Lesson', subtitle: 'Completed your first lesson', icon: 'award' },
    { id: '2', title: '7-Day Streak', subtitle: 'Learned for 7 days in a row', icon: 'flame' },
    { id: '3', title: 'Quiz Master', subtitle: 'Passed 5 quizzes with perfect score', icon: 'star' },
    { id: '4', title: 'Skill Unlocked', subtitle: 'Completed a full skill path', icon: 'check' }
  ];
  
  // Updated mockProjects with explicit "Complete" | "In Review" status values
  const mockProjects = [
    { id: '1', title: 'React Todo App', description: 'A simple todo application built with React', date: '2023-05-15', status: 'Complete' as const, grade: 98 },
    { id: '2', title: 'Python Data Analysis', description: 'Analyzed a dataset using pandas and matplotlib', date: '2023-06-02', status: 'In Review' as const },
    { id: '3', title: 'JavaScript Game', description: 'Built a simple 2D game using vanilla JavaScript', date: '2023-06-20', status: 'Complete' as const, grade: 85 }
  ];
  
  // Filter skills for mastered skills (those with 100% progress)
  const masteredSkills = skills.filter(skill => skill.progress === 100);
  // Active skills are those that are in progress
  const activeSkills = skills.filter(skill => skill.progress > 0 && skill.progress < 100);
  
  // Handle resume export
  const handleExportResume = async () => {
    try {
      const pdf = await generatePdf({
        user,
        skills: masteredSkills,
        projects: mockProjects.filter(p => p.status === 'Complete')
      });
      
      // Create a download link
      const url = URL.createObjectURL(pdf);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${user?.firstName}_${user?.lastName}_Resume.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to generate resume:', error);
    }
  };
  
  // Get user initials for avatar fallback
  const getInitials = () => {
    if (!user) return 'U';
    return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`;
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e3f2fd] to-[#e8fdf7] p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Your Profile</h1>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left sidebar - User profile card */}
          <div className="w-full md:w-[280px] shrink-0">
            <Card className="p-6 shadow-md rounded-lg">
              <div className="flex flex-col items-center">
                <Avatar className="w-24 h-24 mb-4">
                  <AvatarImage src={user?.avatar} alt={`${user?.firstName} ${user?.lastName}`} />
                  <AvatarFallback className="bg-brand-purple text-white text-xl">
                    {getInitials()}
                  </AvatarFallback>
                </Avatar>
                
                <h2 className="text-xl font-semibold">{user?.firstName} {user?.lastName}</h2>
                <p className="text-gray-500 mb-4">{user?.email}</p>
                
                <p className="text-sm text-gray-600 mb-2">
                  Preferred Language: {preferredLanguage}
                </p>
                
                <div className="w-full border-t my-4"></div>
                
                <div className="w-full space-y-3">
                  <StatsItem 
                    icon={<Flame size={16} />} 
                    label="Current Streak" 
                    value={`${learningStreak} days`} 
                  />
                  <StatsItem 
                    icon={<TrendingUp size={16} />} 
                    label="Skills in Progress" 
                    value={activeSkills.length} 
                  />
                  <StatsItem 
                    icon={<Check size={16} />} 
                    label="Skills Mastered" 
                    value={masteredSkills.length} 
                  />
                  <StatsItem 
                    icon={<Star size={16} />} 
                    label="Quizzes Passed" 
                    value={skills.reduce((acc, skill) => 
                      acc + skill.stages.filter(stage => stage.quizPassed).length, 0
                    )} 
                  />
                </div>
                
                <Button 
                  className="w-full mt-6"
                  onClick={() => setIsModalOpen(true)}
                >
                  <Pencil size={16} className="mr-2" /> Edit Profile
                </Button>
              </div>
            </Card>
          </div>
          
          {/* Right column - Tabbed content */}
          <div className="flex-1">
            <Tabs defaultValue="skills">
              <TabsList className="w-full mb-6">
                <TabsTrigger value="skills" className="flex-1">
                  <List size={16} className="mr-2" /> Skills
                </TabsTrigger>
                <TabsTrigger value="achievements" className="flex-1">
                  <Award size={16} className="mr-2" /> Achievements
                </TabsTrigger>
                <TabsTrigger value="projects" className="flex-1">
                  <List size={16} className="mr-2" /> Projects
                </TabsTrigger>
                <TabsTrigger value="resume" className="flex-1">
                  <FileText size={16} className="mr-2" /> Resume
                </TabsTrigger>
              </TabsList>
              
              {/* Skills Tab Content */}
              <TabsContent value="skills" className="space-y-4">
                <h3 className="text-xl font-semibold">Your Skills</h3>
                
                {skills.length === 0 ? (
                  <p className="text-gray-500">No skills added yet. Start by selecting skills in the learning path.</p>
                ) : (
                  <div className="space-y-4">
                    {skills.map((skill) => (
                      <div key={skill.id} className="bg-white p-4 rounded-lg shadow-sm">
                        <div className="flex justify-between mb-2 items-center">
                          <div>
                            <h4 className="font-medium">{skill.name}</h4>
                            <Badge variant="secondary" className="mt-1">
                              {skill.level}
                            </Badge>
                          </div>
                          <div className="text-sm text-right">
                            <span className={skill.progress === 100 ? "text-green-600" : "text-brand-purple"}>
                              {skill.progress === 100 ? "Completed" : "In Progress"}
                            </span>
                          </div>
                        </div>
                        <ProgressBar 
                          progress={skill.progress} 
                          color={skill.progress === 100 ? "success" : "primary"} 
                          showPercentage 
                        />
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>
              
              {/* Achievements Tab Content */}
              <TabsContent value="achievements" className="space-y-4">
                <h3 className="text-xl font-semibold">Your Achievements</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {mockAchievements.map((achievement) => (
                    <AchievementCard key={achievement.id} achievement={achievement} />
                  ))}
                </div>
              </TabsContent>
              
              {/* Projects Tab Content */}
              <TabsContent value="projects" className="space-y-4">
                <h3 className="text-xl font-semibold">Your Projects</h3>
                
                <div className="space-y-4">
                  {mockProjects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              </TabsContent>
              
              {/* Resume Tab Content */}
              <TabsContent value="resume" className="space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold">Resume Highlights</h3>
                  <Button onClick={handleExportResume}>
                    <FileText size={16} className="mr-2" /> Export to PDF
                  </Button>
                </div>
                
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <section className="mb-6">
                    <h4 className="text-lg font-semibold mb-3 text-brand-blue">Skills</h4>
                    {masteredSkills.length > 0 ? (
                      <ul className="list-disc pl-5 space-y-1">
                        {masteredSkills.map((skill) => (
                          <li key={skill.id}>{skill.name} ({skill.level})</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-500">Complete skills to see them on your resume</p>
                    )}
                  </section>
                  
                  <section>
                    <h4 className="text-lg font-semibold mb-3 text-brand-blue">Projects</h4>
                    {mockProjects.filter(p => p.status === 'Complete').length > 0 ? (
                      <ul className="list-disc pl-5 space-y-2">
                        {mockProjects.filter(p => p.status === 'Complete').map((project) => (
                          <li key={project.id}>
                            <div className="font-medium">{project.title}</div>
                            <div className="text-sm text-gray-600">{project.description}</div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-500">Complete projects to see them on your resume</p>
                    )}
                  </section>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      
      <EditProfileModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        user={user}
      />
    </div>
  );
};

export default Profile;
