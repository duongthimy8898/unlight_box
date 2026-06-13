import clsx from "clsx";
import { LuRadio } from "react-icons/lu";
import { Link } from "react-router-dom";
import CommentatorLabel from "../CommentatorLabel";
import { useHandleGlobalBetButtonClick } from "../../../hooks/useHandleGlobalBetButtonClick";
import type { Fixture } from "../../../types/Fixture";
import dayjs from "dayjs";
import { useDataContext } from "../../../hooks/useDataContext";

const FixtureCard = ({ fixture, isTamDiem = false }: { fixture: Fixture; isTamDiem?: boolean }) => {
  // console.log("test", fixture);
  const handleGlobalBetButtonClick = useHandleGlobalBetButtonClick();

  const { fixturesStats } = useDataContext();
  const fixtureStat = fixturesStats.data?.find((stat) => stat.fixture.id.toString() === fixture.referenceId);

  return (
    <Link
      to={`/truc-tiep/${fixture.sport.slug}/${fixture.league.slug}/${fixture.slug}/${fixture.id}`}
      className={clsx("block", "bg-[length:100%_100%] bg-no-repeat", "w-full rounded-[10px]")}
      style={{
        backgroundImage: `url(${!isTamDiem ? fixture.sport.backgroundCardUrl ?? "/assets/imgs/bg-fixture-card.png" : "/assets/imgs/bg-fixture-card.png"})`,
      }}
    >
      <div className="w-full flex flex-col">
        <div className="w-full py-4 px-4 flex justify-between">
          <div className="flex justify-start items-center space-x-1.5">
            <img src={fixture.league.logoUrl} alt="" className="w-5 h-5" />
            <span className="text-xs font-normal">{fixture.league.name}</span>
          </div>
          <div className="flex justify-end items-center space-x-1">
            <img src={fixture.sport.iconUrl} alt="" className="w-4 h-4" />
            <span className="text-xs font-light">{fixture.sport.name}</span>
          </div>
        </div>
        <div className="w-full grid grid-cols-[1fr_auto_1fr] gap-6 px-2">
          <div className="w-full flex flex-col space-y-2 items-center overflow-hidden">
            <img src={fixture.homeTeam.logoUrl} alt="" className="w-12 h-12" />
            <span className="w-full text-center text-xs font-medium truncate">{fixture.homeTeam.name}</span>
          </div>
          <div className="flex flex-col items-center space-y-2">
            {fixture.isLive ? (
              <>
                <div className="bg-red-500 px-2 py-0 h-5 flex justify-center items-center rounded-full space-x-1 animate-pulse">
                  <LuRadio />
                  <span className="text-[11px] font-normal">
                    {fixtureStat
                      ? (() => {
                          const { short, elapsed, extra } = fixtureStat.fixture.status;
                          const extraText = extra ? `+${extra}` : "";
                          return `${short} - ${elapsed}${extraText}'`;
                        })()
                      : "Live"}
                  </span>
                </div>
                <div className="flex justify-center items-center space-x-1 leading-none">
                  <span className="text-[24px] font-semibold">{fixtureStat?.goals?.home ?? 0}</span>
                  <span className="text-[24px]">-</span>
                  <span className="text-[24px] font-semibold">{fixtureStat?.goals?.away ?? 0}</span>
                </div>
              </>
            ) : (
              <>
                <div className="bg-yellow-500 px-2 py-0 h-5 flex justify-center items-center rounded-full space-x-1">
                  <span className="text-[11px] font-normal">Sắp diễn ra</span>
                </div>
                <div className="flex justify-center items-center space-x-1 leading-none">
                  <span className="text-[24px] font-semibold">vs</span>
                </div>
              </>
            )}
            <div className="block space-x-1 leading-none text-sm">
              <span className="font-semibold">{dayjs(fixture.startTime).format("HH:mm")}</span>
              <span>{dayjs(fixture.startTime).format("DD/MM/YYYY")}</span>
            </div>
          </div>
          <div className="w-full flex flex-col space-y-2 items-center overflow-hidden">
            <img src={fixture.awayTeam.logoUrl} alt="" className="w-12 h-12" />
            <span className="w-full text-center text-xs font-medium truncate">{fixture.awayTeam.name}</span>
          </div>
        </div>
        <div className="w-full py-4 px-4 gap-2 flex justify-between items-end">
          <CommentatorLabel commentators={fixture.fixtureCommentators} />
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleGlobalBetButtonClick();
            }}
            className={clsx(
              "flex-shrink-0",
              "px-4 py-1.5 rounded-full font-medium text-white text-xs transition",
              "bg-gradient-to-r from-green-600 via-green-400 to-green-700",
              "bg-[length:200%_200%] animate-gradient-x whitespace-nowrap"
            )}
          >
            Đặt cược
          </button>
        </div>
      </div>
    </Link>
  );
};

export default FixtureCard;
