import React from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckSquare, MessageCircle, UserPlus, Clock } from 'lucide-react';

interface NotificationDropdownProps {
  children: React.ReactNode;
}

const mockNotifications = [
  {
    id: '1',
    type: 'task_assigned',
    title: 'New task assigned',
    message: 'You have been assigned to "Update user interface"',
    time: '2 minutes ago',
    unread: true,
    icon: CheckSquare
  },
  {
    id: '2',
    type: 'comment',
    title: 'New comment',
    message: 'Sarah commented on "Database optimization"',
    time: '1 hour ago',
    unread: true,
    icon: MessageCircle
  },
  {
    id: '3',
    type: 'team_invite',
    title: 'Team invitation',
    message: 'You were added to the "Marketing Campaign" project',
    time: '3 hours ago',
    unread: false,
    icon: UserPlus
  },
  {
    id: '4',
    type: 'deadline',
    title: 'Deadline approaching',
    message: '"API Integration" is due tomorrow',
    time: '5 hours ago',
    unread: true,
    icon: Clock
  }
];

export default function NotificationDropdown({ children }: NotificationDropdownProps) {
  const unreadCount = mockNotifications.filter(n => n.unread).length;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align="end" forceMount>
        <DropdownMenuLabel className="flex items-center justify-between">
          <span>Notifications</span>
          {unreadCount > 0 && (
            <Badge variant="secondary" className="ml-2">
              {unreadCount} new
            </Badge>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <div className="max-h-96 overflow-y-auto">
          {mockNotifications.map((notification) => {
            const Icon = notification.icon;
            return (
              <DropdownMenuItem key={notification.id} className="flex items-start p-3 cursor-pointer">
                <div className={`mr-3 mt-1 p-1 rounded-full ${
                  notification.unread 
                    ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400' 
                    : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
                }`}>
                  <Icon className="h-3 w-3" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className={`text-sm font-medium ${
                      notification.unread ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400'
                    }`}>
                      {notification.title}
                    </p>
                    {notification.unread && (
                      <div className="w-2 h-2 bg-blue-600 rounded-full ml-2" />
                    )}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {notification.message}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                    {notification.time}
                  </p>
                </div>
              </DropdownMenuItem>
            );
          })}
        </div>
        
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-center justify-center">
          <Button variant="ghost" size="sm" className="w-full">
            View all notifications
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
