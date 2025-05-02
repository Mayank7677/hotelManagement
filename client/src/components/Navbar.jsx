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
          className="h-9"
          src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/dummyLogo/dummyLogoColored.svg"
          alt="dummyLogoColored"
        />

        <div className="flex items-center gap-5 text-gray-800">
          <p>Hi! {name}</p>
          <button
            onClick={logOutUser}
            className="border border-gray-800 rounded-full text-sm px-4 py-1"
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
}

export default Navbar
