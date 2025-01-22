import React, { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { TailSpin } from "react-loader-spinner"
import donationIcon from "../../assets/images/Banner-icon.png"

const DonationDetails = ({isOpen}) => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const donationId = searchParams.get('id')
  
  const [donationData, setDonationData] = useState({
    id: 1,
    donor_name: "Michael Smith",
    type: "Financial Donation",
    description: "Monthly education support donation",
    amount: "$1,000",
    payment_method: "Credit Card",
    donation_date: "2024-01-15",
    last_donation: "2024-01-20",
    donation_status: "Active",
    frequency: "Monthly",
    total_donations: "12"
  })

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [donationId])

  return (
    <div className={`py-[8rem] lg:px-[10rem] px-[10px] ${isOpen ? "ml-[240px]" : ""}`}>
      <div className="flex items-center gap-2 text-sm mb-6">
        <span className="text-gray-400">Home</span>
        <span className="text-gray-400">/</span>
        <span className="text-gray-400">Donations</span>
        <span className="text-gray-400">/</span>
        <span className="text-gray-900 font-medium">Donation Details</span>
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

      <div className="bg-green-100 border rounded-lg mb-[10px] border-[#CAC4D0] h-[80px] p-[8px]">
        <div className="flex items-center gap-4">
          <div className="rounded-full text-center p-2 w-[40px] h-[40px] bg-[#F8F5ED]">
            <img src={donationIcon} alt={donationData.donor_name} className="w-full h-full object-contain" />
          </div>
          <div className="">
            <p className="font-bold text-[16px] leading-[24px] tracking-wider text-[#1D2026]">
              {donationData?.donor_name}
            </p>
            <span className="text-[13px] text-blue-400 mt-[4px]">
              {donationData.type}
            </span>
          </div>
        </div>
      </div>

      <div className="text-center mb-4">
        <button className="font-medium text-[14px] leading-[20px] text-green-600 cursor-pointer">
          Manage
        </button>
      </div>

      {/* Rest of the component remains the same */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="border-b border-gray-200 pb-2 mb-4">
          <h3 className="text-lg font-bold text-gray-900">Donation Details</h3>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="bg-white rounded-lg p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">Type:</p>
                <p className="font-medium">{donationData.type}</p>
              </div>
              <div>
                <p className="text-gray-600">Amount:</p>
                <p className="font-medium">{donationData.amount}</p>
              </div>
              <div>
                <p className="text-gray-600">Donation Date:</p>
                <p className="font-medium">{donationData.donation_date}</p>
              </div>
              <div>
                <p className="text-gray-600">Last Donation:</p>
                <p className="font-medium">{donationData.last_donation}</p>
              </div>
              <div>
                <p className="text-gray-600">Payment Method:</p>
                <p className="font-medium">{donationData.payment_method}</p>
              </div>
              <div>
                <p className="text-gray-600">Frequency:</p>
                <p className="font-medium">{donationData.frequency}</p>
              </div>
              <div>
                <p className="text-gray-600">Total Donations:</p>
                <p className="font-medium">{donationData.total_donations}</p>
              </div>
              <div className="col-span-2">
                <p className="text-gray-600">Description:</p>
                <p className="font-medium">{donationData.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DonationDetails
