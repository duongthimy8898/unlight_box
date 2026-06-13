import { lazy } from "react";
import { Navigate, type RouteObject } from "react-router-dom";
import HomePage from "../pages/Home";
import LivePage from "../pages/Live";
import BookmakersPage from "../pages/Bookmakers";
// Lazy layout
const MainLayout = lazy(() => import("../layouts/MainLayout"));

const routes: RouteObject[] = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/lich-thi-dau" replace />,
      },
      {
        path: "trang-chu",
        index: true,
        element: <Navigate to="/lich-thi-dau" />,
      },
      {
        path: "lich-thi-dau",
        element: <HomePage />,
      },
      {
        path: "tin-tuc",
        element: <HomePage />,
      },
      {
        path: "top-nha-cai",
        element: <BookmakersPage />,
      },
      {
        path: "truc-tiep/:slug/:id",
        element: <LivePage />,
      },
      {
        path: "*",
        element: <>404 Not Found</>,
      },
    ],
  },
];

export default routes;
