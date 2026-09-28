// Course information, phases, and curriculum module definitions
export const COURSE_SUMMARY = {
  title: "Cloud Security Training Program — Offensive + Defensive Cloud Security",
  level: "Beginner → Intermediate, no prior experience required",
  duration: "90 Hours total (55 Hrs Theory + 35 Hrs Hands-on Labs), 13 modules",
  theoryHours: 55,
  labHours: 35,
  totalHours: 90,
  totalModules: 13,
  description:
    "This course takes you from cloud computing basics to practical offensive and defensive cloud security — using your own hands-on training cloud. You'll build your own cloud environment, learn to attack it to understand real risks, rebuild it with proper security hardening, and finish by learning how to report findings professionally and understand compliance standards. Everything you learn is vendor-neutral and transferable to any real cloud platform.",
  learningPhases: [
    {
      id: "phase-1",
      number: 1,
      title: "Fundamentals",
      tagline: "Understand the core concepts before building anything",
      hoursTheory: 15,
      hoursLab: 7,
      totalHours: 22,
      moduleCount: 3,
      badgeColor: "#0284c7"
    },
    {
      id: "phase-2",
      number: 2,
      title: "Build",
      tagline: "Create your own cloud with basic/default configuration",
      hoursTheory: 7,
      hoursLab: 8,
      totalHours: 15,
      moduleCount: 2,
      badgeColor: "#059669"
    },
    {
      id: "phase-3",
      number: 3,
      title: "Attack",
      tagline: "Attack your own cloud to understand its weaknesses",
      hoursTheory: 18,
      hoursLab: 11,
      totalHours: 29,
      moduleCount: 4,
      badgeColor: "#dc2626"
    },
    {
      id: "phase-4",
      number: 4,
      title: "Rebuild & Harden",
      tagline: "Rebuild the same environment using security hardening techniques",
      hoursTheory: 11,
      hoursLab: 6,
      totalHours: 17,
      moduleCount: 3,
      badgeColor: "#d97706"
    },
    {
      id: "phase-5",
      number: 5,
      title: "Report & Compliance",
      tagline: "Learn professional reporting, GRC, and mandatory security standards",
      hoursTheory: 4,
      hoursLab: 3,
      totalHours: 7,
      moduleCount: 1,
      badgeColor: "#4f46e5"
    }
  ],
  outcomes: [
    "Explain core cloud architecture, virtualization, software-defined networking, and shared responsibility.",
    "Harden cloud environments using least-privilege IAM policies, network segmentation, and CIS Benchmarks.",
    "Identify and exploit OWASP Top 10 vulnerabilities within containerized cloud applications and REST APIs.",
    "Perform an authorized cloud penetration test covering reconnaissance, credential stuffing, and privilege escalation.",
    "Ingest and analyze VPC flow logs, cloud audit trails, and container metrics for incident detection and triage.",
    "Produce professional penetration test and incident response reports compliant with modern GRC standards."
  ],
  tools: {
    reconAndOffensive: [
      "Nmap",
      "Subfinder",
      "Amass",
      "Shodan",
      "Censys",
      "Burp Suite",
      "OWASP ZAP",
      "Gitleaks",
      "TruffleHog"
    ],
    defensiveAndAudit: [
      "CIS Benchmarks",
      "OpenSCAP",
      "Nessus",
      "OpenVAS",
      "Trivy",
      "Checkov / tfsec",
      "WAF Tooling"
    ],
    cloudNative: [
      "Docker",
      "Kubernetes",
      "Terraform",
      "CI/CD Pipelines",
      "Linux CLI"
    ]
  }
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
    hoursTheory: 4,
    hoursLab: 2,
    totalHours: 6,
    description: "OS basics, Linux CLI, networking fundamentals, CIA Triad, vulnerability vs. penetration testing.",
    isAvailableDemo: false
  },
  {
    id: "m2",
    code: "M2",
    phaseId: "phase-1",
    phaseNumber: 1,
    phaseName: "Fundamentals",
    title: "Cloud Computing Concepts & Architecture",
    hoursTheory: 6,
    hoursLab: 3,
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
    hoursTheory: 5,
    hoursLab: 2,
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
    title: "Our First Cloud Configuration — Building Your Own Cloud",
    hoursTheory: 3,
    hoursLab: 4,
    totalHours: 7,
    description: "Deploy your first VM, storage, and network — using default settings, the way most people do it the first time.",
    isAvailableDemo: true
  },
  {
    id: "m5",
    code: "M5",
    phaseId: "phase-2",
    phaseNumber: 2,
    phaseName: "Build",
    title: "Deploying Applications, Storage & Services on Your Cloud",
    hoursTheory: 4,
    hoursLab: 4,
    totalHours: 8,
    description: "Deploying an application, database, and containerized service onto your environment.",
    isAvailableDemo: false
  },

  // Phase 3 – Attack
  {
    id: "m6",
    code: "M6",
    phaseId: "phase-3",
    phaseNumber: 3,
    phaseName: "Attack",
    title: "Reconnaissance & Enumeration of Your Cloud Environment",
    hoursTheory: 4,
    hoursLab: 3,
    totalHours: 7,
    description: "Reconnaissance and enumeration against your own deployed cloud.",
    isAvailableDemo: false
  },
  {
    id: "m7",
    code: "M7",
    phaseId: "phase-3",
    phaseNumber: 3,
    phaseName: "Attack",
    title: "Attacking Identity & Privilege Escalation",
    hoursTheory: 5,
    hoursLab: 3,
    totalHours: 8,
    description: "Exploiting identity misconfigurations and privilege escalation paths.",
    isAvailableDemo: false
  },
  {
    id: "m8",
    code: "M8",
    phaseId: "phase-3",
    phaseNumber: 3,
    phaseName: "Attack",
    title: "Attacking Applications & APIs (Offensive OWASP Top 10)",
    hoursTheory: 5,
    hoursLab: 2,
    totalHours: 7,
    description: "Testing your deployed app/APIs against the OWASP Top 10.",
    isAvailableDemo: false
  },
  {
    id: "m9",
    code: "M9",
    phaseId: "phase-3",
    phaseNumber: 3,
    phaseName: "Attack",
    title: "Attacking Containers, CI/CD & Cloud Infrastructure",
    hoursTheory: 4,
    hoursLab: 3,
    totalHours: 7,
    description: "Attacking exposed containers, CI/CD pipelines, and IaC weaknesses.",
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
    hoursTheory: 4,
    hoursLab: 2,
    totalHours: 6,
    description: "Hardening networking and compute — firewalls, segmentation, CIS benchmarks.",
    isAvailableDemo: false
  },
  {
    id: "m11",
    code: "M11",
    phaseId: "phase-4",
    phaseNumber: 4,
    phaseName: "Rebuild & Harden",
    title: "Data, Storage & Identity Hardening",
    hoursTheory: 4,
    hoursLab: 2,
    totalHours: 6,
    description: "Securing storage, databases, secrets, and identity.",
    isAvailableDemo: false
  },
  {
    id: "m12",
    code: "M12",
    phaseId: "phase-4",
    phaseNumber: 4,
    phaseName: "Rebuild & Harden",
    title: "Secure DevSecOps — Hardening CI/CD & Containers",
    hoursTheory: 3,
    hoursLab: 2,
    totalHours: 5,
    description: "Hardening CI/CD pipelines, container images, and Kubernetes configs.",
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
    hoursTheory: 4,
    hoursLab: 3,
    totalHours: 7,
    description: "Writing a professional pentest report and understanding GRC/compliance standards.",
    isAvailableDemo: false
  }
];
