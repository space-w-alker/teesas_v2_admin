import React from 'react'
import BannerComponent from '../Core/Dashboard/Admin/BannerComponent'

import { FaChevronLeft } from "react-icons/fa"
import { useSearchParams } from 'react-router-dom'
import banner from '../../assets/images/Banner-icon.png'

const BannerDetails = ({isOpen}) => {
    const [searchParams] = useSearchParams()
  const bannerId = searchParams.get('id')
  return (
    <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""}`}>
      <div className='flex justify-start items-center lg:gap-3'>
        <FaChevronLeft />
        <div>
          <div className='font-normal text-[14px] lg:text-[16px] leading-[20px] text-[#B6B6B6]'>
            Home / Banners /<span className='text-black font-medium'>Banner Details</span>
          </div>
        </div>
      </div>

      <div className="bg-[#E9FDEE] border rounded-lg mt-7 mb-[20px] border-[#CAC4D0] h-[68px] p-[8px]">
        <div className="flex items-center gap-4">
          <div className="w-[40px] h-[40px] rounded-full overflow-hidden">
            <img src={banner} className="w-full h-full object-cover" alt="Banner preview" />
          </div>
          <div className="">
            <p className="font-bold text-[16px] leading-[24px] tracking-wider text-[#1D2026]">
              Summer Sale Banner
            </p>
          
          </div>
        </div>
      </div>

      <BannerComponent/>
    </div>
  )
}

export default BannerDetails
