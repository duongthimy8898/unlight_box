import "./global.css";
// import { useEffect, useState } from "react";
// import { SplashScreen } from "../shared/components/SplashScreen";
import { RouterProvider } from "@tanstack/react-router";
import { router } from "./router";
function App() {
  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setIsLoading(false);
  //   }, 500);
  // }, []);
  // if (isLoading) return <SplashScreen />;

  return (
      <RouterProvider router={router} />
  );
}

export default App;
