/**
 * Virtual Filesystem & Process State per Lab
 * CDAC Cloud Security Training Platform
 * Pure in-memory simulated Linux filesystem and process table.
 * Never touches host OS or browser files.
 * Strictly scoped per labId.
 */

export const generateRandomPid = () => {
  return Math.floor(1000 + Math.random() * 8999);
};

export const getInitialProcesses = (seedPid) => {
  const billingPid = seedPid || generateRandomPid();
  return [
    { pid: 1, user: 'root', cpu: '0.0', mem: '0.1', vsz: '168924', rss: '12400', tty: '?', stat: 'Ss', start: '08:00', time: '0:01', command: '/sbin/init' },
    { pid: 241, user: 'root', cpu: '0.0', mem: '0.0', vsz: '72340', rss: '4120', tty: '?', stat: 'Ss', start: '08:00', time: '0:00', command: '/usr/sbin/sshd -D' },
    { pid: 312, user: 'syslog', cpu: '0.0', mem: '0.0', vsz: '224100', rss: '5340', tty: '?', stat: 'Ssl', start: '08:00', time: '0:00', command: '/usr/sbin/rsyslogd -n' },
    { pid: 480, user: 'trainee', cpu: '0.0', mem: '0.1', vsz: '14320', rss: '5890', tty: 'pts/0', stat: 'Ss', start: '08:02', time: '0:00', command: '-bash' },
    { pid: billingPid, user: 'quickmart', cpu: '0.2', mem: '0.8', vsz: '184920', rss: '38400', tty: '?', stat: 'S', start: '08:10', time: '0:02', command: 'python3 /opt/quickmart/billing_sync.py --daemon' }
  ];
};

export const getInitialVirtualFilesystem = (labId, processPid) => {
  const normLab = (labId || '').toLowerCase().replace('-', '');

  // Strictly scope M1 Lab 1 filesystem
  if (normLab === 'm1lab1' || normLab === 'lab1' && labId === 'm1-lab1') {
    const billingPid = processPid || generateRandomPid();

    return {
      labId: 'm1-lab1',
      currentUser: 'trainee',
      currentDir: '/home/trainee',
      processes: getInitialProcesses(billingPid),
      seededBillingPid: billingPid,
      files: {
        '/home/trainee/.access_notes': {
          name: '.access_notes',
          path: '/home/trainee/.access_notes',
          type: 'file',
          hidden: true,
          mode: '640',
          permissions: '-rw-r-----',
          owner: 'trainee',
          group: 'trainee',
          size: 194,
          date: 'Oct 15 08:05',
          content: `QuickMart Production Workstation Access Notes
Environment: quickmart-internal
User: trainee
Internal Access Token Flag: FLAG{HIDE-9f3a}
`
        },
        '/home/trainee/shared_report.txt': {
          name: 'shared_report.txt',
          path: '/home/trainee/shared_report.txt',
          type: 'file',
          hidden: false,
          mode: '777', // Initially world-writable; deliverable is chmod 640
          permissions: '-rwxrwxrwx',
          owner: 'trainee',
          group: 'trainee',
          size: 210,
          date: 'Oct 15 08:12',
          content: `QuickMart Infrastructure Assessment Report
Target: Production Workloads & Microservices
Finding: Shared report file initialized with insecure default permissions.
Remediation required: restrict file permissions to owner read/write and group read.
`
        },
        '/var/log/app/access.log': {
          name: 'access.log',
          path: '/var/log/app/access.log',
          type: 'file',
          hidden: false,
          mode: '644',
          permissions: '-rw-r--r--',
          owner: 'root',
          group: 'adm',
          size: 512,
          date: 'Oct 15 08:20',
          content: `2026-10-15 08:00:12 [INFO] systemd[1]: Starting system logging daemon...
2026-10-15 08:02:44 [INFO] sshd[241]: Accepted publickey for trainee from 10.20.1.2 port 51432 ssh2
2026-10-15 08:06:19 [WARN] app-gateway: Inbound connection probe from subnet 10.20.1.0/24
2026-10-15 08:12:05 [AUTH] FLAG{LOG-7c21} user trainee verified session token
2026-10-15 08:15:33 [INFO] billing_sync[${billingPid}]: Background reconciliation completed without errors.
2026-10-15 08:19:00 [INFO] kernel: Network interface eth0 link up, 1000Mbps full duplex
`
        }
      },
      directories: [
        '/home',
        '/home/trainee',
        '/var',
        '/var/log',
        '/var/log/app'
      ]
    };
  }

  // Generic fallback filesystem for any other lab (No answers, no flags)
  return {
    labId: labId || 'default',
    currentUser: 'trainee',
    currentDir: '/home/trainee',
    processes: [
      { pid: 1, user: 'root', cpu: '0.0', mem: '0.1', vsz: '168924', rss: '12400', tty: '?', stat: 'Ss', start: '08:00', time: '0:01', command: '/sbin/init' },
      { pid: 100, user: 'trainee', cpu: '0.0', mem: '0.1', vsz: '14320', rss: '5890', tty: 'pts/0', stat: 'Ss', start: '08:00', time: '0:00', command: '-bash' }
    ],
    seededBillingPid: null,
    files: {},
    directories: [
      '/home',
      '/home/trainee'
    ]
  };
};

export default getInitialVirtualFilesystem;
