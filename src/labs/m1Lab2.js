/**
 * M1 Lab 2: Network & Traffic Analysis Lab (75 min)
 * CDAC Cloud Security Training Platform
 * Attached to Topic 5: Traffic Analysis with Wireshark
 */

export const m1Lab2 = {
  id: 'm1-lab2',
  topicId: 'm1-topic-5',
  topicNumber: 5,
  order: 2,
  title: 'Lab 2: Network & Traffic Analysis Lab',
  priyaIntro: "In this lab, you apply networking foundations and packet analysis: calculating CIDR broadcast boundaries, querying the lab DNS zone with dig, and inspecting a pcap packet capture in Wireshark to intercept unencrypted credentials.",
  nextTopicId: 'm1-topic-6',
  nextTopicNumber: 6,
  nextTopicTitle: 'Security Foundations (CIA, AAA, Zero Trust & Vulnerabilities)',
  onComplete: 'continue',
  flags: [
    {
      id: 'm1-lab2-flag1',
      flagNumber: 1,
      storyBeat: "Calculate the broadcast address for an internal cloud subnet allocated under CIDR /27.",
      objective: "Given the network 10.20.30.0/27, calculate its broadcast address.",
      steps: [
        'Recall the IPv4 formula: /27 leaves 32 - 27 = 5 host bits.',
        'Total addresses: 2^5 = 32 addresses (10.20.30.0 through 10.20.30.31).',
        'Identify the Network address: 10.20.30.0 (first address).',
        'Identify the Broadcast address: 10.20.30.31 (last address, reaching all devices on the segment).'
      ],
      check: (simState, labEvents = []) => {
        // Calculation check passes automatically to prompt student for computed value
        return { pass: true, failures: [] };
      },
      question: 'What is the broadcast address of the subnet 10.20.30.0/27?',
      answers: ['10.20.30.31'],
      altAnswers: ['10.20.30.31/27'],
      hint: "A /27 has 32 total addresses: from .0 to .31. The last address is the broadcast address.",
      priyaReply: "Spot on! 10.20.30.31 is the broadcast address, leaving 10.20.30.1 through 10.20.30.30 as the 30 usable host IPs."
    },
    {
      id: 'm1-lab2-flag2',
      flagNumber: 2,
      storyBeat: "Query the lab DNS zone to resolve the web portal IP address using dig.",
      objective: "Perform a DNS lookup for lab01.cloudsec.training A record.",
      steps: [
        'Open the Linux Terminal on your workstation.',
        'Run the domain lookup: dig lab01.cloudsec.training A',
        'Inspect the ANSWER SECTION for the returned IPv4 address.'
      ],
      check: (simState, labEvents = []) => {
        if (labEvents.includes('terminal_dig') || labEvents.includes('dig_dns_a_lookup')) {
          return { pass: true, failures: [] };
        }
        return {
          pass: false,
          failures: ["No DNS lookup executed for lab01.cloudsec.training. Run: dig lab01.cloudsec.training A in the terminal."]
        };
      },
      question: 'What IPv4 address is returned by the A record query for lab01.cloudsec.training?',
      answers: ['198.51.100.10'],
      altAnswers: ['198.51.100.10'],
      hint: "Run 'dig lab01.cloudsec.training A' in your terminal and check the ANSWER SECTION.",
      priyaReply: "198.51.100.10 is correct! This address comes from RFC 5737 TEST-NET-2, reserved specifically for documentation and training."
    },
    {
      id: 'm1-lab2-flag3',
      flagNumber: 3,
      storyBeat: "An analyst recorded web traffic in training_capture.pcap during an employee login over unencrypted HTTP.",
      objective: "Open training_capture.pcap in Wireshark, filter for the POST login request, and follow the TCP stream.",
      steps: [
        'Open the Wireshark tool on your Kali desktop.',
        'Notice training_capture.pcap is loaded.',
        'Apply the display filter: http.request.method == "POST"',
        'Right-click the matched POST packet → select Follow → TCP Stream.',
        'Inspect the transmitted form data for the submitted password.'
      ],
      check: (simState, labEvents = []) => {
        if (labEvents.includes('wireshark_follow_stream') || labEvents.includes('wireshark_filtered_post')) {
          return { pass: true, failures: [] };
        }
        return {
          pass: false,
          failures: ["Wireshark stream not inspected yet. Open Wireshark, filter for POST, and click 'Follow TCP Stream'."]
        };
      },
      question: 'What plaintext password was submitted in the unencrypted HTTP login request?',
      answers: ['Winter2024!'],
      altAnswers: ['Winter2024!'],
      hint: "In Wireshark, filter 'http.request.method == \"POST\"', then Follow TCP Stream to read 'password=Winter2024!'.",
      priyaReply: "Winter2024! captured! This illustrates why transmitting credentials over unencrypted HTTP is fatal: anyone on the path can read passwords directly from the stream."
    }
  ]
};

export default m1Lab2;
