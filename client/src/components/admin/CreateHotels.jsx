import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import BASE_URL from "../../utils/api";
import { FiEdit2 } from "react-icons/fi";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const CreateHotels = () => {
  const [hotel, setHotel] = useState({
    state: "",
    city: "",
    name: "",
    address: "",
    totalRoom: "",
    description: "",
    contactNumber: "",
    contactEmail: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setHotel((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let token = JSON.parse(localStorage.getItem("data")).token;
    console.log(token);

    try {
      console.log(hotel);

      const res = await axios.post(`${BASE_URL}/hotels/create`, hotel, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success(res.data.message);
      // console.log(res);
      fetchData();

      setHotel({
        state: "",
        city: "",
        name: "",
        address: "",
        totalRoom: "",
        description: "",
        contactNumber: "",
        contactEmail: "",
      });
    } catch (err) {
      console.error(err);
      toast.error(err.response.data.message);
    }
  };

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

  const handleStatusChange = async (id) => {
    console.log("object");
    let token = JSON.parse(localStorage.getItem("data")).token;

    try {
      const res = await axios.put(
        `${BASE_URL}/hotels/softDelete?id=${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(res.data.message);
      fetchData();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleDelete = async (id) => {
    // console.log("object");
    let token = JSON.parse(localStorage.getItem("data")).token;

    try {
      const res = await axios.delete(`${BASE_URL}/hotels/hardDelete?id=${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success(res.data.message);
      fetchData();
    } catch (error) {
      // toast.error(error.response.data.message);
    }
  };

  // city and state data for dropdown
  const [cityData, setCityData] = useState([]);
  const [stateData, setStateData] = useState([]);

  const fetchStateData = async () => {
    let token = JSON.parse(localStorage.getItem("data")).token;
    // console.log(token);

    try {
      const res = await axios.get(`${BASE_URL}/states/getAll`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(res.data);

      setStateData(res.data.filter((state) => state.status === "active"));
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  // Fetch cities based on selected state
  const fetchCityData = async (stateName) => {
    const token = JSON.parse(localStorage.getItem("data")).token;

    const selectedState = stateData.find((state) => state.name === stateName);

    if (!selectedState) return;

    try {
      const res = await axios.get(
        `${BASE_URL}/locations/getAllByState?id=${selectedState._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCityData(res.data);
    } catch (error) {
      console.log(error.response?.data?.message || "Failed to fetch cities");
    }
  };

  useEffect(() => {
    fetchData();
    fetchStateData();
  }, []);

  // Run this whenever hotel.state changes
  useEffect(() => {
    if (hotel.state) {
      fetchCityData(hotel.state);
    }
  }, [hotel.state]);

  return (
    <div>
      <h1 className="font-medium text-4xl tracking-tight">Add a City</h1>

      <div className="mt-10">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="state">
              <span className="text-lg font-medium tracking-tight">
                Select State
              </span>
              <select
                id="state"
                value={hotel.state}
                onChange={handleChange}
                required
                className="mt-1 max-sm:w-full w-3/4 px-3 py-2 block rounded-md bg-neutral-700 shadow-sm sm:text-sm outline-none text-white"
              >
                <option value="">Select a state</option>
                {stateData.map((s, index) => (
                  <option key={index} value={s.name}>
                    {s.name}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="mt-7">
            <label htmlFor="city">
              <span className="text-lg font-medium tracking-tight">
                Select City
              </span>
              <select
                id="city"
                value={hotel.city}
                onChange={handleChange}
                required
                className="mt-1 max-sm:w-full w-3/4 px-3 py-2 block rounded-md bg-neutral-700 shadow-sm sm:text-sm outline-none text-white"
              >
                <option value="">Select a city</option>
                {cityData.map((s, index) => (
                  <option key={index} value={s.name}>
                    {s.name}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="mt-7">
            <label htmlFor="name">
              <span className="text-lg font-medium tracking-tight">
                Enter Hotel Name
              </span>

              <input
                type="text"
                id="name"
                placeholder="Hotel Name"
                value={hotel.name}
                onChange={handleChange}
                required
                className="mt-1 max-sm:w-full w-3/4 px-3 py-2 block rounded-md bg-neutral-700 shadow-sm sm:text-sm outline-none text-white"
              />
            </label>
          </div>

          <div className="mt-7">
            <label htmlFor="address">
              <span className="text-lg font-medium tracking-tight">
                Enter Hotel Address
              </span>

              <input
                type="text"
                id="address"
                placeholder="Hotel Address"
                value={hotel.address}
                onChange={handleChange}
                required
                className="mt-1 max-sm:w-full w-3/4 px-3 py-2 block rounded-md bg-neutral-700 shadow-sm sm:text-sm outline-none text-white"
              />
            </label>
          </div>

          <div className="mt-7">
            <label htmlFor="totalRoom">
              <span className="text-lg font-medium tracking-tight">
                Enter Total Rooms
              </span>

              <input
                type="number"
                id="totalRoom"
                placeholder="Total Rooms"
                value={hotel.totalRoom}
                onChange={handleChange}
                required
                className="mt-1 max-sm:w-full w-3/4 px-3 py-2 block rounded-md bg-neutral-700 shadow-sm sm:text-sm outline-none text-white"
              />
            </label>
          </div>

          <div className="mt-7">
            <label htmlFor="description">
              <span className="text-lg font-medium tracking-tight">
                Enter Hotel Description
              </span>

              <input
                type="text"
                id="description"
                placeholder="Hotel Description"
                value={hotel.description}
                onChange={handleChange}
                required
                className="mt-1 max-sm:w-full w-3/4 px-3 py-2 block rounded-md bg-neutral-700 shadow-sm sm:text-sm outline-none text-white"
              />
            </label>
          </div>

          <div className="mt-7">
            <label htmlFor="contactNumber">
              <span className="text-lg font-medium tracking-tight">
                Enter Hotel's Contact Number
              </span>

              <input
                type="text"
                id="contactNumber"
                placeholder="Contact Number"
                value={hotel.contactNumber}
                onChange={handleChange}
                required
                className="mt-1 max-sm:w-full w-3/4 px-3 py-2 block rounded-md bg-neutral-700 shadow-sm sm:text-sm outline-none text-white"
              />
            </label>
          </div>

          <div className="mt-7">
            <label htmlFor="contactEmail">
              <span className="text-lg font-medium tracking-tight">
                Enter Hotel's Contact Email
              </span>

              <input
                type="email"
                id="contactEmail"
                placeholder="Contact Email"
                value={hotel.contactEmail}
                onChange={handleChange}
                required
                className="mt-1 max-sm:w-full w-3/4 px-3 py-2 block rounded-md bg-neutral-700 shadow-sm sm:text-sm outline-none text-white"
              />
            </label>
          </div>

          <div className="mt-7">
            <button
              type="submit"
              className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 cursor-pointer hover:opacity-90 transition-opacity rounded-md"
            >
              Submit
            </button>
          </div>
        </form>
      </div>

      <div className="mt-15">
        <h1 className="font-medium text-3xl tracking-tight">
          Hotels ( Active ){" "}
        </h1>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px] text-white">S.NO.</TableHead>
              <TableHead className="text-white">City</TableHead>
              <TableHead className="text-white">State</TableHead>
              <TableHead className="text-white">Hotel</TableHead>
              <TableHead className="text-white">Contact Number</TableHead>
              <TableHead className="text-white">Contact Email</TableHead>
              <TableHead className="text-white">Created by</TableHead>
              <TableHead className="text-end pr-[7%] text-white">
                Manage
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {hotelData
              .filter((state) => state.status === "active")
              .map((state, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>{state.locationId.name}</TableCell>
                  <TableCell>{state.stateId.name}</TableCell>
                  <TableCell>{state.name}</TableCell>
                  <TableCell>{state.contactNumber}</TableCell>
                  <TableCell>{state.contactEmail}</TableCell>
                  <TableCell>{state.assignedBy.email}</TableCell>
                  <TableCell className="flex gap-4 justify-end">
                    <p className="px-1.5 py-0.5 rounded-lg font-medium bg-yellow-500 w-fit cursor-pointer">
                      {/* <FiEdit2 /> */}
                      Edit
                    </p>
                    <p
                      onClick={() => handleStatusChange(state._id)}
                      className="px-1.5 py-0.5 rounded-lg font-medium bg-blue-500 w-fit cursor-pointer"
                    >
                      Inactive
                    </p>
                    <p
                      onClick={() => handleDelete(state._id)}
                      className="px-1.5 py-0.5 rounded-lg font-medium bg-red-500 w-fit cursor-pointer"
                    >
                      {/* <FiEdit2 /> */}
                      Delete
                    </p>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>

      <div className="mt-15">
        <h1 className="font-medium text-3xl tracking-tight">
          Hotels ( Inactive ){" "}
        </h1>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px] text-white">S.NO.</TableHead>
              <TableHead className="text-white">City</TableHead>
              <TableHead className="text-white">State</TableHead>
              <TableHead className="text-white">Hotel</TableHead>
              <TableHead className="text-white">Contact Number</TableHead>
              <TableHead className="text-white">Contact Email</TableHead>
              <TableHead className="text-white">Created by</TableHead>
              <TableHead className="text-end pr-[7%] text-white">
                Manage
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {hotelData
              .filter((state) => state.status === "inactive")
              .map((state, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>{state.locationId.name}</TableCell>
                  <TableCell>{state.stateId.name}</TableCell>
                  <TableCell>{state.name}</TableCell>
                  <TableCell>{state.contactNumber}</TableCell>
                  <TableCell>{state.contactEmail}</TableCell>
                  <TableCell>{state.assignedBy.email}</TableCell>
                  <TableCell className="flex gap-4 justify-end">
                    <p className="px-1.5 py-0.5 rounded-lg font-medium bg-yellow-500 w-fit cursor-pointer">
                      {/* <FiEdit2 /> */}
                      Edit
                    </p>
                    <p
                      onClick={() => handleStatusChange(state._id)}
                      className="px-1.5 py-0.5 rounded-lg font-medium bg-blue-500 w-fit cursor-pointer"
                    >
                      Active
                    </p>
                    <p
                      onClick={() => handleDelete(state._id)}
                      className="px-1.5 py-0.5 rounded-lg font-medium bg-red-500 w-fit cursor-pointer"
                    >
                      {/* <FiEdit2 /> */}
                      Delete
                    </p>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CreateHotels;
