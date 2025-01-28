import {React, useState, useEffect} from 'react'
import live from '../../assets/images/live.png'
import liveimage from '../../assets/images/liveimage.png'
import UserCard from '../common/UserCard'
import { FaChevronLeft } from "react-icons/fa"
import { useNavigate } from 'react-router-dom'
import { TailSpin } from "react-loader-spinner"
import BannerList from '../Core/Dashboard/Admin/BannerList'

const Banner = ({isOpen}) => {
  const navigate = useNavigate()
  const [bannerData, setBannerData] = useState([])
  const [loading, setLoading] = useState(false)

  const dummyBannerStats = {
    total_banners: 25,
    active_banners: 18,
    featured_banners: 7
  }

  useEffect(() => {
    setLoading(true)
    // Simulate API call with dummy data
    setTimeout(() => {
      setBannerData(dummyBannerStats)
      setLoading(false)
    }, 1000)
  }, [])

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
        <FaChevronLeft />
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
          value={bannerData?.total_banners}
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

      <BannerList/>
    </div>
  )
}

export default Banner
