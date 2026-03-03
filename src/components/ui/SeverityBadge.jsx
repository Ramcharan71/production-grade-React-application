import { cn } from '../../lib/utils';

const severityConfig = {
  critical: 'bg-severity-critical',
  high: 'bg-severity-high',
  medium: 'bg-severity-medium',
  low: 'bg-severity-low',
};

export default function SeverityBadge({ severity, count, className }) {
  if (count === undefined || count === null) return null;

  return (
    <span
      className={cn(
        'inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold text-white',
        severityConfig[severity],
        className
      )}
      aria-label={`${count} ${severity} vulnerabilities`}
    >
      {count}
    </span>
  );
}
