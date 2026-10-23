/**
 * Module 0 Topic 1: Course Orientation: What to Expect
 * CDAC Cloud Security Training Platform
 */

export const topic1 = {
  id: "topic-0-1",
  topicNumber: 0,
  title: "Course Orientation: What to Expect",
  service: "Orientation",
  hasBriefing: false,
  slides: [
    {
      id: "0.1",
      code: "0.1",
      title: "What is this course actually about?",
      textLines: [
        "You will spend the first several hours on networking, Linux, and security fundamentals before opening a single cloud tool.",
        "That is intentional: cloud providers do not invent new computer science, they automate existing infrastructure with APIs.",
        "If you do not understand IP addresses, ports, and Linux file permissions, cloud dashboards are just confusing lists of buttons.",
        "Master the foundations first, and every cloud console will make immediate sense."
      ],
      realLifeExample: {
        title: "Flight Simulator Before the Jet",
        analogy: "Learning aerodynamics and cockpit instrumentation on the ground before taking the controls of a commercial airliner."
      },
      sceneId: "scene_0_1",
      sceneKey: "scene_0_1"
    },
    {
      id: "0.2",
      code: "0.2",
      title: "Cloud computing, in one breath",
      textLines: [
        "Cloud computing means renting compute, storage, and networking over the internet instead of buying physical servers, paying only for what you consume.",
        "Instead of ordering hardware and waiting weeks for delivery, an API call spins up a virtual machine in seconds.",
        "M2 covers this architecture thoroughly with full service models; for now, hold onto that one core sentence.",
        "The underlying hardware still exists in physical datacenters—you just access it programmatically."
      ],
      realLifeExample: {
        title: "Generator vs Municipal Power Grid",
        analogy: "Buying, fuelling, and maintaining your own noisy diesel generator versus simply plugging into the city electrical grid and paying for the kilowatt-hours you draw."
      },
      sceneId: "scene_0_2",
      sceneKey: "scene_0_2"
    },
    {
      id: "0.3",
      code: "0.3",
      title: "Why 'cloud security' and not just 'cloud'?",
      textLines: [
        "The same core IT concepts—networks, identity, and storage—still govern the cloud, just relabelled and reshaped.",
        "Consider this pair: 'Is my hardware firewall configured correctly?' versus 'Is my cloud Security Group configured correctly?'",
        "It is the exact same underlying packet-filtering logic with a different user interface and API name.",
        "This is why the course begins with non-cloud security principles rather than vendor marketing terms."
      ],
      realLifeExample: {
        title: "Physical Door Key vs Digital Badge",
        analogy: "A brass key turning a deadbolt versus an RFID card tapping a sensor: the locking mechanism looks different, but access control logic remains identical."
      },
      sceneId: "scene_0_3",
      sceneKey: "scene_0_3"
    },
    {
      id: "0.4",
      code: "0.4",
      title: "The course roadmap",
      textLines: [
        "Phase 1 · Fundamentals (M1–M3): understand core networking, Linux, architecture, and IAM before touching infrastructure.",
        "Phase 2 · Build (M4–M5): deploy your own private cloud environment, networks, instances, and microservices.",
        "Phase 3 · Attack (M6–M9): conduct authorized penetration tests against your cloud to discover real-world vulnerabilities.",
        "Phase 4 · Rebuild & Harden (M10–M12): re-architect and secure your cloud using CIS benchmarks and Zero Trust principles.",
        "Phase 5 · Report & Compliance (M13): produce industry-standard penetration test reports and satisfy GRC standards."
      ],
      realLifeExample: {
        title: "Arithmetic Before Physics",
        analogy: "You must master arithmetic and algebra before calculating orbital mechanics and structural engineering loads."
      },
      sceneId: "scene_0_4",
      sceneKey: "scene_0_4"
    },
    {
      id: "0.5",
      code: "0.5",
      title: "Why these specific non-cloud topics matter later",
      textLines: [
        "Networking & Subnets (M1) directly power VPCs, CIDR blocks, and routing tables in M4 and M10.",
        "Linux CLI navigation (M1) is required inside every simulated Kali terminal and production workload.",
        "DNS, HTTP, and TLS fundamentals (M1) form the bedrock for reconnaissance and OWASP Top 10 web exploits in M6–M8.",
        "CIA Triad and Zero Trust principles (M1) govern cloud IAM policies, encryption keys, and executive audit reports."
      ],
      realLifeExample: {
        title: "Foundation of a Skyscraper",
        analogy: "The concrete pilings deep underground are completely invisible from the street, but they are what stops a 50-storey tower from collapsing in a storm."
      },
      sceneId: "scene_0_5",
      sceneKey: "scene_0_5"
    },
    {
      id: "0.6",
      code: "0.6",
      title: "Quick check-in (ungraded reflection)",
      textLines: [
        "Before diving into Phase 1, take thirty seconds to articulate your own mental anchor for this training.",
        "Type your thoughts into the box below. This reflection is never graded, never scored, and never gates your progress.",
        "Review the model answer to confirm how practitioners view the link between IT basics and cloud security.",
        "When ready, click 'Continue to Curriculum' to enter the learning path."
      ],
      realLifeExample: {
        title: "Pre-Flight Checklist",
        analogy: "A pilot pausing to confirm instruments and route alignment before taxiing to the runway."
      },
      reflectionPrompt: "In your own words: why does this course start with networking and Linux fundamentals rather than jumping straight into cloud provider web consoles?",
      sampleAnswer: "Cloud computing is simply rented hardware abstracted by software. Cloud constructs like VPCs, Security Groups, and virtual machines are software-defined subnets, stateful firewalls, and Linux VMs. Without understanding fundamental IP routing, ports, and Linux access permissions, cloud configuration is just guessing at web buttons with no mental model for where security vulnerabilities originate.",
      isOrientation: true,
      sceneId: "scene_0_6",
      sceneKey: "scene_0_6"
    }
  ],
  lab: null
};

export default topic1;
