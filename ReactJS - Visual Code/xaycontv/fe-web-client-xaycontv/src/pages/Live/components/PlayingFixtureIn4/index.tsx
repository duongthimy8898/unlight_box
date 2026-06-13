import dayjs from "dayjs";
import type { Fixture } from "../../../../types/Fixture";
import { useDataContext } from "../../../../hooks/useDataContext";
import { useEffect, useState } from "react";
import type { FixtureStats } from "../../../../types/FixtureStats";

const PlayingFixtureIn4 = ({ fixture }: { fixture: Fixture }) => {
  const { fixturesStats } = useDataContext();
  const [fixtureStat, setFixtureStats] = useState<FixtureStats | null>(null);
  useEffect(() => {
    const stat = fixturesStats.data?.find((stat) => stat.fixture.id.toString() === fixture.referenceId);
    setFixtureStats(stat || null);
  }, [fixturesStats.data, fixture.referenceId]);
  return (
    <div className="w-full flex py-4 px-2 dt:py-8 dt:dx-8 flex-col gap-4 dt:gap-0 dt:flex-row bg-gradient-to-b from-transparent to-[#3E3D3A] rounded-[20px] dt:divide-x divide-gray-500/25">
      <div className="flex flex-col justify-center items-center dt:items-start px-4">
        <div className="flex flex-row items-center space-x-1.5">
          <span className="px-2 text-sm font-semibold text-black bg-yellow-300 rounded">{dayjs(fixture?.startTime).format("HH:mm")}</span>
          <span className="text-[18px] font-bold">{dayjs(fixture?.startTime).format("DD/MM")}</span>
        </div>
        <p className="text-sm">{fixture?.league.name}</p>
      </div>
      <div className="flex-1 flex flex-row items-center px-4">
        <div className="flex-1 grid grid-cols-[1fr_auto_1fr] gap-8">
          <div className="w-full flex flex-col-reverse dt:flex-row justify-center dt:justify-end items-center gap-1">
            <span className="text-sm font-semibold text-center dt:text-end">{fixture?.homeTeam.name}</span>
            <img src={fixture?.homeTeam.logoUrl} alt="" className="w-10 h-10 dt:w-16 dt:h-16 object-fill" />
          </div>
          <div className="w-auto flex gap-1 items-center justify-center">
            {fixture?.isLive ? (
              <div className="flex flex-col gap-2 items-center justify-center">
                <span className="py-0.5 px-1.5 text-xs font-bold border border-gray-500 rounded">{fixtureStat ? fixtureStat.fixture.status.short : "KXD"}</span>
                <div className="border-2 border-red-500 rounded-[12px] px-4 py-0.5 space-x-1">
                  <b className="text-[18px] font-bold">{fixtureStat?.goals.home ?? "0"}</b>
                  <span className="text-[14px] font-bold">-</span>  
                  <b className="text-[18px] font-bold">{fixtureStat?.goals.away ?? "0"}</b>
                </div>
                <p className="font-semibold text-xs">
                  {fixtureStat
                    ? `${fixtureStat.fixture.status.elapsed}${fixtureStat.fixture.status.extra ? `+${fixtureStat.fixture.status.extra}` : ""}'`
                    : "---"}
                </p>
              </div>
            ) : (
              <div className="border-2 border-gray-500 rounded-[12px] px-3 py-0.5">
                <span className="text-[16px] font-bold">VS</span>
              </div>
            )}
          </div>
          <div className="w-full flex flex-col-reverse dt:flex-row-reverse justify-center dt:justify-end items-center gap-1">
            <span className="text-sm font-semibold text-center dt:text-start">{fixture?.awayTeam.name}</span>
            <img src={fixture?.awayTeam.logoUrl} alt="" className="w-10 h-10 dt:w-16 dt:h-16 object-fill" />
          </div>
        </div>
        <div className="hidden dt:block flex-shrink-0">
          {fixture?.isLive ? (
            <button className="border bg-red-500 rounded-full py-2 px-4 text-sm font-semibold text-white">Trực tiếp</button>
          ) : (
            <button className="bg-gray-500 rounded-md py-1.5 px-4 text-sm font-semibold text-white">Sắp diễn ra</button>
          )}
        </div>
      </div>
      <div className="flex flex-row justify-between flex-shrink-0 items-center px-4">
        <div className="flex flex-shrink-0 flex-row items-center bg-[#54535c] rounded overflow-hidden">
          <img className="w-8 h-8" src={fixture?.fixtureCommentators.at(0)?.commentator.avatarUrl} alt="" />
          <span className="px-3 text-xs font-semibold truncate">
            {fixture?.fixtureCommentators.at(0)?.commentator.nickname}
            {fixture && fixture.fixtureCommentators.length > 1 && ` +${fixture?.fixtureCommentators.length - 1} BLV khác`}
          </span>
        </div>
        <div className="block dt:hidden">
          {fixture?.isLive ? (
            <button className="border bg-red-500 rounded-full py-2 px-4 text-sm font-semibold text-white">Trực tiếp</button>
          ) : (
            <button className="bg-gray-500 rounded-md py-1.5 px-4 text-sm font-semibold text-white">Sắp diễn ra</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlayingFixtureIn4;
