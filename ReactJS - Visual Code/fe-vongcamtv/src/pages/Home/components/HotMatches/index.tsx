import { useEffect } from "react";
import HotMatch from "./HotMatch";
import { Link, useSearchParams } from "react-router-dom";
import clsx from "clsx";
import type { Match } from "../../../../types/Match.type";
import { useQuery } from "@tanstack/react-query";
import { mapToMatch } from "../../../../utils/MatchUtils";

const HotMatches = () => {
  const [searchParams] = useSearchParams();

  const statusFilter = searchParams.get("statusFilter") || "ALL";
  useEffect(() => {
    //fetch api
    console.log(statusFilter);
  }, [statusFilter]);

  const fetchHotMatches = async (): Promise<Match[]> => {
    const response = await fetch("https://sv.bugiotv.xyz/internal/api/matches");

    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({}));
      throw new Error(errorBody?.message || "Không thể tải fetchHotMatches");
    }

    const jsonRes = await response.json();
    const results = jsonRes.data;
    const pinnedMatchesMapped: Match[] = Array.isArray(results) ? await Promise.all(results.map(mapToMatch)) : [];
    return pinnedMatchesMapped;
  };

  const { data: hotMatches = [] } = useQuery<Match[]>({
    queryKey: ["hotMatches"],
    queryFn: fetchHotMatches,
  });

  return (
    <div className="flex flex-col space-y-2">
      <div className="w-full border-l-4 border-[#96C052] bg-gradient-to-r from-[#96C052]/25 to-transparent pl-2 pr-0 py-1 inline-flex space-x-1 justify-between items-center">
        <span className="uppercase text-[16px] font-[500] truncate">Tâm điểm bóng đá</span>
        <div className="inline-flex items-center space-x-1">
          <Link
            className={clsx(
              "px-2 py-0.5 bg-transparent border border-red-500 text-red-500 rounded-lg truncate transition",
              statusFilter === "LIVE" && "!bg-red-500 !text-white"
            )}
            to="?statusFilter=LIVE"
          >
            <span className="text-sm">TRỰC TIẾP</span>
          </Link>
          <Link
            className={clsx(
              "px-2 py-0.5 bg-transparent border border-[#5EA522] text-[#5EA522] rounded-lg truncate transition",
              statusFilter === "ALL" && "!bg-[#5ea522] !text-white"
            )}
            to="?statusFilter=ALL"
          >
            <span className="text-sm">TẤT CẢ</span>
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-1 tb:grid-cols-2 lt:grid-cols-3 gap-2">
        {hotMatches.map((match) => (
          <HotMatch key={match.id} match={match} />
        ))}
      </div>
    </div>
  );
};

export default HotMatches;
