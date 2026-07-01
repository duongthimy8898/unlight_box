import { useNavigate, useParams } from "react-router-dom";
import HeroBanners from "./components/HeroBanners";
import CurrentMatch from "./components/CurrentMatch";
import type { Match } from "../../types/Match.type";
import { useEffect, useRef, useState } from "react";
import useContainerLoader from "../../hooks/useContainerLoader.hook";
import { mapToMatch } from "../Home/utils/MatchUtils";
// import LiveMatches from "./components/LiveMatches";
import HotMatches from "./components/HotMatches";
import ViewContainer from "./components/ViewContainer";
// import AllMatches from "./components/AllMatches";
import type { AdsBannerGroup } from "../../types/AdsBannerGroup";
import livePageBanners from "../../data/adBanners/livePageBanners";

const LivePage = () => {
  const { setLoading } = useContainerLoader();
  const navigate = useNavigate();
  const firstLoad = useRef(true);
  const [currentMatch, setCurrentMatch] = useState<Match>();
  const [hotMatches, setHotMatches] = useState<Match[]>([]);
  // const [allMatches] = useState<Match[]>([]);
  const { slugAndId } = useParams();
  const [slug, id] = (slugAndId ?? "").split("-I");
  console.log(slug, id);

  const [bannerGroups] = useState<AdsBannerGroup[]>(livePageBanners.HERO);

  useEffect(() => {
    const controllerInit = new AbortController();
    const fetchData = async () => {
      setLoading(true);
      try {
        const [currentRes, hotRes] = await Promise.all([
          fetch("https://sv.bugiotv.xyz/internal/api/matches/" + id, {
            signal: controllerInit.signal,
          }).then((res) => res.json()),

          fetch("https://sv.bugiotv.xyz/internal/api/matches", {
            signal: controllerInit.signal,
          }).then((res) => res.json()),
        ]);
        let currentMatchMapped: Match | undefined = undefined;
        let hotMatchesMapped: Match[] = [];
        if (currentRes.code === 200) currentMatchMapped = await mapToMatch(currentRes.data);
        if (hotRes.code === 200) hotMatchesMapped = Array.isArray(hotRes.data) ? await Promise.all(hotRes.data.map(mapToMatch)) : [];
        if (currentMatchMapped) setCurrentMatch(currentMatchMapped);
        else navigate("/");
        setHotMatches(hotMatchesMapped);
      } catch (err) {
        if ((err as DOMException).name !== "AbortError") {
          // console.error("Lỗi khi gọi API:", err);
          navigate("/trang-chu");
          return;
        }
      } finally {
        if (!controllerInit.signal.aborted) {
          setLoading(false);
        }
        setLoading(false);
        firstLoad.current = false; // Đánh dấu đã tải xong lần đầu
      }
    };
    fetchData();
    return () => {
      controllerInit.abort();
    };
  }, [setLoading, id, navigate]);

  useEffect(() => {
    let controllerInit = new AbortController();
    const intervalInternalMatches = setInterval(async () => {
      if (firstLoad.current) return; // chưa tải xong lần đầu, bỏ qua
      controllerInit = new AbortController(); // Tạo controller mới mỗi lần gọi API
      try {
        const [currentRes] = await Promise.all([
          fetch("https://sv.bugiotv.xyz/internal/api/matches/" + id, {
            signal: controllerInit.signal,
          }).then((res) => res.json()),
        ]);
        let currentMatchMapped: Match | undefined = undefined;
        if (currentRes.code === 200) currentMatchMapped = await mapToMatch(currentRes.data);
        if (currentMatchMapped) setCurrentMatch(currentMatchMapped);
        // else navigate("/");
      } catch (err) {
        if ((err as DOMException).name !== "AbortError") {
          // console.error("Lỗi khi gọi API:", err);
          // navigate("/trang-chu");
        }
      }
    }, 30000);

    return () => {
      clearInterval(intervalInternalMatches);
    };
  }, [id /*, navigate*/]);

  return (
    currentMatch && (
      <>
        <div className="my-2"></div>
        <HeroBanners banners={bannerGroups[0].banners} />
        <div className="my-2"></div>
        <CurrentMatch match={currentMatch} />
        <div className="my-2"></div>
        <HeroBanners banners={bannerGroups[1].banners} />
        <div className="my-2"></div>
        <ViewContainer match={currentMatch} />
        <div className="my-2"></div>
        <HeroBanners banners={bannerGroups[2].banners} />
        <div className="my-2"></div>
        {/* <LiveMatches matches={liveMatches} />
        <div className="my-2"></div>
        <HeroBanners />
        <div className="my-2"></div> */}
        <HotMatches matches={hotMatches} />
        <div className="my-2"></div>
        <HeroBanners banners={bannerGroups[3].banners} />
        {/* <div className="my-2"></div> */}
        {/* <AllMatches matches={allMatches} /> */}
      </>
    )
  );
};
export default LivePage;
