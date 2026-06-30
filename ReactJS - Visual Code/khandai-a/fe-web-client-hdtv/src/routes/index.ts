import rootRoute from "./rootRoute";
import homeRoute from "./home/route";
import watchRoute from "./watch";
import schedulesRoute from "./schedules/route";

const routeTree = rootRoute.addChildren([homeRoute, schedulesRoute, watchRoute]);
export { routeTree };
