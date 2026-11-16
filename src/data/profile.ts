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
    en: "Illustration of Lau winking and making a peace sign",
    es: "Ilustración de Lau guiñando un ojo y haciendo la señal de paz",
  } satisfies Localized,
};
