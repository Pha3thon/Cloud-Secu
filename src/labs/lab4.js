/**
 * Lab 4 Validation Logic: Build the Firewalls
 */

export const lab4 = {
  id: 'lab4',
  topicId: 'topic-4',
  topicNumber: 4,
  order: 4,
  title: 'Lab 4: Build the Firewalls',
  priyaIntro: "Network's up. Now the firewalls. Nothing gets in unless a rule says so.",
  nextTopicId: 'topic-5',
  nextTopicNumber: 5,
  nextTopicTitle: 'Launching Instances (Nova, Glance, Neutron)',
  onComplete: 'continue',
  flags: [
    {
      id: 'lab4-flag1',
      flagNumber: 1,
      storyBeat: 'Create the web security group and understand default egress behavior.',
      objective: 'Create security group qm-web-sg and inspect its initial rules.',
      steps: [
        'In Horizon, open Project → Network → Security Groups',
        "Click '+ Create Security Group'",
        'Name: qm-web-sg, Description: QuickMart Web Security Group',
        'Click Create Security Group',
        "Click 'Manage Rules' on qm-web-sg"
      ],
      check: (simState, labEvents = []) => {
        try {
          const sg = (simState.securityGroups || []).find((s) => s.name === 'qm-web-sg');
          if (!sg) {
            return { pass: false, failures: ["Security group 'qm-web-sg' has not been created."] };
          }
          if (!labEvents.includes('rules_viewed')) {
            return { pass: false, failures: ["Security group rules for 'qm-web-sg' have not been viewed yet this lab. Click Manage Rules."] };
          }
          return { pass: true, failures: [] };
        } catch (e) {
          return { pass: false, failures: ['Unexpected check error: ' + e.message] };
        }
      },
      question: 'In a brand-new security group, which direction is allowed by default?',
      answers: ['egress'],
      altAnswers: ['outbound', 'out', 'egress traffic'],
      hint: 'Look at the Direction column before adding anything.',
      priyaReply: 'Correct. Brand-new groups allow all egress (outbound), but block all ingress (inbound).'
    },
    {
      id: 'lab4-flag2',
      flagNumber: 2,
      storyBeat: 'Open the necessary web and administrative ingress ports on qm-web-sg.',
      objective: 'Add ingress rules for SSH (22), HTTP (80), and HTTPS (443) from 0.0.0.0/0.',
      steps: [
        'Inside Manage Rules for qm-web-sg, click "+ Add Rule"',
        'Rule 1: Rule = SSH, Remote = CIDR, CIDR = 0.0.0.0/0 → Add',
        'Rule 2: Rule = HTTP, Remote = CIDR, CIDR = 0.0.0.0/0 → Add',
        'Rule 3: Rule = HTTPS, Remote = CIDR, CIDR = 0.0.0.0/0 → Add'
      ],
      check: (simState, labEvents = []) => {
        try {
          const sg = (simState.securityGroups || []).find((s) => s.name === 'qm-web-sg');
          if (!sg) return { pass: false, failures: ["Security group 'qm-web-sg' does not exist."] };
          const rules = sg.rules || [];
          const failures = [];
          const hasSsh = rules.some((r) => r.direction === 'ingress' && String(r.port) === '22' && r.remote === '0.0.0.0/0');
          const hasHttp = rules.some((r) => r.direction === 'ingress' && String(r.port) === '80' && r.remote === '0.0.0.0/0');
          const hasHttps = rules.some((r) => r.direction === 'ingress' && String(r.port) === '443' && r.remote === '0.0.0.0/0');

          if (!hasSsh) failures.push("qm-web-sg is missing the SSH (22) ingress rule for 0.0.0.0/0.");
          if (!hasHttp) failures.push("qm-web-sg is missing the HTTP (80) ingress rule for 0.0.0.0/0.");
          if (!hasHttps) failures.push("qm-web-sg is missing the HTTPS (443) ingress rule for 0.0.0.0/0.");

          return { pass: failures.length === 0, failures };
        } catch (e) {
          return { pass: false, failures: ['Unexpected check error: ' + e.message] };
        }
      },
      question: 'How many ingress rules does qm-web-sg have now?',
      answers: ['3'],
      altAnswers: ['three', '3 rules'],
      hint: 'Count the rows marked Ingress.',
      priyaReply: "SSH from anywhere is fine for today. We'll tighten it in later hardening modules."
    },
    {
      id: 'lab4-flag3',
      flagNumber: 3,
      storyBeat: 'Configure the database security group with restricted ingress from the web tier only.',
      objective: 'Create qm-db-sg, allow MySQL (3306) and SSH (22) from qm-web-sg, with NO world access.',
      steps: [
        'Create Security Group: Name = qm-db-sg → Create',
        'Open Manage Rules on qm-db-sg',
        'Click "+ Add Rule": Rule = MySQL, Remote = Security Group, Security Group = qm-web-sg → Add',
        'Click "+ Add Rule": Rule = SSH, Remote = Security Group, Security Group = qm-web-sg → Add',
        'Ensure NO 0.0.0.0/0 rule exists on qm-db-sg'
      ],
      check: (simState, labEvents = []) => {
        try {
          const sg = (simState.securityGroups || []).find((s) => s.name === 'qm-db-sg');
          if (!sg) return { pass: false, failures: ["Security group 'qm-db-sg' does not exist."] };
          const rules = sg.rules || [];
          const failures = [];
          const hasWorldRule = rules.some((r) => r.direction === 'ingress' && r.remote === '0.0.0.0/0');
          if (hasWorldRule) {
            failures.push("qm-db-sg contains a 0.0.0.0/0 rule! Database must NOT be exposed to the world.");
          }
          const hasMysql = rules.some((r) => r.direction === 'ingress' && String(r.port) === '3306' && r.remote === 'qm-web-sg');
          const hasSsh = rules.some((r) => r.direction === 'ingress' && String(r.port) === '22' && r.remote === 'qm-web-sg');

          if (!hasMysql) failures.push("qm-db-sg is missing MySQL (3306) rule allowing remote group 'qm-web-sg'.");
          if (!hasSsh) failures.push("qm-db-sg is missing SSH (22) rule allowing remote group 'qm-web-sg'.");

          return { pass: failures.length === 0, failures };
        } catch (e) {
          return { pass: false, failures: ['Unexpected check error: ' + e.message] };
        }
      },
      question: 'What is the remote on the port 3306 rule?',
      answers: ['qm-web-sg'],
      altAnswers: ['qm web sg', 'qm-web-sg security group'],
      hint: 'You are allowing a group, not an IP address.',
      priyaReply: 'Perfect. The database only answers packets originating from the web server.'
    }
  ]
};

export default lab4;
