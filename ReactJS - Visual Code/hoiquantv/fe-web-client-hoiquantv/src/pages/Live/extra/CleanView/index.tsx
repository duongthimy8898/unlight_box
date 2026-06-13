import { useNavigate, useParams } from "react-router-dom";
import { useDataContext } from "../../../../hooks/useDataContext";
import { useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import "dayjs/locale/vi";
import type { Fixture } from "../../../../types/Fixture";
import PlayerBox from "./components/PlayerBox";
import InteractBox from "./components/InteractBox";
import "../../custom-artplayer.css";

dayjs.extend(weekday);
dayjs.locale("vi");

const CleanViewExtraPage = () => {
  const navigate = useNavigate();
  const { sports, fixtures } = useDataContext();
  const { sportSlug, fixtureId } = useParams();
  const [currentFixture, setCurrentFixture] = useState<Fixture>();

  const pageSport = useMemo(() => {
    return sports.data?.find((s) => s.slug === sportSlug);
  }, [sports.data, sportSlug]);

  useEffect(() => {
    if (!sports.data || !fixtures) return;

    if (!pageSport) {
      navigate("/trang-chu");
      return;
    }

    const fixture = fixtures.find((f) => f.id === Number(fixtureId));
    if (!fixture) {
      navigate("/trang-chu");
      return;
    }

    setCurrentFixture(fixture);
  }, [sportSlug, sports.data, fixtures, pageSport, fixtureId, navigate]);

  useEffect(() => {
    try {
      document.getElementById("view")?.requestFullscreen();
    } catch (error) {
      console.log("Cannot enable fullscreen mode", error);
    }
  }, []);

  return (
    <div id="view" className="fixed w-full h-full top-0 left-0 z-[150] bg-black">
      <div className="w-full h-full flex flex-col lt:flex-row">
        <div className="w-full h-auto lt:flex-1">
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
        <div className="flex-1 dt:flex-none lt:w-[360px] lt:h-auto dt:w-[400px]">
          <InteractBox chatChannelKeyId={currentFixture?.chatChannelKeyId} />
        </div>
      </div>
    </div>
  );
};

export default CleanViewExtraPage;
