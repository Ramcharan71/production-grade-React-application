export const findings = [
  {
    id: 'finding-001',
    severity: 'critical',
    title: 'SQL Injection in Authentication Endpoint',
    endpoint: '/api/users/profile',
    description: 'Time-based blind SQL injection confirmed on user-controlled input during authentication flow. Exploitation allows database-level access.',
    timestamp: '19:45:23',
  },
  {
    id: 'finding-002',
    severity: 'high',
    title: 'Unauthorized Access to User Metadata',
    endpoint: '/api/auth/login',
    description: 'Authenticated low-privilege user was able to access metadata of other users. Access control checks were missing.',
    timestamp: '10:45:23',
  },
  {
    id: 'finding-003',
    severity: 'medium',
    title: 'Broken Authentication Rate Limiting',
    endpoint: '/api/search',
    description: 'No effective rate limiting detected on login attempts. Automated brute-force attempts possible.',
    timestamp: '10:45:23',
  },
];
