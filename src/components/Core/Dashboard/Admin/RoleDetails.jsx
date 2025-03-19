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

  // Group permissions by module for better display
  const groupedPermissions = roleDetail?.data?.permissions?.reduce((acc, permission) => {
    const module = permission?.permission?.module;
    if (!acc[module]) {
      acc[module] = [];
    }
    acc[module].push(permission.permission);
    return acc;
  }, {});

  return (
    <div className="rounded-[24px] py-[20px] px-[16px] bg-[#FFFFFF] mt-4">
      <div className="Border">
        <h2 className="font-medium text-[18px] leading-[20px] text-[#2C2E32] pb-[20px]">
          Role Details
        </h2>
      </div>
      <div className="bg-[#F2F2F2] p-[16px] rounded-[16px] mt-5">
        <div className="bg-[#FFFFFF] py-[10px] px-[8px] mt-2 rounded">
          {Object.entries(groupedPermissions || {}).map(([module, permissions]) => (
            <div key={module} className="mb-4">
              <h3 className="font-semibold text-[16px] capitalize mb-2">
                {module.replace(/_/g, ' ')}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {permissions.map((permission, index) => (
                  <div key={index} className="bg-[#F2F2F2] border border-[#D9D9D9] rounded-sm p-[8px] Border">
                    <h6 className="font-medium text-[16px] leading-[24px] text-[#201D23] capitalize">
                      {permission.action}
                    </h6>
                    <p className="font-normal text-[12px] leading-[20px] text-[#827F85]">
                      {permission.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoleDetails;
