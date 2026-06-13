import clsx from "clsx";
import { IoCalendar, IoHome } from "react-icons/io5";
import { MdReplay, MdScore } from "react-icons/md";
import { NavLink } from "react-router-dom";

const MobileMenu = () => {
  return (
    <div className="block md:hidden fixed bottom-0 left-0 bg-[#010510] border-t-2 border-yellow-500 z-30 w-full h-[52px]">
      <div className="w-full flex h-full">
        <NavLink
          to="/trang-chu"
          className={({ isActive }) => clsx(isActive ? "text-blue-500" : "text-white", "flex-1 flex flex-col gap-1 items-center justify-center h-full")}
        >
          <IoHome />
          <span className="text-[9px] font-semibold">TRANG CHỦ</span>
        </NavLink>
        <NavLink
          to="/lich-thi-dau"
          className={({ isActive }) => clsx(isActive ? "text-blue-500" : "text-white", "flex-1 flex flex-col gap-1 items-center justify-center h-full")}
        >
          <IoCalendar />
          <span className="text-[9px] font-semibold">LỊCH THI ĐẤU</span>
        </NavLink>
        <NavLink
          to="/ket-qua"
          className={({ isActive }) => clsx(isActive ? "text-blue-500" : "text-white", "flex-1 flex flex-col gap-1 items-center justify-center h-full")}
        >
          <MdScore />
          <span className="text-[9px] font-semibold">KẾT QUẢ</span>
        </NavLink>
        <NavLink
          to="/xem-lai"
          className={({ isActive }) => clsx(isActive ? "text-blue-500" : "text-white", "flex-1 flex flex-col gap-1 items-center justify-center h-full")}
        >
          <MdReplay />
          <span className="text-[9px] font-semibold">XEM LẠI</span>
        </NavLink>
      </div>
    </div>
  );
};

export default MobileMenu;
