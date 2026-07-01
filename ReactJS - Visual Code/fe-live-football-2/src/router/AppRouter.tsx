import { Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import { routes } from "./routes";
import LoadingScreenElm from "../components/LoadingScreenElm";

export default function AppRouter() {
  return (
    <Suspense fallback={<LoadingScreenElm />}>
      <Routes>
        {routes.map(({ path, element }, idx) => (
          <Route key={idx} path={path} element={element} />
        ))}
      </Routes>
    </Suspense>
  );
}
