import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { TailSpin } from "react-loader-spinner"

const SalesTeamDetails = ({isOpen}) => {
  const navigate = useNavigate()
  const [salesData, setSalesData] = useState({
    id: 1,
    name: "John Sales Team",
    status: true,
    email: "john@salesteam.com",
    phone: "+1234567890",
    whatsapp: "+1234567890",
    registration_date: "2024-01-15",
    address: "123 Sales Street, City",
    approved_date: "2024-01-20"
  })
  const [loading, setLoading] = useState(false)

  return (
    <div className={`py-[8rem] lg:px-[10rem] px-[10px] ${isOpen ? "ml-[240px]" : ""}`}>
      <div className="flex items-center gap-2 text-sm mb-6">
        <span className="text-gray-400">Home</span>
        <span className="text-gray-400">/</span>
        <span className="text-gray-400">Sales Team</span>
        <span className="text-gray-400">/</span>
        <span className="text-gray-900 font-medium">Team Details</span>
      </div>

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
      
      <div className="bg-[#FFF9ED] border rounded-lg mb-[10px] border-[#CAC4D0] h-[80px] p-[8px]">
        <div className="flex items-center gap-4">
          <div className="rounded-full text-center p-2 w-[40px] h-[40px] bg-[#F8F5ED]">
            {salesData?.name?.charAt(0).toUpperCase()}
          </div>
          <div className="">
            <p className="font-bold text-[16px] leading-[24px] tracking-wider text-[#1D2026]">
              {salesData?.name}
            </p>
            {salesData?.status ? (
              <button className="w-[64px] h-[20px] rounded-full font-medium text-[13px] leading-[15px] mt-[4px] pt-[2px] text-white bg-[#08AA58]">
                Active
              </button>
            ) : (
              <button className="w-[64px] h-[20px] rounded-full font-medium text-[13px] leading-[15px] mt-[4px] pt-[2px] text-white bg-[#aa0808]">
                Inactive
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="text-center mb-4">
        <button className="font-medium text-[14px] leading-[20px] text-[#F2994A] cursor-pointer">
          Manage
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="border-b border-gray-200 pb-2 mb-4">
          <h3 className="text-lg font-bold text-gray-900">Registration Details</h3>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="bg-white rounded-lg p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">Email:</p>
                <p className="font-medium">{salesData.email}</p>
              </div>
              <div>
                <p className="text-gray-600">Phone Number:</p>
                <p className="font-medium">{salesData.phone}</p>
              </div>
              <div>
                <p className="text-gray-600">WhatsApp Number:</p>
                <p className="font-medium">{salesData.whatsapp}</p>
              </div>
              <div>
                <p className="text-gray-600">Registration Date:</p>
                <p className="font-medium">{salesData.registration_date}</p>
              </div>
              <div>
                <p className="text-gray-600">Address:</p>
                <p className="font-medium">{salesData.address}</p>
              </div>
              <div>
                <p className="text-gray-600">Approved Date:</p>
                <p className="font-medium">{salesData.approved_date}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SalesTeamDetails
