import { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, createRoute, createRouter } from "@tanstack/react-router";
import queryClient from "./queryClient";
import { RootLayout } from "../layouts/RootLayout";
import { lazy } from "react";
import { fixtureQueries } from "../features/fixtures/queries";
import ComingSoonPage from "../shared/pages/ComingSoonPage";
import PageSkeleton from "../pages/components/PageSkeleton";
import Empty from "../shared/components/Empty";
const rootRoute = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  component: RootLayout,
  notFoundComponent: ComingSoonPage,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: lazy(() => import("../pages/HomePage")),
  loader: async ({ context }) => {
    const fixtures = await queryClient.ensureQueryData(fixtureQueries.list);
    const referenceIds = fixtures.map((f) => f.referenceId).filter((id): id is string => id !== null);
    await context.queryClient.ensureQueryData(fixtureQueries.listStats(referenceIds));
  },
  pendingMs: 0,
  pendingMinMs: 1000,
  pendingComponent: PageSkeleton,
  errorComponent: Empty,
});

const liveRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/truc-tiep/$slug/$id",
  component: lazy(() => import("../pages/LivePage")),
  loader: async ({ context }) => {
    const fixtures = await queryClient.ensureQueryData(fixtureQueries.list);
    const referenceIds = fixtures.map((f) => f.referenceId).filter((id): id is string => id !== null);
    await context.queryClient.ensureQueryData(fixtureQueries.listStats(referenceIds));
  },
  pendingMs: 0,
  pendingMinMs: 1000,
  pendingComponent: PageSkeleton,
});

const topCasinoRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/top-nha-cai",
  component: lazy(() => import("../pages/TopBookmakersPage")),
});

const routeTree = rootRoute.addChildren([indexRoute, liveRoute, topCasinoRoute]);

const router = createRouter({
  routeTree,
  context: { queryClient },
  scrollRestoration: true,
  scrollToTopSelectors: ["#mainWrapper", "body"],
  scrollRestorationBehavior: "instant",
  defaultPendingComponent: PageSkeleton,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default router;
