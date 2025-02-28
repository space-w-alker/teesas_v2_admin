import React, { useEffect, useState } from "react";
import UserCard from "../../components/common/UserCard";
import Modal from '../../components/common/Modal';
import SubscribedUserList from "../../components/Core/SubscribedUserList";
import arrow_upward from '../../assets/images/arrow_upward.png';
import { useDispatch, useSelector } from "react-redux";
import { getSubscriptionStatsAsync, selectSubscriptionStats } from "../../apis/slices/subscriptionsSlice";
import { FaChevronLeft } from "react-icons/fa";
import notes from "../../assets/images/Group1000001600.png";
import { TailSpin } from "react-loader-spinner";
import { useNavigate } from 'react-router-dom';

const SubscribedUser = ({ isOpen }) => {
  const token = localStorage.getItem("authToken");
  const [dashFilter, setDashFilter] = useState('Daily');
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Get subscription stats from Redux store with safe access
  const subscriptionStatsState = useSelector(selectSubscriptionStats);
  console.log("Subscription stats from Redux:", subscriptionStatsState);

  useEffect(() => {
    console.log("SubscribedUser component mounted, fetching stats...");
    setLoading(true);

    // Fetch subscription stats
    getSubscriptionStatsAsync({
      dispatch: dispatch,
      token: token,
      callbackFn: (res) => {
        console.log("Stats callback response:", res);
        setLoading(false);
      },
    });
  }, [dispatch, token]);
  const handleButtonClick = (button) => {
    setActiveButton(button);
    if (button === 'Add Subscription') {
      setIsModalOpen(true);
    } else if (button === "Manage Class") {
      navigate('/ManageLiveClass');
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Add console logs to debug
  // const subscriptionStatsState = useSelector(selectSubscriptionStats);
  console.log("Subscription stats from Redux:", subscriptionStatsState);

  useEffect(() => {
    console.log("SubscribedUser component mounted, fetching stats...");
    setLoading(true);

    // Fetch subscription stats
    getSubscriptionStatsAsync({
      dispatch: dispatch,
      token: token,
      callbackFn: (res) => {
        console.log("Stats callback response:", res);
        setLoading(false);
      },
    });
  }, [dispatch, token]);

  // Safely access subscription stats data
  const totalSubscribedUsers = subscriptionStatsState?.data?.totalSubscribedUsers || 0;
  const totalExpiredSubscriptions = subscriptionStatsState?.data?.totalExpiredSubscriptions || 0;

  return (
    <div>
      <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""}`}>
        {loading && (
          <div style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 9999,
          }}>
            <TailSpin color="orange" radius={5} />
          </div>
        )}

        <div className='flex justify-start items-center lg:gap-3'>
          <FaChevronLeft />
          <div>
            <div className='font-normal text-[14px] lg:text-[16px] leading-[20px] text-[#B6B6B6]'>
              Home /<span className='text-black font-medium'> Subscribed-User</span>
            </div>
          </div>
        </div>

        <h2 className="font-bold text-[22px] leading-[28px] text-[#2C2E32] mt-10">
          Subscribed Users
        </h2>

        <div className="flex gap-5 flex-col mt-4">
          <div className="lg:h-[214px] py-[16px] px-[17px] rounded-xl bg-[#FFFFFF]">
            <div className="flex items-center justify-end mb-[10px]">
              <select
                type="text"
                name="dashFilter"
                value={dashFilter}
                onChange={(e) => {
                  setDashFilter(e.target.value);
                }}
                className="mt-1 text-[14px] outline-none border border-[#ECEDEE] ml-auto px-[8px] rounded w-[95px] h-[30px]"
              >
                <option value="Daily">Daily</option>
                <option value="Monthly">Monthly</option>
                <option value="Yearly">Yearly</option>
              </select>
            </div>
            <div className="lg:flex block gap-[10px]">
              <UserCard
                label="Total Subscribed Users"
                width="lg:w-[50%]"
                height="lg:h-[142px]"
                backgroundcolor="bg-[#F2F2F2]"
                value={totalSubscribedUsers}
                value2={0}
                img={arrow_upward}
                img2={notes}
              />
              <UserCard
                label="Total Expired Subscriptions"
                width="lg:w-[50%]"
                height="lg:h-[142px]"
                backgroundcolor="bg-[#F2F2F2]"
                value={totalExpiredSubscriptions}
                value2={0}
                img={arrow_upward}
                img2={notes}
              />
            </div>
          </div>
        </div>

        <div className='flex justify-end items-center gap-[15px] mt-5'>
          <div
            className={`border rounded-lg ${activeButton === 'Add Subscription' ? 'bg-[#F2994A] text-white' : 'border-[#F2994A] text-[#F2994A]'
              }`}
            onClick={() => handleButtonClick('Add Subscription')}
          >
            <button className='text-[14px] leading-[20px] pt-[2px] text-center w-[123px] h-[40px] rounded-lg cursor-pointer'>
              Add Subscription
            </button>
          </div>

          {isModalOpen && (
            <Modal
              closeModal={closeModal}
              label="ADD USER"
              value1="Add Unit Subscription"
              value2="Upload Bulk Subscription"
              addSingleButton={() => { navigate("/addSingleSubscription") }}
              addMutipleButton={() => { navigate("/UploadBulkSubscription") }}
            />
          )}
        </div>

        <SubscribedUserList />
      </div>
    </div>
  );
};

export default SubscribedUser;
