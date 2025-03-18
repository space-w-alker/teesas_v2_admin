import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getRoleDetailsAsync, roleDetails } from '../../../../apis/slices/rolesSlice';
import { TailSpin } from "react-loader-spinner";

const RoleDetails = ({ roleData }) => {
  const dispatch = useDispatch();
  const roleDetail = roleData || useSelector(roleDetails);
  const { id } = useParams();

  useEffect(() => {
    if (!roleData && id) {
      dispatch(getRoleDetailsAsync({ dispatch, id, token: '' }));
    }
  }, [dispatch, roleData, id]);

  if (!roleDetail) {
    return <TailSpin color="orange" radius={5} />;
  }
  return (
    <div className="rounded-[24px] py-[20px] px-[16px] bg-[#FFFFFF] mt-4">
      <div className="Border">
        <h2 className="font-medium text-[18px] leading-[20px] text-[#2C2E32] pb-[20px]">
          Role Details
        </h2>
      </div>
      <div className="bg-[#F2F2F2] p-[16px] rounded-[16px] mt-5">
        <div className="bg-[#FFFFFF] py-[10px] px-[8px] mt-2 rounded grid grid-cols-1 md:grid-cols-3 gap-4">
          {roleDetail?.data?.permissions?.length > 0 ? (
            roleDetail.data.permissions.map((permission, index) => (
              <div key={index} className="bg-[#F2F2F2] border border-[#D9D9D9] rounded-sm p-[8px] Border">
                <h6 className="font-medium text-[16px] leading-[24px] text-[#201D23]">
                  {permission?.permission?.name}
                </h6>
                <p className="font-normal text-[12px] leading-[20px] text-[#827F85]">
                  {permission?.permission?.description}
                </p>
              </div>
            ))
          ) : (
            <p className="font-normal text-[14px] leading-[20px] text-[#827F85]">
              No permissions yet
            </p>
          )}
        </div>
      </div>
    </div >
  );
};

export default RoleDetails;
