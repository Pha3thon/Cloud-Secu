// Content for Module M4: Our First Cloud Configuration — Building Your Own Cloud

export const M4_NARRATIVE = {
  title: "Day 1 at Nimbus Corp.",
  scenario:
    "You've just joined Nimbus Corp as a Cloud Intern. Your manager, Priya, stops by your desk: \"Welcome aboard! Your first task — spin up your own little corner of the cloud. Nothing fancy, just get a virtual machine running with some storage attached. We'll worry about locking it down later.\"",
  context:
    "You're not entirely sure what \"the cloud\" really means yet — but you're about to find out by doing it. Over the next lesson, you'll deploy your first cloud environment using the exact same building blocks real engineers use everywhere. You'll do it the way most people do it the first time: quickly, with default settings, without thinking too hard about security.",
  reminder:
    "Don't worry — that's the point. In later modules, you'll come back to this exact setup and learn what's wrong with it, and how to fix it."
};

export const M4_SLIDES = [
  {
    id: 1,
    title: "The Story: Your First Day as an Intern",
    animationType: "intern_desk",
    textLines: [
      "Welcome to your first day at Nimbus Corp as a Cloud Engineering Intern.",
      "Your engineering manager, Priya, asks you to spin up a quick cloud setup for testing.",
      "There is no pressure to make it hardened or complex today — just get it working.",
      "You log into the internal cloud console and begin provisioning your first resources.",
      "Notice how tempting it is to click 'Next', accepting whatever defaults appear."
    ],
    realLifeExample: {
      title: "Moving Into an Unfurnished Apartment",
      analogy:
        "Setting up a cloud account is like getting keys to an empty apartment. You drop your boxes inside quickly just to unpack, leaving doors unlocked while carrying groceries in."
    },
    knowMore: {
      whatIsIt:
        "The onboarding phase in cloud computing is where engineers provision baseline infrastructure before applying organizational governance or compliance policies.",
      whyDoesItMatter:
        "Fast-moving startups and project teams often launch resources with speed as their primary priority, accidentally baking security debt into their foundational architecture.",
      simpleAnalogy:
        "It's like scribbling your WiFi password on a sticky note taped to the front door because you're hosting a party and don't want guests asking for it all evening."
    }
  },
  {
    id: 2,
    title: "What is 'The Cloud', Really?",
    animationType: "cloud_servers",
    textLines: [
      "Despite the fluffy name, the cloud is not floating in the sky.",
      "The cloud is simply powerful physical servers running inside someone else's secure data center.",
      "Instead of buying and plugging in hardware cables yourself, you rent compute time over the internet.",
      "Vendor-neutral cloud providers (like our Nimbus training cloud) automate all of this via software.",
      "Whether it is called EC2, Compute Engine, or a Nimbus VM, the core underlying hardware principles are identical."
    ],
    realLifeExample: {
      title: "Renting an Electric Scooter vs. Owning a Motorcycle",
      analogy:
        "Instead of buying a vehicle, changing the oil, and paying for parking, you unlock a scooter with an app, ride it where you need, and pay only for the minutes you used."
    },
    knowMore: {
      whatIsIt:
        "Cloud computing is on-demand delivery of compute power, database storage, applications, and IT resources via the internet with pay-as-you-go pricing.",
      whyDoesItMatter:
        "Security boundaries shift in the cloud. You don't have to defend the physical data center walls, but you are 100% responsible for configuring the software doors correctly.",
      simpleAnalogy:
        "Renting a safety deposit box at a bank: the bank guards the vault building, but if you leave your box unlocked with the key inserted, anyone who walks past can take what is inside."
    }
  },
  {
    id: 3,
    title: "Building Block: Virtual Machine (VM)",
    animationType: "vm_maker",
    textLines: [
      "A Virtual Machine is a computer made entirely out of software.",
      "Physical host servers run a supervisor program called a hypervisor that slices one computer into many.",
      "Your VM gets its own operating system (like Linux or Windows), dedicated CPU cores, and memory.",
      "To the operating system, it feels exactly like a real physical server sitting on a desk.",
      "You can boot it up, install code, restart it, or delete it in seconds with a single click."
    ],
    realLifeExample: {
      title: "Subdividing a House into Studio Apartments",
      analogy:
        "One big residential building is partitioned into independent private apartments. Each tenant has their own door, kitchen, and bathroom, sharing only the foundation and water pipes."
    },
    knowMore: {
      whatIsIt:
        "Virtualization decouples operating systems from physical hardware using hypervisors (such as KVM, Xen, or ESXi), allowing multiple isolated virtual machines to run simultaneously on one physical host.",
      whyDoesItMatter:
        "If an attacker gains administrative privileges on your VM, they can execute arbitrary code, read system files, or attempt hypervisor escapes to target neighbor environments.",
      simpleAnalogy:
        "Playing a vintage arcade game inside an emulator on your modern laptop: the game code believes it is running on 1980s silicon, but it is just software simulating circuits."
    }
  },
  {
    id: 4,
    title: "Building Block: Object Storage",
    animationType: "bucket_storage",
    textLines: [
      "Traditional computers organize files in folders and nested directories with strict drive limits.",
      "Object Storage stores data as flat, independent objects inside containers known as 'Buckets'.",
      "Each file gets a unique web address (URL), arbitrary metadata tags, and virtually infinite capacity.",
      "It is ideal for static assets, backups, customer uploads, database snapshots, and log archives.",
      "Because every object can have a web link, access control mistakes can expose files to the entire internet."
    ],
    realLifeExample: {
      title: "A Coat Check at a Concert Hall",
      analogy:
        "You hand over your jacket, and the attendant hands you a ticket number. There are no alphabetized shelves — you present your ticket number, and your exact jacket is retrieved immediately."
    },
    knowMore: {
      whatIsIt:
        "Object storage is a flat data storage architecture that manages data as objects containing data, metadata, and a globally unique identifier accessible via HTTP/REST APIs.",
      whyDoesItMatter:
        "Default bucket policies historically defaulted to 'public-read' in many platforms, making them the number one source of catastrophic data breaches across Fortune 500 companies.",
      simpleAnalogy:
        "Putting files in a folder on a public Google Drive and accidentally clicking 'Anyone with the link can view' instead of 'Restricted'."
    }
  },
  {
    id: 5,
    title: "Building Block: Virtual Network",
    animationType: "network_packet",
    textLines: [
      "In a traditional office, computers talk to each other through physical blue Ethernet cables and physical switches.",
      "In the cloud, you draw an isolated software-defined virtual private network (VPC).",
      "You assign private IP address ranges (like 10.0.0.0/16) and divide them into subnets.",
      "Virtual firewalls (Security Groups) inspect incoming and outgoing packets like digital security guards.",
      "Without a virtual network, your VM cannot talk to your database or safely receive traffic from users."
    ],
    realLifeExample: {
      title: "Gated Neighborhood with an Intercom Gate",
      analogy:
        "Houses in a private gated community can talk and walk across the cul-de-sac freely, but outside visitors must stop at the guardhouse gate and be on the approved visitor guest list."
    },
    knowMore: {
      whatIsIt:
        "A Virtual Private Cloud (VPC) provides isolated virtual network topology in the cloud, utilizing software-defined networking (SDN) overlay protocols to encapsulate network traffic securely.",
      whyDoesItMatter:
        "Default network configurations often attach a public IPv4 address to every new VM and open port 22 (SSH) to the entire world (`0.0.0.0/0`), allowing attackers to launch continuous automated brute-force attacks.",
      simpleAnalogy:
        "Installing a front door on your house but accidentally leaving it propped open with a brick because you were tired of carrying keys."
    }
  },
  {
    id: 6,
    title: "What is a 'Default Configuration'?",
    animationType: "default_config",
    textLines: [
      "When software makers build products, they want new users to experience zero friction.",
      "Default settings favor convenience and speed over strict, airtight security.",
      "Default rules frequently open public internet access, turn off verbose logging, and create generic admin names.",
      "Over 75% of cloud security incidents stem not from vendor flaws, but from unhardened customer defaults.",
      "Today, we build with defaults on purpose. Next, we will see what happens when attackers scan them."
    ],
    realLifeExample: {
      title: "Buying a New Home Router",
      analogy:
        "Most home routers ship with the administration username 'admin' and password 'admin' printed on a sticker underneath. If you don't change it, anyone on the street can reconfigure your network."
    },
    knowMore: {
      whatIsIt:
        "Default configurations are pre-selected system parameters provided out-of-the-box by cloud platforms, operating systems, and database vendors to facilitate rapid onboarding.",
      whyDoesItMatter:
        "Automated internet scanners (like Shodan, Censys, and masscan) continually scan every single public IP address on Earth looking specifically for known default ports and credentials.",
      simpleAnalogy:
        "A car that leaves the factory with the ignition key sitting in the cupholder so the test-drive buyer doesn't have to search their pockets."
    }
  },
  {
    id: 7,
    title: "Mission Briefing: Your Lab Assignment",
    animationType: "mission_checklist",
    textLines: [
      "You are ready to launch your hands-on training cloud environment!",
      "You will log into the Nimbus Training Cloud Console and follow 4 sequential deployment tasks.",
      "You will deploy a virtual machine, inspect its firewall, configure an object bucket, and check your admin account.",
      "As you configure each item, pay close attention to the parameters assigned by default.",
      "Answer the configuration-awareness question at the end of each task to advance!"
    ],
    realLifeExample: {
      title: "Pre-Flight Checklist for Pilots",
      analogy:
        "Before an aircraft takes off, pilots review every switch and gauge to confirm the baseline state. Today, you are reviewing your cloud's pre-flight default instrumentation."
    },
    knowMore: {
      whatIsIt:
        "Configuration auditing is the systematic review of cloud resource parameters against baseline security benchmarks (such as the CIS Cloud Foundations Benchmark).",
      whyDoesItMatter:
        "Security engineers who understand their baseline default configuration can quickly spot dangerous drift, unauthorized changes, and suspicious anomalous behavior.",
      simpleAnalogy:
        "Taking a walk around your home before locking up for a two-week vacation, checking every window latch, stove knob, and side door."
    }
  }
];

export const M4_LAB_TASKS = [
  {
    id: "task-1",
    taskNumber: 1,
    title: "Deploy Your First Virtual Machine",
    badge: "Compute & Region",
    description:
      "Open the Virtual Machines tab in your Nimbus Cloud Console. Click 'Quick Deploy' to launch instance nimbus-app-01 with default configuration parameters. Observe the geographical datacenter region assigned automatically by the platform.",
    hint: "Examine the instance summary card in the Cloud Console. Look at the 'Region' attribute tag shown next to the running status indicator.",
    question: "What was the default region assigned to your VM?",
    placeholder: "e.g., us-central-1",
    correctAnswers: ["us-central-1", "us-central-1", "uscentral1", "us central 1"],
    explanation:
      "Correct! `us-central-1` was chosen automatically by the default provisioning template. In production environments, launching workloads into unapproved regions can violate privacy regulations (like GDPR) and increase latency.",
    consoleTabToHighlight: "vm"
  },
  {
    id: "task-2",
    taskNumber: 2,
    title: "Inspect Network Security & Inbound Rules",
    badge: "Virtual Network & Firewall",
    description:
      "Navigate to the Network & Firewall tab. Your instance was attached to the default security group 'default-sg'. Review the active inbound packet filtering rules.",
    hint: "Look at the listening port designated for remote terminal administration (Secure Shell). Notice which external IP range is allowed to reach it.",
    question: "What port was exposed by default on this service?",
    placeholder: "e.g., 22",
    correctAnswers: ["22", "port 22", "ssh", "22/tcp"],
    explanation:
      "Spot on! Port 22 (SSH) was configured with source `0.0.0.0/0` (any IP on the internet). Leaving administrative ports exposed to the entire world invites continuous brute-force attacks within minutes.",
    consoleTabToHighlight: "network"
  },
  {
    id: "task-3",
    taskNumber: 3,
    title: "Provision Default Object Storage Bucket",
    badge: "Object Storage & Permissions",
    description:
      "Click into the Storage Buckets tab and inspect the newly provisioned asset bucket 'nimbus-corp-assets'. Review the Access Control List (ACL) and public download policy.",
    hint: "Check the 'Visibility' and 'Public Access' indicators in the bucket details table.",
    question: "What storage visibility setting was selected by default (public/private)?",
    placeholder: "e.g., public or private",
    correctAnswers: ["public", "public-read", "publicly accessible", "open"],
    explanation:
      "Correct! The bucket defaulted to 'public' visibility. Misconfigured public storage buckets represent one of the most widespread causes of catastrophic customer data spills in modern history.",
    consoleTabToHighlight: "storage"
  },
  {
    id: "task-4",
    taskNumber: 4,
    title: "Audit Default Administrator Identity",
    badge: "IAM & Access Control",
    description:
      "Switch to the IAM & Accounts tab. Examine the root management account generated during initial platform provisioning.",
    hint: "Look at the identity name granted the wildcard policy 'AdministratorAccess' (`*.*`).",
    question: "What is the default username shown for the admin account?",
    placeholder: "e.g., admin or root",
    correctAnswers: ["admin", "root", "administrator"],
    explanation:
      "Excellent! The username `admin` was created with full system permissions and without Multi-Factor Authentication (MFA) enabled. In Phase 4, you will learn how to enforce strict least-privilege IAM policies.",
    consoleTabToHighlight: "iam"
  }
];

export const M4_SIMULATED_CONSOLE = {
  vms: [
    {
      id: "inst-09142",
      name: "nimbus-app-01",
      status: "Running",
      region: "us-central-1",
      zone: "us-central-1a",
      type: "n1-standard-1 (1 vCPU, 3.75 GB RAM)",
      publicIp: "198.51.100.24",
      privateIp: "10.0.1.15",
      securityGroup: "default-sg",
      os: "Ubuntu 22.04 LTS (Generic Cloud Image)",
      uptime: "0h 14m"
    }
  ],
  securityGroups: [
    {
      id: "sg-default",
      name: "default-sg",
      description: "Default auto-created security group for quick start",
      rules: [
        {
          direction: "Inbound",
          protocol: "TCP",
          port: "22",
          service: "SSH (Remote Admin)",
          source: "0.0.0.0/0",
          warning: "Exposed to entire internet!"
        },
        {
          direction: "Inbound",
          protocol: "TCP",
          port: "80",
          service: "HTTP (Web Traffic)",
          source: "0.0.0.0/0",
          warning: null
        },
        {
          direction: "Outbound",
          protocol: "ALL",
          port: "ALL",
          service: "Any Outbound",
          source: "0.0.0.0/0",
          warning: null
        }
      ]
    }
  ],
  buckets: [
    {
      id: "bkt-981",
      name: "nimbus-corp-assets",
      region: "us-central-1",
      visibility: "public",
      encryption: "Disabled (Default)",
      objectCount: 14,
      totalSize: "142.8 MB",
      accessUrl: "https://storage.nimbuscloud.local/nimbus-corp-assets/",
      warning: "Public anonymous downloads allowed!"
    }
  ],
  iamUsers: [
    {
      id: "usr-01",
      username: "admin",
      role: "Global Administrator",
      policies: ["AdministratorAccess (*:*)"],
      mfaStatus: "Disabled",
      lastLogin: "Just now",
      accessKey: "NIMBUS_AKIA_DEFAULT_7721",
      warning: "Full root access without MFA protection!"
    }
  ]
};
