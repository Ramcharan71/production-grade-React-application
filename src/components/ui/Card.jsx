import { cn } from '../../lib/utils';

export default function Card({ children, className, ...props }) {
  return (
    <div
      className={cn(
        'bg-white dark:bg-surface-dark-card rounded-xl border border-gray-100 dark:border-surface-dark-border',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
