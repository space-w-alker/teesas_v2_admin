import React from "react";

const DetailsTech = (adminData) => {
  return (
    <div>
      <div>
        <div className=" rounded-[24px] py-[20px] px-[16px] bg-[#FFFFFF] mt-4 ">
          <div className="Border ">
            <h2 className=" font-medium text-[18px]  leading-[20px] text-[#2C2E32] pb-[20px]">
              Details
            </h2>
          </div>
          <div className="bg-[#F2F2F2] p-[16px] rounded-[16px] mt-3">
            <div className="bg-[#F2F2F2] p-[16px] rounded-[16px] mt-3">
              <div className="flex justify-between max-w-[800px]">
                <div className="w-1/2">
                  <div className="flex flex-col mb-4">
                    <p className="font-normal text-[12px] lg:text-[14px] leading-[18px] text-[#1F1F1FB2]">
                      First Name
                    </p>
                    <p className="text-[13px] lg:text-[16px] leading-[20px] font-normal text-[#222222E5]">
                      {adminData?.adminData?.name}
                    </p>
                  </div>
                  <div className="flex flex-col mb-4">
                    <p className="font-normal text-[12px] lg:text-[14px] leading-[18px] text-[#1F1F1FB2]">
                      Date of Birth
                    </p>
                    <p className="text-[13px] lg:text-[16px] leading-[20px] font-normal text-[#222222E5]">
                      N/A
                    </p>
                  </div>

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
                  </div>
                </div>
                <div className="max-w-[800px]">
                  <div className="flex flex-col mb-4">
                    <p className="font-normal text-[12px] lg:text-[14px] leading-[18px] text-[#1F1F1FB2]">
                      Last Name
                    </p>
                    <p className="text-[13px] lg:text-[16px] leading-[20px] font-normal text-[#222222E5]">
                     N/A
                    </p>
                  </div>
                  <div className="flex flex-col mb-4">
                    <p className="font-normal text-[12px] lg:text-[14px] leading-[18px] text-[#1F1F1FB2]">
                      Gender
                    </p>
                    <p className="text-[13px] lg:text-[16px] leading-[20px] font-normal text-[#222222E5]">
                      N/A
                    </p>
                  </div>

                  <div className="flex flex-col mb-4">
                    <p className="font-normal text-[12px] lg:text-[14px] leading-[18px] text-[#1F1F1FB2]">
                      Phone Number
                    </p>
                    <p className="text-[13px] lg:text-[16px] leading-[20px] font-normal text-[#222222E5]">
                      {adminData?.adminData?.mobile}
                    </p>
                  </div>
                  <div className="flex flex-col mb-4">
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
                  </div>
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
