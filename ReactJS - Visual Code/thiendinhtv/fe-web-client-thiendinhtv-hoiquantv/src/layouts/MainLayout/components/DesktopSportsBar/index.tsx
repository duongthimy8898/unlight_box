import clsx from "clsx";
import { HiStatusOnline } from "react-icons/hi";
import { Link, useLocation, useParams } from "react-router-dom";
import { useDataContext } from "../../../../hooks/useDataContext";
import { useMemo } from "react";

const DesktopSportsBar = () => {
  const { sports } = useDataContext();
  const { sportSlug } = useParams();
  const location = useLocation();
  const basePath = useMemo(() => {
    if (location.pathname.startsWith("/trang-chu")) return "lich-thi-dau";
    return location.pathname.split("/").at(1) ?? "lich-thi-dau";
  }, [location.pathname]);
  return (
    <div className="hidden dt:flex bg-[#141414] fixed top-0 left-0 w-[128px] h-screen flex-col items-center z-50 shadow-sm shadow-gray-500 px-4">
      <div className="w-full flex flex-col items-center py-6 gap-1">
        <p className="text-[18px] font-bold">T4, 14:23</p>
        <p className="bg-[#C4E456] font-semibold text-black px-2 text-sm rounded-sm">12/11/2025</p>
      </div>
      <div className="w-full flex-1 flex flex-col gap-2 overflow-y-auto">
        <Link to="/trang-chu" className={clsx("relative px-2 py-4 flex flex-col items-center gap-2 rounded", sportSlug === undefined && "bg-white/10")}>
          <i className="p-2 w-fit rounded-md bg-[#E91B27] shadow-lg shadow-[#E91B27]">
            <HiStatusOnline size={20} />
          </i>
          <span className="text-xs font-semibold">Trực tuyến</span>
        </Link>
        {sports.data?.map((sport, idx) => (
            <Link
              key={idx}
              to={`/${basePath}/${sport.slug}`}
              className={clsx(
                "relative px-2 py-4 flex flex-col items-center gap-2 rounded transition-all hover:bg-white/10",
                sportSlug === sport.slug && "bg-white/10"
              )}
            >
              {sport.hasLive && <span className="absolute top-2 right-2 w-5 h-5 rounded-full text-xs font-semibold flex justify-center items-center aspect-square bg-[#E91B27] animate-pulse">{sport.liveFixtureCount}</span>}
              <img src={sport.iconUrl} alt="" className="w-9 h-9" />
              <span className="text-xs font-semibold">{sport.name}</span>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default DesktopSportsBar;
