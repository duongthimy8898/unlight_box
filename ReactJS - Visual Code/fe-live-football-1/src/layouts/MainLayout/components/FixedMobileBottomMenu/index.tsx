import { FaRankingStar } from "react-icons/fa6";
import { IoCalendar, IoHome } from "react-icons/io5";
import { Link } from "react-router-dom";

const FixedMobileBottomMenu = () => {
  return (
    <div className="block md:hidden fixed bottom-0 left-0 bg-[#010510] border-t-2 border-yellow-500 z-[100] w-full h-[52px]">
      <div className="w-full flex h-full">
        <Link to="/trang-chu" className="flex-1 flex flex-col gap-1 items-center justify-center h-full">
          <IoHome />
          <span className="text-[9px] font-semibold">TRANG CHỦ</span>
        </Link>
        <Link to="/lich-thi-dau" className="flex-1 flex flex-col gap-1 items-center justify-center h-full">
          <IoCalendar />
          <span className="text-[9px] font-semibold">LỊCH THI ĐẤU</span>
        </Link>
        <Link to="/top-nha-cai" className="flex-1 flex flex-col gap-1 items-center justify-center h-full">
          <FaRankingStar />
          <span className="text-[9px] font-semibold">TOP NHÀ CÁI</span>
        </Link>
      </div>
    </div>
  );
};

export default FixedMobileBottomMenu;
