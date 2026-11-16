import type { ProjectCategoryId } from "@/data/types";

export const categoryClass: Record<ProjectCategoryId, string> = {
  backend: "bg-sky",
  frontend: "bg-pink",
  fullstack: "bg-sage",
  mobile: "bg-lilac",
  cybersecurity: "bg-mint",
  hackathon: "bg-lime",
  unconfirmed: "bg-peach",
};
