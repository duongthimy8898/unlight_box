import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import routes from "./routes";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DataProvider from "./providers/DataProvider";
import ContainerLoaderProvider from "./providers/ContainerLoaderProvider";

function App() {
  const router = createBrowserRouter(routes);
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ContainerLoaderProvider>
        <DataProvider>
          <RouterProvider router={router} />
        </DataProvider>
      </ContainerLoaderProvider>
    </QueryClientProvider>
  );
}

export default App;
