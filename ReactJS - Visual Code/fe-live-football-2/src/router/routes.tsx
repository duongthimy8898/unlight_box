import { lazy } from "react";
import { Navigate } from "react-router-dom";
import BookmakersPage from "../pages/Bookmakers";

const HomePage = lazy(() => import("../pages/HomePage"));
const LiveStreamPage = lazy(() => import("../pages/LiveStreamPage"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage"));

export const routes = [
  {
    path: "*",
    element: <NotFoundPage />,
  },
  {
    path: "/",
    element: <HomePage />,
  },
  { path: "/trang-chu", element: <Navigate to="/" replace /> },
  {
    path: "/truc-tiep/:slugAndId",
    element: <LiveStreamPage />,
  },
  {
    path: "/top-nha-cai",
    element: <BookmakersPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
];
