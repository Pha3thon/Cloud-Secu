/**
 * Module M1 Aggregator: IT, Networking & Security Foundations
 * CDAC Cloud Security Training Platform
 */

import { topic1 } from './topic1';
import { topic2 } from './topic2';
import { topic3 } from './topic3';
import { topic4 } from './topic4';
import { topic5 } from './topic5';
import { topic6 } from './topic6';

export const M1_BRIEFING = {
  title: "Foundations Mission",
  subtitle: "Cloud Security Training Program — Module M1",
  scenario:
    "Welcome to Module 1: IT, Networking & Security Foundations. Before you configure cloud infrastructure or hunt for vulnerabilities in live environments, you must master the fundamental building blocks: Operating System privilege rings, Linux permissions and processes, IPv4 subnetting and CIDR mathematics, transport layer protocols, and the CIA security triad.",
  context:
    "You will practice real Linux command-line skills in a simulated terminal, calculate CIDR address ranges, and analyze security control classifications across 6 interactive topics and 3 hands-on labs.",
  cta: "Start Module 1",
  closingQuote:
    "Great work completing Module 1! With solid OS, networking, and security foundations, you are now prepared to build and inspect cloud platforms."
};

export const M1_TOPICS = [
  topic1,
  topic2,
  topic3,
  topic4,
  topic5,
  topic6
];

export const ALL_M1_SLIDES = M1_TOPICS.flatMap((topic) => topic.slides);

export const M1_MODULE = {
  id: "m1",
  title: "IT, Networking & Security Foundations",
  briefing: M1_BRIEFING,
  topics: M1_TOPICS,
  slides: ALL_M1_SLIDES
};

export default M1_MODULE;
