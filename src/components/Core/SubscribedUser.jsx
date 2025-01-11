import React, { useEffect, useState } from "react";
import Navigation from "../../components/common/Navigation";
import frame2 from "../../assets/images/Frame2.png";
import UserCard from "../../components/common/UserCard";
import Modal from '../../components/common/Modal';
import SubscribedUserList from "../../components/Core/SubscribedUserList";
import Headcomponent from "../../components/common/Headcomponent";
import arrow_upward from '../../assets/images/arrow_upward.png';
import { useDispatch } from "react-redux";
import { getUsersCsv, userAsync, getUserCsvAsync } from "../../apis/slices/authSlice";
import { FaChevronLeft } from "react-icons/fa";
import notes from "../../assets/images/Group1000001600.png";
import { TailSpin } from "react-loader-spinner";
import { useNavigate } from 'react-router-dom';

const SubscribedUser = ({ isOpen }) => {
  const [selectedMonth, setSelectedMonth] = useState("August");
  const [data, setdata] = useState([]);
  const token = localStorage.getItem("authToken");
  const [dashFilter, setDashFilter] = useState('Daily');
  const [csvUser, setCsvUser] = useState([]);
  const [progressCsv, setProgressCsv] = useState([]);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [exportModal, setExportModal] = useState(false);

  useEffect(() => {
    setLoading(true);
    const saveData = {
      filter: dashFilter,
    }
    userAsync({
      dispatch: dispatch,
      data: saveData,
      token: token,
      callbackFn: (res) => {
        if (res?.status == 200) {
          setdata(res?.data?.statistics);
        }
      },
    });

    getUserCsvAsync({
      dispatch: dispatch,
      data: {},
      token: token,
      callbackFn: (res) => {
        if (res?.data?.status == 200) {
          setCsvUser(res?.data?.data?.users);
          setProgressCsv(res?.data?.data?.user_progress)
          setLoading(false);
        } else {
          setLoading(false);
        }
      },
    });
  }, []);

  const handleButtonClick = (button) => {
    setActiveButton(button);
    if (button === 'Add Subscription') {
      setIsModalOpen(true);
    } else {
      setExportModal(true);
    }
    if(button === "Manage Class") {
      navigate('/ManageLiveClass')
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setExportModal(false)
  };

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
                  setLoading(true);
                  setDashFilter(e.target.value);
                  const saveData = {
                    filter: e.target.value,
                  }
                  userAsync({
                    dispatch: dispatch,
                    data: saveData,
                    token: token,
                    callbackFn: (res) => {
                      if (res?.status == 200) {
                        setdata(res?.data?.statistics);
                        setLoading(false);
                      } else {
                        setLoading(false);
                      }
                    },
                  });
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
                value={50}
                value2={50}
                img={arrow_upward}
                img2={notes}
              />
              <UserCard
                label="Total Expired Subscriptions"
                width="lg:w-[50%]"
                height="lg:h-[142px]"
                backgroundcolor="bg-[#F2F2F2]"
                value={50}
                value2={10}
                img={arrow_upward}
                img2={notes}
              />
            </div>
          </div>
        </div>

        <div className='flex justify-end items-center gap-[15px] mt-5'>
          <div
            className={`border rounded-[8px] ${
              activeButton === 'Export CSV' ? 'bg-[#F2994A] text-white' : 'border-[#F2994A] text-[#F2994A]'
            }`}
            onClick={() => handleButtonClick('Export CSV')}
          >
            <button className='text-[14px] leading-[20px] pt-[2px] w-[128px] h-[40px] text-center cursor-pointer'>
              Export CSV
            </button>
          </div>

          <div
            className={`border rounded-lg ${
              activeButton === 'Add Subscription' ? 'bg-[#F2994A] text-white' : 'border-[#F2994A] text-[#F2994A]'
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
              addSingleButton={() => {navigate("/addSingleSubscription")}}
              addMutipleButton={() => {navigate("/UploadBulkSubscription")}}
            />
          )}
          {exportModal && (
            <Modal
              closeModal={closeModal}
              label="Export"
              csvData1={csvUser}
              csvData2={progressCsv}
            />
          )}
        </div>

        <SubscribedUserList />
      </div>
    </div>
  );
};

export default SubscribedUser;
