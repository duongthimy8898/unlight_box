import { lazy, Suspense } from "react";
import { Navigate, type RouteObject } from "react-router-dom";
import LayoutLoading from "../layouts/components/LayoutLoading";
import ReplaysPage from "../pages/Replays";

const MainLayout = lazy(() => import("../layouts/MainLayout"));
const HomePage = lazy(() => import("../pages/Home"));
const SchedulePage = lazy(() => import("../pages/Schedule"));
const LivePage = lazy(() => import("../pages/Live"));
const ResultsPage = lazy(() => import("../pages/Results"));

const routes: RouteObject[] = [
  {
    path: "/",
    element: (
      <Suspense fallback={<LayoutLoading />}>
        <MainLayout />
      </Suspense>
    ),
    children: [
      { path: "*", element: <Navigate to="/trang-chu" /> },
      {
        index: true,
        element: <Navigate to="trang-chu" />,
      },
      {
        path: "trang-chu",
        element: (
          <Suspense fallback={<LayoutLoading />}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: "lich-thi-dau/:sportSlug",
        element: (
          <Suspense fallback={<LayoutLoading />}>
            <SchedulePage />
          </Suspense>
        ),
      },
      {
        path: "xem-truc-tiep/:sportSlug/:leagueSlug/:fixtureSlug",
        element: (
          <Suspense fallback={<LayoutLoading />}>
            <LivePage />
          </Suspense>
        ),
      },
      {
        path: "ket-qua/:sportSlug",
        element: (
          <Suspense fallback={<LayoutLoading />}>
            <ResultsPage />
          </Suspense>
        ),
      },
      {
        path: "xem-lai/:sportSlug",
        element: (
          <Suspense fallback={<LayoutLoading />}>
            <ReplaysPage />
          </Suspense>
        ),
      },
    ],
  },
];

export default routes;
