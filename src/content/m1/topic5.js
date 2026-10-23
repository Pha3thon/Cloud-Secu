/**
 * M1 Topic 5: Traffic Analysis with Wireshark (25 min)
 * CDAC Cloud Security Training Platform
 * Includes Lab 2: Network & Traffic Analysis Lab (75 min)
 */

import { m1Lab2 } from '@/labs/m1Lab2';

export const topic5 = {
  id: "m1-topic-5",
  topicNumber: 5,
  title: "Traffic Analysis with Wireshark",
  service: "Traffic Analysis",
  hasBriefing: false,
  lab: m1Lab2,
  slides: [
    {
      id: "5.1",
      code: "5.1",
      title: "What is Packet Analysis, and What Tool is Standard?",
      textLines: [
        "Packet analysis means capturing and inspecting the raw binary data flowing across a network interface.",
        "Wireshark is the free, industry-standard packet analyzer used by network engineers, SOC analysts, and penetration testers alike.",
        "It provides deep visibility into network handshakes, transport protocols, and unencrypted application payloads."
      ],
      sceneKey: "scene_m1_5_1"
    },
    {
      id: "5.2",
      code: "5.2",
      title: "Packet Capture & Analysis Terminology",
      textLines: [
        "Packet capture (pcap): A saved binary recording file of network traffic (.pcap or .pcapng).",
        "Interface: The network adapter (e.g. eth0, wlan0) Wireshark binds to and listens on.",
        "Promiscuous mode: A hardware mode where the network interface reads all traffic passing through the wire, not just traffic addressed to its own MAC address.",
        "Display filter: A search expression narrowing thousands of packets down to specific protocols, addresses, or methods (e.g. http.request.method == 'POST').",
        "TCP stream: The full back-and-forth conversation between a client and server, reconstructed chronologically from individual sequenced packets."
      ],
      sceneKey: "scene_m1_5_2"
    },
    {
      id: "5.3",
      code: "5.3",
      title: "How Wireshark Captures and Decodes Traffic",
      textLines: [
        "Wireshark puts an interface into promiscuous mode, then decodes each packet's headers layer by layer — exactly matching the OSI model from Topic 3.",
        "Analysts can inspect Ethernet MAC frames (Layer 2), IP addresses and TTL headers (Layer 3), TCP sequence numbers and ports (Layer 4), and application payloads (Layer 7).",
        "Security teams use packet analysis to detect unauthorized port scans, spot plaintext credentials, and investigate security incidents — a skill directly reused in Module 12 (Incident Response)."
      ],
      sceneKey: "scene_m1_5_3"
    },
    {
      id: "5.4",
      code: "5.4",
      title: "Core Wireshark Analysis Actions",
      textLines: [
        "Start a capture: Select an interface → click the blue shark-fin icon.",
        "Filter traffic: Type expressions into the display filter bar, e.g. ip.addr == 10.0.0.5, tcp.port == 443, or dns.",
        "Follow a conversation: Right-click a packet → Follow → TCP Stream.",
        "Why Follow TCP Stream matters: It reconstructs the entire client-server dialogue in human-readable order — exactly how you will spot a plaintext login password in Lab 2."
      ],
      sceneKey: "scene_m1_5_4"
    },
    {
      id: "5.q",
      code: "5.q",
      title: "Topic 5 Check: Traffic Analysis",
      textLines: [
        "Verify your understanding of packet capture and display filters before entering Lab 2."
      ],
      quiz: {
        question: "What does 'promiscuous mode' enable a network interface to do in Wireshark?",
        options: [
          "Read all traffic passing across the physical segment, not just packets addressed to its own MAC address",
          "Encrypt incoming HTTP requests into HTTPS TLS packets",
          "Block unauthenticated packets at the kernel level like a firewall",
          "Double the capture buffer size in system RAM"
        ],
        answer: "Option A",
        explanation: "In promiscuous mode, the network interface card disables hardware destination address filtering and delivers all passing frames to Wireshark for full packet inspection."
      },
      sceneKey: "scene_m1_5_5"
    }
  ]
};

export default topic5;
