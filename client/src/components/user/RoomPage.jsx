import React, { useEffect, useState } from "react";

import axios from "axios";
import BASE_URL from "../../utils/api";
import RoomCard from "./RoomCard";
import { Link, useLocation, useParams } from "react-router-dom";

const RoomPage = () => {

  const { id } = useParams()
  const location = useLocation();
  const { hotelData } = location.state
  console.log(hotelData);

  const [roomData, setRoomData] = useState([]);

  const fetchRoomData = async () => {
    let token = JSON.parse(localStorage.getItem("data")).token;
    // console.log(token);

    try {
      const res = await axios.get(`${BASE_URL}/rooms/getAllByHotel?id=${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(res.data);

      setRoomData(res.data);
    } catch (error) {
      console.log(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchRoomData();
  }, []);

  return (
    <div className="min-h-screen pt-20 sm:pt-25 px-1  sm:px-15 pb-15  ">
      <div className=" w-full mb-5 border-b pb-7 border-gray-400">
        <div className="flex flex-col gap-5 sm:flex-row-reverse sm:justify-between">
          <Link to="/home" >
          <p className="text-blue-600 underline  border-gray-400  py-0.5 w-fit rounded-xl text-right">
            Back
          </p>
        </Link>
          <h1 className="text-4xl  tracking-tighter font-serif">
            {hotelData.name}
          </h1>
        </div>
        <p className="text-gray-900 tracking-tight font-serif">
          {hotelData.address} , {hotelData.stateId.name}
        </p>
        <p className="text-gray-700 tracking-tight mt-4 sm:w-1/2 leading-4.5 font-serif">
          {hotelData.description}
        </p>
        <p className="text-gray-700 tracking-tight font-serif mt-4 border p-3 rounded-2xl w-fit bg-white">
          <span className="text-black">Contact us :</span> <br />{" "}
          {hotelData.contactNumber} , {hotelData.contactEmail}
        </p>
      </div>

      <p className="text-2xl  tracking-tight font-serif mt-7 mb-3">
        Explore Our Rooms :
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 pt-2 ">
        {roomData.map((room) => (
          <RoomCard key={room._id} room={room} />
        ))}
      </div>
    </div>
  );
};

export default RoomPage;
