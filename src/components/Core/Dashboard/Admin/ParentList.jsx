import React from 'react'
import Headcomponent from '../../../common/Headcomponent';
import Custombutton from '../../../common/Custombutton';
import bookopen from "../../../../assets/images/bookopen.png";
import sharp from "../../../../assets/images/sharp.png";
import { useNavigate } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";

const ParentList = () => {
  const Navigate=useNavigate();
    const data = [
        {

          firstname: "James ",
          lastname: "Omokewe",
        },
        {
       
          firstname: "James ",
          lastname: "Omokewe",
        },
        {
         
          firstname: "James ",
          lastname: "Omokewe",
        },
        {
        
          firstname: "James ",
          lastname: "Omokewe",
        },
        {
        
          firstname: "James ",
          lastname: "Omokewe",
        },
      ];
  return (
    <div className="bg-[#FFFFFF] p-4 mt-5 rounded-[18px]">
    <Headcomponent value="Parent Report-Type" border="Border" />
    <div className="">
      <ul>
        {data.map((user) => (
          <li key={user.id}>
          <div className="flex justify-between gap-4 items-center cursor-pointer" onClick={()=>Navigate('/ParentReportTypeDetails')}>
            <div className="px-[18px] py-[10px] mt-5 flex  items-center gap-[10px] pr-[15px]">
              <div className="w-[32px] h-[32px] rounded-[16px] bg-[#F8F5ED] relative">
                <img src={bookopen} alt="" className=" absolute top-[8px] left-[9px]" />
              </div>
              <div>
              <div className="flex items-center gap-3 px-[18px]">
                {/* <div>
                  <img src={item.icon1} alt="Icon 1" />
                </div> */}
                <div className="flex items-center  gap-2">
                  <p className=" font-bold text-[14px] leading-[16px] text-[#171717] ">{user.firstname}</p>
                  <p className=" font-bold text-[14px] leading-[16px] text-[#171717]">{user.lastname}</p>
                </div>
              </div>
              </div>
            </div>
         
           
              <div>
                <Custombutton
                  value="status"
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

export default ParentList
