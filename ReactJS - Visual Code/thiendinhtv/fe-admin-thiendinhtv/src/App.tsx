import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { Slide, ToastContainer } from "react-toastify";
import { routes } from "./routes/routeConfig";
import { AuthProvider } from "./providers/Auth.provider";
// import { format } from "date-fns";

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-900">
    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-yellow-500 border-solid" role="status">
      <span className="sr-only">Đang tải...</span>
    </div>
  </div>
);

function App() {
  console.log("Current mode:", import.meta.env.MODE);
  console.log("API URL:", import.meta.env.VITE_SERVER_API_BASE_URL);
  // console.log(format(new Date("2026-01-09T02:45:00+07:00"), 'yyyy-MM-dd HH:mm'))
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
