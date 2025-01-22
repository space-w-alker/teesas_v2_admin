import React, { useState, useEffect } from 'react'
import UserCard from '../common/UserCard'
import { FaChevronLeft } from "react-icons/fa"
import { useNavigate } from 'react-router-dom'
import { TailSpin } from "react-loader-spinner"
import BadgesList from '../Core/Dashboard/Admin/BadgeList'

const Badges = ({isOpen}) => {
  const navigate = useNavigate()
  const [badgeData, setBadgeData] = useState([])
  const [loading, setLoading] = useState(false)

  const dummyBadgeStats = {
    total_badges: 120,
    active_badges: 85,
    awarded_badges: 450
  }

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setBadgeData(dummyBadgeStats)
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
            Home / <span className='text-black font-medium'>Badges</span>
          </div>
        </div>
      </div>

      <h2 className="mt-6 font-bold text-[22px] leading-[28px] text-[#2C2E32]">
        Badges
      </h2>

      <div className="mt-3">
        <UserCard
          label="Total Badges"
          height="h-[111px]"
          backgroundcolor="bg-[#FFFFFF]"
          value={badgeData?.total_badges}
         
        />
      </div>

      <div className="flex justify-end mt-4">
        <button
          className="text-[14px] leading-[20px] text-center font-bold w-[181px] h-[40px] rounded-lg py-[7px] px-[12px] bg-[#F2994A] text-white"
          onClick={() => navigate('/Badges/AddBadge')}
        >
          + Add Badge
        </button>
      </div>

      <BadgesList/>
    </div>
  )
}

export default Badges
