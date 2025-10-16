import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Calendar, TrendingUp, Users, CheckCircle2 } from 'lucide-react';

interface ProjectChartsProps {
  project: {
    id: string;
    name: string;
    tasks: {
      todo: number;
      inProgress: number;
      done: number;
    };
    members: Array<{
      id: string;
      name: string;
      avatar: string;
      role: string;
    }>;
  };
}

export default function ProjectCharts({ project }: ProjectChartsProps) {
  const totalTasks = project.tasks.todo + project.tasks.inProgress + project.tasks.done;
  const completionRate = totalTasks > 0 ? (project.tasks.done / totalTasks) * 100 : 0;

  // Task status data for pie chart
  const taskStatusData = [
    { name: 'To Do', value: project.tasks.todo, color: '#6B7280' },
    { name: 'In Progress', value: project.tasks.inProgress, color: '#3B82F6' },
    { name: 'Done', value: project.tasks.done, color: '#10B981' }
  ];

  // Mock weekly progress data
  const weeklyProgressData = [
    { week: 'Week 1', completed: 2, total: 8 },
    { week: 'Week 2', completed: 5, total: 12 },
    { week: 'Week 3', completed: 8, total: 18 },
    { week: 'Week 4', completed: 12, total: 23 }
  ];

  // Mock upcoming deadlines
  const upcomingDeadlines = [
    { task: 'Design homepage mockup', dueDate: '2024-01-10', priority: 'high' },
    { task: 'Content audit and strategy', dueDate: '2024-01-12', priority: 'medium' },
    { task: 'Implement responsive navigation', dueDate: '2024-01-15', priority: 'high' },
    { task: 'User testing sessions', dueDate: '2024-01-18', priority: 'low' }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                  Total Tasks
                </p>
                <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                  {totalTasks}
                </p>
              </div>
              <CheckCircle2 className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600 dark:text-green-400">
                  Completed
                </p>
                <p className="text-2xl font-bold text-green-900 dark:text-green-100">
                  {project.tasks.done}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600 dark:text-purple-400">
                  Team Members
                </p>
                <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">
                  {project.members.length}
                </p>
              </div>
              <Users className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-orange-200 dark:border-orange-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600 dark:text-orange-400">
                  Progress
                </p>
                <p className="text-2xl font-bold text-orange-900 dark:text-orange-100">
                  {Math.round(completionRate)}%
                </p>
              </div>
              <Calendar className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Task Status Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Task Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={taskStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {taskStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center space-x-4 mt-4">
              {taskStatusData.map((entry) => (
                <div key={entry.name} className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: entry.color }}
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {entry.name} ({entry.value})
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Weekly Progress Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Weekly Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyProgressData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="completed" fill="#10B981" name="Completed" />
                  <Bar dataKey="total" fill="#E5E7EB" name="Total" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Deadlines */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center">
            <Calendar className="mr-2 h-5 w-5" />
            Upcoming Deadlines
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {upcomingDeadlines.map((deadline, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    {deadline.task}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Due: {new Date(deadline.dueDate).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </p>
                </div>
                <Badge className={getPriorityColor(deadline.priority)}>
                  {deadline.priority}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Project Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Overall Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Project Completion</span>
              <span className="font-medium text-gray-900 dark:text-white">
                {project.tasks.done}/{totalTasks} tasks completed
              </span>
            </div>
            <Progress value={completionRate} className="h-3" />
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {Math.round(completionRate)}% complete • {project.tasks.inProgress} in progress • {project.tasks.todo} remaining
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
