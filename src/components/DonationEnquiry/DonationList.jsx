import React from 'react'
import Headcomponent from '../common/Headcomponent'
import Custombutton from '../common/Custombutton'
import donationIcon from "../../assets/images/Banner-icon.png"

import { useNavigate } from 'react-router-dom'
import { FaArrowRight, FaArrowLeft } from "react-icons/fa"

const DonationList = () => {
  const navigate = useNavigate()

  const donations = [
    {
      donorName: "Michael Smith",
      donationType: "Financial Donation",
    },
    {
      donorName: "Sarah Johnson",
      donationType: "Item Donation",
    },
    {
      donorName: "David Wilson",
      donationType: "Financial Donation",
    },
    {
      donorName: "Emma Brown",
      donationType: "Educational Materials",
    },
    {
      donorName: "Robert Davis",
      donationType: "Medical Supplies",
    },
  ]

  return (
    <div className="bg-[#FFFFFF] p-4 mt-5 rounded-[18px]">
      <Headcomponent value="Donation List" border="Border" />
      <div className="">
        <ul className="border-b border-gray-200 pb-4">
          {donations.map((donation, index) => (
            <li key={index}>
              <div className="flex justify-between gap-4 items-center cursor-pointer" 
                   onClick={() => navigate('/donation-details')}>
                <div className="px-[18px] py-[10px] mt-5 flex items-center gap-[10px] pr-[15px]">
                  <div className="w-[32px] h-[32px] rounded-[16px] bg-[#F8F5ED] relative">
                    <img src={donationIcon} alt="" className="absolute top-[8px] left-[9px]" />
                  </div>
                  <div>
                    <div className="flex flex-col gap-1 px-[18px]">
                      <div className="flex items-center gap-2">
                        <p className="font-bold text-[14px] leading-[16px] text-[#171717]">
                          {donation.donorName}
                        </p>
                      </div>
                      <p className="text-[12px] text-blue-400">
                        {donation.donationType}
                      </p>
                    </div>
                  </div>
                </div>
            
              </div>
            </li>
          ))}
        </ul>
        
        <div className="flex justify-between items-center mt-6">
          <Custombutton
            value="Previous"
            hidden="hidden"
            icon={<FaArrowLeft />}
            backgroundcolor="bg-[#F2F2F2]"
            textcolor="text-[#000000]"
            imagePosition="left"
            width="w-[115px]"
          />
          <div className="text-center">
            <span className="text-gray-600">Page 1 of 5</span>
          </div>
          <Custombutton
            value="Next"
            hidden="hidden"
            icon={<FaArrowRight />}
            backgroundcolor="bg-[#F2F2F2]"
            textcolor="text-[#000000]"
            imagePosition="right"
          />
        </div>
      </div>
    </div>
  )
}

export default DonationList
