import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { LuSmartphone } from "react-icons/lu";
import { FaRegCircleUser } from "react-icons/fa6";
import { CiCalendarDate } from "react-icons/ci";

const SignupPage = () => {
  let navigate = useNavigate();

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    age: "",
  });

  const [profileImg, setProfileImg] = useState();

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  // create user
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("email", userData.email);
      formData.append("password", userData.password);
      formData.append("phone", userData.phone);
      formData.append("age", userData.age);
      formData.append("profileImg", profileImg);


      console.log(formData)
      console.log(userData)
      console.log(profileImg)
      
      
      const res = await axios.post(
        "http://localhost:7070/users/signup",
        formData,
      );

      // console.log(res.data)
      //   const { token, user } = res.data;
      //   localStorage.setItem("data", JSON.stringify({ token, user }));

      setUserData({
        name: "",
        email: "",
        password: "",
        phone: "",
        age: "",
      });

      toast.success(res.data.message);
      console.log(res.data);
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <section className="flex items-center justify-center h-screen ">
      <div class="flex   gap-10   rounded-4xl py-10  border-zinc-900 items-center">
        {/* <div class="w-full hidden md:inline-block">
          <img
            class="h-[600px]"
            src="https://plus.unsplash.com/premium_photo-1666973935928-5b6e53a2d286?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE2fHx8ZW58MHx8fHx8"
            alt="leftSideImage"
          />
        </div> */}

        <div class="w-full flex flex-col items-center justify-center ">
          <form
            onSubmit={handleSubmit}
            class="md:w-96 w-80 flex flex-col items-center justify-center p-5"
          >
            <h2 class="text-4xl text-gray-800 font-serif">Sign up</h2>
            <p class="text-sm text-gray-800 mt-2 font-serif">
              Welcome Please sign up to continue
            </p>

            <button
              type="button"
              class="w-full mt-6 bg-gray-100 border border-zinc-300 flex items-center justify-center h-12 rounded-full"
            >
              <img
                src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleLogo.svg"
                alt="googleLogo"
              />
            </button>

            <div class="flex items-center gap-4 w-full my-5">
              <div class="w-full h-px bg-gray-600"></div>
              <p class="w-full text-nowrap text-sm text-gray-800 font-serif">
                or create an account
              </p>
              <div class="w-full h-px bg-gray-600"></div>
            </div>

            <div class="flex items-center w-full bg-transparent border border-gray-500 h-12 rounded-full overflow-hidden pl-4.5 gap-2">
              <p className="text-md font-semibold text-gray-500">
                <FaRegCircleUser />
              </p>
              <input
                type="text"
                name="name"
                value={userData.name}
                onChange={handleChange}
                placeholder="Full Name"
                class="bg-transparent text-gray-700 placeholder-gray-500 outline-none text-sm  w-full h-full font-serif"
                required
              />
            </div>

            <div class="flex items-center mt-4 w-full bg-transparent border border-gray-500 h-12 rounded-full overflow-hidden pl-4.5 gap-2">
              <p className="text-md text-gray-500">
                <LuSmartphone />
              </p>
              <input
                type="text"
                placeholder="Phone"
                name="phone"
                value={userData.phone}
                onChange={handleChange}
                class="bg-transparent text-gray-700 placeholder-gray-500 outline-none text-sm  w-full h-full font-serif"
                required
              />
            </div>

            <div class="flex items-center mt-4 w-full bg-transparent border border-gray-500 h-12 rounded-full overflow-hidden pl-4.5 gap-2">
              <p className="text-xl text-gray-500">
                <CiCalendarDate />
              </p>
              <input
                type="number"
                placeholder="Age"
                name="age"
                value={userData.age}
                onChange={handleChange}
                class="bg-transparent text-gray-700 placeholder-gray-500 outline-none text-sm  w-full h-full font-serif"
                required
              />
            </div>

            <div class="flex items-center mt-4 w-full bg-transparent border border-gray-500 h-12 rounded-full overflow-hidden pl-6 gap-2">
              <svg
                width="16"
                height="11"
                viewBox="0 0 16 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M0 .55.571 0H15.43l.57.55v9.9l-.571.55H.57L0 10.45zm1.143 1.138V9.9h13.714V1.69l-6.503 4.8h-.697zM13.749 1.1H2.25L8 5.356z"
                  fill="#6B7280"
                />
              </svg>
              <input
                type="text"
                placeholder="Email "
                name="email"
                value={userData.email}
                onChange={handleChange}
                class="bg-transparent text-gray-700 placeholder-gray-500 outline-none text-sm  w-full h-full font-serif"
                required
              />
            </div>

            <div class="flex items-center mt-4 w-full bg-transparent border border-gray-500 h-12 rounded-full overflow-hidden pl-6 gap-2">
              <svg
                width="13"
                height="17"
                viewBox="0 0 13 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13 8.5c0-.938-.729-1.7-1.625-1.7h-.812V4.25C10.563 1.907 8.74 0 6.5 0S2.438 1.907 2.438 4.25V6.8h-.813C.729 6.8 0 7.562 0 8.5v6.8c0 .938.729 1.7 1.625 1.7h9.75c.896 0 1.625-.762 1.625-1.7zM4.063 4.25c0-1.406 1.093-2.55 2.437-2.55s2.438 1.144 2.438 2.55V6.8H4.061z"
                  fill="#6B7280"
                />
              </svg>
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={userData.password}
                onChange={handleChange}
                class="bg-transparent text-gray-700 placeholder-gray-500 outline-none text-sm  w-full h-full font-serif"
                required
              />
            </div>
            <div class="flex items-center justify-center mt-4 w-full bg-transparent border border-gray-500 h-12 rounded-full overflow-hidden pl-6 gap-2">
              <svg
                width="13"
                height="17"
                viewBox="0 0 13 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13 8.5c0-.938-.729-1.7-1.625-1.7h-.812V4.25C10.563 1.907 8.74 0 6.5 0S2.438 1.907 2.438 4.25V6.8h-.813C.729 6.8 0 7.562 0 8.5v6.8c0 .938.729 1.7 1.625 1.7h9.75c.896 0 1.625-.762 1.625-1.7zM4.063 4.25c0-1.406 1.093-2.55 2.437-2.55s2.438 1.144 2.438 2.55V6.8H4.061z"
                  fill="#6B7280"
                />
              </svg>
              <input
                type="file"
                // placeholder="Password"
                name="profileImg"
                // onChange={(e) => setImage(e.target.files[0])}
                // value={profileImg}
                accept="image/*"
                onChange={(e) => setProfileImg(e.target.files[0])}
                className="bg-transparent text-gray-500 placeholder-gray-500 outline-none text-sm  w-full  font-serif"
                required
              />
            </div>

            <button
              type="submit"
              class="mt-8 w-full h-11 font-serif rounded-full text-white bg-indigo-500 hover:bg-indigo-600 cursor-pointer hover:opacity-90 transition-opacity"
            >
              Create
            </button>
            <p class="text-gray-600 text-sm font-serif mt-4">
              Already have an account?{" "}
              <Link class="text-indigo-600 hover:underline" to="/login">
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignupPage;
