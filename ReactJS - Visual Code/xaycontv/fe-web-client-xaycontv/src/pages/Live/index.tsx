import { useDataContext } from "../../hooks/useDataContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import PlayingFixtureIn4 from "./components/PlayingFixtureIn4";
import PlayerBox from "./components/PlayerBox";
import InteractBox from "./components/InteractBox";
import { useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import RegularFixtureCard from "../../components/RegularFixtureCard";
import HeroAdBanners from "../../components/HeroAdBanners";
import { LuArrowRight } from "react-icons/lu";
import BookmakerSlider from "../../components/BookmakersSlider";
import bookmakers from "../../data/bookmakers";
const LivePage = () => {
  const navigate = useNavigate();
  const { sports, unfinishedFixtures } = useDataContext();

  const { sportSlug, fixtureSlug } = useParams();

  useEffect(() => {
    const handleBackButton = (event: { preventDefault: () => void }) => {
      event.preventDefault();
      navigate("/trang-chu");
    };

    window.addEventListener("popstate", handleBackButton);

    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, []); // fix dieu huong back ve trang truoc do
  const pageSport = useMemo(() => {
    console.log("pageSport changed");
    return sports.data?.find((s) => s.slug === sportSlug);
  }, [sports.data, sportSlug]);

  const fixtures = unfinishedFixtures.data?.filter((fixture) => fixture.sport.id === pageSport?.id) ?? [];
  const fixture = fixtures.find((f) => f.slug === fixtureSlug);

  const [isCleanViewMode, setClientViewMode] = useState<boolean>(false);
  useEffect(() => {
    if (isCleanViewMode) {
      document.body.style.overflow = "hidden !important";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isCleanViewMode]);
  return (
    <>
      <div className="my-1 lt:my-4"></div>
      {fixture && <PlayingFixtureIn4 fixture={fixture} />}
      <div className="my-1 lt:my-4"></div>
      <HeroAdBanners />
      <div className="my-1 lt:my-4"></div>
      <div
        className={clsx(
          "flex w-full max-w-[1660px] mx-auto flex-col lt:flex-row items-stretch gap-0 lt:gap-4",
          isCleanViewMode && "!gap-0 !fixed !top-0 !left-0 !w-full !max-w-none !h-full !z-[100] !bg-[#141414]"
        )}
      >
        <div className="flex-1 bg-gradient-to-t from-[#3E3D3A] via-transparent to-[#3E3D3A] rounded-t-[20px] lt:rounded-b-[8px] overflow-hidden">
          {/* <div className="w-full flex flex-row space-x-1 items-center justify-start py-2 px-4">
            <img src={fixture?.sport.iconUrl} alt="" className="w-5 h-5" />
            <span className="font-semibold">{fixture?.title}</span>
          </div> */}
          <div className="w-full h-full">
            <PlayerBox
              toggleClientViewMode={() => {
                setClientViewMode(!isCleanViewMode);
              }}
              isClientViewMode={isCleanViewMode}
              props={{
                poster: fixture?.sport?.posterUrl ?? "/default-player-poster.png",
                status: fixture?.isLive ? "READY" : "UPCOMING",
                startTime: fixture?.startTime,
                broadcasts: fixture?.fixtureCommentators.map((c) => ({
                  commentator: c.commentator,
                  streams: c.commentator.streams,
                })),
              }}
            />
          </div>
        </div>
        <div className="w-full lt:w-[360px] dt:w-[400px] bs:w-[450px] h-[500px] lt:h-auto bg-gradient-to-b from-transparent to-[#3E3D3A] rounded-t-0 rounded-b-[8px] overflow-hidden flex-shrink-0">
          <InteractBox referenceId={fixture?.referenceId} isClientViewMode={isCleanViewMode} chatChannelKeyId={fixture?.chatChannelKeyId} />
        </div>
      </div>
      <>
        {/* top nha cai */}
        <div className="w-full flex flex-col gap-4 mt-4 px-2 py-4 bg-white/10 rounded-[10px]">
          <div className="w-full flex justify-start items-center space-x-2">
            <div className="flex items-center space-x-2 flex-shrink-0">
              {/* <div className="w-[52px] h-[52px] flex justify-center items-center border-2 border-[#e2fe35] rounded-full">
                <MdLeaderboard color="#e2fe35" size={20} />
              </div> */}
              <span className="text-base text-yellow-500 lt:text-[20px] font-semibold uppercase">TOP NHÀ CÁI UY TÍN</span>
            </div>
            <span className="flex-1 border-y border-yellow-500/20"></span>
            <Link to={`/trang-chu`} className={clsx("flex items-center px-2 py-0.5 rounded-full bg-yellow-500 text-black", "hover:text-yellow-500")}>
              <span className="text-xs lt:text-sm">Tất cả</span>
              <LuArrowRight size={16} />
            </Link>
          </div>
          {1 === Number(true) && <BookmakerSlider bookmakers={bookmakers} />}
        </div>
      </>
      <hr className="my-4 border-t-2 border-gray-600" />
      <div className="w-full">
        <div className="flex flex-row space-x-2 items-center justify-start mb-4">
          <img src={pageSport?.iconUrl} alt="" className="w-6 h-6" />
          <span className="text-[20px] font-semibold">Các trận {pageSport?.name} khác</span>
        </div>
        <div className={clsx("grid gap-4", "grid-cols-1", "tb:grid-cols-2", "lt:grid-cols-3", "dt:grid-cols-4")}>
          {fixtures.map((fixture, idx) => (
            <RegularFixtureCard key={idx} fixture={fixture} />
          ))}
        </div>
        <div className="my-1 lt:my-4"></div>
        <HeroAdBanners />
      </div>
    </>
  );
};

export default LivePage;
