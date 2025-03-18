import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import bookopen from '../../../assets/images/bookopen.png';
import RoleDetails from '../../../components/Core/Dashboard/Admin/RoleDetails';
import { getRoleDetailsAsync, roleDetails } from '../../../apis/slices/rolesSlice';
import { TailSpin } from "react-loader-spinner";
import { FaChevronLeft } from 'react-icons/fa';

const AdminDetails = ({ isOpen }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const roleDetail = useSelector(roleDetails);
  console.log(roleDetail);
  useEffect(() => {
    if (id) {
      dispatch(getRoleDetailsAsync({ dispatch, id, token: '' }));
    }
  }, [dispatch, id]);

  if (!roleDetail) {
    return <TailSpin color="orange" radius={5} />;
  }

  return (
    <div
      className={`py-[7rem] lg:px-[5rem] flex flex-col gap-2 px-[10px] ${isOpen ? "lg:ml-[260px]" : ""}`}>
      <div className='flex justify-start items-center lg:gap-3'>
        <FaChevronLeft />
        <div>
          <div className='font-normal text-[14px] lg:text-[16px] leading-[20px] text-[#B6B6B6]'>Home / <span className='text-black font-medium'> Admin Role Details</span></div>
        </div>
      </div>
      <h2 className="font-bold mt-5 text-[22px] leading-[28px] text-[#2C2E32]">
        Admin Role Details
      </h2>
      <div className="flex justify-center">
        <button className=" font-medium text-[14px] leading-[20px] text-[#27AE60] text-center">Manage</button>
      </div>
      <RoleDetails roleDetail={roleDetail} />
    </div>
  );
};

export default AdminDetails;
