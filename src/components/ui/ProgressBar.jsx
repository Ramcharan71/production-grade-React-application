import { cn } from '../../lib/utils';

export default function ProgressBar({ value = 0, status = 'completed', className }) {
  const isFailed = status === 'failed';

  return (
    <div className={cn('flex items-center gap-3', className)}>
      <div className="flex-1 h-1.5 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
        <div
          className={cn(
            'h-full rounded-full transition-all duration-500',
            isFailed ? 'bg-red-500' : 'bg-teal-accent'
          )}
          style={{ width: `${Math.min(value, 100)}%` }}
        />
      </div>
      <span className="text-sm text-gray-600 dark:text-gray-400 w-12 text-right tabular-nums">
        {value}%
      </span>
    </div>
  );
}
