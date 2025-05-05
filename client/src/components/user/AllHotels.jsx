import React, { useEffect, useRef, useState } from "react";
import HotelCard from "./HotelCard";
import axios from "axios";
import BASE_URL from "../../utils/api";

const AllHotels = () => {
  const [hotelData, setHotelData] = useState([]);

  const fetchData = async () => {
    let token = JSON.parse(localStorage.getItem("data")).token;

    try {
      const res = await axios.get(`${BASE_URL}/hotels/getAll`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data);

      setHotelData(res.data);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className=" min-h-screen pt-25  px-[15%] pb-5 flex flex-col gap-7 ">
      <div className="mb-10">
        <h1 className="text-5xl   tracking-tighter font-serif">
          Your Perfect Stay Starts Here
        </h1>
        <h1 className="text-2xl   tracking-tighter font-serif">
          Discover Comfort & Convenience
        </h1>
      </div>
      {hotelData.map((hotel) => (
        <HotelCard key={hotel._id} hotel={hotel} />
      ))}
    </div>
  );
};

export default AllHotels;
