import React from 'react'
import { FaChevronLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const Headers = ({ value1, value2 }) => {
  const navigate = useNavigate();

  return (
    <div className='flex justify-start items-center gap-3'>
      <FaChevronLeft
        className="cursor-pointer hover:text-[#27AE60] transition-colors"
        onClick={() => navigate(-1)}
      />
      <div>
        <div className='font-normal text-[16px] leading-[20px] text-[#B6B6B6]'>
          {value1} / <span className='text-black font-medium'>{value2}</span>
        </div>
      </div>
    </div>
  )
}

export default Headers
