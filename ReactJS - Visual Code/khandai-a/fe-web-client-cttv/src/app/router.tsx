import { createRouter } from "@tanstack/react-router";
import { queryClient } from "./queryClient";
import { routeTree } from "../routes";

const router = createRouter({
  context: { queryClient: queryClient },
  routeTree,
});

export default router;
