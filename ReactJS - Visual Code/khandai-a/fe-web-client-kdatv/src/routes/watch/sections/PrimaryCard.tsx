import { formatDate, formatTime } from "../../../shared/lib/dateFns";
import type { Fixture } from "../../../shared/types/Fixture";
import type { FixtureStats } from "../../../shared/types/FixtureStats";

const PrimaryCard = ({ fixture, fixtureStats }: { fixture: Fixture; fixtureStats: FixtureStats | undefined }) => {
  return (
    <section
      style={{
        backgroundImage: `url('https://png.pngtree.com/thumb_back/fw800/background/20251027/pngtree-nighttime-sports-stadium-with-bright-floodlights-illuminating-the-field-and-spectator-image_20072238.webp')`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundClip: "padding-box",
      }}
      className="mt-2 border-2 border-[#0084ff]/25 rounded-lg overflow-hidden"
    >
      <div className="flex flex-col backdrop-blur-xs backdrop-brightness-75">
        <div className="flex flex-row justify-between items-center p-4 lg:p-8">
          <time dateTime={fixture.startTime.toISOString()} className="w-1/3 flex flex-row justify-start items-stretch gap-1">
            <span className="text-sm font-semibold text-white">{formatTime(fixture.startTime, "HH:mm")}</span>
            <span className="inline-block bg-linear-to-b from-[#FFFFFF]/0 via-[#0084ff] to-[#FFFFFF]/0 w-0.5"></span>
            <span className="text-sm font-semibold text-white">{formatDate(fixture.startTime, "dd/MM")}</span>
          </time>
          <div className="w-1/3 flex flex-row items-center gap-1 justify-center">
            <img src={fixture.sport.iconUrl} alt="" className="size-4" />
            <span className="text-xs uppercase">{fixture.sport.name}</span>
          </div>
          <div className="w-1/3 text-end text-sm truncate">{fixture.league.name}</div>
        </div>
        <div className="grid grid-cols-[1fr_auto_1fr] pb-2 px-4 lg:pb-8 lg:px-8">
          <div className="flex flex-col items-center justify-center overflow-hidden">
            <img className="w-20 h-20 object-contain rounded-md p-2 bg-[#ffffff]/5" src={fixture.homeTeam.logoUrl} alt="" />
            <span className="text-sm text-white text-center mt-1 truncate">{fixture.homeTeam.name}</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <p className="bg-linear-to-r from-[#DD1818]/0 via-[#DD1818] to-[#DD1818]/0 px-2 py-1 rounded-lg text-xs text-white flex items-center">
              <span className="bg-[#000000]/20 px-2 py rounded-sm">{fixtureStats?.fixture.status.short ?? "KXD"}</span>
              <span className="pl-2" hidden={fixtureStats?.fixture.status.elapsed === null}>
                {fixtureStats
                  ? (() => {
                      const { elapsed, extra } = fixtureStats.fixture.status;
                      const extraText = extra ? `+${extra}` : "";
                      return `${elapsed ?? "0"}${extraText}'`;
                    })()
                  : "---"}
              </span>
            </p>
            <p className="bg-[#000000]/50 border-x border-blue-500 rounded-full px-4 flex flex-row items-center gap-2">
              {fixture.isLive ? (
                <>
                  <strong>{fixtureStats?.goals.home ?? "---"}</strong>
                  <span>:</span>
                  <strong>{fixtureStats?.goals.away ?? "---"}</strong>
                </>
              ) : (
                <span className="font-bold">Vs</span>
              )}
            </p>
          </div>
          <div className="flex flex-col items-center justify-center overflow-hidden">
            <img className="w-20 h-20 object-contain rounded-md p-2 bg-[#ffffff]/5" src={fixture.awayTeam.logoUrl} alt="" />
            <span className="text-sm text-white text-center mt-1 truncate">{fixture.awayTeam.name}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrimaryCard;
