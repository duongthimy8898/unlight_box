import { createRoute, lazyRouteComponent } from "@tanstack/react-router";
import rootRoute from "./rootRoute";

const featuredCasinosRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/top-nha-cai",
  component: lazyRouteComponent(() => import("../../pages/featured-casinos")),
});

export default featuredCasinosRoute;
