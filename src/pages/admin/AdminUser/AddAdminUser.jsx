import React, { useState, useEffect } from "react";
import countrycode from "../../../components/data/Countrycode.json";
import { FaChevronLeft } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addAdminUserAsync, getAdminRolesAsync } from "../../../apis/slices/adminSlice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TailSpin } from "react-loader-spinner";
import { toast } from "react-toastify";
import Validation from "../../../components/validator/adminUserValidator";
import SuccessModal from "../../../components/common/SuccessModal";
import { useNavigate } from "react-router-dom";

const AddAdminUser = ({ isOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");
  const [errors, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [adminRoles, setAdminRoles] = useState([]);
  const [formData, setformData] = useState({
    First_Name: "",
    Last_Name: "",
    Middle_Name: "",
    Admin_Role: "",
    Gender: "",
    Date_of_Birth: "",
    Phone_Contact: "",
    Email: "",
    Address: "",
  });

  useEffect(() => {

    fetchAdminRoles();
  }, []);

  const fetchAdminRoles = () => {
    getAdminRolesAsync({
      dispatch: dispatch,
      token: token,
      callbackFn: (res) => {
        if (res?.data?.status === 200) {
          setAdminRoles(res.data.data || []);
        } else {
          toast.error("Failed to fetch admin roles");
        }
      }
    });
  };

  const onchangeHandler = (event) => {
    const { name, value } = event.target;
    setformData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const submitContactForm = () => {
    const errorData = Validation(formData);
    setError(errorData);
    if (Object.keys(errorData).length < 1) {
      setLoading(true);

      const requestData = {
        firstName: formData?.First_Name,
        middleName: formData?.Middle_Name,
        lastName: formData?.Last_Name,
        gender: formData?.Gender.toLowerCase(),
        dateOfBirth: formData?.Date_of_Birth,
        phoneNumber: formData?.Phone_Contact,
        email: formData?.Email,
        address: formData?.Address,
        roleId: formData?.Admin_Role
      };

      addAdminUserAsync({
        dispatch: dispatch,
        body: requestData,
        token: token,
        callbackFn: (res) => {
          if (res?.data?.status === 200) {
            setLoading(false);
            setShowSuccessModal(true); // Show success modal
          } else {
            toast.error(res?.data?.message);
            setLoading(false);
          }
        },
      });
    }
    else {
      toast.error("Please fill all fields");
    }
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    setformData({
      First_Name: "",
      Last_Name: "",
      Middle_Name: "",
      Admin_Role: "",
      Gender: "",
      Date_of_Birth: "",
      Phone_Contact: "",
      Email: "",
      Address: "",
    });
    // Navigate back to admin users list
    navigate("/AdminUser");
  };

  return (
    <div
      className={`py-[7rem] lg:px-[5rem]   px-[10px] ${isOpen ? "lg:ml-[260px]" : ""
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
          <TailSpin color="orange" radius={5} />
        </div>
      )}
      <div className="flex justify-start items-center lg:gap-3">
        <FaChevronLeft className="cursor-pointer" onClick={() => navigate(-1)} />
        <div>
          <div className=" font-normal text-[14px] lg:text-[16px] leading-[20px] text-[#B6B6B6]">
            Admin Users/{" "}
            <span className="text-black font-medium"> Add Admin Users</span>
          </div>
        </div>
      </div>
      <div className="block lg:flex justify-center gap-10 mt-5">
        <div className="users bg-[#FFFFFF] rounded-xl lg:w-[80%]">
          <div>
            <h2 className="text-[18px]  leading-[20px] Border  pb-[10px] text-[#000000] font-medium">
              Add Admin Users
            </h2>
          </div>

          <div className=" ">
            <form>
              {/* fullName  */}
              <div className=" block lg:grid grid-cols-2 gap-5 mt-5">
                <div>
                  <label
                    for="First_Name"
                    className="font-medium text-[14px] mt-5 leading-[18px] text-[#3D3D3D]  block"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    name="First_Name"
                    value={formData.First_Name}
                    className=" mt-1 w-full  text-[14px]  outline-none  border p-2 border-[#D9D9D9] h-[40px] rounded-lg"
                    placeholder="Enter Details"
                    onChange={onchangeHandler}
                  />
                  {errors.First_Name && (
                    <span className=" text-red-500 block p-[8px]">
                      Enter First Name *
                    </span>
                  )}
                </div>
                <div>
                  <label
                    for="Middle_Name"
                    className="font-medium text-[14px] mt-5 leading-[18px] text-[#3D3D3D]  block"
                  >
                    Middle Name
                  </label>
                  <input
                    type="text"
                    name="Middle_Name"
                    value={formData.Middle_Name}
                    className=" mt-1 w-full  text-[14px]  outline-none  border p-2 border-[#D9D9D9] h-[40px] rounded-lg"
                    placeholder="Enter Details"
                    onChange={onchangeHandler}
                  />
                  {errors.Middle_Name && (
                    <span className=" text-red-500 block p-[8px]">
                      Enter Middle Name *
                    </span>
                  )}
                </div>
              </div>
              <div className="block lg:grid grid-cols-2 gap-5 mt-5">
                <div>
                  <label
                    for="Last_Name"
                    className="font-medium text-[14px] mt-5 leading-[18px] text-[#3D3D3D]  block"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="Last_Name"
                    value={formData.Last_Name}
                    className="mt-1  text-[14px] w-full  outline-none  border p-2 border-[#D9D9D9] h-[40px] rounded-lg"
                    placeholder="Enter Details"
                    onChange={onchangeHandler}
                  />
                  {errors.Last_Name && (
                    <span className=" text-red-500 block p-[8px]">
                      Enter Last Name *
                    </span>
                  )}
                </div>
                <div className="mt-3">
                  <label
                    for="admin_role"
                    className=" font-medium text-[14px] mt-5 leading-[18px] text-[#3D3D3D]"
                  >
                    Admin Role
                  </label>
                  <select
                    type="text"
                    name="Admin_Role"
                    value={formData.Admin_Role}
                    onChange={onchangeHandler}
                    className="w-full mt-1 text-[14px]  outline-none  border p-2 border-[#D9D9D9] h-[40px] rounded-lg"
                  >
                    <option value="" disabled>
                      Please Select
                    </option>
                    {adminRoles.length > 0 ? (
                      adminRoles.map((role) => (
                        <option key={role.id} value={role.id}>
                          {role.name}
                        </option>
                      ))
                    ) : (
                      <>
                        <option value="SUPERADMIN">SUPERADMIN</option>
                        <option value="ADMIN">ADMIN</option>
                        <option value="SUPPORT_STAFF">SUPPORT_STAFF</option>
                      </>
                    )}
                  </select>
                  {errors.Admin_Role && (
                    <span className=" text-red-500 block p-[8px]">
                      Select Admin Role *
                    </span>
                  )}
                </div>
              </div>

              <div className=" block lg:grid grid-cols-2 gap-5 mt-5  ">
                {/* Gender  */}
                <div>
                  <label
                    for="Gender"
                    className=" font-medium text-[14px] mt-5 leading-[18px] text-[#3D3D3D]"
                  >
                    Gender
                  </label>
                  <select
                    type="text"
                    name="Gender"
                    value={formData.Gender}
                    onChange={onchangeHandler}
                    className="w-full mt-1 text-[14px]  outline-none  border p-2 border-[#D9D9D9] h-[40px] rounded-lg"
                  >
                    <option value="" disabled>
                      Please Select
                    </option>
                    <option>Male</option>
                    <option>Female</option>
                  </select>
                  {errors.Gender && (
                    <span className=" text-red-500 block p-[8px]">
                      Select Gender *
                    </span>
                  )}
                </div>
                {/* DOB  */}
                <div>
                  <label
                    for="Date_of_Birth"
                    className=" font-medium text-[14px] mt-5 leading-[18px] text-[#3D3D3D] pb-[8px]"
                  >
                    Date of Birth
                  </label>

                  <input
                    type="date"
                    name="Date_of_Birth"
                    className="mt-1  text-[14px] w-full  outline-none  border p-2 border-[#D9D9D9] h-[40px] rounded-lg"
                    placeholder="Enter Details"
                    onChange={onchangeHandler}
                    value={formData.Date_of_Birth}
                  />
                  {errors.Date_of_Birth && (
                    <span className=" text-red-500 block p-[8px]">
                      Enter Date oF Birth *
                    </span>
                  )}
                </div>
              </div>
              <div className=" block lg:grid grid-cols-2 gap-5 mt-5  pb-[16px] Border">
                {/* Phone Number  */}
                <div>
                  <label
                    for="Phone_Contact"
                    className="font-medium text-[14px] mt-5 leading-[18px] text-[#3D3D3D] pb-[8px]"
                  >
                    Phone Number
                  </label>
                  <div className="flex gap-5">
                    <div className="flex w-full  flex-col gap-2">
                      <input
                        type="mobile-input"
                        name="Phone_Contact"
                        id="phonenumber"
                        value={formData.Phone_Contact}
                        onChange={onchangeHandler}
                        className="w-full mt-1  text-[14px]  outline-none  border p-2 border-[#D9D9D9] h-[40px] rounded-lg"
                        placeholder="Enter Details"
                      />
                      {errors.Phone_Contact && (
                        <span className=" text-red-500">{errors.Phone_Contact}</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* email   */}
                <div className="">
                  <label
                    for="Email"
                    className="font-medium text-[14px]  mt-5 leading-[18px] text-[#3D3D3D] "
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="Email"
                    value={formData.Email}
                    onChange={onchangeHandler}
                    placeholder="Enter Details"
                    className="w-full mt-1  text-[14px]  outline-none  border p-2 border-[#D9D9D9] h-[40px] rounded-lg"
                  />
                  {errors.Email && (
                    <span className=" text-red-500 block p-[8px]">
                      Enter Email *
                    </span>
                  )}
                </div>
              </div>
              {/* Address */}
              <div className="pt-2">
                <label
                  for="Address"
                  className="font-medium text-[14px] mt-5 leading-[18px] text-[#3D3D3D] "
                >
                  Address
                </label>
                <input
                  type="text"
                  name="Address"
                  value={formData.Address}
                  placeholder="Enter Details"
                  onChange={onchangeHandler}
                  className="w-full mt-1  text-[14px]  outline-none  border p-2 border-[#D9D9D9] h-[40px] rounded-lg"
                />
                {errors.Address && (
                  <span className="text-red-500 block p-[8px]">
                    Enter Address *
                  </span>
                )}
              </div>
            </form>
          </div>
        </div>
        <div className="users bg-[#ffffff] lg:mt-0 mt-5 lg:w-[35%] rounded-lg h-[50%]">
          <h2 className="text-[18px]  leading-[20px]  pb-[10px] text-[#000000] font-medium">
            Summary
          </h2>
          <div className="rounded-2xl bg-[#EFF6F1] p-2">
            {Object.entries(formData).map(([key, value]) => (
              <div
                key={key}
                className="flex  justify-between mt-2 "
                style={{ display: key == "file" ? "none" : "flex" }}
              >
                <div className="font-light mt-3 text-[14px] leading-[16px] text-[#5A5B5C]">
                  {key.replace(/_/g, " ")}
                </div>
                <div className="text-[16px] leading-[24px] text-[#000000]">
                  {value}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-[FFF9FD] m-auto my-10">
            <button
              type="button"
              className=" h-[32px] rounded-lg text-center  w-[200px]  text-white bg-[#27AE60]"
              onClick={() => {
                submitContactForm();
              }}
            >
              Create
            </button>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={handleSuccessModalClose}
        type="success"
        title="Success!"
        message="Admin user has been created successfully."
        buttonText="Go to Admin Users"
      />

      <ToastContainer
        position="top-right"
        autoClose={2000}
        ProgressBar={true}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnHover={false}
      />
    </div>
  );
};

export default AddAdminUser;
