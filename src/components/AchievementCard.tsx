
import React from 'react';
import { Award, Check, Flame, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface AchievementProps {
  achievement: {
    id: string;
    title: string;
    subtitle: string;
    icon: string;
  }
}

const AchievementCard: React.FC<AchievementProps> = ({ achievement }) => {
  // Helper function to get the appropriate icon based on the icon string
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'award':
        return <Award className="h-6 w-6 text-brand-blue" />;
      case 'flame':
        return <Flame className="h-6 w-6 text-orange-500" />;
      case 'star':
        return <Star className="h-6 w-6 text-yellow-500" />;
      case 'check':
        return <Check className="h-6 w-6 text-green-500" />;
      default:
        return <Award className="h-6 w-6 text-brand-purple" />;
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="flex items-start p-6">
        <div className="bg-gray-100 p-3 rounded-full mr-4">
          {getIcon(achievement.icon)}
        </div>
        <div>
          <h4 className="font-medium">{achievement.title}</h4>
          <p className="text-sm text-gray-600">{achievement.subtitle}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AchievementCard;
