import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaChevronLeft } from "react-icons/fa";
import { TailSpin } from "react-loader-spinner";
import UserCard from '../../../components/common/UserCard';
import GeneralEnquiryList from '../../../components/Core/Dashboard/Admin/GeneralEnquiryList';
import { getEnquiriesAsync, getEnquiries, getEnquiriesResponse } from '../../../apis/slices/enquirySlice';
import live from '../../../assets/images/live.png';
import liveimage from '../../../assets/images/liveimage.png';

const GeneralEnquiry = ({ isOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { response } = useSelector(getEnquiriesResponse);
  const [enquiryData, setEnquiryData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchEnquiryStats();
  }, [location.pathname]);

  const fetchEnquiryStats = () => {
    setLoading(true);
    dispatch(getEnquiries({ isLoading: true }));

    getEnquiriesAsync({
      dispatch,
      callbackFn: (res) => {
        setLoading(false);
        if (res?.data?.status === 200) {
          setEnquiryData({
            total_enquiries: res.data.data.paging?.totalItems || 0
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
            Home / <span className='text-black font-medium'>General Enquiries</span>
          </div>
        </div>
      </div>

      <h2 className="mt-6 font-bold text-[22px] leading-[28px] text-[#2C2E32]">
        General Enquiries
      </h2>

      <div className="mt-3">
        <UserCard
          label="Total Enquiries"
          height="h-[111px]"
          backgroundcolor="bg-[#FFFFFF]"
          value={enquiryData?.total_enquiries || 0}
          imgbg={live}
          imglogo={liveimage}
        />
      </div>

      <GeneralEnquiryList onRefresh={fetchEnquiryStats} />
    </div>
  );
};

export default GeneralEnquiry;

