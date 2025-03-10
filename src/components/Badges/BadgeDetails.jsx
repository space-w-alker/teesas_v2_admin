import React, { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { TailSpin } from "react-loader-spinner"
import badgeIcon from "../../assets/images/Banner-icon.png";


const BadgeDetails = ({ isOpen }) => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const badgeId = searchParams.get('id')
  const [badgeData, setBadgeData] = useState({
    id: 1,
    title: "Achievement Master",
    status: true,
    type: "Achievement",
    description: "Awarded for completing 10 courses with distinction",
    criteria: "Complete 10 courses with 90% or higher score",
    creation_date: "2024-01-15",
    last_awarded: "2024-01-20",
    award_status: "Active",
    times_awarded: "234",
    image_url: "/badges/achievement-master.png"
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [badgeId])

  return (
    <div className={`py-[8rem] lg:px-[10rem] px-[10px] ${isOpen ? "ml-[240px]" : ""}`}>
      <div className="flex items-center gap-2 text-sm mb-6">
        <span className="text-gray-400">Home</span>
        <span className="text-gray-400">/</span>
        <span className="text-gray-400">Badges</span>
        <span className="text-gray-400">/</span>
        <span className="text-gray-900 font-medium">Badge Details</span>
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

      <div className="bg-[#EFF6F1] border rounded-lg mb-[10px] border-[#CAC4D0] h-[80px] p-[8px]">
        <div className="flex items-center gap-4">
          <div className="rounded-full text-center p-2 w-[40px] h-[40px] bg-[#F8F5ED]">
            <img src={badgeIcon} alt={badgeData.title} className="w-full h-full object-contain" />
          </div>
          <div className="">
            <p className="font-bold text-[16px] leading-[24px] tracking-wider text-[#1D2026]">
              {badgeData?.title}
            </p>
            {badgeData?.status ? (
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
        <button className="font-medium text-[14px] leading-[20px] text-[#27AE60] cursor-pointer">
          Manage
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="border-b border-gray-200 pb-2 mb-4">
          <h3 className="text-lg font-bold text-gray-900">Badge Details</h3>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="bg-white rounded-lg p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">Type:</p>
                <p className="font-medium">{badgeData.type}</p>
              </div>
              <div>
                <p className="text-gray-600">Award Criteria:</p>
                <p className="font-medium">{badgeData.criteria}</p>
              </div>
              <div>
                <p className="text-gray-600">Creation Date:</p>
                <p className="font-medium">{badgeData.creation_date}</p>
              </div>
              <div>
                <p className="text-gray-600">Last Awarded:</p>
                <p className="font-medium">{badgeData.last_awarded}</p>
              </div>
              <div>
                <p className="text-gray-600">Award Status:</p>
                <p className="font-medium">{badgeData.award_status}</p>
              </div>
              <div>
                <p className="text-gray-600">Times Awarded:</p>
                <p className="font-medium">{badgeData.times_awarded}</p>
              </div>
              <div className="col-span-2">
                <p className="text-gray-600">Description:</p>
                <p className="font-medium">{badgeData.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BadgeDetails
