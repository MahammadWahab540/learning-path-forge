
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLearning } from '@/context/LearningContext';
import Input from '@/components/Input';
import Button from '@/components/Button';
import { availableSkills, supportedLanguages } from '@/data/mockRoadmap';
import { toast } from "sonner";

const SelectPath = () => {
  const navigate = useNavigate();
  const { generateRoadmap, loading } = useLearning();
  
  const [careerGoal, setCareerGoal] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [currentLevel, setCurrentLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');
  const [preferredLanguage, setPreferredLanguage] = useState('English');
  const [skillFilter, setSkillFilter] = useState('');
  
  const filteredSkills = availableSkills.filter(skill => 
    skill.name.toLowerCase().includes(skillFilter.toLowerCase())
  );
  
  const handleSkillSelect = (skillName: string) => {
    if (selectedSkills.includes(skillName)) {
      setSelectedSkills(selectedSkills.filter(skill => skill !== skillName));
    } else {
      if (selectedSkills.length < 3) {
        setSelectedSkills([...selectedSkills, skillName]);
      } else {
        toast.error('You can select a maximum of 3 skills');
      }
    }
  };
  
  const handleContinue = async () => {
    if (!careerGoal.trim()) {
      toast.error('Please enter a career goal');
      return;
    }
    
    if (selectedSkills.length === 0) {
      toast.error('Please select at least one skill');
      return;
    }
    
    try {
      await generateRoadmap({
        goal: careerGoal,
        skills: selectedSkills.map(s => s.toLowerCase()),
        level: currentLevel,
        language: preferredLanguage
      });
      
      navigate('/dashboard');
    } catch (error) {
      console.error('Error generating roadmap:', error);
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-radial from-brand-lightPurple to-brand-lightBlue p-4">
      <div className="max-w-3xl mx-auto mt-16 mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 gradient-text">
          Choose Your Learning Path
        </h1>
        
        <div className="bg-white rounded-xl shadow-xl p-6 md:p-8">
          <div className="space-y-6">
            {/* Career Goal */}
            <div>
              <h2 className="text-xl font-semibold mb-3">What's your career goal?</h2>
              <Input
                type="text"
                placeholder="e.g., Frontend Developer, Data Scientist"
                value={careerGoal}
                onChange={(e) => setCareerGoal(e.target.value)}
              />
            </div>
            
            {/* Skills Selection */}
            <div>
              <h2 className="text-xl font-semibold mb-3">Select up to 3 skills</h2>
              <div className="mb-3">
                <Input
                  type="text"
                  placeholder="Search skills..."
                  value={skillFilter}
                  onChange={(e) => setSkillFilter(e.target.value)}
                />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {filteredSkills.map((skill) => (
                  <div
                    key={skill.id}
                    className={`p-3 border rounded-md cursor-pointer transition-colors ${
                      selectedSkills.includes(skill.name)
                        ? 'bg-brand-purple/10 border-brand-purple'
                        : 'hover:bg-gray-50'
                    }`}
                    onClick={() => handleSkillSelect(skill.name)}
                  >
                    <div className="flex items-center">
                      <div
                        className={`w-5 h-5 mr-3 flex items-center justify-center rounded border ${
                          selectedSkills.includes(skill.name)
                            ? 'border-brand-purple bg-brand-purple text-white'
                            : 'border-gray-400'
                        }`}
                      >
                        {selectedSkills.includes(skill.name) && (
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
                      {skill.name}
                    </div>
                  </div>
                ))}
              </div>
              
              {selectedSkills.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  <p className="text-sm text-gray-500">Selected: </p>
                  {selectedSkills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center bg-brand-purple/10 text-brand-purple rounded px-2 py-1 text-sm"
                    >
                      {skill}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSkillSelect(skill);
                        }}
                        className="ml-1 text-brand-purple hover:text-brand-purple/70"
                      >
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className="h-4 w-4" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
            
            {/* Proficiency Level */}
            <div>
              <h2 className="text-xl font-semibold mb-3">Current Level</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {(['beginner', 'intermediate', 'advanced'] as const).map((level) => (
                  <div
                    key={level}
                    className={`p-3 border rounded-md cursor-pointer transition-colors ${
                      currentLevel === level
                        ? 'bg-brand-purple/10 border-brand-purple'
                        : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setCurrentLevel(level)}
                  >
                    <div className="flex items-center">
                      <div
                        className={`w-5 h-5 mr-3 flex items-center justify-center rounded-full border ${
                          currentLevel === level
                            ? 'border-brand-purple bg-brand-purple text-white'
                            : 'border-gray-400'
                        }`}
                      >
                        {currentLevel === level && (
                          <div className="w-2 h-2 rounded-full bg-white"></div>
                        )}
                      </div>
                      <span className="capitalize">{level}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Language Selection */}
            <div>
              <h2 className="text-xl font-semibold mb-3">Preferred Learning Language</h2>
              <select
                className="w-full h-10 pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-brand-purple focus:border-brand-purple"
                value={preferredLanguage}
                onChange={(e) => setPreferredLanguage(e.target.value)}
              >
                {supportedLanguages.map((language) => (
                  <option key={language.code} value={language.name}>
                    {language.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="pt-4">
              <Button
                fullWidth
                isLoading={loading}
                onClick={handleContinue}
                disabled={selectedSkills.length === 0 || !careerGoal.trim()}
              >
                Generate My Learning Path
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectPath;
