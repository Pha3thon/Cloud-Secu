/**
 * M4 Topic 5: Launching Instances (Nova, Glance, Neutron)
 */

export const topic5 = {
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
};

export default topic5;
