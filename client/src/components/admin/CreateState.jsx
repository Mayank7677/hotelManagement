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

const CreateState = () => {
  const [state, setState] = useState({
    name: "",
    code: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setState((prev) => ({
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
      const res = await axios.post(`${BASE_URL}/states/create`, state, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success(res.data.message);
      // console.log(res);
      fetchData();

      setState({
        name: "",
        code: "",
      });
    } catch (err) {
      console.error(err);
      toast.error(err.response.data.message);
    }
  };

  const [stateData, setStateData] = useState([]);

  const fetchData = async () => {
    let token = JSON.parse(localStorage.getItem("data")).token;
    // console.log(token);

    try {
      const res = await axios.get(`${BASE_URL}/states/getAll`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data);

      setStateData(res.data);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleStatusChange = async (id) => {
    console.log("object");
    let token = JSON.parse(localStorage.getItem("data")).token;

    try {
      const res = await axios.put(
        `${BASE_URL}/states/softDelete?id=${id}`,
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
      // toast.error(error.response.data.message);
    }
  };

  const handleDelete = async (id) => {
    console.log("object");
    let token = JSON.parse(localStorage.getItem("data")).token;

    try {
      const res = await axios.delete(`${BASE_URL}/states/hardDelete?id=${id}`, {
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

  // searching and sorting
  const [search, setSearch] = useState("");
  const filteredData = stateData.filter((state) =>
    state.name.toLowerCase().includes(search.toLowerCase())
  );

  const [click, setClick] = useState("default");
  const sortedData = [...filteredData].sort((a, b) => {
    if (click === "asc") {
      return a.name.localeCompare(b.name);
    } else if (click === "dsc") {
      return b.name.localeCompare(a.name);
    } else if (click === "timeAsc") {
      return new Date(a.createdAt) - new Date(b.createdAt);
    } else if (click === "timeDesc") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else {
      return 0; // No sorting
    }
  });

  const [searchInactive, setSearchInactive] = useState("");
  const filteredDataInactive = stateData.filter((state) =>
    state.name.toLowerCase().includes(searchInactive.toLowerCase())
  );

  const [clickInactive, setClickInactive] = useState("default");
  const sortedDataInactive = [...filteredDataInactive].sort((a, b) => {
    if (clickInactive === "asc") {
      return a.name.localeCompare(b.name);
    } else if (clickInactive === "dsc") {
      return b.name.localeCompare(a.name);
    } else if (clickInactive === "timeAsc") {
      return new Date(a.createdAt) - new Date(b.createdAt);
    } else if (clickInactive === "timeDesc") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else {
      return 0; // No sorting
    }
  });

  return (
    <div className="pb-15">
      <h1 className="font-medium text-3xl tracking-tighter">Choose a State</h1>

      <div className="mt-10">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col items-center gap-5 sm:px-5 max-sm:w-full w-1/2">
            <div className="w-full">
              <label htmlFor="name">
                <span className="text-lg font-medium tracking-tight">
                  Select State
                </span>
                <select
                  id="name"
                  value={state.name}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full  px-3 py-2  rounded-md font-normal border border-gray-400 sm:text-sm outline-none "
                >
                  <option value="">Select a state</option>
                  {indianStates.map((s, index) => (
                    <option key={index} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="w-full">
              <label htmlFor="code">
                <span className="text-lg font-medium tracking-tight">
                  Enter zip-code
                </span>

                <input
                  type="text"
                  id="code"
                  placeholder="zipcode"
                  value={state.code}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full px-3 py-2  rounded-md font-normal border border-gray-400 sm:text-sm outline-none "
                />
              </label>
            </div>
          </div>

          <div className="mt-7 sm:px-5">
            <button
              type="submit"
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white cursor-pointer hover:opacity-90 transition-opacity rounded-md"
            >
              Submit
            </button>
          </div>
        </form>
      </div>

      <div className="mt-15 sm:border border-gray-300 sm:rounded-2xl sm:p-3 ">
        <div className="flex-row gap-5 sm:flex justify-between pr-10 w-full">
          <h1 className="font-medium text-2xl sm:text-3xl tracking-tight">
            States ( Active ){" "}
          </h1>

          <div className="flex gap-5">
            <div>
              <input
                type="text"
                placeholder="Search"
                onChange={(e) => setSearch(e.target.value)}
                value={search}
                required
                className="mt-1 w-full px-3 py-2  rounded-md font-normal border border-gray-400 sm:text-sm outline-none "
              />
            </div>
            <div>
              <select
                onChange={(e) => setClick(e.target.value)}
                className="mt-1 w-full px-3 py-2  rounded-md font-normal border border-gray-400 sm:text-sm outline-none"
              >
                <option value="asc">Sort by: A to Z</option>
                <option value="dsc">Sort by: Z to A</option>
                <option value="timeAsc">Sort by: Newest</option>
                <option value="timeDesc">Sort by: Oldest</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mt-5">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px] ">S.NO.</TableHead>
                <TableHead className="">State Name</TableHead>
                <TableHead className="">State Code</TableHead>
                <TableHead className="">Created by</TableHead>
                <TableHead className="text-end pr-[7%] ">Manage</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedData
                .filter((state) => state.status === "active")
                .map((state, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell>{state.name}</TableCell>
                    <TableCell>{state.code}</TableCell>
                    <TableCell>{state.assignedBy.email}</TableCell>
                    <TableCell className="flex gap-4 justify-end">
                      <p className="px-1.5 py-0.5 rounded-lg font-medium bg-yellow-500 text-white w-fit cursor-pointer">
                        {/* <FiEdit2 /> */}
                        Edit
                      </p>
                      <p
                        onClick={() => handleStatusChange(state._id)}
                        className="px-1.5 py-0.5 rounded-lg font-medium bg-blue-500 text-white w-fit cursor-pointer"
                      >
                        Inactive
                      </p>
                      <p
                        onClick={() => handleDelete(state._id)}
                        className="px-1.5 py-0.5 rounded-lg font-medium bg-red-500 text-white w-fit cursor-pointer"
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

      <div className="mt-15 pb-10 sm:border border-gray-300 sm:rounded-2xl sm:p-3">
        <div className="flex-row gap-5 sm:flex justify-between pr-10 w-full">
          <h1 className="font-medium text-2xl sm:text-3xl tracking-tight">
            States ( Inactive ){" "}
          </h1>

          <div className="flex gap-5">
            <div>
              <input
                type="text"
                placeholder="Search"
                onChange={(e) => setSearchInactive(e.target.value)}
                value={searchInactive}
                required
                className="mt-1 w-full px-3 py-2  rounded-md font-normal border border-gray-400 sm:text-sm outline-none "
              />
            </div>
            <div>
              <select
                onChange={(e) => setClickInactive(e.target.value)}
                className="mt-1 w-full px-3 py-2  rounded-md font-normal border border-gray-400 sm:text-sm outline-none"
              >
                <option value="asc">Sort by: A to Z</option>
                <option value="dsc">Sort by: Z to A</option>
                <option value="timeAsc">Sort by: Newest</option>
                <option value="timeDesc">Sort by: Oldest</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mt-5 ">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px] ">S.NO.</TableHead>
                <TableHead className="">State Name</TableHead>
                <TableHead className="">State Code</TableHead>
                <TableHead className="">Created by</TableHead>
                <TableHead className="text-end pr-[7%] ">Manage</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedDataInactive
                .filter((state) => state.status === "inactive")
                .map((state, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell>{state.name}</TableCell>
                    <TableCell>{state.code}</TableCell>
                    <TableCell>{state.assignedBy.email}</TableCell>
                    <TableCell className="flex gap-4 justify-end">
                      <p className="px-1.5 py-0.5 rounded-lg font-medium bg-yellow-500 text-white w-fit cursor-pointer">
                        {/* <FiEdit2 /> */}
                        Edit
                      </p>
                      <p
                        onClick={() => handleStatusChange(state._id)}
                        className="px-1.5 py-0.5 rounded-lg font-medium bg-blue-500 text-white w-fit cursor-pointer"
                      >
                        Active
                      </p>
                      <p
                        onClick={() => handleDelete(state._id)}
                        className="px-1.5 py-0.5 rounded-lg font-medium bg-red-500 text-white w-fit cursor-pointer"
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
    </div>
  );
};

export default CreateState;
