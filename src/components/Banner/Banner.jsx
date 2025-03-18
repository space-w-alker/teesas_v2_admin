import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import live from '../../assets/images/live.png';
import liveimage from '../../assets/images/liveimage.png';
import UserCard from '../common/UserCard';
import { FaChevronLeft } from "react-icons/fa";
import { useNavigate, useLocation } from 'react-router-dom';
import { TailSpin } from "react-loader-spinner";
import BannerList from '../Core/Dashboard/Admin/BannerList';
import { getBannersAsync, getBanners, getBannersResponse } from '../../apis/slices/bannerSlice';

const Banner = ({ isOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { response } = useSelector(getBannersResponse);
  const [bannerData, setBannerData] = useState({});
  const [loading, setLoading] = useState(false);

  // Check if coming back from add banner page
  useEffect(() => {
    fetchBannerStats();
  }, [location.pathname]);

  const fetchBannerStats = () => {
    setLoading(true);
    dispatch(getBanners({ isLoading: true }));

    getBannersAsync({
      dispatch,
      callbackFn: (res) => {
        setLoading(false);
        if (res?.data?.status === 200) {
          setBannerData({
            total_banners: res.data.data.pagination.total || 0
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
          <TailSpin color="orange" radius={5} />
        </div>
      )}

      <div className='flex justify-start items-center lg:gap-3'>
        <FaChevronLeft className="cursor-pointer" onClick={() => navigate(-1)} />
        <div>
          <div className='font-normal text-[14px] lg:text-[16px] leading-[20px] text-[#B6B6B6]'>
            Home / <span className='text-black font-medium'>Banners</span>
          </div>
        </div>
      </div>

      <h2 className="mt-6 font-bold text-[22px] leading-[28px] text-[#2C2E32]">
        Banners
      </h2>

      <div className="mt-3">
        <UserCard
          label="Total Banners"
          height="h-[111px]"
          backgroundcolor="bg-[#FFFFFF]"
          value={bannerData?.total_banners || 0}
          imgbg={live}
          imglogo={liveimage}
        />
      </div>

      <div className="flex justify-end mt-4">
        <button
          className="text-[14px] leading-[20px] text-center font-bold w-[181px] h-[40px] rounded-lg py-[7px] px-[12px] bg-green-600 text-white"
          onClick={() => navigate('/Banner/AddBanner')}
        >
          + Add Banner
        </button>
      </div>

      <BannerList onRefresh={fetchBannerStats} />
    </div>
  );
};

export default Banner;
