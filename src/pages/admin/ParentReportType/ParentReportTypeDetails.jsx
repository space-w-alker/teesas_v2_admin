import React from "react";
import tessas from "../../../assets/images/Tessas.png";
import ParentDetails from "../../../components/Core/Dashboard/Admin/ParentDetails";
import { FaChevronLeft } from "react-icons/fa";
const ParentReportTypeDetails = ({ isOpen }) => {
  return (
    <div
      className={`py-[7rem] lg:px-[5rem]  flex flex-col gap-2 px-[10px] ${isOpen ? "lg:ml-[260px]" : ""}`}>
       <div className='flex justify-start  items-center lg:gap-3'>
        <FaChevronLeft />
        <div>
          <div className=' font-normal text-[14px] lg:text-[16px] leading-[20px] text-[#B6B6B6]'>Home / <span className='text-black font-medium'>Parent Report-Type Details</span></div>
        </div>
      </div>
      <div className="bg-[#FFF9ED] mt-5 border rounded-lg mb-[8px] border-[#CAC4D0] h-[80px] p-[21px]">
        <div className="flex items-center gap-4">
          <div className="w-[43px] h-[38px] rounded-full bg-[#FFFFFF] relative">
            <img
              src={tessas}
              alt=""
              className=" absolute top-[13px] left-[9px]"
            />
          </div>
          <div className="">
            <p className=" font-bold text-[16px] leading-[24px]  tracking-wider text-[#1D2026]">
            Parent Report-Type
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
       {/* <button className=" font-medium text-[14px] leading-[20px] text-[#F2994A] text-center">Manage</button>*/}
      </div>
   <ParentDetails/>
    </div>
  );
};

export default ParentReportTypeDetails;
