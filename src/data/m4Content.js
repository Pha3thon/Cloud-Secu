// CDAC Cloud Security Training Program: Module M4 (QuickMart)
// Full 7 Topics, exactly 1 slide per term/concept, 7 Labs with 3 flags each

export const M4_BRIEFING = {
  title: "Your Mission",
  subtitle: "Cloud Security Training Program — Module M4",
  scenario:
    "You've just joined QuickMart as a Trainee Cloud Engineer. QuickMart delivers groceries in 10 minutes, and the app launches Friday. Your mentor, Priya, needs the platform live as quickly as possible: a web storefront and a database, on our own cloud. Build it the way fast-moving teams do, with sensible defaults. She'll explain security later.",
  context:
    "You're about to do exactly that. In later modules you'll come back to find out what you got wrong.",
  cta: "Launch Lab",
  closingQuote:
    "QuickMart is live, and now the right people have the right access. But look at what we built: SSH open to the world, a weak starter password, a database on default settings, no logging, and roles that were changed overnight without anyone noticing. Good enough for launch week. We'll come back and see what an attacker would do with it."
};

export const M4_LAB_CREDENTIALS = {
  horizonUrl: "http://horizon.quickmart.lab/dashboard",
  accessUrl: "http://access.quickmart.lab",
  domain: "Default",
  username: "trainee",
  password: "Quick@Mart1",
  role: "member",
  project: "quickmart",
  personas: [
    { username: "ravi-employee", password: "Welcome@123", purpose: "Store operations lead" },
    { username: "freshfarms-vendor", password: "Welcome@123", purpose: "External produce supplier" },
    { username: "customer-test", password: "Welcome@123", purpose: "Sales customer testing" }
  ]
};

// 7 Topics with structured slides and lab definition
export const M4_TOPICS = [
  // =========================================================================
  // TOPIC 1: Meet Horizon & Know Your Limits
  // =========================================================================
  {
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
  },

  // =========================================================================
  // TOPIC 2: Networks & Subnets (Neutron)
  // =========================================================================
  {
    id: "topic-2",
    topicNumber: 2,
    title: "Networks & Subnets (Neutron)",
    service: "Neutron",
    slides: [
      {
        id: "2.1",
        code: "2.1",
        title: "Networks and subnets in OpenStack",
        textLines: [
          "Neutron is OpenStack's networking service.",
          "In Horizon the Create Network wizard builds two linked objects.",
          "The network is a private virtual space, and the subnet is the address range inside it.",
          "QuickMart's web and database servers will both plug into one network, isolated from every other project."
        ],
        realLifeExample: {
          title: "Warehouse Floor & Shelf Rows",
          analogy: "The network is the warehouse floor, and the subnet is its numbered shelf rows."
        },
        recapChip: "Revisit M1 – IP addressing & subnets",
        sceneKey: "scene_2_1"
      },
      {
        id: "2.2",
        code: "2.2",
        title: "How it works and why we need it",
        textLines: [
          "Neutron builds virtual switches in software, so your network is separate from everyone else's.",
          "An instance connects to a network through a port.",
          "With no network, an instance can't talk to anything and nothing can reach it.",
          "Addresses are handed out automatically, which you'll set up in 2.3.4."
        ],
        realLifeExample: {
          title: "Building Electrical Wiring",
          analogy: "A building's wiring: no wall socket, no connection."
        },
        sceneKey: "scene_2_2"
      },
      {
        id: "2.3.1",
        code: "2.3.1",
        title: "Network Name",
        textLines: [
          "On the Network tab you give the network a name.",
          "Use project + role (qm-net) because lists get crowded and the Topology diagram shows names.",
          "Keep Create Subnet ticked so the wizard continues to the Subnet tabs."
        ],
        realLifeExample: {
          title: "Warehouse Signage",
          analogy: "Labelling a warehouse floor clearly so nobody walks into the wrong department."
        },
        sceneKey: "scene_2_3_1"
      },
      {
        id: "2.3.2",
        code: "2.3.2",
        title: "Network Address (CIDR)",
        textLines: [
          "On the Subnet tab, Network Address is the range, written 10.20.1.0/24.",
          "That gives 256 addresses (.0 to .255), and the first three blocks stay fixed.",
          "10.x.x.x is a private range, so it works inside the cloud but not on the public internet.",
          "Pick a range that won't overlap networks you may join later."
        ],
        realLifeExample: {
          title: "Fixed Area Code",
          analogy: "An area code that is fixed, with only the last extension digits changing."
        },
        knowMore: {
          title: "RFC 1918 & Subnet Sizing",
          whatIsIt: "RFC 1918 reserves three private ranges: 10.0.0.0/8, 172.16.0.0/12, and 192.168.0.0/16.",
          whyDoesItMatter: "Private addresses cannot route directly on the public internet, preventing outside scanners from accessing them directly.",
          simpleAnalogy: "Like internal hotel room phone numbers (ext 101, 102) that only work through the hotel PBX."
        },
        recapChip: "Revisit M1 – CIDR",
        sceneKey: "scene_2_3_2"
      },
      {
        id: "2.3.3",
        code: "2.3.3",
        title: "Gateway IP",
        textLines: [
          "Gateway IP is the subnet's exit door. Traffic for anywhere outside the subnet goes to it.",
          "By convention it is the first usable address, 10.20.1.1.",
          "It must sit inside the subnet or Horizon rejects the form.",
          "In Lab 3 the router takes this address. Leave it blank and Horizon picks the first address for you."
        ],
        realLifeExample: {
          title: "The Main Warehouse Exit",
          analogy: "The front gate of the warehouse floor through which all external shipments leave."
        },
        sceneKey: "scene_2_3_3"
      },
      {
        id: "2.3.4",
        code: "2.3.4",
        title: "Enable DHCP and the Allocation Pool",
        textLines: [
          "On Subnet Details, keep Enable DHCP ticked so instances get addresses automatically.",
          "The Allocation Pool defaults to 10.20.1.2 through 10.20.1.254, and only addresses in the pool are handed out.",
          "DNS Name Servers and Host Routes can stay blank here."
        ],
        realLifeExample: {
          title: "Reception Desk Desk-Assignment",
          analogy: "A reception desk that assigns each arriving employee the next free desk number."
        },
        knowMore: {
          title: "DNS Name Servers & Host Routes",
          whatIsIt: "DNS servers translate domain names to IPs. Host routes instruct VMs to route specific subnets via custom gateways.",
          whyDoesItMatter: "In complex corporate setups, custom DNS resolves internal corporate hostnames. We leave them default for our standalone lab.",
          simpleAnalogy: "A company directory book provided at the reception desk."
        },
        sceneKey: "scene_2_3_4"
      },
      {
        id: "2.3.5",
        code: "2.3.5",
        title: "The DHCP port",
        textLines: [
          "With DHCP on, Neutron runs a DHCP service for the subnet.",
          "It uses one address itself, as a port on the network, normally 10.20.1.2.",
          "So your first instance gets .3, the second .4, and so on.",
          "You can see this under the network's Ports tab."
        ],
        realLifeExample: {
          title: "Dispatcher's Fixed Desk",
          analogy: "The dispatcher's own permanent desk is also on the floor plan."
        },
        sceneKey: "scene_2_3_5"
      }
    ],
    lab: {
      id: "lab-2",
      topicNumber: 2,
      title: "Lab 2: Lay the Network",
      priyaIntro: "Good. Now QuickMart needs its own private network. Both servers will live on it.",
      flags: [
        {
          id: "flag-2-1",
          flagNumber: 1,
          storyBeat: "Priya wants the isolated internal network created with the exact specified parameters.",
          objective: "Create network qm-net with subnet qm-subnet (10.20.1.0/24).",
          steps: [
            "In Horizon, open Project → Network → Networks",
            "Click '+ Create Network'",
            "Network tab: Network Name = qm-net, ensure 'Create Subnet' is checked",
            "Subnet tab: Subnet Name = qm-subnet, Network Address = 10.20.1.0/24, Gateway IP = 10.20.1.1",
            "Subnet Details tab: Ensure 'Enable DHCP' is ticked",
            "Click Create"
          ],
          checkId: "check_create_network",
          question: "Open qm-subnet. What is the last IP in the allocation pool?",
          correctAnswers: ["10.20.1.254"],
          hint: "Look at the Allocation Pools line in the subnet details.",
          priyaReply: "Subnet is provisioned. The pool spans 10.20.1.2 to 10.20.1.254."
        },
        {
          id: "flag-2-2",
          flagNumber: 2,
          storyBeat: "Neutron has reserved its own interface on the network to service DHCP.",
          objective: "Inspect the Ports tab to find the address claimed by the DHCP agent.",
          steps: [
            "In Project → Network → Networks, click on qm-net",
            "Switch to the Ports tab"
          ],
          checkId: "check_view_ports",
          question: "What IP address did the DHCP service take?",
          correctAnswers: ["10.20.1.2"],
          hint: "The gateway is .1. Look for the DHCP port.",
          priyaReply: "10.20.1.2 is claimed by Neutron DHCP. Any VM we launch will start from .3 onwards."
        },
        {
          id: "flag-2-3",
          flagNumber: 3,
          storyBeat: "Always verify your quota usage after allocating major network resources.",
          objective: "Check your network quota in the Limit Summary.",
          steps: [
            "Navigate to Project → Compute → Overview",
            "Look at the Networks gauge in the Limit Summary"
          ],
          checkId: "check_network_quota",
          question: "How many networks does the Limit Summary show as used?",
          correctAnswers: ["1", "one"],
          hint: "Look at the Networks graph.",
          priyaReply: "1 of 5 networks used. We are ready to connect this island to the router."
        }
      ]
    }
  },

  // =========================================================================
  // TOPIC 3: Routers (Neutron)
  // =========================================================================
  {
    id: "topic-3",
    topicNumber: 3,
    title: "Routers (Neutron)",
    service: "Neutron",
    slides: [
      {
        id: "3.1",
        code: "3.1",
        title: "Routers in OpenStack",
        textLines: [
          "Neutron also provides virtual routers, built in software.",
          "Right now qm-net is an island: instances on it can talk to each other and to nothing else.",
          "A router connects it to other networks.",
          "The outside world here is public-net (203.0.113.0/24), an external network the cloud provider manages. You can attach to it but not create it."
        ],
        realLifeExample: {
          title: "Bridge to the Mainland",
          analogy: "A bridge from your private island to the mainland highway."
        },
        recapChip: "Revisit M2 – virtual networks",
        sceneKey: "scene_3_1"
      },
      {
        id: "3.2",
        code: "3.2",
        title: "How it works and why we need it",
        textLines: [
          "A router has two sides. One faces your subnet and the other faces public-net.",
          "It forwards traffic between them.",
          "For traffic going out, it swaps your private address for its own public one, which is called SNAT.",
          "Without a router, nothing inside can reach the internet."
        ],
        realLifeExample: {
          title: "Company Mailroom",
          analogy: "A building's front desk sends all outgoing mail stamped with the company's official corporate address."
        },
        knowMore: {
          title: "Source Network Address Translation (SNAT)",
          whatIsIt: "SNAT rewrites the source IP of outgoing packets from private IPs (10.20.1.x) to the router's public gateway IP.",
          whyDoesItMatter: "Allows hundreds of private instances to access external software repositories using a single public IP, without exposing their private addresses.",
          simpleAnalogy: "Like making phone calls from office desk extensions: the outside party only sees the company's main phone number on caller ID."
        },
        sceneKey: "scene_3_2"
      },
      {
        id: "3.3.1",
        code: "3.3.1",
        title: "Router Name and External Network",
        textLines: [
          "In Create Router you set a Router Name (qm-router) and choose an External Network from the dropdown, which lists networks the provider marked external.",
          "Here that is public-net.",
          "If you leave it blank the router has no outside connection, and you can add one later with Set Gateway."
        ],
        realLifeExample: {
          title: "Naming the Gate",
          analogy: "Naming the gate and choosing which public road it opens onto."
        },
        sceneKey: "scene_3_3_1"
      },
      {
        id: "3.3.2",
        code: "3.3.2",
        title: "External Gateway",
        textLines: [
          "Setting the External Gateway plugs the router into public-net.",
          "The router receives an address there (203.0.113.15).",
          "That is the address your private machines appear to use when they reach out.",
          "You can read it on the router's Overview, under External Gateway."
        ],
        realLifeExample: {
          title: "Main Street Entrance",
          analogy: "The main entrance onto the public street."
        },
        sceneKey: "scene_3_3_2"
      },
      {
        id: "3.3.3",
        code: "3.3.3",
        title: "Interfaces",
        textLines: [
          "An Interface connects the router to one of your subnets.",
          "In the router's Interfaces tab, click Add Interface and pick qm-subnet.",
          "The router takes that subnet's gateway IP, 10.20.1.1, which is why the Gateway IP field mattered.",
          "Each subnet needs its own interface. If the addresses don't match, instances send traffic to a door nobody answers."
        ],
        realLifeExample: {
          title: "Inner Security Door",
          analogy: "The inner door from the shop floor to the lobby."
        },
        sceneKey: "scene_3_3_3"
      },
      {
        id: "3.3.4",
        code: "3.3.4",
        title: "Network Topology",
        textLines: [
          "Network Topology is Horizon's live diagram of networks, routers, and instances.",
          "A line is a real connection and a missing line means the pieces aren't connected.",
          "Click any node for its details.",
          "Use it to confirm what you built is what you meant to build."
        ],
        realLifeExample: {
          title: "Self-Updating Floor Plan",
          analogy: "A digital architectural blueprint that redraws itself in real time as walls and cables are added."
        },
        sceneKey: "scene_3_3_4"
      }
    ],
    lab: {
      id: "lab-3",
      topicNumber: 3,
      title: "Lab 3: Connect to the Outside",
      priyaIntro: "Right now QuickMart is an island. A router connects it to the internet.",
      flags: [
        {
          id: "flag-3-1",
          flagNumber: 1,
          storyBeat: "Create the virtual router and link its external interface to public-net.",
          objective: "Create router qm-router with external network public-net.",
          steps: [
            "In Horizon, navigate to Project → Network → Routers",
            "Click '+ Create Router'",
            "Enter Router Name: qm-router",
            "Select External Network: public-net",
            "Click Create Router"
          ],
          checkId: "check_create_router",
          question: "What external IP did the router receive?",
          correctAnswers: ["203.0.113.15"],
          hint: "Open the router and look at the External Gateway section.",
          priyaReply: "203.0.113.15 assigned. The router is tethered to the public cloud uplink."
        },
        {
          id: "flag-3-2",
          flagNumber: 2,
          storyBeat: "Plug qm-subnet into the router's internal interface.",
          objective: "Add an interface on qm-router for qm-subnet.",
          steps: [
            "Click on qm-router in the Routers list",
            "Switch to the Interfaces tab",
            "Click '+ Add Interface'",
            "Select Subnet: qm-subnet: 10.20.1.0/24 (qm-net)",
            "Leave IP Address blank (it takes the subnet gateway 10.20.1.1 automatically)",
            "Click Submit"
          ],
          checkId: "check_router_interface",
          question: "What IP does the router's interface use on qm-net?",
          correctAnswers: ["10.20.1.1"],
          hint: "It takes the subnet's gateway address.",
          priyaReply: "Interface established at 10.20.1.1. Now packets on qm-net have an exit door."
        },
        {
          id: "flag-3-3",
          flagNumber: 3,
          storyBeat: "Verify the architectural connectivity in the visual topology map.",
          objective: "View the live Network Topology diagram.",
          steps: [
            "In Project → Network, click on Network Topology",
            "Inspect the connections between public-net, qm-router, and qm-net"
          ],
          checkId: "check_view_topology",
          question: "How many networks does qm-router connect, counting public-net?",
          correctAnswers: ["2", "two"],
          hint: "Count the networks touching the router in the diagram.",
          priyaReply: "Exactly 2 networks bridged. Next, we build the firewall rules."
        }
      ]
    }
  },

  // =========================================================================
  // TOPIC 4: Security Groups (Neutron)
  // =========================================================================
  {
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
  },

  // =========================================================================
  // TOPIC 5: Launching Instances (Nova, Glance, Neutron)
  // =========================================================================
  {
    id: "topic-5",
    topicNumber: 5,
    title: "Launching Instances (Nova, Glance, Neutron)",
    service: "Nova",
    slides: [
      {
        id: "5.1",
        code: "5.1",
        title: "What are instances, and which OpenStack service handles them?",
        textLines: [
          "In OpenStack, an instance is a virtual machine that Nova, the compute service, creates and manages.",
          "Nova can launch, stop, and delete instances.",
          "QuickMart's storefront and database will each be one: qm-web-01 and qm-db-01."
        ],
        realLifeExample: {
          title: "Renting a Commercial Space",
          analogy: "Renting one unit inside a large commercial building."
        },
        recapChip: "Revisit M2 – virtual machines",
        sceneKey: "scene_5_1"
      },
      {
        id: "5.2",
        code: "5.2",
        title: "How launching works, and why we need it",
        textLines: [
          "When you click Launch, Nova finds a physical host with free capacity.",
          "It takes the OS image from Glance and has Neutron connect the instance to your network.",
          "The status moves from BUILD to ACTIVE, or to ERROR if something fails.",
          "You get a machine in seconds and can delete it just as fast, which is why teams build on cloud."
        ],
        realLifeExample: {
          title: "Ready-Assembled Desk",
          analogy: "Ordering a ready-assembled desk: it's delivered, built, and plugged in within minutes."
        },
        sceneKey: "scene_5_2"
      },
      {
        id: "5.3.1",
        code: "5.3.1",
        title: "Instance Name (Details tab)",
        textLines: [
          "On Details you give the instance a name and leave Count at 1, so each machine gets its own name.",
          "Name by role and number (qm-web-01).",
          "Names appear in the Instances list and Topology, so clear ones save mistakes later."
        ],
        realLifeExample: {
          title: "Desk Nameplates",
          analogy: "A nameplate on each desk so colleagues know who sits where."
        },
        knowMore: {
          title: "Availability Zones (AZ)",
          whatIsIt: "An AZ is an isolated datacenter fault domain with independent power, cooling, and networking.",
          whyDoesItMatter: "Production high-availability setups run redundant instances across multiple AZs. We use the default single zone for our training cluster.",
          simpleAnalogy: "Renting offices in two separate buildings across the street so a power cut in one doesn't shut down the business."
        },
        sceneKey: "scene_5_3_1"
      },
      {
        id: "5.3.2",
        code: "5.3.2",
        title: "Image (Source tab)",
        textLines: [
          "An image is the template an instance boots from. Glance stores them.",
          "Set boot source to Image and pick one: ubuntu-22.04 is a plain Linux server, and mysql-8-server already has a database installed.",
          "Keep Create New Volume = No, so the disk lives with the instance and disappears when it is deleted."
        ],
        realLifeExample: {
          title: "Master Stamping Template",
          analogy: "The master copy every new factory vehicle is stamped from."
        },
        knowMore: {
          title: "Cinder Volumes & Trusted Images",
          whatIsIt: "Cinder provides persistent block storage attached via network. Untrusted images may contain rootkits or unpatched vulnerabilities.",
          whyDoesItMatter: "In production, stateful databases usually run on persistent Cinder volumes, and only approved Golden Images are permitted.",
          simpleAnalogy: "Plugging in a durable external hard drive versus using temporary scratch paper."
        },
        sceneKey: "scene_5_3_2"
      },
      {
        id: "5.3.3",
        code: "5.3.3",
        title: "Flavor",
        textLines: [
          "A flavor is the machine's size: vCPUs, RAM, and disk.",
          "m1.small is 1 vCPU, 2 GB RAM, 20 GB disk. m1.medium is 2 vCPU, 4 GB, 40 GB.",
          "In the wizard, move your choice from Available to Allocated with the ↑ arrow.",
          "Pick the smallest flavor that does the job, since bigger ones use more of your quota."
        ],
        realLifeExample: {
          title: "Fleet Vehicle Sizing",
          analogy: "Choosing a small or medium van for the delivery fleet based on order volume."
        },
        sceneKey: "scene_5_3_3"
      },
      {
        id: "5.3.4",
        code: "5.3.4",
        title: "Networks",
        textLines: [
          "On Networks, allocate qm-net.",
          "This creates a port on that network and the instance receives a private address from the pool.",
          "With no network the instance boots but can't talk to anything, so the Launch button stays blocked until one is chosen."
        ],
        realLifeExample: {
          title: "Floor Assignment",
          analogy: "Choosing which floor of the building a new employee's desk sits on."
        },
        sceneKey: "scene_5_3_4"
      },
      {
        id: "5.3.5",
        code: "5.3.5",
        title: "Security Groups",
        textLines: [
          "default is pre-allocated here, so move it back out and allocate only the group the machine needs (qm-web-sg or qm-db-sg).",
          "As 4.2 explained, groups add together, so leaving default attached silently widens access."
        ],
        realLifeExample: {
          title: "Replacing Badges",
          analogy: "Taking the generic badge off and issuing the specific department clearance."
        },
        recapChip: "Revisit 4.2 – groups combine",
        sceneKey: "scene_5_3_5"
      },
      {
        id: "5.3.6",
        code: "5.3.6",
        title: "Key Pair",
        textLines: [
          "A key pair lets you log in without a password.",
          "OpenStack keeps the public half and puts it on the instance at boot.",
          "You keep the private half, downloaded once as a .pem file. If you lose it, it can't be recovered."
        ],
        realLifeExample: {
          title: "Padlock & Brass Key",
          analogy: "A lock fitted to the door and the only brass key sitting in your pocket."
        },
        knowMore: {
          title: "Asymmetric Cryptography",
          whatIsIt: "Public-key cryptography uses matched mathematical key pairs. The public key encrypts/verifies; the private key decrypts/signs.",
          whyDoesItMatter: "Eliminates vulnerable shared passwords and prevents brute-force login attacks.",
          simpleAnalogy: "A postal drop box: anyone can drop a letter into the public slot, but only the carrier with the private key can unlock the box."
        },
        sceneKey: "scene_5_3_6"
      },
      {
        id: "5.4",
        code: "5.4",
        title: "Reading the result: status and private IP",
        textLines: [
          "After launch, the Instances list shows Build, then Active, or Error.",
          "Once Active, the instance has a private IP from DHCP.",
          "That address only works inside qm-net, which is why the web server will need a floating IP later."
        ],
        realLifeExample: {
          title: "Package Tracking",
          analogy: "A parcel tracking status moving from 'preparing' to 'out for delivery' to 'delivered'."
        },
        sceneKey: "scene_5_4"
      }
    ],
    lab: {
      id: "lab-5",
      topicNumber: 5,
      title: "Lab 5: Bring It to Life",
      priyaIntro: "Time to launch. Web server first, then the database. You'll need a key pair so you can log in without a password.",
      flags: [
        {
          id: "flag-5-1",
          flagNumber: 1,
          storyBeat: "Create qm-key and launch qm-web-01 into qm-net with qm-web-sg.",
          objective: "Create key pair qm-key, then launch instance qm-web-01.",
          steps: [
            "Project → Compute → Key Pairs → '+ Create Key Pair', Name: qm-key → Create. Kali Downloads receives qm-key.pem",
            "Project → Compute → Instances → 'Launch Instance'",
            "Details: Instance Name = qm-web-01, Count = 1",
            "Source: Boot Source = Image, Create New Volume = No, Image = ubuntu-22.04 (click ↑)",
            "Flavor: Select m1.small (click ↑)",
            "Networks: Allocate qm-net (click ↑)",
            "Security Groups: REMOVE 'default' (click ↓), ALLOCATE 'qm-web-sg' (click ↑)",
            "Key Pair: Allocate qm-key",
            "Click Launch Instance and wait for status to become ACTIVE"
          ],
          checkId: "check_launch_web_vm",
          question: "What private IP did qm-web-01 receive?",
          correctAnswers: ["10.20.1.3"],
          hint: "The DHCP service took .2, so the first instance gets the next free address.",
          priyaReply: "qm-web-01 is ACTIVE at 10.20.1.3 with qm-web-sg."
        },
        {
          id: "flag-5-2",
          flagNumber: 2,
          storyBeat: "Now launch the database instance qm-db-01 using the mysql-8-server image.",
          objective: "Launch qm-db-01 with flavor m1.medium, qm-db-sg only, and qm-key.",
          steps: [
            "Project → Compute → Instances → 'Launch Instance'",
            "Details: Name = qm-db-01",
            "Source: Boot Source = Image, Volume = No, Image = mysql-8-server (click ↑)",
            "Flavor: Select m1.medium (click ↑)",
            "Networks: Allocate qm-net (click ↑)",
            "Security Groups: REMOVE default (click ↓), ALLOCATE qm-db-sg (click ↑)",
            "Key Pair: Allocate qm-key",
            "Click Launch Instance and wait for ACTIVE"
          ],
          checkId: "check_launch_db_vm",
          question: "What private IP did qm-db-01 receive?",
          correctAnswers: ["10.20.1.4"],
          hint: "It launched after the web server.",
          priyaReply: "qm-db-01 is ACTIVE at 10.20.1.4 protected by qm-db-sg."
        },
        {
          id: "flag-5-3",
          flagNumber: 3,
          storyBeat: "Confirm our hardware resource consumption in Overview.",
          objective: "Check total vCPU consumption in Limit Summary.",
          steps: [
            "Navigate to Project → Compute → Overview",
            "Look at the VCPUs gauge in the Limit Summary"
          ],
          checkId: "check_compute_quota",
          question: "How many VCPUs does the project now show as used?",
          correctAnswers: ["3", "three"],
          hint: "m1.small has 1 vCPU and m1.medium has 2.",
          priyaReply: "3 vCPUs used. Both machines are running, but customers still can't reach the store."
        }
      ]
    }
  },

  // =========================================================================
  // TOPIC 6: Floating IPs & Exposure (Neutron)
  // =========================================================================
  {
    id: "topic-6",
    topicNumber: 6,
    title: "Floating IPs & Exposure (Neutron)",
    service: "Neutron",
    slides: [
      {
        id: "6.1",
        code: "6.1",
        title: "What is a floating IP?",
        textLines: [
          "A floating IP is a public address that Neutron gives you from public-net and attaches to one instance.",
          "It is called 'floating' because you can move it to another instance without rebuilding anything.",
          "Instances have only private addresses by default, so a floating IP is how the outside world reaches one."
        ],
        realLifeExample: {
          title: "Public Vanity Phone Number",
          analogy: "A shop's public street address or toll-free hotline that you can redirect to another warehouse anytime."
        },
        sceneKey: "scene_6_1"
      },
      {
        id: "6.2",
        code: "6.2",
        title: "How it works, and why we need it",
        textLines: [
          "The router maps the public address to the instance's private address, one to one.",
          "Visitors connect to the public IP and the router quietly forwards inward.",
          "Give a floating IP only to instances that must be public. Everything else stays private, which keeps what outsiders can reach small."
        ],
        realLifeExample: {
          title: "Front Desk Call Forwarding",
          analogy: "A receptionist forwards public phone calls only to the specific desks that need them."
        },
        sceneKey: "scene_6_2"
      },
      {
        id: "6.3.1",
        code: "6.3.1",
        title: "Allocate IP To Project",
        textLines: [
          "Allocate IP To Project reserves an address from a Pool (public-net).",
          "It counts against your floating-IP quota straight away, so the counter goes from 0/3 to 1/3.",
          "An allocated address that isn't attached is reserved and does nothing."
        ],
        realLifeExample: {
          title: "Reserving a Phone Line",
          analogy: "Booking a phone number with the telco before plugging the phone hardware in."
        },
        sceneKey: "scene_6_3_1"
      },
      {
        id: "6.3.2",
        code: "6.3.2",
        title: "Manage Associations",
        textLines: [
          "Manage Associations attaches the address to an instance.",
          "You choose the IP Address, then the Port to be associated, which is the instance's private IP (for example qm-web-01: 10.20.1.3).",
          "Attach it only to qm-web-01. After that the router draws the mapping."
        ],
        realLifeExample: {
          title: "Plugging Wire into the Desk",
          analogy: "Connecting the external phone line into the receptionist's desk."
        },
        sceneKey: "scene_6_3_2"
      },
      {
        id: "6.3.3",
        code: "6.3.3",
        title: "Attack surface",
        textLines: [
          "Your attack surface is everything an outsider can try to reach.",
          "Each public IP and each open port adds to it. A good design exposes as little as possible.",
          "QuickMart's storefront must be public and the database never is.",
          "You'll look at this from the attacker's side in the Attack phase."
        ],
        realLifeExample: {
          title: "Exterior Doors & Windows",
          analogy: "The more street-facing doors a shop has, the more locks a burglar can test."
        },
        sceneKey: "scene_6_3_3"
      },
      {
        id: "6.3.4",
        code: "6.3.4",
        title: "Reading results in the browser",
        textLines: [
          "From the Kali workstation, which acts as the outside world, Firefox shows what is exposed.",
          "A page that loads means the port is open.",
          "'The connection has timed out' means a firewall silently dropped the traffic.",
          "'Unable to connect' means there is no route to that address. Telling them apart shows whether a firewall or the network is the cause."
        ],
        realLifeExample: {
          title: "Three Kinds of Doors",
          analogy: "A door that opens, a door that never answers, and a street with no door at all."
        },
        sceneKey: "scene_6_3_4"
      }
    ],
    lab: {
      id: "lab-6",
      topicNumber: 6,
      title: "Lab 6: Open the Front Door, Only the Front Door",
      priyaIntro: "Customers still can't reach the store. Only the web server should be public. The database stays private.",
      flags: [
        {
          id: "flag-6-1",
          flagNumber: 1,
          storyBeat: "Allocate a floating IP from public-net and associate it with qm-web-01.",
          objective: "Allocate floating IP 203.0.113.27 and associate with qm-web-01.",
          steps: [
            "In Horizon, open Project → Network → Floating IPs",
            "Click 'Allocate IP To Project', Pool: public-net → Allocate IP (you receive 203.0.113.27)",
            "On the row for 203.0.113.27, click 'Associate'",
            "Port to be associated: select 'qm-web-01: 10.20.1.3'",
            "Click Associate",
            "Do NOT attach any floating IP to qm-db-01!"
          ],
          checkId: "check_associate_fip",
          question: "What floating IP did you receive?",
          correctAnswers: ["203.0.113.27"],
          hint: "Look at the Floating IPs table.",
          priyaReply: "203.0.113.27 is routed to qm-web-01. The front door is open."
        },
        {
          id: "flag-6-2",
          flagNumber: 2,
          storyBeat: "Check how many floating IPs remain in the project quota.",
          objective: "Inspect remaining floating IPs in Overview.",
          steps: [
            "Project → Compute → Overview",
            "Look at the Floating IPs graph"
          ],
          checkId: "check_fip_quota",
          question: "How many floating IPs do you have left?",
          correctAnswers: ["2", "two"],
          hint: "You started with 3 in Lab 1.",
          priyaReply: "2 remaining. We conserved public IPv4 space."
        },
        {
          id: "flag-6-3",
          flagNumber: 3,
          storyBeat: "Prove from the outside workstation what is exposed and what is shielded.",
          objective: "Test the 4 URLs from Kali Firefox to verify exposure behavior.",
          steps: [
            "In Kali Firefox, visit http://203.0.113.27 (Storefront loads)",
            "Visit http://203.0.113.27/status (Database: 10.20.1.4:3306 connected)",
            "Visit http://203.0.113.27:3306 (Observe connection timeout)",
            "Visit http://10.20.1.4 (Observe 'Unable to connect')"
          ],
          checkId: "check_prove_exposure",
          question: "What did Firefox show for http://203.0.113.27:3306?",
          correctAnswers: ["timed out", "timeout", "the connection has timed out", "connection timed out", "took too long"],
          hint: "The firewall has no rule for that port, so the request never gets an answer.",
          priyaReply: "Timed out! The database firewall silently drops packets from the outside. QuickMart is live!"
        }
      ]
    }
  },

  // =========================================================================
  // TOPIC 7: Users & Roles (Keystone)
  // =========================================================================
  {
    id: "topic-7",
    topicNumber: 7,
    title: "Users & Roles (Keystone)",
    service: "Keystone",
    slides: [
      {
        id: "7.1",
        code: "7.1",
        title: "What is Keystone?",
        textLines: [
          "Keystone is OpenStack's identity service.",
          "It knows who users are, which projects they belong to, and what role they hold there.",
          "A domain groups users and projects, which is why the Horizon login asks for one.",
          "Every request starts with Keystone checking who you are."
        ],
        realLifeExample: {
          title: "Corporate Head Office",
          analogy: "QuickMart head office is the domain, and the departments are the projects."
        },
        recapChip: "Revisit 1.5 – projects, M3 – users, roles, least privilege",
        sceneKey: "scene_7_1"
      },
      {
        id: "7.2",
        code: "7.2",
        title: "How it works, and why access changes go through a request",
        textLines: [
          "When you log in, Keystone issues a token carrying your identity and your role in a project, and each service checks it before acting.",
          "Roles are assigned per project.",
          "Horizon's Identity panels appear only for admin users. Your trainee account is a member: it can build, but it cannot create users or change roles.",
          "At QuickMart, access changes go through an access request that Priya's team reviews, so no one hands out their own access."
        ],
        realLifeExample: {
          title: "Color-Coded Wristbands",
          analogy: "Event wristbands: the color decides which areas you enter, and the registration desk decides who gets one."
        },
        recapChip: "Revisit M3 – separation of duties",
        sceneKey: "scene_7_2"
      },
      {
        id: "7.3.1",
        code: "7.3.1",
        title: "Roles: reader, member, admin",
        textLines: [
          "A reader can only view.",
          "A member can view, create, and manage resources.",
          "An admin can do everything, including users, roles, and deleting anything.",
          "They form a ladder of increasing power, and you should give the lowest rung that gets the job done."
        ],
        realLifeExample: {
          title: "Badge Tiers",
          analogy: "Visitor pass, store staff badge, and store manager master key."
        },
        sceneKey: "scene_7_3_1"
      },
      {
        id: "7.3.2",
        code: "7.3.2",
        title: "Role assignment",
        textLines: [
          "A role assignment links one user to one role in one project.",
          "A user with no role on any project can log in but sees only 'You are not authorized for any projects'.",
          "Changing someone's access means changing that assignment, and an admin does this in Identity → Projects → Manage Members."
        ],
        realLifeExample: {
          title: "Official Staff Register",
          analogy: "The staff register that records each person's security badge level."
        },
        sceneKey: "scene_7_3_2"
      },
      {
        id: "7.3.3",
        code: "7.3.3",
        title: "Who gets an account at QuickMart",
        textLines: [
          "Ravi (employee) runs the platform day to day, so he gets member.",
          "FreshFarms (vendor) only needs to view stock reports, so it gets reader.",
          "Customers use the public storefront and never log in to the cloud, so they get no role.",
          "You hold member: enough to build, not enough to hand out access. That is deliberate."
        ],
        realLifeExample: {
          title: "Store Clearances",
          analogy: "Staff get keys to the shop floor, suppliers get a viewing window, and shoppers use the front door."
        },
        sceneKey: "scene_7_3_3"
      },
      {
        id: "7.3.4",
        code: "7.3.4",
        title: "The Access Request portal",
        textLines: [
          "Open http://access.quickmart.lab.",
          "Choose a User, choose the Requested access (reader, member, admin, or No access), and write a Justification that states the business need.",
          "Priya's team reviews it and the status moves from Under review to Approved or Returned with a reason. A returned request can be fixed and resubmitted."
        ],
        realLifeExample: {
          title: "Formal Purchase Request",
          analogy: "A purchase request form: you state the business need, finance approves or denies."
        },
        sceneKey: "scene_7_3_4"
      },
      {
        id: "7.3.5",
        code: "7.3.5",
        title: "Reading a denial in Horizon",
        textLines: [
          "When a request is refused for lack of permission, Horizon shows a red message ending in HTTP 403 Forbidden, which means 'I know who you are, but you aren't allowed.'",
          "A 401 means the system doesn't know who you are.",
          "You will see a 403 yourself when your own account tries to open the Identity pages."
        ],
        realLifeExample: {
          title: "Recognized but Not on the List",
          analogy: "Being recognized at the front door by the bouncer, but your name is not on the VIP lounge list."
        },
        recapChip: "Revisit M1 – HTTP",
        sceneKey: "scene_7_3_5"
      }
    ],
    lab: {
      id: "lab-7",
      topicNumber: 7,
      title: "Lab 7: The Morning After (Fix the Broken Cloud)",
      priyaIntro: "QuickMart is live and the team is growing. Ravi from store ops and our supplier FreshFarms need access, and Sales wants a customer test account that needs none. IT has created the logins. You decide what access each should get and send me the requests. I'll approve what's right.",
      flags: [
        {
          id: "flag-7-1",
          flagNumber: 1,
          storyBeat: "Submit access requests for the three new personas according to least privilege.",
          objective: "In Access Portal, request ravi-employee=member, freshfarms-vendor=reader, customer-test=No access.",
          steps: [
            "In Firefox, open http://access.quickmart.lab",
            "Click '+ New Request'",
            "Request 1: User = ravi-employee, Role = member, Justification = 'Store operations lead needs to manage daily resources' → Submit",
            "Request 2: User = freshfarms-vendor, Role = reader, Justification = 'Produce supplier only views daily stock reports' → Submit",
            "Request 3: User = customer-test, Role = No access, Justification = 'Customers shop through the app and need zero cloud console access' → Submit",
            "Wait for all three to transition from 'Under review' to 'Approved'"
          ],
          checkId: "check_access_requests_flag1",
          question: "What access did you request for the vendor account?",
          correctAnswers: ["reader", "read-only", "read only"],
          hint: "The vendor only needs to view things.",
          priyaReply: "Approved. All three roles assigned properly. Time to pack up for the day."
        },
        {
          id: "flag-7-2",
          flagNumber: 2,
          storyBeat: "Next morning, 9:12 AM. The audit bot flagged unauthorized overnight role escalations!",
          objective: "Inspect access-report-0912.html, verify trainee 403, and test vendor delete safeguard.",
          steps: [
            "In Kali desktop, open Files → Documents → access-report-0912.html and inspect the overnight role assignments",
            "In Horizon as trainee, attempt to open http://horizon.quickmart.lab/identity/ and observe the 403 Forbidden error",
            "Sign out of Horizon and sign in as freshfarms-vendor (Password: Welcome@123)",
            "Go to Project → Compute → Instances, select qm-db-01, click 'Delete Instance' and confirm",
            "Observe the training safeguard banner: 'Training safeguard: nothing was deleted, but this request would have been Allowed.'"
          ],
          checkId: "check_diagnose_flag2",
          question: "Which user holds the admin role but shouldn't?",
          correctAnswers: ["freshfarms-vendor", "vendor", "freshfarms"],
          hint: "A supplier only needs to look. Check who was allowed to delete qm-db-01.",
          priyaReply: "The vendor was escalated to admin overnight! They could have deleted our entire database."
        },
        {
          id: "flag-7-3",
          flagNumber: 3,
          storyBeat: "Submit remediation requests and verify that excessive privileges are revoked.",
          objective: "Remediate via Access Portal, verify vendor 403 on delete, and customer lockout.",
          steps: [
            "Sign back into Horizon / Access Portal as trainee (Quick@Mart1)",
            "In http://access.quickmart.lab, submit: freshfarms-vendor → reader (Justification: 'Revoke admin, restrict to read-only stock audit')",
            "Submit: customer-test → No access (Justification: 'Revoke member, customer accounts must not have cloud roles')",
            "Wait for both requests to show 'Approved'",
            "Sign in as freshfarms-vendor, retry deleting qm-db-01 → Observe HTTP 403 Forbidden",
            "Sign in as customer-test → Observe 'You are not authorized for any projects'"
          ],
          checkId: "check_remediate_flag3",
          question: "What HTTP status code did the denied delete show?",
          correctAnswers: ["403", "403 forbidden", "http 403"],
          hint: "Read the end of the red message after the vendor tries to delete.",
          priyaReply: "403 Forbidden! Least privilege is restored. You've completed Module M4!"
        }
      ]
    }
  }
];

// Helper to flatten all slides in order for linear traversal if needed
export const ALL_M4_SLIDES = M4_TOPICS.flatMap((topic) => topic.slides);
