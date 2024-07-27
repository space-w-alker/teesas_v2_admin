import React from "react";
import live from "../../../assets/images/live.png";
import liveimage from "../../../assets/images/liveimage.png";
import UserCard from "../../../components/common/UserCard";
import TicketList from "../../../components/Core/Dashboard/Admin/TicketList";
import { FaChevronLeft } from "react-icons/fa";
const SupportTicket = ({ isOpen }) => {
  return (
    <div
      className={`py-[7rem] lg:px-[5rem]  flex flex-col gap-2 px-[10px] ${isOpen ? "lg:ml-[260px]" : ""}`}>
       <div className='flex justify-start  items-center lg:gap-3'>
        <FaChevronLeft />
        <div>
          <div className=' font-normal text-[14px] lg:text-[16px] leading-[20px] text-[#B6B6B6]'>Home / <span className='text-black font-medium'>Support Ticket</span></div>
        </div>
      </div>
      <h2 className=" mt-5 font-bold text-[22px]  leading-[28px] text-[#2C2E32] ">
        Support Ticket
      </h2>
      <div className="mt-5">
        <UserCard
          label="Total Support Ticket"
          height="h-[111px]"
          backgroundcolor="bg-[#FFFFFF]"
          value="10"
          imgbg={live}
          imglogo={liveimage}
        />
        <div className=" lg:grid lg:grid-cols-3 md:grid md:grid-cols-2 mt-5 gap-4">
        <UserCard
          label="Total Resolved"
          height="h-[90px]"
          backgroundcolor="bg-[#EEFFEE]"
          value="10"
        />
        <UserCard
          label="Total Pending"
          height="h-[90px]"
          backgroundcolor="bg-[#FFF2DA]"
          value="18"
        />
        <UserCard
          label="Total Delayed"
          height="h-[90px]"
          backgroundcolor="bg-[#FFE1E2]"
          value="45"
        />
        </div>
      </div>
      <TicketList/>
    </div>
  );
};

export default SupportTicket;
