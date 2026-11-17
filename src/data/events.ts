import type { Localized } from "./types";

export type EventFormat = "virtual" | "inPerson";

export type PortfolioEvent = {
  slug: string;
  title: Localized;
  format: EventFormat;
  date: Localized;
  image: string;
  imagePosition?: string;
  imageFit?: "contain";
  alt: Localized;
  link: string;
};

export type Course = {
  slug: string;
  name: Localized;
  date: Localized;
};

const same = (text: string) => ({ en: text, es: text });

export const events: PortfolioEvent[] = [
  {
    slug: "nasa-space-apps",
    title: same("NASA Space Apps 2026"),
    format: "inPerson",
    date: { en: "Nov 2026", es: "nov 2026" },
    image: "/events/nasa-space-apps.jpg",
    imagePosition: "object-[center_20%]",
    alt: {
      en: "Lau holding the NASA Space Apps San Salvador banner",
      es: "Lau con la bandera de NASA Space Apps San Salvador",
    },
    link: "https://www.linkedin.com/feed/update/urn:li:activity:7528490645762629632/",
  },
  {
    slug: "shebuilds-learning",
    title: same("SheBuilds Learning Edition"),
    format: "virtual",
    date: { en: "Nov 2026", es: "nov 2026" },
    image: "/events/shebuilds-learning.jpg",
    imagePosition: "object-center",
    alt: {
      en: "Lau's SheBuilds Learning Edition acceptance graphic",
      es: "Gráfica de aceptación de Lau en SheBuilds Learning Edition",
    },
    link: "https://www.linkedin.com/feed/update/urn:li:activity:7528474991739183104/",
  },
  {
    slug: "fintech-forum",
    title: same("El Salvador Fintech Forum"),
    format: "inPerson",
    date: { en: "10 Nov 2026", es: "10 nov 2026" },
    image: "/events/fintech-forum.jpg",
    imagePosition: "object-center",
    alt: {
      en: "Lau at El Salvador Fintech Forum",
      es: "Lau en El Salvador Fintech Forum",
    },
    link: "https://www.linkedin.com/feed/update/urn:li:activity:7526657948920741889/",
  },
  {
    slug: "openai-devday",
    title: same("OpenAI DevDay Exchange"),
    format: "inPerson",
    date: { en: "24 Oct 2026", es: "24 oct 2026" },
    image: "/events/openai-devday.jpg",
    imagePosition: "object-[center_30%]",
    alt: {
      en: "Lau on stage at OpenAI DevDay Exchange at BINAES",
      es: "Lau en el escenario del OpenAI DevDay Exchange en BINAES",
    },
    link: "https://www.linkedin.com/feed/update/urn:li:activity:7520279765065330688/",
  },
  {
    slug: "cuenta-regresiva-forense",
    title: {
      en: "Forensic Countdown webinar series",
      es: "Ciclo de webinars Cuenta Regresiva Forense",
    },
    format: "virtual",
    date: { en: "Sep–Oct 2026", es: "sep-oct 2026" },
    image: "/events/cuenta-regresiva-forense.jpg",
    imagePosition: "object-[center_40%]",
    alt: {
      en: "Navy and mint illustration of a magnifying glass over a fingerprint that turns into a circuit",
      es: "Ilustración en azul marino y menta de una lupa sobre una huella que se convierte en circuito",
    },
    link: "https://www.linkedin.com/feed/update/urn:li:activity:7511248416958464001/",
  },
  {
    slug: "grok-bot-meetup",
    title: same("Grok Bot Meetup"),
    format: "inPerson",
    date: { en: "Sep 2026", es: "sep 2026" },
    image: "/events/grok-bot-meetup.jpg",
    imagePosition: "object-[center_30%]",
    alt: {
      en: "Lau with attendees at the Grok Bot Meetup",
      es: "Lau con asistentes del Grok Bot Meetup",
    },
    link: "https://www.linkedin.com/feed/update/urn:li:activity:7507794700897095680/",
  },
  {
    slug: "huella-digital",
    title: {
      en: "Your Digital Footprint: personal branding",
      es: "Tu Huella Digital: marca personal",
    },
    format: "inPerson",
    date: { en: "Aug 2026", es: "ago 2026" },
    image: "/events/huella-digital.jpg",
    imagePosition: "object-[center_60%]",
    alt: {
      en: "Lau at the Your Digital Footprint workshop",
      es: "Lau en el taller Tu Huella Digital",
    },
    link: "https://www.linkedin.com/feed/update/urn:li:activity:7497335024946438145/",
  },
  {
    slug: "eset-ciberseguridad",
    title: {
      en: "Cybersecurity talk with ESET",
      es: "Charla de ciberseguridad con ESET",
    },
    format: "inPerson",
    date: { en: "Aug 2026", es: "ago 2026" },
    image: "/events/eset-ciberseguridad.jpg",
    imagePosition: "object-[15%_center]",
    alt: {
      en: "Lau at the cybersecurity talk with ESET",
      es: "Lau en la charla de ciberseguridad con ESET",
    },
    link: "https://www.linkedin.com/feed/update/urn:li:activity:7496303087259672577/",
  },
  {
    slug: "industria-5",
    title: {
      en: "Industry 5.0 and Digital Fabrication",
      es: "Industria 5.0 y Fabricación Digital",
    },
    format: "inPerson",
    date: { en: "Aug 2026", es: "ago 2026" },
    image: "/events/industria-5.jpg",
    imagePosition: "object-[8%_center]",
    alt: {
      en: "Industry 5.0 and Digital Fabrication talk",
      es: "Ponencia de Industria 5.0 y Fabricación Digital",
    },
    link: "https://www.linkedin.com/feed/update/urn:li:activity:7493686234947497985/",
  },
  {
    slug: "cyber-ai",
    title: {
      en: "Cyber risk in the age of AI",
      es: "Riesgo cibernético en la era de la IA",
    },
    format: "inPerson",
    date: { en: "Jun 2026", es: "jun 2026" },
    image: "/events/cyber-ai.jpg",
    imagePosition: "object-[center_30%]",
    alt: {
      en: "Lau with speaker Isak Asare",
      es: "Lau con el ponente Isak Asare",
    },
    link: "https://www.linkedin.com/feed/update/urn:li:activity:7476341558955565056/",
  },
  {
    slug: "womenciso",
    title: {
      en: "WomenCISO: AI and security",
      es: "WomenCISO: IA y seguridad",
    },
    format: "virtual",
    date: { en: "May 2026", es: "may 2026" },
    image: "/events/womenciso-logo.jpg",
    imageFit: "contain",
    alt: {
      en: "WomenCISO logo",
      es: "Logo de WomenCISO",
    },
    link: "https://www.linkedin.com/feed/update/urn:li:activity:7464881644940939264/",
  },
  {
    slug: "rush-to-adopt",
    title: same("Rush to Adopt 2026"),
    format: "inPerson",
    date: { en: "Apr 2026", es: "abr 2026" },
    image: "/events/rush-to-adopt.jpg",
    imagePosition: "object-[center_60%]",
    alt: {
      en: "Lau at Rush to Adopt 2026",
      es: "Lau en Rush to Adopt 2026",
    },
    link: "https://www.linkedin.com/feed/update/urn:li:activity:7453141759221649409/",
  },
  {
    slug: "shebuilds-brunch",
    title: same("SheBuilds Brunch by Lovable"),
    format: "inPerson",
    date: { en: "8 Mar 2026", es: "8 mar 2026" },
    image: "/events/shebuilds-brunch.jpg",
    imagePosition: "object-[70%_center]",
    alt: {
      en: "Lau presenting her project at the SheBuilds Brunch",
      es: "Lau presentando su proyecto en el SheBuilds Brunch",
    },
    link: "https://www.linkedin.com/feed/update/urn:li:activity:7436768384278683648/",
  },
];

export const courses: Course[] = [
  {
    slug: "nasa-space-apps-2026",
    name: same("Galactic Problem Solver, NASA Space Apps Challenge 2026"),
    date: { en: "November 2026", es: "noviembre 2026" },
  },
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
