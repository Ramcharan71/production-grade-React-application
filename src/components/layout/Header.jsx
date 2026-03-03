import { Link } from 'react-router-dom';
import { Menu, Home } from 'lucide-react';
import Button from '../ui/Button';
import { useToast } from '../../context/ToastContext';
import { cn } from '../../lib/utils';

export default function Header({ onMenuToggle, showBreadcrumb = true }) {
  const { showToast } = useToast();

  return (
    <header className="flex items-center justify-between px-6 py-3 border-b border-gray-100 dark:border-surface-dark-border bg-white dark:bg-surface-dark">
      <div className="flex items-center gap-3">
        {/* Mobile menu button */}
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-surface-dark-hover"
          aria-label="Toggle menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Breadcrumb */}
        {showBreadcrumb && (
          <nav className="flex items-center gap-2 text-sm" aria-label="Breadcrumb">
            <span className="font-semibold text-gray-900 dark:text-white">Scan</span>
            <Home className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-gray-400">/</span>
            <span className="text-gray-500 dark:text-gray-400">Private Assets</span>
            <span className="text-gray-400">/</span>
            <Link to="/dashboard" className="text-teal-accent hover:text-teal-accent/80 font-medium">
              New Scan
            </Link>
          </nav>
        )}
      </div>

      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="sm"
          onClick={() => showToast('Report exported successfully', 'success')}
        >
          Export Report
        </Button>
        <Button
          variant="danger-outline"
          size="sm"
          onClick={() => showToast('Scan stopped', 'warning')}
        >
          Stop Scan
        </Button>
      </div>
    </header>
  );
}
