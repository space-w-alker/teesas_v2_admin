import React, { useState, useEffect } from "react";
import UserCard from '../../../components/common/UserCard';
import AdminRoleList from './AdminRoleList';
import { useNavigate } from 'react-router-dom';
import { FaChevronLeft } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import { listRolesAsync, rolesList } from "../../../apis/slices/rolesSlice";

const AdminRole = ({ isOpen }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");
  const dispatch = useDispatch();
  const rolesData = useSelector(rolesList);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    dispatch(listRolesAsync({
      dispatch, page: 1, limit: 10,
      token: token,
      callbackFn: (res) => {
        setIsLoading(false);
        if (res?.error) {
          toast.error("Failed to fetch admin roles");
        }
      },
    }));
  }, [dispatch, token]);
  console.log(rolesData?.data);
  return (
    <div
      className={`py-[7rem] lg:px-[5rem] flex flex-col gap-2 px-[10px] ${isOpen ? "lg:ml-[260px]" : ""}`}>
      <div className='flex justify-start items-center lg:gap-3'>
        <FaChevronLeft />
        <div>
          <div className='font-normal text-[14px] lg:text-[16px] leading-[20px] text-[#B6B6B6]'>Home / <span className='text-black font-medium'> Admin Role</span></div>
        </div>
      </div>
      <h2 className="font-bold mt-5 text-[22px] leading-[28px] text-[#2C2E32]">
        Admin Role
      </h2>
      <div className="mt-5">
        <UserCard
          label="Total Admin Role"
          height="h-[111px]"
          backgroundcolor="bg-[#FFFFFF]"
          value={rolesData?.data?.pagination?.totalItems}
        />
      </div>
      <div className="flex justify-end mt-4">
        <button className="text-[14px] leading-[20px] text-center font-bold w-[160px] h-[40px] rounded-lg py-[7px] px-[12px] bg-[#27AE60] text-white"
          onClick={() => navigate('/Addadminrole')}
        >
          + Add Role
        </button>
      </div>
      <AdminRoleList adminData={rolesData?.data?.roles} />
    </div>
  );
}

export default AdminRole;
