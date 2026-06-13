import { RiFocus2Line } from "react-icons/ri";
import IntroBanner from "./components/IntroBanner";
import clsx from "clsx";
import { useDataContext } from "../../hooks/useDataContext";
import FeaturedFixtureCard from "../../components/FeaturedFixtureCard";
import SportSection from "./components/SportSection";
import HeroAdBanners from "../../components/HeroAdBanners";
import adButtons from "../../data/adButtons";
import adBanners from "../../data/adBanners";
import { MdLeaderboard } from "react-icons/md";
import { Link } from "react-router-dom";
import { LuArrowRight } from "react-icons/lu";
import BookmakerSlider from "../../components/BookmakersSlider";
import bookmakers from "../../data/bookmakers";
import React from "react";

const HomePage = () => {
  const { sports, featuredFixtures, unfinishedFixtures } = useDataContext();
  const bgColorClassMap: Record<string, string> = {
    "#1D4ED8": "bg-blue-700",
    "#EAB308": "bg-yellow-500",
    "#F97316": "bg-green-500",
  };
  return (
    <>
      <IntroBanner />
      <div className="my-4"></div>
      <HeroAdBanners />
      <div className="my-4"></div>
      <div className="w-full">
        <div className="flex flex-row space-x-1 items-center justify-start mb-4">
          <RiFocus2Line size={32} color="#C4E456" />
          <span className="text-[20px] font-semibold">Tâm Điểm Thể Thao</span>
        </div>
        <div className={clsx("grid gap-2", "grid-cols-1", "tb:grid-cols-1", "lt:grid-cols-2", "dt:grid-cols-4")}>
          {(featuredFixtures?.length ? featuredFixtures : unfinishedFixtures.data?.slice(0, 4) ?? []).map((fixture, idx) => (
            <FeaturedFixtureCard key={idx} fixture={fixture} />
          ))}
        </div>
      </div>
      <div className="my-4"></div>
      <div className="hidden lt:flex w-full flex-row gap-2 flex-wrap justify-center items-center">
        {adButtons.GROUP_AT_HOME.DESKTOP.map((adButton, idx) => (
          <a
            key={idx}
            href={adButton.href}
            rel="noopener noreferrer"
            className={`flex-shink-0 block py-1 px-2 text-white rounded text-[10px] tb:text-sm lt:text-sm text-center font-semibold truncate ${
              bgColorClassMap[adButton.color] ?? ""
            }`}
          >
            {adButton.text}
          </a>
        ))}
      </div>
      <div className="flex lt:hidden w-full flex-row gap-2 flex-wrap justify-center items-center">
        {adButtons.GROUP_AT_HOME.MOBILE.map((adButton, idx) => (
          <a
            key={idx}
            href={adButton.href}
            rel="noopener noreferrer"
            className={`flex-shink-0 block py-1 px-2 text-white rounded text-[10px] tb:text-sm lt:text-sm text-center font-semibold truncate ${
              bgColorClassMap[adButton.color] ?? ""
            }`}
          >
            {adButton.text}
          </a>
        ))}
      </div>
      <hr className="my-4 border-t-2 border-gray-600" />
      <div className="w-full flex flex-col gap-4">
        {sports.data
          ?.filter((sport) => sport.fixtureCount > 0)
          .map((sport, idx) => (
            <React.Fragment key={idx}>
              <SportSection
                key={idx}
                props={{
                  sport: sport,
                  fixtures: unfinishedFixtures.data?.filter((fixture) => fixture.sport.id === sport.id) ?? [],
                }}
              />
              {/* banner moi section */}
              <div className="w-full flex justify-center">
                <a href={adBanners.SPORT_SECTION[idx % adBanners.SPORT_SECTION.length].href} target="_blank" className="w-full max-w-[720px] aspect-[1152/100]">
                  <img src={adBanners.SPORT_SECTION[idx % adBanners.SPORT_SECTION.length].src} alt="" className="w-full aspect-[1152/100]" />
                </a>
              </div>
              {(idx + 1) % 2 === 0 && (
                <>
                  {/* top nha cai */}
                  <div className="w-full flex flex-col gap-4 mt-4 px-2 py-4 bg-white/10 rounded-[10px]">
                    <div className="w-full flex justify-start items-center space-x-2">
                      <div className="flex items-center space-x-2 flex-shrink-0">
                        <div className="w-[52px] h-[52px] flex justify-center items-center border-2 border-[#e2fe35] rounded-full">
                          <MdLeaderboard color="#e2fe35" size={20} />
                        </div>
                        <span className="text-base text-[#e2fe35] lt:text-[20px] font-semibold uppercase">TOP NHÀ CÁI UY TÍN</span>
                      </div>
                      <span className="flex-1 border-y border-[#e2fe35]/20"></span>
                      <Link to={`/trang-chu`} className={clsx("flex items-center text-yellow-600", "hover:text-yellow-500")}>
                        <span className="text-xs lt:text-sm">Xem tất cả</span>
                        <LuArrowRight size={20} />
                      </Link>
                    </div>
                    {1 === Number(true) && <BookmakerSlider bookmakers={bookmakers} />}
                  </div>
                </>
              )}
            </React.Fragment>
          ))}
      </div>
    </>
  );
};

export default HomePage;
