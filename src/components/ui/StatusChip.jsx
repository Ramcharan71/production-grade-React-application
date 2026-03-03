import { cn } from '../../lib/utils';

const statusConfig = {
  completed: {
    bg: 'bg-green-100 dark:bg-green-500/15',
    text: 'text-green-700 dark:text-green-400',
    border: 'border-green-300 dark:border-green-500/30',
    label: 'Completed',
  },
  scheduled: {
    bg: 'bg-gray-100 dark:bg-gray-500/15',
    text: 'text-gray-600 dark:text-gray-400',
    border: 'border-gray-300 dark:border-gray-500/30',
    label: 'Scheduled',
  },
  failed: {
    bg: 'bg-red-500/20 dark:bg-red-500/20',
    text: 'text-red-600 dark:text-red-400',
    border: 'border-red-300 dark:border-red-500/30',
    label: 'Failed',
  },
  'in-progress': {
    bg: 'bg-teal-accent/10',
    text: 'text-teal-accent',
    border: 'border-teal-accent/30',
    label: 'In Progress',
  },
};

export default function StatusChip({ status, className }) {
  const config = statusConfig[status] || statusConfig.scheduled;

  return (
    <span
      className={cn(
        'inline-flex items-center px-3.5 py-1 rounded-md text-xs font-semibold border',
        config.bg,
        config.text,
        config.border,
        className
      )}
    >
      {config.label}
    </span>
  );
}
