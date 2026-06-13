export interface Sport {
  id: number;
  referenceId?: string | null;
  slug: string;
  priority: number;
  name: string;
  iconUrl?: string | null;
  backgroundCardUrl?: string | null;
  backgroundMainUrl?: string | null;
  posterUrl?: string | null;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string

  // Relations
  leagues: League[];
  teams: Team[];
  fixtures: Fixture[];
}

export interface League {
  id: number;
  referenceId?: string | null;
  slug: string;
  shortName?: string | null;
  name: string;
  logoUrl?: string | null;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string

  // Relations
  sport: Sport;
  fixtures: Fixture[];
}

export interface Team {
  id: number;
  referenceId?: string | null;
  slug: string;
  name: string;
  logoUrl?: string | null;
  sport: Sport;
  createdAt: string;
  updatedAt: string;
}

export interface FixtureStatus {
  id: number;
  code?: string | null; // Mã trạng thái (có thể null)
  description: string; // Mô tả trạng thái
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string

  fixtures: Fixture[]; // Các trận thuộc trạng thái này
}

export interface FixtureScore {
  id: number;
  home: number; // số bàn của đội home
  away: number; // số bàn của đội away
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string

  fixture: Fixture; // quan hệ 1-1
}

export type InternalUserRole = "administrator" | "scheduler" | "commentator";

export type InternalUserStatus = "active" | "suspended" | "banned" | "deactivated";

export interface InternalUser {
  id: number;
  username: string;
  email?: string | null;
  phoneNumber?: string | null;
  name?: string | null;
  nickname?: string | null;
  bio?: string | null;
  avatarUrl?: string | null;
  coverUrl?: string | null;
  role: InternalUserRole;
  status: InternalUserStatus;
  createdAt: string; // ISO date
  updatedAt: string; // ISO date

  // Relations
  fixtureCommentators: FixtureCommentator[];
  streams: StreamSource[];
}

export interface StreamSource {
  id: number;
  commentator: InternalUser; // Quan hệ ManyToOne
  priority: number;
  name: string;
  sourceUrl: string; // luôn có, không null
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

export interface FixtureCommentator {
  id: number;
  fixture: Fixture; // Quan hệ ManyToOne
  commentator: InternalUser; // Quan hệ ManyToOne
  priority: number; // Thứ tự ưu tiên
}

export interface Fixture {
  id: number;
  referenceId?: string | null;
  slug: string;
  title: string;
  startTime: Date; // ISO date string

  sport: Sport;
  league: League;
  homeTeam: Team;
  awayTeam: Team;

  fixtureCommentators: FixtureCommentator[];
  score?: FixtureScore | null;
  status?: FixtureStatus | null;

  isLive: boolean;
  isPinned: boolean;
  isHot: boolean;

  createdAt: string;
  updatedAt: string;
}

export interface Replay {
  id: number;
  slug: string;
  sport: Sport; // populated object từ server
  title: string;
  thumbnailUrl?: string | null;
  videoSourceUrl: string;
  createdAt: string; // API trả ISO string (convert sang Date nếu cần)
  updatedAt: string;
}


export interface ExtFixture {
  fixture: {
    id: number;
    referee: string | null;
    timezone: string;
    date: string; // ISO string
    timestamp: number;

    periods: {
      first: number | null;
      second: number | null;
    };

    venue: {
      id: number | null;
      name: string | null;
      city: string | null;
    };

    status: {
      long: string;
      short: string;
      elapsed: number | null;
      extra: number | null;
    };
  };

  league: {
    id: number;
    name: string;
    country: string;
    logo: string;
    flag: string | null;
    season: number;
    round: string;
    standings: boolean;
  };

  teams: {
    home: {
      id: number;
      name: string;
      logo: string;
      winner: boolean | null;
    };
    away: {
      id: number;
      name: string;
      logo: string;
      winner: boolean | null;
    };
  };

  goals: {
    home: number | null;
    away: number | null;
  };

  score: {
    halftime: {
      home: number | null;
      away: number | null;
    };
    fulltime: {
      home: number | null;
      away: number | null;
    };
    extratime: {
      home: number | null;
      away: number | null;
    };
    penalty: {
      home: number | null;
      away: number | null;
    };
  };
}
