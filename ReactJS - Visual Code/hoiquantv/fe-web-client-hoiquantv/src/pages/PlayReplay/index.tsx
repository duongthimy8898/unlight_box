import { Link, useNavigate, useParams } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import { useDataContext } from "../../hooks/useDataContext";
import { useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import "dayjs/locale/vi";
import type { Replay } from "../../types/Replay";
import PlayerBox from "./components/PlayerBox";
import "./custom-artplayer.css";
import HeroBanner from "../../layouts/MainLayout/components/HeroBanner";
import BookmakerSlider from "../Home/BookmakersSlider";
import { MdLeaderboard } from "react-icons/md";
import { LuArrowRight } from "react-icons/lu";
import ReplayCard from "./components/ReplayCard";
import bookmakers from "../../data/bookmakers";

dayjs.extend(weekday);
dayjs.locale("vi");

const PlayReplayPage = () => {
  const navigate = useNavigate();
  const { sports, replays } = useDataContext();
  const { sportSlug, replayId } = useParams();
  const [currentReplay, setCurrentReplay] = useState<Replay | undefined>(undefined);
  const pageSport = useMemo(() => {
    console.log("page-sportchaned");
    return sports.data?.find((s) => s.slug === sportSlug);
  }, [sports.data, sportSlug]);

  useEffect(() => {
    if (!sports.data || !replays.data) return;

    // kiểm tra điều kiện
    if (!pageSport) {
      navigate("/trang-chu");
      return;
    }

    const replay = replays.data.find((f) => f.id === Number(replayId));
    if (!replay) {
      navigate("/trang-chu");
      return;
    }
    console.log("live fix", replay);

    setCurrentReplay(replay);
  }, [sportSlug, sports.data, replays.data, pageSport, replayId, navigate]);
  console.log("pos", currentReplay?.sport?.posterUrl);
  return (
    <div className="w-full">
      <Breadcrumb
        segments={[
          { text: "▶️ Xem lại trận đấu", path: `xem-lai/${sportSlug}` },
          { text: pageSport?.name ?? "undefined", path: `xem-lai/${sportSlug}` },
          // { text: currentReplay?.league.name ?? "undefined", path: "lich-thi-dau" },
          {
            text: currentReplay?.title ?? "undefined",
            path: `xem-lai/${currentReplay?.sport.slug}/${currentReplay?.slug}/${currentReplay?.id}`,
          },
        ]}
      />
      <HeroBanner />

      <div className="mt-4 w-full flex flex-col lt:flex-row items-stretch gap-2">
        <div className="w-full lt:flex-1 h-auto">
          <PlayerBox
            props={{
              title: currentReplay?.title ?? "undefined",
              poster: currentReplay?.thumbnailUrl ?? "/assets/imgs/default-player-poster.png",
              source: currentReplay?.videoSourceUrl,
            }}
          />
        </div>
        <div className="hidden lt:block w-full px-2 lt:px-0 h-[512px] lt:w-[360px] lt:h-auto dt:w-[400px] dt:h-auto">
          <div className="flex flex-col gap-2">
            {replays.data?.slice(-3).map((o, idx) => (
              <ReplayCard key={idx} replay={o} />
            ))}
          </div>
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
      <div className="w-full mt-4 grid grid-cols-1 tb:grid-cols-2 lt:grid-cols-4 gap-2">
        {replays.data?.slice(-3).map((o, idx) => (
          <ReplayCard key={idx} replay={o} />
        ))}
      </div>
      <div className="w-full mt-4">
        <HeroBanner />
      </div>
    </div>
  );
};

export default PlayReplayPage;
