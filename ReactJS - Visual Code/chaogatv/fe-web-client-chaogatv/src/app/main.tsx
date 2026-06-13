import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { useUIStore } from "../features/ui/store.ts";
import { queryClient } from "./queryClient.ts";
import { QueryClientProvider } from "@tanstack/react-query";
import { SkeletonTheme } from "react-loading-skeleton";
import App from "./App.tsx";
import "react-loading-skeleton/dist/skeleton.css";
const { setTheme } = useUIStore.getState();
setTheme("dark");
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SkeletonTheme
      baseColor="#1a1a1d"
      highlightColor="#2a2a2e"
      enableAnimation={true} // ← mặc định đã true, nhưng khai báo rõ
    >
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </SkeletonTheme>
  </StrictMode>,
);
