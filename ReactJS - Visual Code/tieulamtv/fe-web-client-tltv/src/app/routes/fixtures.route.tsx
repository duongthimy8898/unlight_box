import { createRoute, lazyRouteComponent, redirect } from "@tanstack/react-router";
import rootRoute from "./rootRoute";
import { sportQueries } from "../../features/sports/queries";
import fixtureQueries from "../../features/fixtures/queries";
import Skeleton from "../../shared/components/Skeleton";

const fixturesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/lich-thi-dau",
  component: lazyRouteComponent(() => import("../../pages/fixtures")),
  pendingComponent: Skeleton,
  pendingMs: 0,
  pendingMinMs: 1500,
  validateSearch: (search) => {
    return {
      mon: typeof search.mon === "string" ? search.mon : undefined,
    };
  },
  beforeLoad: async ({ search, context }) => {
    const sports = await context.queryClient.ensureQueryData(sportQueries.list());
    if (!search.mon || sports.find((s) => s.slug === search.mon) === undefined) {
      throw redirect({ to: "/lich-thi-dau", search: { mon: sports.at(0)?.slug }, replace: true });
    }
  },
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(fixtureQueries.listByState("unfinished"));
    await context.queryClient.ensureQueryData(fixtureQueries.listByState("finished"));
  },
});

export default fixturesRoute;
