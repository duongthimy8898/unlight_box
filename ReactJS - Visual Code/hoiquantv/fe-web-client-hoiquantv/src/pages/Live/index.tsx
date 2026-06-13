import { Link, useNavigate, useParams } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import { useDataContext } from "../../hooks/useDataContext";
import { useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import "dayjs/locale/vi";
import type { Fixture } from "../../types/Fixture";
import PlayerBox from "./components/PlayerBox";
import InteractBox from "./components/InteractBox";
import "./custom-artplayer.css";
import FixtureCard from "../components/FixtureCard";
import HeroBanner from "../../layouts/MainLayout/components/HeroBanner";
import BookmakerSlider from "../Home/BookmakersSlider";
import { MdLeaderboard } from "react-icons/md";
import { LuArrowRight } from "react-icons/lu";
import bookmakers from "../../data/bookmakers";

dayjs.extend(weekday);
dayjs.locale("vi");

const LivePage = () => {
  const navigate = useNavigate();
  const { sports, fixtures } = useDataContext();
  const { sportSlug, fixtureId } = useParams();
  const [currentFixture, setCurrentFixture] = useState<Fixture | undefined>(undefined);

  const pageSport = useMemo(() => {
    console.log("page-sportchaned");
    return sports.data?.find((s) => s.slug === sportSlug);
  }, [sports.data, sportSlug]);

  useEffect(() => {
    if (!sports.data || !fixtures) return;

    // kiểm tra điều kiện
    if (!pageSport) {
      navigate("/trang-chu");
      return;
    }

    const fixture = fixtures.find((f) => f.id === Number(fixtureId));
    if (!fixture) {
      navigate("/trang-chu");
      return;
    }
    // console.log("live fix", fixture);

    setCurrentFixture(fixture);
  }, [sportSlug, sports.data, fixtures, pageSport, fixtureId, navigate]);
  // console.log("pos", currentFixture?.sport?.posterUrl);
  const { fixturesStats } = useDataContext();
  const fixtureStat = fixturesStats.data?.find((stat) => stat.fixture.id.toString() === currentFixture?.referenceId);
  return (
    <div className="w-full">
      <Breadcrumb
        segments={[
          { text: "▶️ Trực tiếp", path: "trang-chu" },
          { text: pageSport?.name ?? "undefined", path: "lich-thi-dau" },
          // { text: currentFixture?.league.name ?? "undefined", path: "lich-thi-dau" },
          {
            text: currentFixture?.title ?? "undefined",
            path: `truc-tiep/${currentFixture?.sport.slug}/${currentFixture?.league.slug}/${currentFixture?.slug}/${currentFixture?.id}`,
          },
        ]}
      />
      <HeroBanner />
      <div
        className={clsx("block", "bg-cover bg-no-repeat", "w-full rounded-[10px] py-4 px-2 flex flex-col gap-4 lt:py-8 lt:px-8 lt:gap-8")}
        style={{
          backgroundImage: `url(${currentFixture?.sport.backgroundMainUrl ?? "/assets/imgs/bg-fixture-selected.png"})`,
        }}
      >
        <div className="col-span-3 flex flex-row lt:flex-col justify-center items-center gap-1 lt:gap-1.5">
          <img src={currentFixture?.league.logoUrl} alt="" className="w-6 h-6 lt:w-10 lt:h-10" />
          <span className="text-base lt:text-lg font-medium">{currentFixture?.league.name}</span>
        </div>
        <div className="w-full grid grid-cols-[1fr_auto_1fr] items-center gap-5 lt:gap-12">
          <div className="w-full flex flex-col-reverse items-center justify-center lt:flex-row lt:justify-end gap-4 overflow-hidden">
            <span className="w-full text-center lt:text-end text-sm lt:text-base font-medium truncate">{currentFixture?.homeTeam.name}</span>
            <img src={currentFixture?.homeTeam.logoUrl} alt="" className="w-14 h-14 lt:w-16 lt:h-16" />
          </div>
          <div className="flex flex-col items-center gap-2 lt:gap-4">
            {currentFixture?.isLive ? (
              <>
                <span className="text-xs uppercase font-medium text-red-500">
                  {fixtureStat
                    ? (() => {
                        const { short, elapsed, extra } = fixtureStat.fixture.status;
                        const extraText = extra ? `+${extra}` : "";
                        return `${short} - ${elapsed}${extraText}'`;
                      })()
                    : "Đang diễn ra"}
                </span>
                <div className="flex justify-center items-center space-x-1 leading-none">
                  <span className="text-[20px] font-semibold">{fixtureStat?.goals?.home ?? "0"}</span>
                  <span className="text-[20px]">-</span>
                  <span className="text-[20px] font-semibold">{fixtureStat?.goals?.away ?? "0"}</span>
                </div>
              </>
            ) : (
              <>
                <span className="text-xs uppercase font-medium text-yellow-500">Sắp diễn ra</span>
                <div className="flex justify-center items-center space-x-1 leading-none">
                  <span className="text-base font-semibold">vs</span>
                </div>
              </>
            )}
            <div className="block space-x-1 leading-none text-xs lt:text-base">
              <span className="font-semibold">{dayjs(currentFixture?.startTime).format("HH:mm")}</span>
              <span>{dayjs(currentFixture?.startTime).format("DD/MM/YYYY")}</span>
            </div>
          </div>
          <div className="w-full flex flex-col items-center justify-center lt:flex-row lt:justify-start gap-4 overflow-hidden">
            <img src={currentFixture?.awayTeam.logoUrl} alt="" className="w-14 h-14 lt:w-16 lt:h-16" />
            <span className="w-full text-center lt:text-start text-sm lt:text-base font-medium truncate">{currentFixture?.awayTeam.name}</span>
          </div>
        </div>
      </div>
      <div className="mt-4 w-full flex flex-col lt:flex-row items-stretch">
        <div className="w-full lt:flex-1 h-auto">
          <PlayerBox
            props={{
              poster: currentFixture?.sport?.posterUrl ?? "/assets/imgs/default-player-poster.png",
              status: currentFixture?.isLive ? "READY" : "UPCOMING",
              startTime: currentFixture?.startTime,
              broadcasts: currentFixture?.fixtureCommentators.map((c) => ({
                commentator: c.commentator,
                streams: c.commentator.streams,
              })),
            }}
          />
        </div>
        <div className="w-full px-2 lt:px-0 h-[512px] lt:w-[360px] lt:h-auto dt:w-[400px] dt:h-auto">
          <InteractBox referenceId={currentFixture?.referenceId} chatChannelKeyId={currentFixture?.chatChannelKeyId} />
        </div>
      </div>
      {/* top nha cai */}
      <div className="w-full flex flex-col gap-4 mt-4 px-2 py-4 bg-[url('/assets/imgs/bg-top-bookmaker.png')] bg-cover bg-center rounded-[10px] bg-no-repeat">
        <div className="w-full flex justify-start items-center space-x-2">
          <div className="flex items-center space-x-2 flex-shrink-0">
            <div className="w-[60px] h-[60px] bg-[url('/assets/imgs/sport-icon-wrapper.png')] bg-[length:100%_100%] bg-no-repeat p-5">
              <MdLeaderboard size={20} />
            </div>
            <span className="text-base lt:text-[20px] font-semibold uppercase">TOP NHÀ CÁI UY TÍN</span>
          </div>
          <span className="flex-1 border-y border-[#0B2B53]"></span>
          <Link to={`/xem-lai`} className={clsx("flex items-center text-yellow-600", "hover:text-yellow-500")}>
            <span className="text-xs lt:text-sm">Xem tất cả</span>
            <LuArrowRight size={20} />
          </Link>
        </div>
        {1 === Number(true) && <BookmakerSlider bookmakers={bookmakers} />}
      </div>
      <div className="mt-6 w-full space-y-4 px-2">
        <div className="w-full space-y-4">
          <div className="w-full flex justify-start items-center space-x-2">
            <div className="flex items-center space-x-2 flex-shrink-0">
              <div className="w-[60px] h-[60px] bg-[url('/assets/imgs/sport-icon-wrapper.png')] bg-[length:100%_100%] bg-no-repeat p-5">
                <img src={pageSport?.iconUrl} alt="" className="w-full h-full" />
              </div>
              <span className="text-[20px] font-semibold uppercase">CÁC TRẬN {pageSport?.name} KHÁC</span>
            </div>
            <span className="flex-1 border-y border-[#0B2B53]"></span>
          </div>

          <div className="grid grid-cols-1 tb:grid-cols-2 dt:grid-cols-3 gap-2">
            {fixtures
              ?.filter((f) => f.sport.id === pageSport?.id && f.status?.code !== "FT")
              .map((f, idx) => (
                <FixtureCard key={idx} fixture={f} />
              ))}
          </div>
        </div>
      </div>
      <div className="w-full mt-4">
        <HeroBanner />
      </div>
    </div>
  );
};

export default LivePage;
