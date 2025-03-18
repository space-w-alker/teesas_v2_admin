import React from "react";
import tessas from "../../../assets/images/new_admin.png";
import arrowleft from "../../../assets/images/arrowleft.png";
import arrowright from "../../../assets/images/arrowright.png";
import Headcomponent from "../../../components/common/Headcomponent";
import Custombutton from "../../../components/common/Custombutton";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'

const AdminRoleList = (adminData) => {
  const Navigate = useNavigate();
  return (
    <div className="bg-[#FFFFFF] p-4 mt-5 rounded-[18px]">
      {/*<Headcomponent value="Admin Role List" border="Border" />*/}
      <div className={`flex justify-between items-center Border relative mt-3`}>
        <div>
          <h2 className="font-medium text-[16px] lg:text-[18px] leading-[25px] text-[#2C2E32]">
            Admin Role List
          </h2>
        </div>
      </div>
      <div className="">
        <ul>
          {adminData?.adminData?.map((user) => (
            <li key={user.id} className=" cursor-pointer" onClick={() => Navigate(`/AdminDetails/${user?.id}`)}>
              <div className="flex gap-2 items-center">
                <div className="px-[18px]  mt-5 flex  items-center gap-[2px] ">
                  <img src={tessas} alt="" className="w-[32px] h-[32px] mr-2" />
                  <div>
                    <div className="flex items-center gap-3">
                      {/* <div>
                  <img src={item.icon1} alt="Icon 1" />
                </div> */}
                      <div className="">
                        <p className=" font-bold text-[14px] leading-[16px] text-[#171717] cursor-pointer">
                          {user.name}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
        {/*  <div className="user">
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
        </div>*/}
      </div>
    </div>
  );
};

export default AdminRoleList;
