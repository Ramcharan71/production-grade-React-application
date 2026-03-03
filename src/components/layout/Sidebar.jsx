import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '../../lib/utils';
import {
  LayoutDashboard,
  FolderKanban,
  Radar,
  Calendar,
  Bell,
  Settings,
  HelpCircle,
  ChevronRight,
  X,
} from 'lucide-react';
import ThemeToggle from '../ui/ThemeToggle';

const navGroups = [
  {
    items: [
      { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
      { label: 'Projects', icon: FolderKanban, path: '/projects' },
      { label: 'Scans', icon: Radar, path: '/scans' },
      { label: 'Schedule', icon: Calendar, path: '/schedule' },
    ],
  },
  {
    items: [
      { label: 'Notifications', icon: Bell, path: '/notifications' },
      { label: 'Settings', icon: Settings, path: '/settings' },
      { label: 'Support', icon: HelpCircle, path: '/support' },
    ],
  },
];

export default function Sidebar({ isOpen, onClose }) {
  const location = useLocation();

  const isActive = (path) => {
    if (path === '/dashboard') {
      return location.pathname === '/dashboard' || location.pathname.startsWith('/dashboard/scan');
    }
    if (path === '/scans') {
      return location.pathname.startsWith('/dashboard/scan');
    }
    return location.pathname.startsWith(path);
  };

  // Determine which nav item should be active based on current route
  const getActiveClass = (path) => {
    // On scan detail, Scans should be active
    if (location.pathname.startsWith('/dashboard/scan/') && path === '/scans') {
      return true;
    }
    // On dashboard root, Dashboard should be active
    if (location.pathname === '/dashboard' && path === '/dashboard') {
      return true;
    }
    return false;
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 z-50 h-full w-[200px] flex flex-col',
          'bg-white dark:bg-surface-dark border-r border-gray-100 dark:border-surface-dark-border',
          'transition-transform duration-300 lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Logo */}
        <div className="flex items-center gap-2.5 px-5 py-5">
          <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center">
            <span className="text-white text-[10px] font-bold">●</span>
          </div>
          <span className="text-lg font-bold text-gray-900 dark:text-white">aps</span>
          {/* Mobile close */}
          <button
            onClick={onClose}
            className="ml-auto lg:hidden p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-2 flex flex-col">
          {navGroups.map((group, groupIndex) => (
            <div key={groupIndex} className={cn(groupIndex > 0 && 'mt-6')}>
              {group.items.map((item) => {
                const Icon = item.icon;
                const active = getActiveClass(item.path);

                return (
                  <NavLink
                    key={item.path}
                    to={item.path === '/scans' || item.path === '/projects' || item.path === '/schedule' || item.path === '/notifications' || item.path === '/settings' || item.path === '/support'
                      ? '/dashboard'
                      : item.path}
                    onClick={onClose}
                    className={cn(
                      'flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150 mb-0.5',
                      active
                        ? 'bg-teal-accent text-white'
                        : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-surface-dark-hover hover:text-gray-700 dark:hover:text-gray-200'
                    )}
                  >
                    <Icon className="w-[18px] h-[18px]" />
                    <span>{item.label}</span>
                  </NavLink>
                );
              })}
            </div>
          ))}

          {/* Spacer */}
          <div className="flex-1" />

          {/* Theme toggle */}
          <div className="px-2 mb-2">
            <ThemeToggle className="w-full justify-start" />
          </div>
        </nav>

        {/* User card */}
        <div className="px-3 py-4 border-t border-gray-100 dark:border-surface-dark-border">
          <div className="flex items-center gap-3 px-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center overflow-hidden">
              <svg viewBox="0 0 40 40" className="w-10 h-10">
                <circle cx="20" cy="15" r="8" fill="#8B6914" />
                <circle cx="20" cy="14" r="7" fill="#F5D6A0" />
                <ellipse cx="20" cy="35" rx="14" ry="10" fill="#0CC8A8" />
                <circle cx="17" cy="13" r="1" fill="#333" />
                <circle cx="23" cy="13" r="1" fill="#333" />
                <path d="M18 17 Q20 19 22 17" fill="none" stroke="#333" strokeWidth="0.8" />
                <path d="M8 8 Q12 2 20 5 Q14 0 8 8" fill="#1a1a1a" />
                <path d="M32 8 Q28 2 20 5 Q26 0 32 8" fill="#1a1a1a" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">admin@edu.com</p>
              <p className="text-sm font-medium text-gray-400 dark:text-gray-500">Security Lead</p>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400 shrink-0" />
          </div>
        </div>
      </aside>
    </>
  );
}
