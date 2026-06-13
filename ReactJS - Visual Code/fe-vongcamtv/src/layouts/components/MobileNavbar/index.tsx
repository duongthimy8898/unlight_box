import { Calendar, Home, Trophy } from "lucide-react";
import { NavLink } from "react-router-dom";

const MobileNavbar = () => {
  return (
    <div className="fixed z-100 bottom-0 left-0 w-full flex tb:hidden bg-black border-t border-green-600 divide-x divide-green-600">
      <NavLink
        to="/trang-chu"
        className={({ isActive }) =>
          `flex-1 flex flex-col items-center justify-center py-2 gap-1 transition-colors duration-200 ${
            isActive ? "text-green-500" : "text-white active:text-green-400"
          }`
        }
      >
        <Home size={18} />
        <span className="text-xs">TRANG CHỦ</span>
      </NavLink>
      <NavLink
        to="/lich-thi-dau"
        className={({ isActive }) =>
          `flex-1 flex flex-col items-center justify-center py-2 gap-1 transition-colors duration-200 ${
            isActive ? "text-green-500" : "text-white active:text-green-400"
          }`
        }
      >
        <Calendar size={18} />
        <span className="text-xs">LỊCH THI ĐẤU</span>
      </NavLink>
      <NavLink
        to="/top-nha-cai"
        className={({ isActive }) =>
          `flex-1 flex flex-col items-center justify-center py-2 gap-1 transition-colors duration-200 ${
            isActive ? "text-green-500" : "text-white active:text-green-400"
          }`
        }
      >
        <Trophy size={18} />
        <span className="text-xs">TOP NHÀ CÁI</span>
      </NavLink>
    </div>
  );
};

export default MobileNavbar;
