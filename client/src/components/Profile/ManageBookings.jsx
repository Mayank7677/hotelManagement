import React, { useEffect, useState } from "react";
import axios from "axios";
import BASE_URL from "../../utils/api";
import { toast } from "sonner";
const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);
  const fatchUserBooking = async () => {
    let token = JSON.parse(localStorage.getItem("data")).token;

    try {
      const res = await axios.get(`${BASE_URL}/bookings/getUserBookings`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBookings(res.data);
      console.log(res.data);
      // console.log(res.data);
    } catch (error) {
      console.log(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    fatchUserBooking();
  }, []);

  const confirmBookingUser = async (id) => {
    let token = JSON.parse(localStorage.getItem("data")).token;
    console.log(token);

    try {
      let res = await axios.put(
        `${BASE_URL}/bookings/confirmBookingUser?id=${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(res.data.message);
      fatchUserBooking();
    } catch (error) {
      toast.error(error.response.data.message);
      // console.log(error.response.data.message);
    }
  };

  const cancellBookingUser = async (id) => {
    let token = JSON.parse(localStorage.getItem("data")).token;
    console.log(token);

    try {
      let res = await axios.put(
        `${BASE_URL}/bookings/cancelBookingUser?id=${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(res.data.message);
      fatchUserBooking();
    } catch (error) {
      toast.error(error.response.data.message);
      // console.log(error.response.data.message);
    }
    };
    
   

  return (
    <div className="pb-15">
      <div>
        <h1
          className="font-medium mt-5 text-3xl tracking-tighter font-serif
          "
        >
          {" "}
          Find your perfect stay
        </h1>
        <p className="text-sm md:text-base tracking-tight text-gray-800 mt-2 max-w-174 ">
          Take advantage of our limited-time offers and special packages to
          enhance your stay and create unforgettable memories.
        </p>
      </div>

      <div className="max-w-6xl mt-8 w-full text-gray-800">
        <div className="hidden md:grid md:grid-cols-[3fr_2fr_1fr] w-full border-b border-gray-300 font-medium text-base py-3 ">
          <div className="">Hotels</div>
          <div className="pl-[13%]">Date & Timings</div>
          <div className="pl-[32%]">Manage</div>
        </div>

        {bookings.sort(  (a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((booking, index) => (
          <div
            key={index}
            className="grid grid-cols-1 md:grid-cols-[3fr_2fr_1fr] w-full border-b border-gray-300 py-6 first:border-t "
          >
            <div className="flex flex-col md:flex-row">
              <img
                className="min-md:w-44 rounded-2xl shadow object-cover"
                src={booking.roomId.images[0].url}
                alt=""
              />
              <div className="flex flex-col gap-1.5 max-md:mt-3 min-md:ml-4">
                <p className="text-2xl font-serif tracking-tight">
                            {booking.hotelId.name} , <span className="text-[15px]">({ booking.roomId.roomNumber })</span>{" "}
                </p>
                <div class="flex items-center gap-1 text-sm text-gray-700 tracking-tight font-serif">
                  <img
                    className="text-black"
                    alt="location-icon"
                    src="data:image/svg+xml,%3csvg%20width='15'%20height='17'%20viewBox='0%200%2015%2017'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20clip-path='url(%23clip0_4158_214)'%3e%3cpath%20d='M12.247%206.74154C12.247%2010.0702%208.97128%2013.5369%207.87128%2014.6075C7.76881%2014.6944%207.64406%2014.7414%207.51585%2014.7414C7.38764%2014.7414%207.2629%2014.6944%207.16042%2014.6075C6.06042%2013.5369%202.78467%2010.0702%202.78467%206.74154C2.78467%205.32705%203.28313%203.97049%204.1704%202.9703C5.05767%201.97011%206.26106%201.4082%207.51585%201.4082C8.77064%201.4082%209.97403%201.97011%2010.8613%202.9703C11.7486%203.97049%2012.247%205.32705%2012.247%206.74154Z'%20stroke='%236a7282'%20stroke-width='1.5'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M7.51589%208.74023C8.49575%208.74023%209.29009%207.8448%209.29009%206.74023C9.29009%205.63566%208.49575%204.74023%207.51589%204.74023C6.53603%204.74023%205.7417%205.63566%205.7417%206.74023C5.7417%207.8448%206.53603%208.74023%207.51589%208.74023Z'%20stroke='%236a7282'%20stroke-width='1.5'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_4158_214'%3e%3crect%20width='14.1935'%20height='16'%20fill='white'%20transform='translate(0.419189%200.0742188)'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e"
                  />
                  <span>{booking.hotelId.address}</span>
                </div>
                <div class="flex items-center gap-1 text-sm text-gray-700 tracking-tight font-serif">
                  <img
                    alt="guests-icon"
                    src="data:image/svg+xml,%3csvg%20width='16'%20height='16'%20viewBox='0%200%2016%2016'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20clip-path='url(%23clip0_4398_966)'%3e%3cpath%20d='M11.3334%2014V12.6667C11.3334%2011.9594%2011.0524%2011.2811%2010.5523%2010.781C10.0522%2010.281%209.37393%2010%208.66669%2010H3.33335C2.62611%2010%201.94783%2010.281%201.44774%2010.781C0.947639%2011.2811%200.666687%2011.9594%200.666687%2012.6667V14M15.3334%2014V12.6667C15.3329%2012.0758%2015.1363%2011.5018%2014.7743%2011.0349C14.4123%2010.5679%2013.9054%2010.2344%2013.3334%2010.0867M10.6667%202.08667C11.2403%202.23353%2011.7487%202.56713%2012.1118%203.03487C12.4748%203.50261%2012.6719%204.07789%2012.6719%204.67C12.6719%205.26211%2012.4748%205.83739%2012.1118%206.30513C11.7487%206.77287%2011.2403%207.10647%2010.6667%207.25333M8.66669%204.66667C8.66669%206.13943%207.47278%207.33333%206.00002%207.33333C4.52726%207.33333%203.33335%206.13943%203.33335%204.66667C3.33335%203.19391%204.52726%202%206.00002%202C7.47278%202%208.66669%203.19391%208.66669%204.66667Z'%20stroke='%237B818E'%20stroke-width='1.5'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_4398_966'%3e%3crect%20width='16'%20height='16'%20fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e"
                  />
                  <span>Guests: {booking.numberOfGuests}</span>
                </div>
                <p class="font-serif">Total: ₹{booking.totalAmount}</p>
              </div>
            </div>

            <div class="flex flex-row md:items-center md:gap-12 mt-3 gap-8">
              <div>
                <p className="font-serif">Check-In:</p>
                <p class="text-gray-500 text-sm font-serif">
                  {new Date(booking.checkInDate).toDateString()}
                </p>
              </div>
              <div>
                <p className="font-serif">Check-Out:</p>
                <p class="text-gray-500 text-sm font-serif">
                  {new Date(booking.checkOutDate).toDateString()}
                </p>
              </div>
            </div>

            <div className="flex flex-col justify-center items-center pt-3">
              {booking.status === "pending" && (
                <div className="flex items-center gap-2">
                  <div className={`h-3 w-3 rounded-full bg-yellow-400`}></div>
                  <p
                    className={`text-sm font-serif rounded-full text-yellow-400`}
                  >
                    Pending
                  </p>
                </div>
              )}

              {booking.isChecking === "confirm" &&
                booking.status === "booked" && (
                  <div className="flex items-center gap-2">
                    <div className={`h-3 w-3 rounded-full bg-green-500`}></div>
                    <p
                      className={`text-sm font-serif rounded-full text-green-500`}
                    >
                      Booked
                    </p>
                  </div>
                )}

              {(booking.status === "cancelled" ||
                booking.isChecking === "cancelled") && (
                <div className="flex items-center gap-2">
                  <div className={`h-3 w-3 rounded-full bg-red-500`}></div>
                  <p className={`text-sm font-serif rounded-full text-red-500`}>
                    Cancelled{" "}
                    {booking.status === "cancelled" ? (
                      <span className="block">(by Admin)</span>
                    ) : (
                      <span className="block">(by You)</span>
                    )}
                  </p>
                </div>
              )}

              {booking.status === "booked" &&
                booking.isChecking === "pending" && (
                  <>
                    <button
                      onClick={() => confirmBookingUser(booking._id)}
                      class="px-4 py-1.5 mt-4 text-xs border border-blue-500 text-blue-500 rounded-full hover:bg-gray-50 transition-all cursor-pointer font-serif"
                    >
                      Confirm
                    </button>
                    <button
                      onClick={() => cancellBookingUser(booking._id)}
                      class="px-4 py-1.5 mt-4 text-xs border border-red-500 text-red-500 rounded-full hover:bg-gray-50 transition-all cursor-pointer font-serif"
                    >
                      Cancell
                    </button>
                  </>
                )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageBookings;
