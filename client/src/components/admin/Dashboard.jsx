import React from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const dashboardicon = (
    <svg
      className="w-6 h-6"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M4 5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5Zm16 14a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2ZM4 13a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6Zm16-2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v6Z"
      />
    </svg>
  );

  const overviewicon = (
    <svg
      className="w-6 h-6"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
        d="M7.111 20A3.111 3.111 0 0 1 4 16.889v-12C4 4.398 4.398 4 4.889 4h4.444a.89.89 0 0 1 .89.889v12A3.111 3.111 0 0 1 7.11 20Zm0 0h12a.889.889 0 0 0 .889-.889v-4.444a.889.889 0 0 0-.889-.89h-4.389a.889.889 0 0 0-.62.253l-3.767 3.665a.933.933 0 0 0-.146.185c-.868 1.433-1.581 1.858-3.078 2.12Zm0-3.556h.009m7.933-10.927 3.143 3.143a.889.889 0 0 1 0 1.257l-7.974 7.974v-8.8l3.574-3.574a.889.889 0 0 1 1.257 0Z"
      />
    </svg>
  );

  const chaticon = (
    <svg
      className="w-6 h-6"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M7 9h5m3 0h2M7 12h2m3 0h5M5 5h14a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-6.616a1 1 0 0 0-.67.257l-2.88 2.592A.5.5 0 0 1 8 18.477V17a1 1 0 0 0-1-1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z"
      />
    </svg>
  );

  const sidebarLinks = [
    { name: "Add State", path: "/admin", icon: dashboardicon },
    { name: "Add City", path: "/admin/city", icon: overviewicon },
    { name: "Add Hotel", path: "/admin/hotel", icon: chaticon },
    { name: "Add Room", path: "/admin/room", icon: chaticon },
  ];

  return (
    <>
      {/* Sidebar + Main Content */}
      <div className="flex min-h-screen pt-15 relative ">
        {/* Sidebar */}
        <div className="md:w-64 w-16 h-full fixed  sm:pr-2 text-base  mt-4  gap-2 flex flex-col transition-all duration-300 bg-[#f7fcfe]  pt-4   ">
          <p className="bg-blue-600 text-white py-2 font-bold text-xl  tracking-tighter text-center  mb-3 rounded-2xl">
            Manage Locations
          </p>

          {sidebarLinks.map((item, index) => (
            <NavLink
              to={item.path}
              key={index}
              end={item.path === "/admin"}
              className={({ isActive }) =>
                `flex items-center py-2 border border-gray-300 rounded-r-3xl  gap-2 text-md font-semibold tracking-tight transition-colors duration-200 ${
                  isActive
                    ? " text-gray-800  bg-blue-200"
                    : " text-gray-800 bg-white"
                }`
              }
            >
              {item.icon}
              <p className="md:block hidden text-center">{item.name}</p>
            </NavLink>
          ))}
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 pb-10 rounded-tl-3xl mt-3 border border-neutral-200  md:ml-64 ml-16 bg-white w-[85vw]  h-full fixed overflow-scroll">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
