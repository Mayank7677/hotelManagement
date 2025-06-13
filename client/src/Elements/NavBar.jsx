import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { RiMenu3Fill } from "react-icons/ri";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { ModeToggle } from "../components/modeToggle";
import { useTheme } from "../components/ThemeProvider";
import BASE_URL from "../utils/api";
import axios from "axios";

const NavBar = () => {
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Explore", path: "/allHotels" },
    { name: "Contact", path: "/contact" },
    { name: "About", path: "/about" },
  ];

  const location = useLocation();
  const navigate = useNavigate();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [isLogin, setIsLogin] = useState(false);
  const [name, setName] = useState("");
  const [profileImg, setProfileImg] = useState("");
  const [role, setRole] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (location.pathname !== "/") {
      setIsScrolled(true);
      return;
    } else {
      setIsScrolled(false);
    }
    setIsScrolled((prev) => (location.pathname !== "/" ? true : prev));

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("data"));
    if (userData) {
      setIsLogin(true);
      setName(userData.user?.name || "");
      setProfileImg(userData.user?.profileImg || "");
      setRole(userData.user?.role || "");
      setIsAdmin(userData.user?.role === "admin");
    } else {
      setIsLogin(false);
      setName("");
      setProfileImg("");
      setRole("");
      setIsAdmin(false);
    }
  }, [localStorage.getItem("data")]); // dependency to trigger on change

  const logOutUser = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/users/logout`);
      localStorage.removeItem("data");
      toast.success("Logout successful.");
      setIsLogin(false);
      setProfileImg("");
      setName("");
      setRole("");
      setIsAdmin(false);
      setIsMenuOpen(false);
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error in logout");
    }
  };

  const isAdminRoute = location.pathname.startsWith("/admin");

  const { theme } = useTheme();

  return (
    <nav
      className={`fixed top-0 left-0 w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-50 ${
        isScrolled
          ? theme === "dark"
            ? "bg-neutral-800 backdrop-blur-lg py-3 rounded-b-4xl shadow-md text-white border-b border-neutral-500"
            : "bg-white/80 shadow-md text-gray-700 backdrop-blur-lg py-3 rounded-b-4xl"
          : "py-4 md:py-6"
      }`}
    >
      {/* Logo */}
      <Link
        to="/"
        onClick={() => window.scrollTo(0, 0)}
        className="flex items-center gap-2"
      >
        <p
          className={`text-3xl font-serif ${
            isScrolled
              ? theme === "dark"
                ? "text-gray-200"
                : "text-gray-700"
              : "text-white"
          }`}
        >
          StaySphere
        </p>
      </Link>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-4 lg:gap-8">
        {!isAdminRoute &&
          navLinks.map((link, i) => (
            <Link
              key={i}
              to={link.path}
              onClick={() => window.scrollTo(0, 0)}
              className={`group  flex flex-col gap-0.5 font-serif ${
                isScrolled
                  ? theme === "dark"
                    ? "text-gray-200"
                    : "text-gray-700"
                  : "text-white"
              }`}
            >
              {link.name}
              <div
                className={`h-[1px] w-0 group-hover:w-full transition-all duration-300  ${
                  isScrolled ? "bg-gray-700" : "bg-white"
                }`}
              ></div>
              <div
                className={`$${
                  isScrolled ? "bg-gray-700" : "bg-white"
                } h-0.5 w-0 group-hover:w-full transition-all duration-300`}
              />
            </Link>
          ))}

        {isAdmin && !isAdminRoute && (
          <Link to="/admin" onClick={() => window.scrollTo(0, 0)}>
            <button
              className={`border border-gray-400 px-4 py-1 text-sm font-[400] rounded-full cursor-pointer ${
                isScrolled
                  ? theme === "dark"
                    ? "text-gray-200"
                    : "text-gray-900"
                  : "text-white"
              } transition-all`}
            >
              Dashboard
            </button>
          </Link>
        )}
      </div>

      {/* Desktop Right */}
      <div className="hidden md:flex items-center gap-4">
        <ModeToggle />
        {isLogin ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="flex items-center gap-2 cursor-pointer">
                <img
                  className="h-8 w-8 rounded-full object-center"
                  src={profileImg}
                  alt="Profile"
                />
                <p
                  className={`font-serif ${
                    isScrolled
                      ? theme === "dark"
                        ? "text-gray-200"
                        : "text-gray-700"
                      : "text-white"
                  }`}
                >
                  Hyy, {name}
                </p>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel className="font-serif">
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
              <Link to="/profile/bookings">
                <DropdownMenuItem className="font-serif">
                  Your Bookings
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <button
                  onClick={logOutUser}
                  className="text-red-500 font-serif text-sm"
                >
                  Logout
                </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link to="/login">
            <button className="bg-black text-white px-8 py-2 rounded-full transition-all duration-500">
              Login
            </button>
          </Link>
        )}
      </div>

      {/* Mobile Menu Button */}
      <div className="flex items-center gap-3 md:hidden">
        <ModeToggle />
        <span
          className={`text-xl text-white cursor-pointer ${
            isScrolled ? (theme === "dark" ? "text-gray-200" : "invert") : ""
          }`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <RiMenu3Fill />
        </span>
      </div>

      {/* Mobile Menu */}
      <div
        className={`  fixed top-0 left-0 w-full h-screen  flex flex-col md:hidden items-center justify-center gap-6 text-gray-800 transition-all duration-500 ${
          isMenuOpen
            ? theme === "dark"
              ? "bg-neutral-800 text-white"
              : "bg-white translate-x-0"
            : "-translate-x-full"
        }`}
      >
        <button
          className="absolute top-4 right-4"
          onClick={() => setIsMenuOpen(false)}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {navLinks.map((link, i) => (
          <a key={i} href={link.path} onClick={() => setIsMenuOpen(false)}>
            {link.name}
          </a>
        ))}

        {isAdmin && (
          <div>
            <Link to="/admin" onClick={() => setIsMenuOpen(false)}>
              <button className="border px-4 py-1 text-sm font-[400] rounded-full">
                Dashboard
              </button>
            </Link>
          </div>
        )}

        {isLogin ? (
          <div className="flex flex-col gap-10">
            <Link to={"/profile"} onClick={() => setIsMenuOpen(false)}>
              <button className="bg-pink-500 text-white px-8 py-2 rounded-full">
                My Account
              </button>
            </Link>

            <button
              onClick={logOutUser}
              className="text-red-500 font-serif text-sm border py-2 rounded-full border-red-600"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login" onClick={() => setIsMenuOpen(false)}>
            <button className="bg-black text-white px-8 py-2 rounded-full">
              Login
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
