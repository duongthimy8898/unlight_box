import clsx from "clsx";
import { HiStatusOnline } from "react-icons/hi";
import { Link, useLocation, useParams } from "react-router-dom";
import { useDataContext } from "../../../../hooks/useDataContext";
import { useMemo } from "react";

const SportBar = () => {
  const location = useLocation();
  const { sports } = useDataContext();
  const { sportSlug } = useParams();
  const basePath = useMemo(() => {
    if (location.pathname.startsWith("/trang-chu")) return "lich-thi-dau";
    return location.pathname.split("/").at(1) ?? "lich-thi-dau";
  }, [location.pathname]);
  return (
    <div className={clsx("w-full max-w-[1660px] mx-auto flex flex-row justify-start gap-1 overflow-x-auto py-2 px-2 bg-gradient-to-t from-[#FFD703]/20 to-[#191A19] rounded-b-[12px]")}>
      <Link
        to="/trang-chu"
        className={clsx("relative px-2 py-1.5 flex-shrink-0 flex flex-row items-center gap-2 rounded-[12px] border-2 border-white/10", sportSlug === undefined && "bg-white/10")}
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
            "relative px-2 py-1.5 flex-shrink-0 flex flex-row items-center gap-2 rounded-[12px] border-2 border-white/10 transition-all hover:bg-white/10",
            sportSlug === sport.slug && "bg-white/10"
          )}
        >
          <img src={sport.iconUrl} alt="" className="w-6 h-6" />
          <span className="text-xs font-semibold">{sport.name}</span>
        </Link>
      ))}
    </div>
  );
};

export default SportBar;
