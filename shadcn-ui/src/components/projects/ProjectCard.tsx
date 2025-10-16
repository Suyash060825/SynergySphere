import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Calendar, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Project {
  id: string;
  name: string;
  description: string;
  members: Array<{
    id: string;
    name: string;
    avatar: string;
  }>;
  tasks: {
    todo: number;
    inProgress: number;
    done: number;
  };
  dueDate?: string;
  color: string;
}

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const navigate = useNavigate();
  const totalTasks = project.tasks.todo + project.tasks.inProgress + project.tasks.done;
  const completedTasks = project.tasks.done;
  const progressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  const handleClick = () => {
    navigate(`/projects/${project.id}`);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const isOverdue = project.dueDate && new Date(project.dueDate) < new Date();

  return (
    <Card 
      className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
      onClick={handleClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className={cn("w-3 h-3 rounded-full", project.color)} />
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                {project.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                {project.description}
              </p>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Progress</span>
            <span className="font-medium text-gray-900 dark:text-white">
              {completedTasks}/{totalTasks} tasks
            </span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>

        {/* Task Summary */}
        <div className="flex space-x-4 text-sm">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-gray-400 rounded-full" />
            <span className="text-gray-600 dark:text-gray-400">
              {project.tasks.todo} To-Do
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full" />
            <span className="text-gray-600 dark:text-gray-400">
              {project.tasks.inProgress} In Progress
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            <span className="text-gray-600 dark:text-gray-400">
              {project.tasks.done} Done
            </span>
          </div>
        </div>

        {/* Members and Due Date */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4 text-gray-400" />
            <div className="flex -space-x-2">
              {project.members.slice(0, 3).map((member) => (
                <Avatar key={member.id} className="w-6 h-6 border-2 border-white dark:border-gray-800">
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback className="text-xs">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
              ))}
              {project.members.length > 3 && (
                <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 border-2 border-white dark:border-gray-800 flex items-center justify-center">
                  <span className="text-xs text-gray-600 dark:text-gray-400">
                    +{project.members.length - 3}
                  </span>
                </div>
              )}
            </div>
          </div>

          {project.dueDate && (
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4 text-gray-400" />
              <Badge 
                variant={isOverdue ? "destructive" : "secondary"}
                className="text-xs"
              >
                {formatDate(project.dueDate)}
              </Badge>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
