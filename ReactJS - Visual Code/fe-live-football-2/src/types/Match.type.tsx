export type Match = {
  id: number;
  referenceId: number | undefined | null;
  isHot: boolean;
  slug: string;
  title: string;
  shortStatus: string | null;
  status: string | null;
  league: string;
  startTime: string;
  homeClub: {
    name: string;
    logo: string;
  };
  awayClub: {
    name: string;
    logo: string;
  };
  score: {
    home: number;
    away: number;
  } | null;

  commentator: {
    nickname: string;
    avatar: string;
    streamSourceSd: string | null;
    streamSourceHd: string | null;
    streamSourceFhd: string | null;
  };

  isPlaying: boolean;
  elapsed: number | null;
};
