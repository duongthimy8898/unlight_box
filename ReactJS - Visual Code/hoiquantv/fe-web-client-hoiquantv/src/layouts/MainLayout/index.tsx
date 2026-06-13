import { useLayoutEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useContainerLoader } from "../../hooks/useContainerLoader";
import Header from "./components/Header";
import DataLoader from "../../components/DataLoader";
import clsx from "clsx";
import SportNavBar from "./components/SportNavBar";
import AsideAdBanner from "./components/AsideAdBanner";
import Footer from "./components/Footer";
import MobileMenu from "./components/MobileMenu";
import PopupAdBanner from "./components/PopupAdBanner";
import CatfishAdBanner from "./components/CatfishAdBanner";

const MainLayout = () => {
  const location = useLocation();

  useLayoutEffect(() => {
    window.scrollTo({ top: -100, left: 0, behavior: "auto" });
  }, [location.pathname]);

  const { loading } = useContainerLoader();
  return (
    <>
      <div className={clsx("w-full mx-auto h-auto relative bg-inherit", "dt:max-w-[1280px]", "bs:max-w-[1440px]")}>
        <Header />
        <SportNavBar />
        {loading && <DataLoader />}
        <div className="w-full h-auto">
          <Outlet />
        </div>
      </div>
      <AsideAdBanner />
      <PopupAdBanner />
      <CatfishAdBanner />
      <Footer />
      <MobileMenu />
    </>
  );
};

export default MainLayout;
