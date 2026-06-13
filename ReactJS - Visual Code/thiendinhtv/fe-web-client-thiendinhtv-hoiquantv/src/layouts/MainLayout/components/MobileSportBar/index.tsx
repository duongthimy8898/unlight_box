import clsx from "clsx";
import { HiStatusOnline } from "react-icons/hi";
import { Link, useLocation, useParams } from "react-router-dom";
import { useDataContext } from "../../../../hooks/useDataContext";
import { useMemo } from "react";

const MobileSportBar = () => {
  const location = useLocation();
  const { sports } = useDataContext();
  const { sportSlug } = useParams();
  const basePath = useMemo(() => {
    if (location.pathname.startsWith("/trang-chu")) return "lich-thi-dau";
    return location.pathname.split("/").at(1) ?? "lich-thi-dau";
  }, [location.pathname]);
  return (
    <div className="w-full flex dt:hidden flex-row gap-2 overflow-x-auto py-1.5 px-1 border-y border-gray-700">
      <Link
        to="/trang-chu"
        className={clsx("relative px-2 py-1.5 flex-shrink-0 flex flex-row items-center gap-2 rounded", sportSlug === undefined && "bg-white/10")}
      >
        <i className="p-1 w-fit rounded-md bg-[#E91B27]">
          <HiStatusOnline size={16} />
        </i>
        <span className="text-xs font-semibold">Trực tuyến</span>
      </Link>
      {sports.data?.map((sport, idx) => (
        <Link
          key={idx}
          to={`/${basePath}/${sport.slug}`}
          className={clsx(
            "relative px-2 py-1.5 flex-shrink-0 flex flex-row items-center gap-2 rounded transition-all hover:bg-white/10",
            sportSlug === sport.slug && "bg-white/10"
          )}
        >
          {sport.hasLive && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[10px] font-semibold flex justify-center items-center aspect-square bg-[#E91B27] animate-pulse">
              {sport.liveFixtureCount}
            </span>
          )}
          <img src={sport.iconUrl} alt="" className="w-6 h-6" />
          <span className="text-xs font-semibold">{sport.name}</span>
        </Link>
      ))}
    </div>
  );
};

export default MobileSportBar;
