/**
 * Lab 5 Validation Logic: Bring It to Life
 */

export const lab5 = {
  id: 'lab5',
  topicId: 'topic-5',
  topicNumber: 5,
  order: 5,
  title: 'Lab 5: Bring It to Life',
  priyaIntro: "Time to launch. Web server first, then the database. You'll need a key pair so you can log in without a password.",
  nextTopicId: 'topic-6',
  nextTopicNumber: 6,
  nextTopicTitle: 'Floating IPs & Exposure (Neutron)',
  onComplete: 'continue',
  flags: [
    {
      id: 'lab5-flag1',
      flagNumber: 1,
      storyBeat: 'Create qm-key and launch qm-web-01 into qm-net with qm-web-sg.',
      objective: 'Create key pair qm-key, then launch instance qm-web-01.',
      steps: [
        'Project → Compute → Key Pairs → "+ Create Key Pair", Name: qm-key → Create. Kali Downloads receives qm-key.pem',
        'Project → Compute → Instances → "Launch Instance"',
        'Details: Instance Name = qm-web-01, Count = 1',
        'Source: Boot Source = Image, Create New Volume = No, Image = ubuntu-22.04 (click ↑)',
        'Flavor: Select m1.small (click ↑)',
        'Networks: Allocate qm-net (click ↑)',
        "Security Groups: REMOVE 'default' (click ↓), ALLOCATE 'qm-web-sg' (click ↑)",
        'Key Pair: Allocate qm-key',
        'Click Launch Instance and wait for status to become ACTIVE'
      ],
      check: (simState, labEvents = []) => {
        try {
          const key = (simState.keyPairs || []).find((k) => k.name === 'qm-key');
          if (!key) return { pass: false, failures: ["Key pair 'qm-key' has not been created yet."] };
          const vm = (simState.instances || []).find((i) => i.name === 'qm-web-01');
          if (!vm) return { pass: false, failures: ["Instance 'qm-web-01' has not been launched."] };

          const failures = [];
          if (vm.status !== 'ACTIVE') failures.push("qm-web-01 is still building; wait until status is ACTIVE.");
          if (vm.image !== 'ubuntu-22.04') failures.push("qm-web-01 must use image 'ubuntu-22.04'.");
          if (vm.flavor !== 'm1.small') failures.push("qm-web-01 must use flavor 'm1.small'.");
          if (vm.network !== 'qm-net') failures.push("qm-web-01 must be attached to network 'qm-net'.");
          if (vm.securityGroups?.includes('default')) failures.push("qm-web-01 still has the default security group! Remove 'default' and keep only 'qm-web-sg'.");
          if (!vm.securityGroups?.includes('qm-web-sg')) failures.push("qm-web-01 is missing the 'qm-web-sg' security group.");

          return { pass: failures.length === 0, failures };
        } catch (e) {
          return { pass: false, failures: ['Unexpected check error: ' + e.message] };
        }
      },
      question: 'What private IP did qm-web-01 receive?',
      answers: ['10.20.1.3'],
      altAnswers: ['10.20.1.3/24'],
      hint: 'The DHCP service took .2, so the first instance gets the next free address.',
      priyaReply: 'qm-web-01 is ACTIVE at 10.20.1.3 with qm-web-sg.'
    },
    {
      id: 'lab5-flag2',
      flagNumber: 2,
      storyBeat: 'Now launch the database instance qm-db-01 using the mysql-8-server image.',
      objective: 'Launch qm-db-01 with flavor m1.medium, qm-db-sg only, and qm-key.',
      steps: [
        'Project → Compute → Instances → "Launch Instance"',
        'Details: Name = qm-db-01',
        'Source: Boot Source = Image, Volume = No, Image = mysql-8-server (click ↑)',
        'Flavor: Select m1.medium (click ↑)',
        'Networks: Allocate qm-net (click ↑)',
        'Security Groups: REMOVE default (click ↓), ALLOCATE qm-db-sg (click ↑)',
        'Key Pair: Allocate qm-key',
        'Click Launch Instance and wait for ACTIVE'
      ],
      check: (simState, labEvents = []) => {
        try {
          const vm = (simState.instances || []).find((i) => i.name === 'qm-db-01');
          if (!vm) return { pass: false, failures: ["Instance 'qm-db-01' has not been launched."] };

          const failures = [];
          if (vm.status !== 'ACTIVE') failures.push("qm-db-01 is still building; wait until status is ACTIVE.");
          if (vm.image !== 'mysql-8-server') failures.push("qm-db-01 must use image 'mysql-8-server'.");
          if (vm.flavor !== 'm1.medium') failures.push("qm-db-01 must use flavor 'm1.medium'.");
          if (vm.network !== 'qm-net') failures.push("qm-db-01 must be attached to network 'qm-net'.");
          if (vm.securityGroups?.includes('default')) failures.push("qm-db-01 still has the default security group! Remove 'default' and use only 'qm-db-sg'.");
          if (!vm.securityGroups?.includes('qm-db-sg')) failures.push("qm-db-sg is not allocated to qm-db-01.");

          return { pass: failures.length === 0, failures };
        } catch (e) {
          return { pass: false, failures: ['Unexpected check error: ' + e.message] };
        }
      },
      question: 'What private IP did qm-db-01 receive?',
      answers: ['10.20.1.4'],
      altAnswers: ['10.20.1.4/24'],
      hint: 'It launched after the web server.',
      priyaReply: 'qm-db-01 is ACTIVE at 10.20.1.4 protected by qm-db-sg.'
    },
    {
      id: 'lab5-flag3',
      flagNumber: 3,
      storyBeat: 'Confirm our hardware resource consumption in Overview.',
      objective: 'Check total vCPU consumption in Limit Summary.',
      steps: [
        'Navigate to Project → Compute → Overview',
        'Look at the VCPUs gauge in the Limit Summary'
      ],
      check: (simState, labEvents = []) => {
        try {
          const web = (simState.instances || []).find((i) => i.name === 'qm-web-01');
          const db = (simState.instances || []).find((i) => i.name === 'qm-db-01');
          const failures = [];
          if (!web || web.status !== 'ACTIVE') failures.push("qm-web-01 must be ACTIVE.");
          if (!db || db.status !== 'ACTIVE') failures.push("qm-db-01 must be ACTIVE.");
          if (!labEvents.includes('overview_opened')) {
            failures.push("Open Project → Compute → Overview this lab to confirm the Limit Summary.");
          }
          return { pass: failures.length === 0, failures };
        } catch (e) {
          return { pass: false, failures: ['Unexpected check error: ' + e.message] };
        }
      },
      question: 'How many VCPUs does the project now show as used?',
      answers: ['3'],
      altAnswers: ['three', '3 vcpus'],
      hint: 'm1.small has 1 vCPU and m1.medium has 2.',
      priyaReply: "3 vCPUs used. Both machines are running, but customers still can't reach the store."
    }
  ]
};

export default lab5;
