import { Outlet } from "react-router-dom";
const AuthLayout = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500">
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-full max-w-md px-6 py-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
