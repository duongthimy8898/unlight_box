import { useEffect, useState } from "react";
import clsx from "clsx";
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import "dayjs/locale/vi";
import type { Match } from "../../../../types/Match.type";
import { mapApiToMatch } from "../../../../utils/MatchUtils";
import MatchScheduleItem from "./MatchScheduleItem";
dayjs.extend(weekday);
dayjs.locale("vi");
const MatchSchedule = () => {
  const [matchSchedules, setMatchSchedules] = useState<Match[]>([]);
  const [numOfLiveMatchSchedule, setNumOfLiveMatchSchedule] = useState(0);
  const [filter, setFilter] = useState<string>("LIVE");
  const filters = [
    { label: "Hôm nay", value: dayjs().format("YYYY-MM-DD") },
    { label: "Ngày mai", value: dayjs().add(1, "day").format("YYYY-MM-DD") },
    { label: dayjs().add(2, "day").format("dddd"), value: dayjs().add(2, "day").format("YYYY-MM-DD") },
    { label: dayjs().add(3, "day").format("dddd"), value: dayjs().add(3, "day").format("YYYY-MM-DD") },
    { label: dayjs().add(4, "day").format("dddd"), value: dayjs().add(4, "day").format("YYYY-MM-DD") },
  ];
  useEffect(() => {
    const endPoint = "https://api.livestats.online/api/v1/fixtures?limit=25&isPlaying=true";
    const fetchMatchSchedules = async (): Promise<void> => {
      const response = await fetch(endPoint, {
        headers: { "Access-Token": "AB321C" },
      });

      if (!response.ok) {
        const errorBody = await response.json().catch(() => ({}));
        throw new Error(errorBody?.message || "Không thể tải fetchHotMatches");
      }
      const jsonRes = await response.json();
      const results = jsonRes.results;
      setNumOfLiveMatchSchedule(results.length);
    };
    fetchMatchSchedules();
  }, [filter]);
  useEffect(() => {
    const baseApi = "https://api.livestats.online/api/v1/fixtures";
    const endPoint = (() => {
      if (filter === "LIVE") {
        console.log("📺 Fetch trận đang trực tiếp");
        return `${baseApi}?limit=25&isPlaying=true`;
      } else {
        console.log("📅 Fetch trận ngày:", filter); // là dạng YYYY-MM-DD
        return `${baseApi}?limit=25&date=${filter}`;
      }
    })();
    const fetchMatchSchedules = async (): Promise<void> => {
      const response = await fetch(endPoint, {
        headers: { "Access-Token": "AB321C" },
      });

      if (!response.ok) {
        const errorBody = await response.json().catch(() => ({}));
        throw new Error(errorBody?.message || "Không thể tải fetchHotMatches");
      }

      const jsonRes = await response.json();
      const results = jsonRes.results;
      console.log(results);
      const pinnedMatchesMapped: Match[] = Array.isArray(results) ? await Promise.all(results.map(mapApiToMatch)) : [];
      setMatchSchedules(pinnedMatchesMapped);
    };
    fetchMatchSchedules();
  }, [filter]);

  return (
    <div className="flex flex-col">
      <div className="w-full border-l-4 border-[#96C052] bg-gradient-to-r from-[#96C052]/25 to-transparent px-2 py-2">
        <span className="uppercase text-[16px] font-[500] truncate">Lịch thi đấu</span>
      </div>
      <div className="overflow-auto flex w-full divide-x divide-gray-400">
        <button
          onClick={() => setFilter("LIVE")}
          className={clsx(
            "flex-1 flex flex-col space-y-0.5 items-center px-4 py-2 transition",
            filter === "LIVE" ? "bg-red-600 text-white" : "bg-[#4B4E56] text-white"
          )}
        >
          <span className="text-sm font-medium truncate">Đang diễn ra</span>
          <span className={clsx("py-0.5 px-2 text-xs rounded-full font-medium", filter === "LIVE" ? "bg-white text-red-600" : "bg-red-600 text-white")}>
            {numOfLiveMatchSchedule}
          </span>
        </button>
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={clsx(
              "flex-1 flex flex-col items-center px-4 py-2 transition",
              filter === f.value ? "bg-white text-[#22b629]" : "bg-[#4B4E56] text-white"
            )}
          >
            <span className="text-sm font-medium capitalize truncate">{f.label}</span>
            <span className={clsx("text-xs truncate")}>{f.value}</span>
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1">
        {matchSchedules.map((matchScheduleItem) => (
          <MatchScheduleItem key={matchScheduleItem.id} match={matchScheduleItem} />
        ))}
      </div>
    </div>
  );
};

export default MatchSchedule;
