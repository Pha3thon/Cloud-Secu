/**
 * M1 Topic 3: Networking Models & IP Addressing (35 min)
 * CDAC Cloud Security Training Platform
 */

export const topic3 = {
  id: "m1-topic-3",
  topicNumber: 3,
  title: "Networking Models & IP Addressing",
  service: "Core Networking",
  hasBriefing: false,
  slides: [
    {
      id: "3.1",
      code: "3.1",
      title: "What is a Network, and Which Models Explain It?",
      textLines: [
        "A network is a collection of computing devices exchanging data over communication links.",
        "To standardize how communication occurs across diverse hardware, operating systems, and vendors, two fundamental reference models exist:",
        "The OSI Model: A 7-layer conceptual architecture used as the international teaching and design standard.",
        "The TCP/IP Model: A 4-layer practical framework that the real internet and cloud networks actually run on."
      ],
      realLifeExample: {
        title: "The Postal System",
        analogy: "A postal system: the model explains how a letter goes from being written, to being enveloped, to a delivery truck, to a mailbox, regardless of who wrote it."
      },
      sceneKey: "scene_m1_3_1"
    },
    {
      id: "3.2",
      code: "3.2",
      title: "Essential Networking Vocabulary",
      textLines: [
        "Packet: A chunk of data traveling across a network, wrapped with addressing headers.",
        "Header: Addressing and control information attached to the front of a packet at each layer.",
        "Encapsulation: Wrapping data in a new protocol header as it moves down the layers to be transmitted.",
        "Decapsulation: Stripping away protocol headers layer-by-layer as data ascends at the destination.",
        "Protocol: An agreed set of rules two devices follow to communicate (e.g. TCP, IP, HTTP).",
        "IP address: A unique numeric identifier assigned to a network interface (e.g. 192.168.1.10).",
        "Subnet mask / CIDR notation: Defines how many addresses belong to one local network segment, written e.g. /24.",
        "Port number: A 16-bit number identifying which specific application service traffic is intended for."
      ],
      sceneKey: "scene_m1_3_2"
    },
    {
      id: "3.3",
      code: "3.3",
      title: "How Data Moves, and Why Layers Matter for Security",
      textLines: [
        "As data travels down the stack to be sent, each layer wraps it in a new header (encapsulation). The receiving device unwraps it layer by layer (decapsulation).",
        "Security controls operate at specific layers:",
        "Layer 3/4 Controls: Network firewalls and Cloud Security Groups inspect IP addresses and TCP/UDP ports.",
        "Layer 7 Controls: Web Application Firewalls (WAFs) inspect application data, HTTP headers, and URL payloads.",
        "Knowing which layer an attack or control operates at is essential: in Module 4, Security Groups are Layer 3/4 controls."
      ],
      sceneKey: "scene_m1_3_3"
    },
    {
      id: "3.4",
      code: "3.4",
      format: "eli5",
      tag: "In Simple Words",
      title: "The OSI 7-Layer Reference Model",
      body: "Imagine sending a birthday drawing to your grandma across the country: you draw it, fold it into an envelope, write her address, put it in a mail van, and a mail carrier delivers it to her hands. The OSI model is just those seven little steps, explaining how a message travels from your screen into wires and arrives safely on someone else's screen.",
      sceneKey: "scene_m1_3_1"
    },
    {
      id: "3.4-std",
      code: "3.4-std",
      format: "official-definition",
      tag: "Official Definition",
      title: "Official Definition: OSI 7-Layer Basic Reference Model",
      standardName: "ISO/IEC 7498-1:1994",
      standardFullTitle: "Open Systems Interconnection — Basic Reference Model: The Basic Model",
      definitionText: "The Open Systems Interconnection architecture defines seven distinct functional layers: Physical (Layer 1), Data Link (Layer 2), Network (Layer 3), Transport (Layer 4), Session (Layer 5), Presentation (Layer 6), and Application (Layer 7). Each layer performs specified functions and provides standardized services to the layer immediately above it through service access points (SAPs), ensuring complete independence of underlying transmission technologies.",
      sourceUrl: "https://www.iso.org/standard/20269.html",
      bridgeLine: "ISO/IEC 7498-1 formalizes this 'seven step drawing journey' into seven distinct layers, ensuring hardware and software from any maker can talk seamlessly.",
      sceneId: null
    },
    {
      id: "3.5",
      code: "3.5",
      format: "eli5",
      tag: "In Simple Words",
      title: "The TCP/IP 4-Layer Model",
      body: "If the OSI model is a long 7-step recipe in a school textbook, the TCP/IP model is the quick 4-step recipe that real cooks actually use every day. It is the simple practical recipe that every phone, computer, and cloud website in the world uses to talk right now.",
      sceneKey: "scene_m1_3_1"
    },
    {
      id: "3.5-std",
      code: "3.5-std",
      format: "official-definition",
      tag: "Official Definition",
      title: "Official Definition: TCP/IP Host Architecture",
      standardName: "IETF RFC 1122 & RFC 1123",
      standardFullTitle: "Requirements for Internet Hosts — Communication Layers",
      definitionText: "To communicate using the Internet protocol suite, a host must implement the layered set of protocols consisting of: the Link Layer (media access and network hardware interface), the Internet Protocol (IP) Layer (datagram addressing, routing, and packet delivery across interconnected networks), the Transport Layer (end-to-end communication via TCP or UDP), and the Application Layer (protocols that interface with user processes and network services).",
      sourceUrl: "https://datatracker.ietf.org/doc/html/rfc1122",
      bridgeLine: "RFC 1122 formalizes this practical 4-layer recipe (Link, IP, Transport, Application) that actually powers the global internet.",
      sceneId: null
    },
    {
      id: "3.6",
      code: "3.6",
      format: "eli5",
      tag: "In Simple Words",
      title: "IP Addressing & Subnetting",
      body: "Imagine a big birthday cake that you slice up for a classroom party: the slash number tells you how many equal slices you get. A small slash number like /24 gives you a huge slice with 256 plates, while /28 gives you a smaller slice with just 16 plates.",
      recapChip: "Reappears in Module 4 VPCs",
      sceneKey: "scene_m1_3_3"
    },
    {
      id: "3.6a-std",
      code: "3.6a-std",
      format: "official-definition",
      tag: "Official Definition",
      title: "Official Definition: Classless Inter-Domain Routing (CIDR)",
      standardName: "IETF RFC 4632",
      standardFullTitle: "Classless Inter-domain Routing (CIDR): The Internet Address Assignment Plan",
      definitionText: "CIDR replaces the traditional class-based network allocation scheme (Class A, B, C) with arbitrary-length prefix masking. An IPv4 network is specified as an IP address followed by a forward slash and a decimal number n (ranging from /0 to /32), indicating that the leading n bits represent the network prefix, while the remaining (32 - n) bits specify host identifiers within that autonomous segment.",
      sourceUrl: "https://datatracker.ietf.org/doc/html/rfc4632",
      bridgeLine: "IETF RFC 4632 formalizes this 'cake slice' math into prefix masking, dictating how cloud VPCs carve up IP blocks.",
      sceneId: null
    },
    {
      id: "3.6b-std",
      code: "3.6b-std",
      format: "official-definition",
      tag: "Official Definition",
      title: "Official Definition: Private IPv4 Address Allocation",
      standardName: "IETF RFC 1918",
      standardFullTitle: "Address Allocation for Private Internets",
      definitionText: "The Internet Assigned Numbers Authority (IANA) has reserved three blocks of IPv4 address space for private internets that shall never be globally routable across the public Internet: 10.0.0.0/8 (10.0.0.0 to 10.255.255.255), 172.16.0.0/12 (172.16.0.0 to 172.31.255.255), and 192.168.0.0/16 (192.168.0.0 to 192.168.255.255).",
      sourceUrl: "https://datatracker.ietf.org/doc/html/rfc1918",
      bridgeLine: "IETF RFC 1918 formalizes these reserved private numbers so devices inside a home or cloud network can talk privately without being seen on the public street.",
      sceneId: null
    },
    {
      id: "3.7",
      code: "3.7",
      format: "eli5",
      tag: "In Simple Words",
      title: "Common Network Ports & Door Numbers",
      body: "Think of a big school building with lots of numbered classroom doors: the building's street address gets you to the school, but room 80 is where the art class is, and room 53 is where the library helper sits. On a computer, port numbers are just those classroom door numbers so messages reach the right helper.",
      recapChip: "Reappears in Module 4 Security Groups",
      sceneKey: "scene_m1_4_4"
    },
    {
      id: "3.7-std",
      code: "3.7-std",
      format: "official-definition",
      tag: "Official Definition",
      title: "Official Definition: Transport Protocol Port Number Registry",
      standardName: "IANA / IETF RFC 6335",
      standardFullTitle: "Service Name and Transport Protocol Port Number Registry",
      definitionText: "Port numbers are 16-bit unsigned integers (0 to 65535) used by transport protocols such as TCP and UDP to distinguish between multiple communication endpoints on a single host. IANA organizes port space into three categories: System Ports (0–1023), User Ports (1024–49151), and Dynamic/Private Ports (49152–65535).",
      sourceUrl: "https://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.xhtml",
      bridgeLine: "IANA formalizes these 'door numbers' into standardized 16-bit integers, assigning port 80 to HTTP, 443 to HTTPS, and 53 to DNS.",
      sceneId: null
    },
    {
      id: "3.q",
      code: "3.q",
      title: "Topic 3 Check: Networking Models & Subnetting",
      textLines: [
        "Review your subnet mathematics and protocol layer models before moving forward."
      ],
      quiz: {
        question: "For the subnet 10.0.5.0/28, how many total addresses exist, and what is the broadcast address?",
        options: [
          "16 total addresses (32-28 = 4 bits → 2^4 = 16), broadcast address 10.0.5.15",
          "32 total addresses, broadcast address 10.0.5.31",
          "256 total addresses, broadcast address 10.0.5.255",
          "8 total addresses, broadcast address 10.0.5.7"
        ],
        answer: "Option A",
        explanation: "A /28 subnet leaves 4 host bits: 2^4 = 16 total addresses (10.0.5.0 to 10.0.5.15). The first address (10.0.5.0) is the network ID, the last address (10.0.5.15) is the broadcast address, and 10.0.5.1–10.0.5.14 are usable for hosts."
      },
      sceneKey: "scene_m1_3_5"
    }
  ]
};

export default topic3;
