import clsx from "clsx";
import { Star } from "lucide-react";

const BookmakersPage = () => {
  return (
    <div className="px-2">
      <div className="my-2"></div>
      <div className={clsx("bg-gradient-to-r from-[#243F0D] to-[#5EA523]", "w-fit px-3 py-1.5 text-[20px] font-semibold rounded-[8px] mb-2")}>
        NHÀ CÁI UY TÍN
      </div>
      <div className="my-2"></div>
      <div className="w-full flex flex-col gap-4">
        {/** BWING */}
        <div className="w-full flex flex-col md:flex-row bg-[#243F0D] p-4 gap-8 rounded-[12px]">
          <div className="flex-shrink-0 flex flex-row gap-2 justify-center md:justify-start">
            <img src="/banners/vs_1x1.gif" alt="VSBET" className="w-[64px] h-[64px] md:w-[128px] md:h-[128px] object-contain" />
            <div className="flex flex-col justify-center items-center">
              <span className="text-[20px] font-semibold text-[#5EA523]">VSBET</span>
              <div className="flex items-center gap-1 text-yellow-400">
                <Star />
                <Star />
                <Star />
                <Star />
                <Star />
              </div>
            </div>
          </div>
          <div className="px-2 flex-1 flex items-center justify-center text-[14px] font-semibold text-[#D1FFD6]">
            <span className="line-clamp-3">VSBET - Nhà cái Thể thao, Casino uy tín</span>
          </div>
          <div className="flex-shrink-0 flex flex-row md:flex-col justify-center gap-2">
            <a
              className="bg-[#5EA523] text-white font-semibold rounded-[8px] px-3 py-1.5 text-[14px] hover:bg-[#6fc733] transition-colors duration-200"
              href="https://6789x.site/ad9namei200"
            >
              Xem chi tiết
            </a>
            <a
              className="bg-yellow-400 text-black font-semibold rounded-[8px] px-3 py-1.5 text-[14px] hover:bg-yellow-500 transition-colors duration-200"
              href="https://6789x.site/ad9namei200"
            >
              Đặt cược
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookmakersPage;
