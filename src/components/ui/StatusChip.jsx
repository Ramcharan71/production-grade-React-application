import { cn } from '../../lib/utils';

const statusConfig = {
  completed: {
    bg: 'bg-green-100 dark:bg-green-500/15',
    text: 'text-green-700 dark:text-green-400',
    label: 'Completed',
  },
  scheduled: {
    bg: 'bg-gray-100 dark:bg-gray-500/15',
    text: 'text-gray-600 dark:text-gray-400',
    label: 'Scheduled',
  },
  failed: {
    bg: 'bg-red-100 dark:bg-red-500/15',
    text: 'text-red-700 dark:text-red-400',
    label: 'Failed',
  },
  'in-progress': {
    bg: 'bg-teal-accent/10',
    text: 'text-teal-accent',
    label: 'In Progress',
  },
};

export default function StatusChip({ status, className }) {
  const config = statusConfig[status] || statusConfig.scheduled;

  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium',
        config.bg,
        config.text,
        className
      )}
    >
      {config.label}
    </span>
  );
}
