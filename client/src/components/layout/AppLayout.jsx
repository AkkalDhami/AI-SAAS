import React, { useState } from "react";
import Navbar from "./Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import { LucideMenu, LucideX } from "lucide-react";
import Sidebar from "../ui/Sidebar";
import { useUser, SignIn } from "@clerk/clerk-react";

const AppLayout = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useUser();
  return user ? (
    <>
      <div className="flex flex-col items-start justify-start h-screen">
        <nav className="w-full px-8 min-h-14 flex items-center justify-between border-b border-gray-200">
          <img
            className="w-32 sm:w-44 "
            alt="logo"
            src={assets.logo}
            onClick={() => navigate("/")}
          />
          {sidebarOpen ? (
            <LucideX
              size={20}
              strokeWidth={2}
              className="text-gray-500"
              onClick={() => setSidebarOpen(false)}
            />
          ) : (
            <LucideMenu
              size={20}
              strokeWidth={2}
              className="text-gray-500 sm:hidden"
              onClick={() => setSidebarOpen(true)}
            />
          )}
        </nav>

        <div className="flex-1 w-full flex h-[calc(100vh-64px)]">
          <Sidebar sidebaropen={sidebarOpen} setsidebaropen={setSidebarOpen} />
          <div className="flex-1 overflow-y-auto">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  ) : (
    <div className="flex items-center justify-center h-screen">
      <SignIn />
    </div>
  );
};

export default AppLayout;
