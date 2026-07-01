import { useEffect, useRef, useState } from "react";
import useContainerLoader from "../../hooks/useContainerLoader.hook";
import HeroBanners from "./components/HeroBanners";
import type { Match } from "../../types/Match.type";
import { mapApiToMatch, mapToMatch } from "./utils/MatchUtils";
import PinnedMatches from "./components/PinnedMatches";
import HotMatches from "./components/HotMatches";
// import LiveMatches from "./components/LiveMatches";
import AllMatches from "./components/AllMatches";
import type { AdsBannerGroup } from "../../types/AdsBannerGroup";
import { useSearchParams } from "react-router-dom";
import homePageBanners from "../../data/adBanners/homePageBanners";

const HomePage = () => {
  const [bannerGroups] = useState<AdsBannerGroup[]>(homePageBanners.HERO);
  const { setLoading } = useContainerLoader();
  const [pinnedMatches, setPinnedMatches] = useState<Match[]>([]);
  const [hotMatches, setHotMatches] = useState<Match[]>([]);
  const [allMatches, setAllMatches] = useState<Match[]>([]);
  const [filter, setFilter] = useState<string>("live");
  const [searchParams] = useSearchParams();
  const firstLoad = useRef(true);

  useEffect(() => {
    const controllerInit = new AbortController();
    const controllerEx = new AbortController();
    const fetchInitialData = async () => {
      try {
        const [pinnedRes, hotRes] = await Promise.all([
          fetch("https://sv.bugiotv.xyz/internal/api/matches?isPinned=true", {
            signal: controllerInit.signal,
          }).then((r) => r.json()),
          fetch("https://sv.bugiotv.xyz/internal/api/matches", {
            signal: controllerInit.signal,
          }).then((r) => r.json()),
        ]);
        const hot = Array.isArray(hotRes.data) ? await Promise.all(hotRes.data.map(mapToMatch)) : [];
        const pinned = Array.isArray(pinnedRes.data) ? await Promise.all(pinnedRes.data.map(mapToMatch)) : [];
        setHotMatches(hot);
        setPinnedMatches(pinned.length ? pinned.slice(0, 2) : hot.slice(0, 2));
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        if (err.name !== "AbortError") console.error("Lỗi khi load pinned/hot:", err);
      }
    };

    const fetchExData = async () => {
      const filterParam = (searchParams.get("filter") ?? "live").toLowerCase();
      setFilter(filterParam);
      const dateToISO = (d: Date) => new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
      const dateTimeToISO = (d: Date) => new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 19);
      const todayISO = dateToISO(new Date());
      const tomorrowISO = dateToISO(new Date(Date.now() + 86400000));

      const baseApi = "https://api.livestats.online/api/v1/fixtures";

      const endPoint = (() => {
        switch (filterParam) {
          case "live":
            return `${baseApi}?limit=25&isPlaying=true`;
          case "today":
            return `${baseApi}?limit=25&date=${todayISO}`;
          case "tomorrow":
            return `${baseApi}?limit=25&date=${tomorrowISO}`;
          case "all":
            return `${baseApi}?limit=25&fromDateTime=${dateTimeToISO(new Date())}&toDateTime=${dateTimeToISO(new Date(Date.now() + 86400000 * 7))}`;
          default:
            return `${baseApi}?limit=25&isPlaying=true`;
        }
      })();

      try {
        const res = await fetch(endPoint, {
          headers: { "Access-Token": "AB321C" },
          signal: controllerEx.signal,
        });
        const data = await res.json();

        if (data.code !== 200) return;

        const mapped = data.results.map(mapApiToMatch);
        setAllMatches(mapped);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        console.error("Lỗi khi gọi API fixture:", err);
      }
    };

    const loadAll = async () => {
      if (firstLoad.current) {
        console.log("Đang tải dữ liệu lần đầu...");
        setLoading(true);
      }
      await Promise.all([fetchInitialData(), fetchExData()]);
      // await sleep(500);
      if (firstLoad.current) {
        setLoading(false);
        firstLoad.current = false;
      }
    };

    loadAll();

    return () => {
      controllerInit.abort();
      controllerEx.abort();
    };
  }, [searchParams, setLoading]);

  // useEffect(() => {
  //   const intervalInternalMatches = setInterval(async () => {
  //     if (firstLoad.current) return; // chưa tải xong lần đầu, bỏ qua

  //     try {
  //       const [pinnedRes, hotRes] = await Promise.all([
  //         fetch("https://sv.bugiotv.xyz/internal/api/matches?isPinned=true").then((r) => r.json()),
  //         fetch("https://sv.bugiotv.xyz/internal/api/matches").then((r) => r.json()),
  //       ]);

  //       const hot = Array.isArray(hotRes.data) ? await Promise.all(hotRes.data.map(mapToMatch)) : [];
  //       const pinned = Array.isArray(pinnedRes.data) ? await Promise.all(pinnedRes.data.map(mapToMatch)) : [];

  //       setHotMatches(hot);
  //       setPinnedMatches(pinned.length ? pinned.slice(0, 2) : hot.slice(0, 2));
  //     } catch (err) {
  //       console.warn("Lỗi update ngầm:", err);
  //     }
  //   }, 5000);

  //   const intervalExMatches = setInterval(async () => {
  //     if (firstLoad.current) return; // chưa tải xong lần đầu, bỏ qua
  //     const dateToISO = (d: Date) => new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  //     const dateTimeToISO = (d: Date) => new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 19);
  //     const todayISO = dateToISO(new Date());
  //     const tomorrowISO = dateToISO(new Date(Date.now() + 86400000));
  //     const baseApi = "https://api-sv2.livestats.online/api/v1/fixtures";
  //     const endPoint = (() => {
  //       switch (filter) {
  //         case "live":
  //           return `${baseApi}?limit=25&isPlaying=true`;
  //         case "today":
  //           return `${baseApi}?limit=25&date=${todayISO}`;
  //         case "tomorrow":
  //           return `${baseApi}?limit=25&date=${tomorrowISO}`;
  //         case "all":
  //           return `${baseApi}?limit=25&fromDateTime=${dateTimeToISO(new Date())}&toDateTime=${dateTimeToISO(new Date(Date.now() + 86400000 * 7))}`;
  //         default:
  //           return `${baseApi}?limit=25&isPlaying=true`;
  //       }
  //     })();

  //     try {
  //       const res = await fetch(endPoint, {
  //         headers: { "Access-Token": "AB321C" },
  //       });
  //       const data = await res.json();
  //       if (data.code !== 200) return;

  //       // console.log(data.results.map((m) => m.start_date_formatted));
  //       const mapped = data.results.map(mapApiToMatch);
  //       setAllMatches(mapped);
  //       // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //     } catch (err: any) {
  //       console.error("Lỗi khi gọi API fixture:", err);
  //     }
  //   }, 5000);

  //   return () => {
  //     clearInterval(intervalInternalMatches);
  //     clearInterval(intervalExMatches);
  //   };
  // }, [filter]);

  // console.log(bannerGroups);
  return (
    <>
      <div className="my-2"></div>
      {bannerGroups[0]?.banners && <HeroBanners banners={bannerGroups[0].banners} />}
      <div className="my-2"></div>
      <PinnedMatches matches={pinnedMatches} />
      <div className="my-2"></div>
      {bannerGroups[0]?.banners && <HeroBanners banners={bannerGroups[1].banners} />}
      <div className="my-2"></div>
      {/* <LiveMatches matches={liveMatches} /> */}
      {/* <div className="my-2"></div> */}
      {/* <HeroBanners /> */}
      {/* <div className="my-2"></div> */}
      <HotMatches matches={hotMatches} />
      <div className="my-2"></div>
      {bannerGroups[0]?.banners && <HeroBanners banners={bannerGroups[2].banners} />}
      <div className="my-2"></div>
      <AllMatches matches={allMatches} filter={filter} />
      <div className="my-2"></div>
      {bannerGroups[0]?.banners && <HeroBanners banners={bannerGroups[3].banners} />}
      <div className="my-2"></div>
    </>
  );
};
export default HomePage;
