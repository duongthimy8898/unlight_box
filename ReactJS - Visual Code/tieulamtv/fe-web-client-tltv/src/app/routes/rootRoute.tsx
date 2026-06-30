import { createRootRouteWithContext, lazyRouteComponent } from "@tanstack/react-router";
import type { QueryClient } from "@tanstack/react-query";
import SplashScreen from "../../shared/components/SplashScreen";
import { sportQueries } from "../../features/sports/queries";
import ErrorScreen from "../../shared/components/ErrorScreen";

type RouterContext = {
  queryClient: QueryClient;
};

const rootRoute = createRootRouteWithContext<RouterContext>()({
  component: lazyRouteComponent(() => import("../layouts/Main.layout")),
  pendingComponent: SplashScreen,
  pendingMs: 0,
  pendingMinMs: 1500,
  errorComponent: ({ error }) => {
    return <ErrorScreen title={error.name} message={error.message} />;
  },
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(sportQueries.list());
  },
});

export default rootRoute;
