/**
 * M4 Topic 4: Security Groups (Neutron)
 */

export const topic4 = {
  id: "topic-4",
  topicNumber: 4,
  title: "Security Groups (Neutron)",
  service: "Neutron",
  slides: [
    {
      id: "4.1",
      code: "4.1",
      title: "Security groups in OpenStack",
      textLines: [
        "Security groups are firewall rule sets that Neutron enforces around each instance's port, outside the instance itself.",
        "Every project has one called default, and every new instance gets it unless you change it.",
        "default lets its own members talk to each other and allows all outgoing traffic.",
        "A group you create starts with outgoing allowed and nothing allowed in."
      ],
      realLifeExample: {
        title: "Generic Access Badges",
        analogy: "Every new employee gets a generic badge unless you issue a specific department clearance."
      },
      recapChip: "Revisit M2 – security groups",
      sceneKey: "scene_4_1"
    },
    {
      id: "4.2",
      code: "4.2",
      title: "How rules are evaluated, and why",
      textLines: [
        "Incoming traffic is denied unless a rule allows it.",
        "Rules only allow, and there are no deny rules.",
        "Groups are stateful, so replies to allowed traffic return automatically.",
        "An instance can have several groups, and it gets the union of all their rules. That's why leaving default attached can open more than you meant."
      ],
      realLifeExample: {
        title: "Approved Guest List",
        analogy: "Visitors need to be on the list, but anyone they converse with can reply back without asking again."
      },
      sceneKey: "scene_4_2"
    },
    {
      id: "4.3.1",
      code: "4.3.1",
      title: "Direction: ingress and egress",
      textLines: [
        "Ingress is traffic coming into the instance and egress is traffic going out.",
        "Each rule has one direction.",
        "A brand-new group has egress allowed and no ingress rules.",
        "Always read the Direction column before adding anything."
      ],
      realLifeExample: {
        title: "Inbound vs Outbound Gate",
        analogy: "Visitors arriving at the gate versus warehouse staff driving delivery trucks out."
      },
      sceneKey: "scene_4_3_1"
    },
    {
      id: "4.3.2",
      code: "4.3.2",
      title: "Rule and Port",
      textLines: [
        "In Add Rule, the Rule dropdown has presets (SSH, HTTP, HTTPS, MySQL) that fill in the protocol and port.",
        "Custom TCP Rule lets you type your own.",
        "The ports you'll use are 22 (SSH), 80 (HTTP), 443 (HTTPS), and 3306 (MySQL).",
        "Each rule opens one numbered door."
      ],
      realLifeExample: {
        title: "Numbered Delivery Bays",
        analogy: "A form that opens one numbered door for one specific kind of authorized delivery."
      },
      knowMore: {
        title: "MySQL Port 3306",
        whatIsIt: "TCP port 3306 is the standard network port where MySQL and MariaDB relational databases listen for SQL queries.",
        whyDoesItMatter: "Exposing port 3306 directly to the internet is a catastrophic mistake. Attackers continuously brute-force database credentials.",
        simpleAnalogy: "A bank vault door that should only be accessible from inside the teller counter, never directly from the sidewalk."
      },
      recapChip: "Revisit M1 – ports",
      sceneKey: "scene_4_3_2"
    },
    {
      id: "4.3.3",
      code: "4.3.3",
      title: "Remote: CIDR or Security Group",
      textLines: [
        "Remote says who the rule applies to.",
        "A CIDR such as 0.0.0.0/0 means the entire internet.",
        "A Security Group means only instances that belong to that group.",
        "Naming a group is safer, because it keeps working when addresses change and never opens anything to the world."
      ],
      realLifeExample: {
        title: "Public vs Internal Staff Pass",
        analogy: "'Anyone' versus 'only people wearing the blue staff uniform'."
      },
      sceneKey: "scene_4_3_3"
    },
    {
      id: "4.3.4",
      code: "4.3.4",
      title: "The QuickMart two-tier layout",
      textLines: [
        "QuickMart has two tiers.",
        "qm-web-sg is open to visitors.",
        "qm-db-sg trusts only qm-web-sg, so the database is never reachable from outside.",
        "The web server is the only way in, which is the pattern the whole design depends on."
      ],
      realLifeExample: {
        title: "Storefront & Locked Stockroom",
        analogy: "A shop front open to customers, and a locked stockroom that only shop-floor staff can enter."
      },
      sceneKey: "scene_4_3_4"
    }
  ],
  lab: {
    id: "lab-4",
    topicNumber: 4,
    title: "Lab 4: Build the Firewalls",
    priyaIntro: "Network's up. Now the firewalls. Nothing gets in unless a rule says so.",
    flags: [
      {
        id: "flag-4-1",
        flagNumber: 1,
        storyBeat: "Create the web security group and understand default egress behavior.",
        objective: "Create security group qm-web-sg and inspect its initial rules.",
        steps: [
          "In Horizon, open Project → Network → Security Groups",
          "Click '+ Create Security Group'",
          "Name: qm-web-sg, Description: QuickMart Web Security Group",
          "Click Create Security Group",
          "Click 'Manage Rules' on qm-web-sg"
        ],
        checkId: "check_create_web_sg",
        question: "In a brand-new security group, which direction is allowed by default?",
        correctAnswers: ["egress", "outbound", "out"],
        hint: "Look at the Direction column before adding anything.",
        priyaReply: "Correct. Brand-new groups allow all egress (outbound), but block all ingress (inbound)."
      },
      {
        id: "flag-4-2",
        flagNumber: 2,
        storyBeat: "Open SSH, HTTP, and HTTPS on qm-web-sg to allow management and customer traffic.",
        objective: "Add Ingress rules for ports 22, 80, and 443 with CIDR 0.0.0.0/0.",
        steps: [
          "In Manage Rules for qm-web-sg, click '+ Add Rule'",
          "Add SSH: Rule = SSH, Remote = CIDR, CIDR = 0.0.0.0/0 → Click Add",
          "Add HTTP: Rule = HTTP, Remote = CIDR, CIDR = 0.0.0.0/0 → Click Add",
          "Add HTTPS: Rule = HTTPS, Remote = CIDR, CIDR = 0.0.0.0/0 → Click Add"
        ],
        checkId: "check_web_sg_rules",
        question: "How many ingress rules does qm-web-sg have now?",
        correctAnswers: ["3", "three"],
        hint: "Count the rows marked Ingress.",
        priyaReply: "SSH from anywhere is fine for today. We'll tighten it later."
      },
      {
        id: "flag-4-3",
        flagNumber: 3,
        storyBeat: "Construct the database tier firewall. Restrict access solely to qm-web-sg.",
        objective: "Create qm-db-sg and allow MySQL (3306) and SSH (22) ONLY from qm-web-sg.",
        steps: [
          "Go to Project → Network → Security Groups",
          "Click '+ Create Security Group', Name: qm-db-sg → Create",
          "Click 'Manage Rules' on qm-db-sg",
          "Click '+ Add Rule', Rule = MYSQL, Remote = Security Group, Security Group = qm-web-sg → Add",
          "Click '+ Add Rule', Rule = SSH, Remote = Security Group, Security Group = qm-web-sg → Add",
          "Ensure NO 0.0.0.0/0 rules exist on qm-db-sg!"
        ],
        checkId: "check_db_sg_rules",
        question: "What is the remote on the port 3306 rule?",
        correctAnswers: ["qm-web-sg", "qm web sg"],
        hint: "You are allowing a group, not an IP address.",
        priyaReply: "Perfect. Only instances wearing the qm-web-sg badge can reach the database."
      }
    ]
  }
};

export default topic4;
