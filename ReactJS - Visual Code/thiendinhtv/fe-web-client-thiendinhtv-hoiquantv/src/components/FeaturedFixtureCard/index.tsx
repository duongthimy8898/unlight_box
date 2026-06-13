import { Link } from "react-router-dom";
import type { Fixture } from "../../types/Fixture";
import dayjs from "dayjs";
import { useDataContext } from "../../hooks/useDataContext";

const FeaturedFixtureCard = ({ fixture }: { fixture: Fixture }) => {
  const { fixturesStats } = useDataContext();
  const fixtureStat = fixturesStats.data?.find((stat) => stat.fixture.id.toString() === fixture.referenceId);
  return (
    <Link
      to={`/xem-truc-tiep/${fixture.sport.slug}/${fixture.league.slug}/${fixture.slug}`}
      className="w-full border-2 border-[#3B3A41] rounded-[16px] overflow-hidden"
      style={{
        backgroundImage: "url('/bg-fixture-card.png')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="w-full p-4 flex flex-col gap-8"
        style={{
          background: "radial-gradient(ellipse at center, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,0.2) 60%, rgba(0,0,0,1) 100%)",
        }}
      >
        <div className="w-full flex flex-row justify-between items-center">
          <div className="flex flex-col justify-center">
            <div className="flex flex-row items-center space-x-1.5">
              <span className="text-[18px] font-bold">{dayjs(fixture.startTime).format("HH:mm")}</span>
              <span className="px-2 text-sm font-semibold text-black bg-[#C4E456] rounded">{dayjs(fixture.startTime).format("DD/MM")}</span>
            </div>
            <p className="text-sm">{fixture.league.name}</p>
          </div>
          <img src={fixture.sport.iconUrl} alt="" className="w-[36px] h-[36px]" />
        </div>
        <div className="w-full grid grid-cols-[1fr_auto_1fr] gap-4">
          <div className="w-full flex flex-col gap-1 items-center overflow-hidden">
            <img src={fixture.homeTeam.logoUrl} alt="" className="w-[48px] h-[32px] rounded object-contain" />
            <span className="w-full font-semibold text-center text-sm truncate">{fixture.homeTeam.name}</span>
          </div>
          <div className="flex flex-col gap-1 items-center justify-center">
            {fixture.isLive ? (
              <div className="flex flex-col gap-1 items-center justify-center">
                <p className="font-semibold text-xs">
                  {fixtureStat
                    ? (() => {
                        const { short, elapsed, extra } = fixtureStat.fixture.status;
                        const extraText = extra ? `+${extra}` : "";
                        return `${short} - ${elapsed}${extraText}'`;
                      })()
                    : "---"}
                </p>
                <div className="border-2 border-red-500 rounded-[12px] px-4 py-1 space-x-1">
                  <b className="text-[16px] font-bold">{fixtureStat?.goals.home ?? "0"}</b>
                  <span className="text-[16px] font-bold">-</span>
                  <b className="text-[16px] font-bold">{fixtureStat?.goals.away ?? "0"}</b>
                </div>
              </div>
            ) : (
              <div className="border-2 border-[#3B3A41] rounded-[12px] px-4 py-1">
                <span className="text-[16px] font-bold">VS</span>
              </div>
            )}
          </div>
          <div className="w-full flex flex-col gap-1 items-center overflow-hidden">
            <img src={fixture.awayTeam.logoUrl} alt="" className="w-[48px] h-[32px] rounded object-contain" />
            <span className="w-full font-semibold text-center text-sm truncate">{fixture.awayTeam.name}</span>
          </div>
        </div>
        <div className="w-full flex flex-row gap-2 justify-between items-center overflow-hidden">
          <div className="flex-shrink-0 max-w-[50%] flex flex-row items-center bg-[#3E3D3A] rounded overflow-hidden">
            <img className="w-8 h-8" src={fixture.fixtureCommentators.at(0)?.commentator.avatarUrl ?? "/favicon.png"} alt="" />
            <span className="px-3 text-xs font-semibold truncate">
              {fixture.fixtureCommentators.at(0)?.commentator.nickname}
              {fixture.fixtureCommentators.length > 1 && ` +${fixture.fixtureCommentators.length - 1} BLV khác`}
            </span>
          </div>
          <div className="flex flex-row gap-2 flex-shrink-0">
            {fixture.isLive ? (
              <button className="py-1.5 px-3 rounded text-xs font-semibold bg-red-500">
                <span>Trực tiếp</span>
              </button>
            ) : (
              <button className="py-1.5 px-3 rounded text-xs font-semibold bg-gray-500">
                <span>Sắp diễn ra</span>
              </button>
            )}
            <button
              onClick={(e) => {
                e.preventDefault();
                window.open("https://www.sv368cpc1.vip/register?affiliateCode=footballsv368", "_blank");
              }}
              className="py-1.5 px-3 rounded text-xs font-semibold bg-[#C4E456] text-black"
            >
              <span>Đặt cược</span>
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default FeaturedFixtureCard;
