import React from "react";

const ParentDetails = () => {
  return (
    <div>
      <div className=" rounded-[24px] py-[20px] px-[16px] bg-[#FFFFFF] mt-4 ">
        <div className="Border ">
          <h2 className=" font-medium text-[18px]  leading-[20px] text-[#2C2E32] pb-[20px]">
            Details
          </h2>
        </div>
        <div className="bg-[#F2F2F2] p-[16px] rounded-[16px] mt-5">
          <div className="bg-[#FFFFFF] py-[10px] px-[8px] mt-2 rounded">
            <h6 className=" font-normal text-[14px] leading-[18px] text-[#1F1F1FB2]">Description</h6>
            <p className="font-normal text-[16px] leading-[20px] mt-2 text-[#222222E5]">
              Teesas provides high quality video tutorials from Africa’s best
              teachers, that explain foundational concepts with delivery in
              English and major local languages to deepen understanding. We
              believe that learning should be available to everyone who seeks it
              without any barrier. Our purpose centres on eliminating main
              barriers to tutor and student engagement.

             <p className="mt-4 font-normal text-[16px] leading-[20px]  text-[#222222E5]"> Teesas provides a platform where educators and learners engage seamlessly and
              efficiently, with the aim of facilitating a fun and effective
              learning experience via the deployment of technology and the
              adoption of local culture and dialects.</p>

              <p className="mt-4 font-normal text-[16px] leading-[20px]  text-[#222222E5]"> Our commitment to
              democratizing access to high quality education is unwavering!</p>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentDetails;
