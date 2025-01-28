import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import success from "../../assets/images/success.png";
import OtpInput from "react-otp-input";
import {
 
  verificationCodeAsync,
  verifyCodeAsync,
  setNewPasswordAsync,
  // resetPasswordAsync,
} from "../../apis/slices/authSlice";
import { TailSpin } from "react-loader-spinner";
import { toast } from "react-toastify";

function ForgetPassword() {
  const [emailsent, setemailsent] = useState();
  const [loading, setLoading] = useState(false);
  const [page, setpage] = useState(0);
  const [email, setemail] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [newPassword, setNewPassword] = useState("");

  const handleOnSubmit = (e) => {
    const errorData = validateEmail(email);
    setError(errorData);
    if (Object.keys(errorData).length < 1) {
      setLoading(true);
      const FinalData = {
        email: email,
       
      };

      verificationCodeAsync({
        dispatch: dispatch,
        body: FinalData,
        callbackFn: (res) => {
          if (res?.data?.status === 200) {
            setLoading(false);
            setemailsent(!emailsent);
            setpage(page + 1);
          } else if (
            res?.data?.status === 400 &&
            res?.data?.message === "User not found."
          ) {
            setError({
              email: "User not found. Please check your email address.",
            });
            setLoading(false);
          } else {
            toast.error(res?.data?.message);
            setLoading(false);
          }
        },
      });
    }
  };

  const handleOnSubmitOtp = () => {
    const errorData = validateOtp(otp);
    setError(errorData);
    if (Object.keys(errorData).length < 1) {
      setLoading(true);
      const FinalData = {
        email: email,
        otp: otp,
        type: "ADMIN",
      };

      verifyCodeAsync({
        dispatch: dispatch,
        body: FinalData,
        callbackFn: (res) => {
          console.log("response", res);
          if (res?.data?.status === 200) {
            setLoading(false);
            setpage(page + 1);
          } else {
            toast.error(res?.data?.message);
            setLoading(false);
          }
        },
      });
    }
  };

  const handleOnSubmitNewPass = () => {
    const errorData = validateNewPass(newPassword);
    setError(errorData);
    if (Object.keys(errorData).length < 1) {
      setLoading(true);
      const FinalData = {
        email: email,
        type: "ADMIN",
        password: newPassword,
      };

      setNewPasswordAsync({
        dispatch: dispatch,
        body: FinalData,
        callbackFn: (res) => {
          console.log("response", res);
          if (res?.data?.status === 200) {
            setLoading(false);
            setShowModal(true);
            setpage(page + 1);
          } else {
            toast.error(res?.data?.message);
            setLoading(false);
          }
        },
      });
    }
  };

  const handleModalClose = () => {
    navigate("/");
  };

  const handlemodal = (e) => {
      setShowModal(true);
  };

  const validateEmail = (email) => {
    const errors = {};
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email) {
      errors.email = "Email is required";
    } else if (!emailPattern.test(email)) {
      errors.email = "Email is not in a valid format";
    }
    return errors;
  };
  const validateOtp = (otp) => {
    const errors = {};
    if (!otp) {
      errors.otp = "OTP is required";
    } else if (otp.length < 4) {
      errors.otp = "Please enter valid OTP";
    }
    return errors;
  };
  const validateNewPass = (newPassword) => {
    const errors = {};
    if (!newPassword) {
      errors.newPassword = "Password is required";
    } else if (newPassword.length < 6) {
      errors.newPassword = "Please enter valid Password";
    }
    return errors;
  };
  const Mymodal = () => {
    return (
      <div className="fixed left-0 top-[-90px] right-0 bottom-0 z-50 flex justify-center items-center bg-black bg-opacity-50  ">
        <div className="border-[#C3C3C3] border bg-white w-[435px] h-[393px] p-10 rounded-3xl">
          <img
            src={success}
            className="w-[100px] h-[100px] mx-auto"
            alt="Success"
          />
          <h3 className="text-center font-bold text-3xl mt-4 mb-2">
            Successful
          </h3>
          <p className="text-center text-gray-700 mb-6">
            Your password reset was successful.
          </p>
          <button
            onClick={handleModalClose}
            className="w-full bg-[#F2994A] mt-[50px] text-white rounded-lg py-2"
          >
            Login
          </button>
        </div>
      </div>
    );
  };

  return (
    <div
      className={`p-8 flex justify-center items-center flex-col ${
        showModal ? "overflow-hidden" : ""
      }`}
    >
      {loading && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 9999,
          }}
        >
          <TailSpin color="#27AE60" radius={5} />
        </div>
      )}
      <div
        style={{ display: showModal ? "none" : "" }}
        className="mt-[150px] border-[#C3C3C3] border bg-[#FFFFFF] max-w-[500px] p-10 rounded-3xl"
      >
        <div className=" px-[16px] py-[20px]">
          <h2 className=" text-center text-[40px] leading-[40px] text-[#0C1421] font-bold">
            {page === 0
              ? "We’ve Got You 👍🏽"
              : page === 1
              ? "You’ve Got Mail 👍🏽"
              : page === 2
              ? "New Password👍🏽"
              : ""}
          </h2>

          <p className=" font-normal text-[16px] text-center text-[#313957] leading-7 mt-5">
            {page == 0 || page == 1
              ? "Don't worry It occurs enter the email address linked to your account."
              : "Enter the new password you would like to use below"}
          </p>
        </div>
        <div className="max-w-[448px]">
          {page == 0 ? (
            <>
              <label for="email" className="block  mt-8">
                Email
              </label>
              <input
                required
                type="email"
                name="email"
                value={email}
                onChange={(e) => {
                  setemail(e.target.value);
                  setError(validateEmail(e.target.value));
                }}
                className="w-full mt-1 bg-[#F8F8F8] text-[14px] border p-2 border-[#D9D9D9] h-[40px] rounded-lg"
                placeholder="Enter Details"
              />
              {error?.email && (
                <div className=" text-red-500 text-[12px] mt-1">
                  {error?.email}
                </div>
              )}
            </>
          ) : page == 1 ? (
            <>
            <div className="flex w-[70%]  mx-auto my-[20px] justify-center items-center gap-3">
              <OtpInput
                value={otp}
                // onChange={((e)=>{setOtp(e.target.value)})}
                onChange={setOtp}
                numInputs={4}
                renderSeparator={
                  <span
                    style={{
                      fontSize: "10px",
                      marginLeft: "20px",
                      marginRight: "5px",
                    }}
                  >
                    {" "}
                  </span>
                }
                renderInput={(props) => (
                  <input required value={otp || ""} {...props} />
                )}
                inputStyle={{
                  width: "72px",
                  marginBottom: "40px",
                  height: "72px",
                  border: "1px solid #D9D9D9",
                  backgroundColor: "transparent",
                  borderRadius: "8px",
                  padding: "10px 24px 10px 24px",
                  outline: "none",
                }}
              />
              
              
            </div>
            {error?.otp && (
              <div className=" text-red-500 ml-6 mt-[-40px] text-[12px] ">
                {error?.otp}
              </div>
            )}
              </>
          ) : (
            <>
              <label for="email" className="block  mt-8">
                New Password
              </label>
              <input
                required
                type="text"
                name="new_password"
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                }}
                className="w-full mt-1 bg-[#F8F8F8] text-[14px] border p-2 border-[#D9D9D9] h-[40px] rounded-lg"
                placeholder="Enter Details"
              />
              {error?.newPassword && (
                <div className=" text-red-500 text-[12px] mt-1">
                  {error?.newPassword}
                </div>
              )}
            </>
          )}
          <button
            type="submit"
            onClick={
              page == 0
                ? handleOnSubmit
                : page == 1 ? handleOnSubmitOtp
                : page == 2  ? handleOnSubmitNewPass : handlemodal
            }
            className={` ${
              page == 1 ? "mt-[100px]" : "mt-[80px]"
            } bg-[#27AE60] text-[14px] flex items-center justify-center text-[#FFFFFF] w-full p-2 rounded-lg ${
              isLoading || !email
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer"
            }`}
            disabled={isLoading || !email}
          >
            {page == 1 ? "Continue" : "Reset Password"}
          </button>
        </div>
        <div className="flex justify-center items-center mt-2 text-center text-[14px] leading-[22px] font-normal px-3">
          Remember Password ?
          <Link
            to="/"
            className="text-[16px] leading-6 ml-1  text-[#27AE60]"
          >
            Sign In
          </Link>
        </div>
      </div>
      {showModal && <Mymodal />}
      <div className="absolute top-8 left-8 flex items-center cursor-pointer" onClick={() => navigate('/')}>
  <svg 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M19 12H5M5 12L12 19M5 12L12 5" 
      stroke="#000000" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
  <span className="ml-2 text-black font-bold">Forgot Password</span>
</div>


    </div>
  );
}

export default ForgetPassword;
