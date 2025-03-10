import React from 'react'
import bookopen from '../../../assets/images/bookopen'
import RoleDetails from '../../../components/Core/Dashboard/Admin/RoleDetails'

const AdminDetails = () => {
  return (
    <div>
      <div className="bg-[#EFF6F1] border rounded-lg mb-[8px] border-[#CAC4D0] h-[80px] p-[21px]">
        <div className="flex items-center gap-4">
          <div className="w-[43px] h-[38px] rounded-full bg-[#FFFFFF] relative">
            <img
              src={bookopen}
              alt=""
              className=" absolute top-[13px] left-[9px]"
            />
          </div>
          <div className="">
            <p className=" font-bold text-[16px] leading-[24px]  tracking-wider text-[#1D2026]">
              Admin
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        {/*<button className=" font-medium text-[14px] leading-[20px] text-[#27AE60] text-center">Manage</button>*/}
      </div>
      <RoleDetails />
    </div>
  )
}

export default AdminDetails
