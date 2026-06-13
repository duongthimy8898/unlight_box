import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FixedBanners from "./components/FixedBanners";
import { useLayoutEffect } from "react";
import MobileNavbar from "./components/MobileNavbar";

const MainLayout = () => {
  const location = useLocation();

  useLayoutEffect(() => {
    // Scroll to the top of the page when the route changes
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location.pathname]);

  return (
    <>
      <Header />
      <FixedBanners />
      <main className="flex-1 w-full">
        <Outlet />
      </main>
      <MobileNavbar />
      <Footer />
    </>
  );
};

export default MainLayout;
