/**
 * M4 Topic 2: Networks & Subnets (Neutron)
 */

export const topic2 = {
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
};

export default topic2;
