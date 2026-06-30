import { createRouter } from "@tanstack/react-router";
import routeTree from "../routes/routeTree";
import { queryClient } from "../services";

const router = createRouter({
  routeTree: routeTree,
  context: {
    queryClient: queryClient,
  },
});

export default router;
