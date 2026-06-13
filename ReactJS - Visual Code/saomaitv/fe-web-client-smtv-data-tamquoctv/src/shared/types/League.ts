import type { Fixture } from "./Fixture";
import type { Sport } from "./Sport";

type League = {
  id: number;
  referenceId: string | null;
  slug: string;
  sport: Sport;
  name: string;
  shortName?: string;
  logoUrl?: string;
  fixtures: Fixture[];
};

export type { League };
