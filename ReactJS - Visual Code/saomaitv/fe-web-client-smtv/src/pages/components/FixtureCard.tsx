import { Link } from "@tanstack/react-router";
import clsx from "clsx";
import pinnedFixtureBgCard from "../../assets/pinned-fixture-bg-card.png";
import basicFixtureBgCard from "../../assets/basic-fixture-bg-card.jpg";
import type { Fixture } from "../../shared/types/Fixture";
import { formatTime } from "../../shared/lib/dateFns";
import { formatDate } from "date-fns";
import { useFixtures } from "../../features/fixtures/hooks";
import adButtons from "../../config/adButton";

const FixtureCard = ({ fixture, isPinned }: { fixture: Fixture; isPinned: boolean }) => {
  const bgImageUrl = isPinned ? pinnedFixtureBgCard : basicFixtureBgCard;
  const stats = useFixtures.listStats().data?.find((f) => f.fixture.id.toString() === fixture.referenceId);
  return (
    <Link
      to="/truc-tiep/$slug/$id"
      params={{
        slug: fixture.slug,
        id: String(fixture.id),
      }}
      className="border-2 border-[#AC9873] rounded-xl overflow-hidden"
    >
      <div className="flex flex-row justify-between items-center gap-4 bg-[#1B1F28] py-1.5 px-3">
        <div className="flex flex-row items-center gap-1">
          <span>{formatTime(fixture.startTime, "HH:mm")}</span>
          <span className="bg-[#AC9873] h-4 w-0.5"></span>
          <span>{formatDate(fixture.startTime, "dd/MM/yyyy")}</span>
        </div>
        <span className="font-semibold truncate">{fixture.league.name}</span>
      </div>
      <div className="w-full h-0.5 bg-linear-to-r from-[#AC9873]/0 via-[#AC9873] to-[#AC9873]/0"></div>
      <div
        style={{
          backgroundImage: `url("${bgImageUrl}")`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
        className="overflow-hidden"
      >
        <div className={clsx("flex flex-col", !isPinned && "backdrop-brightness-25")}>
          <div className="grid grid-cols-[1fr_auto_1fr] mt-8 px-3">
            <div className="flex flex-col gap-2 items-center justify-center overflow-hidden">
              <img src={fixture.homeTeam.logoUrl} alt="" className="w-12 h-12 object-contain" />
              <p className="w-full text-sm text-center truncate">{fixture.homeTeam.name}</p>
            </div>
            <div className="flex flex-col justify-center items-center gap-2">
              <div
                className={clsx(
                  "bg-linear-to-r from-[#DD1818]/0 via-[#DD1818] to-[#DD1818]/0",
                  "px-6 py-1 flex flex-row gap-1.5 items-center justify-center text-xs",
                )}
              >
                <span>{stats?.fixture.status.short ?? "KXD"}</span>
                {fixture.isLive && (
                  <>
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-white"></span>
                    <span>
                      {stats
                        ? (() => {
                            const { elapsed, extra } = stats.fixture.status;
                            const extraText = extra ? `+${extra}` : "";
                            return `${elapsed ?? "0"}${extraText}'`;
                          })()
                        : "---"}
                    </span>
                  </>
                )}
              </div>
              <div className="bg-linear-to-b from-[#AC9873]/0 via-[#AC9873] to-[#AC9873]/0 px-0.5 rounded-md overflow-hidden">
                <div
                  className={clsx(
                    "px-4 py-0.5 text-xl flex flex-row justify-center items-center gap-2 font-semibold",
                    isPinned ? "bg-black/80" : "bg-black/75",
                  )}
                >
                  {fixture.isLive ? (
                    <>
                      <span>{stats?.goals.home ?? "--"}</span>
                      <span>:</span>
                      <span>{stats?.goals.away ?? "--"}</span>
                    </>
                  ) : (
                    <span>VS</span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 items-center justify-center overflow-hidden">
              <img src={fixture.awayTeam.logoUrl} alt="" className="w-12 h-12 object-contain" />
              <p className="w-full text-sm text-center truncate">{fixture.awayTeam.name}</p>
            </div>
          </div>
          <div className="mt-8 pb-3 flex flex-row justify-between items-center gap-4 px-3">
            <div className="bg-white/20 backdrop-blur-xs flex flex-row items-center gap-1 max-w-1/2 border border-[#7D7978] rounded-md overflow-hidden p-1">
              <img
                src={fixture.fixtureCommentators.at(0)?.commentator.avatarUrl ?? "/favicon.png"}
                alt=""
                className="w-8 h-8 object-cover rounded-md border border-inherit shrink-0"
              />
              <span className="inline-block text-sm flex-1 truncate">{fixture.fixtureCommentators.at(0)?.commentator.nickname}</span>
            </div>
            <div className="flex-1 flex flex-row gap-1.5 justify-end">
              {fixture.isLive ? (
                <span className="bg-[#ff0000]/50 border border-[#ff0000]/50 text-white text-nowrap text-sm px-3 py-1 rounded">Đang diễn ra</span>
              ) : (
                <span className="bg-[#1B1F28] border border-white/20 text-nowrap text-sm px-3 py-1 rounded">Chưa bắt đầu</span>
              )}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  window.open(adButtons.GLOBAL.href, "_blank");
                }}
                className="bg-linear-to-r from-[#FE9900] to-[#FF6A00] text-sm text-nowrap px-3 py-1 rounded cursor-pointer"
              >
                Đặt cược
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default FixtureCard;
