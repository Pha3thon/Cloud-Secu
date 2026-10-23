/**
 * M1 Topic 4: Core Internet Protocols — DNS, HTTP/HTTPS, TLS (30 min)
 * CDAC Cloud Security Training Platform
 */

export const topic4 = {
  id: "m1-topic-4",
  topicNumber: 4,
  title: "Core Internet Protocols — DNS, HTTP/HTTPS, TLS",
  service: "Core Protocols",
  hasBriefing: false,
  slides: [
    {
      id: "4.1",
      code: "4.1",
      format: "eli5",
      tag: "In Simple Words",
      title: "What is DNS, and Why Does it Matter for Security?",
      body: "Imagine if you had to memorize a 10-digit telephone number for every single friend in your school, instead of just tapping their name in your phone contacts. DNS is the internet's giant contact list: you type a friendly name like quickmart.com, and it instantly finds the exact computer phone number to call.",
      sceneKey: "scene_m1_4_1"
    },
    {
      id: "4.1-std",
      code: "4.1-std",
      format: "official-definition",
      tag: "Official Definition",
      title: "Official Definition: Domain Name System (DNS)",
      standardName: "IETF RFC 1034 & RFC 1035",
      standardFullTitle: "Domain Names — Concepts, Facilities, Implementation and Specification",
      definitionText: "The Domain Name System (DNS) is a distributed, hierarchical database system for identifying and locating computers and services on the Internet. DNS translates human-memorable domain names into machine-readable IP addresses and maintains resource records (RRs) across authoritative name servers, caching resolvers, and top-level domain (TLD) registries without relying on a single centralized host table.",
      sourceUrl: "https://datatracker.ietf.org/doc/html/rfc1035",
      bridgeLine: "RFC 1034 and 1035 formalize this giant 'contact list' idea into a hierarchical tree of root, TLD, and authoritative name servers.",
      sceneId: null
    },
    {
      id: "4.2",
      code: "4.2",
      title: "Essential DNS & Web Protocol Vocabulary",
      textLines: [
        "Domain name: A human-readable host address, e.g. example.com.",
        "Resolver: The recursive DNS server your workstation queries first to resolve hostnames.",
        "Root / TLD / Authoritative: The hierarchical server chain, querying from root (.) to TLD (.com) to the domain's authoritative server.",
        "DNS record: A specific database mapping in a zone, e.g. hostname → IPv4 address.",
        "URL: Uniform Resource Locator, specifying protocol, domain, and resource path.",
        "Plaintext: Data transmitted with zero encryption — readable by anyone sniffing network packets.",
        "TLS (Transport Layer Security): The modern cryptographic protocol encrypting data in transit.",
        "Certificate & CA: A digitally signed cryptographic certificate issued by a trusted Certificate Authority."
      ],
      sceneKey: "scene_m1_4_3"
    },
    {
      id: "4.3",
      code: "4.3",
      title: "How DNS Resolution Works & Attack Surfaces",
      textLines: [
        "Hierarchical resolution query flow: Client → Resolver → Root Server (.) → TLD Server (.com) → Authoritative Server → Answer.",
        "Why attackers prioritize DNS targeting:",
        "Dangling DNS Records: When a cloud VM or bucket is deleted but its DNS CNAME record remains, an attacker can register the abandoned resource and take over the domain.",
        "Subdomain Reconnaissance: Querying DNS zone records reveals hidden staging servers, test portals, and internal microservices."
      ],
      sceneKey: "scene_m1_4_1"
    },
    {
      id: "4.4",
      code: "4.4",
      title: "Standard DNS Record Types",
      textLines: [
        "A Record: Maps a hostname to a 32-bit IPv4 address (e.g. portal.quickmart.local → 198.51.100.10).",
        "AAAA Record: Maps a hostname to a 128-bit IPv6 address.",
        "CNAME Record: An alias pointing one hostname to another canonical domain name.",
        "MX Record: Mail Exchange record specifying mail servers responsible for domain email.",
        "TXT Record: Arbitrary text records used for domain ownership validation, SPF anti-spoofing, and DKIM signatures."
      ],
      sceneKey: "scene_m1_4_3"
    },
    {
      id: "4.5",
      code: "4.5",
      format: "eli5",
      tag: "In Simple Words",
      title: "HTTP vs. HTTPS & The TLS Handshake",
      body: "HTTP is like sending a postcard through the mail: anyone who picks it up on the way can read your secret passwords written in plain pencil. HTTPS puts your postcard inside a locked metal box with a special padlock called TLS, so only the real website with the key can ever open and read it.",
      sceneKey: "scene_m1_4_2"
    },
    {
      id: "4.5a-std",
      code: "4.5a-std",
      format: "official-definition",
      tag: "Official Definition",
      title: "Official Definition: Hypertext Transfer Protocol (HTTP Semantics)",
      standardName: "IETF RFC 9110",
      standardFullTitle: "HTTP Semantics",
      definitionText: "The Hypertext Transfer Protocol (HTTP) is a stateless, application-level request/response communication protocol. HTTP defines standardized request methods (GET, POST, PUT, DELETE, HEAD, OPTIONS), headers, representations, and status codes (1xx–5xx) exchanged between clients and target servers over underlying reliable transport connections.",
      sourceUrl: "https://datatracker.ietf.org/doc/html/rfc9110",
      bridgeLine: "IETF RFC 9110 formalizes this open 'postcard' protocol into standardized request methods (GET, POST) and response status codes.",
      sceneId: null
    },
    {
      id: "4.5b-std",
      code: "4.5b-std",
      format: "official-definition",
      tag: "Official Definition",
      title: "Official Definition: Transport Layer Security (TLS 1.3)",
      standardName: "IETF RFC 8446",
      standardFullTitle: "The Transport Layer Security (TLS) Protocol Version 1.3",
      definitionText: "The Transport Layer Security (TLS) protocol provides secure communications across the Internet through cryptographic authentication, confidentiality, and data integrity. TLS operates directly above transport protocols (such as TCP) and encapsulates application protocols (such as HTTP). It consists of two primary layers: the TLS Handshake Protocol, which negotiates cryptographic cipher suites and authenticates peers, and the TLS Record Protocol, which encrypts and verifies message integrity.",
      sourceUrl: "https://datatracker.ietf.org/doc/html/rfc8446",
      bridgeLine: "IETF RFC 8446 formalizes this 'locked metal box' encryption layer, protecting data confidentiality and integrity across the internet.",
      sceneId: null
    },
    {
      id: "4.5c-std",
      code: "4.5c-std",
      format: "official-definition",
      tag: "Official Definition",
      title: "Official Definition: X.509 Public Key Certificates",
      standardName: "IETF RFC 5280",
      standardFullTitle: "Internet X.509 Public Key Infrastructure Certificate Profile",
      definitionText: "An X.509 Public Key Certificate is a cryptographically signed data structure that securely binds a subject entity's identity to a public cryptographic key. Issued and signed by a trusted Certificate Authority (CA), the certificate contains the subject identity, validity dates, subject public key information, and digital signature of the issuer, enabling relying parties to verify server authenticity without prior out-of-band key exchanges.",
      sourceUrl: "https://datatracker.ietf.org/doc/html/rfc5280",
      bridgeLine: "IETF RFC 5280 formalizes the digital identity card (X.509 certificate) signed by a trusted authority to prove a website is genuinely who it says it is.",
      sceneId: null
    },
    {
      id: "4.q",
      code: "4.q",
      title: "Topic 4 Check: Core Internet Protocols",
      textLines: [
        "Verify your knowledge of recursive DNS resolution and TLS encryption before moving to packet analysis."
      ],
      quiz: {
        question: "What is the correct sequence of server queries in a recursive DNS lookup?",
        options: [
          "Client → Recursive Resolver → Root Server → TLD Server → Authoritative Server",
          "Client → Authoritative Server → TLD Server → Root Server",
          "Client → TLD Server → Authoritative Server → Resolver",
          "Client → Web Server → Certificate Authority → DNS Server"
        ],
        answer: "Option A",
        explanation: "Recursive DNS resolution starts from the Client to the Resolver, queries the Root (.) servers, traverses to the Top-Level Domain (TLD) servers (.com), and finishes at the domain's Authoritative name server holding the definitive zone record."
      },
      sceneKey: "scene_m1_4_5"
    }
  ]
};

export default topic4;
