/**
 * Lab 2 Validation Logic: Lay the Network
 */

export const lab2 = {
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
};

export default lab2;
