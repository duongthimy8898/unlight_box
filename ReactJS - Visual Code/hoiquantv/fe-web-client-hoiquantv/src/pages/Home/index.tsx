import { useDataContext } from "../../hooks/useDataContext";
import CarouselBanner from "./CarouselBanner";
import HotFixturesSlider from "./HotFixturesSlider";
import FixtureCard from "../components/FixtureCard";
import React, { useEffect, useState } from "react";
import type { Fixture } from "../../types/Fixture";
import HeroBanner from "../../layouts/MainLayout/components/HeroBanner";
import ReplaysSlider from "./ReplaysSlider";
import { LuArrowRight, LuVideo } from "react-icons/lu";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { MdLeaderboard } from "react-icons/md";
import BookmakerSlider from "./BookmakersSlider";
import bookmakers from "../../data/bookmakers";
import adBanners from "../../data/adBanners";
import adButtons from "../../data/adButtons";

const HomePage = () => {
  const { sports, fixtures } = useDataContext();

  const [loading, setLoading] = useState(true);
  const [pinnedFixtures, setPinnedFixtures] = useState<Fixture[]>([]);

  useEffect(() => {
    const simulateFilter = async () => {
      setLoading(true);

      const pinnedFixtures = (() => {
        if (!fixtures) return []; // hoặc null nếu bạn muốn

        const filtered = fixtures.filter((f) => f.isPinned && f.status?.code !== "FT");
        return filtered.length > 0 ? filtered : fixtures.slice(0, 5);
      })();
      pinnedFixtures.sort((a, b) => {
        return Number(b.isLive) - Number(a.isLive);
      });
      setPinnedFixtures(pinnedFixtures);
      setLoading(false);
    };

    simulateFilter();
    // console.log("Fixtures data has changed - " + Date.now());
  }, [fixtures]);
  const colorClassMap: Record<string, string> = {
    "#1D4ED8": "bg-blue-700",
    "#EAB308": "bg-yellow-500",
    "#F97316": "bg-orange-500",
  };
  return (
    <div className="w-full">
      {loading ? (
        <div className="w-full flex justify-center items-center py-20">
          <span className="text-lg font-semibold animate-pulse">Đang tải dữ liệu...</span>
        </div>
      ) : (
        <>
          <div className="w-full space-y-1 my-4 hidden dt:block">
            <h3 className="text-sm dt:text-[18px] font-bold text-center">
              HOIQUANTV xem trực tiếp eSports, Bóng đá, Bóng rổ, Bóng chuyền, Tennis online nhanh nhất - Hội Quán TV
            </h3>
            <p className="text-xs dt:text-sm text-center">
              HoiQuanTV là kênh cập nhật link xem trực tiếp eSports, bóng đá, bóng chuyền, bi-a và các môn thể thao khác cho Fan hâm mộ Việt Nam và Quốc tế
            </p>
          </div>

          <CarouselBanner />

          {/* hero banner */}
          <div className="w-full mt-4">
            <HeroBanner />
          </div>

          {/* Tâm điểm thể thao */}
          <div className="w-full mt-4 space-y-4 px-2">
            <div className="w-full flex justify-start items-center space-x-2">
              <div className="flex items-center space-x-2 flex-shrink-0">
                <img src="/assets/icons/icon-tamdiemthethao.png" alt="" className="w-[60px] h-[60px]" />
                <span className="text-[20px] font-semibold">TÂM ĐIỂM THỂ THAO</span>
              </div>
              <span className="flex-1 border-y border-[#0B2B53]"></span>
            </div>
            {pinnedFixtures.length === 0 ? (
              <div className="w-full flex justify-center items-center py-20">
                <span className="text-lg font-semibold animate-pulse">Không có dữ liệu...</span>
              </div>
            ) : (
              <div className="grid grid-cols-1 tb:grid-cols-2 dt:grid-cols-3 gap-2">
                {pinnedFixtures.map((f, idx) => (
                  <FixtureCard key={idx} fixture={f} isTamDiem={true} />
                ))}
              </div>
            )}
          </div>

          {/* nhom nut cuoc trang chu */}
          <section className="w-full mt-4 flex flex-col flex-wrap text-balance justify-center items-center gap-1 px-2">
            <div className="w-fit flex flex-row flex-wrap justify-center items-center gap-1">
              <div className="flex gap-1">
                {adButtons.GROUP_AT_HOME.slice(0, 4).map((button, idx) => (
                  <a
                    key={idx}
                    href={button.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex-1 flex-shink-0 block py-1 px-2 text-white rounded text-[10px] tb:text-sm lt:text-sm text-center font-semibold truncate ${
                      colorClassMap[button.color] ?? ""
                    }`}
                  >
                    {button.text}
                  </a>
                ))}
              </div>
              <div className="flex gap-1">
                {adButtons.GROUP_AT_HOME.slice(4, 8).map((button, idx) => (
                  <a
                    key={idx}
                    href={button.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex-1 flex-shink-0 block py-1 px-2 text-white rounded text-[10px] tb:text-sm lt:text-sm text-center font-semibold truncate ${
                      colorClassMap[button.color] ?? ""
                    }`}
                  >
                    {button.text}
                  </a>
                ))}
              </div>
            </div>
          </section>

          {/* Tâm điểm mỗi môn */}
          <div className="w-full mt-8 space-y-4">
            {sports.data
              ?.filter((s) => s.fixtureCount > 0)
              .map((s, index) => {
                const hotFixtures =
                  fixtures
                    ?.filter((f) => f.sport.id === s.id && f.status?.code !== "FT")
                    .sort((a, b) => {
                      if (b.isHot !== a.isHot) return Number(b.isHot) - Number(a.isHot); // hot trước
                      return new Date(a.startTime).getTime() - new Date(b.startTime).getTime(); // sau đó theo giờ
                    })
                    .slice(0, 5) ?? [];
                // console.log("hot", hotFixtures);
                return (
                  <React.Fragment key={index}>
                    <div className="w-full space-y-4 px-2">
                      <div className="w-full flex justify-start items-center space-x-2">
                        <div className="flex items-center space-x-2 flex-shrink-0">
                          <div className="w-[60px] h-[60px] bg-[url('/assets/imgs/sport-icon-wrapper.png')] bg-[length:100%_100%] bg-no-repeat p-5">
                            <img src={s.iconUrl} alt="" className="w-full h-full" />
                          </div>
                          <span className="text-base lt:text-[20px] font-semibold uppercase">{s.name}</span>
                        </div>
                        <span className="flex-1 border-y border-[#0B2B53]"></span>
                        <Link to={`/lich-thi-dau/${s.slug}`} className={clsx("flex items-center text-yellow-600", "hover:text-yellow-500")}>
                          <span className="text-xs lt:text-sm">Xem tất cả</span>
                          <LuArrowRight size={20} />
                        </Link>
                      </div>
                      <HotFixturesSlider fixtures={hotFixtures} />
                    </div>
                    <>
                      {/* banner moi section */}
                      <div className="w-full flex justify-center">
                        <a
                          href={adBanners.SPORT_SECTION[index % adBanners.SPORT_SECTION.length].href}
                          target="_blank"
                          className="w-full max-w-[720px] aspect-[1152/100]"
                        >
                          <img src={adBanners.SPORT_SECTION[index % adBanners.SPORT_SECTION.length].src} alt="" className="w-full aspect-[1152/100]" />
                        </a>
                      </div>
                    </>
                    {(index + 1) % 2 === 0 && (
                      <>
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
                );
              })}
          </div>

          {/* xem lai tran dau */}
          <div className="w-full flex flex-col gap-4 mt-4 px-2">
            <div className="w-full flex justify-start items-center space-x-2">
              <div className="flex items-center space-x-2 flex-shrink-0">
                <div className="w-[60px] h-[60px] bg-[url('/assets/imgs/sport-icon-wrapper.png')] bg-[length:100%_100%] bg-no-repeat p-5">
                  <LuVideo size={20} />
                </div>
                <span className="text-base lt:text-[20px] font-semibold uppercase">XEM LẠI TRẬN ĐẤU</span>
              </div>
              <span className="flex-1 border-y border-[#0B2B53]"></span>
              <Link to={`/xem-lai`} className={clsx("flex items-center text-yellow-600", "hover:text-yellow-500")}>
                <span className="text-xs lt:text-sm">Xem tất cả</span>
                <LuArrowRight size={20} />
              </Link>
            </div>
            {1 === Number(false) && <ReplaysSlider replays={[]} />}
          </div>
          <div className="w-full mt-4">
            <HeroBanner />
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage;
