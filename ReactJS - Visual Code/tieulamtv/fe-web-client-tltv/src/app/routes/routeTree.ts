import { createRoute, redirect } from "@tanstack/react-router";
import rootRoute from "./rootRoute";
import routes from ".";

const indexRedirectRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: undefined,
  beforeLoad: () => redirect({ to: routes.homeRoute.to, replace: false }),
});

const routeTree = rootRoute.addChildren([
  indexRedirectRoute,
  routes.homeRoute,
  routes.fixturesRoute,
  routes.watchRoute,
  routes.featuredCasinosRoute,
]);

export default routeTree;
