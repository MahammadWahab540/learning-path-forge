
import React from 'react';
import { Link } from 'react-router-dom';
import { useLearning } from '@/context/LearningContext';
import { useAuth } from '@/context/AuthContext';
import StageCard from '@/components/StageCard';
import ProgressBar from '@/components/ProgressBar';
import Button from '@/components/Button';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const { skills, careerGoal, learningStreak, preferredLanguage } = useLearning();
  
  // Calculate overall progress across all skills
  const overallProgress = skills.length 
    ? skills.reduce((acc, skill) => acc + skill.progress, 0) / skills.length
    : 0;

  return (
    <div className="min-h-screen bg-gradient-radial from-brand-lightBlue to-white">
      {/* Top navigation */}
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="p-2 bg-brand-purple rounded-full">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    strokeWidth={1.5} 
                    stroke="currentColor" 
                    className="w-6 h-6 text-white"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" 
                    />
                  </svg>
                </div>
              </div>
              <div className="ml-4 font-semibold text-xl">SkillSpark</div>
            </div>
            <nav className="hidden md:flex items-center space-x-4">
              <Link to="/dashboard" className="px-3 py-2 rounded-md text-sm font-medium bg-brand-purple text-white">
                Dashboard
              </Link>
              <Link to="/profile" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100">
                Profile
              </Link>
              <button 
                onClick={logout}
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
              >
                Logout
              </button>
            </nav>
            
            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button className="p-2 rounded-md text-gray-700 focus:outline-none">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-6 w-6" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Greeting */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.firstName || 'Student'}! 🚀</h1>
          <p className="text-gray-600">Continue your journey to becoming a {careerGoal || 'skilled professional'}</p>
        </div>
        
        {/* Learning streak and language */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
            <div className="p-3 bg-orange-100 rounded-full mr-4">
              <span role="img" aria-label="fire" className="text-2xl">🔥</span>
            </div>
            <div>
              <p className="text-sm text-gray-500">Learning Streak</p>
              <p className="text-2xl font-bold">{learningStreak} days</p>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
            <div className="p-3 bg-blue-100 rounded-full mr-4">
              <span role="img" aria-label="globe" className="text-2xl">🌍</span>
            </div>
            <div>
              <p className="text-sm text-gray-500">Learning Language</p>
              <p className="font-medium">{preferredLanguage}</p>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm text-gray-500">Overall Progress</p>
              <p className="text-sm font-medium">{Math.round(overallProgress)}%</p>
            </div>
            <ProgressBar progress={overallProgress} size="md" />
          </div>
        </div>
        
        {/* Active Skills */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Your Active Skills</h2>
          
          {skills.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skills.map((skill) => (
                <StageCard
                  key={skill.id}
                  id={skill.id}
                  skillId={skill.id}
                  title={skill.name}
                  description={skill.description}
                  progress={skill.progress}
                  marketingStat={skill.marketingStat}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="mb-4">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-12 w-12 mx-auto text-gray-400" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">No skills selected yet</h3>
              <p className="text-gray-600 mb-4">
                Start your learning journey by selecting skills you want to master
              </p>
              <Link to="/select-path">
                <Button>Choose Your Skills</Button>
              </Link>
            </div>
          )}
        </section>
        
        {/* Recommendations */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Recommended for You</h2>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-medium text-lg mb-3">Expand your skill set</h3>
            <p className="text-gray-600 mb-4">
              Based on your career goal and current progress, these additional skills could benefit your learning journey.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">TypeScript</span>
              <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">UI/UX Design</span>
              <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">Data Structures</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
