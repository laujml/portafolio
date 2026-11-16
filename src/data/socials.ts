export type SocialId = "linkedin" | "github" | "x";

export type SocialLink = {
  id: SocialId;
  label: string;
  href: string;
};

export const socials: SocialLink[] = [
  { id: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/laujml" },
  { id: "github", label: "GitHub", href: "https://github.com/laujml" },
  { id: "x", label: "X", href: "https://x.com/laujml" },
];
