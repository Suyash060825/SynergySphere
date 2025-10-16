import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  CheckSquare, 
  Bell, 
  User 
} from 'lucide-react';

const navigation = [
  { name: 'Projects', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Assigned', href: '/tasks', icon: CheckSquare },
  { name: 'Notifications', href: '/notifications', icon: Bell },
  { name: 'Profile', href: '/profile', icon: User },
];

export default function MobileNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-4 py-2">
      <div className="flex justify-around">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              cn(
                'flex flex-col items-center py-2 px-3 text-xs font-medium rounded-md transition-colors min-w-0',
                isActive
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-gray-600 dark:text-gray-400'
              )
            }
          >
            <item.icon className="h-5 w-5 mb-1" />
            <span className="truncate">{item.name}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
