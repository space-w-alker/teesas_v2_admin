import React from 'react'

const RoleDetails = () => {
    const data=[
        {
            label:"Create_Institution",
            text:"You can create and add new institution as an admin"
        },
        {
            label:"Create_Institution",
            text:"You can create and add new institution as an admin"
        },    {
            label:"Create_Institution",
            text:"You can create and add new institution as an admin"
        },    {
            label:"Create_Institution",
            text:"You can create and add new institution as an admin"
        },    {
            label:"Create_Institution",
            text:"You can create and add new institution as an admin"
        },    {
            label:"Create_Institution",
            text:"You can create and add new institution as an admin"
        },
    ]
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
        {
            data.map((item)=>(
                <div className=" bg-[#F2F2F2] border border-[#D9D9D9] rounded-sm p-[8px] Border">
                <h6 className=" font-medium text-[16px] leading-[24px] text-[#201D23]">
                  {item.value}
                </h6>
                <p className=" font-normal text-[12px] leading-[20px] text-[#827F85]">
                 {item.text}
                </p>
              </div>
            ))
        }
        
        </div>
      </div>
    </div>
  </div>
  )
}

export default RoleDetails
