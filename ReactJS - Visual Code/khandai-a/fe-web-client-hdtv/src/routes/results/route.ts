import { createRoute, lazyRouteComponent } from "@tanstack/react-router";
import rootRoute from "../rootRoute";


const resultsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/ket-qua",
  component: lazyRouteComponent(() => import("./page")),
});

export default resultsRoute;
