import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search } from 'lucide-react';
import ProjectCard from '@/components/projects/ProjectCard';
import { useIsMobile } from '@/hooks/use-mobile';

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

const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Mumbai Office Renovation',
    description: 'Complete renovation of Mumbai headquarters with modern design and smart office solutions',
    members: [
      { id: '1', name: 'Arjun Sharma', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face' },
      { id: '2', name: 'Priya Patel', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face' },
      { id: '3', name: 'Vikram Singh', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face' }
    ],
    tasks: { todo: 8, inProgress: 3, done: 12 },
    dueDate: '2024-01-15',
    color: 'bg-blue-500'
  },
  {
    id: '2',
    name: 'Digital India Mobile App',
    description: 'Native mobile application for government services across iOS and Android platforms',
    members: [
      { id: '4', name: 'Sneha Gupta', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face' },
      { id: '5', name: 'Rohit Mehta', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=face' }
    ],
    tasks: { todo: 15, inProgress: 5, done: 8 },
    dueDate: '2024-02-28',
    color: 'bg-green-500'
  },
  {
    id: '3',
    name: 'Delhi Marketing Campaign',
    description: 'Q1 marketing campaign for product launch across North India markets',
    members: [
      { id: '6', name: 'Ananya Reddy', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=32&h=32&fit=crop&crop=face' },
      { id: '7', name: 'Karan Joshi', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=32&h=32&fit=crop&crop=face' },
      { id: '8', name: 'Kavya Nair', avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=32&h=32&fit=crop&crop=face' }
    ],
    tasks: { todo: 6, inProgress: 2, done: 15 },
    dueDate: '2024-01-31',
    color: 'bg-purple-500'
  },
  {
    id: '4',
    name: 'Bangalore Cloud Migration',
    description: 'Migrate legacy database systems to new cloud infrastructure for Bangalore tech hub',
    members: [
      { id: '9', name: 'Aditya Kumar', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face' }
    ],
    tasks: { todo: 4, inProgress: 1, done: 7 },
    color: 'bg-orange-500'
  }
];

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [projects] = useState<Project[]>(mockProjects);
  const isMobile = useIsMobile();

  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 px-4 py-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Projects Dashboard
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Manage and track your team projects across India
          </p>
        </div>
        
        <div className="flex justify-center pt-4">
          <Button className="px-8 py-3 text-base">
            <Plus className="mr-2 h-5 w-5" />
            New Project
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="flex justify-center">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12 h-12 text-center"
          />
        </div>
      </div>

      {/* Projects Grid */}
      <div className="py-8">
        <div className={`grid gap-8 ${
          isMobile 
            ? 'grid-cols-1 px-4' 
            : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-8'
        }`}>
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-16 px-8">
          <div className="text-gray-400 mb-6">
            <Search className="h-16 w-16 mx-auto" />
          </div>
          <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-4">
            No projects found
          </h3>
          <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
            Try adjusting your search terms or create a new project to get started.
          </p>
        </div>
      )}

      {/* Floating Action Button (Mobile) */}
      {isMobile && (
        <Button
          size="lg"
          className="fixed bottom-24 right-6 rounded-full w-16 h-16 shadow-lg"
        >
          <Plus className="h-7 w-7" />
        </Button>
      )}
    </div>
  );
}
