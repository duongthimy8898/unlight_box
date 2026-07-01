import type { Match } from "../../../types/Match.type";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function mapToMatch(raw: any): Promise<Match> {
  let xElapsed: number | null = null;
  let xScore: { home: number; away: number } | null = null;
  let xShortStatus: string | null = null;
  let xStatus: string | null = null;
  let xIsPlaying = false;
  xElapsed = null;
  xScore = null;
  xShortStatus = null;
  xStatus = null;
  if (raw.referenceId) {
    xElapsed = null;
    xScore = null;
    xShortStatus = null;
    xStatus = null;
    // try {
    //   const res = await fetch(`https://api-sv2.livestats.online/api/v1/fixtures/${raw.slug}-I${raw.referenceId}`, {
    //     headers: { "Access-Token": "AB321C" },
    //   });

    //   const data = await res.json();

    //   if (data.code === 200 && data.result) {
    //     xElapsed = data.result.elapsed ?? null;
    //     xScore = {
    //       home: data.result.home_score ?? 0,
    //       away: data.result.away_score ?? 0,
    //     };
    //     xShortStatus = data.result.status.shortStatus;
    //     xStatus = xShortStatus === "NS" && raw.isLive === true ? "Đang diễn ra" : data.result.status_vi;
    //     xIsPlaying = data.result.is_playing || raw.isLive === true;
    //   }
    // } catch (err) {
    //   console.error("Failed to fetch fixture detail:", err);
    // }
  } else {
    xIsPlaying = raw.isLive;
  }
  xIsPlaying = raw.isLive;

  return {
    id: raw.id,
    referenceId: raw.referenceId,
    isHot: raw.isHot,
    title: raw.title,
    slug: raw.slug,
    shortStatus: xShortStatus,
    status: xStatus,
    league: raw.tournamentName,
    startTime: `${raw.startTime}`,
    homeClub: {
      name: raw.homeClub?.name || "Unknown",
      logo: raw.homeClub?.logoUrl || "",
    },
    awayClub: {
      name: raw.awayClub?.name || "Unknown",
      logo: raw.awayClub?.logoUrl || "",
    },
    score: xScore,
    commentator: {
      nickname: raw.commentator?.nickname || "Nhà đài",
      avatar: raw.commentator?.avatar || "/favicon.png",
      streamSourceSd: raw.commentator?.streamSourceSd,
      streamSourceHd: raw.commentator?.streamSourceHd,
      streamSourceFhd: raw.commentator?.streamSourceFhd,
    },
    isPlaying: xIsPlaying,
    elapsed: xElapsed,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapApiToMatch(raw: any): Match {
  return {
    id: raw.id,
    referenceId: raw.referenceId,
    isHot: false,
    title: raw.name,
    slug: raw.slug,
    shortStatus: raw.status.shortStatus,
    status: raw.status_vi,
    league: raw.league.name,
    startTime: `${raw.start_date_formatted}`,
    homeClub: {
      name: raw.homeTeam.name,
      logo: raw.homeTeam.logo,
    },
    awayClub: {
      name: raw.awayTeam.name,
      logo: raw.awayTeam.logo,
    },

    score: {
      home: raw.home_score,
      away: raw.away_score,
    },
    commentator: {
      nickname: raw.commentator?.nickname || "Nhà đài",
      avatar: raw.commentator?.avatar || "/favicon.png",
      streamSourceSd: raw.commentator?.streamSourceSd,
      streamSourceHd: raw.commentator?.streamSourceHd,
      streamSourceFhd: raw.commentator?.streamSourceFhd,
    },
    isPlaying: raw.is_playing,
    elapsed: raw.elapsed,
  };
}

export { mapToMatch, mapApiToMatch };
