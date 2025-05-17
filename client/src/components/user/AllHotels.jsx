import React, { useEffect, useRef, useState } from "react";
import HotelCard from "./HotelCard";
import axios from "axios";
import BASE_URL from "../../utils/api";
import { useTheme } from "../ThemeProvider";
import { IoSearchOutline } from "react-icons/io5";
import Autoplay from "embla-carousel-autoplay";
import { Link } from "react-router-dom";
import { CiCalendarDate } from "react-icons/ci";

const AllHotels = () => {
  const [hotelData, setHotelData] = useState([]);
  const fetchData = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/hotels/getAll`);
      console.log(res.data);

      setHotelData(res.data);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const [stateData, setStateData] = useState([]);
  const [cityData, setCityData] = useState([]);
  const [state, setState] = useState();
  const [city, setCity] = useState([]);
  const [search, setSearch] = useState("");
  const fetchStateData = async () => {
    try {
      let res = await axios.get(`${BASE_URL}/states/getAll`);

      setStateData(res.data.filter((state) => state.status === "active"));
      console.log(res.data);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const fetchCityData = async (stateName) => {
    const selectedState = stateData.find((state) => state.name === stateName);

    if (!selectedState) return;

    try {
      const res = await axios.get(
        `${BASE_URL}/locations/getAllByState?id=${selectedState._id}`
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

  useEffect(() => {
    if (state) {
      fetchCityData(state);
    } else {
      setCityData([]);
    }
    setCity(""); // reset city when state changes
  }, [state]);

  // Apply filters
  const filteredBySearch = hotelData.filter((hotel) =>
    hotel.name.toLowerCase().includes(search.toLowerCase())
  );

  const filteredByState = state
    ? filteredBySearch.filter((hotel) => hotel.stateId.name === state)
    : filteredBySearch;

  const filteredByCity = city
    ? filteredByState.filter((hotel) => hotel.locationId.name === city)
    : filteredByState;

  const { theme } = useTheme();

  return (
    <>
      {/* <div className="rounded-4xl mb-8 bg-cover bg-center h-100 p-9 bg-[url('https://images.unsplash.com/photo-1445019980597-93fa8acb246c?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)]">
        <h1 className="text-4xl   tracking-tighter font-serif text-gray-600">
          Your Perfect Stay Starts Here
        </h1>
        <h1 className="text-xl   tracking-tighter font-serif pl-[30%] text-gray-500">
          Discover Comfort & Convenience
        </h1>
      </div> */}

      {/* <div className="mb-10 flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-7">
          <div className="">
            <label htmlFor="state">
              <span className="text-lg font-serif tracking-tight">State</span>
              <select
                id="state"
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
                className="mt-1 w-fit block  px-3 py-2 bg-transparent  rounded-md font-serif border border-gray-400 sm:text-sm outline-none "
              >
                <option value="">Select a state</option>
                {stateData.map((s, index) => (
                  <option
                    className={`${
                      theme === "dark"
                        ? "bg-neutral-900 text-white border-gray-600"
                        : "bg-white text-black border-gray-300"
                    }`}
                    key={index}
                    value={s.name}
                  >
                    {s.name}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="">
            <label htmlFor="state">
              <span className="text-lg font-serif tracking-tight">City</span>
              <select
                id="state"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
                className="mt-1 block  px-3 py-2  rounded-md font-serif border border-gray-400 sm:text-sm outline-none "
              >
                <option value="">Select a City</option>
                {cityData.map((s, index) => (
                  <option
                    className={`${
                      theme === "dark"
                        ? "bg-neutral-900 text-white border-gray-600"
                        : "bg-white text-black border-gray-300"
                    }`}
                    key={index}
                    value={s.name}
                  >
                    {s.name}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        <div className="sm:w-1/3 ">
          <label htmlFor="state">
            <span className="text-lg font-serif tracking-tight">Search</span>
            <div>
              <input
                type="text"
                placeholder="Search"
                onChange={(e) => setSearch(e.target.value)}
                value={search}
                required
                className="mt-1 w-full px-3 py-2   rounded-md font-serif border border-gray-400 sm:text-sm outline-none "
              />
            </div>
          </label>
        </div>
      </div> */}

      <section
        className={`h-screen flex flex-col items-start justify-center pt-30 px-6 md:px-16 lg:px-24 xl:px-32 text-white bg-[url("https://images.unsplash.com/photo-1506059612708-99d6c258160e?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")] bg-no-repeat bg-cover bg-bottom ${
          theme === "dark" ? "bg-neutral-900" : "bg-white"
        }`}
      >
        <p className="bg-[#49B9FF]/50 px-3.5 py-1 rounded-full mt-20">
          The Ultimate Hotel Experience
        </p>
        <h1 className="text-2xl md:text-5xl md:text-[56px] md:leading-[56px] max-w-xl mt-4 font-serif">
          Discover Your Perfect Gateway Destination
        </h1>
        <p className="max-w-130 mt-2 text-sm md:text-base">
          Unparalleled luxury and comfort await at the world's most exclusive
          hotels and resorts. Start your journey today.
        </p>

        <form
          className={` text-neutral-700 rounded-2xl px-6 py-4 mt-8 flex flex-col md:flex-row max-md:items-start gap-4 max-md:mx-auto ${
            theme === "dark" ? "bg-neutral-700 text-white" : "bg-white"
          }`}
        >
          <div>
            <label htmlFor="state">
              <div className="flex items-center gap-2">
                <CiCalendarDate
                  className={` text-lg ${
                    theme === "dark" ? "text-white" : "text-black"
                  } `}
                />

                <span className="font-serif">State</span>
              </div>
              <select
                id="state"
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
                className="mt-1 w-full  px-3 py-1.5 rounded-md font-serif border  border-gray-500 sm:text-sm outline-none "
              >
                <option
                  className={`${
                    theme === "dark"
                      ? "bg-neutral-600 text-white border-gray-600"
                      : "bg-white text-black border-gray-300"
                  }`}
                  value=""
                >
                  Select a state
                </option>
                {stateData.map((s, index) => (
                  <option
                    className={`${
                      theme === "dark"
                        ? "bg-neutral-900 text-white border-gray-600"
                        : "bg-white text-black border-gray-300"
                    }`}
                    key={index}
                    value={s.name}
                  >
                    {s.name}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="">
            <label htmlFor="state">
              <div className="flex items-center gap-2">
                <CiCalendarDate
                  className={` text-lg ${
                    theme === "dark" ? "text-white" : "text-black"
                  } `}
                />
                <span className="font-serif">City</span>
              </div>
              <select
                id="state"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
                className="mt-1 w-full  px-3 py-1.5 rounded-md font-serif border  border-gray-500 sm:text-sm outline-none "
              >
                <option
                  className={`${
                    theme === "dark"
                      ? "bg-neutral-600 text-white border-gray-600"
                      : "bg-white text-black border-gray-300"
                  }`}
                  value=""
                >
                  Select a City
                </option>
                {cityData.map((s, index) => (
                  <option
                    className={`${
                      theme === "dark"
                        ? "bg-neutral-900 text-white border-gray-600"
                        : "bg-white text-black border-gray-300"
                    }`}
                    key={index}
                    value={s.name}
                  >
                    {s.name}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className=" ">
            <label htmlFor="state">
              <div className="flex items-center gap-1.5">
                <IoSearchOutline
                  className={` ${
                    theme === "dark" ? "text-white" : "text-black"
                  } `}
                />
                <span className="font-serif">Search</span>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Search"
                  onChange={(e) => setSearch(e.target.value)}
                  value={search}
                  required
                  className="mt-1 w-full  px-3 py-1 rounded-md font-serif border  border-gray-500 sm:text-sm outline-none "
                />
              </div>
            </label>
          </div>
        </form>
      </section>

      {/* Featured section  */}
      <section className={`  ${theme === "dark" ? "bg-neutral-900" : ""} `}>
        <div class="flex flex-col justify-center items-center text-center false pt-10">
          <h1 class=" text-4xl md:text-[40px] font-serif tracking-tight">
            Featured Destination
          </h1>
          <p class="text-sm md:text-base text-neutral-600 tracking-tight mt-2 max-w-174">
            Discover our handpicked selection of exceptional properties around
            the world, offering unparalleled luxury and unforgettable
            experiences.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 mt-15 pb-10 text-left">
            {filteredByCity.slice(0, 4).map((hotel) => (
              <HotelCard key={hotel._id} hotel={hotel} />
            ))}
          </div>

          <Link to="/allHotels" onClick={() => window.scrollTo(0, 0)}>
            <button
              className={`my-10 px-4 py-2 text-sm font-medium border border-gray-400 rounded-xl  transition-all cursor-pointer ${
                theme === "dark"
                  ? " text-white "
                  : "bg-white text-black border-gray-300"
              } `}
            >
              View All Destinations
            </button>
          </Link>
        </div>
      </section>

      {/* Offers section  */}
      <section
        className={` ${
          theme === "dark" ? "bg-neutral-800" : "bg-neutral-100"
        } py-10 pb-20`}
      >
        <div class="flex flex-col justify-center items-center text-center false mt-10 ">
          <div class="flex flex-col md:flex-row items-center justify-between w-full px-6 md:px-16 lg:px-24 xl:px-32">
            <div class="flex flex-col justify-center items-center text-center  md:items-start md:text-left">
              <h1 class=" text-4xl md:text-[40px] font-serif tracking-tight">
                Exclusive Offers
              </h1>
              <p
                class={`text-sm md:text-base  tracking-tight mt-2 max-w-174 ${
                  theme === "dark" ? "text-neutral-300" : "text-neutral-600"
                }`}
              >
                Take advantage of our limited-time offers and special packages
                to enhance your stay and create unforgettable memories.
              </p>
            </div>
            <button class="group flex items-center gap-2 font-medium text-sm cursor-pointer max-md:mt-12 border border-gray-400 rounded-xl px-3 py-1">
              View All Offers{" "}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 ">
            <div
              className="group border relative flex flex-col items-start justify-between gap-1 pt-12 md:pt-18 px-4 rounded-xl bg-no-repeat bg-center bg-cover text-white text-left "
              style={{
                backgroundImage:
                  'url("https://images.unsplash.com/photo-1554009975-d74653b879f1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fGhvdGVsfGVufDB8fDB8fHww")',
              }}
            >
              <p className="px-3 py-1 absolute top-4 left-4 text-xs bg-white text-gray-800 font-medium rounded-full">
                25% OFF
              </p>
              <div>
                <p className="text-2xl font-medium">Summer Escape Package</p>
                <p>Enjoy a complimentary night and daily breakfast</p>
                <p className="text-xs text-white/70 mt-3">Expires Aug 31</p>
              </div>
              <button className="flex items-center gap-2 font-medium cursor-pointer mt-4 mb-5">
                View Offers
              </button>
            </div>

            <div
              className="group border relative flex flex-col items-start justify-between gap-1 pt-12 md:pt-18 px-4 rounded-xl bg-no-repeat bg-center bg-cover text-white text-left "
              style={{
                backgroundImage:
                  'url("https://images.unsplash.com/photo-1536625737227-92a1fc042e7e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjN8fGhvdGVsfGVufDB8fDB8fHww")',
              }}
            >
              <p className="px-3 py-1 absolute top-4 left-4 text-xs bg-white text-gray-800 font-medium rounded-full">
                25% OFF
              </p>
              <div>
                <p className="text-2xl font-medium">Luxury Retreat</p>
                <p>Book our luxury properties worldwide.</p>
                <p className="text-xs text-white/70 mt-3">Expires May 31</p>
              </div>
              <button className="flex items-center gap-2 font-medium cursor-pointer mt-4 mb-5">
                View Offers
              </button>
            </div>

            <div
              className="group border relative flex flex-col items-start justify-between gap-1 pt-12 md:pt-18 px-4 rounded-xl bg-no-repeat bg-center bg-cover text-white text-left "
              style={{
                backgroundImage:
                  'url("https://images.unsplash.com/photo-1558976825-6b1b03a03719?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzV8fGhvdGVsfGVufDB8fDB8fHww")',
              }}
            >
              <p className="px-3 py-1 absolute top-4 left-4 text-xs bg-white text-gray-800 font-medium rounded-full">
                20% OFF
              </p>
              <div>
                <p className="text-2xl font-medium">Romantic Getaway</p>
                <p>Special couples package including spa treatment</p>
                <p className="text-xs text-white/70 mt-3">Expires Sep 31</p>
              </div>
              <button className="flex items-center gap-2 font-medium cursor-pointer mt-4 mb-5">
                View Offers
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className={`py-30 ${theme === "dark" ? "bg-neutral-900" : "bg-white"}`}>
        <div
          class={`flex flex-col items-center max-w-5xl lg:w-full rounded-4xl px-4 py-12 md:py-16 mx-2 lg:mx-auto  bg-gray-900 text-white`}
        >
          <div class="flex flex-col justify-center items-center text-center false">
            <h1 class=" text-4xl md:text-[40px] font-serif">Stay Inspired</h1>
            <p class="text-sm md:text-base text-gray-500/90 mt-2 max-w-174 tracking-tight">
              Join our newsletter and be the first to discover new destinations,
              exclusive offers, and travel inspiration.
            </p>
          </div>
          <div class="flex flex-col md:flex-row items-center justify-center gap-4 mt-6">
            <input
              class="bg-white/10 px-4 py-2.5 border border-white/20 rounded-2xl outline-none max-w-66 w-full"
              placeholder="Enter your email"
              type="text"
            />
            <button class="flex items-center justify-center gap-2 group bg-black px-4 md:px-7 py-2.5 rounded-2xl cursor-pointer active:scale-95 transition-all">
              Subscribe
              <img
                alt="arrow-icon"
                class="w-3.5 invert group-hover:translate-x-1 transition-all"
                src="data:image/svg+xml,%3csvg%20width='15'%20height='11'%20viewBox='0%200%2015%2011'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M0.999912%205.5L14.0908%205.5'%20stroke='%23000'%20stroke-width='1.5'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3cpath%20d='M8.94796%201L14.0908%205.5L8.94796%2010'%20stroke='%23000'%20stroke-width='1.5'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3c/svg%3e"
              />
            </button>
          </div>
          <p class="text-gray-500 mt-6 text-xs text-center">
            By subscribing, you agree to our Privacy Policy and consent to
            receive updates.
          </p>
        </div>
      </div>
    </>
  );
};

export default AllHotels;
