// app/layouts/RootLayout.tsx
import { Outlet } from "@tanstack/react-router";
import { Header } from "../shared/components/Header";
import { Footer } from "../shared/components/Footer";
import { BottomNav } from "../shared/components/BottomNav";
import clsx from "clsx";
import { SplashScreen } from "../shared/components/SplashScreen";
import { Suspense } from "react";
import adBanners from "../config/adBanners";
import FixedBanners from "./FixedBanners";

export function RootLayout() {
  const headerHeight = "64px";
  const sideWidth = "130px";

  return (
    <div className="h-screen overflow-hidden bg-[#030712] text-white">
      {/* <FixedBanners/> */}
      <Header />

      {/* aside trái */}
      <aside hidden
        className="fixed left-0 hidden xl:flex flex-col gap-1 items-center justify-center"
        style={{
          top: headerHeight,
          width: sideWidth,
          height: `calc(100vh - ${headerHeight})`,
        }}
      >
        {adBanners.FIXED.ASIDE.map((adBanner, idx) => (
          <a key={idx} href={adBanner.href} target="_blank">
            <img src={adBanner.src} alt="" />
          </a>
        ))}
      </aside>

      {/* aside phải */}
      <aside hidden
        className="fixed right-0 hidden xl:flex flex-col gap-1 items-center justify-center"
        style={{
          top: headerHeight,
          width: sideWidth,
          height: `calc(100vh - ${headerHeight})`,
        }}
      >
        {adBanners.FIXED.ASIDE.map((adBanner, idx) => (
          <a key={idx} href={adBanner.href} target="_blank">
            <img src={adBanner.src} alt="" />
          </a>
        ))}
      </aside>

      {/* vùng giữa */}
      <main
        id="mainWrapper"
        className={clsx("px-0 xl:px-4 overflow-y-auto", "ml-0 mr-0", `xl:ml-30`, `xl:mr-30`)}
        style={{
          height: `calc(100vh - ${headerHeight})`,
          marginTop: headerHeight,
        }}
      >
        <div className="max-w-7xl mx-auto">
          <Suspense fallback={<SplashScreen />}>
            <Outlet />
          </Suspense>
        </div>

        <div className="mt-4"></div>
        <Footer />
      </main>
      <BottomNav />
    </div>
  );
}
