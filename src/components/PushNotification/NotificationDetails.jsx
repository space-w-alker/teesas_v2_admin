import React, { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { TailSpin } from "react-loader-spinner"
import badgeIcon from "../../assets/images/Banner-icon.png";

const NotificationDetails = ({ isOpen }) => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const notificationId = searchParams.get('id')

  const [notificationData, setNotificationData] = useState({
    id: 1,
    title: "System Update Notification",
    status: true,
    type: "System Update",
    message: "Important system update scheduled for maintenance",
    target_audience: "All Users",
    scheduled_date: "2024-01-15",
    sent_date: "2024-01-20",
    delivery_status: "Delivered",
    read_count: "1,234"
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    // Fetch notification details using notificationId
    // API call would go here
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [notificationId])

  return (
    <div className={`py-[8rem] lg:px-[10rem] px-[10px] ${isOpen ? "ml-[240px]" : ""}`}>
      <div className="flex items-center gap-2 text-sm mb-6">
        <span className="text-gray-400">Home</span>
        <span className="text-gray-400">/</span>
        <span className="text-gray-400">Notifications</span>
        <span className="text-gray-400">/</span>
        <span className="text-gray-900 font-medium">Notification Details</span>
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
            <img src={badgeIcon} alt="badge" className="w-[20px] h-[20px] object-contain" />
          </div>
          <div className="">
            <p className="font-bold text-[16px] leading-[24px] tracking-wider text-[#1D2026]">
              {notificationData?.title}
            </p>
            {notificationData?.status ? (
              <button className="w-[64px] h-[20px] rounded-full font-medium text-[13px] leading-[15px] mt-[4px] pt-[2px] text-white bg-[#08AA58]">
                Sent
              </button>
            ) : (
              <button className="w-[64px] h-[20px] rounded-full font-medium text-[13px] leading-[15px] mt-[4px] pt-[2px] text-white bg-[#aa0808]">
                Pending
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
          <h3 className="text-lg font-bold text-gray-900">Notification Details</h3>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="bg-white rounded-lg p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">Type:</p>
                <p className="font-medium">{notificationData.type}</p>
              </div>
              <div>
                <p className="text-gray-600">Target Audience:</p>
                <p className="font-medium">{notificationData.target_audience}</p>
              </div>
              <div>
                <p className="text-gray-600">Scheduled Date:</p>
                <p className="font-medium">{notificationData.scheduled_date}</p>
              </div>
              <div>
                <p className="text-gray-600">Sent Date:</p>
                <p className="font-medium">{notificationData.sent_date}</p>
              </div>
              <div>
                <p className="text-gray-600">Delivery Status:</p>
                <p className="font-medium">{notificationData.delivery_status}</p>
              </div>
              <div>
                <p className="text-gray-600">Read Count:</p>
                <p className="font-medium">{notificationData.read_count}</p>
              </div>
              <div className="col-span-2">
                <p className="text-gray-600">Message:</p>
                <p className="font-medium">{notificationData.message}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotificationDetails
