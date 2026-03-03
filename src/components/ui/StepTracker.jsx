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
    <div className={cn('flex items-center justify-between flex-1', className)}>
      {steps.map((step, index) => {
        const isActive = index === activeStep;
        const isCompleted = index < activeStep;
        const StepIcon = step.icon;

        return (
          <div key={step.label} className="flex items-center flex-1">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  'w-12 h-12 rounded-full flex items-center justify-center transition-all border-2',
                  isActive
                    ? 'bg-teal-accent border-teal-accent text-white'
                    : isCompleted
                    ? 'bg-teal-accent/20 border-teal-accent text-teal-accent'
                    : 'bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-400 dark:text-gray-500'
                )}
              >
                <StepIcon className="w-5 h-5" />
              </div>
              <span
                className={cn(
                  'text-xs mt-2 font-medium',
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
            {index < steps.length - 1 && (
              <div
                className={cn(
                  'flex-1 h-0.5 mx-3 mt-[-18px]',
                  index < activeStep
                    ? 'bg-teal-accent'
                    : 'bg-gray-300 dark:bg-gray-600'
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
