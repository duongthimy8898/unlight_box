// import LiveMatchCards from "../../components/LiveMatchCards";
import { useEffect, useState } from "react";
import AdsBannersElm from "../../components/AdsBannersElm";
import HotMatchCardsElm from "../../components/HotMatchCardsElm";
import MarqueeElm from "../../components/MarqueeElm";
import MatchCardsElm from "../../components/MatchCardsElm";
import { Match } from "../../types/Match.type";
import clsx from "clsx";
import MatchCardsApiElm from "../../components/MatchCardsApiElm";
import { mapToMatch, mapApiToMatch } from "../../utils/MatchUtils";
import LoadingContainerElm from "../../components/LoadingContainerElm";
import homeBanners from "../../data/adBanners/homeBanners";
// import dateToISO from "../../utils/DateFormat";

function HomePage() {
  const [loadingHot, setLoadingHot] = useState(true);
  const [loadingAll, setLoadingAll] = useState(true);
  const [loadingFiltered, setLoadingFiltered] = useState(true);

  const [dataHotMatches, setDataHotMatches] = useState<Match[]>([]);
  const [dataAllMatches, setDataAllMatches] = useState<Match[]>([]);
  const [filter, setFilter] = useState("live");
  const [filteredMatches, setFilteredMatches] = useState<Match[]>([]);
  useEffect(() => {
    const fetchDataHotMatches = async () => {
      try {
        const res = await fetch(`https://sv.tamquoctv.xyz/internal/api/matches?isPinned=true`);
        const result = await res.json();
        setDataHotMatches(await Promise.all(result.data.map(mapToMatch)));
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingHot(false);
      }
    };

    const fetchDataAllMatches = async () => {
      try {
        const res = await fetch(`https://sv.tamquoctv.xyz/internal/api/matches`);
        const result = await res.json();
        setDataAllMatches(await Promise.all(result.data.map(mapToMatch)));
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingAll(false);
      }
    };
    fetchDataHotMatches();
    fetchDataAllMatches();
  }, []);

  useEffect(() => {
    const fetchFilteredMatches = async () => {
      setLoadingFiltered(true);
      const baseApi = "https://api.livestats.online/api/v1/fixtures";
      const dateToISO = (d: Date) => new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
      const dateTimeToISO = (d: Date) => new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 19);
      const todayISO = dateToISO(new Date());
      const tomorrowISO = dateToISO(new Date(Date.now() + 86400000));
      const endPoint = (() => {
        switch (filter) {
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
        });
        const data = await res.json();
        // console.log(data.results);
        setFilteredMatches(await Promise.all<Match[]>(data.results.map(mapApiToMatch)));
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingFiltered(false);
      }
    };

    fetchFilteredMatches();
  }, [filter]);

  useEffect(() => {
    if (dataHotMatches.length === 0 && dataAllMatches.length > 0) {
      setDataHotMatches(dataAllMatches.slice(0, 2));
    }
  }, [dataHotMatches, dataAllMatches]);
  const isLoading = loadingHot || loadingAll || loadingFiltered;
  return isLoading ? (
    <LoadingContainerElm />
  ) : (
    <>
      <MarqueeElm />
      <div className="px-[8px] max-w-[1280px] mx-auto">
        <AdsBannersElm banners={homeBanners.HEADER} />
        <HotMatchCardsElm matches={dataHotMatches} />
        <AdsBannersElm banners={homeBanners.MIDDLE} />
        <MatchCardsElm matches={dataAllMatches} />
        <AdsBannersElm banners={homeBanners.UNDER} />
        <div className="flex gap-2 items-center my-6">
          <span className="flex-1 border-t-2 border-gray-500"></span>
        </div>
        <div className="w-full flex flex-row">
          <div className="hidden lg:flex flex-col">
            {homeBanners.ASIDE.LEFT.map((banner) => (
              <a className="w-full block" href={banner.href}>
                <img loading="lazy" className="block w-full" src={banner.src} />
              </a>
            ))}
          </div>
          <div className="px-[8px] max-w-[960px] mx-auto">
            <div className="w-full flex bg-[#2B2C2D] rounded-lg shadow overflow-auto">
              <button
                className={clsx(
                  (filter === "all" || filter === null) && "bg-[#DAB979] rounded-lg !text-black font-semibold",
                  "md:flex-1 text-center whitespace-nowrap flex-shrink-0 px-4 md:px-6 lg:px-8 py-2 text-sm text-white"
                )}
                onClick={() => setFilter("all")}
              >
                Tất cả
              </button>
              <button
                className={clsx(
                  filter === "live" && "bg-[#DAB979] rounded-lg !text-black font-semibold",
                  "md:flex-1 text-center whitespace-nowrap flex-shrink-0 px-4 md:px-6 lg:px-8 py-2 text-sm text-white"
                )}
                onClick={() => setFilter("live")}
              >
                Đang đá
              </button>
              <button
                className={clsx(
                  filter === "today" && "bg-[#DAB979] rounded-lg !text-black font-semibold",
                  "md:flex-1 text-center whitespace-nowrap flex-shrink-0 px-4 md:px-6 lg:px-8 py-2 text-sm text-white"
                )}
                onClick={() => setFilter("today")}
              >
                Hôm nay
              </button>
              <button
                className={clsx(
                  filter === "tomorrow" && "bg-[#DAB979] rounded-lg !text-black font-semibold",
                  "md:flex-1 text-center whitespace-nowrap flex-shrink-0 px-4 md:px-6 lg:px-8 py-2 text-sm text-white"
                )}
                onClick={() => setFilter("tomorrow")}
              >
                Ngày mai
              </button>
            </div>
            <div className="mt-4 w-full flex flex-col gap-2">
              <MatchCardsApiElm matches={filteredMatches} />
            </div>
          </div>
          <div className="hidden lg:flex flex-col">
            {homeBanners.ASIDE.RIGHT.map((banner) => (
              <a className="w-full block" href={banner.href}>
                <img loading="lazy" className="block w-full" src={banner.src} />
              </a>
            ))}
          </div>
        </div>
        <AdsBannersElm banners={homeBanners.BOTTOM} />
      </div>
    </>
  );
}

export default HomePage;
