import { z } from "zod";
import type { Commentator } from "./Commentator";
import type { League } from "./League";
import type { Sport } from "./Sport";
import type { Team } from "./Team";

const FixtureScoreSchema = z.object({
  home: z.number(),
  away: z.number(),
});

const FixtureStatusSchema = z.object({
  code: z.string(),
  description: z.string(),
});

const PrioritizedCommentatorSchema = z.object({
  index: z.number().optional(),
  commentator: z.custom<Commentator>(),
});

export const FixtureSchema = z.object({
  id: z.number(),
  referenceId: z.string().nullable(),
  slug: z.string(),
  title: z.string(),
  sport: z.custom<Sport>(),
  league: z.custom<League>(),
  homeTeam: z.custom<Team>(),
  awayTeam: z.custom<Team>(),
  startTime: z.string().transform((v) => new Date(v)),
  score: FixtureScoreSchema.nullable(),
  status: FixtureStatusSchema.nullable(),
  fixtureCommentators: z.array(PrioritizedCommentatorSchema),
  chatChannelKeyId: z.string().nullable(),
  isPinned: z.boolean(),
  isHot: z.boolean(),
  isLive: z.boolean(),
});

// type tự sinh ra — không cần khai báo tay
// startTime giờ là Date | null thật sự lúc runtime
export type Fixture = z.infer<typeof FixtureSchema>;
export type FixtureStatus = z.infer<typeof FixtureStatusSchema>;
export type PrioritizedCommentator = z.infer<typeof PrioritizedCommentatorSchema>;
