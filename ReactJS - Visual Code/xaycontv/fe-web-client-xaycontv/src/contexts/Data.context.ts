import { createContext } from "react";
import type { UseQueryResult } from "@tanstack/react-query";
import type { Sport } from "../types/Sport";
import type { Fixture } from "../types/Fixture";
import type { AdBanner, AdButton } from "../types/Ad";
import type { League } from "../types/League";
import type { Replay } from "../types/Replay";
import type { FixtureStats } from "../types/FixtureStats";

export interface DataContextType {
  sports: UseQueryResult<Sport[], Error>;
  leagues: UseQueryResult<League[], Error>;
  unfinishedFixtures: UseQueryResult<Fixture[], Error>;
  finishedFixtures: UseQueryResult<Fixture[], Error>;
  fixtures: Fixture[];
  featuredFixtures: Fixture[];
  replays: UseQueryResult<Replay[], Error>;
  adBanners: UseQueryResult<AdBanner[], Error>;
  adButtons: UseQueryResult<AdButton[], Error>;
  fixturesStats: UseQueryResult<FixtureStats[], Error>;
}

// Context
export const DataContext = createContext<DataContextType | undefined>(undefined);
