import type { Commentator } from "./Commentator";
import type { League } from "./League";
import type { Sport } from "./Sport";
import type { Team } from "./Team";

interface FixtureScore {
  home: number;
  away: number;
}

interface FixtureStatus {
  code: string;
  description: string;
}

interface PrioritizedCommentator {
  index?: number;
  commentator: Commentator;
}

type Fixture = {
  id: number;
  referenceId: string | null;
  slug: string;
  title: string;
  sport: Sport;
  league: League;
  homeTeam: Team;
  awayTeam: Team;
  startTime: Date;
  score: FixtureScore | null;
  status: FixtureStatus | null;
  fixtureCommentators: PrioritizedCommentator[];
  chatChannelKeyId: string | null;
  isPinned: boolean;
  isHot: boolean;
  isLive: boolean;
};

export type { PrioritizedCommentator, Fixture, FixtureStatus };
