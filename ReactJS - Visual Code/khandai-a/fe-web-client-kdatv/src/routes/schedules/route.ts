import { createRoute, lazyRouteComponent, redirect } from "@tanstack/react-router";
import rootRoute from "../rootRoute";
import { fixtureQueries } from "../../features/fixtures/queries";
import SplashPage from "../../shared/components/SplashPage";
import { sportQueries } from "../../features/sports/queries";

const schedulesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/lich-thi-dau/$slug",
  component: lazyRouteComponent(() => import("./page")),
  pendingComponent: SplashPage,
  pendingMs: 0,
  pendingMinMs: 500,
  loader: async ({ context, params }) => {
    // Simulate a delay for loading data
    const sports = await context.queryClient.ensureQueryData(sportQueries.list());
    const slug = params.slug;
    const exists = sports.find((s) => s.slug === slug);
    if (!exists) {
      throw redirect({ to: "/" });
    }
    const fixtures = await context.queryClient.ensureQueryData(fixtureQueries.listByState("unfinished"));
    const fIds = fixtures.filter((fixture) => fixture.referenceId).map((fixture) => fixture.referenceId!);
    await context.queryClient.ensureQueryData(fixtureQueries.listStats(fIds));
  },
});

export default schedulesRoute;
