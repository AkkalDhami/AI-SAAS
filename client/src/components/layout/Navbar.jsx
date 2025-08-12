import React from "react";
import { assets } from "../../assets/assets";
import { LucideMoveRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  useClerk,
  UserButton,
  useUser,
} from "@clerk/clerk-react";

const Navbar = () => {
  const navigate = useNavigate();

  const { user } = useUser();
  const { openSignIn } = useClerk();

  return (
    <div className="fixed z-5 w-full backdrop-blur-2xl flex justify-between items-center py-3 px-4 sm:px-20 xl:px-32 cursor-pointer">
      <img
        className="w-32 sm:w-44 "
        alt="logo"
        src={assets.logo}
        onClick={() => navigate("/")}
      />

      {user ? (
        <UserButton />
      ) : (
        <button
          className="flex items-center gap-2 rounded-full text-sm cursor-pointer bg-gradient text-white px-6 py-2.5"
          onClick={openSignIn}>
          Sign In{" "}
          <LucideMoveRight size={20} strokeWidth={2} className="text-white" />
        </button>
      )}
    </div>
  );
};

export default Navbar;
