import { useQuery } from "@tanstack/react-query";
import PinnedMatch from "./PinnedMatch";
import { mapToMatch } from "../../../../utils/MatchUtils";
import type { Match } from "../../../../types/Match.type";
import { useEffect, useState } from "react";

const PinnedMatches = () => {
  const [pinnedMatchesFinal, setPinnedMatchesFinal] = useState<Match[]>([]);
  const fetchPinnedMatches = async (): Promise<Match[]> => {
    const response = await fetch("https://sv.bugiotv.xyz/internal/api/matches?isHot=true");

    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({}));
      throw new Error(errorBody?.message || "Không thể tải pinned matches");
    }

    const jsonRes = await response.json();
    const results = jsonRes.data;
    const pinnedMatchesMapped: Match[] = Array.isArray(results) ? await Promise.all(results.map(mapToMatch)) : [];
    return pinnedMatchesMapped;
  };

  const tryFetchPinnedMatches = async (): Promise<Match[]> => {
    const response = await fetch("https://sv.bugiotv.xyz/internal/api/matches");

    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({}));
      throw new Error(errorBody?.message || "Không thể tải pinned matches");
    }

    const jsonRes = await response.json();
    const results = jsonRes.data;
    const pinnedMatchesMapped: Match[] = Array.isArray(results) ? await Promise.all(results.map(mapToMatch)) : [];
    return pinnedMatchesMapped;
  };

  const { data: pinnedMatches1 = [] } = useQuery<Match[]>({
    queryKey: ["pinnedMatches1"],
    queryFn: fetchPinnedMatches,
  });
  const { data: pinnedMatches2 = [] } = useQuery<Match[]>({
    queryKey: ["pinnedMatches2"],
    queryFn: tryFetchPinnedMatches,
  });

  useEffect(() => {
    const newData = pinnedMatches1 && pinnedMatches1.length > 0 ? pinnedMatches1 : pinnedMatches2 && pinnedMatches2.length > 0 ? pinnedMatches2.slice(0,2) : [];

    setPinnedMatchesFinal((prev) => {
      // So sánh dữ liệu cũ và mới để tránh cập nhật không cần thiết
      const prevJson = JSON.stringify(prev);
      const nextJson = JSON.stringify(newData);
      return prevJson !== nextJson ? newData : prev;
    });
  }, [pinnedMatches1, pinnedMatches2]);

  return (
    <div className="grid grid-cols-1 tb:grid-cols-2 gap-2">
      {pinnedMatchesFinal?.map((match) => (
        <PinnedMatch key={match.id} match={match} />
      ))}
    </div>
  );
};

export default PinnedMatches;
