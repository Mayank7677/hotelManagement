import React, { useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import BASE_URL from "../../../utils/api";
import axios from "axios";

const EditHotel = () => {
  let navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const { stateData } = location.state || {}; // fallback in case state is undefined
  console.log(stateData);

  const [name, setName] = useState(stateData.name || "");
  const [address, setAddress] = useState(stateData.address || "");
  const [totalRoom, setTotalRoom] = useState(stateData.totalRoom || "");
  const [description, setDescription] = useState(stateData.description || "");
  const [contactNumber, setContactNumber] = useState(
    stateData.contactNumber || ""
  );
  const [contactEmail, setContactEmail] = useState(
    stateData.contactEmail || ""
  );

  const handleUpdate = async (e) => {
    e.preventDefault();
    let token = JSON.parse(localStorage.getItem("data")).token;
    // Handle form submission logic here
    try {
      let res = await axios.put(
        `${BASE_URL}/hotels/update?id=${id}`,
        {
          name,
          address,
          totalRoom,
          description,
          contactNumber,
          contactEmail,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(res.data.message);
      navigate("/admin/hotel");

      // console.log(res);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="pb-20 font-serif">
      <Link to="/admin/hotel">
        <h1 className="font-medium  text-md text-blue-500 tracking-tighter">
          Back
        </h1>
      </Link>
      <h1 className="font-medium mt-3 text-3xl tracking-tighter">Edit Hotel</h1>

      <div className="mt-10 sm:px-5 max-sm:w-full sm:w-3/4">
        <form onSubmit={handleUpdate}>
          <div className="flex flex-col sm:flex-row items-center gap-5 w-full">
            <div className="w-full">
              <label htmlFor="name">
                <span className="text-lg font-medium tracking-tight">
                  State
                </span>

                <input
                  type="text"
                  id="name"
                  placeholder="state"
                  value={stateData.stateId.name}
                  disabled
                  className="mt-1 w-full px-3 py-2  rounded-md font-normal border border-gray-400 sm:text-sm outline-none "
                />
              </label>
            </div>

            <div className="w-full">
              <label htmlFor="name">
                <span className="text-lg font-medium tracking-tight">City</span>

                <input
                  type="text"
                  id="name"
                  placeholder="city"
                  value={stateData.locationId.name}
                  disabled
                  className="mt-1 w-full px-3 py-2  rounded-md font-normal border border-gray-400 sm:text-sm outline-none "
                />
              </label>
            </div>
          </div>

          <div className="mt-7 flex flex-col sm:flex-row items-center gap-5 w-full">
            <div className="w-full">
              <label htmlFor="name">
                <span className="text-lg font-medium tracking-tight">
                  Hotel Name
                </span>

                <input
                  type="text"
                  id="name"
                  placeholder="Hotel Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="mt-1 w-full  px-3 py-2  rounded-md font-normal border border-gray-400 sm:text-sm outline-none "
                />
              </label>
            </div>

            <div className="w-full">
              <label htmlFor="totalRoom">
                <span className="text-lg font-medium tracking-tight">
                  Total Rooms
                </span>

                <input
                  type="number"
                  id="totalRoom"
                  placeholder="Total Rooms"
                  value={totalRoom}
                  onChange={(e) => setTotalRoom(e.target.value)}
                  required
                  className="mt-1 w-full  px-3 py-2  rounded-md font-normal border border-gray-400 sm:text-sm outline-none "
                />
              </label>
            </div>
          </div>

          <div className="mt-7 flex flex-col sm:flex-row items-center gap-5 w-full">
            <div className="w-full">
              <label htmlFor="contactNumber">
                <span className="text-lg font-medium tracking-tight">
                  Hotel's Contact Number
                </span>

                <input
                  type="text"
                  id="contactNumber"
                  placeholder="Contact Number"
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                  required
                  className="mt-1 w-full  px-3 py-2  rounded-md font-normal border border-gray-400 sm:text-sm outline-none "
                />
              </label>
            </div>

            <div className="w-full">
              <label htmlFor="contactEmail">
                <span className="text-lg font-medium tracking-tight">
                  Hotel's Contact Email
                </span>

                <input
                  type="email"
                  id="contactEmail"
                  placeholder="Contact Email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  required
                  className="mt-1 w-full  px-3 py-2  rounded-md font-normal border border-gray-400 sm:text-sm outline-none "
                />
              </label>
            </div>
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
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                className="mt-1 w-full  px-3 py-2  rounded-md font-normal border border-gray-400 sm:text-sm outline-none "
              />
            </label>
          </div>

          <div className="mt-7">
            <label htmlFor="description">
              <span className="text-lg font-medium tracking-tight">
                Hotel Description
              </span>

              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Hotel Description"
                required
                rows="5"
                className="mt-1 w-full  px-3 py-2  rounded-md font-normal border border-gray-400 sm:text-sm outline-none resize-none"
                id="description"
              ></textarea>
            </label>
          </div>

          <div className="mt-7">
            <button
              type="submit"
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white cursor-pointer hover:opacity-90 transition-opacity rounded-md"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditHotel;
