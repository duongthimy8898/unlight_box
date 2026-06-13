import MarqueeText from "react-marquee-text";

const MarqueeSection = () => {
  return (
    <section className="py-2 px-2 bg-[#171C27]">
      <MarqueeText direction="right" pauseOnHover duration={10} className="font-light">
        Tên miền chính thức: CHAOGA.TV - AE muốn tham gia nhóm VIP, tham khảo kèo đề xuất - Vui lòng nhắn tin Zalo / Telegram - Hỗ trợ 24/24 - Chúc AE xem bóng
        đá vui vẻ tại CHAOGA.TV
      </MarqueeText>
    </section>
  );
};

export default MarqueeSection;
