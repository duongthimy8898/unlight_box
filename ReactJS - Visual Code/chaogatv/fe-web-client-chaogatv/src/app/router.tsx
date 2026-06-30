// app/router.tsx
import { createRouter, createRoute, createRootRouteWithContext, lazyRouteComponent } from "@tanstack/react-router";
import { QueryClient } from "@tanstack/react-query";
import { queryClient } from "./queryClient";
import { RootLayout } from "../layouts/RootLayout";
import { fixtureQueries } from "../features/fixtures/queries";
import { HomeSkeleton } from "../pages/HomePage/Skeleton";
import { sportQueries } from "../features/sports/queries";
import { LiveSkeleton } from "../pages/LivePage/Skeleton";
import { SplashScreen } from "../shared/components/SplashScreen";
import NotFoundPage from "../shared/pages/NotFoundPage";

// đổi sang createRootRouteWithContext và khai báo type
const rootRoute = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  component: RootLayout,
  pendingComponent: SplashScreen,
  pendingMs: 0,
  pendingMinMs: 1000,
  errorComponent: ({ error }) => (
    <div className="min-h-screen bg-[#0d0d0f] flex items-center justify-center">
      <div className="text-center space-y-3">
        <p className="text-zinc-400 text-sm">{error.message}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 rounded-lg bg-surface text-zinc-300 text-sm border border-[#2a2a2e] hover:bg-[#2a2a2e]"
        >
          Thử lại
        </button>
      </div>
    </div>
  ),
  notFoundComponent: NotFoundPage,
  loader: async ({ context: { queryClient } }) => {
    const sports = queryClient.ensureQueryData(sportQueries.list());
    
    return sports;
  },
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: lazyRouteComponent(() => import("../pages/HomePage")),
  pendingComponent: HomeSkeleton,
  pendingMs: 0,
  pendingMinMs: 1000,
  loader: async ({ context: { queryClient } }) => {
    console.log("[Home Loader]", {
      time: new Date().toLocaleTimeString()
    });
    const [fixtures, sports] = await Promise.all([
      queryClient.ensureQueryData(fixtureQueries.listByState("unfinished")),
      queryClient.ensureQueryData(sportQueries.list()),
    ]);
    const referenceIds = fixtures.map((f) => f.referenceId).filter((id): id is string => id !== null);
    const listStats = await queryClient.ensureQueryData(fixtureQueries.listStats(referenceIds));
    return { fixtures, listStats, sports };
  },
});

const liveRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/truc-tiep/$slug/$fixtureId",
  component: lazyRouteComponent(() => import("../pages/LivePage")),
  pendingComponent: LiveSkeleton,
  pendingMs: 0,
  pendingMinMs: 1000,
  loader: async ({ context: { queryClient }, params }) => {
    const fixtureId = Number(params.fixtureId);
    const [fixture, fixtures] = await Promise.all([
      queryClient.ensureQueryData(fixtureQueries.detail(fixtureId)),
      queryClient.ensureQueryData(fixtureQueries.listByState("unfinished")),
    ]);
    const fixturesBySport = fixtures.filter((f) => f.sport.id === fixture.sport.id && f.id !== fixture.id);
    const referenceIds = fixtures.map((f) => f.referenceId).filter((id): id is string => id !== null);
    const listStats = await queryClient.ensureQueryData(fixtureQueries.listStats(referenceIds));
    return { fixture, fixturesBySport, listStats };
  },
});

const scheduleRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/lich-thi-dau/$sportSlug/$sportId",
  component: lazyRouteComponent(() => import("../pages/SchedulePage")),
  pendingComponent: HomeSkeleton,
  pendingMs: 0,
  pendingMinMs: 1000,
  loader: async ({ context: { queryClient }, params }) => {
    const sportId = Number(params.sportId);
    const [sport, fixtures] = await Promise.all([
      queryClient.ensureQueryData(sportQueries.detail(sportId)),
      queryClient.ensureQueryData(fixtureQueries.listByState("unfinished")),
    ]);
    const fixturesBySport = fixtures.filter((f) => f.sport.id === sport.id);
    return { sport, fixturesBySport };
  },
});

const resultRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/ket-qua",
  component: lazyRouteComponent(() => import("../shared/pages/ComingSoonPage")),
  pendingComponent: SplashScreen,
  pendingMs: 0,
  pendingMinMs: 1000,
  // loader: async ({ context: { queryClient } }) => {
  //   return queryClient.ensureQueryData(fixtureQueries.listByState("unfinished"));
  // },
});

const topCasinoRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/top-nha-cai",
  component: lazyRouteComponent(() => import("../pages/TopCasinoPage")),
  pendingComponent: HomeSkeleton,
  pendingMs: 0,
  pendingMinMs: 1000,
  loader: async ({ context: { queryClient } }) => {
    const [fixtures, sports] = await Promise.all([
      queryClient.ensureQueryData(fixtureQueries.listByState("unfinished")),
      queryClient.ensureQueryData(sportQueries.list()),
    ]);

    return { fixtures, sports };
  },
});

const routeTree = rootRoute.addChildren([indexRoute, liveRoute, scheduleRoute, resultRoute, topCasinoRoute]);

export const router = createRouter({
  routeTree,
  context: { queryClient }, // ← truyền instance vào đây
  scrollRestorationBehavior: "smooth",
  scrollRestoration: true,
  scrollToTopSelectors: ["#mainWrapper", "body"],
});

export { indexRoute, liveRoute, scheduleRoute, resultRoute, topCasinoRoute };

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
