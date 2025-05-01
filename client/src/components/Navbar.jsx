import React from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Navbar = () => {
  // logout
  let navigate = useNavigate();

  const logOutUser = () => {
    localStorage.removeItem("data");
    toast.success("Logout successful.");
    navigate("/");
  };
  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-neutral-900 transition-all duration-300">
        <img
          className="h-9"
          src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/dummyLogo/dummyLogoColored.svg"
          alt="dummyLogoColored"
        />

        <div className="flex items-center gap-5 text-gray-400">
          <p>Hi! Admin</p>
          <button
            onClick={logOutUser}
            className="border rounded-full text-sm px-4 py-1"
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
}

export default Navbar
