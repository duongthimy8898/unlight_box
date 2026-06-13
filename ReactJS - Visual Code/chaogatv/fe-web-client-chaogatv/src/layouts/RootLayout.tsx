// app/layouts/RootLayout.tsx
import { Outlet } from "@tanstack/react-router";
import { Header } from "../shared/components/Header";
import { Footer } from "../shared/components/Footer";
import { BottomNav } from "../shared/components/BottomNav";
import clsx from "clsx";
import PopupAdBanner from "../shared/components/FixedAdBanners/PopupAdBanner";
import CatfishAdBanners from "../shared/components/FixedAdBanners/CatfishAdBanners";

export function RootLayout() {
  const headerHeight = "64px";
  const sideWidth = "120px";

  return (
    <div className="h-screen overflow-hidden bg-[#0d0d0f] text-white">
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
        <a href="https://www.bwing20.com/vn?affCode=22187" target="_blank">
          <img src="/banners/bwing_120x220_1.gif" alt="" />
        </a>
        <a href="https://6789x.site/ad9namei200" target="_blank">
          <img src="/banners/vs_120x220.gif" alt="" />
        </a>
        <a href="https://www.fb88alo.com/?affiliateId=8843" target="_blank">
          <img src="/banners/fb88_120x220.gif" alt="" />
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
        <a href="https://www.bwing20.com/vn?affCode=22187" target="_blank">
          <img src="/banners/bwing_120x220_2.gif" alt="" />
        </a>
        <a href="https://6789x.site/ad9namei200" target="_blank">
          <img src="/banners/vs_120x220.gif" alt="" />
        </a>
        <a href="https://www.fb88alo.com/?affiliateId=8843" target="_blank">
          <img src="/banners/fb88_120x220.gif" alt="" />
        </a>
      </aside>

      {/* vùng giữa */}
      <main
        id="mainWrapper"
        className={clsx("px-0 lg:px-4 overflow-y-auto", "ml-0 mr-0", `lg:ml-30`, `lg:mr-30`)}
        style={{
          height: `calc(100vh - ${headerHeight})`,
          marginTop: headerHeight,
        }}
      >
        <div className="max-w-360 mx-auto">
          <Outlet />
        </div>

        <div className="mt-4"></div>
        <Footer />
      </main>
      <BottomNav />
      <PopupAdBanner />
      <CatfishAdBanners />
    </div>
  );
}
