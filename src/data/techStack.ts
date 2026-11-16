import type { Localized } from "./types";

export type TechGroup = {
  id: string;
  title: Localized;
  items: string[];
};

export const techStack: TechGroup[] = [
  {
    id: "frontend",
    title: { en: "Frontend", es: "Frontend" },
    items: [
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
    ],
  },
  {
    id: "backend",
    title: { en: "Backend", es: "Backend" },
    items: ["Python", "Java", "PHP", "Laravel", "Dart", "Node.js"],
  },
  {
    id: "mobile",
    title: { en: "Mobile", es: "Mobile" },
    items: ["Flutter", "Firebase", "Cloudinary", "ML Kit"],
  },
  {
    id: "cloud",
    title: { en: "Cloud and IaC", es: "Nube e IaC" },
    items: ["AWS", "Terraform", "GitHub Actions"],
  },
  {
    id: "security",
    title: { en: "Security", es: "Seguridad" },
    items: ["Kali Linux", "Nmap", "Metasploit"],
  },
  {
    id: "data",
    title: { en: "Data", es: "Datos" },
    items: ["SQL", "Supabase", "Power BI", "VBA"],
  },
  {
    id: "automation",
    title: { en: "Automation", es: "Automatización" },
    items: ["n8n", "Git", "ClickUp", "Airtable"],
  },
];
