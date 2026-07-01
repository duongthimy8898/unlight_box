// src/App.tsx
import { Suspense } from "react";
import LoadingScreenElm from "./components/LoadingScreenElm";
import HeaderElm from "./components/HeaderElm/HeaderElm";
import AppRouter from "./router/AppRouter";
import FooterElm from "./components/FooterElm";
import { useLocation } from "react-router-dom";
import AdsBannersAside from "./components/AdsBannersAside";
import AdsBannersCatfish from "./components/AdsBannersCatfish";

export default function App() {
  const location = useLocation();
  const hideFooter = location.pathname === "*" || location.pathname === "/404";
  return (
    <div className="pt-16 bg-[url('/assets/images/bg-main.jpg')] min-h-screen bg-cover bg-no-repeat bg-top bg-fixed relative">
      <HeaderElm />
      <Suspense fallback={<LoadingScreenElm />}>
        <AppRouter />
      </Suspense>
      {!hideFooter && <FooterElm />}
      <AdsBannersAside />
      <AdsBannersCatfish />
    </div>
  );
}
