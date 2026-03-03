import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AlertOctagon,
  AlertTriangle,
  Search as SearchIcon,
  ArrowUp,
  ArrowDown,
  Filter,
  Columns3,
  Plus,
  Clock,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import Card from '../components/ui/Card';
import SeverityBadge from '../components/ui/SeverityBadge';
import StatusChip from '../components/ui/StatusChip';
import ProgressBar from '../components/ui/ProgressBar';
import SearchInput from '../components/ui/SearchInput';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import Input from '../components/ui/Input';
import Skeleton from '../components/ui/Skeleton';
import { useToast } from '../context/ToastContext';
import { scans } from '../data/scans';
import { orgStats, severityStats } from '../data/stats';
import { cn } from '../lib/utils';

const severityIcons = {
  critical: { icon: AlertOctagon, color: 'text-red-500' },
  high: { icon: AlertTriangle, color: 'text-orange-500' },
  medium: { icon: AlertTriangle, color: 'text-yellow-500' },
  low: { icon: SearchIcon, color: 'text-teal-accent' },
};

export default function Dashboard() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [showNewScanModal, setShowNewScanModal] = useState(false);
  const [newScanName, setNewScanName] = useState('');
  const [newScanTarget, setNewScanTarget] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  // Filter scans based on search
  const filteredScans = scans.filter(
    (scan) =>
      scan.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scan.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredScans.length / itemsPerPage);
  const paginatedScans = filteredScans.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNewScan = () => {
    setShowNewScanModal(false);
    setNewScanName('');
    setNewScanTarget('');
    showToast('New scan initiated successfully', 'success');
  };

  if (loading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="p-6">
      {/* Status Card with Org Stats + Severity */}
      <Card className="mb-6">
        {/* Org Stats Bar */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm px-5 py-3">
          <StatItem label="Org:" value={orgStats.org} />
          <Divider />
          <StatItem label="Owner:" value={orgStats.owner} />
          <Divider />
          <StatItem label="Total Scans:" value={orgStats.totalScans} />
          <Divider />
          <StatItem label="Scheduled:" value={orgStats.scheduled} />
          <Divider />
          <StatItem label="Rescans:" value={orgStats.rescans} />
          <Divider />
          <StatItem label="Failed Scans:" value={orgStats.failedScans} />
          <Divider />
          <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
            <Clock className="w-3.5 h-3.5" />
            <span className="text-sm">{orgStats.lastUpdated}</span>
          </div>
        </div>

        {/* Severity Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
          {severityStats.map((stat) => {
            const iconConfig = severityIcons[stat.id];
            const Icon = iconConfig.icon;
            const isUp = stat.direction === 'up';

            return (
              <div key={stat.id} className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</span>
                  <Icon className={cn('w-5 h-5', iconConfig.color)} />
                </div>
                <div className="text-4xl font-bold text-gray-900 dark:text-white mb-1">
                  {stat.count}
                </div>
                <div className={cn(
                  'flex items-center gap-1 text-xs',
                  isUp ? 'text-teal-accent' : 'text-red-500'
                )}>
                  {isUp ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                  <span>{stat.change} {stat.description}</span>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Toolbar */}
      <Card className="p-4 mb-0 rounded-b-none border-b-0">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <SearchInput
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search scans by name or type..."
            className="flex-1"
          />
          <div className="flex items-center gap-3">
            <Button variant="outline" size="md" icon={Filter}>
              Filter
            </Button>
            <Button variant="outline" size="md" icon={Columns3}>
              Column
            </Button>
            <Button
              variant="primary"
              size="md"
              icon={Plus}
              pill
              onClick={() => setShowNewScanModal(true)}
            >
              New scan
            </Button>
          </div>
        </div>
      </Card>

      {/* Scan Table */}
      <Card className="rounded-t-none overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 dark:border-surface-dark-border">
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400">
                  Scan Name
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400">
                  Type
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400">
                  Status
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 w-48">
                  Progress
                </th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400">
                  Vulnerability
                </th>
                <th className="text-right px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400">
                  Last Scan
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedScans.map((scan) => (
                <tr
                  key={scan.id}
                  onClick={() => navigate(`/dashboard/scan/${scan.id}`)}
                  className="border-b border-gray-50 dark:border-surface-dark-border/50 hover:bg-gray-50 dark:hover:bg-surface-dark-hover cursor-pointer transition-colors"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      navigate(`/dashboard/scan/${scan.id}`);
                    }
                  }}
                  aria-label={`View scan: ${scan.name}`}
                >
                  <td className="px-6 py-4">
                    <span className="font-medium text-gray-900 dark:text-white text-sm">
                      {scan.name}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-500 dark:text-gray-400">{scan.type}</span>
                  </td>
                  <td className="px-6 py-4">
                    <StatusChip status={scan.status} />
                  </td>
                  <td className="px-6 py-4">
                    <ProgressBar value={scan.progress} status={scan.status} />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5">
                      {scan.vulnerabilities.critical !== undefined && (
                        <SeverityBadge severity="critical" count={scan.vulnerabilities.critical} />
                      )}
                      {scan.vulnerabilities.high !== undefined && (
                        <SeverityBadge severity="high" count={scan.vulnerabilities.high} />
                      )}
                      {scan.vulnerabilities.medium !== undefined && (
                        <SeverityBadge severity="medium" count={scan.vulnerabilities.medium} />
                      )}
                      {scan.vulnerabilities.low !== undefined && (
                        <SeverityBadge severity="low" count={scan.vulnerabilities.low} />
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-sm text-gray-500 dark:text-gray-400">{scan.lastScan}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination footer */}
        <div className="flex items-center justify-between px-6 py-3 border-t border-gray-100 dark:border-surface-dark-border">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Showing {paginatedScans.length} of {searchQuery ? filteredScans.length : orgStats.totalScans} Scans
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded border border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-surface-dark-hover disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded border border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-surface-dark-hover disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Next page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </Card>

      {/* New Scan Modal */}
      <Modal
        isOpen={showNewScanModal}
        onClose={() => setShowNewScanModal(false)}
        title="New Scan"
      >
        <div className="space-y-4">
          <Input
            placeholder="Scan name"
            value={newScanName}
            onChange={(e) => setNewScanName(e.target.value)}
            aria-label="Scan name"
          />
          <Input
            placeholder="Target URL"
            value={newScanTarget}
            onChange={(e) => setNewScanTarget(e.target.value)}
            aria-label="Target URL"
          />
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" onClick={() => setShowNewScanModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleNewScan}>
              Start Scan
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

function StatItem({ label, value }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-gray-500 dark:text-gray-400">{label}</span>
      <span className="font-semibold text-gray-900 dark:text-white">{value}</span>
    </div>
  );
}

function Divider() {
  return <span className="text-gray-300 dark:text-white/80 hidden sm:inline">|</span>;
}

function DashboardSkeleton() {
  return (
    <div className="p-6">
      {/* Stats skeleton */}
      <div className="flex gap-4 mb-6">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-5 w-24" />
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white dark:bg-surface-dark-card rounded-xl border border-gray-100 dark:border-surface-dark-border p-5">
            <Skeleton className="h-4 w-32 mb-3" />
            <Skeleton className="h-10 w-16 mb-2" />
            <Skeleton className="h-3 w-40" />
          </div>
        ))}
      </div>
      {/* Table skeleton */}
      <div className="bg-white dark:bg-surface-dark-card rounded-xl border border-gray-100 dark:border-surface-dark-border p-4">
        <Skeleton className="h-10 w-full mb-4" />
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Skeleton key={i} className="h-14 w-full mb-2" />
        ))}
      </div>
    </div>
  );
}
