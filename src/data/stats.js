export const orgStats = {
  org: 'Project X',
  owner: 'Nammagiri',
  totalScans: 100,
  scheduled: 1000,
  rescans: 100,
  failedScans: 100,
  lastUpdated: '10 mins ago',
};

export const severityStats = [
  {
    id: 'critical',
    label: 'Critical Severity',
    count: 86,
    change: '+2%',
    direction: 'up',
    description: 'increase from yesterday',
  },
  {
    id: 'high',
    label: 'High Severity',
    count: 16,
    change: '+0.9%',
    direction: 'up',
    description: 'increase from yesterday',
  },
  {
    id: 'medium',
    label: 'Medium Severity',
    count: 26,
    change: '-0.9%',
    direction: 'down',
    description: 'decrease from yesterday',
  },
  {
    id: 'low',
    label: 'Low Severity',
    count: 16,
    change: '+0.9%',
    direction: 'up',
    description: 'increase from yesterday',
  },
];
