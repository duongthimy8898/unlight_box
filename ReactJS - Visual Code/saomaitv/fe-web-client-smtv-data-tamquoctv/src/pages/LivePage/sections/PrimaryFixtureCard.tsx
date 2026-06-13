import clsx from "clsx";
import pinnedFixtureBgCard from "../../../assets/pinned-fixture-bg-card.png";
import type { Fixture } from "../../../shared/types/Fixture";
import { formatTime } from "../../../shared/lib/dateFns";
import { formatDate } from "date-fns";
import { useFixtures } from "../../../features/fixtures/hooks";

const PrimaryFixtureCard = ({ fixture }: { fixture: Fixture }) => {
  const bgImageUrl = pinnedFixtureBgCard;
  const stats = useFixtures.listStats().data?.find((f) => f.fixture.id.toString() === fixture.referenceId);
  return (
    <section className="mt-4 px-2 xl:px-0">
      <div className="border-2 border-[#AC9873] rounded-xl overflow-hidden">
        <div className="flex flex-row justify-between items-center gap-4 bg-[#1B1F28] py-1.5 px-3">
          <div className="flex flex-row items-center gap-1">
            <span>{formatTime(fixture.startTime, "HH:mm")}</span>
            <span className="bg-[#AC9873] h-4 w-0.5"></span>
            <span>{formatDate(fixture.startTime, "dd/MM/yyyy")}</span>
          </div>
          <span className="font-semibold">{fixture.tournamentName}</span>
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
          <div className={clsx("flex flex-col")}>
            <div className="grid grid-cols-[1fr_auto_1fr] mt-8 px-3">
              <div className="flex flex-col gap-2 items-center justify-center overflow-hidden">
                <img src={fixture.homeClub.logoUrl} alt="" className="w-15 h-15 object-contain" />
                <p className="w-full text-sm text-center truncate">{fixture.homeClub.name}</p>
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
                  <div className={clsx("px-4 py-0.5 text-3xl flex flex-row justify-center items-center gap-2 font-semibold", "bg-black/80")}>
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
                <img src={fixture.awayClub.logoUrl} alt="" className="w-15 h-15 object-contain" />
                <p className="w-full text-sm text-center truncate">{fixture.awayClub.name}</p>
              </div>
            </div>
            <div className="mt-8 pb-3 flex flex-row justify-center items-center gap-4 px-3">
              <div className="bg-white/20 backdrop-blur-xs flex flex-row items-center gap-1 max-w-1/2 border border-[#7D7978] rounded-md overflow-hidden p-1">
                <img
                  src={fixture.commentator?.avatarUrl ?? "/favicon.png"}
                  alt=""
                  className="w-8 h-8 object-cover rounded-md border border-inherit shrink-0"
                />
                <span className="inline-block text-sm flex-1 truncate">{fixture.commentator?.nickname}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrimaryFixtureCard;
