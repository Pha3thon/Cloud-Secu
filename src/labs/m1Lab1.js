/**
 * M1 Lab 1: Linux CLI Essentials (45 min)
 * CDAC Cloud Security Training Platform
 * Attached to Topic 2: Linux CLI Fundamentals
 */

export const m1Lab1 = {
  id: 'm1-lab1',
  topicId: 'm1-topic-2',
  topicNumber: 2,
  order: 1,
  title: 'Lab 1: Linux CLI Essentials',
  priyaIntro: "Welcome to your first hands-on lab. Before we build cloud networks in OpenStack, you must be confident inside a Linux terminal: locating hidden files, remediating unsafe world-writable permissions, parsing audit logs with grep, and tracking background daemons.",
  nextTopicId: 'm1-topic-3',
  nextTopicNumber: 3,
  nextTopicTitle: 'Networking Models & IP Addressing',
  onComplete: 'continue',
  flags: [
    {
      id: 'm1-lab1-flag1',
      flagNumber: 1,
      storyBeat: "Locate and read the secret configuration notes planted in your home directory.",
      objective: "Find the hidden file .access_notes in your home directory.",
      steps: [
        'Open the Linux Terminal on your workstation.',
        'Verify your current path: pwd',
        'List all files including hidden dotfiles: ls -la',
        'Read the hidden file: cat .access_notes'
      ],
      check: (simState, labEvents = []) => {
        try {
          if (labEvents.includes('terminal_cat_access_notes')) {
            return { pass: true, failures: [] };
          }
          return {
            pass: false,
            failures: ["Hidden file '.access_notes' has not been inspected with cat. Run: cat .access_notes"]
          };
        } catch (e) {
          return { pass: false, failures: ['Check error: ' + e.message] };
        }
      },
      question: 'What is the exact internal access token flag printed inside .access_notes?',
      answers: ['FLAG{HIDE-9f3a}'],
      altAnswers: ['FLAG{HIDE-9f3a}'],
      hint: "Run 'ls -la' to see hidden dotfiles, then 'cat .access_notes'.",
      priyaReply: "Spot on! In Linux, dotfiles store sensitive user settings and credentials that standard 'ls' ignores."
    },
    {
      id: 'm1-lab1-flag2',
      flagNumber: 2,
      storyBeat: "An audit revealed that shared_report.txt was created with world-writable permission 777.",
      objective: "Harden shared_report.txt permissions to 640 so only owner can write and group can read.",
      steps: [
        'Inspect current permissions: ls -l shared_report.txt',
        'Notice -rwxrwxrwx (777), allowing any local user to tamper with the report.',
        'Apply POSIX octal mode 640: chmod 640 shared_report.txt',
        'Verify the hardened mode: ls -l shared_report.txt'
      ],
      check: (simState, labEvents = []) => {
        try {
          const isHardened =
            simState?.terminalVfs?.files?.['/home/trainee/shared_report.txt']?.mode === '640' ||
            labEvents.includes('terminal_chmod_640');
          if (isHardened) {
            return { pass: true, failures: [] };
          }
          return {
            pass: false,
            failures: ["shared_report.txt has not been hardened to mode 640. Run: chmod 640 shared_report.txt"]
          };
        } catch (e) {
          return { pass: false, failures: ['Check error: ' + e.message] };
        }
      },
      question: 'Submit the numeric octal mode you set for shared_report.txt (e.g. 640):',
      answers: ['640'],
      altAnswers: ['chmod 640', '640'],
      hint: "Run 'chmod 640 shared_report.txt'. Enter '640' as the answer.",
      priyaReply: "Excellent! Overly permissive 777 files are a frequent vector for local privilege escalation."
    },
    {
      id: 'm1-lab1-flag3',
      flagNumber: 3,
      storyBeat: "An authentication anomaly was logged in /var/log/app/access.log during an unauthorized access attempt.",
      objective: "Search the access log for the planted flag token using grep.",
      steps: [
        'Search the system application log: grep "FLAG" /var/log/app/access.log',
        'Optional investigation: Run ps aux | grep billing_sync to check active background processes.'
      ],
      check: (simState, labEvents = []) => {
        try {
          if (labEvents.includes('terminal_grep_flag') || labEvents.includes('terminal_cat_access_notes')) {
            return { pass: true, failures: [] };
          }
          return {
            pass: false,
            failures: ["No grep pattern search for 'FLAG' in /var/log/app/access.log detected. Run: grep FLAG /var/log/app/access.log"]
          };
        } catch (e) {
          return { pass: false, failures: ['Check error: ' + e.message] };
        }
      },
      question: 'What flag string was discovered inside /var/log/app/access.log?',
      answers: ['FLAG{LOG-7c21}'],
      altAnswers: ['FLAG{LOG-7c21}'],
      hint: "Run: grep FLAG /var/log/app/access.log",
      priyaReply: "Fantastic investigation! Filtering raw log streams with grep is essential for security triage and incident response."
    }
  ]
};

export default m1Lab1;
