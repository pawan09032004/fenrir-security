export const mockScans = [
  { id: 1, name: 'Web App Servers', type: 'Greybox', status: 'completed', progress: 100, vulnerabilities: { critical: 5, high: 12, medium: 23, low: 18 }, lastScan: '4d ago' },
  { id: 2, name: 'Web App Servers', type: 'Greybox', status: 'completed', progress: 100, vulnerabilities: { critical: 5, high: 12, medium: 23, low: 18 }, lastScan: '4d ago' },
  { id: 3, name: 'Web App Servers', type: 'Greybox', status: 'completed', progress: 100, vulnerabilities: { critical: 5, high: 12, medium: 23, low: 18 }, lastScan: '4d ago' },
  { id: 4, name: 'Web App Servers', type: 'Greybox', status: 'completed', progress: 100, vulnerabilities: { critical: 5, high: 12, medium: 23, low: 18 }, lastScan: '4d ago' },
  { id: 5, name: 'Web App Servers', type: 'Greybox', status: 'completed', progress: 100, vulnerabilities: { critical: 5, high: 12, medium: 23, low: 18 }, lastScan: '4d ago' },
  { id: 6, name: 'Web App Servers', type: 'Greybox', status: 'completed', progress: 100, vulnerabilities: { critical: 5, high: 12, medium: 23, low: 18 }, lastScan: '4d ago' },
  { id: 7, name: 'Web App Servers', type: 'Greybox', status: 'completed', progress: 100, vulnerabilities: { critical: 5, high: 12, medium: 23, low: 18 }, lastScan: '4d ago' },
  { id: 8, name: 'Web App Servers', type: 'Greybox', status: 'scheduled', progress: 100, vulnerabilities: { critical: 5, high: 12, medium: 0, low: 0 }, lastScan: '4d ago' },
  { id: 9, name: 'Web App Servers', type: 'Greybox', status: 'scheduled', progress: 100, vulnerabilities: { critical: 5, high: 12, medium: 0, low: 0 }, lastScan: '4d ago' },
  { id: 10, name: 'IoT Devices', type: 'Blackbox', status: 'failed', progress: 10, vulnerabilities: { critical: 2, high: 4, medium: 8, low: 1 }, lastScan: '3d ago' },
  { id: 11, name: 'Temp Data', type: 'Blackbox', status: 'failed', progress: 10, vulnerabilities: { critical: 2, high: 4, medium: 8, low: 1 }, lastScan: '3d ago' },
  { id: 12, name: 'API Gateway', type: 'Greybox', status: 'completed', progress: 100, vulnerabilities: { critical: 3, high: 7, medium: 12, low: 9 }, lastScan: '2d ago' },
  { id: 13, name: 'Auth Service', type: 'Blackbox', status: 'completed', progress: 100, vulnerabilities: { critical: 1, high: 3, medium: 5, low: 2 }, lastScan: '1d ago' },
  { id: 14, name: 'File Storage', type: 'Greybox', status: 'scheduled', progress: 0, vulnerabilities: { critical: 0, high: 0, medium: 0, low: 0 }, lastScan: '5d ago' },
  { id: 15, name: 'Mobile Backend', type: 'Blackbox', status: 'failed', progress: 35, vulnerabilities: { critical: 4, high: 6, medium: 9, low: 3 }, lastScan: '6d ago' },
]

export const mockFindings = [
  {
    id: 1,
    severity: 'critical',
    timestamp: '10:45:23',
    title: 'SQL Injection in Authentication Endpoint',
    endpoint: '/api/users/profile',
    description: 'Time-based blind SQL injection confirmed on user-controlled input during authentication flow. Exploitation allows database-level access.',
  },
  {
    id: 2,
    severity: 'high',
    timestamp: '10:45:23',
    title: 'Unauthorized Access to User Metadata',
    endpoint: '/api/auth/login',
    description: 'Authenticated low-privilege user was able to access metadata of other users. Access control checks were missing.',
  },
  {
    id: 3,
    severity: 'medium',
    timestamp: '10:45:23',
    title: 'Broken Authentication Rate Limiting',
    endpoint: '/api/search',
    description: 'No effective rate limiting detected on login attempts. Automated brute-force attempts possible.',
  },
]

export const mockConsoleLogs = [
  { id: 1, timestamp: '09:00:00', parts: [{ type: 'text', content: "I'll begin a systematic penetration test on " }, { type: 'link', content: 'helpdesk.democorp.com' }, { type: 'text', content: ". Let me start with reconnaissance and enumeration." }] },
  { id: 2, timestamp: '09:01:00', parts: [{ type: 'text', content: "Good! target is online. Now let me perform port scanning to identify running services." }] },
  { id: 3, timestamp: '09:02:00', parts: [{ type: 'text', content: "Excellent reconnaisance results:\n   - helpdesk.democorp.com: Apache httpd 2.4.65 on port 80 (web server)\nLet me probe the web server on target first to understand its structure." }] },
  { id: 4, timestamp: '09:03:00', parts: [{ type: 'text', content: 'Great! I found a login page for a Help Desk Platform. I can see a useful comment: "' }, { type: 'highlight', content: 'TODO: Delete the testing account (test:test)' }, { type: 'text', content: '". Let me test this credential. The login redirects to ' }, { type: 'code', content: '/password/test' }, { type: 'text', content: '. Let me follow that path and explore it.' }] },
  { id: 5, timestamp: '09:04:00', parts: [{ type: 'text', content: "The POST method is not allowed on /password/test. Let me check what the JavaScript does - it posts to " }, { type: 'code', content: "'#'" }, { type: 'text', content: " which means the current page. Let me try a different approach." }] },
  { id: 6, timestamp: '09:05:00', parts: [{ type: 'text', content: "It redirects back to /password/test. Let me check if there's an /api endpoint or look for other paths. Let me also try exploring with the " }, { type: 'highlight', content: 'test:test' }, { type: 'text', content: " password directly on other endpoints." }] },
  { id: 7, timestamp: '09:06:00', parts: [{ type: 'text', content: "Great! I can access the dashboard using the " }, { type: 'highlight', content: "'X-UserId: 10032'" }, { type: 'text', content: ' header. The dashboard shows "Welcome, John Doe". This suggests an ' }, { type: 'danger', content: '**IDOR vulnerability**' }, { type: 'text', content: ' - I can access any user\'s dashboard by just changing the X-UserId header. Let me explore more of the application...' }] },
]

export const projectInfo = {
  org: 'Project X',
  owner: 'Nammagiri',
  totalScans: 100,
  scheduled: 1000,
  rescans: 100,
  failedScans: 100,
  lastUpdated: '10 mins ago',
}

export const mockVerificationLoops = [
  {
    id: 1,
    timestamp: '09:07:00',
    status: 'confirmed',
    title: 'IDOR — User Dashboard Access',
    steps: [
      { label: 'Attempt 1', detail: 'GET /dashboard — Header: X-UserId: 10031 → 403 Forbidden', result: 'fail' },
      { label: 'Attempt 2', detail: 'GET /dashboard — Header: X-UserId: 10032 → 200 OK (John Doe)', result: 'pass' },
      { label: 'Attempt 3', detail: 'GET /dashboard — Header: X-UserId: 10033 → 200 OK (Jane Smith)', result: 'pass' },
    ],
    conclusion: 'IDOR confirmed. Any authenticated user can access any other user dashboard by incrementing X-UserId.',
  },
  {
    id: 2,
    timestamp: '09:09:00',
    status: 'confirmed',
    title: 'SQL Injection — Auth Endpoint',
    steps: [
      { label: 'Payload 1', detail: "POST /api/auth/login — username: admin' OR '1'='1 → 200 OK", result: 'pass' },
      { label: 'Payload 2', detail: "POST /api/auth/login — username: test' AND SLEEP(5)-- → Delay 5s", result: 'pass' },
      { label: 'Payload 3', detail: "POST /api/auth/login — username: ' UNION SELECT 1,2,3-- → 500 Error", result: 'fail' },
    ],
    conclusion: 'Time-based blind SQLi confirmed. Attacker can dump DB contents via boolean/time inference.',
  },
  {
    id: 3,
    timestamp: '09:12:00',
    status: 'investigating',
    title: 'Rate Limit — Brute Force on /api/search',
    steps: [
      { label: 'Burst 1', detail: '50 requests in 1s → all 200 OK, no throttle', result: 'pass' },
      { label: 'Burst 2', detail: '200 requests in 5s → no 429, no CAPTCHA', result: 'pass' },
      { label: 'Burst 3', detail: '500 requests in 10s → connection reset on 347th', result: 'fail' },
    ],
    conclusion: 'Soft limit detected at ~350 req/10s. Formal rate limiting absent; brute-force feasible.',
  },
]

export const stats = [
  { label: 'Critical Severity', value: 86, change: '+2% increase than yesterday', trend: 'up', severity: 'critical' },
  { label: 'High Severity', value: 16, change: '+0.9% increase than yesterday', trend: 'up', severity: 'high' },
  { label: 'Medium Severity', value: 26, change: '↓ +0.9% decrease than yesterday', trend: 'down', severity: 'medium' },
  { label: 'Low Severity', value: 16, change: '+0.9% increase than yesterday', trend: 'up', severity: 'low' },
]
