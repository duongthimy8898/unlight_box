import { z } from "zod";

const ClubSchema = z.object({
  name: z.string(),
  logoUrl: z.string(),
});

const MatchCommentatorSchema = z.object({
  id: z.number(),
  nickname: z.string(),
  avatarUrl: z.string().nullable().optional(),
  streamSourceSd: z.string().nullable().optional(),
  streamSourceHd: z.string().nullable().optional(),
  streamSourceFhd: z.string().nullable().optional(),
});

export const FixtureSchema = z.object({
  id: z.number(),
  referenceId: z.string().nullable(),
  slug: z.string(),
  title: z.string(),
  tournamentName: z.string(),
  homeClub: ClubSchema,
  awayClub: ClubSchema,
  startTime: z.string().transform((v) => new Date(v)),
  commentator: MatchCommentatorSchema.nullable().optional(),
  isPinned: z.boolean(),
  isHot: z.boolean(),
  isLive: z.boolean(),
});

export type Fixture = z.infer<typeof FixtureSchema>;
export type MatchCommentator = z.infer<typeof MatchCommentatorSchema>;
