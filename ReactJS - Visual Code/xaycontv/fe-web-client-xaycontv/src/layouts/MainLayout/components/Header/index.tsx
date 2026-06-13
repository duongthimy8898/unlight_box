import { Link, NavLink, useLocation } from "react-router-dom";
import { useDataContext } from "../../../../hooks/useDataContext";
import { BsPersonFill } from "react-icons/bs";
import clsx from "clsx";
// import { FaAd } from "react-icons/fa";
import adButtons from "../../../../data/adButtons";

const Header = () => {
  const location = useLocation();
  const { sports } = useDataContext();
  const isActiveBasePath = (basePath: string) => location.pathname.startsWith(basePath);
  
  const menuItems = [
    { label: "Trang chủ", path: "/trang-chu", exact: true },
    { label: "Lịch thi đấu", path: "/lich-thi-dau" },
    { label: "Kết quả", path: "/ket-qua" },
    { label: "Top nhà cái", path: "/top-nha-cai" },
  ];

  return (
    <div className="w-full bg-[#191A19] h-[60px] lt:h-[80px] py-2 lt:py-3 px-1.5 lt:px-3 flex flex-row gap-4 items-center justify-between shadow-sm lt:shadow-none shadow-gray-700">
      <Link to="/trang-chu" className="w-[150px] block">
        <img src="/logo-x-primary.png" alt="" className="w-full h-auto" />
      </Link>
      <div className={clsx("hidden lt:flex lt:flex-row")}>
        {menuItems.map((item) => {
          const to =
            item.path.includes("/lich-thi-dau") || item.path.includes("/ket-qua") || item.path.includes("/xem-lai")
              ? `${item.path}/${sports.data?.[0]?.slug}` // append slug nếu cần
              : item.path;

          const isActive = item.exact ? location.pathname === item.path : isActiveBasePath(item.path);

          return (
            <NavLink
              key={item.path}
              to={to}
              className={clsx(
                "px-4 py-2 text-sm font-semibold",
                isActive ? "text-yellow-500 border-b-2 border-yellow-500 rounded-[4px] font-bold" : "text-white",
              )}
            >
              {item.label}
            </NavLink>
          );
        })}
      </div>
      <div className="flex flex-row items-center gap-4">
        {/* <a href="mailto:ads.xaycontv@hotmail.com" target="_blank" className="hidden lt:flex flex-row items-center bg-gray-500 rounded-full">
          <i className="bg-yellow-300 text-black p-1.5 rounded-full border-2 border-[#F8C666] aspect-square">
            <FaAd />
          </i>
          <span className="text-xs ps-2 pe-3 text-yellow-300">ads.xaycontv@hotmail.com</span>
        </a> */}
        <a href={adButtons.GLOBAL.href} target="_blank" className="flex items-center bg-yellow-500 rounded-[12px] py-2 px-4">
          {/* <i className="bg-yellow-500 text-black p-1.5 rounded-full border-2 border-yellow-500 aspect-square">
            <BsBank size={16} />
          </i> */}
          <span className="block text-xs text-black font-semibold">Cược Ngay</span>
        </a>
        <button className="px-2 lt:px-3 py-2 flex space-x-1 items-center justify-center border-2 border-white rounded-full transition-all hover:bg-white hover:text-black">
          <BsPersonFill size={20} />
          <span className="hidden lt:block text-xs font-semibold">Tài khoản</span>
        </button>
      </div>
    </div>
  );
};

export default Header;
