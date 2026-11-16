import type { Localized } from "./types";

export type WritingThread = {
  slug: string;
  title: Localized;
  description?: Localized;
  href?: string;
};

export const writing: WritingThread[] = [
  {
    slug: "openai-devday",
    title: {
      en: "What I saw at OpenAI DevDay Exchange in San Salvador",
      es: "Lo que vi en el OpenAI DevDay Exchange en San Salvador",
    },
    description: {
      en: "A short account of what I saw at the OpenAI DevDay Exchange in San Salvador.",
      es: "Un recuento breve de lo que vi en el OpenAI DevDay Exchange en San Salvador.",
    },
    href: "https://x.com/laujml/status/2114414727820374388",
  },
  {
    slug: "ai-agent-parts",
    title: {
      en: "What's inside an AI agent: an LLM, tools, a loop and memory",
      es: "Qué tiene por dentro un agente de IA: un LLM, herramientas, un ciclo y memoria",
    },
    description: {
      en: "The pieces of an AI agent, explained simply: an LLM, tools, a loop and memory.",
      es: "Las piezas de un agente de IA, explicadas con calma: un LLM, herramientas, un ciclo y memoria.",
    },
    href: "https://x.com/laujml/status/2113306977191297308",
  },
  {
    slug: "ecos-cerati-archival-audio",
    title: {
      en: "How Ecos puts Cerati on stage with archival audio",
      es: "Cómo Ecos pone a Cerati en escena con audio de archivo",
    },
    description: {
      en: "A technical look at Soda Stereo’s Ecos show: how it combines archival recordings of Cerati with his digital stage presence and live musicians.",
      es: "Una mirada técnica al show Ecos de Soda Stereo: cómo combina grabaciones de archivo de Cerati con su presencia digital en el escenario y músicos en vivo.",
    },
    href: "https://x.com/laujml/status/2119822628097601851",
  },
];
