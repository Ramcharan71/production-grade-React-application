import { cn } from '../../lib/utils';
import { Radar, Network, AlertTriangle, ClipboardCheck, FileText } from 'lucide-react';

const steps = [
  { label: 'Spidering', icon: Radar },
  { label: 'Mapping', icon: Network },
  { label: 'Testing', icon: AlertTriangle },
  { label: 'Validating', icon: ClipboardCheck },
  { label: 'Reporting', icon: FileText },
];

export default function StepTracker({ activeStep = 0, className }) {
  return (
    <div className={cn('flex items-center w-full', className)}>
      {steps.map((step, index) => {
        const isActive = index === activeStep;
        const isCompleted = index < activeStep;
        const StepIcon = step.icon;
        const isLast = index === steps.length - 1;

        return (
          <div key={step.label} className={cn('flex items-center', isLast ? '' : 'flex-1')}>
            <div className="flex flex-col items-center min-w-[70px]">
              <div
                className={cn(
                  'w-14 h-14 rounded-full flex items-center justify-center transition-all border-2',
                  isActive
                    ? 'bg-teal-accent border-teal-accent text-white'
                    : isCompleted
                    ? 'bg-teal-accent/20 border-teal-accent text-teal-accent'
                    : 'bg-gray-100 dark:bg-surface-dark-hover border-gray-300 dark:border-surface-dark-border text-gray-400 dark:text-gray-500'
                )}
              >
                <StepIcon className="w-6 h-6" />
              </div>
              <span
                className={cn(
                  'text-sm mt-2.5 font-medium whitespace-nowrap',
                  isActive
                    ? 'text-teal-accent'
                    : isCompleted
                    ? 'text-teal-accent'
                    : 'text-gray-400 dark:text-gray-500'
                )}
              >
                {step.label}
              </span>
            </div>
            {!isLast && (
              <div
                className={cn(
                  'flex-1 h-[2px] -mx-1 -translate-y-3',
                  index < activeStep
                    ? 'bg-teal-accent'
                    : 'bg-gray-400 dark:bg-gray-500'
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
