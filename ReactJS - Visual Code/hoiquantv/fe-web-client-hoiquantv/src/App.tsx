import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ContainerLoaderProvider from "./providers/ContainerLoaderProvider";
import DataProvider from "./providers/DataProvider";
import AuthModalProvider from "./providers/AuthModalProvider";
import AuthProvider from "./providers/AuthProvider";
import { Toaster } from "react-hot-toast";

function App() {
  const router = createBrowserRouter(routes);
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 1000,
          style: {
            background: "#0a0a0a",
            color: "#fff",
            fontSize: 12,
            border: "1px solid #1e40af", // xanh dương
          },
        }}
      />
      <ContainerLoaderProvider>
        <DataProvider>
          <AuthProvider>
            <AuthModalProvider>
              <RouterProvider router={router} />
            </AuthModalProvider>
          </AuthProvider>
        </DataProvider>
      </ContainerLoaderProvider>
    </QueryClientProvider>
  );
}

export default App;
