/**
 * M1 Topic 6: Security Foundations (CIA/AAA/ZT/CVE/CVSS) (35 min)
 * CDAC Cloud Security Training Platform
 * Includes Lab 3: CIA/AAA/CVE/CVSS Scenario Lab (60 min)
 */

import { m1Lab3 } from '@/labs/m1Lab3';

export const topic6 = {
  id: "m1-topic-6",
  topicNumber: 6,
  title: "Security Foundations (CIA, AAA, Zero Trust & Vulnerabilities)",
  service: "Security Foundations",
  hasBriefing: false,
  lab: m1Lab3,
  slides: [
    {
      id: "6.1",
      code: "6.1",
      format: "eli5",
      tag: "In Simple Words",
      title: "What is Information Security, and Which Model Defines its Goals?",
      body: "Imagine keeping your piggy bank safe: only you can look inside to see your coins, nobody can sneak fake coins in, and the piggy bank is right on your desk whenever you need your lunch money. Those are the three big rules of computer security: keep it secret, keep it real, and keep it ready.",
      sceneKey: "scene_m1_6_1"
    },
    {
      id: "6.1-std",
      code: "6.1-std",
      format: "official-definition",
      tag: "Official Definition",
      title: "Official Definition: CIA Security Objectives (FIPS 199)",
      standardName: "NIST FIPS PUB 199",
      standardFullTitle: "Standards for Security Categorization of Federal Information and Information Systems",
      definitionText: "Federal Information Processing Standards (FIPS) 199 defines the three foundational information security objectives for information systems: Confidentiality: Preserving authorized restrictions on information access and disclosure, including means for protecting personal privacy and proprietary information. Integrity: Guarding against improper information modification or destruction, including ensuring information non-repudiation and authenticity. Availability: Ensuring timely and reliable access to and use of information.",
      sourceUrl: "https://csrc.nist.gov/pubs/fips/199/final",
      bridgeLine: "NIST FIPS 199 formalizes this 'secret, real, and ready' rule into Confidentiality, Integrity, and Availability for all computer systems.",
      sceneId: null
    },
    {
      id: "6.2",
      code: "6.2",
      title: "Essential Security Architecture Vocabulary",
      textLines: [
        "Confidentiality: Preventing unauthorized access or disclosure of sensitive information.",
        "Integrity: Safeguarding against unauthorized tampering, modification, or destruction of data.",
        "Availability: Ensuring authorized users have reliable and timely access to systems and services.",
        "Authentication: The process of verifying that an entity is who they claim to be.",
        "Authorization: Determining what actions an authenticated user is permitted to execute.",
        "Accounting: Maintaining immutable audit trails of who accessed what and when.",
        "Zero Trust: A security model that eliminates implicit trust and continuously validates all transactions.",
        "Vulnerability & Exploit: A vulnerability is a system weakness; an exploit is code that weaponizes that weakness.",
        "CVE & CVSS: CVE provides unique global tracking IDs for vulnerabilities; CVSS provides standard 0–10 severity scores."
      ],
      sceneKey: "scene_m1_6_2"
    },
    {
      id: "6.3",
      code: "6.3",
      title: "The CIA Triad in Practice",
      textLines: [
        "Confidentiality is violated when an unauthorized user reads private data (e.g. an attacker extracts unencrypted database credentials or customer records).",
        "Integrity is violated when data is altered or destroyed without authorization (e.g. modifying prices in an e-commerce catalog or injecting backdoor code).",
        "Availability is violated when legitimate users cannot access system services (e.g. a ransomware attack encrypts disks or a DDoS attack floods server bandwidth)."
      ],
      sceneKey: "scene_m1_6_1"
    },
    {
      id: "6.4",
      code: "6.4",
      format: "eli5",
      tag: "In Simple Words",
      title: "The AAA Access Framework",
      body: "When you go to a fun amusement park, the guard checks your face on your school pass, checks which rollercoasters your wristband is allowed on, and writes your name in the visitor book. That is the AAA rule: check who you are, check what rides you get, and write down what you did.",
      recapChip: "Previews Module 3 & 7",
      sceneKey: "scene_m1_6_4"
    },
    {
      id: "6.4-std",
      code: "6.4-std",
      format: "official-definition",
      tag: "Official Definition",
      title: "Official Definition: AAA Authorization Framework",
      standardName: "IETF RFC 2904",
      standardFullTitle: "AAA Authorization Framework",
      definitionText: "The AAA architectural framework establishes the formal standard for distributed resource access control: Authentication: The process of verifying the identity of a subject (user, process, or device) claiming a credentials set. Authorization: The determination whether an authenticated subject is permitted to perform a requested action or access a protected resource. Accounting: The collection of resource consumption metrics (session start/end, bytes transferred, actions executed) for auditing, analysis, and cost allocation.",
      sourceUrl: "https://datatracker.ietf.org/doc/html/rfc2904",
      bridgeLine: "RFC 2904 formalizes this 'pass, wristband, and visitor book' check into Authentication, Authorization, and Accounting.",
      sceneId: null
    },
    {
      id: "6.5",
      code: "6.5",
      format: "eli5",
      tag: "In Simple Words",
      title: "Zero Trust Architecture (ZTA)",
      body: "Old castles had one big wooden bridge and trusted anyone once they got inside the gate. Zero Trust is like having a polite guard at every single bedroom door inside the house who asks to see your pass every time, even if you are already in the living room.",
      recapChip: "Reappears in Module 9, 10 & 11",
      sceneKey: "scene_m1_6_3"
    },
    {
      id: "6.5-std",
      code: "6.5-std",
      format: "official-definition",
      tag: "Official Definition",
      title: "Official Definition: Zero Trust Architecture",
      standardName: "NIST SP 800-207",
      standardFullTitle: "Zero Trust Architecture",
      definitionText: "Zero Trust (ZT) is a cybersecurity paradigm focused on resource protection and the premise that trust is never granted implicitly but must be continually evaluated. Zero Trust Architecture (ZTA) treats all network traffic, internal and external, as untrusted. Access decisions enforce three core tenets: (1) Continuous verification of identity and device posture for every transaction, (2) Strict enforcement of least-privilege per-session access, and (3) Designing architectures that assume compromise and actively minimize the blast radius of any security breach.",
      sourceUrl: "https://csrc.nist.gov/pubs/sp/800/207/final",
      bridgeLine: "NIST SP 800-207 formalizes this 'guard at every door' idea into explicit verification, least privilege, and assuming breach.",
      sceneId: null
    },
    {
      id: "6.6",
      code: "6.6",
      format: "eli5",
      tag: "In Simple Words",
      title: "Vulnerability Identification & Scoring: CVE & CVSS",
      body: "If toys in a toy store have a loose wheel that could fall off, the factory gives that flaw a special tag number so every parent knows about it, and a danger score from 0 to 10 so you know if it is just a tiny squeak or a big broken wheel. CVE is that tag number, and CVSS is that danger score.",
      sceneKey: "scene_m1_6_2"
    },
    {
      id: "6.6a-std",
      code: "6.6a-std",
      format: "official-definition",
      tag: "Official Definition",
      title: "Official Definition: Common Vulnerabilities and Exposures (CVE)",
      standardName: "MITRE CVE Program",
      standardFullTitle: "CVE Program Specification",
      definitionText: "The CVE Program's mission is to identify, define, and catalog publicly disclosed cybersecurity vulnerabilities. Each CVE Record contains a unique alphanumeric identifier (formatted as CVE-YYYY-NNNNN), a concise technical description of the vulnerability in a specific software product or component, and standardized references to advisories and public disclosures, enabling disparate security tools and organizations to synchronize vulnerability data globally.",
      sourceUrl: "https://cve.mitre.org/about/index.html",
      bridgeLine: "MITRE formalizes this 'flaw tag number' into unique CVE IDs, cataloging software weaknesses across the globe.",
      sceneId: null
    },
    {
      id: "6.6b-std",
      code: "6.6b-std",
      format: "official-definition",
      tag: "Official Definition",
      title: "Official Definition: Common Vulnerability Scoring System (CVSS v3.1)",
      standardName: "FIRST.org CVSS v3.1",
      standardFullTitle: "Common Vulnerability Scoring System v3.1: Specification Document",
      definitionText: "The Common Vulnerability Scoring System (CVSS) is an open industry standard for assessing the severity of computer system security vulnerabilities. The CVSS Base Score (ranging from 0.0 to 10.0) captures intrinsic qualities that are constant over time and user environments, evaluating Exploitability metrics (Attack Vector, Attack Complexity, Privileges Required, User Interaction) and Impact metrics (Confidentiality, Integrity, Availability impact). Scores map to standardized qualitative severity ratings: None (0.0), Low (0.1–3.9), Medium (4.0–6.9), High (7.0–8.9), and Critical (9.0–10.0).",
      sourceUrl: "https://www.first.org/cvss/v3.1/specification-document",
      bridgeLine: "FIRST.org formalizes this 'danger score' into CVSS v3.1, rating flaws from 0.0 to 10.0 so security teams know what to fix first.",
      sceneId: null
    },
    {
      id: "6.7",
      code: "6.7",
      format: "eli5",
      tag: "In Simple Words",
      title: "Vulnerability Assessment vs. Penetration Testing",
      body: "A safety helper who walks around the house with a clipboard writing down 'the front door looks unlocked' is doing an assessment. A safety helper who actually turns the knob, opens the door, and takes a picture inside to prove the door really opened is doing a penetration test.",
      recapChip: "Previews Module 6 Rules of Engagement",
      sceneKey: "scene_m1_6_5"
    },
    {
      id: "6.7-std",
      code: "6.7-std",
      format: "official-definition",
      tag: "Official Definition",
      title: "Official Definition: Security Assessment vs. Penetration Testing",
      standardName: "NIST SP 800-115",
      standardFullTitle: "Technical Guide to Information Security Testing and Assessment",
      definitionText: "NIST SP 800-115 distinguishes between systematic examination techniques: Vulnerability Assessment: An evaluation process that identifies, quantifies, and prioritizes vulnerabilities in an information system using automated scanners and configuration audits, producing a prioritized inventory of weaknesses without active exploitation. Penetration Testing: A specialized, authorized security assessment methodology wherein assessors simulate the tactics, techniques, and procedures (TTPs) of real-world adversaries to actively exploit identified vulnerabilities and prove concrete operational impact against target systems.",
      sourceUrl: "https://csrc.nist.gov/pubs/sp/800/115/final",
      bridgeLine: "NIST SP 800-115 formalizes this distinction: a vulnerability assessment catalogs flaws, while a penetration test actively exploits them to prove real impact.",
      sceneId: null
    },
    {
      id: "6.q",
      code: "6.q",
      title: "Topic 6 Check: Security Foundations",
      textLines: [
        "Confirm your mastery of the CIA triad, CVSS scoring, and assessment methodologies before entering Lab 3."
      ],
      quiz: {
        question: "A company's web storefront goes down during a distributed denial-of-service (DDoS) flood. Which CIA triad principle was violated?",
        options: [
          "Availability",
          "Confidentiality",
          "Integrity",
          "Authorization"
        ],
        answer: "Option A",
        explanation: "Availability ensures authorized users have timely and reliable access to system resources. A denial-of-service attack disrupts availability without exposing or modifying underlying data."
      },
      sceneKey: "scene_m1_6_5"
    }
  ]
};

export default topic6;
