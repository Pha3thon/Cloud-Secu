/**
 * M1 Topic 2: Linux CLI Fundamentals (25 min)
 * CDAC Cloud Security Training Platform
 * Includes Lab 1: Linux CLI Essentials (45 min)
 */

import { m1Lab1 } from '@/labs/m1Lab1';

export const topic2 = {
  id: "m1-topic-2",
  topicNumber: 2,
  title: "Linux CLI Fundamentals",
  service: "Core Linux",
  hasBriefing: false,
  lab: m1Lab1,
  slides: [
    {
      id: "2.1",
      code: "2.1",
      title: "Why a Terminal, and What is a Shell?",
      textLines: [
        "Nearly every hands-on lab for the rest of this course — OpenStack, cloud CLIs, container security tools — happens through a command-line interface, not a graphical mouse interface.",
        "A shell (commonly bash in Linux) is the program that reads what you type, executes it against the OS kernel, and displays the result.",
        "Operating without a GUI enables rapid remote administration, headless cloud server management, and automated security scripting."
      ],
      realLifeExample: {
        title: "Instructions to an Assistant",
        analogy: "A shell is like giving clear, spoken instructions to an assistant instead of walking over and pointing at items on a desk."
      },
      sceneKey: "scene_m1_2_1"
    },
    {
      id: "2.2",
      code: "2.2",
      format: "eli5",
      tag: "In Simple Words",
      title: "How Linux Locks Files: Owner, Group, and Others",
      body: "Think of a secret diary in your bedroom: only you have the key to write in it, your family has a key to only read it, and strangers have no key at all. That is how Linux permissions work — three locks that decide who can look, who can write, and who can run any file.",
      sceneKey: "scene_m1_2_2"
    },
    {
      id: "2.2-std",
      code: "2.2-std",
      format: "official-definition",
      tag: "Official Definition",
      title: "Official Definition: POSIX File Permission Model",
      standardName: "IEEE Std 1003.1 (POSIX)",
      standardFullTitle: "Standard for Information Technology — Portable Operating System Interface",
      definitionText: "File permission bits are nine bits divided into three groups of three bits each: file owner permissions (read, write, execute), file group permissions, and other permissions. In numeric (octal) representation, each group is represented by the sum of its values: Read = 4, Write = 2, and Execute = 1.",
      sourceUrl: "https://pubs.opengroup.org/onlinepubs/9699919799/basedefs/V1_chap04.html#tag_04_04",
      bridgeLine: "IEEE POSIX formalizes this 'three key' rule as numeric bits where 640 gives the owner read/write (4+2=6), the group read-only (4), and locks strangers out completely (0).",
      sceneId: null
    },
    {
      id: "2.3",
      code: "2.3",
      title: "How Commands Fit Together in Security Workflows",
      textLines: [
        "A typical security investigation follows a structured sequence: Navigate → Inspect → Search → Check Processes → Remediate.",
        "Navigate: Use pwd, cd, and ls to move through system paths.",
        "Inspect: Use cat and ls -la to audit file headers, configuration settings, and permissions.",
        "Search: Use grep to search through thousands of log lines for authentication anomalies and planted flags.",
        "Audit Processes: Run ps aux | grep to unmask rogue daemons and hidden background processes.",
        "Remediate: Apply chmod to eliminate dangerous permissions (like 777 world-writable files)."
      ],
      realLifeExample: {
        title: "The Detective Walkthrough",
        analogy: "A detective walking through a building (cd/ls), reading documents (cat), searching for a specific word across every page (grep), and checking who is currently inside (ps aux)."
      },
      sceneKey: "scene_m1_2_3"
    },
    {
      id: "2.4",
      code: "2.4",
      title: "Core Linux Command Reference",
      textLines: [
        "pwd: Print working directory (e.g. pwd → /home/trainee).",
        "ls -la: List all files including hidden dotfiles with permissions, size, and date.",
        "cd <dir>: Change active directory (e.g. cd /var/log/app).",
        "cat <file>: Print entire file contents to stdout (e.g. cat .access_notes).",
        "chmod <mode> <file>: Update permission bits (e.g. chmod 640 shared_report.txt).",
        "grep <pattern> <file>: Search lines matching pattern (e.g. grep 'FLAG' access.log).",
        "ps aux: List all running system processes with PID, user, and command lines."
      ],
      sceneKey: "scene_m1_2_4"
    },
    {
      id: "2.q",
      code: "2.q",
      title: "Topic 2 Check: Linux CLI Fundamentals",
      textLines: [
        "Verify your command-line readiness before stepping into Lab 1.",
        "Review hidden file visibility and numeric octal permission rules."
      ],
      quiz: {
        question: "What access rights does numeric permission mode '640' grant to a file?",
        options: [
          "Owner: Read+Write (6), Group: Read only (4), Others: No access (0)",
          "Owner: Read only (4), Group: Write only (2), Others: Execute only (1)",
          "Owner: Full access (7), Group: Read+Write (6), Others: Read only (4)",
          "Anyone on the system can read and write to the file"
        ],
        answer: "Option A",
        explanation: "In octal mode notation, 6 = 4+2 (read and write for file owner), 4 = 4 (read only for group members), and 0 = no access for anyone else."
      },
      sceneKey: "scene_m1_2_5"
    }
  ]
};

export default topic2;
