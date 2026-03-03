export const activityLogs = [
  {
    id: 1,
    timestamp: '09:00:00',
    content: [
      { type: 'text', value: "I'll begin a systematic penetration test on " },
      { type: 'url', value: 'helpdesk.democorp.com' },
      { type: 'text', value: '. Let me start with reconnaissance and enumeration.' },
    ],
  },
  {
    id: 2,
    timestamp: '09:01:00',
    content: [
      { type: 'text', value: 'Good! target is online. Now let me perform port scanning to identify running services.' },
    ],
  },
  {
    id: 3,
    timestamp: '09:02:00',
    content: [
      { type: 'text', value: 'Excellent reconnaissance results:' },
    ],
    subContent: [
      {
        content: [
          { type: 'text', value: '- helpdesk.democorp.com: Apache httpd 2.4.65 on port 80 (web server)' },
        ],
      },
    ],
    followUp: [
      { type: 'text', value: 'Let me probe the web server on target first to understand its structure.' },
    ],
  },
  {
    id: 4,
    timestamp: '09:03:00',
    content: [
      { type: 'text', value: 'Great! I found a login page for a Help Desk Platform. I can see a useful comment: ' },
      { type: 'highlight-teal', value: '"TODO: Delete the testing account (test:test)"' },
      { type: 'text', value: '. Let me test this credential. The login redirects to ' },
      { type: 'path', value: '/password/test' },
      { type: 'text', value: '. Let me follow that path and explore it.' },
    ],
  },
  {
    id: 5,
    timestamp: '09:04:00',
    content: [
      { type: 'text', value: "The POST method is not allowed on /password/test. Let me check what the JavaScript does - it posts to " },
      { type: 'highlight-teal', value: "'#'" },
      { type: 'text', value: ' which means the current page. Let me try a different approach.' },
    ],
  },
  {
    id: 6,
    timestamp: '09:05:00',
    content: [
      { type: 'text', value: "It redirects back to /password/test. Let me check if there's an /api endpoint or look for other paths. Let me also try exploring with the " },
      { type: 'url', value: 'test:test' },
      { type: 'text', value: ' password directly on other endpoints.' },
    ],
  },
  {
    id: 7,
    timestamp: '09:06:00',
    content: [
      { type: 'text', value: 'Great! I can access the dashboard using the ' },
      { type: 'highlight-red', value: '"X-UserId: 10032"' },
      { type: 'text', value: ' header. The dashboard shows "Welcome, John Doe". This suggests an ' },
      { type: 'highlight-red', value: '**IDOR vulnerability**' },
      { type: 'text', value: " - I can access any user's dashboard by just changing the X-UserId header. Let me explore more of the application..." },
    ],
  },
];

export const verificationLogs = [
  {
    id: 1,
    timestamp: '10:30:00',
    content: [
      { type: 'text', value: 'Starting verification loop for SQL Injection finding...' },
    ],
  },
  {
    id: 2,
    timestamp: '10:31:00',
    content: [
      { type: 'text', value: 'Confirming blind SQL injection with time-based payload on ' },
      { type: 'url', value: '/api/users/profile' },
      { type: 'text', value: ' endpoint.' },
    ],
  },
  {
    id: 3,
    timestamp: '10:32:00',
    content: [
      { type: 'text', value: 'Response time delta: 5.2s with ' },
      { type: 'highlight-teal', value: "SLEEP(5)" },
      { type: 'text', value: ' payload. Confirmed time-based blind SQL injection.' },
    ],
  },
  {
    id: 4,
    timestamp: '10:33:00',
    content: [
      { type: 'text', value: 'Verifying IDOR vulnerability on ' },
      { type: 'url', value: '/api/auth/login' },
      { type: 'text', value: ' with different user session tokens.' },
    ],
  },
  {
    id: 5,
    timestamp: '10:34:00',
    content: [
      { type: 'text', value: 'Successfully accessed user metadata with low-privilege token. IDOR confirmed across 3 endpoints.' },
    ],
  },
];
