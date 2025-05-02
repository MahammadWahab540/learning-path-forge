
import React from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/utils/formatDate";

interface ProjectProps {
  project: {
    id: string;
    title: string;
    description: string;
    date: string;
    status: 'Complete' | 'In Review';
    grade?: number;
  }
}

const ProjectCard: React.FC<ProjectProps> = ({ project }) => {
  return (
    <Card className="overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h4 className="font-semibold text-lg">{project.title}</h4>
            <p className="text-gray-600 text-sm mt-1">{project.description}</p>
            <p className="text-xs text-gray-500 mt-2">Submitted on {formatDate(project.date)}</p>
          </div>
          <div className="flex flex-col items-end">
            <Badge 
              variant={project.status === 'Complete' ? 'default' : 'secondary'}
              className={project.status === 'Complete' ? 'bg-green-500' : ''}
            >
              {project.status}
            </Badge>
            
            {project.grade !== undefined && (
              <span className="mt-2 text-lg font-semibold">
                {project.grade}%
              </span>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProjectCard;
