import clsx from "clsx";
import { IoCalendar, IoHome } from "react-icons/io5";
import { MdScore } from "react-icons/md";
import { NavLink, useLocation } from "react-router-dom";
import { useDataContext } from "../../../../hooks/useDataContext";
import { FaRankingStar } from "react-icons/fa6";

const MobileMenu = () => {
  const location = useLocation();
  const { sports } = useDataContext();

  // Helper check active base path
  const isActiveBasePath = (basePath: string) => location.pathname.startsWith(basePath);

  // Menu items
  const menuItems = [
    { label: "Trang chủ", icon: <IoHome size={16} />, path: "/trang-chu", exact: true },
    { label: "Lịch thi đấu", icon: <IoCalendar size={16} />, path: "/lich-thi-dau" },
    { label: "Kết quả", icon: <MdScore size={16} />, path: "/ket-qua" },
    { label: "Top nhà cái", icon: <FaRankingStar size={16} />, path: "/top-nha-cai" },
  ];

  return (
    <div className="block lt:hidden fixed bottom-0 left-0 bg-gradient-to-t from-[#141414]/80 backdrop-blur-sm to-[#3E3D3A] z-30 w-full h-[52px]">
      <div className="w-full flex h-full">
        {menuItems.map((item) => {
          const to =
            item.path === "/lich-thi-dau" || item.path === "/ket-qua" || item.path === "/xem-lai"
              ? `${item.path}/${sports.data?.[0]?.slug}` // append slug nếu cần
              : item.path;

          const isActive = item.exact ? location.pathname === item.path : isActiveBasePath(item.path);

          return (
            <NavLink
              key={item.path}
              to={to}
              className={clsx(
                "flex-1 flex flex-col gap-1 items-center justify-center h-full text-[9px] hover:opacity-100 font-semibold",
                isActive ? "text-yellow-300 opacity-100" : "text-white opacity-80"
              )}
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default MobileMenu;
