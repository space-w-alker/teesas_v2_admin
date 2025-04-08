import React, { useState, useEffect } from 'react'
import live from '../../assets/images/live.png'
import liveimage from '../../assets/images/liveimage.png'
import UserCard from '../common/UserCard'
import { FaChevronLeft } from "react-icons/fa"
import { useNavigate } from 'react-router-dom'
import { TailSpin } from "react-loader-spinner"
import DonationList from '../DonationEnquiry/DonationList'

const DonationEnquiry = ({ isOpen }) => {
  const navigate = useNavigate()
  const [donationData, setDonationData] = useState([])
  const [loading, setLoading] = useState(false)

  const dummyDonationStats = {
    total_donations: 150,
  }

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setDonationData(dummyDonationStats)
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
          <TailSpin color="green" radius={5} />
        </div>
      )}

      <div className='flex justify-start items-center lg:gap-3'>
        <FaChevronLeft />
        <div>
          <div className='font-normal text-[14px] lg:text-[16px] leading-[20px] text-[#B6B6B6]'>
            Home / <span className='text-black font-medium'>Donation Enquiry</span>
          </div>
        </div>
      </div>

      <h2 className="mt-6 font-bold text-[22px] leading-[28px] text-[#2C2E32]">
        Donation Enquiry
      </h2>

      <div className="mt-3">
        <UserCard
          label="Total Donations"
          height="h-[111px]"
          backgroundcolor="bg-[#FFFFFF]"
          value={donationData?.total_donations}
          imgbg={live}
          imglogo={liveimage}
        />
      </div>



      <DonationList />
    </div>
  )
}

export default DonationEnquiry
