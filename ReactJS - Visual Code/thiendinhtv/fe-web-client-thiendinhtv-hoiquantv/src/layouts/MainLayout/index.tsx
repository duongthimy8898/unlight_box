import clsx from "clsx";
import { useLayoutEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header";
import ContainerLoading from "../components/ContainerLoading";
import { useContainerLoader } from "../../hooks/useContainerLoader";
import Footer from "./components/Footer";
import MobileSportBar from "./components/MobileSportBar";
import DesktopSportsBar from "./components/DesktopSportsBar";
import MobileMenu from "./components/MobileMenu";
import AsideAdBanner from "./components/AsideAdBanner";
import PopupAdBanner from "./components/PopupAdBanner";
import CatfishAdBanner from "./components/CatfishAdBanner";

const MainLayout = () => {
  const location = useLocation();
  const { loading } = useContainerLoader();

  useLayoutEffect(() => {
    window.scrollTo({ top: -100, left: 0, behavior: "auto" });
  }, [location.pathname]);

  return (
    <>
      <DesktopSportsBar />
      <MobileMenu />
      <div className={clsx("w-full dt:pl-[128px]")}>
        <Header />
        <MobileSportBar />
        <div className="w-full max-w-[1660px] mx-auto min-h-[calc(100vh-64px)] dt:min-h-[calc(100vh-100px)] px-2 lt:px-4 relative mb-4 mt-2 lt:mt-0">
          {loading && <ContainerLoading />}
          <Outlet />
        </div>
        <Footer />
      </div>
      <AsideAdBanner />
      <PopupAdBanner />
      <CatfishAdBanner />
    </>
  );
};

export default MainLayout;
