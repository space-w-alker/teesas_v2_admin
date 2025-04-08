import React, { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { TailSpin } from "react-loader-spinner"

const UserReportDetails = ({ isOpen }) => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const reportId = searchParams.get('id')
  const [reportData, setReportData] = useState({
    id: 1,
    title: "Performance Issue Report",
    status: true,
    type: "Technical Issue",
    description: "App crashes during video playback in mathematics module",
    reported_by: "John Smith",
    priority: "High",
    submission_date: "2024-01-15",
    last_updated: "2024-01-20",
    resolution_status: "In Progress",
    assigned_to: "Technical Team"
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [reportId])

  return (
    <div className={`py-[8rem] lg:px-[10rem] px-[10px] ${isOpen ? "ml-[240px]" : ""}`}>
      <div className="flex items-center gap-2 text-sm mb-6">
        <span className="text-gray-400">Home</span>
        <span className="text-gray-400">/</span>
        <span className="text-gray-400">Reports</span>
        <span className="text-gray-400">/</span>
        <span className="text-gray-900 font-medium">Report Details</span>
      </div>

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

      <div className="bg-[#EFF6F1] border rounded-lg mb-[10px] border-[#CAC4D0] h-[80px] p-[8px]">
        <div className="flex items-center gap-4">
          <div className="rounded-full text-center p-2 w-[40px] h-[40px] bg-[#F8F5ED] flex items-center justify-center">
            <span className="text-[16px] font-medium text-[#1D2026]">
              {reportData?.title?.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="">
            <p className="font-bold text-[16px] leading-[24px] tracking-wider text-[#1D2026]">
              {reportData?.title}
            </p>
            {reportData?.status ? (
              <button className="w-[64px] h-[20px] rounded-full font-medium text-[13px] leading-[15px] mt-[4px] pt-[2px] text-white bg-[#08AA58]">
                Active
              </button>
            ) : (
              <button className="w-[64px] h-[20px] rounded-full font-medium text-[13px] leading-[15px] mt-[4px] pt-[2px] text-white bg-[#aa0808]">
                Closed
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="text-center mb-4">
        <button className="font-medium text-[14px] leading-[20px] text-[#27AE60] cursor-pointer">
          Manage
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="border-b border-gray-200 pb-2 mb-4">
          <h3 className="text-lg font-bold text-gray-900">Report Details</h3>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="bg-white rounded-lg p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">Type:</p>
                <p className="font-medium">{reportData.type}</p>
              </div>
              <div>
                <p className="text-gray-600">Reported By:</p>
                <p className="font-medium">{reportData.reported_by}</p>
              </div>
              <div>
                <p className="text-gray-600">Submission Date:</p>
                <p className="font-medium">{reportData.submission_date}</p>
              </div>
              <div>
                <p className="text-gray-600">Last Updated:</p>
                <p className="font-medium">{reportData.last_updated}</p>
              </div>
              <div>
                <p className="text-gray-600">Resolution Status:</p>
                <p className="font-medium">{reportData.resolution_status}</p>
              </div>
              <div>
                <p className="text-gray-600">Priority:</p>
                <p className="font-medium">{reportData.priority}</p>
              </div>
              <div>
                <p className="text-gray-600">Assigned To:</p>
                <p className="font-medium">{reportData.assigned_to}</p>
              </div>
              <div className="col-span-2">
                <p className="text-gray-600">Description:</p>
                <p className="font-medium">{reportData.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserReportDetails
