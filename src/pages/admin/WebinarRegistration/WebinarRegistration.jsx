import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaChevronLeft } from "react-icons/fa";
import { TailSpin } from "react-loader-spinner";
import UserCard from '../../../components/common/UserCard';
import WebinarRegistrationList from '../../../components/Core/Dashboard/Admin/WebinarRegistrationList';
import { getWebinarRegistrationsAsync, getWebinarRegistrations, getWebinarRegistrationsResponse } from '../../../apis/slices/webinarRegistrationSlice';
import live from '../../../assets/images/live.png';
import liveimage from '../../../assets/images/liveimage.png';

const WebinarRegistration = ({ isOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { response } = useSelector(getWebinarRegistrationsResponse);
  const [registrationData, setRegistrationData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchRegistrationStats();
  }, [location.pathname]);

  const fetchRegistrationStats = () => {
    setLoading(true);
    dispatch(getWebinarRegistrations({ isLoading: true }));

    getWebinarRegistrationsAsync({
      dispatch,
      callbackFn: (res) => {
        setLoading(false);
        if (res?.data) {
          setRegistrationData({
            total_registrations: res.data.data?.paging?.totalItems || res.data.paging?.totalItems || res.data.data?.length || 0
          });
        }
      },
      data: {
        page: 1,
        limit: 10
      }
    });
  };

  return (
    <div className={`py-[7rem] lg:px-[5rem] flex flex-col gap-2 px-[10px] ${isOpen ? "xl:ml-[260px]" : ""}`}>
      {loading && (
        <div style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 9999,
        }}>
          <TailSpin color="green" radius={5} />
        </div>
      )}

      <div className='flex justify-start items-center lg:gap-3'>
        <FaChevronLeft className="cursor-pointer" onClick={() => navigate(-1)} />
        <div>
          <div className='font-normal text-[14px] lg:text-[16px] leading-[20px] text-[#B6B6B6]'>
            Home / <span className='text-black font-medium'>Webinar Registration</span>
          </div>
        </div>
      </div>

      <h2 className="mt-6 font-bold text-[22px] leading-[28px] text-[#2C2E32]">
        Webinar Registration
      </h2>

      <div className="mt-3">
        <UserCard
          label="Total Registrations"
          height="h-[111px]"
          backgroundcolor="bg-[#FFFFFF]"
          value={registrationData?.total_registrations || 0}
          imgbg={live}
          imglogo={liveimage}
        />
      </div>

      <WebinarRegistrationList onRefresh={fetchRegistrationStats} />
    </div>
  );
};

export default WebinarRegistration;

