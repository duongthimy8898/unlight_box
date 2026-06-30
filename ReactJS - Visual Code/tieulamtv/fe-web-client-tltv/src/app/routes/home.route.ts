import { createRoute, lazyRouteComponent, redirect } from "@tanstack/react-router";
import rootRoute from "./rootRoute";
import fixtureQueries from "../../features/fixtures/queries";
import { leagueQueries } from "../../features/leagues/queries";
import Skeleton from "../../shared/components/Skeleton";
import { sportQueries } from "../../features/sports/queries";

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/trang-chu",
  pendingComponent: Skeleton,
  pendingMs: 0,
  pendingMinMs: 1500,
  component: lazyRouteComponent(async () => import("../../pages/home")),
  validateSearch: (search) => {
    return {
      mon: typeof search.mon === "string" ? search.mon : undefined,
    };
  },
  beforeLoad: async ({ search, context }) => {
    const sports = await context.queryClient.ensureQueryData(sportQueries.list());
    if (!search.mon || sports.find((s) => s.slug === search.mon) === undefined) {
      throw redirect({ to: "/trang-chu", search: { mon: sports.at(0)?.slug }, replace: true });
    }
  },
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(leagueQueries.list());
    await context.queryClient.ensureQueryData(fixtureQueries.listByState("unfinished"));
    await context.queryClient.ensureQueryData(fixtureQueries.listByState("finished"));
  },
});

export default homeRoute;
