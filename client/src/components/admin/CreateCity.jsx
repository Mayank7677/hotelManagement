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

const indianStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry",
];

const CreateCity = () => {
  const [city, setCity] = useState({
    state: "",
    name: "",
    code: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setCity((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let token = JSON.parse(localStorage.getItem("data")).token;
    console.log(token);

    try {
      console.log(state);
      const res = await axios.post(`${BASE_URL}/locations/create`, city, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success(res.data.message);
      // console.log(res);
      fetchData();

      setCity({
        state: "",
        name: "",
        code: "",
      });
    } catch (err) {
      console.error(err);
      toast.error(err.response.data.message);
    }
  };

  const [cityData, setCityData] = useState([]);

  const fetchData = async () => {
    let token = JSON.parse(localStorage.getItem("data")).token;
    // console.log(token);

    try {
      const res = await axios.get(`${BASE_URL}/locations/getAll`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data);

      setCityData(res.data);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const handleStatusChange = async (id) => {
    console.log("object");
    let token = JSON.parse(localStorage.getItem("data")).token;

    try {
      const res = await axios.put(
        `${BASE_URL}/locations/softDelete?id=${id}`,
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
      const res = await axios.delete(
        `${BASE_URL}/locations/hardDelete?id=${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(res.data.message);
      fetchData();
    } catch (error) {
      // toast.error(error.response.data.message);
    }
  };

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

      setStateData(res.data);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchData();
    fetchStateData();
  }, []);

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
                value={city.state}
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
            <label htmlFor="name">
              <span className="text-lg font-medium tracking-tight">
                Enter City
              </span>

              <input
                type="text"
                id="name"
                placeholder="City"
                value={city.name}
                onChange={handleChange}
                required
                className="mt-1 max-sm:w-full w-3/4 px-3 py-2 block rounded-md bg-neutral-700 shadow-sm sm:text-sm outline-none text-white"
              />
            </label>
          </div>

          <div className="mt-7">
            <label htmlFor="code">
              <span className="text-lg font-medium tracking-tight">
                Enter City-code
              </span>

              <input
                type="text"
                id="code"
                placeholder="Citycode"
                value={city.code}
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
          Cities ( Active ){" "}
        </h1>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px] text-white">S.NO.</TableHead>
              <TableHead className="text-white">City</TableHead>
              <TableHead className="text-white">State</TableHead>
              <TableHead className="text-white">Created by</TableHead>
              <TableHead className="text-end pr-[7%] text-white">
                Manage
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cityData
              .filter((state) => state.status === "active")
              .map((state, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>{state.name}</TableCell>
                  <TableCell>{state.stateId.name}</TableCell>
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

      <div className="mt-15 pb-10">
        <h1 className="font-medium text-3xl tracking-tight">
          Cities ( Inactive ){" "}
        </h1>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px] text-white">S.NO.</TableHead>
              <TableHead className="text-white">City</TableHead>
              <TableHead className="text-white">State</TableHead>
              <TableHead className="text-white">Created by</TableHead>
              <TableHead className="text-end pr-[7%] text-white">
                Manage
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {cityData
              .filter((state) => state.status === "inactive")
              .map((state, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>{state.name}</TableCell>
                  <TableCell>{state.stateId.name}</TableCell>
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

export default CreateCity;
