import { createRoute, lazyRouteComponent, redirect } from "@tanstack/react-router";
import rootRoute from "./rootRoute";
import fixtureQueries from "../../features/fixtures/queries";
import homeRoute from "./home.route";

const watchRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/truc-tiep/$fixtureSlug",

  component: lazyRouteComponent(() => import("../../pages/watch")),
  params: {
    parse: (params) => ({
      fixtureSlug: String(params.fixtureSlug),
    }),
    stringify: (params) => ({
      fixtureSlug: String(params.fixtureSlug),
    }),
  },
  validateSearch: (search) => {
    return {
      blv: search.blv ? Number(search.blv) : undefined,
      kenh: search.kenh ? Number(search.kenh) : undefined,
    };
  },
  beforeLoad: async ({ context, search, params }) => {
    const fixtures = await context.queryClient.ensureQueryData(fixtureQueries.listByState("unfinished"));
    const fixture = fixtures.find((fixture) => fixture.slug === params.fixtureSlug);
    if (!fixture) throw redirect({ to: homeRoute.to });
    const broadcast = fixture.fixtureCommentators.find((fc) => fc.commentator.id === search.blv);
    console.log(broadcast);
    if (!broadcast) {
      throw redirect({
        to: "/truc-tiep/$fixtureSlug",
        params: {
          fixtureSlug: fixture.slug,
        },
        search: {
          ...search,
          blv: fixture.fixtureCommentators.at(0)?.commentator.id,
        },
      });
    }

    const channel = broadcast.commentator.streams.find((s) => s.id === search.kenh);

    if (!channel) {
      throw redirect({
        to: "/truc-tiep/$fixtureSlug",
        params: {
          fixtureSlug: fixture.slug,
        },
        search: {
          ...search,
          kenh: broadcast.commentator.streams[0]?.id,
        },
      });
    }
  },
});

export default watchRoute;
