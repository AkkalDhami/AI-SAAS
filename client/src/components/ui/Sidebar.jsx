import { Protect, useClerk, useUser } from "@clerk/clerk-react";
import {
  Eraser,
  FileText,
  Hash,
  House,
  Image,
  LogOut,
  Scissors,
  SquarePen,
  Users,
} from "lucide-react";
import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = ({ sidebaropen, setSidebaropen }) => {
  const { user } = useUser();
  const { signOut } = useClerk();

  const navItems = [
    {
      name: "Dashboard",
      path: "/ai/dashboard",
      Icon: <House />,
    },
    {
      name: "Write Article",
      path: "/ai/write-article",
      Icon: <SquarePen />,
    },
    {
      name: "Blog Titles",
      path: "/ai/blog-titles",
      Icon: <Hash />,
    },
    {
      name: "Generate Images",
      path: "/ai/generate-images",
      Icon: <Image />,
    },
    {
      name: "Remove Background",
      path: "/ai/remove-background",
      Icon: <Eraser />,
    },
    {
      name: "Remove Object",
      path: "/ai/remove-object",
      Icon: <Scissors />,
    },

    {
      name: "Review Resume",
      path: "/ai/review-resume",
      Icon: <FileText />,
    },
    {
      name: "Community",
      path: "/ai/community",
      Icon: <Users />,
    },
  ];

  return (
    <>
      <div
        className={`w-68 bg-white border-r border-gray-200 flex flex-col justify-between items-center max-sm:absolute top-14 bottom-0 z-10 ${
          sidebaropen ? "translate-x-0" : "max-sm:-translate-x-full"
        }  transition-all duration-300 ease-in-out`}>
        <div className="my-7 w-full">
          <img
            className="w-13 rounded-full mx-auto"
            alt="User avatar"
            src={user.imageUrl}
          />
          <h1 className="mt-1 text-center">{user.fullName}</h1>
          <div className="px-6 mt-5 text-sm text-gray-600 font-medium space-y-1">
            {navItems.map(({ name, path, Icon }) => (
              <NavLink
                to={path}
                key={name}
                end={path === "/ai"}
                onClick={() => setSidebaropen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-4 py-2 px-4 rounded-md hover:bg-gray-100 ${
                    isActive ? "bg-gradient text-white" : ""
                  }`
                }>
                {Icon}
                <span>{name}</span>
              </NavLink>
            ))}
          </div>
        </div>
        <div className="w-full border-t border-gray-200 p-4 px-7 flex items-center justify-between">
          <div className="flex w-full gap-2 items-center justify-between cursor-pointer">
            <div className="flex items-center gap-2">
              <img
                className="w-8 rounded-full"
                alt="User avatar"
                src={user.imageUrl}
              />
              <div>
                <h1 className="text-sm font-medium">{user.fullName}</h1>
                <p className="text-xs text-gray-500">
                  <Protect plan={"premium"} fallback="Free">
                    Premium {""}
                  </Protect>
                  Plan
                </p>
              </div>
            </div>

            <LogOut onClick={signOut} className="text-gray-500 w-4" />
          </div>
        </div>
      </div>
      {/* <div className="flex-1 bg-[#F4F7FB]">
        <div className="h-full overflow-y-auto p-6">
          <div className="flex justify-start gap-4 flex-wrap">
            <div className="flex justify-between items-center w-72 p-4 px-6 bg-white rounded-xl border border-gray-200">
              <div className="text-slate-600">
                <p className="text-sm">Total Creations</p>
                <h2 className="text-xl font-semibold">0</h2>
              </div>
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#3588F2] to-[#0BB0D7] text-white flex justify-center items-center"></div>
            </div>
            <div className="flex justify-between items-center w-72 p-4 px-6 bg-white rounded-xl border border-gray-200">
              <div className="text-slate-600">
                <p className="text-sm">Active Plan</p>
                <h2 className="text-xl font-semibold">Free</h2>
              </div>
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#FF61C5] to-[#9E53EE] text-white flex justify-center items-center"></div>
            </div>
          </div>
          <div className="space-y-3">
            <p className=" mt-6 mb-4">Recent Creations</p>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default Sidebar;
