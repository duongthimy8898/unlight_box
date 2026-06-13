import { QueryClientProvider } from "@tanstack/react-query";
import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import queryClient from "./queryClient";
import { RouterProvider } from "@tanstack/react-router";
import router from "./router";
function App() {
  return (
    <>
      <SkeletonTheme
        baseColor="#1a1a1d"
        highlightColor="#2a2a2e"
        enableAnimation={true} // ← mặc định đã true, nhưng khai báo rõ
      >
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </SkeletonTheme>
    </>
  );
}

export default App;
