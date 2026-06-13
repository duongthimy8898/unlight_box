import { lazy, Suspense } from "react";
import { Navigate, type RouteObject } from "react-router-dom";
import AppLoader from "../components/AppLoader";
import { useDataContext } from "../hooks/useDataContext";
import PlayReplayPage from "../pages/PlayReplay";
import CleanViewExtraPage from "../pages/Live/extra/CleanView";

// Lazy layout
function delayImport<T>(importer: () => Promise<T>, ms = 0): Promise<T> {
  return new Promise<T>((resolve) => {
    setTimeout(() => {
      importer().then(resolve);
    }, ms);
  });
}
const MainLayout = lazy(() => delayImport(() => import("../layouts/MainLayout"), 0));
const HomePage = lazy(() => delayImport(() => import("../pages/Home"), 0));
const FixturesPage = lazy(() => delayImport(() => import("../pages/Fixtures"), 0));
const LivePage = lazy(() => delayImport(() => import("../pages/Live"), 0));
const ResultsPage = lazy(() => delayImport(() => import("../pages/Results"), 0));
const ReplaysPage = lazy(() => delayImport(() => import("../pages/Replays"), 0));

// eslint-disable-next-line react-refresh/only-export-components
function FirstSportRedirect({ base }: { base: string }) {
  const { sports } = useDataContext();
  const firstSlug = sports.data?.at(0)?.slug ?? "123"; // fallback nếu rỗng

  return <Navigate to={`/${base}/${firstSlug}`} replace />;
}

const routes: RouteObject[] = [
  {
    path: "/",
    element: (
      <Suspense fallback={<AppLoader text="Vui lòng chờ..." />}>
        <MainLayout />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="trang-chu" />,
      },
      {
        path: "trang-chu",
        element: (
          <Suspense fallback={<AppLoader text="Đang tải Trang chủ..." />}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: "lich-thi-dau",
        children: [
          {
            index: true,
            element: <FirstSportRedirect base="lich-thi-dau" />,
          },
          {
            path: ":sportSlug",
            element: (
              <Suspense fallback={<AppLoader text="Đang tải Lịch thi đấu..." />}>
                <FixturesPage />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "truc-tiep/:sportSlug/:leagueSlug/:fixtureSlug/:fixtureId",
        element: (
          <Suspense fallback={<AppLoader text="Đang tải Live..." />}>
            <LivePage />
          </Suspense>
        ),
      },
      {
        path: "truc-tiep/:sportSlug/:leagueSlug/:fixtureSlug/:fixtureId/clean-view",
        element: (
          <Suspense fallback={<AppLoader text="Đang tải Client View Live..." />}>
            <CleanViewExtraPage />
          </Suspense>
        ),
      },
      {
        path: "ket-qua",
        children: [
          {
            index: true,
            element: <FirstSportRedirect base="ket-qua" />,
          },
          {
            path: ":sportSlug",
            element: (
              <Suspense fallback={<AppLoader text="Đang tải Kết quả..." />}>
                <ResultsPage />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "xem-lai",
        children: [
          {
            index: true,
            element: <FirstSportRedirect base="xem-lai" />,
          },
          {
            path: ":sportSlug",
            element: (
              <Suspense fallback={<AppLoader text="Đang tải Xem lại..." />}>
                <ReplaysPage />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "xem-lai/:sportSlug/:replaySlug/:replayId",
        element: <PlayReplayPage />,
      },
      {
        path: "*",
        element: <>404 Not Found</>,
      },
    ],
  },
];

export default routes;
