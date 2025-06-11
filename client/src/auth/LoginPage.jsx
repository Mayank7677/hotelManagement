import axios from "axios";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import BASE_URL from "../utils/api";

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSendingOtp, setIsSendingOtp] = useState(false);

  // where to go after successful login –
  // if someone sent us here with state.from, use that; otherwise home
  const from = location.state?.from;

  const [step, setStep] = useState("login"); // step: login | otp
  const [emailForOtp, setEmailForOtp] = useState("");

  const [userData, setUserData] = useState({
    email: "",
    password: "",
    otp: "",
  });

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    setIsSendingOtp(true);

    try {
      const res = await axios.post(`${BASE_URL}/users/login`, {
        email: userData.email,
        password: userData.password,
      });

      if (res.data.step === "otp_verification") {
        toast.success("OTP sent to email. Please enter it to verify.");
        setStep("otp");
        setEmailForOtp(userData.email);
        setUserData((prev) => ({ ...prev, password: "" })); // Clear password
      }

      setUserData({
        email: "",
        password: "",
        otp: "",
      });
    } catch (error) {
      // console.log(error)
      toast.error(error.response.data.message);
    } finally {
      setIsSendingOtp(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${BASE_URL}/users/verifyOtp`, {
        email: emailForOtp,
        otp: userData.otp,
      });

      toast.success("Login successful!");
 
      console.log(res.data);
      const { token, user } = res.data;
      localStorage.setItem("data", JSON.stringify({ token, user }));

      console.log(from);
      if (from && from !== "/") {
        return navigate(from);
      }

      if (user.role === "admin") {
        return navigate("/admin");
      }

      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "OTP verification failed");
    }
  };

  return (
    <section className="flex items-center justify-center h-screen ">
      <div class="flex  gap-10   rounded-4xl py-10  border-zinc-700 items-center">
        {/* <div class="w-full hidden md:inline-block">
          <img
            class="h-[600px] "
            src="https://plus.unsplash.com/premium_photo-1666973935928-5b6e53a2d286?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE2fHx8ZW58MHx8fHx8"
            alt="leftSideImage"
          />
        </div> */}

        <div class="w-full flex flex-col items-center justify-center ">
          <form
            onSubmit={step === "login" ? handleLoginSubmit : handleOtpSubmit}
            class="md:w-96 w-80 flex flex-col items-center justify-center p-5"
          >
            <h2 class="text-4xl text-gray-800 font-serif">Sign in</h2>
            <p class="text-sm text-gray-800 mt-3 font-serif">
              Welcome back! Please sign in to continue
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
              <div class="w-full h-px bg-gray-800"></div>
              <p class="w-full text-nowrap text-sm text-gray-800 font-serif">
                or sign in with email
              </p>
              <div class="w-full h-px bg-gray-800"></div>
            </div>

            {step === "login" && (
              <>
                <div class="flex items-center w-full bg-transparent border border-gray-500 h-12 rounded-full overflow-hidden pl-6 gap-2">
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
                    type="email"
                    placeholder="Email id"
                    name="email"
                    onChange={handleChange}
                    value={userData.email}
                    class="bg-transparent text-gray-700 placeholder-gray-500 outline-none text-sm  w-full h-full font-serif"
                    required
                  />
                </div>

                <div class="flex items-center mt-6 w-full bg-transparent border border-gray-500 h-12 rounded-full overflow-hidden pl-6 gap-2">
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
                    onChange={handleChange}
                    value={userData.password}
                    class="bg-transparent text-gray-700 placeholder-gray-500 outline-none text-sm  w-full h-full font-serif"
                    required
                  />
                </div>

                <div class="w-full flex items-center justify-between mt-8 text-gray-500/80">
                  <div class="flex items-center gap-2"></div>
                  <Link
                    class="text-sm  text-indigo-600 hover:underline font-serif"
                    to="/reset"
                  >
                    Forgot password?
                  </Link>
                </div>
              </>
            )}

            {step === "otp" && (
              <>
                <div class="flex items-center w-full bg-transparent border border-gray-500 h-12 rounded-full overflow-hidden pl-6 gap-2">
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
                    placeholder="Enter OTP"
                    name="otp"
                    onChange={handleChange}
                    value={userData.otp}
                    class="bg-transparent text-gray-700 placeholder-gray-500 outline-none text-sm  w-full h-full font-serif"
                    required
                  />
                </div>
              </>
            )}

            <button
              type="submit"
              disabled={isSendingOtp}
              class="mt-8 w-full h-11 rounded-full text-white bg-indigo-500 hover:bg-indigo-600 cursor-pointer hover:opacity-90 transition-opacity font-serif"
            >
              {step === "login"
                ? isSendingOtp
                  ? "Sending OTP..."
                  : "Send OTP"
                : "Verify OTP"}
            </button>

            {step === "login" && (
              <p class="text-gray-700 text-sm font-serif mt-4">
                Don’t have an account?{" "}
                <Link class="text-indigo-600 hover:underline" to="/signup">
                  Create
                </Link>
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
