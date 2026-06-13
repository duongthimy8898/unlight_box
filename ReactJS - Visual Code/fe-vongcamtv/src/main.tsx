import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import MainLoader from "./components/MainLoader.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Suspense fallback={<MainLoader />}>
      <App />
    </Suspense>
  </StrictMode>
);
