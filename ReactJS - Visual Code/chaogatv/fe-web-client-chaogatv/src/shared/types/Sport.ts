import type { Fixture } from "./Fixture";
import type { League } from "./League";

type Sport = {
  id: number;
  priority: number;
  referenceId: string | null;
  slug: string;
  iconUrl?: string;
  backgroundCardUrl?: string;
  backgroundMainUrl?: string;
  posterUrl?: string;
  name: string;
  hasLive: boolean;
  leagues: League[];
  fixtures: Fixture[];
  fixtureCount: number;
};

export type { Sport };
