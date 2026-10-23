/**
 * Lab 3 Validation Logic: Connect to the Outside
 */

export const lab3 = {
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
};

export default lab3;
