/**
 * Lab 1 Validation Logic: Meet Horizon & Know Your Limits
 */

export const lab1 = {
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
          if (simState.activeHorizonUser === 'trainee' || labEvents.includes('horizon_login_trainee')) {
            return { pass: true, failures: [] };
          }
          return {
            pass: false,
            failures: ["Horizon sign-in as 'trainee' was not completed. Sign in using domain 'Default' and username 'trainee'."]
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
      storyBeat: 'Before deploying workloads, confirm our hardware allocations and quotas.',
      objective: 'Inspect project quotas in the Limit Summary.',
      steps: [
        'In Horizon left navigation menu, expand Project → Compute',
        'Click on Overview',
        'Inspect the Limit Summary graphs on the page'
      ],
      check: (simState, labEvents = []) => {
        try {
          if (labEvents.includes('overview_opened') || simState.activePanel === 'overview') {
            return { pass: true, failures: [] };
          }
          return {
            pass: false,
            failures: ['Project Overview was not opened in Horizon. Navigate to Project → Compute → Overview.']
          };
        } catch (e) {
          return { pass: false, failures: ['Unexpected check error: ' + e.message] };
        }
      },
      question: 'How many floating IPs is the project allowed?',
      answers: ['3'],
      altAnswers: ['three', '3 floating ips'],
      hint: "Look at the Floating IPs graph limit.",
      priyaReply: 'Exactly 3 floating IPs. We will need one for our public web storefront later.'
    },
    {
      id: 'lab1-flag3',
      flagNumber: 3,
      storyBeat: "Calculate the total CPU requirement for QuickMart's architecture.",
      objective: 'Review available server images and calculate required vCPUs.',
      steps: [
        'Read Priya’s architecture plan (qm-web-01: 1 vCPU, qm-db-01: 2 vCPU)',
        'Navigate to Project → Compute → Images in Horizon',
        'Confirm that ubuntu-22.04 and mysql-8-server images exist'
      ],
      check: (simState, labEvents = []) => {
        try {
          if (labEvents.includes('images_opened') || simState.activePanel === 'images') {
            return { pass: true, failures: [] };
          }
          return {
            pass: false,
            failures: ['Images catalog was not inspected. Navigate to Project → Compute → Images.']
          };
        } catch (e) {
          return { pass: false, failures: ['Unexpected check error: ' + e.message] };
        }
      },
      question: 'How many vCPUs will the two servers need together?',
      answers: ['3'],
      altAnswers: ['three', '3 vcpus', '3 vcpu'],
      hint: 'Add the vCPUs of both flavors (1 for m1.small + 2 for m1.medium).',
      priyaReply: 'Validated. Architecture requirements and quotas verified.'
    }
  ]
};

export default lab1;
