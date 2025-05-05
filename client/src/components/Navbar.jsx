import React from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Navbar = () => {
  // logout
  let navigate = useNavigate();

  let user = JSON.parse(localStorage.getItem("data")).user;
  let name = user.name.split(" ")[0];
  const logOutUser = () => {
    localStorage.removeItem("data");
    toast.success("Logout successful.");
    navigate("/");
  };
  return (
    <>
      {/* Header */}
      <div className="flex fixed w-full z-1 items-center justify-between px-4 md:px-8  py-3 bg-[#f7fcfe]  transition-all duration-300">
        <img
          className="h-12"
          src="https://cdn.brandfetch.io/idC6eY3m41/theme/dark/logo.svg?c=1dxbfHSJFAPEGdCLU4o5B"
          alt="dummyLogoColored"
        />

        <div className="flex items-center gap-5 ">
          <p className='max-sm:hidden'>Hi! {name}</p>
          <button
            onClick={logOutUser}
            className="border border-gray-400 bg-white cursor-pointer rounded-full text-sm px-4 py-1"
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
}

export default Navbar
