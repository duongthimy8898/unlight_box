import { useDataContext } from "../../hooks/useDataContext";
import { useParams } from "react-router-dom";
import { useMemo } from "react";
import HeroAdBanners from "../../components/HeroAdBanners";

const ReplaysPage = () => {
  const { sports } = useDataContext();
  const { sportSlug } = useParams();

  const pageSport = useMemo(() => {
    console.log("pageSport changed");
    return sports.data?.find((s) => s.slug === sportSlug);
  }, [sports.data, sportSlug]);

  // const fixtures = unfinishedFixtures.data?.filter((fixture) => fixture.sport.id === pageSport?.id) ?? [];

  return (
    <>
      <div className="w-full min-h-screen">
        <div className="flex flex-row space-x-2 items-center justify-start mb-4">
          <img src={pageSport?.iconUrl} alt="" className="w-8 h-8" />
          <span className="text-[20px] font-semibold">Xem lại {pageSport?.name}</span>
        </div>
        <div className="my-4"></div>
        <HeroAdBanners />
        <div className="my-4"></div>
        <div className="w-full flex flex-row justify-center gap-2">
          <input
            type="text"
            placeholder="🔍 Tìm kiếm theo tên trận đấu..."
            className="flex-1 max-w-[480px] bg-white/20 rounded px-2 py-2 outline-none focus:ring-2 focus:ring-[#C4E456] text-sm"
          />
          <button type="button" className="bg-[#C4E456] text-black text-sm font-semibold rounded px-4 py-2">
            Tìm kiếm
          </button>
        </div>
        <div className="my-4"></div>
        <div className={`w-full h-full flex items-center justify-center text-center text-gray-400 py-20 bg-white/10 rounded`}>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mx-auto mb-2 h-12 w-12 text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2a4 4 0 014-4h3M9 17H5a2 2 0 01-2-2v-3m0 0h0m16 0v3a2 2 0 01-2 2h-4m0 0v2m0-2H9" />
            </svg>
            <p className="text-lg font-semibold">{"Không có dữ liệu"}</p>
          </div>
        </div>
      </div>
      <div className="my-4"></div>
      <HeroAdBanners />
    </>
  );
};

export default ReplaysPage;
