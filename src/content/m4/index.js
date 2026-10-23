/**
 * Module M4 Aggregator
 * Exports M4 topics, briefing, and credentials as one cohesive module object.
 */

import { topic1 } from './topic1';
import { topic2 } from './topic2';
import { topic3 } from './topic3';
import { topic4 } from './topic4';
import { topic5 } from './topic5';
import { topic6 } from './topic6';
import { topic7 } from './topic7';
import { M4_LAB_CREDENTIALS } from '../labCredentials';

export const M4_BRIEFING = {
  title: "Your Mission",
  subtitle: "Cloud Security Training Program — Module M4",
  scenario:
    "You've just joined QuickMart as a Trainee Cloud Engineer. QuickMart delivers groceries in 10 minutes, and the app launches Friday. Your mentor, Priya, needs the platform live as quickly as possible: a web storefront and a database, on our own cloud. Build it the way fast-moving teams do, with sensible defaults. She'll explain security later.",
  context:
    "You're about to do exactly that. In later modules you'll come back to find out what you got wrong.",
  cta: "Launch Lab",
  closingQuote:
    "QuickMart is live, and now the right people have the right access. But look at what we built: SSH open to the world, a weak starter password, a database on default settings, no logging, and roles that were changed overnight without anyone noticing. Good enough for launch week. We'll come back and see what an attacker would do with it."
};

export const M4_TOPICS = [
  topic1,
  topic2,
  topic3,
  topic4,
  topic5,
  topic6,
  topic7
];

export const ALL_M4_SLIDES = M4_TOPICS.flatMap((topic) => topic.slides);

export { M4_LAB_CREDENTIALS };

export default {
  id: "m4",
  title: "Our First Cloud Configuration (QuickMart)",
  briefing: M4_BRIEFING,
  credentials: M4_LAB_CREDENTIALS,
  topics: M4_TOPICS,
  slides: ALL_M4_SLIDES
};
