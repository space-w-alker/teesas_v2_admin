import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { TailSpin } from "react-loader-spinner"
import { FaChevronLeft } from 'react-icons/fa'

const SalesTeamDetails = ({ isOpen }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const teamMemberDetails = location.state || {}
  console.log('teamMemberDetails', teamMemberDetails)

  return (
    <div className={`py-[8rem] lg:px-[10rem] px-[10px] ${isOpen ? "ml-[240px]" : ""}`}>

      <div className="flex items-center gap-2 text-sm mb-6">
        <FaChevronLeft onClick={() => navigate('/sales-team')} className="cursor-pointer" />

        <span className="text-gray-400">Home</span>
        <span className="text-gray-400">/</span>
        <span className="text-gray-400">Sales Team</span>
        <span className="text-gray-400">/</span>
        <span className="text-gray-900 font-medium">Team Details</span>
      </div>

      {teamMemberDetails.loading && (
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

      <div className="bg-[#EFF6F1] border rounded-lg mb-[10px] border-[#CAC4D0] h-[80px] p-[8px]">
        <div className="flex items-center gap-4">
          <div className="rounded-full text-center p-2 w-[40px] h-[40px] bg-[#F8F5ED]">
            {teamMemberDetails?.name?.charAt(0).toUpperCase()}
          </div>
          <div className="">
            <p className="font-bold text-[16px] leading-[24px] tracking-wider text-[#1D2026]">
              {teamMemberDetails?.name}
            </p>
            {teamMemberDetails?.status == "active" ? (
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
        {/* <button className="font-medium text-[14px] leading-[20px] text-[#27AE60] cursor-pointer">
          Manage
        </button> */}
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
                <p className="font-medium">{teamMemberDetails?.email}</p>
              </div>
              <div>
                <p className="text-gray-600">Phone Number:</p>
                <p className="font-medium">{teamMemberDetails?.phone}</p>
              </div>
              <div>
                <p className="text-gray-600">WhatsApp Number:</p>
                <p className="font-medium">{teamMemberDetails?.whatsapp}</p>
              </div>
              <div>
                <p className="text-gray-600">Registration Date:</p>
                <p className="font-medium">{teamMemberDetails?.registration_date}</p>
              </div>
              <div>
                <p className="text-gray-600">Address:</p>
                <p className="font-medium">{teamMemberDetails?.address}</p>
              </div>
              <div>
                <p className="text-gray-600">Approved Date:</p>
                <p className="font-medium">{teamMemberDetails?.approved_date}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SalesTeamDetails
