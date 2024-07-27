import React from 'react'
import Custombutton from '../../../common/Custombutton';
import Headcomponent from '../../../common/Headcomponent';
import bookopen from "../../../../assets/images/bookopen.png";
import sharp from "../../../../assets/images/sharp.png";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";


const OneClassList = () => {
    const data = [
        {
          label: "Grade 4-Mathematics",
          date: "23rd March, 2023",
          time: "06:00pm",
          firstname: "James ",
          lastname: "Omokewe",
        },
        {
          label: "Grade 4-Mathematics",
          date: "23rd March, 2023",
          time: "06:00pm",
          firstname: "James ",
          lastname: "Omokewe",
        },
        {
          label: "Grade 4-Mathematics",
          date: "23rd March, 2023",
          time: "06:00pm",
          firstname: "James ",
          lastname: "Omokewe",
        },
        {
          label: "Grade 4-Mathematics",
          date: "23rd March, 2023",
          time: "06:00pm",
          firstname: "James ",
          lastname: "Omokewe",
        },
        {
          label: "Grade 4-Mathematics",
          date: "23rd March, 2023",
          time: "06:00pm",
          firstname: "James ",
          lastname: "Omokewe",
        },
      ];
  return (
<div className="bg-[#FFFFFF] p-4 mt-5 rounded-[18px]">
      <Headcomponent value="Live Classes List" border="Border" />
      <div className="">
        <ul>
          {data.map((user) => (
            <li key={user.id}>
            <div className="lg:flex justify-between gap-4">
              <div className="lg:px-[18px] py-[10px] mt-5 flex  gap-[10px] pr-[15px]">
                <div className="w-[32px] h-[32px] rounded-[16px] bg-[#F8F5ED] relative">
                  <img src={bookopen} alt="" className=" absolute top-[8px] left-[9px]" />
                </div>
                <div>
                <h6 className=" font-bold text-[14px] leading-[24px] text-[#1D2026] ">
                  {user.label}
                </h6>
                <span className=" font-normal text-[12px] leading-[24px] text-[#0F62FE]">{user.date}</span>
                <span className=" font-normal text-[12px] leading-[24px] text-[#0F62FE]">{user.time}</span>
                <div className="flex items-center gap-3 px-[18px]">
                  {/* <div>
                    <img src={item.icon1} alt="Icon 1" />
                  </div> */}
                  <div className="flex items-center  gap-2">
                    <p className=" font-normal text-[12px] leading-[15px] text-[#000000] ">{user.firstname}</p>
                    <p className=" font-normal text-[12px] leading-[15px] text-[#000000]">{user.lastname}</p>
                  </div>
                </div>
                </div>
              </div>
           
             
                <div className='mt-4'>
                  <Custombutton
                    value="Visible"
                    img={sharp}
                    backgroundcolor="bg-[#E9FDEE]"
                    textcolor="text-[#2760EA]"
                    imagePosition="left"
                  />
                </div>

              </div>
            </li>
          ))}
        </ul>
        <div className="user">
    
    <Custombutton
        value="Previous"
        hidden="hidden"
        icon={<FaArrowLeft />}
        backgroundcolor="bg-[#F2F2F2]"
        textcolor="text-[#000000]"
        imagePosition="left"
        width="w-[115px]"
      />
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

export default OneClassList
