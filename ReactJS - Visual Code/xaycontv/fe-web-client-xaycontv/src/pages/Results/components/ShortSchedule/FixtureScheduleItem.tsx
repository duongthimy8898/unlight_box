import { Link } from "react-router-dom";
import type { Fixture } from "../../../../types/Fixture";
import clsx from "clsx";
import dayjs from "dayjs";
import { useDataContext } from "../../../../hooks/useDataContext";

const FixtureScheduleItem = ({ fixture, idx }: { fixture: Fixture; idx: number }) => {
  const { fixturesStats } = useDataContext();
  const fixtureStat = fixturesStats.data?.find((stat) => stat.fixture.id.toString() === fixture.referenceId);
  return (
    <Link to={`/xem-truc-tiep/${fixture.sport.slug}/${fixture.league.slug}/${fixture.slug}`} className="w-full bg-[#3b3a41] flex flex-row">
      <div
        className={clsx(
          "hidden lt:flex w-[160px] flex-shrink-0 flex-col gap-2 p-4 items-center justify-center",
          idx % 2 === 0 ? "bg-[#424149]" : "bg-[#4a4952]",
        )}
      >
        <img className="w-8 h-8 border border-white rounded-full" src={fixture.fixtureCommentators.at(0)?.commentator.avatarUrl} alt="" />
        <span className="text-xs font-semibold truncate">
          {fixture.fixtureCommentators.at(0)?.commentator.nickname}
          {fixture.fixtureCommentators.length > 1 && ` +${fixture.fixtureCommentators.length - 1} BLV khác`}
        </span>
      </div>
      <div className={clsx("p-4 flex-1 flex flex-col lt:flex-row items-center gap-2", idx % 2 === 0 ? "bg-[#3b3a41]" : "bg-[#424149]")}>
        <div className="w-[160px] flex-shrink-0 flex flex-col gap-2">
          <div className="flex flex-row items-center space-x-2">
            <span className="font-bold">{dayjs(fixture.startTime).format("HH:mm")}</span>
            <span className="py-0.5 px-1.5 text-xs font-bold border border-gray-500 rounded">{dayjs(fixture.startTime).format("DD/MM")}</span>
          </div>
          <p className="text-xs truncate">{fixture.league.name}</p>
        </div>
        <div className="flex-1 grid grid-cols-[1fr_auto_1fr] gap-4">
          <div className="w-full flex flex-col-reverse lt:flex-row justify-center lt:justify-end items-center gap-1">
            <span className="text-sm font-semibold">{fixture.homeTeam.name}</span>
            <img src={fixture.homeTeam.logoUrl} alt="" className="w-12 h-12 object-fill" />
          </div>
          <div className="w-auto flex flex-col gap-1 items-center justify-center">
            <div className="flex flex-col gap-2 items-center justify-center">
              <span className="py-0.5 px-1.5 text-xs font-bold border border-gray-500 rounded">{fixtureStat?.fixture.status.short ?? "KXD"}</span>
              <div className="border-2 border-red-500 rounded-[12px] px-4 py-0.5 space-x-1">
                <b className="text-[14px] font-bold">{fixtureStat?.goals.home ?? 0}</b>
                <span className="text-[14px] font-bold">-</span>
                <b className="text-[14px] font-bold">{fixtureStat?.goals.away ?? 0}</b>
              </div>
              {fixture.isLive && <p className="font-semibold text-xs">{fixtureStat?.fixture.status.elapsed ?? "---"}'</p>}
            </div>
          </div>
          <div className="w-full flex flex-col-reverse lt:flex-row-reverse justify-center lt:justify-end items-center gap-1">
            <span className="text-sm font-semibold">{fixture.awayTeam.name}</span>
            <img src={fixture.awayTeam.logoUrl} alt="" className="w-12 h-12 object-fill" />
          </div>
        </div>
        <div className="flex flex-row justify-between lt:flex-col gap-1 lt:justify-center items-center">
          <div className="flex lt:hidden flex-shrink-0 max-w-[50%] flex-row items-center bg-[#54535c] rounded overflow-hidden">
            <img className="w-8 h-8" src={fixture.fixtureCommentators.at(0)?.commentator.avatarUrl} alt="" />
            <span className="px-3 text-xs font-semibold truncate">
              {fixture.fixtureCommentators.at(0)?.commentator.nickname}
              {fixture.fixtureCommentators.length > 1 && ` +${fixture.fixtureCommentators.length - 1} BLV khác`}
            </span>
          </div>
          {fixture.isLive ? (
            <button className="border bg-red-500 rounded-full py-2 px-4 text-sm font-semibold text-white">Trực tiếp</button>
          ) : (
            <button className="border border-gray-500 rounded-md py-1.5 px-4 text-sm font-semibold text-gray-500">Đã kết thúc</button>
          )}
        </div>
      </div>
    </Link>
  );
};

export default FixtureScheduleItem;
