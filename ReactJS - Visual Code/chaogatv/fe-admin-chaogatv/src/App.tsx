import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { Slide, ToastContainer } from "react-toastify";
import { routes } from "./routes/routeConfig";
import { AuthProvider } from "./providers/Auth.provider";

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-900">
    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-yellow-500 border-solid" role="status">
      <span className="sr-only">Đang tải...</span>
    </div>
  </div>
);

function App() {
  console.log("Current mode:", import.meta.env.MODE);
  console.log("API URL:", import.meta.env.VITE_API_URL);

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar={false}
        transition={Slide}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable={false}
      />

      <Suspense fallback={<LoadingFallback />}>
        <AuthProvider>
          <RouterProvider router={routes} />
        </AuthProvider>
      </Suspense>
    </>
  );
}

export default App;
