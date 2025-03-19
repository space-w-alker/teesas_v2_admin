import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import badgeIcon from "../../assets/images/Banner-icon.png";
import { useDispatch, useSelector } from "react-redux";
import { deletePushAsync } from "../../apis/slices/adminSlice";
import { toast } from "react-toastify";

const NotificationDetails = ({ isOpen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const notificationId = searchParams.get("id");
  const location = useLocation();

  const notificationData = location.state || {};
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("authToken");

  // useEffect(() => {
  //   setLoading(true)
  //   // Fetch notification details using notificationId
  //   // API call would go here
  //   setTimeout(() => {
  //     setLoading(false)
  //   }, 1000)
  // }, [notificationId])

  return (
    <div
      className={`py-[8rem] lg:px-[10rem] px-[10px] ${
        isOpen ? "ml-[240px]" : ""
      }`}
    >
      <div className="flex items-center gap-2 text-sm mb-6">
        <span className="text-gray-400">Home</span>
        <span className="text-gray-400">/</span>
        <span
          onClick={() => navigate(-1)}
          className="text-gray-400 cursor-pointer"
        >
          Notifications
        </span>
        <span className="text-gray-400">/</span>
        <span className="text-gray-900 font-medium">Notification Details</span>
      </div>

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
          <TailSpin color="orange" radius={5} />
        </div>
      )}

      <div className="bg-[#EFF6F1] border rounded-lg mb-[10px] border-[#CAC4D0] h-[80px] p-[8px]">
        <div className="flex items-center gap-4">
          <div className="rounded-full text-center p-2 w-[40px] h-[40px] bg-[#F8F5ED]">
            <img
              src={badgeIcon}
              alt="badge"
              className="w-[20px] h-[20px] object-contain"
            />
          </div>
          <div className="">
            <p className="font-bold text-[16px] leading-[24px] tracking-wider text-[#1D2026]">
              {notificationData?.notification?.title}
            </p>
            {notificationData?.notification?.status == 1 ? (
              <button className="w-[64px] h-[20px] rounded-full font-medium text-[13px] leading-[15px] mt-[4px] pt-[2px] text-white bg-[#08AA58]">
                Active
              </button>
            ) : (
              <button className="w-[64px] h-[20px] rounded-full font-medium text-[13px] leading-[15px] mt-[4px] pt-[2px] text-white bg-[#aa0808]">
                Inactive
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="text-center mb-4">
        <button
          onClick={() => {
            setLoading(true);
            deletePushAsync({
              dispatch: dispatch,
              data: notificationData?.notification?.id,
              token: token,
              callbackFn: (res) => {
                if (res?.data?.status === 200) {
                  setLoading(false);
                  toast.success(res?.message);
                  navigate(-1);
                } else {
                  toast.error(res?.data?.message);
                  setLoading(false);
                }
              },
            });
          }}
          className="font-medium text-[14px] leading-[20px] text-red-600 cursor-pointer"
        >
          Delete
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="border-b border-gray-200 pb-2 mb-4">
          <h3 className="text-lg font-bold text-gray-900">
            Notification Details
          </h3>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="bg-white rounded-lg p-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex">
                <p className="text-gray-600 mr-8">Title:</p>
                <p className="font-medium]">
                  {notificationData?.notification?.title}
                </p>
              </div>
              <div className="flex">
                <p className="text-gray-600 mr-8">Type:</p>
                <p className="font-medium]">
                  {notificationData?.notification?.push_type}
                </p>
              </div>
              <div className="flex">
                <p className="text-gray-600 mr-8">Description:</p>
                <p className="font-medium">
                  {notificationData?.notification?.description}
                </p>
              </div>
              <div className="flex">
                <p className="text-gray-600">Created Date:</p>
                <p className="font-medium">
                  {notificationData?.notification?.created_at}
                </p>
              </div>
              <div className="flex">
                <p className="text-gray-600">Updated Date:</p>
                <p className="font-medium">
                  {notificationData?.notification?.updated_at}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationDetails;
