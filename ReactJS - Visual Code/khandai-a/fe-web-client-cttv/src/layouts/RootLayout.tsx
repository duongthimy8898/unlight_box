import { Outlet } from "@tanstack/react-router";
import { Header } from "../shared/components/Header";
import { Footer } from "../shared/components/Footer";
import PopupAdBanner from "../shared/components/FixedAdBanners/PopupAdBanner";
import CatfishAdBanners from "../shared/components/FixedAdBanners/CatfishAdBanners";

const RootLayout = () => {
  const headerHeight = "64px";
  const sideWidth = "120px";
  return (
    <>
      <Header />
      {/* aside trái */}
      <aside
        className="fixed left-0 hidden lg:flex flex-col gap-1 items-center justify-center"
        style={{
          top: headerHeight,
          width: sideWidth,
          height: `calc(100vh - ${headerHeight})`,
        }}
      >
        <a href="https://www.olabet.today/register?affiliateCode=khandaia" target="_blank">
          <img src="/banners/ola_120x220.gif" alt="" />
        </a>
        <a href="https://www.olabet.today/register?affiliateCode=khandaia" target="_blank">
          <img src="/banners/ola_120x220.gif" alt="" />
        </a>
      </aside>

      {/* aside phải */}
      <aside
        className="fixed right-0 hidden lg:flex flex-col gap-1 items-center justify-center"
        style={{
          top: headerHeight,
          width: sideWidth,
          height: `calc(100vh - ${headerHeight})`,
        }}
      >
        <a href="https://www.olabet.today/register?affiliateCode=khandaia" target="_blank">
          <img src="/banners/ola_120x220.gif" alt="" />
        </a>
        <a href="https://www.olabet.today/register?affiliateCode=khandaia" target="_blank">
          <img src="/banners/ola_120x220.gif" alt="" />
        </a>
      </aside>
      <main className="px-2 lg:px-0">
        <Outlet />
      </main>
      <Footer />
      <PopupAdBanner />
      <CatfishAdBanners />
    </>
  );
};

export default RootLayout;
