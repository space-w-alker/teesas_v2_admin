import React, { useState, useEffect } from "react";
import ToggleButton from "../../../components/common/ToggleButton";
import { FaChevronLeft } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  getRoleDetailsAsync,
  listPermissionsAsync,
  updateRoleAsync,
  addRoleAsync,
} from "../../../apis/slices/rolesSlice";
import { TailSpin } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

const AddAdminRole = ({ isOpen }) => {
  const token = localStorage.getItem("authToken");
  const dispatch = useDispatch();
  const [adminData, setAdminData] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [roleName, setRoleName] = useState("");
  const [roleDescription, setRoleDescription] = useState("");
  const [errors, setErrors] = useState({
    roleName: "",
    roleDescription: ""
  });
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    if (id) {
      setIsEditMode(true);
      getRoleDetailsAsync({
        dispatch: dispatch,
        id: id,
        token: token,
        callbackFn: (res) => {
          const roleDetails = res?.data?.data;
          setAdminData(roleDetails?.admin_permissions);
          setRoleName(roleDetails?.name);
          setRoleDescription(roleDetails?.description);
          setLoading(false);
        },
      })();
    } else {
      setIsEditMode(false);
      listPermissionsAsync({
        dispatch: dispatch,
        token: token,
        callbackFn: (res) => {
          setAdminData(res?.data?.data);
          setLoading(false);
        },
      })();
    }
  }, [dispatch, token]);

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      roleName: "",
      roleDescription: ""
    };

    // Validate role name
    if (!roleName.trim()) {
      newErrors.roleName = "Role name is required";
      isValid = false;
    }

    // Validate role description
    if (!roleDescription.trim()) {
      newErrors.roleDescription = "Role description is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleRoleNameChange = (e) => {
    setRoleName(e.target.value);
    if (e.target.value.trim()) {
      setErrors(prev => ({ ...prev, roleName: "" }));
    }
  };

  const handleRoleDescriptionChange = (e) => {
    setRoleDescription(e.target.value);
    if (e.target.value.trim()) {
      setErrors(prev => ({ ...prev, roleDescription: "" }));
    }
  };

  const handleSave = () => {
    if (!validateForm()) {
      toast.error("Please fill all the required fields");
      return;
    }

    setLoading(true);
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    const action = isEditMode ? updateRoleAsync : addRoleAsync;
    const body = {
      name: roleName.trim(),
      description: roleDescription.trim(),
    };
    action({
      dispatch: dispatch,
      id: id,
      data: body,
      token: token,
      callbackFn: (res) => {
        if (res?.status === 200) {
          toast.success(
            isEditMode
              ? "Role updated successfully"
              : "Role added successfully"
          );
          setLoading(false);
          navigate(-1);
        } else {
          toast.error(res?.data?.message);
          setLoading(false);
        }
      },
    })();
  };

  return (
    <div
      className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "lg:ml-[260px]" : ""
        }`}
    >
      {loading && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 9999,
          }}
        >
          <TailSpin color="green" radius={5} />
        </div>
      )}
      <div className="flex justify-start items-center lg:gap-3">
        <FaChevronLeft
          onClick={() => navigate(-1)}
          className="cursor-pointer"
        />
        <div>
          <div className="font-normal text-[14px] lg:text-[16px] leading-[20px] text-[#B6B6B6]">
            Admin Role List /{" "}
            <span className="text-black font-medium"> Admin Role</span>
          </div>
        </div>
      </div>
      <div className="lg:flex gap-14">
        <div className="rounded-[24px] py-[20px] mt-5 px-[16px] bg-[#FFFFFF] lg:w-[80%]">
          <div className="Border">
            <h2 className="font-medium text-[18px] leading-[20px] pb-[10px] text-[#000000]">
              {isEditMode ? "Edit Admin Role" : "Add Admin Role"}
            </h2>
          </div>
          <div>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label className="font-medium text-[14px] leading-[20px] text-[#000000]">
                  Role Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={roleName}
                  onChange={handleRoleNameChange}
                  className={`border ${errors.roleName ? 'border-red-500' : 'border-[#D9D9D9]'} rounded-sm p-[8px]`}
                />
                {errors.roleName && (
                  <p className="text-red-500 text-xs mt-1">{errors.roleName}</p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-medium text-[14px] leading-[20px] text-[#000000]">
                  Role Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={roleDescription}
                  onChange={handleRoleDescriptionChange}
                  className={`border ${errors.roleDescription ? 'border-red-500' : 'border-[#D9D9D9]'} rounded-sm p-[8px]`}
                />
                {errors.roleDescription && (
                  <p className="text-red-500 text-xs mt-1">{errors.roleDescription}</p>
                )}
              </div>
              {adminData?.map((item, i) => (
                <div
                  key={i}
                  className="bg-[#F2F2F2] border border-[#D9D9D9] rounded-sm p-[8px]"
                >
                  <p className="font-normal text-[12px] leading-[20px] text-[#827F85]">
                    Permission Type
                  </p>
                  <h6 className="font-medium text-[16px] leading-[24px] text-[#201D23]">
                    {item?.adminPermissions?.permission_name}
                  </h6>
                  <div className="flex justify-end gap-2">
                    <p className="font-normal text-[14px] leadig-[19px] text-[#000000]">
                      {item?.status ? "Activated" : "Deactivated"}
                    </p>
                    <button
                      onClick={() => {
                        setLoading(true);
                        const body = {
                          role_id: item?.admin_role_id,
                          role_permission_id: item?.id,
                          permission_id: item?.adminPermissions?.id,
                        };
                        updateRoleAsync({
                          dispatch: dispatch,
                          id: item?.admin_role_id,
                          data: body,
                          token: token,
                          callbackFn: (res) => {
                            if (res?.data?.status === 200) {
                              const urlParams = new URLSearchParams(
                                window.location.search
                              );
                              const id = urlParams.get("id");
                              getRoleDetailsAsync({
                                dispatch: dispatch,
                                id: id,
                                token: token,
                                callbackFn: (res) => {
                                  setAdminData(
                                    res?.data?.data?.admin_permissions
                                  );
                                  setLoading(false);
                                },
                              })();
                            } else {
                              toast.error(res?.data?.message);
                              setLoading(false);
                            }
                          },
                        })();
                      }}
                      className={`toggle-btn ${item?.status ? "toggled" : "off"
                        }`}
                    >
                      <div className="thumb"></div>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="users bg-[#ffffff] lg:mt-5 mt-5 lg:w-[50%] rounded-lg h-[50%]">
          <h2 className="text-[18px] leading-[20px] pb-[10px] text-[#000000] font-medium">
            Summary
          </h2>
          <div className="bg-[FFF9FD] m-auto my-10">
            <button
              type="button"
              className="h-[32px] rounded-lg text-center w-[200px] text-white bg-[#27AE60]"
              onClick={handleSave}
            >
              {isEditMode ? "Update Role" : "Create Role"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAdminRole;
