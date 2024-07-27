import React from 'react'
import { FaChevronLeft } from "react-icons/fa";

const Headers = (value1,value2) => {
  return (
    <div className='flex justify-start items-center gap-3'>
          <FaChevronLeft />
          <div>
           <div className=' font-normal text-[16px] leading-[20px] text-[#B6B6B6]'>Home / Dashboard / <span className='text-black font-medium'>Sign In Lists</span></div>
          </div>
    </div>
  )
}

export default Headers