import { useEffect, useState } from "react";
import clsx from "clsx";

const STAT_FIELDS = [
  { key: "Shots on Goal", label: "Sút vào khung thành" },
  { key: "Shots off Goal", label: "Sút ngoài khung thành" },
  { key: "Total Shots", label: "Tổng cú sút" },
  { key: "Blocked Shots", label: "Cú sút bị chặn" },
  { key: "Shots insidebox", label: "Sút trong vòng cấm" },
  { key: "Shots outsidebox", label: "Sút ngoài vòng cấm" },
  { key: "Fouls", label: "Số lần phạm lỗi" },
  { key: "Corner Kicks", label: "Phạt góc" },
  { key: "Offsides", label: "Việt vị" },
  { key: "Ball Possession", label: "Quyền sở hữu bóng" },
  { key: "Yellow Cards", label: "Thẻ vàng" },
  { key: "Red Cards", label: "Thẻ đỏ" },
  { key: "Goalkeeper Saves", label: "Thủ môn cứu thua" },
  { key: "Total passes", label: "Chuyền bóng" },
  { key: "Passes accurate", label: "Chuyền bóng thành công" },
  { key: "Passes %", label: "Tỉ lệ chuyền thành công" },
];

function Stats({fixtureId} : {fixtureId : number}) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [homeStats, setHomeStats] = useState<Record<string, any>>({});
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [awayStats, setAwayStats] = useState<Record<string, any>>({});

  useEffect(() => {
    const fetchData = async () => {
      if (!fixtureId) return;
      const res = await fetch(`https://v3.football.api-sports.io/fixtures/statistics?fixture=${fixtureId}`, {
        headers: {
          "x-rapidapi-host": "v3.football.api-sports.io",
          "x-rapidapi-key": "5e58558e7a6c6ed543f81b4efcfbea86",
        },
      });
      const jsonData = await res.json();
      const result = jsonData.response;

      const home = result[0]?.statistics || [];
      const away = result[1]?.statistics || [];

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const reduceStats = (stats: any[]): Record<string, any> => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return stats.reduce((acc: Record<string, any>, stat: any) => {
          acc[stat.type] = stat.value;
          return acc;
        }, {});
      };

      setHomeStats(reduceStats(home));
      setAwayStats(reduceStats(away));
    };

    fetchData();
    const interval = setInterval(fetchData, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [fixtureId]);

  const getPercent = (home: number, away: number) => {
    const total = home + away;
    if (total === 0) return [0, 0];
    return [Math.round((home / total) * 100), Math.round((away / total) * 100)];
  };

  return (
    <div className="w-full h-full overflow-y-auto overflow-x-hidden px-2 py-4 bg-black">
      <div className="flex flex-col gap-4 items-center">
        {STAT_FIELDS.map((field) => {
          const homeValue = homeStats[field.key] || 0;
          const awayValue = awayStats[field.key] || 0;
          const [homePercent, awayPercent] = getPercent(parseFloat(homeValue) || 0, parseFloat(awayValue) || 0);

          return (
            <div key={field.key} className="flex flex-col w-full gap-1">
              <p className="text-white text-center text-sm flex justify-between items-center">
                <span className="font-semibold">{homeValue}</span>
                <span className="title">{field.label}</span>
                <span className="font-semibold">{awayValue}</span>
              </p>
              <div className="flex flex-row gap-2">
                <div className="relative flex-1 bg-white/15 h-[10px]">
                  <div className={clsx("absolute inset-y-0 right-0 bg-[#F8C32F]")} style={{ width: `${homePercent}%` }}></div>
                </div>
                <div className="relative flex-1 bg-white/15 h-[10px]">
                  <div className={clsx("absolute inset-y-0 left-0 bg-[#F8C32F]")} style={{ width: `${awayPercent}%` }}></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Stats;
