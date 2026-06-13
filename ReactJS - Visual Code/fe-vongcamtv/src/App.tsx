import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ContainerLoaderProvider from "./components/ContainerLoaderContext.tsx";
import routes from "./routes/index.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import smoothscroll from "smoothscroll-polyfill";
smoothscroll.polyfill();
const router = createBrowserRouter(routes);
function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ContainerLoaderProvider>
        <RouterProvider router={router} />
      </ContainerLoaderProvider>
    </QueryClientProvider>
  );
}

export default App;
