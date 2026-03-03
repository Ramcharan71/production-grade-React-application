import { cn } from '../../lib/utils';

const variants = {
  primary: 'bg-teal-accent hover:bg-teal-accent/90 text-white font-medium',
  outline: 'border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-surface-dark-hover font-medium',
  'danger-outline': 'border border-red-500 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 font-medium',
  ghost: 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-surface-dark-hover',
  'social-apple': 'bg-black text-white hover:bg-gray-900',
  'social-google': 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50',
  'social-meta': 'bg-[#4F6BF6] text-white hover:bg-[#3D59E0]',
};

const sizes = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2.5 text-sm',
  lg: 'px-6 py-3 text-sm',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  icon: Icon,
  iconPosition = 'left',
  pill = false,
  ...props
}) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-accent focus-visible:ring-offset-2 dark:focus-visible:ring-offset-surface-dark disabled:opacity-50 disabled:pointer-events-none',
        pill ? 'rounded-full' : 'rounded-lg',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {Icon && iconPosition === 'left' && <Icon className="w-4 h-4" />}
      {children}
      {Icon && iconPosition === 'right' && <Icon className="w-4 h-4" />}
    </button>
  );
}
