import { createRoute, lazyRouteComponent, redirect } from "@tanstack/react-router";
import rootRoute from "../rootRoute";
import SplashPage from "../../shared/components/SplashPage";
import { fixtureQueries } from "../../features/fixtures/queries";

const watchRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/truc-tiep/$slug/$id",
  component: lazyRouteComponent(() => import("./page")),
  pendingComponent: SplashPage,
  pendingMs: 0,
  pendingMinMs: 500,
  params: {
    parse: ({ slug, id }) => {
      return {
        slug: slug,
        id: Number(id),
      };
    },
  },
  loader: async ({ context, params }) => {
    const fixtures = await context.queryClient.ensureQueryData(fixtureQueries.listByState("unfinished"));
    const exist = fixtures.find((f) => f.id === params.id);
    if (!exist) throw redirect({ to: "/" });
    const fIds = fixtures.filter((fixture) => fixture.referenceId).map((fixture) => fixture.referenceId!);
    await context.queryClient.ensureQueryData(fixtureQueries.listStats(fIds));
  },
});

export default watchRoute;
