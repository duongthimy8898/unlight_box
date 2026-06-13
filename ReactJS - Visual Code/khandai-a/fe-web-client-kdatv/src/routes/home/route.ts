import { createRoute, lazyRouteComponent } from "@tanstack/react-router";
import rootRoute from "../rootRoute";
import { fixtureQueries } from "../../features/fixtures/queries";
import SplashPage from "../../shared/components/SplashPage";

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: lazyRouteComponent(() => import("./page")),
  pendingComponent: SplashPage,
  pendingMs: 0,
  pendingMinMs: 500,
  loader: async ({ context }) => {
    // Simulate a delay for loading data
    const fixtures = await context.queryClient.ensureQueryData(fixtureQueries.listByState("unfinished"));
    const fIds = fixtures.filter((fixture) => fixture.referenceId).map((fixture) => fixture.referenceId!);
    await context.queryClient.ensureQueryData(fixtureQueries.listStats(fIds));
  },
});

export default homeRoute;
