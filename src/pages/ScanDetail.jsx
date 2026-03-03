import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import {
  ChevronDown,
  X,
  Loader2,
} from 'lucide-react';
import Card from '../components/ui/Card';
import ProgressRing from '../components/ui/ProgressRing';
import StepTracker from '../components/ui/StepTracker';
import Skeleton from '../components/ui/Skeleton';
import { scans } from '../data/scans';
import { findings } from '../data/findings';
import { activityLogs, verificationLogs } from '../data/logs';
import { cn } from '../lib/utils';

const metadata = [
  { label: 'Scan Type', value: 'Grey Box' },
  { label: 'Targets', value: 'google.com' },
  { label: 'Started At', value: 'Nov 22, 09:00AM' },
  { label: 'Credentials', value: '2 Active' },
  { label: 'Files', value: 'Control.pdf' },
  { label: 'Checklists', value: '40/350', accent: true },
];

const severityBadgeColors = {
  critical: 'bg-red-500',
  high: 'bg-orange-500',
  medium: 'bg-yellow-500',
  low: 'bg-green-500',
};

export default function ScanDetail() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('activity');
  const [consoleOpen, setConsoleOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const consoleRef = useRef(null);

  const scan = scans.find((s) => s.id === id) || scans[0];

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  // Auto-scroll console to bottom
  useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [activeTab]);

  if (loading) {
    return <ScanDetailSkeleton />;
  }

  const currentLogs = activeTab === 'activity' ? activityLogs : verificationLogs;

  return (
    <div className="p-6">
      {/* Progress + Steps Section */}
      <Card className="mb-6 overflow-hidden">
        <div className="flex flex-col lg:flex-row relative">
          {/* Progress Ring - vertically centered across full card height */}
          <div className="flex-shrink-0 w-[180px] flex items-center justify-center py-6">
            <ProgressRing value={scan.progress || 0} size={100} strokeWidth={7} />
          </div>

          {/* Vertical Divider - spans full card height */}
          <div className="hidden lg:block absolute left-[180px] top-0 bottom-0 w-px bg-gray-200 dark:bg-surface-dark-border" />

          {/* Right side: Step Tracker + Metadata */}
          <div className="flex-1 lg:pl-10 flex flex-col">
            {/* Step Tracker */}
            <div className="px-6 pt-6 pb-4">
              <StepTracker activeStep={0} />
            </div>

            {/* Metadata Row */}
            <div className="px-6 pt-4 pb-6 border-t border-gray-200 dark:border-surface-dark-border">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-10 gap-y-4">
                {metadata.map((item) => (
                  <div key={item.label}>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{item.label}</p>
                    <p
                      className={cn(
                        'text-[15px] font-bold',
                        item.accent
                          ? 'text-teal-accent'
                          : 'text-gray-900 dark:text-white'
                      )}
                    >
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Console + Finding Log */}
      {/* Console Header - spans full width */}
      <Card className="rounded-b-none border-b-0 overflow-hidden">
        <div className="flex items-center gap-3 px-5 py-3 border-b border-gray-100 dark:border-surface-dark-border">
          <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
          <span className="font-semibold text-sm text-gray-900 dark:text-white">
            Live Scan Console
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs rounded-full bg-teal-accent/10 text-teal-accent border border-teal-accent/20">
            <Loader2 className="w-3 h-3 animate-spin" />
            Running...
          </span>
          <div className="ml-auto flex items-center gap-2">
            <button
              onClick={() => setConsoleOpen(!consoleOpen)}
              className="p-1.5 rounded text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-surface-dark-hover"
              aria-label="Toggle console"
            >
              <ChevronDown className={cn('w-4 h-4 transition-transform', !consoleOpen && '-rotate-90')} />
            </button>
            <button
              className="p-1.5 rounded text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-surface-dark-hover"
              aria-label="Close console"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tabs row: Activity Log / Verification Loops on left, Finding Log on right */}
        <div className="flex items-center border-b border-gray-100 dark:border-surface-dark-border bg-white dark:bg-black">
          <div className="flex px-5 flex-[3]">
            <button
              onClick={() => setActiveTab('activity')}
              className={cn(
                'px-4 py-2.5 text-sm font-medium border-b-2 transition-colors -mb-px',
                activeTab === 'activity'
                  ? 'text-teal-accent border-teal-accent'
                  : 'text-gray-500 dark:text-gray-400 border-transparent hover:text-gray-700 dark:hover:text-gray-200'
              )}
            >
              Activity Log
            </button>
            <button
              onClick={() => setActiveTab('verification')}
              className={cn(
                'px-4 py-2.5 text-sm font-medium border-b-2 transition-colors -mb-px',
                activeTab === 'verification'
                  ? 'text-teal-accent border-teal-accent'
                  : 'text-gray-500 dark:text-gray-400 border-transparent hover:text-gray-700 dark:hover:text-gray-200'
              )}
            >
              Verification Loops
            </button>
          </div>
          <div className="flex-[2] px-5 border-l border-gray-100 dark:border-surface-dark-border py-2.5">
            <span className="font-semibold text-sm text-gray-900 dark:text-white">Finding Log</span>
          </div>
        </div>
      </Card>

      <div className="flex flex-col lg:flex-row gap-0">
        {/* Live Scan Console - Left Panel */}
        <Card className="flex-[3] lg:rounded-r-none lg:rounded-t-none overflow-hidden flex flex-col border-t-0">

          {/* Console Output */}
          {consoleOpen && (
            <div
              ref={consoleRef}
              className="console-output p-5 overflow-y-auto flex-1 bg-black"
              style={{ maxHeight: '450px' }}
            >
              {currentLogs.map((log) => (
                <div key={log.id} className="mb-5">
                  <div className="flex flex-wrap">
                    <span className="text-gray-500 dark:text-gray-500 mr-2">
                      [{log.timestamp}]
                    </span>
                    <span className="flex-1">
                      {log.content.map((segment, i) => (
                        <LogSegment key={i} segment={segment} />
                      ))}
                    </span>
                  </div>
                  {/* Sub-content (indented) */}
                  {log.subContent && (
                    <div className="border-l-2 border-gray-300 dark:border-gray-600 pl-4 ml-6 mt-2">
                      {log.subContent.map((sub, i) => (
                        <div key={i}>
                          {sub.content.map((segment, j) => (
                            <LogSegment key={j} segment={segment} />
                          ))}
                        </div>
                      ))}
                    </div>
                  )}
                  {/* Follow-up text */}
                  {log.followUp && (
                    <div className="ml-0 mt-2">
                      {log.followUp.map((segment, i) => (
                        <LogSegment key={i} segment={segment} />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Finding Log - Right Panel */}
        <Card className="flex-[2] lg:rounded-l-none lg:rounded-t-none lg:border-l-0 border-t-0 overflow-hidden flex flex-col">
          <div className="overflow-y-auto flex-1 p-4 space-y-3 bg-black" style={{ maxHeight: '520px' }}>
            {findings.map((finding) => (
              <div
                key={finding.id}
                className="p-4 rounded-xl bg-gray-50 dark:bg-surface-dark-hover/50 border border-gray-100 dark:border-surface-dark-border"
              >
                <div className="flex items-start justify-between mb-2">
                  <span
                    className={cn(
                      'inline-block px-3 py-1 text-xs font-bold text-white rounded-md capitalize',
                      severityBadgeColors[finding.severity]
                    )}
                  >
                    {finding.severity}
                  </span>
                  <span className="text-xs text-gray-400 dark:text-gray-500 tabular-nums">
                    {finding.timestamp}
                  </span>
                </div>
                <h4 className="font-semibold text-sm text-gray-900 dark:text-white mb-1">
                  {finding.title}
                </h4>
                <p className="text-sm text-teal-accent mb-1.5 font-mono">
                  {finding.endpoint}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                  {finding.description}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Status Bar */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-4 px-5 py-3 bg-white dark:bg-surface-dark-card rounded-xl border border-gray-100 dark:border-surface-dark-border text-xs"  style={{ display: 'none' }}>
        <div className="flex items-center gap-6">
          <StatusBarItem label="Sub-agents" value="3" />
          <StatusBarItem label="Parallel Executions" value="2" />
          <StatusBarItem label="Operations" value="147" />
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5">
            <span className="w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center text-[10px] font-bold">1</span>
            <span className="text-gray-500 dark:text-gray-400">Critical</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-5 h-5 rounded-full bg-orange-500 text-white flex items-center justify-center text-[10px] font-bold">1</span>
            <span className="text-gray-500 dark:text-gray-400">High</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-5 h-5 rounded-full bg-yellow-500 text-white flex items-center justify-center text-[10px] font-bold">1</span>
            <span className="text-gray-500 dark:text-gray-400">Medium</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-5 h-5 rounded-full bg-green-500 text-white flex items-center justify-center text-[10px] font-bold">0</span>
            <span className="text-gray-500 dark:text-gray-400">Low</span>
          </span>
        </div>
      </div>
    </div>
  );
}

function LogSegment({ segment }) {
  switch (segment.type) {
    case 'url':
      return (
        <span className="text-teal-accent">{segment.value}</span>
      );
    case 'path':
      return (
        <span className="bg-teal-accent/20 text-teal-accent px-1.5 py-0.5 rounded text-[12px]">
          {segment.value}
        </span>
      );
    case 'highlight-teal':
      return (
        <span className="bg-teal-accent/20 text-teal-accent px-1.5 py-0.5 rounded text-[12px]">
          {segment.value}
        </span>
      );
    case 'highlight-red':
      return (
        <span className="bg-red-500/20 text-red-400 px-1.5 py-0.5 rounded text-[12px] font-semibold">
          {segment.value}
        </span>
      );
    case 'text':
    default:
      return (
        <span className="text-gray-700 dark:text-gray-300">{segment.value}</span>
      );
  }
}

function StatusBarItem({ label, value }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-gray-500 dark:text-gray-400">{label}:</span>
      <span className="font-semibold text-gray-900 dark:text-white">{value}</span>
    </div>
  );
}

function ScanDetailSkeleton() {
  return (
    <div className="p-6">
      <div className="bg-white dark:bg-surface-dark-card rounded-xl border border-gray-100 dark:border-surface-dark-border p-6 mb-6">
        <div className="flex items-center gap-8">
          <Skeleton className="w-[130px] h-[130px] rounded-full" />
          <div className="flex-1 flex items-center gap-8">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <Skeleton className="w-12 h-12 rounded-full" />
                <Skeleton className="w-16 h-3" />
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-6 gap-4 mt-6 pt-6 border-t border-gray-100 dark:border-surface-dark-border">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i}>
              <Skeleton className="h-3 w-16 mb-2" />
              <Skeleton className="h-4 w-24" />
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-0">
        <div className="flex-[3] bg-white dark:bg-surface-dark-card rounded-xl border border-gray-100 dark:border-surface-dark-border p-5">
          <Skeleton className="h-8 w-48 mb-4" />
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-16 w-full mb-3" />
          ))}
        </div>
        <div className="flex-[2] bg-white dark:bg-surface-dark-card rounded-xl border border-gray-100 dark:border-surface-dark-border p-5 ml-0">
          <Skeleton className="h-6 w-32 mb-4" />
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-28 w-full mb-3" />
          ))}
        </div>
      </div>
    </div>
  );
}
