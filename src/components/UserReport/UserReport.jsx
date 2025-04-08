import React, { useState, useEffect } from 'react'
//import report from '../../assets/images/report.png'
import reportIcon from "../../assets/images/Banner-icon.png";

import UserCard from '../common/UserCard'
import { FaChevronLeft } from "react-icons/fa"
import { useNavigate } from 'react-router-dom'
import { TailSpin } from "react-loader-spinner"
import ReportList from '../Core/Dashboard/Admin/UserReportList'

const UserReport = ({ isOpen }) => {
  const navigate = useNavigate()
  const [reportData, setReportData] = useState([])
  const [loading, setLoading] = useState(false)

  const dummyReportStats = {
    total_reports: 250,
    active_reports: 85,
    resolved_reports: 165
  }

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setReportData(dummyReportStats)
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
            Home / <span className='text-black font-medium'>User Reports</span>
          </div>
        </div>
      </div>

      <h2 className="mt-6 font-bold text-[22px] leading-[28px] text-[#2C2E32]">
        User Reports
      </h2>

      <div className="mt-3">
        <UserCard
          label="Total Reports"
          height="h-[111px]"
          backgroundcolor="bg-[#FFFFFF]"
          value={reportData?.total_reports}

        />
      </div>



      <ReportList />
    </div>
  )
}

export default UserReport
