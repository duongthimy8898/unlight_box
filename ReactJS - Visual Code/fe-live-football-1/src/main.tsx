import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/500.css";
import "@fontsource/montserrat/600.css";
import "@fontsource/montserrat/700.css";
import "@fontsource/montserrat/800.css";
import "@fontsource/montserrat/900.css";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLoader from "./components/MainLoader/index.tsx";
import routes from "./routes/index.tsx";
import ContainerLoaderProvider from "./providers/containerLoader.provider.tsx";
const router = createBrowserRouter(routes);
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Suspense fallback={<MainLoader />}>
      <ContainerLoaderProvider>
        <RouterProvider router={router} />
      </ContainerLoaderProvider>
    </Suspense>
  </StrictMode>
);
