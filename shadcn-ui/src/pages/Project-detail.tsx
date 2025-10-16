import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Plus, Settings, Users } from 'lucide-react';
import TaskList from '@/components/tasks/TaskList';
import DiscussionThread from '@/components/discussions/DiscussionThread';
import ProjectCharts from '@/components/charts/ProjectCharts';
import { useIsMobile } from '@/hooks/use-mobile';

// Mock project data
const mockProject = {
  id: '1',
  name: 'Website Redesign',
  description: 'Complete overhaul of the company website with modern design and improved user experience',
  members: [
    { id: '1', name: 'John Doe', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face', role: 'Project Manager' },
    { id: '2', name: 'Jane Smith', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face', role: 'Designer' },
    { id: '3', name: 'Mike Johnson', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face', role: 'Developer' }
  ],
  tasks: { todo: 8, inProgress: 3, done: 12 },
  dueDate: '2024-01-15',
  status: 'active'
};

export default function ProjectDetail() {
  const { projectId } = useParams();
  const [activeTab, setActiveTab] = useState('tasks');
  const isMobile = useIsMobile();

  return (
    <div className="space-y-6">
      {/* Project Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="min-w-0 flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {mockProject.name}
              </h1>
              <Badge variant="secondary">{mockProject.status}</Badge>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {mockProject.description}
            </p>
            
            {/* Members */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-600 dark:text-gray-400">Team:</span>
              </div>
              <div className="flex items-center space-x-3">
                {mockProject.members.map((member) => (
                  <div key={member.id} className="flex items-center space-x-2">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback className="text-xs">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="hidden sm:block">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {member.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {member.role}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Button variant="outline">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Task
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className={`grid w-full ${isMobile ? 'grid-cols-3' : 'grid-cols-3'}`}>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="discussions">Discussions</TabsTrigger>
          <TabsTrigger value="overview">Overview</TabsTrigger>
        </TabsList>

        <TabsContent value="tasks" className="space-y-6">
          <TaskList projectId={projectId || '1'} />
        </TabsContent>

        <TabsContent value="discussions" className="space-y-6">
          <DiscussionThread projectId={projectId || '1'} />
        </TabsContent>

        <TabsContent value="overview" className="space-y-6">
          <ProjectCharts project={mockProject} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
