import React, { useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { DatePickerWithRange } from "../ui/Datepicker";
import BASE_URL from "../../utils/api";
import axios from "axios";

const RoomDetails = () => {
  const { id } = useParams();
  let location = useLocation();
  let { roomData } = location.state || {};
  console.log(roomData);

  const [date, setDate] = useState();
  const [isAvailable, setIsAvailable] = useState(null);
  let navigate = useNavigate();

  const checkAvailability = async () => {
    let token = JSON.parse(localStorage.getItem("data")).token;

    try {
      const res = await axios.post(
        `${BASE_URL}/bookings/checkAvailability`,
        {
          roomId: "681770a32638f25687f87e05",
          checkInDate: date.from.toISOString(),
          checkOutDate: date.to.toISOString(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await setIsAvailable(res.data.available);
      console.log(res.data);
    } catch (err) {
      console.error(err);
      setIsAvailable(null);
    }
  };

  return (
    <div className="pt-20 max-[400px]:px-3 px-10 md:px-40 lg:px-50 flex flex-col  border-2 pb-25 ">
      <div className="flex justify-between items-center">
        <h1 className="text-left text-3xl  tracking-tighter font-serif">
          {roomData.hotelId.name} , {roomData.locationId.name}
        </h1>
      </div>

      <div className="parent mt-5 rounded-3xl overflow-hidden h-100 ">
        <div className="div1 border">
          <img
            className="object-cover h-full w-full"
            src={roomData.images[4]?.url}
            alt=""
          />{" "}
        </div>
        <div className="div2 border">
          <img
            className="object-cover h-full w-full"
            src={roomData.images[1].url}
            alt=""
          />{" "}
        </div>
        <div className="div3 border">
          <img
            className="object-cover h-full w-full"
            src={roomData.images[2].url}
            alt=""
          />{" "}
        </div>
        <div className="div4 border ">
          <img
            className="object-cover h-full w-full"
            src={roomData.images[3].url}
            alt=""
          />{" "}
        </div>
        <div className="div5 border ">
          <img
            className="object-cover h-full w-full"
            src={roomData.images[0].url}
            alt=""
          />{" "}
        </div>
      </div>

      <div className="mt-3 flex flex-col gap-7">
        <h1 className="text-left text-2xl font-serif tracking-tight ">
          {roomData.roomType} Room in {roomData.locationId.name} ,{" "}
          {roomData.stateId.name}
        </h1>

        {/* <div>
          <h1 className="text-xl font-serif tracking-tight mb-2">
            Room Number
          </h1>
          <p className=" text-gray-700 tracking-tighter text-md">
            {roomData.roomNumber}
          </p>
        </div> */}

        <div>
          <h1 className="text-xl font-serif tracking-tight mb-2">
            About this Room :
          </h1>
          <p className=" text-gray-700 font-serif -mt-2 text-md">
            {roomData.description}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-serif tracking-tight mb-1">
              Amenities :
            </h1>
            <p className=" text-gray-800 font-serif text-md -mt-1">
              {roomData.amenities.map((a) => `${a} , `)}
            </p>
          </div>

          <div>
            <p className="text-gray-700 tracking-tight font-serif mt-2 border p-3 rounded-2xl w-fit bg-white">
              <span className="text-black">Contact us :</span> <br />{" "}
              {roomData.hotelId.contactNumber} , {roomData.hotelId.contactEmail}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-10 border-t border-gray-300 pt-10 flex justify-between items-center">
        <div className=" flex flex-col gap-8">
          <div className="flex gap-5 items-center">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                aria-hidden="true"
                role="presentation"
                focusable="false"
                // style="display: block; height: 24px; width: 24px; fill: currentcolor;"
                className="h-6 w-6 fill-current text-gray-900"
              >
                <path d="M16.84 27.16v-3.4l-.26.09c-.98.32-2.03.51-3.11.55h-.7A11.34 11.34 0 0 1 1.72 13.36v-.59A11.34 11.34 0 0 1 12.77 1.72h.59c6.03.16 10.89 5.02 11.04 11.05V13.45a11.3 11.3 0 0 1-.9 4.04l-.13.3 7.91 7.9v5.6H25.7l-4.13-4.13zM10.31 7.22a3.1 3.1 0 1 1 0 6.19 3.1 3.1 0 0 1 0-6.2zm0 2.06a1.03 1.03 0 1 0 0 2.06 1.03 1.03 0 0 0 0-2.06zM22.43 25.1l4.12 4.13h2.67v-2.67l-8.37-8.37.37-.68.16-.3c.56-1.15.9-2.42.96-3.77v-.64a9.28 9.28 0 0 0-9-9h-.55a9.28 9.28 0 0 0-9 9v.54a9.28 9.28 0 0 0 13.3 8.1l.3-.16 1.52-.8v4.62z"></path>
              </svg>
            </div>
            <div>
              <h1 className="font-serif text-xl">Great check-in experience</h1>
              <p className="font-serif text-gray-700 text-sm">
                Recent guests loved the smooth start to this stay.
              </p>
            </div>
          </div>

          <div className="flex gap-5 items-center">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                aria-hidden="true"
                role="presentation"
                focusable="false"
                // style="display: block; height: 24px; width: 24px; fill: currentcolor;"
                className="h-6 w-6 fill-current text-gray-900"
              >
                <path d="M17 6a2 2 0 0 1 2 1.85v8.91l.24.24H24v-3h-3a1 1 0 0 1-.98-1.2l.03-.12 2-6a1 1 0 0 1 .83-.67L23 6h4a1 1 0 0 1 .9.58l.05.1 2 6a1 1 0 0 1-.83 1.31L29 14h-3v3h5a1 1 0 0 1 1 .88V30h-2v-3H20v3h-2v-3H2v3H0V19a3 3 0 0 1 1-2.24V8a2 2 0 0 1 1.85-2H3zm13 13H20v6h10zm-13-1H3a1 1 0 0 0-1 .88V25h16v-6a1 1 0 0 0-.77-.97l-.11-.02zm8 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zM17 8H3v8h2v-3a2 2 0 0 1 1.85-2H13a2 2 0 0 1 2 1.85V16h2zm-4 5H7v3h6zm13.28-5h-2.56l-1.33 4h5.22z"></path>
              </svg>
            </div>
            <div>
              <h1 className="font-serif text-xl">Room in a apartment</h1>
              <p className="font-serif text-gray-700 text-sm">
                Your own room in a home, plus access to shared spaces.
              </p>
            </div>
          </div>

          <div className="flex gap-5 items-center">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                aria-hidden="true"
                role="presentation"
                focusable="false"
                // style="display: block; height: 24px; width: 24px; fill: currentcolor;"
                className="h-6 w-6 fill-current text-gray-900"
              >
                <path d="M11.67 0v1.67h8.66V0h2v1.67h6a2 2 0 0 1 2 1.85v16.07a2 2 0 0 1-.46 1.28l-.12.13L21 29.75a2 2 0 0 1-1.24.58H6.67a5 5 0 0 1-5-4.78V3.67a2 2 0 0 1 1.85-2h6.15V0zm16.66 11.67H3.67v13.66a3 3 0 0 0 2.82 3h11.18v-5.66a5 5 0 0 1 4.78-5h5.88zm-.08 8h-5.58a3 3 0 0 0-3 2.82v5.76zm-18.58-16h-6v6h24.66v-6h-6v1.66h-2V3.67h-8.66v1.66h-2z"></path>
              </svg>
            </div>
            <div>
              <h1 className="font-serif text-xl">Free cancellation</h1>
              <p className="font-serif text-gray-700 text-sm">
                Get a full refund if you change your mind.
              </p>
            </div>
          </div>
        </div>

        <div className="border border-gray-300 bg-white rounded-2xl px-10 py-5 flex flex-col items-enter justify-center gap-3">
          <h1 className="text-xl font-serif tracking-tight mb-1">
            Check Availability
          </h1>
          <DatePickerWithRange
            className="border border-gray-500 rounded-md"
            date={date}
            setDate={setDate}
          />
          <div className="flex items-center justify-between">
            <button
              onClick={checkAvailability}
              disabled={!date?.from || !date?.to}
              className=" rounded-md px-3 py-1 bg-blue-600 text-white w-fit"
            >
              Check
            </button>

            {isAvailable === true && (
              <button
                onClick={() =>
                  navigate("/bookRoom", {
                    state: {
                      roomData,
                      checkInDate: date.from.toISOString(),
                      checkOutDate: date.to.toISOString(),
                    },
                  })
                }
                className=" rounded-md px-3 py-1 bg-green-600 text-white w-fit"
              >
                Book Now
              </button>
            )}

            {isAvailable === false && (
              <p className="text-red-600 tracking-tight font-[500]">
                Room is not Available
              </p>
            )}
            {isAvailable === true && (
              <p className="text-green-600 tracking-tight font-[500]">
                Room is Available
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
