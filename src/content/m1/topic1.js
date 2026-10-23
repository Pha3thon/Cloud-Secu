/**
 * M1 Topic 1: Computing & Virtualization Foundations (30 min)
 * CDAC Cloud Security Training Platform
 */

export const topic1 = {
  id: "m1-topic-1",
  topicNumber: 1,
  title: "Computing & Virtualization Foundations",
  service: "Core Foundations",
  hasBriefing: false,
  slides: [
    {
      id: "1.1",
      code: "1.1",
      format: "eli5",
      tag: "In Simple Words",
      title: "What runs an application, and what makes cloud possible?",
      body: "Imagine one big toy box that can magically turn into five separate toy boxes, each with its own lid, so five kids can each play with their own toys without touching anyone else's. That's what virtualization does to one computer.",
      sceneKey: "scene_m1_1_1"
    },
    {
      id: "1.1-std",
      code: "1.1-std",
      format: "official-definition",
      tag: "Official Definition",
      title: "Official Definition: Virtualization & Hypervisor",
      standardName: "NIST SP 800-125",
      standardFullTitle: "Guide to Security for Full Virtualization Technologies",
      definitionText: "Virtualization is the simulation of the software and/or hardware upon which other software runs. This has the effect of isolating or deprivileging the software from the underlying physical computer system. A hypervisor (or Virtual Machine Monitor) is the software layer that provides the virtualization capability by controlling physical hardware access and enforcing guest operating system isolation.",
      sourceUrl: "https://csrc.nist.gov/pubs/sp/800/125/final",
      bridgeLine: "NIST formalizes this 'separate toy box' idea as the hypervisor enforcing isolation between virtual machines.",
      sceneId: null
    },
    {
      id: "1.2",
      code: "1.2",
      title: "Core Virtualization Vocabulary",
      textLines: [
        "Physical machine: A computer running one operating system directly on real hardware.",
        "Virtual Machine (VM): An operating system running inside a software container that pretends to be its own computer.",
        "Hypervisor: The software layer that creates and manages VMs, dividing CPU, RAM, and storage between them.",
        "Tenant: A customer or workload occupying a VM — 'multi-tenant' means many unrelated tenants share one physical host.",
        "Isolation: The guarantee that one VM cannot see or touch another VM's data, enforced by the hypervisor."
      ],
      sceneKey: "scene_m1_1_2"
    },
    {
      id: "1.3",
      code: "1.3",
      title: "How Virtualization Works & The Security Boundary",
      textLines: [
        "The hypervisor sits directly between physical hardware and guest virtual machines.",
        "It dynamically allocates compute resources to each VM and is strictly responsible for keeping them isolated.",
        "If that isolation fails or is misconfigured, one tenant could potentially reach another's data — this vulnerability is called a VM escape.",
        "This is precisely why the Shared Responsibility Model (Module 2) draws a hard line: the cloud provider secures the hypervisor, while you secure what runs inside your VM."
      ],
      realLifeExample: {
        title: "Apartment Wall Boundaries",
        analogy: "Apartment walls that are supposed to be soundproof and tamper-proof between units. If a wall is weak, a neighbor can hear or reach into your flat."
      },
      sceneKey: "scene_m1_1_3"
    },
    {
      id: "1.4",
      code: "1.4",
      title: "Hypervisor Types: Bare-Metal vs. Hosted",
      textLines: [
        "Type 1 (Bare-Metal): Runs directly on hardware with no host OS underneath (VMware ESXi, Microsoft Hyper-V, KVM). Used across cloud datacenters (AWS, Azure, GCP, OpenStack).",
        "Type 2 (Hosted): Runs on top of a normal host operating system (VirtualBox, VMware Workstation). Primarily used for personal labs and local development.",
        "Cloud providers use Type 1 exclusively: removing the host OS layer eliminates an entire attack vector and provides superior bare-metal performance."
      ],
      knowMore: {
        title: "Why Cloud Datacenters Mandate Type 1",
        whatIsIt: "Type 1 hypervisors boot directly on the server motherboards and execute hypervisor instructions in high CPU privilege modes with hardware-assisted virtualization.",
        whyDoesItMatter: "Eliminating the host operating system shrinks the attack surface, removes host privilege escalation vectors, and guarantees predictable performance.",
        simpleAnalogy: "Moving directly into a reinforced bank vault rather than pitching a tent inside an unmonitored warehouse."
      },
      sceneKey: "scene_m1_1_4"
    },
    {
      id: "1.5",
      code: "1.5",
      format: "eli5",
      tag: "In Simple Words",
      title: "Virtualization vs. Cloud Computing",
      body: "Think of electricity in your home: you plug in a lamp and light turns on immediately, without you needing to build a power station in your backyard, and you only pay for what you use. That is cloud computing — getting computer power through the internet whenever you want, instead of buying and keeping heavy computer machines yourself.",
      recapChip: "Bridges to Module 2",
      sceneKey: "scene_m1_1_5"
    },
    {
      id: "1.5-std",
      code: "1.5-std",
      format: "official-definition",
      tag: "Official Definition",
      title: "Official Definition: Cloud Computing",
      standardName: "NIST SP 800-145",
      standardFullTitle: "The NIST Definition of Cloud Computing",
      definitionText: "Cloud computing is a model for enabling ubiquitous, convenient, on-demand network access to a shared pool of configurable computing resources (e.g., networks, servers, storage, applications, and services) that can be rapidly provisioned and released with minimal management effort or service provider interaction. This cloud model is composed of five essential characteristics, three service models, and four deployment models.",
      sourceUrl: "https://csrc.nist.gov/pubs/sp/800/145/final",
      bridgeLine: "NIST formalizes this 'power from the wall' idea into five mandatory characteristics: on-demand self-service, broad network access, resource pooling, rapid elasticity, and measured service.",
      sceneId: null
    },
    {
      id: "1.q",
      code: "1.q",
      title: "Topic 1 Check: Virtualization & Cloud Foundations",
      textLines: [
        "Let's review the fundamental concepts of hypervisors, isolation, and cloud architecture before moving into the terminal.",
        "Answer the check-in below to verify your mental model."
      ],
      quiz: {
        question: "Why do enterprise cloud datacenters (AWS, Azure, GCP, OpenStack) use Type 1 bare-metal hypervisors instead of Type 2?",
        options: [
          "Type 1 hypervisors are free while Type 2 hypervisors require mandatory commercial licensing",
          "Removing the host OS layer eliminates an intermediate attack layer and provides superior performance with zero OS overhead",
          "Type 2 hypervisors cannot run 64-bit Linux guest operating systems",
          "Type 1 hypervisors execute exclusively inside browser sessions"
        ],
        answer: "Option B",
        explanation: "Type 1 hypervisors run directly on server hardware. Eliminating the intermediate host OS removes a major compromise path for VM escape and eliminates host OS performance overhead."
      },
      sceneKey: "scene_m1_1_5"
    }
  ]
};

export default topic1;
