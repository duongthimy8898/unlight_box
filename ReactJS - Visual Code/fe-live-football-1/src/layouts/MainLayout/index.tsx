import { Outlet, Link } from "react-router-dom";
import SectionLoader from "../../components/SectionLoader";
import useContainerLoader from "../../hooks/useContainerLoader.hook";
import { IoFootball } from "react-icons/io5";
import Marquee from "react-fast-marquee";
import FixedAsideBanners from "./components/FixedAsideBanners";
import FixedBottomBanners from "./components/FixedBottomBanners";
import FixedPopupBanner from "./components/FixedPopupBanner";
import FixedMobileBottomMenu from "./components/FixedMobileBottomMenu";
import ScrollToTop from "../../components/ScrollToTop";
const MainLayout = () => {
  const { loading } = useContainerLoader();

  return (
    <>
      <header className="w-full h-[96px] bg-[#010510] fixed top-0 left-0 z-[100] flex flex-col justify-between items-center">
        <div className="w-full h-[64px] flex items-center justify-between py-2 px-4">
          <Link to="/trang-chu" className="h-full w-auto flex-shrink-0">
            <img loading="lazy" className="block h-full" src="/logo.png" alt="" />
          </Link>
          <div className="hidden md:flex flex-1 gap-4 items-center justify-center text-[14px] font-semibold">
            <Link to="/trang-chu">TRANG CHỦ</Link>
            <Link to="/lich-thi-dau">LỊCH THI ĐẤU</Link>
            <Link to="/top-nha-cai">TOP NHÀ CÁI</Link>
          </div>
          <div className="flex">
            <a
              className="bg-[#1B2A9C] flex flex-shrink-0 items-center justify-center gap-1 py-2 px-4 rounded"
              href="https://net88.fund/?a=2f13f3d6a480f09c406b01dd4aec7a24&utm_campaign=cpd&utm_source=live_bugiotv&utm_medium=banner_cuocbutton_live&referrer_domain=sv1.bugio10.live"
              target="_blank"
            >
              <IoFootball size={24} />
              <span className="text-[14px] font-semibold">CƯỢC NGAY</span>
            </a>
          </div>
        </div>
        <div className="flex h-[32px] items-center justify-between w-full text-[14px] font-semibold border-4 border-double border-yellow-500 ">
          <a
            href="mailto:ads.bugiotv@gmail.com"
            className="flex-shrink-0 h-full flex gap-1 jusitfy-start items-center bg-red-700 px-2 border-r-4 border-yellow-500 border-double"
          >
            <span>LHQC</span>
            <span className="hidden md:block">ads.bugiotv@gmail.com</span>
          </a>
          <Marquee
            className="flex-1 h-full bg-red-700 text-center text-[14px] font-semibold"
            autoFill={true}
            gradient={true}
            pauseOnClick={false}
            pauseOnHover={false}
            gradientWidth={16}
            gradientColor="#c10007"
          >
            <span className="text-yellow-500">
              BuGioTV - Cùng hướng về World Cup 2026! Cập nhật nhanh nhất - Bình luận sắc nét - Đồng hành cùng người hâm
              mộ! ⚽️ BuGioTV - Đường tới World Cup 2026 bắt đầu từ đây 🏆
            </span>
          </Marquee>
        </div>
      </header>
      <main className="w-full min-h-screen max-w-[1280px] mx-auto pt-[96px] px-[8px] text-white">
        <FixedAsideBanners />
        <FixedPopupBanner />
        {loading && <SectionLoader />} {/* Section Loader */}
        <ScrollToTop />
        <Outlet /> {/* Section */}
        <FixedBottomBanners />
        <FixedMobileBottomMenu />
      </main>
      <footer className="w-full max-w-[1280px] mx-auto flex flex-col gap-4 px-2 py-4 pb-[68px]">
        <div className="flex gap-8 flex-wrap items-center justify-center">
          <img loading="lazy" className="" src="/tournaments/tournament1.png" alt="" />
          <img loading="lazy" className="" src="/tournaments/tournament2.png" alt="" />
          <img loading="lazy" className="" src="/tournaments/tournament3.png" alt="" />
          <img loading="lazy" className="" src="/tournaments/tournament4.png" alt="" />
          <img loading="lazy" className="" src="/tournaments/tournament5.png" alt="" />
          <img loading="lazy" className="" src="/tournaments/tournament6.png" alt="" />
          <img loading="lazy" className="" src="/tournaments/tournament7.png" alt="" />
        </div>
        <hr />
        <div className="flex flex-col gap-4 md:flex-row items-center justify-between">
          <a className="w-[160px] flex-shrink-0" href="/trang-chu">
            <img loading="lazy" src="/logo.png" alt="" />
          </a>
          <p className="text-[12px] text-center md:text-left">
            Mọi trận đấu cho dù giải nhỏ cho tới các giải đấu lớn thì Bù Giờ TV đều cung cấp đầy đủ link xem trực tiếp
            bóng đá online với độ phân giải và chất lượng cao nhất. Ngoài việc xem bóng đá trực tuyến, chúng tôi còn gửi
            tới bạn đọc lịch thi đấu bóng đá, kết quả bóng đá và soi kèo bóng đá với tỷ lệ chiến thắng cao. Chúc bạn đọc
            xem bóng đá vui vẻ và luôn ủng hộ Bù Giờ TV
          </p>
        </div>
      </footer>
    </>
  );
};

export default MainLayout;
