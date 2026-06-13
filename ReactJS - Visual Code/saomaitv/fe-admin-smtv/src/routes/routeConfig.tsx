import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import GuestRoute from "./GuestRoute";
import RedirectIndexRoute from "./RedirectIndexRoute";
import InternalUsersPage from "../pages/Dashboard/InternalUsers";
import FixturesPage from "../pages/Dashboard/Fixtures";
import SportsPage from "../pages/Dashboard/Sports";
import LeaguesPage from "../pages/Dashboard/Leagues";
import TeamsPage from "../pages/Dashboard/Teams";
import ReplaysPage from "../pages/Dashboard/Replays";

const AuthLayout = lazy(() => import("../layouts/AuthLayout"));
const DashboardLayout = lazy(() => import("../layouts/DashboardLayout"));
const LoginPage = lazy(() => import("../pages/Auth/Login"));

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <RedirectIndexRoute />,
  },
  {
    path: "/auth",
    element: (
      <GuestRoute>
        <AuthLayout />
      </GuestRoute>
    ),
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        path: "",
        element: <FixturesPage />,
      },
      {
        path: "sports",
        element: <SportsPage />,
      },
      {
        path: "leagues",
        element: <LeaguesPage />,
      },
      {
        path: "teams",
        element: <TeamsPage />,
      },
      {
        path: "fixtures",
        element: <FixturesPage />,
      },
      {
        path: "replays",
        element: <ReplaysPage />,
      },
      {
        path: "internal-users",
        element: <InternalUsersPage />,
      },
      {
        path: "me",
        element: <InternalUsersPage />,
      },
    ],
  },
  {
    path: "*",
    element: <div>404 - Không tìm thấy trang</div>,
  },
]);
