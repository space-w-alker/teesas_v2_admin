import React, { useState } from 'react'
import UserCard from '../../../components/common/UserCard'
import Custombutton from '../../../components/common/Custombutton'
import frame2 from "../../../assets/images/Frame2.png";
import arrow_upward from '../../../assets/images/arrow_upward.png'
import notes from "../../../assets/images/Group1000001600.png";
import { FaChevronLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import Modal from '../../../components/common/Modal';

const DataAnalytics = ({ isOpen }) => {
    const [isModalOpen, setIsModalOpen] =  useState(false);

    const Navigaite=useNavigate();
    const handleModalClose = () => {
        setIsModalOpen(false);
      };
    return (
        <div   className={`py-[7rem] lg:px-[5rem]   px-[10px] ${isOpen ? "lg:ml-[260px]" : ""}`}>
         <div className='flex justify-start  items-center lg:gap-3'>
        <FaChevronLeft />
        <div>
          <div className=' font-normal text-[14px] lg:text-[16px] leading-[20px] text-[#B6B6B6]'>Home / <span className='text-black font-medium'>Data Analytics</span></div>
        </div>
      </div>
            <div>
                <h2 className=' text-[22px] leading-[28px] text-[#2C2E32] mt-4'>Data analytics</h2>
            </div>
            <div>
                <div className='flex justify-between my-[20px]'>
                    <div className=' font-medium text-[18px] leading-[25px]'>
                        User Stats
                    </div>
                    <div>
                        <Custombutton
                            value="Daily"
                            img={frame2}
                            backgroundcolor="bg-[#FFFFFF]"
                            textcolor="text-[#000000]"
                            imagePosition="right"
                            onClick={() => setIsModalOpen(true)}
                        />
                    </div>
                </div>
                <div className=' md:grid md:grid-cols-2 lg:grid lg:grid-cols-3 gap-4 '>
                    <div>
                        <UserCard
                            label="Total User"
                            height="h-[153px]"
                            backgroundcolor="bg-[#FFFFFF]"
                            value="5000"
                            value2="1.10% Since yesterday"
                            img={arrow_upward}
                            img2={notes}
                        />
                    </div>

                    <div>
                        <UserCard
                            label="Total Active Users"
                            height="h-[153px]"
                            backgroundcolor="bg-[#FFFFFF]"
                            value="5000"
                            value2="1.10% Since yesterday"
                            img={arrow_upward}
                            img2={notes}
                        />
                    </div>

                    <div>
                        <UserCard
                            label="Total Deactivated Users"
                            height="h-[153px]"
                            backgroundcolor="bg-[#FFFFFF]"
                            value="5000"
                            value2="1.10% Since yesterday"
                            img={arrow_upward}
                            img2={notes}
                        />
                    </div>
                </div>


                <div className='w-full mt-5 bg-white p-3 rounded-[5px]'>
                    <p className=' font-normal cursor-pointer text-[14px] leading-[18px] text-center ' onClick={()=>{Navigaite('/ViewAnalytics')}}>View Analytics/Report</p>
                </div>
            </div>

            <div className='mt-5'>
                <div className='flex justify-between my-[20px]'>
                    <div className=' font-medium text-[18px] leading-[25px]'>
                        Conversion Rates
                    </div>
                    <div>
                        <Custombutton
                            value="Filter"
                            img={frame2}
                            backgroundcolor="bg-[#FFFFFF]"
                            textcolor="text-[#000000]"
                            imagePosition="right"
                            onClick={() => setIsModalOpen(true)}
                        />
                    </div>
                </div>
                <div className=' md:grid md:grid-cols-2  lg:grid lg:grid-cols-3 gap-4 '>
                    <div>
                        <UserCard
                            label="Login"
                            height="h-[153px]"
                            backgroundcolor="bg-[#FFFFFF]"
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
                            backgroundcolor="bg-[#FFFFFF]"
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
                            backgroundcolor="bg-[#FFFFFF]"
                            value="23%"
                            value2="1.10% Since yesterday"
                            img={arrow_upward}
                            img2={notes}
                        />
                    </div>
                </div> 


                <div className='w-full mt-5 bg-white p-3 rounded-[5px]'>
                    <p className=' font-normal cursor-pointer text-[14px] leading-[18px] text-center'  onClick={()=>{Navigaite('/ConversionRates')}}>View Analytics/Report</p>
                </div>
            </div>

            <div className='mt-5'>
                <div className='flex justify-between my-[20px]'>
                    <div className=' font-medium text-[18px] leading-[25px]'>
                        Retention Rates
                    </div>
                    <div>
                        <Custombutton
                            value="Filter"
                            img={frame2}
                            backgroundcolor="bg-[#FFFFFF]"
                            textcolor="text-[#000000]"
                            imagePosition="right"
                            onClick={() => setIsModalOpen(true)}
                        />
                    </div>
                </div>
                <div className=' md:grid md:grid-cols-2  lg:grid lg:grid-cols-3 gap-4 '>
                    <div>
                        <UserCard
                            label="Login"
                            height="h-[153px]"
                            backgroundcolor="bg-[#FFFFFF]"
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
                            backgroundcolor="bg-[#FFFFFF]"
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
                            backgroundcolor="bg-[#FFFFFF]"
                            value="23%"
                            value2="1.10% Since yesterday"
                            img={arrow_upward}
                            img2={notes}
                        />
                    </div>
                </div>


                <div className='w-full mt-5 bg-white p-3 rounded-[5px]'>
                    <p className=' font-normal cursor-pointer text-[14px] leading-[18px] text-center'>View Analytics/Report</p>
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

export default DataAnalytics