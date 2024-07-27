import React from 'react'
import UserCard from '../../../components/common/UserCard'
import Custombutton from '../../../components/common/Custombutton'
import frame2 from "../../../assets/images/Frame2.png";
import arrow_upward from '../../../assets/images/arrow_upward.png'
import notes from "../../../assets/images/Group1000001600.png";
import Button from '../../../components/common/Button';
import BarChart from '../../../components/Core/Dashboard/Admin/Barcharts';
import { useState } from 'react';
import Modal from '../../../components/common/Modal';
 
 const  ConversionRates = ({ isOpen }) => {
    const [isModalOpen, setIsModalOpen] =   useState(false);
    const handleModalClose = () => {
        setIsModalOpen(false);
      };
   return (
     <div className={`py-[8rem] px-[10px] lg:py-[8rem] lg:px-[9rem]  ${isOpen ? "ml-[240px]" : ""}`}>
         <div className=' font-medium text-[18px] leading-[25px]'>
         Conversion Rates
          </div>
          <div className=' bg-white py-[16px] px-[20px] rounded-[12px] mt-6'>
          <div className='flex justify-end my-[10px]'>
            <div className=' flex pl-[7px] w-[95px] h-[30px] bg-white text-black border border-[#ECEDEE] rounded-[5px]'>
            <button className=' '>Monthly</button>
            <img src={ frame2}/>
            </div>
            </div>
            <div className=' md:grid md:grid-cols-2  lg:grid lg:grid-cols-3 gap-4 '>
                    <div>
                        <UserCard
                            label="Login"
                            height="h-[153px]"
                            backgroundcolor="bg-[#F2F2F2]"
                            value="23%"
                            value2="1.10% Since yesterday"
                            img={arrow_upward}
                            img2={notes}
                        />
                    </div>

                    <div>
                        <UserCard
                            label="Dashboard"
                            height="h-[153px]"
                            backgroundcolor="bg-[#F2F2F2]"
                            value="23%"
                            value2="1.10% Since yesterday"
                            img={arrow_upward}
                            img2={notes}
                        />
                    </div>

                    <div>
                        <UserCard
                            label="Video Lessons"
                            height="h-[153px]"
                            backgroundcolor="bg-[#F2F2F2]"
                            value="23%"
                            value2="1.10% Since yesterday"
                            img={arrow_upward}
                            img2={notes}
                        />
                    </div>
                </div> 
          </div>
          <div className="flex justify-end mt-5 ">
                <button className='text-[14px] text-[Orange] bg-[white]  w-[123px] rounded-[8px] h-[40px] border border-[Orange]  cursor-pointer leading-[20px] text-center'>
                Export CSV
                </button>
            </div>


            <div className='mt-[30px] bg-[#FFFFFF] border border-[#ECEDEE] rounded-[15px] p-4 boxShadow' >
            <div className='flex justify-between'>
                <div className=' font-medium text-[18px] leading-[25px] text-[#2C2E32]'>Performance</div>
                <div>
                <Custombutton
                            value="Filter"
                            img={frame2}
                            backgroundcolor="bg-[#F2F2F2]"
                            textcolor="text-[#000000]"
                            imagePosition="right"
                            onClick={() => setIsModalOpen(true)}
                        />
                </div>
            </div>
            <div>
                <BarChart/>
            </div>

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
   )
 }
 
 export default ConversionRates