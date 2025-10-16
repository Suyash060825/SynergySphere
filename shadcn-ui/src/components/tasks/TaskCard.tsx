import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Calendar, MoreHorizontal, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Task {
  id: string;
  title: string;
  description: string;
  assignee: {
    id: string;
    name: string;
    avatar: string;
  };
  dueDate: string;
  status: 'todo' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  labels: string[];
}

interface TaskCardProps {
  task: Task;
  onStatusChange: (taskId: string, newStatus: 'todo' | 'in-progress' | 'done') => void;
}

export default function TaskCard({ task, onStatusChange }: TaskCardProps) {
  const navigate = useNavigate();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'todo':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'done':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'todo':
        return <Clock className="h-4 w-4" />;
      case 'in-progress':
        return <AlertCircle className="h-4 w-4" />;
      case 'done':
        return <CheckCircle2 className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const isOverdue = new Date(task.dueDate) < new Date() && task.status !== 'done';

  const handleCardClick = () => {
    navigate(`/tasks/${task.id}`);
  };

  const handleQuickStatusChange = (e: React.MouseEvent, newStatus: 'todo' | 'in-progress' | 'done') => {
    e.stopPropagation();
    onStatusChange(task.id, newStatus);
  };

  return (
    <Card 
      className="cursor-pointer hover:shadow-md transition-all duration-200 border-l-4 border-l-blue-500 hover:border-l-blue-600"
      onClick={handleCardClick}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-2">
              <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                {task.title}
              </h3>
              <Badge className={cn("text-xs", getPriorityColor(task.priority))}>
                {task.priority}
              </Badge>
            </div>
            
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
              {task.description}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar className="w-6 h-6">
                  <AvatarImage src={task.assignee.avatar} alt={task.assignee.name} />
                  <AvatarFallback className="text-xs">
                    {task.assignee.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {task.assignee.name}
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <div className={cn(
                  "flex items-center space-x-1 text-xs px-2 py-1 rounded-full",
                  isOverdue ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200" : "text-gray-500"
                )}>
                  <Calendar className="h-3 w-3" />
                  <span>{formatDate(task.dueDate)}</span>
                </div>

                <Badge className={cn("text-xs", getStatusColor(task.status))}>
                  <div className="flex items-center space-x-1">
                    {getStatusIcon(task.status)}
                    <span className="capitalize">{task.status.replace('-', ' ')}</span>
                  </div>
                </Badge>
              </div>
            </div>

            {/* Labels */}
            {task.labels.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {task.labels.map((label) => (
                  <Badge key={label} variant="outline" className="text-xs">
                    {label}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={(e) => handleQuickStatusChange(e, 'todo')}>
                <Clock className="mr-2 h-4 w-4" />
                Mark as To Do
              </DropdownMenuItem>
              <DropdownMenuItem onClick={(e) => handleQuickStatusChange(e, 'in-progress')}>
                <AlertCircle className="mr-2 h-4 w-4" />
                Mark as In Progress
              </DropdownMenuItem>
              <DropdownMenuItem onClick={(e) => handleQuickStatusChange(e, 'done')}>
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Mark as Done
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  );
}
