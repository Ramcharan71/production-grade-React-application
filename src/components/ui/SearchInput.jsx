import { Search } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function SearchInput({ value, onChange, placeholder = 'Search...', className }) {
  return (
    <div className={cn('relative', className)}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={cn(
          'w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border',
          'bg-white dark:bg-surface-dark-card',
          'border-gray-200 dark:border-surface-dark-border',
          'text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500',
          'focus:outline-none focus:ring-2 focus:ring-teal-accent/50 focus:border-teal-accent',
          'transition-colors duration-150'
        )}
        aria-label={placeholder}
      />
    </div>
  );
}
