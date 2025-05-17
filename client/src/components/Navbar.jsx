import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ModeToggle } from "./modeToggle";
import { useTheme } from "@/components/ThemeProvider";
import { FaUserCircle } from "react-icons/fa";



const Navbar = () => {
  // logout
  let navigate = useNavigate();

  const userData = JSON.parse(localStorage.getItem("data"));
  // const profileImg = userData?.user?.profileImg;

  const [profileImg, setProfileImg] = React.useState(
    userData?.user?.profileImg
  );


  const logOutUser = () => {
    localStorage.removeItem("data");
    toast.success("Logout successful.");
    navigate("/");
  };


  
  const {theme} = useTheme();
  

  return (
    <>
      {/* Header */}
      <div
        className={`flex fixed w-full z-1 items-center justify-between font-serif px-4 md:px-8  py-3   transition-all duration-300 border-b border-gray-300 rounded-b-4xl ${
          theme === "dark"
            ? "bg-neutral-900 text-white border-gray-500"
            : "bg-white text-black"
        }`}
      >
        {/* <img
          className="h-12"
          src="https://cdn.brandfetch.io/idC6eY3m41/theme/dark/logo.svg?c=1dxbfHSJFAPEGdCLU4o5B"
          alt="dummyLogoColored"
        /> */}
        <p className="text-2xl">QuickStays</p>

        <div className="flex items-center gap-5 ">
          {/* <p className="max-sm:hidden font-serif">Hi! {name}</p> */}
          {/* <div class="flex flex-col w-44 text-sm">
            <button
              type="button"
              class="peer group w-fit text-left px-4 pr-2 py-2 border rounded bg-white text-gray-700 border-gray-300 shadow-sm hover:bg-gray-50 focus:outline-none"
            >
              <span>Select</span>
              <svg
                class="w-5 h-5 inline float-right transition-transform duration-200 -rotate-90 group-focus:rotate-0"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="#6B7280"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 9-7 7-7-7"
                />
              </svg>
            </button>

            <ul class="hidden overflow-hidden peer-focus:block w-fit absolute mt-10 bg-white border border-gray-300 rounded shadow-md  py-2">
              <li class="px-4 py-2 hover:bg-indigo-500 hover:text-white cursor-pointer">
                Germany
              </li>
              <li class="px-4 py-2 hover:bg-indigo-500 hover:text-white cursor-pointer">
                Canada
              </li>
              <li class="px-4 py-2 hover:bg-indigo-500 hover:text-white cursor-pointer">
                United States
              </li>
              <li class="px-4 py-2 hover:bg-indigo-500 hover:text-white cursor-pointer">
                Russia
              </li>
            </ul>
          </div> */}
          <div>
            <ModeToggle />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger >
              <div>
                <img
                  className="h-8 w-8 rounded-full object-center  "
                  src={profileImg}
                  alt=""
                />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel className="font-serif ">
                My Account
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link to="/profile">
                <DropdownMenuItem className="font-serif">
                  Account
                </DropdownMenuItem>
              </Link>
              <Link to="/profile/reset">
                <DropdownMenuItem className="font-serif">
                  Reset Password
                </DropdownMenuItem>
              </Link>
              <Link to="/profile/yourbookings">
                <DropdownMenuItem className="font-serif">
                  Your Bookings
                </DropdownMenuItem>
              </Link>

              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <button
                  onClick={logOutUser}
                  className=" cursor-pointer font-serif rounded-full text-sm text-red-500"
                >
                  Logout
                </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      

    </>
  );
};

export default Navbar;
