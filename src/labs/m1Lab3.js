/**
 * M1 Lab 3: CIA/AAA/CVE/CVSS Scenario Lab (60 min)
 * CDAC Cloud Security Training Platform
 * Attached to Topic 6: Security Foundations
 */

export const m1Lab3 = {
  id: 'm1-lab3',
  topicId: 'm1-topic-6',
  topicNumber: 6,
  order: 3,
  title: 'Lab 3: CIA/AAA/CVE/CVSS Scenario Lab',
  priyaIntro: "Welcome to your capstone foundations lab. In this exercise, you classify real operational security incidents against the CIA Triad, query the official NIST National Vulnerability Database for CVSS severity metrics, and distinguish between Vulnerability Assessments and active Penetration Tests.",
  nextTopicId: null,
  nextTopicNumber: null,
  nextTopicTitle: null,
  onComplete: 'complete_module',
  flags: [
    {
      id: 'm1-lab3-flag1',
      flagNumber: 1,
      storyBeat: "Analyze three incident scenario cards and classify which pillar of the CIA Triad was violated in each case.",
      objective: "Classify Scenario Cards A, B, and C as Confidentiality, Integrity, or Availability.",
      steps: [
        'Card A: Farhan, a rogue contractor, modifies a company public price list without anyone noticing, so customers see wrong prices for two days.',
        'Card B: Rohan, a disheartened employee, copies the customer database to a personal USB drive.',
        'Card C: A ransomware attack encrypts a hospital patient record system, and Dr. Asthana cannot access patient files for six hours.',
        'Match each card: A = Integrity (unauthorized modification), B = Confidentiality (unauthorized disclosure), C = Availability (denial of access).'
      ],
      check: (simState, labEvents = []) => {
        return { pass: true, failures: [] };
      },
      question: 'Submit the CIA principles violated in Cards A, B, and C in order (e.g. Integrity, Confidentiality, Availability):',
      answers: [
        'Integrity, Confidentiality, Availability',
        'Integrity,Confidentiality,Availability',
        'A = Integrity, B = Confidentiality, C = Availability',
        'A=Integrity, B=Confidentiality, C=Availability',
        'I, C, A',
        'I,C,A'
      ],
      altAnswers: [
        'Integrity, Confidentiality, Availability',
        'Integrity,Confidentiality,Availability',
        'A = Integrity, B = Confidentiality, C = Availability',
        'I, C, A'
      ],
      hint: "Card A is unauthorized price alteration (Integrity); Card B is data theft (Confidentiality); Card C is system lockout (Availability). Enter: Integrity, Confidentiality, Availability",
      priyaReply: "Perfect classification! A = Integrity (tampering), B = Confidentiality (data breach), C = Availability (service denial)."
    },
    {
      id: 'm1-lab3-flag2',
      flagNumber: 2,
      storyBeat: "Look up the official national vulnerability record for Log4Shell (CVE-2021-44228) on the NIST National Vulnerability Database.",
      objective: "Record the CVSS v3.1 base score and qualitative severity rating for CVE-2021-44228.",
      steps: [
        'Open the NVD Vulnerability Browser in your workstation or visit nvd.nist.gov.',
        'Inspect the official record for CVE-2021-44228 (Apache Log4j2 JNDI Remote Code Execution).',
        'Locate the NVD CVSS v3.1 Base Score and qualitative Severity Rating.'
      ],
      check: (simState, labEvents = []) => {
        return { pass: true, failures: [] };
      },
      question: 'What is the official NVD CVSS v3.1 base score and severity rating for CVE-2021-44228? (format: Score, SEVERITY):',
      answers: [
        '10.0, CRITICAL',
        '10.0,CRITICAL',
        '10.0 CRITICAL',
        '10.0, Critical',
        '10.0',
        'CRITICAL'
      ],
      altAnswers: [
        '10.0, CRITICAL',
        '10.0,CRITICAL',
        '10.0 CRITICAL',
        '10.0, Critical'
      ],
      hint: "CVE-2021-44228 received the maximum possible CVSS base score of 10.0, rated CRITICAL.",
      priyaReply: "10.0, CRITICAL is correct! Log4Shell allowed unauthenticated remote code execution with minimal attack complexity, earning the highest possible severity rating."
    },
    {
      id: 'm1-lab3-flag3',
      flagNumber: 3,
      storyBeat: "Evaluate three security assessment engagements and distinguish Vulnerability Assessments (VA) from Penetration Tests (PT).",
      objective: "Classify Scenario Cards X, Y, and Z as VA or PT.",
      steps: [
        'Card X: Ananya and her audit team ran an automated scanner against 500 servers and produced a report listing all outdated software versions found.',
        'Card Y: Kabir, during an authorized red team engagement, found a login form vulnerable to SQL injection, and successfully used it to extract the admin password hash to prove real impact.',
        'Card Z: Meera ran a cloud posture check and scanned the client cloud storage buckets and flagged three that appeared publicly accessible, without accessing their contents.',
        'Classify each card: Card X identifies flaws without exploitation (VA); Card Y actively exploits the flaw to prove impact (PT); Card Z audits posture without touching data (VA).'
      ],
      check: (simState, labEvents = []) => {
        return { pass: true, failures: [] };
      },
      question: 'Submit which cards describe a Vulnerability Assessment vs. Penetration Test in order (e.g. VA, PT, VA):',
      answers: [
        'VA, PT, VA',
        'VA,PT,VA',
        'X = VA, Y = PT, Z = VA',
        'X=VA, Y=PT, Z=VA',
        'VA, Penetration Test, VA',
        'Vulnerability Assessment, Penetration Test, Vulnerability Assessment'
      ],
      altAnswers: [
        'VA, PT, VA',
        'VA,PT,VA',
        'X = VA, Y = PT, Z = VA',
        'Vulnerability Assessment, Penetration Test, Vulnerability Assessment'
      ],
      hint: "Card X lists findings (VA); Card Y proves impact by exploiting (PT); Card Z checks posture without exploiting (VA). Enter: VA, PT, VA",
      priyaReply: "Brilliant! You've successfully distinguished between automated inventory scanning (VA) and active exploitation to prove business risk (PT). Module 1 Foundations are complete!"
    }
  ]
};

export default m1Lab3;
