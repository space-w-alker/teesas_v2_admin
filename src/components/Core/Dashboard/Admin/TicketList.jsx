import React, { useState } from "react";
import Headcomponent from "../../../common/Headcomponent";
import Custombutton from "../../../common/Custombutton";
import arrowleft from "../../../../assets/images/arrowleft.png";
import arrowright from "../../../../assets/images/arrowright.png";
import sharp from "../../../../assets/images/sharp.png";
import frame2 from "../../../../assets/images/Frame2.png";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Modal from "../../../common/Modal";

const TicketList = () => {
  const Navigate=useNavigate();
  const [isModalOpen, setIsModalOpen] =  useState(false);
  const handleModalClose = () => {
    setIsModalOpen(false);
  };
  const data = [
    
  ];
  return (
    <div className="">
        <div className="mt-2 ">
      <Headcomponent />
      </div>
      <div className="py-[2px]  rounded-[18px] bg-[#FFFFFF]  mt-3 ">
        <div className="user Border">
          <h2 className="text-[22px]  leading-6 text-[#2C2E32] font-medium">
            Admin Support Ticket
          </h2>
          <Custombutton
            value="Filter"
            img={frame2}
            backgroundcolor="bg-[#F2F2F2]"
            textcolor="text-[#000000]"
            imagePosition="right"
            onClick={() => setIsModalOpen(true)}
          />
        </div>
        <div className="">
          <ul>
            {data.map((user) => (
              <li key={user.id}>
                <div className="px-[18px] py-[10px]">
                  <h6 className=" font-light text-[12px] leading-[13px] text-[#767676] ">
                    {user.created_at}
                  </h6>
                </div>
                <div className="flex flex-col gap-2 " onClick={()=>{Navigate('/supportTicketDetails')}}>
                  <div className="flex  items-center gap-3 px-[18px]">
                    {/* <div>
                    <img src={item.icon1} alt="Icon 1" />
                  </div> */}
                    <div className="flex items-center  gap-2">
                      <p>{user.first_name}</p>
                      <p>{user.last_name}</p>
                    </div>
                  </div>
                  <div className="flex justify-between pr-[15px]">
                    <div>
                      <div className="pl-[20px]  flex flex-col gap-[10px]">
                        <p className=" font-normal text-[#555555] text-[12px] leading-[15px]">
                          grade
                        </p>
                        <div className="flex  items-center  py-[1px]  w-[96px] h-[16px]  bg-[#F2F2F2] ">
                          {/* <img
                                className="h-[11px]"
                                src={item.icon2}
                                alt="Icon 2"
                              /> */}
                          <p className=" font-bold text-[12px] leading-[15px] text-[#555555]"></p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <Custombutton
                        value="Status"
                        img={sharp}
                        backgroundcolor="bg-[#E9FDEE]"
                        textcolor="text-[#2760EA]"
                        imagePosition="left"
                      />
                    </div>
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
        {isModalOpen && (
          <Modal
            closeModal={handleModalClose}
            label="Filter"
            value1="Filter By Course"
            value2="Filter By Status"
            value3="Filter By Month"
          />
        )}
      </div>
    </div>
  );
};

export default TicketList;
