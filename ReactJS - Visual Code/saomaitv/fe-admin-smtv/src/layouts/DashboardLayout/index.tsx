import type React from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { Outlet } from "react-router-dom";

const DashboardLayout: React.FC = () => {
  return (
    <div className="flex flex-col flex-auto flex-shrink-0 h-screen bg-gray-900 pl-14 pt-14 md:pl-64">
      <Header />
      <Sidebar />
      <div className="w-full h-full overflow-hidden relative">
        <div className="p-2 h-full overflow-auto">
  
            <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
