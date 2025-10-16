import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Search, Filter } from 'lucide-react';
import TaskCard from './TaskCard';
import TaskModal from './TaskModal';

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

const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Design Mumbai office layout',
    description: 'Create wireframes and high-fidelity mockups for the new Mumbai office interior design',
    assignee: {
      id: '2',
      name: 'Priya Patel',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face'
    },
    dueDate: '2024-01-10',
    status: 'in-progress',
    priority: 'high',
    labels: ['design', 'frontend']
  },
  {
    id: '2',
    title: 'Setup Bangalore development center',
    description: 'Configure local development environment with all necessary tools and dependencies for the Bangalore team',
    assignee: {
      id: '3',
      name: 'Vikram Singh',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face'
    },
    dueDate: '2024-01-08',
    status: 'done',
    priority: 'medium',
    labels: ['development', 'setup']
  },
  {
    id: '3',
    title: 'Delhi market content audit',
    description: 'Review existing content and develop strategy for new Delhi market expansion content',
    assignee: {
      id: '1',
      name: 'Arjun Sharma',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'
    },
    dueDate: '2024-01-12',
    status: 'todo',
    priority: 'medium',
    labels: ['content', 'strategy']
  },
  {
    id: '4',
    title: 'Implement responsive navigation for mobile app',
    description: 'Build responsive navigation component with mobile-first approach for Indian market users',
    assignee: {
      id: '3',
      name: 'Vikram Singh',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face'
    },
    dueDate: '2024-01-15',
    status: 'todo',
    priority: 'high',
    labels: ['development', 'responsive']
  }
];

interface TaskListProps {
  projectId: string;
}

export default function TaskList({ projectId }: TaskListProps) {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (taskId: string, newStatus: 'todo' | 'in-progress' | 'done') => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
  };

  const handleTaskCreate = (taskData: Partial<Task>) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title: taskData.title || '',
      description: taskData.description || '',
      assignee: taskData.assignee || {
        id: '1',
        name: 'Arjun Sharma',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'
      },
      dueDate: taskData.dueDate || '',
      status: taskData.status || 'todo',
      priority: taskData.priority || 'medium',
      labels: taskData.labels || []
    };
    setTasks(prev => [...prev, newTask]);
    setIsTaskModalOpen(false);
  };

  return (
    <div className="space-y-8 px-4 py-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-4 py-6">
        <div className="max-w-xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white mb-3">
            Project Tasks
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            {filteredTasks.length} tasks to manage
          </p>
        </div>
        
        <div className="flex justify-center pt-4">
          <Button onClick={() => setIsTaskModalOpen(true)} className="px-8 py-3">
            <Plus className="mr-2 h-5 w-5" />
            Add Task
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-6 max-w-2xl mx-auto">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12 h-12"
          />
        </div>
        
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-56 h-12">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="todo">To Do</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="done">Done</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Task List */}
      <div className="space-y-6 max-w-4xl mx-auto px-4">
        {filteredTasks.map((task) => (
          <TaskCard 
            key={task.id} 
            task={task} 
            onStatusChange={handleStatusChange}
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredTasks.length === 0 && (
        <div className="text-center py-16 px-8">
          <div className="text-gray-400 mb-6">
            <Search className="h-16 w-16 mx-auto" />
          </div>
          <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-4">
            No tasks found
          </h3>
          <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
            Try adjusting your search terms or create a new task to get started.
          </p>
        </div>
      )}

      {/* Task Creation Modal */}
      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        onSave={handleTaskCreate}
      />
    </div>
  );
}
