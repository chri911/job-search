import type { Application } from "../types";

const seed: Application[] = [
  {
    id: "1",
    company: "Nordcloud",
    position: "Frontend Developer",
    location: "Poland",
    workMode: "remote",
    status: "interview",
    appliedAt: "2026-09-08",
    nextStep: "Technical",
  },
  {
    id: "2",
    company: "Allegro",
    position: "React Developer",
    location: "Gdańsk",
    workMode: "hybrid",
    status: "applied",
    appliedAt: "2026-09-06",
  },
  {
    id: "3",
    company: "Docplanner",
    position: "Frontend Engineer",
    location: "EU",
    workMode: "remote",
    status: "offer",
    appliedAt: "2026-08-28",
  },
  {
    id: "4",
    company: "AirHelp",
    position: "UI Developer",
    location: "Gdańsk",
    workMode: "hybrid",
    status: "rejected",
    appliedAt: "2026-08-22",
  },
  {
    id: "5",
    company: "Booksy",
    position: "Frontend Developer",
    location: "Warsaw",
    workMode: "hybrid",
    status: "applied",
    appliedAt: "2026-09-05",
  },
];

export const db = { applications: seed.map((a) => ({ ...a })) };

export function resetDb() {
  db.applications = seed.map((a) => ({ ...a }));
}
