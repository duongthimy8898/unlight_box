import type { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext } from "@tanstack/react-router";
import { sportQueries } from "../features/sports/queries";
import { SplashScreen } from "../shared/components/SplashScreen";
import RootLayout from "../layouts/RootLayout";
import NotFound from "../shared/pages/NotFoundPage";
import ErrorPage from "../shared/pages/ErrorPage";
interface RouterContext {
  queryClient: QueryClient;
}

const rootRoute = createRootRouteWithContext<RouterContext>()({
  component: RootLayout,
  notFoundComponent: NotFound,
  errorComponent: ErrorPage,
  pendingComponent: SplashScreen,
  loader: async ({ context }) => {
    context.queryClient.ensureQueryData(sportQueries.list());
  },
});

export default rootRoute;
