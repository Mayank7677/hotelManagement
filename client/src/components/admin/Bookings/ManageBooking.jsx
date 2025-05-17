import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import axios from "axios";
import BASE_URL from "../../../utils/api";
import { toast } from "sonner";

const ManageBooking = () => {
  const [bookingData, setBookingData] = useState([]);

  const fetchData = async () => {
    let token = JSON.parse(localStorage.getItem("data")).token;

    try {
      let res = await axios.get(`${BASE_URL}/bookings/getAll`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBookingData(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const approvedReq = async (id) => {
    let token = JSON.parse(localStorage.getItem("data")).token;

    try {
      let res = await axios.get(`${BASE_URL}/bookings/booked?id=${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success(res.data.message);
      fetchData();
    } catch (error) {
      toast.error(error.response.data.message);
      // console.log(error.response.data.message);
    }
  };

  const cancelledReq = async (id) => {
    let token = JSON.parse(localStorage.getItem("data")).token;

    try {
      let res = await axios.get(`${BASE_URL}/bookings/cancelled?id=${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success(res.data.message);
      fetchData();
    } catch (error) {
      toast.error(error.response.data.message);
      // console.log(error.response.data.message);
    }
  };

  const pendingReq = async (id) => {
    let token = JSON.parse(localStorage.getItem("data")).token;

    try {
      let res = await axios.get(`${BASE_URL}/bookings/pending?id=${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success(res.data.message);
      fetchData();
    } catch (error) {
      toast.error(error.response.data.message);
      // console.log(error.response.data.message);
    }
  };

  return (
    <div className="font-serif">
      <Tabs defaultValue="pending">
        <TabsList>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="booked">Booked</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>

        <TabsContent value="pending">
          <h1 className="font-medium mt-5 text-3xl tracking-tighter">
            Pending Requests
          </h1>

          <div className="mt-8 grid sm:grid-cols-3 ">
            {bookingData
              .filter((data) => data.status === "pending")
              .map((dets) => (
                <div className="w-fit flex flex-col gap-5 py-4 px-7 rounded-3xl  border border-gray-400">
                  <h1 className="text-xl tracking-tight">
                    Booking for {dets.userName}
                  </h1>

                  <div>
                    <div className="flex gap-6">
                      <div>
                        <h1>User Number </h1>
                        <h1>User Email </h1>
                        <h1>Room Number </h1>
                        <h1>Total Members </h1>
                        <h1>Check in Date </h1>
                        <h1>Check out Date </h1>
                        <h1>Total Amount</h1>
                      </div>
                      <div>
                        <p>:</p>
                        <p>:</p>
                        <p>:</p>
                        <p>:</p>
                        <p>:</p>
                        <p>:</p>
                        <p>:</p>
                      </div>
                      <div>
                        <p>{dets.userPhone}</p>
                        <p>{dets.userId.email}</p>
                        <p>{dets.roomId.roomNumber}</p>
                        <p>{dets.numberOfGuests}</p>
                        <p>{dets.checkInDate.slice(0, 10)}</p>
                        <p>{dets.checkOutDate.slice(0, 10)}</p>
                        <p>₹{dets.totalAmount}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-5">
                    <button
                      onClick={() => approvedReq(dets._id)}
                      className="px-4 py-1 rounded-3xl bg-blue-500 text-white"
                    >
                      Approved
                    </button>
                    <button
                      onClick={() => cancelledReq(dets._id)}
                      className="px-4 py-1 rounded-3xl bg-red-500 text-white"
                    >
                      Canelled
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="booked">
          <h1 className="font-medium mt-5 text-3xl tracking-tighter">
            Booked Requests
          </h1>
          <h1 className="font-medium mt-10 text-xl tracking-tighter">
            Checked via Users :
          </h1>

          <div className="mt-3  ">
            <Tabs defaultValue="check">
              <TabsList>
                <TabsTrigger value="check">Checked-In</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="rejected">Rejected</TabsTrigger>
              </TabsList>
              <TabsContent value="check">
                <div className="mt-8 grid sm:grid-cols-3 ">
                  {bookingData
                    .filter(
                      (data) =>
                        data.status === "booked" &&
                        data.isChecking === "confirm"
                    )
                    .map((dets) => (
                      <div className="w-fit flex flex-col gap-5 py-4 px-7 rounded-3xl  border border-gray-400">
                        <h1 className="text-xl tracking-tight">
                          Booking for {dets.userName}
                        </h1>

                        <div>
                          <div className="flex gap-6">
                            <div>
                              <h1>User Number </h1>
                              <h1>User Email </h1>
                              <h1>Room Number </h1>
                              <h1>Total Members </h1>
                              <h1>Check in Date </h1>
                              <h1>Check out Date </h1>
                              <h1>Total Amount</h1>
                            </div>
                            <div>
                              <p>:</p>
                              <p>:</p>
                              <p>:</p>
                              <p>:</p>
                              <p>:</p>
                              <p>:</p>
                              <p>:</p>
                            </div>
                            <div>
                              <p>{dets.userPhone}</p>
                              <p>{dets.userId.email}</p>
                              <p>{dets.roomId.roomNumber}</p>
                              <p>{dets.numberOfGuests}</p>
                              <p>{dets.checkInDate.slice(0, 10)}</p>
                              <p>{dets.checkOutDate.slice(0, 10)}</p>
                              <p>₹{dets.totalAmount}</p>
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-5">
                          <button
                            onClick={() => pendingReq(dets._id)}
                            className="px-4 py-1 rounded-3xl bg-yellow-500 text-white"
                          >
                            Pending
                          </button>
                          <button
                            onClick={() => cancelledReq(dets._id)}
                            className="px-4 py-1 rounded-3xl bg-red-500 text-white"
                          >
                            Canelled
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </TabsContent>
              <TabsContent value="pending">
                <div className="mt-8 grid sm:grid-cols-3 ">
                  {bookingData
                    .filter(
                      (data) =>
                        data.status === "booked" &&
                        data.isChecking === "pending"
                    )
                    .map((dets) => (
                      <div className="w-fit flex flex-col gap-5 py-4 px-7 rounded-3xl  border border-gray-400">
                        <h1 className="text-xl tracking-tight">
                          Booking for {dets.userName}
                        </h1>

                        <div>
                          <div className="flex gap-6">
                            <div>
                              <h1>User Number </h1>
                              <h1>User Email </h1>
                              <h1>Room Number </h1>
                              <h1>Total Members </h1>
                              <h1>Check in Date </h1>
                              <h1>Check out Date </h1>
                              <h1>Total Amount</h1>
                            </div>
                            <div>
                              <p>:</p>
                              <p>:</p>
                              <p>:</p>
                              <p>:</p>
                              <p>:</p>
                              <p>:</p>
                              <p>:</p>
                            </div>
                            <div>
                              <p>{dets.userPhone}</p>
                              <p>{dets.userId.email}</p>
                              <p>{dets.roomId.roomNumber}</p>
                              <p>{dets.numberOfGuests}</p>
                              <p>{dets.checkInDate.slice(0, 10)}</p>
                              <p>{dets.checkOutDate.slice(0, 10)}</p>
                              <p>₹{dets.totalAmount}</p>
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-5">
                          <button
                            onClick={() => pendingReq(dets._id)}
                            className="px-4 py-1 rounded-3xl bg-yellow-500 text-white"
                          >
                            Pending
                          </button>
                          <button
                            onClick={() => cancelledReq(dets._id)}
                            className="px-4 py-1 rounded-3xl bg-red-500 text-white"
                          >
                            Canelled
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </TabsContent>
              <TabsContent value="rejected">
                <div className="mt-8 grid sm:grid-cols-3 ">
                  {bookingData
                    .filter(
                      (data) =>
                        data.status === "booked" &&
                        data.isChecking === "cancelled"
                    )
                    .map((dets) => (
                      <div className="w-fit flex flex-col gap-5 py-4 px-7 rounded-3xl  border border-gray-400">
                        <h1 className="text-xl tracking-tight">
                          Booking for {dets.userName}
                        </h1>

                        <div>
                          <div className="flex gap-6">
                            <div>
                              <h1>User Number </h1>
                              <h1>User Email </h1>
                              <h1>Room Number </h1>
                              <h1>Total Members </h1>
                              <h1>Check in Date </h1>
                              <h1>Check out Date </h1>
                              <h1>Total Amount</h1>
                            </div>
                            <div>
                              <p>:</p>
                              <p>:</p>
                              <p>:</p>
                              <p>:</p>
                              <p>:</p>
                              <p>:</p>
                              <p>:</p>
                            </div>
                            <div>
                              <p>{dets.userPhone}</p>
                              <p>{dets.userId.email}</p>
                              <p>{dets.roomId.roomNumber}</p>
                              <p>{dets.numberOfGuests}</p>
                              <p>{dets.checkInDate.slice(0, 10)}</p>
                              <p>{dets.checkOutDate.slice(0, 10)}</p>
                              <p>₹{dets.totalAmount}</p>
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-5">
                          <button
                            onClick={() => pendingReq(dets._id)}
                            className="px-4 py-1 rounded-3xl bg-yellow-500 text-white"
                          >
                            Pending
                          </button>
                          <button
                            onClick={() => cancelledReq(dets._id)}
                            className="px-4 py-1 rounded-3xl bg-red-500 text-white"
                          >
                            Canelled
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </TabsContent>

        <TabsContent value="cancelled">
          <h1 className="font-medium mt-5 text-3xl tracking-tighter">
            Cancelled Requests
          </h1>

          <div className="mt-8 grid sm:grid-cols-3  ">
            {bookingData
              .filter((data) => data.status === "cancelled")
              .map((dets) => (
                <div className="w-fit flex flex-col gap-5 py-4 px-7 rounded-3xl  border border-gray-400">
                  <h1 className="text-xl tracking-tight">
                    Booking for {dets.userName}
                  </h1>

                  <div>
                    <div className="flex gap-6">
                      <div>
                        <h1>User Number </h1>
                        <h1>User Email </h1>
                        <h1>Room Number </h1>
                        <h1>Total Members </h1>
                        <h1>Check in Date </h1>
                        <h1>Check out Date </h1>
                        <h1>Total Amount</h1>
                      </div>
                      <div>
                        <p>:</p>
                        <p>:</p>
                        <p>:</p>
                        <p>:</p>
                        <p>:</p>
                        <p>:</p>
                        <p>:</p>
                      </div>
                      <div>
                        <p>{dets.userPhone}</p>
                        <p>{dets.userId.email}</p>
                        <p>{dets.roomId.roomNumber}</p>
                        <p>{dets.numberOfGuests}</p>
                        <p>{dets.checkInDate.slice(0, 10)}</p>
                        <p>{dets.checkOutDate.slice(0, 10)}</p>
                        <p>₹{dets.totalAmount}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-5">
                    <button
                      onClick={() => approvedReq(dets._id)}
                      className="px-4 py-1 rounded-3xl bg-blue-500 text-white"
                    >
                      Approved
                    </button>
                    <button
                      onClick={() => pendingReq(dets._id)}
                      className="px-4 py-1 rounded-3xl bg-yellow-500 text-white"
                    >
                      Pending
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ManageBooking;
