// import { useParams } from "react-router-dom";
import MarqueeElm from "../../components/MarqueeElm";
import AdsBannersElm from "../../components/AdsBannersElm";
import MatchCardsElm from "../../components/MatchCardsElm";
import CurrentLiveMatchElm from "../../components/CurrentLiveMatchElm";
import PlayerAndChatboxElm from "../../components/PlayerAndChatboxElm";
import { useEffect, useState } from "react";
import { Match } from "../../types/Match.type";
import { useNavigate, useParams } from "react-router-dom";
import { mapToMatch } from "../../utils/MatchUtils";
import LoadingContainerElm from "../../components/LoadingContainerElm";
import liveBanners from "../../data/adBanners/liveBanners";
// import PlayerAndChatboxElm from "../../components/PlayerAndChatboxElm";

function LiveStreamPage() {
  // const [loadingCurrent, setLoadingCurrent] = useState(true);
  const [loadingAll, setLoadingAll] = useState(true);
  const { slugAndId } = useParams();
  const [slug, id] = (slugAndId ?? "").split("-I"); // giữ nguyên cách tách
  console.log(slug);

  const navigate = useNavigate();

  const [dataCurrentMatch, setDataCurrentMatch] = useState<Match>();
  const [dataAllMatches, setDataAllMatches] = useState<Match[]>([]);

  useEffect(() => {
    if (!id) return;

    let controller = new AbortController();

    // ---- Gọi dữ liệu trận hiện tại MỘT LẦN ----
    const loadCurrentMatch = async () => {
      // setLoadingCurrent(true);
      try {
        const res = await fetch(`https://sv.tamquoctv.xyz/internal/api/matches/${id}`);
        // console.log("hot", res);
        const result = await res.json();

        if (result.code === 200) {
          const mapped = await mapToMatch(result.data);

          setDataCurrentMatch(mapped);
        } else {
          navigate("/"); // Không tìm thấy ⇒ redirect về trang chủ
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        if (err.name !== "AbortError") {
          console.error("Lỗi khi gọi API trận hiện tại:", err);
        } else {
          console.error("Lỗi khi gọi API trận hiện tại:", err);
        }
      } finally {
        // setLoadingCurrent(false); // 👉 kết thúc loading
      }
    };

    // ---- Gọi dữ liệu tất cả trận mỗi 5s ----
    const loadAllMatches = async () => {
      controller = new AbortController(); // tạo signal mới
      setLoadingAll(true);
      try {
        const res = await fetch("https://sv.tamquoctv.xyz/internal/api/matches", {
          signal: controller.signal,
        });
        const all = await res.json();
        const mapped = await Promise.all(all.data.map(mapToMatch));
        setDataAllMatches(mapped);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        if (err.name !== "AbortError") {
          console.error("Lỗi khi gọi API all matches:", err);
        }
      } finally {
        setLoadingAll(false);
      }
    };

    // Gọi 1 lần khi mount
    loadCurrentMatch();
    loadAllMatches();

    // Cập nhật allMatches mỗi 5 giây
    const intervalId1 = setInterval(loadCurrentMatch, 10000);

    return () => {
      clearInterval(intervalId1);
      controller.abort();
    };
  }, [id, navigate]);
  const isLoading = loadingAll;
  return isLoading ? (
    <LoadingContainerElm />
  ) : (
    <>
      <MarqueeElm />
      <div className="px-[8px] max-w-[1280px] mx-auto">
        <AdsBannersElm banners={liveBanners.HEADER} />
        {dataCurrentMatch && <CurrentLiveMatchElm match={dataCurrentMatch} />}
        <AdsBannersElm banners={liveBanners.MIDDLE} />
        {dataCurrentMatch && <PlayerAndChatboxElm match={dataCurrentMatch} />}
        <AdsBannersElm banners={liveBanners.UNDER} />
        <MatchCardsElm matches={dataAllMatches} />
        <AdsBannersElm banners={liveBanners.BOTTOM} />
      </div>
    </>
  );
}

export default LiveStreamPage;
