import { Outlet } from "@tanstack/react-router";
import Header from "../../shared/components/Header";
import Footer from "../../shared/components/Footer";
import SportNav from "../../shared/components/SportNav";
import MobileBottomMenu from "../../shared/components/MobileBottomMenu";

const MainLayout = () => {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-7xl">
        <SportNav />
        <div className="px-2 xl:px-0">
          <Outlet />
        </div>
      </main>
      <MobileBottomMenu />
      <Footer />
    </>
  );
};

export default MainLayout;
