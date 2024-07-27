import React, { useState } from "react";
import Headcomponent from "../../../common/Headcomponent";
import bookopen from "../../../../assets/images/bookopen.png";
import Custombutton from "../../../common/Custombutton";
import sharp from '../../../../assets/images/sharp.png'
import container from '../../../../assets/images/container.png'
import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import Modal2 from "../../../common/Modal2";



const LiveclasesList = () => {
  const Navigate=useNavigate();
  const [isModalOpen, setIsModalOpen] =  useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
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
    <div className="bg-[#FFFFFF] lg:p-4 mt-5 lg:pl-[8px] pl-[8px] rounded-[18px] pb-[20px]">
      <Headcomponent value="Live Classes List" border="Border" />
      <div className="">
        <ul>
          {data.map((user) => (
            <li key={user.id}>
            <div className=" md:flex lg:flex justify-between  items-center gap-4">
              <div className="lg:px-[18px] py-[10px] mt-5 flex  gap-[10px] pr-[15px]">
                <div className="w-[32px] h-[32px] rounded-[16px] bg-[#F8F5ED] relative">
                  <img src={bookopen} alt="" className=" absolute top-[8px] left-[9px]" />
                </div>
                <div>
                <h6 className=" font-bold text-[14px] leading-[24px] text-[#1D2026] cursor-pointer " onClick={()=>{Navigate('/LiveClassDetails')}}>
                  {user.label}
                </h6>
                <span className=" font-normal text-[12px] leading-[24px] text-[#0F62FE]">{user.date}</span>
                <span className=" font-normal text-[12px] leading-[24px] text-[#0F62FE]">{user.time}</span>
                <div className="flex items-center gap-3 px-[18px]">
                  {/* <div>
                    <img src={item.icon1} alt="Icon 1" />
                  </div> */}
                  <div className="flex items-center  gap-2  cursor-pointer">
                    <p className=" font-normal text-[12px] leading-[15px] text-[#000000] " >{user.firstname}</p>
                    <p className=" font-normal text-[12px] leading-[15px] text-[#000000]">{user.lastname}</p>
                  </div>
                </div>
                </div>
              </div>
           
             
                <div className="flex items-center">
                  <Custombutton
                    value="Visible"
                    img={sharp}
                    backgroundcolor="bg-[#E9FDEE]"
                    textcolor="text-[#2760EA]"
                    imagePosition="left"
                  />
                  <img src={container }  onClick={openModal}/>
                </div>

              </div>
            </li>
          ))}
        </ul>
      </div>
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

              <Modal2 isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default LiveclasesList;
