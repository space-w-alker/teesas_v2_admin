import React, { useState } from "react";
import countrycode from "../../components/data/Countrycode.json";
import Customadduser from "../../components/common/Customadduser";
import { addUserAsync } from "../../apis/slices/authSlice";
import { useDispatch } from "react-redux";
import Validation from "../login/Validation";
import { FaChevronLeft } from "react-icons/fa";
import { toast } from "react-toastify";
import { TailSpin } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

const Parent = ({ isOpen, togglesidebar }) => {
  const [showCustomAddUser, setShowCustomAddUser] = useState(false);
  const [errors, setError] = useState({});
  const [formData, setformData] = useState({
    first_name: "",
    last_name: "",
    Middle_name: "",
    gender: "",
    DateofBirth: "",
    PhoneNumber: "",
    email: "",
    Address: "",
    LocalGovernment: "",
    ParentName: "",
    ParentNumber: "",
    ParentAddress: "",
    ParentRelationship: "",
    password: "",
    ConfirmPassword: ""
  });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const token = localStorage.getItem("authToken");
  const onchangeHandler = (event) => {
    const Navigate = useNavigate();
    const { name, value } = event.target;
    setformData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const submitContactForm = () => {
    setLoading(true);
    setError(Validation(formData));
    const finaldata = {
      first_name: formData.first_name,
      last_name: formData.last_name,
      Middle_name: formData.Middle_name,
      gender: formData.gender.toUpperCase(),
      birthday: formData.birthday,
      mobile: formData.mobile,
      email: formData.email,
      country_id: formData.country_id,
      password: formData.password,
      parentName: formData.parentName,
      Pnumber: formData.Pnumber,
      PAddress: formData.PAddress,
      Prelationship: formData.Prelationship,
      Address: formData.Address,
      LocalGovernment: formData.LocalGovernment,
      Password: formData.password,
      ConfirmPassword: formData.ConfirmPassword
    }
    addUserAsync({
      dispatch: dispatch,
      body: finaldata,
      token: token,

      callbackFn: (res) => {
        console.log("adduserdata", res)
        if (res?.data?.status === 200) {
          // setShowCustomAddUser(true);
          setLoading(false);
        } else {
          toast.error(res?.data?.message);
          setLoading(false);
        }
      },
    });

  }
  const days = Array.from({ length: 31 }, (_, index) => index + 1);
  const months = [
    { id: 1, name: "January" },
    { id: 2, name: "February" },
    { id: 3, name: "March" },
    { id: 4, name: "April" },
    { id: 5, name: "May" },
    { id: 6, name: "June" },
    { id: 7, name: "July" },
    { id: 8, name: "August" },
    { id: 9, name: "September" },
    { id: 10, name: "October" },
    { id: 11, name: "November" },
    { id: 12, name: "December" },
  ];
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, index) => currentYear - index);
  return (

    <div className={`  py-[7rem] lg:px-[5rem]  px-[10px] ${isOpen ? "xl:ml-[260px]" : ""}`}>
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
      <div className='flex justify-start  items-center lg:gap-3'>
        <FaChevronLeft onClick={() => Navigate(-1)} className="cursor-pointer" />
        <div>
          <div className=' font-normal text-[14px] lg:text-[16px] leading-[20px] text-[#B6B6B6]'>Home / Users/<span className='text-black font-medium'> Edit Parent User</span></div>
        </div>
      </div>
      <div className=" block lg:flex justify-center lg:gap-[17px] xl:gap-10 py-[2rem]">
        {
          showCustomAddUser ? (<Customadduser showCustomAddUser={showCustomAddUser} setShowCustomAddUser={setShowCustomAddUser} isOpen={isOpen}
            img=""
            text1="Drag and drop an image, or browse"
            text2="Upload .pdf, .doc or .doc, Max 6 MB "
            list1="Download Sample File"
            list2="Reupload List" />) : (
            <>
              <div className="users bg-[#FFFFFF] rounded-xl lg:w-[80%]">
                <h2 className="text-[18px]  leading-[20px] Border  pb-[10px] text-[#000000] font-medium">
                  Edit Parent Details
                </h2>
                <div>
                  <p className=" font-medium text-[14px] leading-[18px] mt-5 text-[#3D3D3D] pb-[8px]">
                    Upload User Image
                  </p>
                  <div className="h-[48px] py-[10px] border border-dashed border-[#B9B9B9]  text-[#B9B9B9] bg-[#EFF6F1] rounded-lg">
                    <p className=" font-normal text-center cursor-pointer text-[16px] leading-[24px]  translate-x-0 text-[#49454F]">
                      <div className="text-center relative "> Click to upload Image</div>
                      <input type="file" className="text-[#EFF6F1] w-0  opacity-0 absolute top-0 left-[45%] " placeholder="" />

                    </p>

                  </div>
                </div>

                <div className=" ">
                  <form >
                    {/* fullName  */}
                    <div className=" block lg:grid grid-cols-2 gap-5 mt-5">
                      <div>
                        <label for="first_name" className="font-medium text-[14px] mt-5 leading-[18px] text-[#3D3D3D]  block">First name</label>
                        <input
                          type="text"
                          name="first_name"
                          value={formData.first_name}
                          className=" mt-1 w-full  text-[14px]  outline-none  border p-2 border-[#D9D9D9] h-[40px] rounded-lg"
                          placeholder="Enter Details"
                          onChange={onchangeHandler}
                        />
                        {errors.first_name && (
                          <span className=" text-red-500 block p-[8px]">Enter first_name *</span>
                        )}
                      </div>
                      <div>
                        <label for="Middle_name" className="font-medium text-[14px] mt-5 leading-[18px] text-[#3D3D3D]  block">Middle Name</label>
                        <input
                          type="text"
                          name="Middle_name"
                          value={formData.Middle_name}
                          className="mt-1  text-[14px] w-full  outline-none  border p-2 border-[#D9D9D9] h-[40px] rounded-lg"
                          placeholder="Enter Details"
                          onChange={onchangeHandler}
                        />
                        {errors.Middle_name && (
                          <span className=" text-red-500 block p-[8px]">Enter Middle_name *</span>
                        )}
                      </div>
                      <div>
                        <label for="last_name" className="font-medium text-[14px] mt-2 leading-[18px] text-[#3D3D3D]  block">Last Name</label>
                        <input
                          type="text"
                          name="last_name"
                          value={formData.last_name}
                          className="mt-1  text-[14px] w-full  outline-none  border p-2 border-[#D9D9D9] h-[40px] rounded-lg"
                          placeholder="Enter Details"
                          onChange={onchangeHandler}
                        />
                        {errors.last_name && (
                          <span className=" text-red-500 block p-[8px]">Enter last_name *</span>
                        )}
                      </div>

                    </div>

                    <div className=" block lg:grid grid-cols-2 gap-5 mt-5">
                      {/* Gender  */}
                      <div>
                        <label for="gender" className=" font-medium text-[14px] mt-5 leading-[18px] text-[#3D3D3D]">Gender</label>
                        <select
                          type="text"
                          name="gender"
                          value={formData.gender}
                          onChange={onchangeHandler}
                          className="w-full mt-1 text-[14px]  outline-none  border p-2 border-[#D9D9D9] h-[40px] rounded-lg"
                        >
                          <option >Male</option>
                          <option >Female</option>
                          <option>Other</option>
                        </select>
                        {errors.gender && (
                          <span className=" text-red-500 block p-[8px]">Select Gender *</span>
                        )}
                      </div>
                      {/* DOB  */}

                      <div >
                        <label for="birthday" className=" font-medium text-[14px] mt-5 leading-[18px] text-[#3D3D3D] pb-[8px]">Date of Birth</label>
                        <select
                          name="birthday"
                          onChange={onchangeHandler}
                          value={formData.birthday}
                          className="w-full mt-1  text-[14px]  outline-none  border p-2 border-[#D9D9D9] h-[40px] rounded-lg"
                        >
                          <option value="">Day</option>
                          {days.map((d) => (
                            <option key={d} value={d}>
                              {d}
                            </option>
                          ))}
                          <option value="">Month</option>
                          {months.map((m) => (
                            <option key={m.id} value={m.id}>
                              {m.name}
                            </option>
                          ))}
                          <option value="">Year</option>
                          {years.map((y) => (
                            <option key={y} value={y}>
                              {y}
                            </option>
                          ))}
                        </select>
                        {errors.Dob && (
                          <span className=" text-red-500 block p-[8px]">Enter Date oF Birth *</span>
                        )}
                      </div>


                      {/* Phone Number  */}
                      <div>
                        <label for="PhoneNumber" className="font-medium text-[14px] mt-5 leading-[18px] text-[#3D3D3D] pb-[8px]">Phone Number</label>
                        <div className="flex gap-5">
                          <div className="flex w-[82px] flex-col gap-5 ">
                            <select
                              type="text"
                              name="countrycode"
                              className="w-full mt-1 text-[14px]  outline-none  border p-2 border-[#D9D9D9] h-[40px] rounded-lg"
                              id={formData.country_id}

                            >
                              {countrycode.map((item, index) => {
                                return (
                                  <option key={index} value={item.code}>
                                    {item.code} - {item.country}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                          <div className="flex w-[calc(100%-90px)]  flex-col gap-2">
                            <input
                              type="number"
                              name="mobile"
                              id="phonenumber"
                              value={formData.mobile}
                              onChange={onchangeHandler}
                              className="w-full mt-1  text-[14px]  outline-none  border p-2 border-[#D9D9D9] h-[40px] rounded-lg"
                              placeholder="Enter Details"
                            // {...register("phoneNo", {
                            //   required: {
                            //     value: true,
                            //     message: "Please enter phone Number*",
                            //   },
                            //   maxLength: {
                            //     value: 10,
                            //     message: "Enter a valid Phone Number*",
                            //   },
                            //   minLength: {
                            //     value: 8,
                            //     message: "Enter a valid Phone Number*",
                            //   },
                            // })}
                            />
                            {errors.mobile && (
                              <span className=" text-red-500 block p-[8px]">
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* email   */}
                      <div className="">
                        <label for="email" className="font-medium text-[14px]  mt-5 leading-[18px] text-[#3D3D3D] ">
                          Email Address
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={onchangeHandler}
                          placeholder="Enter Details"
                          className="w-full mt-1  text-[14px]  outline-none  border p-2 border-[#D9D9D9] h-[40px] rounded-lg"
                        />
                        {errors.email && (
                          <span className=" text-red-500 block p-[8px]">Enter Email *</span>
                        )}
                      </div>
                    </div>

                    <div className=" block lg:grid grid-cols-2 gap-5 mt-5">
                      {/* Address */}
                      <div className="">
                        <label for="Address" className="font-medium text-[14px] mt-5 leading-[18px] text-[#3D3D3D] " >Address</label>
                        <input
                          type="text"
                          name="Address"
                          value={formData.Address}
                          placeholder="Enter Details"
                          onChange={onchangeHandler}
                          className="w-full mt-1  text-[14px]  outline-none  border p-2 border-[#D9D9D9] h-[40px] rounded-lg"

                        />
                        {errors.Address && (
                          <span className="text-red-500 block p-[8px]">Enter Address *</span>
                        )}
                      </div>
                      {/* local goverment  */}
                      <div>
                        <label for="LocalGovernment" className="font-medium mt-5 text-[14px] leading-[18px] text-[#3D3D3D] ">Local Government</label>
                        <select
                          type="text"
                          name="LocalGovernment"
                          value={formData.LocalGovernment}
                          onChange={onchangeHandler}
                          className="w-full mt-1  text-[14px]  outline-none  border p-2 border-[#D9D9D9] h-[40px] rounded-lg"

                        >
                          <option value="0">1</option>
                          <option value="1">2</option>
                          <option value="2">3</option>
                        </select>
                        {errors.LocalGovernment && (
                          <span className="text-red-500 block p-[8px]">Enter LocalGovernment *</span>
                        )}
                      </div>
                      <div className="">
                        <label for="ParentName" className="font-medium mt-5 text-[14px] leading-[18px] text-[#3D3D3D] " >Parent Name</label>
                        <input
                          type="text"
                          name="ParentName"
                          placeholder="Enter Details"
                          value={formData.AcademyCode}
                          onChange={onchangeHandler}
                          className="w-full mt-1  text-[14px]  outline-none  border p-2 border-[#D9D9D9] h-[40px] rounded-lg"

                        />
                        {errors.ParentName && (
                          <span className="text-red-500 block p-[8px]">Enter Parent Name *</span>
                        )}
                      </div>

                      {/* Academy Name */}
                      <div className="">
                        <label for="Pnumber" className="font-medium mt-5 text-[14px] leading-[18px] text-[#3D3D3D] ">Parent Phone Number</label>
                        <input
                          type="text"
                          name="Pnumber"
                          placeholder="Enter Details"
                          value={formData.Pnumber}
                          onChange={onchangeHandler}
                          className="w-full mt-1  text-[14px]   outline-none  border p-2 border-[#D9D9D9] h-[40px] rounded-lg"

                        />
                        {errors.Pnumber && (
                          <span className=" text-red-500 block p-[8px]"> Enter Phone Number *</span>
                        )}
                      </div>


                      <div className="">
                        <label for="PAddress" className="font-medium text-[14px] mt-5 leading-[18px] text-[#3D3D3D] " > Parent Address</label>
                        <input
                          type="text"
                          name="PAddress"
                          value={formData.PAddress}
                          placeholder="Enter Details"
                          onChange={onchangeHandler}
                          className="w-full mt-1  text-[14px]  outline-none  border p-2 border-[#D9D9D9] h-[40px] rounded-lg"

                        />
                        {errors.PAddress && (
                          <span className="text-red-500 block p-[8px]">Enter Parent Address *</span>
                        )}
                      </div>

                      <div>
                        <label for="LocalGovernment" className="font-medium mt-5 text-[14px] leading-[18px] text-[#3D3D3D] ">Parent Relationship</label>
                        <select
                          type="text"
                          name="Prelationship"
                          value={formData.Prelationship}
                          onChange={onchangeHandler}
                          className="w-full mt-1  text-[14px]  outline-none  border p-2 border-[#D9D9D9] h-[40px] rounded-lg"

                        >
                          <option value="0">1</option>
                          <option value="1">2</option>
                          <option value="2">3</option>
                        </select>
                        {errors.LocalGovernment && (
                          <span className="text-red-500 block p-[8px]">Parent Relationship *</span>
                        )}
                      </div>
                    </div>

                    <div className="block lg:grid grid-cols-2 gap-5 mt-5">
                      <div className="">
                        <label for="Password" className="font-medium text-[14px] leading-[18px] text-[#3D3D3D] ">
                          Password
                        </label>
                        <input
                          type="password"
                          name="password"
                          placeholder="Enter Details"
                          value={formData.Password}
                          onChange={onchangeHandler}
                          className="w-full mt-1  text-[14px]  outline-none  border p-2 border-[#D9D9D9] h-[40px] rounded-lg"

                        />
                        {errors.password && (
                          <span className="text-red-500 block p-[8px]"></span>
                        )}
                      </div>
                      <div className="">
                        <label for="ConfirmPassword" className="font-medium text-[14px] leading-[18px] text-[#3D3D3D] ">
                          Confirm Password
                        </label>
                        <input
                          type="password"
                          name="ConfirmPassword"
                          value={formData.ConfirmPassword}
                          placeholder="Enter Details"
                          onChange={onchangeHandler}
                          className="w-full mt-1  text-[14px]  outline-none  border p-2 border-[#D9D9D9] h-[40px] rounded-lg"

                        />
                        {errors.Confirmpassword && (
                          <span className="text-red-500 block p-[8px]">Enter Confirm Password *</span>
                        )}
                      </div>
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
                    <div key={key} className="flex  justify-between mt-2">
                      <div className="font-light mt-3 text-[14px] leading-[16px] text-[#5A5B5C]">
                        {key.replace(/_/g, " ")}
                      </div>
                      <div className="text-[16px] leading-[24px] text-[#000000]">{value}</div>
                    </div>
                  ))}
                </div>

                <div className="bg-[FFF9FD] m-auto my-10">
                  <button type="button" className=" h-[32px] rounded-lg text-center  w-[200px]  text-white bg-[#27AE60]" onClick={() => {
                    submitContactForm()
                  }}> Add User</button>
                </div>
              </div>
            </>
          )
        }
      </div>
    </div>
  );
};

export default Parent;