import Marquee from "react-fast-marquee";

export default function MarqueeElm() {
  return (
    <div className="w-full flex h-[40px]">
      {/* <a href="#tele" className="bg-[#dab979] border-2 border-[#ffb600] text-black shrink-0 h-full px-1 flex items-center text-[12px] font-semibold">
        LHQC: ads.tamquoctv@gmail.com
      </a> */}
      <Marquee className="flex-1 text-[14px] text-[#ffb600] font-semibold border-4 border-double border-[#ffb600] bg-[url('/assets/images/bg-marquee.png')]">
        TamQuocTV - Cùng hướng về World Cup 2026! Cập nhật nhanh nhất - Bình luận sắc nét - Đồng hành cùng người hâm mộ!
        ⚽️ TamQuocTV - Đường tới World Cup 2026 bắt đầu từ đây 🏆
      </Marquee>
    </div>
  );
}
