/**
 * M4 Topic 1: Meet Horizon & Know Your Limits
 */

export const topic1 = {
  id: "topic-1",
  topicNumber: 1,
  title: "Meet Horizon & Know Your Limits",
  service: "OpenStack Core",
  hasBriefing: true,
  slides: [
    {
      id: "1.1",
      code: "1.1",
      title: "What is OpenStack?",
      textLines: [
        "OpenStack is open-source software that turns a pool of servers into a private cloud, and QuickMart runs its own.",
        "The work is split into services with one job each.",
        "Keystone handles identity, Nova runs instances, Neutron does networking, Glance stores OS images, and Horizon is the web dashboard.",
        "You will meet all five in this module."
      ],
      realLifeExample: {
        title: "A City Administration",
        analogy: "A city with separate departments for ID cards, roads, and housing."
      },
      knowMore: {
        title: "AWS / Azure / GCP Equivalents",
        whatIsIt: "Nova ≈ AWS EC2 ≈ Azure Virtual Machines ≈ GCP Compute Engine. Neutron ≈ VPC. Keystone ≈ IAM. Glance ≈ AMI / VM Images. Horizon ≈ Management Console.",
        whyDoesItMatter: "The technology names differ by cloud vendor, but the fundamental distributed architecture and responsibilities are identical across all cloud providers.",
        simpleAnalogy: "Like knowing how to drive: switching between a Honda, Ford, or Toyota requires learning different dashboard buttons, but the steering wheel, pedals, and rules of the road remain the same."
      },
      sceneKey: "scene_1_1"
    },
    {
      id: "1.2",
      code: "1.2",
      title: "What is Horizon?",
      textLines: [
        "Horizon is OpenStack's web dashboard.",
        "Every click sends a request to a service: Nova, Neutron, Glance, or Keystone.",
        "Anything you do here can also be done from the command line, which you'll meet in later modules.",
        "In this module you work only in Horizon."
      ],
      realLifeExample: {
        title: "Cashier Terminal",
        analogy: "A shop's cashier screen that talks to the stockroom and the delivery team."
      },
      sceneKey: "scene_1_2"
    },
    {
      id: "1.3",
      code: "1.3",
      title: "How to access Horizon",
      textLines: [
        "You work from a Kali Linux workstation, and Horizon runs in its browser.",
        "1. Open Firefox on the Kali desktop.",
        "2. Go to http://horizon.quickmart.lab/dashboard.",
        "3. Enter Domain, User Name, and Password. You'll find them on the Lab Credentials card inside the lab."
      ],
      realLifeExample: {
        title: "Office Keycard & Terminal",
        analogy: "Swiping into your assigned office workstation and launching the internal intranet."
      },
      knowMore: {
        title: "Keystone Domain",
        whatIsIt: "A Keystone Domain is a top-level administrative container for projects, users, and groups in OpenStack Identity.",
        whyDoesItMatter: "Multi-tenant clouds use domains to separate different corporate customers. QuickMart uses the default single-domain configuration.",
        simpleAnalogy: "A corporate office building where 'Default' is the main tenant suite housing all company teams."
      },
      sceneKey: "scene_1_3"
    },
    {
      id: "1.4",
      code: "1.4",
      title: "A quick tour of the dashboard",
      textLines: [
        "The project selector is top-left, the navigation panels (Compute, Network) are on the left, and the user menu with Sign Out is top-right.",
        "Most pages follow one pattern: a table of resources, a Create button, and row actions.",
        "You won't see an Identity panel, because it is reserved for QuickMart's cloud admins.",
        "You'll see why in Lab 7."
      ],
      realLifeExample: {
        title: "Store Floor Plan",
        analogy: "The floor plan of a store: customer aisles are open, but the manager's back office has a restricted keypad."
      },
      sceneKey: "scene_1_4"
    },
    {
      id: "1.5",
      code: "1.5",
      title: "Projects and quotas",
      textLines: [
        "Everything you create lives in a project, a workspace that belongs to a team. Yours is quickmart.",
        "Each project has quotas, which are caps on instances, vCPUs, RAM, floating IPs, networks, and more.",
        "Compute → Overview → Limit Summary shows used against limit.",
        "Quotas stop one team from using all the shared hardware, so check them before you build."
      ],
      realLifeExample: {
        title: "Meeting Room Quotas",
        analogy: "A company's meeting-room booking limit per team to prevent one department from hogging all rooms."
      },
      sceneKey: "scene_1_5"
    }
  ],
  lab: {
    id: "lab-1",
    topicNumber: 1,
    title: "Lab 1: Meet Horizon & Know Your Limits",
    priyaIntro: "Welcome to QuickMart. I've set you up with a member account on our quickmart project. That's enough to build the whole platform, but not to change who has access. That part goes through me. First, get into Horizon and see what our project is allowed to build.",
    flags: [
      {
        id: "flag-1-1",
        flagNumber: 1,
        storyBeat: "Priya needs you to verify initial access to QuickMart's private cloud.",
        objective: "Log in to Horizon web dashboard.",
        steps: [
          "In Kali Firefox, open http://horizon.quickmart.lab/dashboard",
          "Enter Domain: Default",
          "Enter User Name: trainee and Password: Quick@Mart1",
          "Click Sign In"
        ],
        checkId: "check_login_trainee",
        question: "What is the name of the project shown at the top left?",
        correctAnswers: ["quickmart"],
        hint: "Look at the project selector in the top bar.",
        priyaReply: "Good. You're inside the quickmart project workspace."
      },
      {
        id: "flag-1-2",
        flagNumber: 2,
        storyBeat: "Before deploying workloads, confirm our hardware allocations.",
        objective: "Inspect project quotas in the Limit Summary.",
        steps: [
          "In the left navigation menu, expand Project → Compute",
          "Click on Overview",
          "Inspect the Limit Summary graphs on the page"
        ],
        checkId: "check_view_overview",
        question: "How many floating IPs is the project allowed?",
        correctAnswers: ["3", "three"],
        hint: "Look at the Floating IPs graph. The number after 'of' is the limit.",
        priyaReply: "Exactly 3 floating IPs. We will need one for our public web storefront later."
      },
      {
        id: "flag-1-3",
        flagNumber: 3,
        storyBeat: "Calculate the total CPU requirement for QuickMart's architecture.",
        objective: "Review available server images and calculate required vCPUs.",
        steps: [
          "Read Priya's architecture plan: qm-web-01 (m1.small: 1 vCPU, 2 GB) and qm-db-01 (m1.medium: 2 vCPU, 4 GB)",
          "Navigate to Project → Compute → Images in Horizon",
          "Confirm that ubuntu-22.04 and mysql-8-server images exist"
        ],
        checkId: "check_view_images",
        question: "How many vCPUs will the two servers need together?",
        correctAnswers: ["3", "three", "3 vcpus", "3 vcpu"],
        hint: "Add the vCPUs of both flavors (1 for m1.small + 2 for m1.medium).",
        priyaReply: "3 vCPUs total. Our limit is 20 vCPUs, so we are well within capacity."
      }
    ]
  }
};

export default topic1;
