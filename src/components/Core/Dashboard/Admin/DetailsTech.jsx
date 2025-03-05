import React,{useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from 'react-router-dom';
import { deleteTeacherAsync } from "../../../../apis/slices/teacherSlice";

const DetailsTech = (adminData) => {
  const dispatch = useDispatch();
  const Navigate =useNavigate();
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("authToken");
  return (
    <div>
      <div>
        <div className=" rounded-[24px] py-[20px] px-[16px] bg-[#FFFFFF] mt-4 ">
          <div className="Border  flex items-center justify-between">
            <h2 className=" font-medium text-[18px]  leading-[20px] text-[#2C2E32] pb-[20px]">
              Details
            </h2>
            <button
              className="text-[14px] leading-[20px] text-center font-bold  w-[130px] h-[30px] rounded-lg py-[5px] px-[8px] bg-red-500 text-white"
              onClick={() => {
                setLoading(true);
                deleteTeacherAsync({
                  dispatch: dispatch,
                  id: adminData?.adminData?.id,
                  token: token,
                  callbackFn: (res) => {
                      
                    if (res?.status === 200) {
                      Navigate("/teacherlistmanagement");
                      setLoading(false);
                    } else {
                      alert(res?.message);
                      setLoading(false);
                    }
                  },
                });
                
              }}
            >
              Delete Teacher
            </button>
          </div>
          <div className="bg-[#F2F2F2] p-[16px] rounded-[16px] mt-3">
            <div className="bg-[#F2F2F2] p-[16px] rounded-[16px] mt-3">
              <div className="flex justify-between max-w-[800px]">
                <div className="w-1/2">
                  <div className="flex flex-col mb-4">
                    <p className="font-normal text-[12px] lg:text-[14px] leading-[18px] text-[#1F1F1FB2]">
                      Email
                    </p>
                    <p className="text-[13px] lg:text-[16px] leading-[20px] font-normal text-[#222222E5]">
                      {adminData?.adminData?.email}
                    </p>
                  </div>
                  <div className="flex flex-col mb-4">
                    <p className="font-normal text-[12px] lg:text-[14px] leading-[18px] text-[#1F1F1FB2]">
                      Whatsapp Number
                    </p>
                    <p className="text-[13px] lg:text-[16px] leading-[20px] font-normal text-[#222222E5]">
                      {adminData?.adminData?.phone_number}
                    </p>
                  </div>

                  <div className="flex flex-col mb-4">
                    <p className="font-normal text-[12px] lg:text-[14px] leading-[18px] text-[#1F1F1FB2]">
                      Registration Date
                    </p>
                    <p className="text-[13px] lg:text-[16px] leading-[20px] font-normal text-[#222222E5]">
                      {adminData?.adminData?.created_at}
                    </p>
                  </div>
                  {/* <div className="flex flex-col mb-4">
                    <p className="font-normal text-[12px] lg:text-[14px] leading-[18px] text-[#1F1F1FB2]">
                      Senatorial District
                    </p>
                    <p className="text-[13px] lg:text-[16px] leading-[20px] font-normal text-[#222222E5]">
                      {adminData?.adminData?.academies?.sentorial}
                    </p>
                  </div>
                  <div className="flex flex-col mb-4">
                    <p className="font-normal text-[12px] lg:text-[14px] leading-[18px] text-[#1F1F1FB2]">
                      Academy Code
                    </p>
                    <p className="text-[13px] lg:text-[16px] leading-[20px] font-normal text-[#222222E5]">
                      {adminData?.adminData?.academies?.academy_code}
                    </p>
                  </div>
                  <div className="flex flex-col mb-4">
                    <p className="font-normal text-[12px] lg:text-[14px] leading-[18px] text-[#1F1F1FB2]">
                      Grade Teacher
                    </p>
                    <p className="text-[13px] lg:text-[16px] leading-[20px] font-normal text-[#222222E5]">
                      {adminData?.adminData?.courses}
                    </p>
                  </div> */}
                </div>
                <div className="max-w-[800px]">
                  <div className="flex flex-col mb-4">
                    <p className="font-normal text-[12px] lg:text-[14px] leading-[18px] text-[#1F1F1FB2]">
                      Mobile Number
                    </p>
                    <p className="text-[13px] lg:text-[16px] leading-[20px] font-normal text-[#222222E5]">
                      {adminData?.adminData?.phone_number}
                    </p>
                  </div>
                  <div className="flex flex-col mb-4">
                    <p className="font-normal text-[12px] lg:text-[14px] leading-[18px] text-[#1F1F1FB2]">
                      Address
                    </p>
                    <p className="text-[13px] lg:text-[16px] leading-[20px] font-normal text-[#222222E5]">
                      {adminData?.adminData?.address}
                    </p>
                  </div>

                  <div className="flex flex-col mb-4">
                    <p className="font-normal text-[12px] lg:text-[14px] leading-[18px] text-[#1F1F1FB2]">
                      Approved Date
                    </p>
                    <p className="text-[13px] lg:text-[16px] leading-[20px] font-normal text-[#222222E5]">
                      {adminData?.adminData?.created_at}
                    </p>
                  </div>
                  {/* <div className="flex flex-col mb-4">
                    <p className="font-normal text-[12px] lg:text-[14px] leading-[18px] text-[#1F1F1FB2]">
                    LGA
                    </p>
                    <p className="text-[13px] lg:text-[16px] leading-[20px] font-normal text-[#222222E5]">
                      {adminData?.adminData?.course_id}
                    </p>
                  </div>
                  <div className="flex flex-col mb-4">
                    <p className="font-normal text-[12px] lg:text-[14px] leading-[18px] text-[#1F1F1FB2]">
                    Academy Name
                    </p>
                    <p className="text-[13px] lg:text-[16px] leading-[20px] font-normal text-[#222222E5]">
                    {adminData?.adminData?.academies?.academy_name}
                    </p>
                  </div>
                  <div className="flex flex-col mb-4">
                    <p className="font-normal text-[12px] lg:text-[14px] leading-[18px] text-[#1F1F1FB2]">
                    Teacher’s ID
                    </p>
                    <p className="text-[13px] lg:text-[16px] leading-[20px] font-normal text-[#222222E5]">
                      {adminData?.adminData?.teacher_id}
                    </p>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsTech;
