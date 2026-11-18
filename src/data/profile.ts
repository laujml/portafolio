import type { Localized } from "./types";

export const profile = {
  name: "Lau",
  fullName: "Laura Angel",
  email: "laura.an.la03@gmail.com",
  greeting: {
    en: "Hi, I'm Lau",
    es: "Hola, soy Lau",
  } satisfies Localized,
  role: {
    en: "Full-stack developer and software engineering student from El Salvador.",
    es: "Desarrolladora full-stack y estudiante de ingeniería de software en El Salvador.",
  } satisfies Localized,
  portraitAlt: {
    en: "Photo of Lau smiling, wearing glasses and a navy blazer",
    es: "Foto de Lau sonriendo, con lentes y blazer azul marino",
  } satisfies Localized,
};
