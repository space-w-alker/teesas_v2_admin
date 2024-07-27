import React from 'react'
import Headcomponent from '../../../common/Headcomponent'
import Custombutton from '../../../common/Custombutton'
import check from "../../../../assets/images/check.png";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { Navigate, useNavigate } from 'react-router-dom';


const TeacherList = () => {
  const Navigate= useNavigate();
    const data=[
        {

        }
    ]
  return (
    <div className="py-[2px] px-[20px]  rounded-[18px] bg-[#FFFFFF]  mt-3 ">
    <div className="Border">
       <Headcomponent value={"Teacher List"}/>
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
            <div className="flex flex-col gap-2  cursor-pointer"  onClick={() => Navigate('/TestDetails')}>
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
                            <p className=" font-bold text-[12px] leading-[15px] text-[#555555]">
                             
                            </p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <Custombutton value="Status"
                          img={check}
                          backgroundcolor="bg-[#ede1d5]"
                          textcolor="text-[#EA8527]"
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
  </div>
  )
}

export default TeacherList
