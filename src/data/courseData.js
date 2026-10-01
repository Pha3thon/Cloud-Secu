// CDAC Cloud Security Training Program Course Data
export const COURSE_SUMMARY = {
  title: "Cloud Security Training Program: Offensive + Defensive Cloud Security",
  duration: "90 hours (40 Hrs Theory + 50 Hrs Hands-on Labs), 13 modules",
  theoryHours: 40,
  labHours: 50,
  totalHours: 90,
  totalModules: 13,
  description:
    "This course takes you from cloud computing basics to practical offensive and defensive cloud security, using your own hands-on training cloud. You'll build a cloud environment, attack it to understand real risks, rebuild it with security hardening, and finish by reporting findings and understanding compliance standards. Everything is vendor-neutral and transferable to any real cloud.",
  phases: [
    {
      id: "phase-1",
      number: 1,
      title: "Fundamentals",
      tagline: "understand the core concepts before building.",
      hoursTheory: 10,
      hoursLab: 12,
      totalHours: 22,
      moduleCount: 3,
      badgeColor: "#0284c7"
    },
    {
      id: "phase-2",
      number: 2,
      title: "Build",
      tagline: "create your own cloud with basic configuration.",
      hoursTheory: 5,
      hoursLab: 10,
      totalHours: 15,
      moduleCount: 2,
      badgeColor: "#0d9488"
    },
    {
      id: "phase-3",
      number: 3,
      title: "Attack",
      tagline: "attack your own cloud to understand its weaknesses.",
      hoursTheory: 12,
      hoursLab: 17,
      totalHours: 29,
      moduleCount: 4,
      badgeColor: "#dc2626"
    },
    {
      id: "phase-4",
      number: 4,
      title: "Rebuild & Harden",
      tagline: "rebuild it using security hardening.",
      hoursTheory: 10,
      hoursLab: 11,
      totalHours: 21,
      moduleCount: 3,
      badgeColor: "#d97706"
    },
    {
      id: "phase-5",
      number: 5,
      title: "Report & Compliance",
      tagline: "professional reporting, GRC, and mandatory standards.",
      hoursTheory: 3,
      hoursLab: 4,
      totalHours: 7,
      moduleCount: 1,
      badgeColor: "#4f46e5"
    }
  ],
  outcomes: [
    "Explain cloud architecture and how major providers organise services.",
    "Configure and harden networks, VMs, storage, databases, and identities using least privilege and CIS benchmarks.",
    "Apply the OWASP Top 10 to cloud-hosted applications and APIs.",
    "Understand and apply the CSA Top 10 cloud attack techniques to plan and execute an authorized penetration test against a cloud environment.",
    "Use logs and monitoring to detect suspicious activity and support incident response.",
    "Produce a professional penetration-test and incident-response report."
  ]
};

export const MODULES_DATA = [
  // Phase 1 – Fundamentals
  {
    id: "m1",
    code: "M1",
    phaseId: "phase-1",
    phaseNumber: 1,
    phaseName: "Fundamentals",
    title: "IT, Networking & Security Foundations",
    hoursTheory: 3,
    hoursLab: 3,
    totalHours: 6,
    description: "OS basics, Linux CLI, networking fundamentals, CIA Triad, vulnerability vs penetration testing.",
    isAvailableDemo: false
  },
  {
    id: "m2",
    code: "M2",
    phaseId: "phase-1",
    phaseNumber: 1,
    phaseName: "Fundamentals",
    title: "Cloud Computing Concepts & Architecture",
    hoursTheory: 4,
    hoursLab: 5,
    totalHours: 9,
    description: "IaaS/PaaS/SaaS, deployment models, core cloud building blocks, shared responsibility model.",
    isAvailableDemo: false
  },
  {
    id: "m3",
    code: "M3",
    phaseId: "phase-1",
    phaseNumber: 1,
    phaseName: "Fundamentals",
    title: "Cloud Identity & Access Management Basics",
    hoursTheory: 3,
    hoursLab: 4,
    totalHours: 7,
    description: "Users, roles, policies, permissions, MFA, least privilege.",
    isAvailableDemo: false
  },

  // Phase 2 – Build
  {
    id: "m4",
    code: "M4",
    phaseId: "phase-2",
    phaseNumber: 2,
    phaseName: "Build",
    title: "Our First Cloud Configuration (QuickMart)",
    hoursTheory: 2,
    hoursLab: 5,
    totalHours: 7,
    description: "Deploy QuickMart's network, router, security groups, VMs, and floating IP on OpenStack.",
    isAvailableDemo: true
  },
  {
    id: "m5",
    code: "M5",
    phaseId: "phase-2",
    phaseNumber: 2,
    phaseName: "Build",
    title: "Deploying Applications, Storage & Services on Your Cloud",
    hoursTheory: 3,
    hoursLab: 5,
    totalHours: 8,
    description: "Deploying application code, databases, and containerized microservices on your cloud.",
    isAvailableDemo: false
  },

  // Phase 3 – Attack
  {
    id: "m6",
    code: "M6",
    phaseId: "phase-3",
    phaseNumber: 3,
    phaseName: "Attack",
    title: "Reconnaissance & Enumeration of Your Cloud",
    hoursTheory: 3,
    hoursLab: 4,
    totalHours: 7,
    description: "Reconnaissance and enumeration against your own deployed cloud environment.",
    isAvailableDemo: false
  },
  {
    id: "m7",
    code: "M7",
    phaseId: "phase-3",
    phaseNumber: 3,
    phaseName: "Attack",
    title: "Attacking Identity & Privilege Escalation",
    hoursTheory: 3,
    hoursLab: 5,
    totalHours: 8,
    description: "Exploiting identity misconfigurations, token abuse, and privilege escalation paths.",
    isAvailableDemo: false
  },
  {
    id: "m8",
    code: "M8",
    phaseId: "phase-3",
    phaseNumber: 3,
    phaseName: "Attack",
    title: "Attacking Applications & APIs (Offensive OWASP Top 10)",
    hoursTheory: 3,
    hoursLab: 4,
    totalHours: 7,
    description: "Testing cloud-hosted applications and APIs against the OWASP Top 10 vulnerabilities.",
    isAvailableDemo: false
  },
  {
    id: "m9",
    code: "M9",
    phaseId: "phase-3",
    phaseNumber: 3,
    phaseName: "Attack",
    title: "Attacking Containers, CI/CD & Cloud Infrastructure",
    hoursTheory: 3,
    hoursLab: 4,
    totalHours: 7,
    description: "Attacking exposed containers, CI/CD pipelines, and infrastructure as code weaknesses.",
    isAvailableDemo: false
  },

  // Phase 4 – Rebuild & Harden
  {
    id: "m10",
    code: "M10",
    phaseId: "phase-4",
    phaseNumber: 4,
    phaseName: "Rebuild & Harden",
    title: "Network & Compute Hardening",
    hoursTheory: 3,
    hoursLab: 4,
    totalHours: 7,
    description: "Hardening networks and compute workloads — firewalls, segmentation, and CIS benchmarks.",
    isAvailableDemo: false
  },
  {
    id: "m11",
    code: "M11",
    phaseId: "phase-4",
    phaseNumber: 4,
    phaseName: "Rebuild & Harden",
    title: "Data, Storage & Identity Hardening",
    hoursTheory: 3,
    hoursLab: 3,
    totalHours: 6,
    description: "Securing storage buckets, database instances, secrets, and enforcing least privilege.",
    isAvailableDemo: false
  },
  {
    id: "m12",
    code: "M12",
    phaseId: "phase-4",
    phaseNumber: 4,
    phaseName: "Rebuild & Harden",
    title: "Secure DevSecOps: Hardening CI/CD & Containers",
    hoursTheory: 3,
    hoursLab: 4,
    totalHours: 7,
    description: "Hardening CI/CD pipelines, container images, and Kubernetes configurations.",
    isAvailableDemo: false
  },

  // Phase 5 – Report & Compliance
  {
    id: "m13",
    code: "M13",
    phaseId: "phase-5",
    phaseNumber: 5,
    phaseName: "Report & Compliance",
    title: "Reporting, Governance, Risk & Compliance Capstone",
    hoursTheory: 3,
    hoursLab: 4,
    totalHours: 7,
    description: "Professional penetration test reporting, incident response documentation, and GRC standards.",
    isAvailableDemo: false
  }
];
