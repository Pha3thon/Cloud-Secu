/**
 * Lab 6 Validation Logic: Open the Front Door, Only the Front Door
 */

export const lab6 = {
  id: 'lab6',
  topicId: 'topic-6',
  topicNumber: 6,
  order: 6,
  title: 'Lab 6: Open the Front Door, Only the Front Door',
  priyaIntro: "Customers still can't reach the store. Only the web server should be public. The database stays private.",
  nextTopicId: 'topic-7',
  nextTopicNumber: 7,
  nextTopicTitle: 'Users & Roles (Keystone)',
  onComplete: 'celebrate',
  flags: [
    {
      id: 'lab6-flag1',
      flagNumber: 1,
      storyBeat: 'Allocate a floating IP from public-net and associate it with qm-web-01.',
      objective: 'Allocate floating IP 203.0.113.27 and associate with qm-web-01.',
      steps: [
        'In Horizon, open Project → Network → Floating IPs',
        "Click 'Allocate IP To Project', Pool: public-net → Allocate IP (you receive 203.0.113.27)",
        "On the row for 203.0.113.27, click 'Associate'",
        "Port to be associated: select 'qm-web-01: 10.20.1.3'",
        'Click Associate',
        'Do NOT attach any floating IP to qm-db-01!'
      ],
      check: (simState, labEvents = []) => {
        try {
          const fip = (simState.floatingIps || []).find((f) => f.ip === '203.0.113.27');
          if (!fip) return { pass: false, failures: ['Floating IP 203.0.113.27 has not been allocated from public-net.'] };
          if (fip.instanceId !== 'qm-web-01') return { pass: false, failures: ['Floating IP 203.0.113.27 must be associated with qm-web-01.'] };
          const dbFip = (simState.floatingIps || []).find((f) => f.instanceId === 'qm-db-01');
          if (dbFip) return { pass: false, failures: ['qm-db-01 must NEVER have a floating IP attached!'] };
          return { pass: true, failures: [] };
        } catch (e) {
          return { pass: false, failures: ['Unexpected check error: ' + e.message] };
        }
      },
      question: 'What floating IP did you receive?',
      answers: ['203.0.113.27'],
      altAnswers: ['203.0.113.27/24'],
      hint: 'Look at the Floating IPs table.',
      priyaReply: '203.0.113.27 is routed to qm-web-01. The front door is open.'
    },
    {
      id: 'lab6-flag2',
      flagNumber: 2,
      storyBeat: 'Check remaining floating IP allocation limits.',
      objective: 'Verify remaining floating IP quota in Limit Summary.',
      steps: [
        'Navigate to Project → Compute → Overview',
        'Look at the Floating IPs gauge in the Limit Summary'
      ],
      check: (simState, labEvents = []) => {
        try {
          const allocatedCount = (simState.floatingIps || []).length;
          if (allocatedCount !== 1) {
            return { pass: false, failures: ['Floating IP quota check failed: exactly 1 floating IP must be allocated.'] };
          }
          if (!labEvents.includes('overview_opened')) {
            return { pass: false, failures: ['Navigate to Project → Compute → Overview this lab to confirm the Limit Summary.'] };
          }
          return { pass: true, failures: [] };
        } catch (e) {
          return { pass: false, failures: ['Unexpected check error: ' + e.message] };
        }
      },
      question: 'How many floating IPs do you have left?',
      answers: ['2'],
      altAnswers: ['two', '2 left', '2 floating ips'],
      hint: 'You started with 3 in Lab 1.',
      priyaReply: '2 remaining. One public IP is all QuickMart needs.'
    },
    {
      id: 'lab6-flag3',
      flagNumber: 3,
      storyBeat: 'Prove external exposure and internal isolation using the workstation browser.',
      objective: 'Test all four endpoints in Firefox from Kali workstation.',
      steps: [
        'In Firefox open http://203.0.113.27 (the storefront page loads)',
        'Open http://203.0.113.27/status (database shows connected)',
        'Open http://203.0.113.27:3306 (connection times out)',
        'Open http://10.20.1.4 (unable to connect)'
      ],
      check: (simState, labEvents = []) => {
        try {
          const visited = simState.browserVisitedUrls || [];
          const labVisited = labEvents.filter((e) => e.startsWith('url:')) || [];
          const hasUrl = (u) => visited.includes(u) || labVisited.includes(`url:${u}`);

          const checkedWeb = hasUrl('http://203.0.113.27');
          const checkedStatus = hasUrl('http://203.0.113.27/status');
          const checkedDbPort = hasUrl('http://203.0.113.27:3306');
          const checkedPriv = hasUrl('http://10.20.1.4');

          if (!checkedWeb || !checkedStatus || !checkedDbPort || !checkedPriv) {
            return {
              pass: false,
              failures: ['You must test all four URLs in Firefox: http://203.0.113.27, http://203.0.113.27/status, http://203.0.113.27:3306, and http://10.20.1.4.']
            };
          }
          return { pass: true, failures: [] };
        } catch (e) {
          return { pass: false, failures: ['Unexpected check error: ' + e.message] };
        }
      },
      question: 'What did Firefox show for http://203.0.113.27:3306?',
      answers: ['timed out'],
      altAnswers: ['timeout', 'connection has timed out', 'took too long', 'timed-out'],
      hint: 'The firewall has no rule for that port, so the request never gets an answer.',
      priyaReply: 'QuickMart is live! Front door is open, database is private. Next, we manage accounts.'
    }
  ]
};

export default lab6;
