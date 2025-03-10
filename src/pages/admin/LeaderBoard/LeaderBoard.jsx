import React from "react";
import { NavLink } from "react-router-dom";
import frame from "../../../assets/images/Frame2.png";
import search from "../../../assets/images/search.svg";
import LeaderBoardlist from "../../../components/Core/Dashboard/Admin/LeaderBoardlist";
import { FaChevronLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


const LeaderBoard = ({ isOpen }) => {
  const Navigate = useNavigate();

  return (
    <div
      className={`py-[7rem] lg:px-[5rem]  px-[10px] ${isOpen ? "xl:ml-[260px]" : ""}`}>
      <div className='flex justify-start  items-center lg:gap-3'>
        <FaChevronLeft onClick={() => Navigate(-1)} className="cursor-pointer" />
        <div>
          <div className=' font-normal text-[14px] lg:text-[16px] leading-[20px] text-[#B6B6B6]'>Home /<span className='text-black font-medium'> LeaderBoard</span></div>
        </div>
      </div>
      <div>
        <h2 className=" mt-6 font-bold text-[22px] leading-[28px] text-[#2C2E32]">
          Leaderboard
        </h2>
      </div>

      <LeaderBoardlist />
    </div>
  );
};

export default LeaderBoard;
