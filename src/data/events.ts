import type { Localized } from "./types";

export type EventFormat = "virtual" | "inPerson";

export type PortfolioEvent = {
  slug: string;
  name: string;
  format: EventFormat;
  place?: string;
  date: Localized;
  organizer?: string;
  note?: Localized;
  image: string;
  alt: Localized;
  thread?: string;
};

export type Course = {
  slug: string;
  name: Localized;
  date: Localized;
};

const same = (name: string) => ({ en: name, es: name });

export const events: PortfolioEvent[] = [
  {
    slug: "openai-devday",
    name: "OpenAI DevDay Exchange",
    format: "inPerson",
    place: "BINAES, San Salvador",
    date: { en: "24 Oct 2026", es: "24 oct 2026" },
    image: "/events/openai-devday.png",
    // TODO: event photo.
    alt: same("Photo from OpenAI DevDay Exchange"),
    thread: "https://x.com/laujml/status/2114414727820374388",
  },
  {
    slug: "grok-bot-meetup",
    name: "Grok Bot Meetup",
    format: "inPerson",
    // TODO: venue.
    date: { en: "Sep 2026", es: "sep 2026" },
    organizer: "Ai Labs",
    image: "/events/grok-bot-meetup.png",
    // TODO: event photo.
    alt: same("Photo from Grok Bot Meetup"),
    // TODO: thread URL.
  },
  {
    slug: "codex-community-build",
    name: "Codex Community Build Meetup: San Salvador",
    format: "inPerson",
    place: "Presidente Plaza, San Salvador",
    date: { en: "28 May 2026", es: "28 may 2026" },
    organizer: "Walter Morales, Daniela Huezo y Ai Labs",
    image: "/events/codex-community-build.png",
    // TODO: event photo.
    alt: same("Photo from Codex Community Build Meetup"),
  },
  {
    slug: "womenciso-ciberdefensa",
    name: "WomenCISO y MenCISO Sesión: Ciberdefensa VS Cucarachos",
    format: "virtual",
    place: "Google Meet",
    date: { en: "25 May 2026", es: "25 may 2026" },
    organizer: "Casita Magica y Toño",
    note: {
      en: "With professor Adolfo Grego.",
      es: "Con el profesor Adolfo Grego.",
    },
    image: "/events/womenciso-ciberdefensa.png",
    // TODO: event photo.
    alt: same("Photo from WomenCISO y MenCISO"),
  },
  {
    slug: "becas-ai",
    name: "10,000 Becas AI por el trabajo de tus sueños",
    format: "virtual",
    place: "YouTube",
    date: { en: "8 May 2026", es: "8 may 2026" },
    organizer: "Casita Magica y Josefina",
    image: "/events/becas-ai.png",
    // TODO: event photo.
    alt: same("Photo from 10,000 Becas AI"),
  },
  {
    slug: "women-techmakers",
    name: "Women Techmakers x SheBuilds on Lovable for International Women's Day",
    format: "inPerson",
    place: "Hyatt Centric San Salvador",
    date: { en: "8 Mar 2026", es: "8 mar 2026" },
    organizer: "Carol Monroe",
    image: "/events/women-techmakers.png",
    // TODO: event photo.
    alt: same("Photo from Women Techmakers x SheBuilds on Lovable"),
  },
];

export const courses: Course[] = [
  {
    slug: "rush-academy",
    name: { en: "Rush Academy", es: "Rush Academy" },
    date: { en: "August 2026", es: "agosto 2026" },
  },
  {
    slug: "web3-rush",
    name: {
      en: "Introducción a Web3 de Rush Academy",
      es: "Introducción a Web3 de Rush Academy",
    },
    date: { en: "July 2026", es: "julio 2026" },
  },
  {
    slug: "arquitectura-platzi",
    name: {
      en: "Fundamentos de Arquitectura de Software de Platzi",
      es: "Fundamentos de Arquitectura de Software de Platzi",
    },
    date: { en: "April 2026", es: "abril 2026" },
  },
  {
    slug: "project-management-platzi",
    name: {
      en: "Fundamentos de Project Management de Platzi",
      es: "Fundamentos de Project Management de Platzi",
    },
    date: { en: "April 2026", es: "abril 2026" },
  },
  {
    slug: "nextjs-vercel",
    name: {
      en: "Next.js App Router Fundamentals de Vercel",
      es: "Next.js App Router Fundamentals de Vercel",
    },
    date: { en: "April 2026", es: "abril 2026" },
  },
];
