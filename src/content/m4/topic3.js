/**
 * M4 Topic 3: Routers (Neutron)
 */

export const topic3 = {
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
};

export default topic3;
