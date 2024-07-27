import React from 'react'
import TestComponent from '../../../components/Core/Dashboard/Admin/TestComponent'
import { FaChevronLeft } from "react-icons/fa";

const TestDetails = ({isOpen}) => {
  return (
    <div className={`py-[7rem] lg:px-[5rem]  px-[10px] ${isOpen ? "xl:ml-[260px]" : ""}`}>

      <div className='flex justify-start  items-center lg:gap-3'>
        <FaChevronLeft />
        <div>
          <div className=' font-normal text-[14px] lg:text-[16px] leading-[20px] text-[#B6B6B6]'>Home / Practice /<span className='text-black font-medium'>Test Details</span></div>
        </div>
      </div>
    <div className="bg-[#FFF9ED] border rounded-lg mt-7  mb-[20px] border-[#CAC4D0] h-[68px] p-[8px]">
      <div className="flex items-center gap-4">
        <div>
          {/* <img src={letter} className="w-[40px] h-[40px]" /> */}
        </div>
        <div className="">
          <p className=" font-bold text-[16px] leading-[24px]  tracking-wider text-[#1D2026]">
            James Omokewe
          </p>
          <button className="w-[64px] h-[21px] rounded-full font-medium text-[13px] leading-[15px] mt-[4px] text-white bg-[#08AA58]">
            Active
          </button>
        </div>
      </div>
    </div>
    <div>
       {/* <p className=' text-[14px] leading-[20px] text-center text-[#F2994A] cursor-pointer'>Manage</p>*/}
    </div>

    <TestComponent/>

    </div>
  )
}

export default TestDetails
