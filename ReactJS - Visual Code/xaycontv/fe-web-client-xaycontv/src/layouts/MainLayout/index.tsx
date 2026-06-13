import clsx from "clsx";
import { useLayoutEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header";
import ContainerLoading from "../components/ContainerLoading";
import { useContainerLoader } from "../../hooks/useContainerLoader";
import Footer from "./components/Footer";
import SportBar from "./components/SportBar";
// import PopupAdBanner from "./components/PopupAdBanner";
// import AsideAdBanner from "./components/AsideAdBanner";
import MobileMenu from "./components/MobileMenu";
import AsideAdBanner from "./components/AsideAdBanner";
import CatfishAdBanner from "./components/CatfishAdBanner";
import PopupAdBanner from "./components/PopupAdBanner";
// import CatfishAdBanner from "./components/CatfishAdBanner";

const MainLayout = () => {
  const location = useLocation();
  const { loading } = useContainerLoader();

  useLayoutEffect(() => {
    window.scrollTo({ top: -100, left: 0, behavior: "auto" });
  }, [location.pathname]);

  return (
    <>
      <div className={clsx("w-full min-h-screen flex flex-col", "bg-[url('/bg-web.png')] bg-repeat-y bg-contain")}>
        <Header />
        <SportBar />
        <div className="w-full max-w-[1660px] mx-auto min-h-[calc(100vh-60px)] dt:min-h-[calc(100vh-80px)] relative mb-4 mt-2 lt:mt-0 px-2 lt:px-0">
          {loading && <ContainerLoading />}
          <Outlet />
        </div>
        <Footer />
      </div>
      <MobileMenu />
      <PopupAdBanner />
      <AsideAdBanner />
      <CatfishAdBanner/>
    </>
  );
};

export default MainLayout;
