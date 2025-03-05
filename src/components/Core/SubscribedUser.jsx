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
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const subscriptionStatsState = useSelector(selectSubscriptionStats);

  useEffect(() => {
    fetchSubscriptionStats();
  }, [dispatch, token]);

  const fetchSubscriptionStats = () => {
    setLoading(true);
    getSubscriptionStatsAsync({
      dispatch: dispatch,
      token: token,
      callbackFn: (res) => {
        setLoading(false);
        if (res?.data) {
          console.log("Subscription stats:", res.data);
        }
      },
    });
  };

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

  // Updated variable names to match the new API response structure
  const totalSubscriptions = subscriptionStatsState?.data?.totalSubscriptions || 0;
  const totalActiveSubscriptions = subscriptionStatsState?.data?.totalActiveSubscriptions || 0;
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
            <div className="lg:flex block gap-[10px]">
              <UserCard
                label="Total Subscriptions"
                width="lg:w-[33%]"
                height="lg:h-[142px]"
                backgroundcolor="bg-[#F2F2F2]"
                value={totalSubscriptions}
                // value2={0}
                // img={arrow_upward}
                img2={notes}
              />
              <UserCard
                label="Active Subscriptions"
                width="lg:w-[33%]"
                height="lg:h-[142px]"
                backgroundcolor="bg-[#F2F2F2]"
                value={totalActiveSubscriptions}
                // value2={0}
                // img={arrow_upward}
                img2={notes}
              />
              <UserCard
                label="Expired Subscriptions"
                width="lg:w-[33%]"
                height="lg:h-[142px]"
                backgroundcolor="bg-[#F2F2F2]"
                value={totalExpiredSubscriptions}
                // value2={0}
                // img={arrow_upward}
                img2={notes}
              />
            </div>
          </div>
        </div>

        <div className='flex justify-end items-center gap-[15px] mt-5'>
          <div
            className={`border rounded-lg ${activeButton === 'Add Subscription' ? 'bg-[#27AE60] text-white' : 'border-[#27AE60] text-[#27AE60]'
              }`}
            onClick={() => navigate("/addSingleSubscription")}
          >
            <button className='text-[14px] leading-[20px] pt-[2px] text-center w-[123px] h-[40px] rounded-lg cursor-pointer'>
              Add Subscription
            </button>
          </div>

          {/* {isModalOpen && (
            <Modal
              closeModal={closeModal}
              label="ADD USER"
              value1="Add Unit Subscription"
              value2="Upload Bulk Subscription"
              addSingleButton={() => { navigate("/addSingleSubscription") }}
              addMutipleButton={() => { navigate("/UploadBulkSubscription") }}
            />
          )} */}
        </div>

        <SubscribedUserList />
      </div>
    </div>
  );
};

export default SubscribedUser;
