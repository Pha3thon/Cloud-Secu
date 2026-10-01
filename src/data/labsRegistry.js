// CDAC Cloud Security Training Platform - Labs Registry
// Single authoritative source of lab definitions, check functions, questions, and progression.
// FIX (Diag 7): Check functions are pure and wrapped in try/catch returning friendly specific failure messages so buttons never silently fail or throw.

export const LABS = {
  lab1: {
    id: 'lab1',
    topicId: 'topic-1',
    topicNumber: 1,
    order: 1,
    title: 'Lab 1: Meet Horizon & Know Your Limits',
    priyaIntro: "Welcome to QuickMart. I've set you up with a member account on our quickmart project. That's enough to build the whole platform, but not to change who has access. That part goes through me. First, get into Horizon and see what our project is allowed to build.",
    nextTopicId: 'topic-2',
    nextTopicNumber: 2,
    nextTopicTitle: 'Networks & Subnets (Neutron)',
    onComplete: 'continue',
    flags: [
      {
        id: 'lab1-flag1',
        flagNumber: 1,
        storyBeat: "Priya needs you to verify initial access to QuickMart's private cloud.",
        objective: 'Log in to Horizon web dashboard.',
        steps: [
          'In Kali Firefox, open http://horizon.quickmart.lab/dashboard',
          'Enter Domain: Default',
          'Enter User Name: trainee and Password: Quick@Mart1',
          'Click Sign In'
        ],
        check: (simState, labEvents = []) => {
          try {
            if (simState.activeHorizonUser === 'trainee') {
              return { pass: true, failures: [] };
            }
            return {
              pass: false,
              failures: ["User is not logged into Horizon as 'trainee'. Please sign in with the trainee credentials."]
            };
          } catch (e) {
            return { pass: false, failures: ['Unexpected check error: ' + e.message] };
          }
        },
        question: 'What is the name of the project shown at the top left?',
        answers: ['quickmart'],
        altAnswers: ['quickmart project'],
        hint: 'Look at the project selector in the top bar.',
        priyaReply: "Good. You're inside the quickmart project workspace."
      },
      {
        id: 'lab1-flag2',
        flagNumber: 2,
        storyBeat: 'Before deploying workloads, confirm our hardware allocations.',
        objective: 'Inspect project quotas in the Limit Summary.',
        steps: [
          'In the left navigation menu, expand Project → Compute',
          'Click on Overview',
          'Inspect the Limit Summary graphs on the page'
        ],
        check: (simState, labEvents = []) => {
          try {
            // FIX: check per-lab event only so previous labs do not auto-pass
            if (labEvents.includes('overview_opened')) {
              return { pass: true, failures: [] };
            }
            return {
              pass: false,
              failures: ['Project Overview has not been opened yet this lab. Navigate to Project → Compute → Overview.']
            };
          } catch (e) {
            return { pass: false, failures: ['Unexpected check error: ' + e.message] };
          }
        },
        question: 'How many floating IPs is the project allowed?',
        answers: ['3'],
        altAnswers: ['three', '3 floating ips'],
        hint: "Look at the Floating IPs graph. The number after 'of' is the limit.",
        priyaReply: 'Exactly 3 floating IPs. We will need one for our public web storefront later.'
      },
      {
        id: 'lab1-flag3',
        flagNumber: 3,
        storyBeat: "Calculate the total CPU requirement for QuickMart's architecture.",
        objective: 'Review available server images and calculate required vCPUs.',
        steps: [
          'Read Priya’s architecture plan: qm-web-01 (m1.small: 1 vCPU, 2 GB) and qm-db-01 (m1.medium: 2 vCPU, 4 GB)',
          'Navigate to Project → Compute → Images in Horizon',
          'Confirm that ubuntu-22.04 and mysql-8-server images exist'
        ],
        check: (simState, labEvents = []) => {
          try {
            // FIX: check per-lab event only so previous labs do not auto-pass
            if (labEvents.includes('images_opened')) {
              return { pass: true, failures: [] };
            }
            return {
              pass: false,
              failures: ['Images catalog has not been inspected yet this lab. Navigate to Project → Compute → Images.']
            };
          } catch (e) {
            return { pass: false, failures: ['Unexpected check error: ' + e.message] };
          }
        },
        question: 'How many vCPUs will the two servers need together?',
        answers: ['3'],
        altAnswers: ['three', '3 vcpus', '3 vcpu'],
        hint: 'Add the vCPUs of both flavors (1 for m1.small + 2 for m1.medium).',
        priyaReply: '3 vCPUs total. Our limit is 20 vCPUs, so we are well within capacity.'
      }
    ]
  },

  lab2: {
    id: 'lab2',
    topicId: 'topic-2',
    topicNumber: 2,
    order: 2,
    title: 'Lab 2: Lay the Network',
    priyaIntro: 'Good. Now QuickMart needs its own private network. Both servers will live on it.',
    nextTopicId: 'topic-3',
    nextTopicNumber: 3,
    nextTopicTitle: 'Routers (Neutron)',
    onComplete: 'continue',
    flags: [
      {
        id: 'lab2-flag1',
        flagNumber: 1,
        storyBeat: 'Priya wants the isolated internal network created with the exact specified parameters.',
        objective: 'Create network qm-net with subnet qm-subnet (10.20.1.0/24).',
        steps: [
          'In Horizon, open Project → Network → Networks',
          "Click '+ Create Network'",
          "Network tab: Network Name = qm-net, ensure 'Create Subnet' is checked",
          'Subnet tab: Subnet Name = qm-subnet, Network Address = 10.20.1.0/24, Gateway IP = 10.20.1.1',
          "Subnet Details tab: Ensure 'Enable DHCP' is ticked",
          'Click Create'
        ],
        check: (simState, labEvents = []) => {
          try {
            const net = (simState.networks || []).find((n) => n.name === 'qm-net');
            const failures = [];
            if (!net) {
              failures.push("Network 'qm-net' does not exist.");
              return { pass: false, failures };
            }
            if (net.subnetName !== 'qm-subnet') {
              failures.push("Subnet name must be exactly 'qm-subnet'.");
            }
            if (net.cidr !== '10.20.1.0/24') {
              failures.push("Network Address (CIDR) must be '10.20.1.0/24'.");
            }
            if (net.gateway !== '10.20.1.1') {
              failures.push("Gateway IP must be '10.20.1.1'.");
            }
            if (!net.dhcp) {
              failures.push('Enable DHCP must be checked.');
            }
            return { pass: failures.length === 0, failures };
          } catch (e) {
            return { pass: false, failures: ['Unexpected check error: ' + e.message] };
          }
        },
        question: 'Open qm-subnet. What is the last IP in the allocation pool?',
        answers: ['10.20.1.254'],
        altAnswers: ['10.20.1.254/24'],
        hint: 'Look at the Allocation Pools line in the subnet details.',
        priyaReply: 'Subnet is provisioned. The pool spans 10.20.1.2 to 10.20.1.254.'
      },
      {
        id: 'lab2-flag2',
        flagNumber: 2,
        storyBeat: 'Neutron has reserved its own interface on the network to service DHCP.',
        objective: 'Inspect the Ports tab to find the address claimed by the DHCP agent.',
        steps: [
          'In Project → Network → Networks, click on qm-net',
          'Switch to the Ports tab'
        ],
        check: (simState, labEvents = []) => {
          try {
            if (labEvents.includes('ports_tab_viewed')) {
              return { pass: true, failures: [] };
            }
            return {
              pass: false,
              failures: ["The Ports tab of 'qm-net' has not been inspected yet this lab. Open qm-net and switch to the Ports tab."]
            };
          } catch (e) {
            return { pass: false, failures: ['Unexpected check error: ' + e.message] };
          }
        },
        question: 'What IP address did the DHCP service take?',
        answers: ['10.20.1.2'],
        altAnswers: ['10.20.1.2/24'],
        hint: 'The gateway is .1. Look for the DHCP port.',
        priyaReply: '10.20.1.2 is claimed by Neutron DHCP. Any VM we launch will start from .3 onwards.'
      },
      {
        id: 'lab2-flag3',
        flagNumber: 3,
        storyBeat: 'Always verify your quota usage after allocating major network resources.',
        objective: 'Check your network quota in the Limit Summary.',
        steps: [
          'Navigate to Project → Compute → Overview',
          'Look at the Networks gauge in the Limit Summary'
        ],
        check: (simState, labEvents = []) => {
          try {
            const hasNet = (simState.networks || []).some((n) => n.name === 'qm-net');
            if (!hasNet) {
              return { pass: false, failures: ["Network 'qm-net' does not exist."] };
            }
            return { pass: true, failures: [] };
          } catch (e) {
            return { pass: false, failures: ['Unexpected check error: ' + e.message] };
          }
        },
        question: 'How many networks does the Limit Summary show as used?',
        answers: ['1'],
        altAnswers: ['one', '1 network'],
        hint: 'Look at the Networks graph.',
        priyaReply: '1 of 5 networks used. We are ready to connect this island to the router.'
      }
    ]
  },

  lab3: {
    id: 'lab3',
    topicId: 'topic-3',
    topicNumber: 3,
    order: 3,
    title: 'Lab 3: Connect to the Outside',
    priyaIntro: 'Right now QuickMart is an island. A router connects it to the internet.',
    nextTopicId: 'topic-4',
    nextTopicNumber: 4,
    nextTopicTitle: 'Security Groups (Neutron)',
    onComplete: 'continue',
    flags: [
      {
        id: 'lab3-flag1',
        flagNumber: 1,
        storyBeat: 'Create the virtual router and link its external interface to public-net.',
        objective: 'Create router qm-router with external network public-net.',
        steps: [
          'In Horizon, navigate to Project → Network → Routers',
          "Click '+ Create Router'",
          'Enter Router Name: qm-router',
          'Select External Network: public-net',
          'Click Create Router'
        ],
        check: (simState, labEvents = []) => {
          try {
            const router = (simState.routers || []).find((r) => r.name === 'qm-router');
            if (!router) {
              return { pass: false, failures: ["Router 'qm-router' does not exist."] };
            }
            if (router.externalNetwork !== 'public-net') {
              return { pass: false, failures: ["qm-router must have external network set to 'public-net'."] };
            }
            return { pass: true, failures: [] };
          } catch (e) {
            return { pass: false, failures: ['Unexpected check error: ' + e.message] };
          }
        },
        question: 'What external IP did the router receive?',
        answers: ['203.0.113.15'],
        altAnswers: ['203.0.113.15/24'],
        hint: 'Open the router and look at the External Gateway section.',
        priyaReply: '203.0.113.15 assigned. The router is tethered to the public cloud uplink.'
      },
      {
        id: 'lab3-flag2',
        flagNumber: 2,
        storyBeat: 'Plug qm-subnet into the router’s internal interface.',
        objective: 'Add an interface on qm-router for qm-subnet.',
        steps: [
          'Click on qm-router in the Routers list',
          'Switch to the Interfaces tab',
          "Click '+ Add Interface'",
          'Select Subnet: qm-subnet: 10.20.1.0/24 (qm-net)',
          'Leave IP Address blank (it takes the subnet gateway 10.20.1.1 automatically)',
          'Click Submit'
        ],
        check: (simState, labEvents = []) => {
          try {
            const router = (simState.routers || []).find((r) => r.name === 'qm-router');
            if (!router) {
              return { pass: false, failures: ["Router 'qm-router' does not exist."] };
            }
            if (!router.interfaces || !router.interfaces.includes('qm-subnet')) {
              return { pass: false, failures: ["qm-router has no interface attached for 'qm-subnet' at 10.20.1.1."] };
            }
            return { pass: true, failures: [] };
          } catch (e) {
            return { pass: false, failures: ['Unexpected check error: ' + e.message] };
          }
        },
        question: 'What IP does the router’s interface use on qm-net?',
        answers: ['10.20.1.1'],
        altAnswers: ['10.20.1.1/24'],
        hint: 'It takes the subnet’s gateway address.',
        priyaReply: 'Interface established at 10.20.1.1. Now packets on qm-net have an exit door.'
      },
      {
        id: 'lab3-flag3',
        flagNumber: 3,
        storyBeat: 'Verify the architectural connectivity in the visual topology map.',
        objective: 'View the live Network Topology diagram.',
        steps: [
          'In Project → Network, click on Network Topology',
          'Inspect the connections between public-net, qm-router, and qm-net'
        ],
        check: (simState, labEvents = []) => {
          try {
            const router = (simState.routers || []).find((r) => r.name === 'qm-router');
            const hasLinks = router && router.externalNetwork && router.interfaces?.length > 0;
            if (!labEvents.includes('topology_viewed')) {
              return { pass: false, failures: ['Network Topology diagram has not been viewed yet this lab. Open Project → Network → Network Topology.'] };
            }
            if (!hasLinks) {
              return { pass: false, failures: ['Topology verified, but qm-router links to networks are missing.'] };
            }
            return { pass: true, failures: [] };
          } catch (e) {
            return { pass: false, failures: ['Unexpected check error: ' + e.message] };
          }
        },
        question: 'How many networks does qm-router connect, counting public-net?',
        answers: ['2'],
        altAnswers: ['two', '2 networks'],
        hint: 'Count the networks touching the router in the diagram.',
        priyaReply: 'Exactly 2 networks bridged. Next, we build the firewall rules.'
      }
    ]
  },

  lab4: {
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
  },

  lab5: {
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
  },

  lab6: {
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
  },

  lab7: {
    id: 'lab7',
    topicId: 'topic-7',
    topicNumber: 7,
    order: 7,
    title: 'Lab 7: The Morning After (Fix the Broken Cloud)',
    priyaIntro: "QuickMart is live and the team is growing. Ravi from store ops and our supplier FreshFarms need access, and Sales wants a customer test account that needs none. IT has created the logins. You decide what access each should get and send me the requests. I'll approve what's right.",
    nextModuleId: 'm5',
    onComplete: 'celebrate',
    flags: [
      {
        id: 'lab7-flag1',
        flagNumber: 1,
        storyBeat: 'Submit access requests for the three new personas according to least privilege.',
        objective: 'In Access Portal, request ravi-employee=member, freshfarms-vendor=reader, customer-test=No access.',
        steps: [
          'In Firefox, open http://access.quickmart.lab',
          "Click '+ New Request'",
          "Request 1: User = ravi-employee, Role = member, Justification = 'Store operations lead needs to manage daily resources' → Submit",
          "Request 2: User = freshfarms-vendor, Role = reader, Justification = 'Produce supplier only views daily stock reports' → Submit",
          "Request 3: User = customer-test, Role = No access, Justification = 'Customers shop through the app and need zero cloud console access' → Submit",
          "Wait for all three to transition from 'Under review' to 'Approved'"
        ],
        check: (simState, labEvents = []) => {
          try {
            const reqs = simState.accessRequests || [];
            const ravi = reqs.find((r) => r.user === 'ravi-employee' && r.requestedRole === 'member' && r.status === 'Approved');
            const fresh = reqs.find((r) => r.user === 'freshfarms-vendor' && r.requestedRole === 'reader' && r.status === 'Approved');
            const cust = reqs.find((r) => r.user === 'customer-test' && r.requestedRole === 'No access' && r.status === 'Approved');

            const failures = [];
            if (!ravi) failures.push("Request for ravi-employee (member) has not been Approved.");
            if (!fresh) failures.push("Request for freshfarms-vendor (reader) has not been Approved.");
            if (!cust) failures.push("Request for customer-test (No access) has not been Approved.");

            return { pass: failures.length === 0, failures };
          } catch (e) {
            return { pass: false, failures: ['Unexpected check error: ' + e.message] };
          }
        },
        question: 'What access did you request for the vendor account?',
        answers: ['reader'],
        altAnswers: ['read-only', 'read only', 'reader role'],
        hint: 'The vendor only needs to view things.',
        priyaReply: 'Approved. All three roles assigned properly. Time to pack up for the day.'
      },
      {
        id: 'lab7-flag2',
        flagNumber: 2,
        storyBeat: 'Next morning, 9:12 AM. The audit bot flagged unauthorized overnight role escalations!',
        objective: 'Inspect access-report-0912.html, verify trainee 403, and test vendor delete safeguard.',
        steps: [
          'In Kali desktop, open Files → Documents → access-report-0912.html and inspect the overnight role assignments',
          'In Horizon as trainee, attempt to open http://horizon.quickmart.lab/identity/ and observe the 403 Forbidden error',
          'Sign out of Horizon and sign in as freshfarms-vendor (Password: Welcome@123)',
          "Go to Project → Compute → Instances, select qm-db-01, click 'Delete Instance' and confirm",
          "Observe the training safeguard banner: 'Training safeguard: nothing was deleted, but this request would have been Allowed.'"
        ],
        check: (simState, labEvents = []) => {
          try {
            const failures = [];
            // FIX: check per-lab events so previous state or global flags don't interfere
            const reportOpened = labEvents.includes('report_opened');
            const id403Seen = labEvents.includes('identity_403_seen');
            const vendorDelete = labEvents.includes('vendor_delete_attempted');

            if (!reportOpened) failures.push("Open Files → Documents → access-report-0912.html to review the overnight audit.");
            if (!id403Seen) failures.push("In Horizon as trainee, navigate to http://horizon.quickmart.lab/identity/ to observe 403 Forbidden.");
            if (!vendorDelete) failures.push("Sign in as freshfarms-vendor (Welcome@123) and attempt to delete qm-db-01 to verify safeguard.");

            return { pass: failures.length === 0, failures };
          } catch (e) {
            return { pass: false, failures: ['Unexpected check error: ' + e.message] };
          }
        },
        question: 'Which user holds the admin role but shouldn’t?',
        answers: ['freshfarms-vendor'],
        altAnswers: ['vendor', 'freshfarms', 'freshfarms-vendor user'],
        hint: 'A supplier only needs to look. Check who was allowed to delete qm-db-01.',
        priyaReply: 'The vendor was escalated to admin overnight! They could have deleted our entire database.'
      },
      {
        id: 'lab7-flag3',
        flagNumber: 3,
        storyBeat: 'Submit remediation requests and verify that excessive privileges are revoked.',
        objective: 'Remediate via Access Portal, verify vendor 403 on delete, and customer lockout.',
        steps: [
          'Sign back into Horizon / Access Portal as trainee (Quick@Mart1)',
          "In http://access.quickmart.lab, submit: freshfarms-vendor → reader (Justification: 'Revoke admin, restrict to read-only stock audit')",
          "Submit: customer-test → No access (Justification: 'Revoke member, customer accounts must not have cloud roles')",
          "Wait for both requests to show 'Approved'",
          'Sign in as freshfarms-vendor, retry deleting qm-db-01 → Observe HTTP 403 Forbidden',
          "Sign in as customer-test → Observe 'You are not authorized for any projects'"
        ],
        check: (simState, labEvents = []) => {
          try {
            const roles = simState.userRoles || {};
            const failures = [];
            if (roles['freshfarms-vendor'] !== 'reader') {
              failures.push("freshfarms-vendor role must be remediated to 'reader' in Access Portal.");
            }
            if (roles['customer-test'] !== null && roles['customer-test'] !== 'No access') {
              failures.push("customer-test role must be remediated to 'No access' in Access Portal.");
            }
            return { pass: failures.length === 0, failures };
          } catch (e) {
            return { pass: false, failures: ['Unexpected check error: ' + e.message] };
          }
        },
        question: 'What HTTP status code did the denied delete show?',
        answers: ['403'],
        altAnswers: ['403 forbidden', 'http 403', 'http 403 forbidden'],
        hint: 'Read the end of the red message after the vendor tries to delete.',
        priyaReply: "403 Forbidden! Least privilege is restored. You've completed Module M4!"
      }
    ]
  }
};
