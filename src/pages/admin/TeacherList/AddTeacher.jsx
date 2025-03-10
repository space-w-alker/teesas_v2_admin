import React, { useState, useEffect } from "react";
import countrycode from "../../../components/data/Countrycode.json";
import {
  getLocalGovAsync,
  addTeacherAsync,
} from "../../../apis/slices/teacherSlice";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { TailSpin } from "react-loader-spinner";
import Validation from "../../../components/validator/addTeacherValidator";
import { getCoursesAsync } from "../../../apis/slices/authSlice";
import { FaChevronLeft } from "react-icons/fa"
const AddTeacher = ({ isOpen }) => {
  const Navigate = useNavigate();
  const token = localStorage.getItem("authToken");
  const dispatch = useDispatch();
  const [adminData, setAdminData] = useState([]);
  const [pageData, setPageData] = useState([]);
  const [acadmyData, setAcadmyData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [courseData, setCourseData] = useState([]);
  const [gradeData, setGradeData] = useState([]);

  useEffect(() => {
    // getLocalGovAsync({
    //   dispatch: dispatch,
    //   data: {},
    //   token: token,
    //   callbackFn: (res) => {
    //     if (res?.data?.status === 200) {
    //       setAdminData(res?.data?.data?.local_government);
    //     } else {
    //       alert(res?.data?.message);
    //     }
    //   },
    // });
    // setLoading(true);
    // getCoursesAsync({
    //   dispatch: dispatch,
    //   data: {},
    //   token: token,
    //   callbackFn: (res) => {
    //     if (res?.data?.status === 200) {
    //       setCourseData(res?.data?.data?.courses);
    //       setLoading(false);
    //     } else {
    //       alert(res?.data?.message);
    //       setLoading(false);
    //     }
    //   },
    // });
  }, []);

  const [errors, setError] = useState({});
  const [imageFile, setImageFile] = useState({});
  const [formData, setformData] = useState({
    First_Name: "",
    Middle_Name: "",
    Last_Name: "",
    Gender: "",
    Date_of_Birth: "",
    Phone_Number: "",
    Email: "",
    Address: "",
    // Academy_Code: "",
    // Academy_Name: "",
    // LGA: "",
    // Senatorial_District: "",
    // Grade: "",
    // Id: "",
    // Description: "",
    // file: "",
    // Course: "",
  });
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
      // var form_data = new FormData();
      // form_data.append("name", formData?.Full_Name);
      // form_data.append("gender", formData?.Gender);
      // form_data.append("email", formData?.Email);
      // form_data.append("mobile", formData?.Phone_Number);
      // form_data.append("file", imageFile);
      // form_data.append("academy_id", formData?.Academy_Code);
      // form_data.append("decription", formData?.Description);
      // form_data.append("id", formData?.Id);
      // form_data.append("grade", formData?.Grade);

      const form_data = {
        first_name: formData?.First_Name,
        middle_name: formData?.Middle_Name,
        last_name: formData?.Last_Name,
        gender: formData?.Gender,
        date_of_birth: formData?.Date_of_Birth,
        phone_number: formData?.Phone_Number,
        email: formData?.Email,
        address: formData?.Address
      }

      addTeacherAsync({
        dispatch: dispatch,
        body: form_data,
        token: token,
        callbackFn: (res) => {
          if (res?.data?.status === 201) {
            setformData({
              First_Name: "",
              Middle_Name: "",
              Last_Name: "",
              Gender: "",
              Date_of_Birth: "",
              Phone_Number: "",
              Email: "",
              Address: "",
              // Academy_Code: "",
              // Academy_Name: "",
              // LGA: "",
              // Senatorial_District: "",
              // Grade: "",
              // Id: "",
              // Description: "",
              // file: "",
              // Course: "",
            });
            setLoading(false);
            toast.success(res?.data?.message);
          } else {
            toast.error(res?.data?.message);
            setLoading(false);
          }
        },
      });
    } else {
      toast.error("Please fill all fields");
    }
  };

  return (
    <>

      <div onClick={() => {
        Navigate(-1);
      }} className='flex justify-start items-center pt-[8rem] lg:pt-[8rem] lg:px-[9rem]  px-[10px]'>
        <FaChevronLeft />
        <div>
          <div className='font-normal text-[14px] lg:text-[16px] leading-[20px]  text-[#B6B6B6]'>
            Teachers / <span className='text-black font-medium'>Add Teacher</span>
          </div>
        </div>
      </div>

      <div
        className={` block lg:flex justify-center gap-10 py-[8rem] lg:py-[1rem] lg:px-[9rem] mt-3 px-[10px] ${isOpen ? "ml-[240px]" : ""
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
        <div className="users bg-[#FFFFFF] rounded-xl lg:w-[80%]">
          <div className="Border ">
            <h2 className=" font-medium text-[18px]  leading-[20px] text-[#000000] pb-[20px]">
              Add Teacher
            </h2>
          </div>
          <div className=" ">
            <div className="hidden">
              <p className=" font-medium text-[14px] leading-[18px] mt-5 text-[#3D3D3D] pb-[8px]">
                Upload User Image
              </p>
              <div className="h-[48px] py-[10px] border border-dashed text-[#B9B9B9] bg-[#E9FDEE] rounded-lg">
                <p className=" font-normal text-center cursor-pointer text-[16px] leading-[24px]  translate-x-0 text-[#49454F]">
                  <div className="text-center relative ">
                    {" "}
                    Click to upload Image
                  </div>
                  <input
                    type="file"
                    onChange={(e) => {
                      if (
                        e.target.files[0] !== null &&
                        e.target.files[0] !== undefined
                      ) {
                        const image_type_data = e.target.files[0].type;
                        const image_array = image_type_data.split("/");
                        const image_types = image_array[1].split(" ");
                        const img_type = image_types[0];
                        var types = ["jpg", "png", "svg", "jpeg", "gif", "webp"];
                        if (types.includes(img_type)) {
                          setImageFile(e.target.files[0]);
                          setformData((prevFormData) => ({
                            ...prevFormData,
                            ["file"]: "Got it",
                          }));
                        } else {
                          alert("Please Upload Only Images.");
                        }
                      }
                    }}
                    className="text-[#EFF6F1]   opacity-0 absolute top-0 left-[45%] max-sm:left-0 "
                    placeholder=""
                  />
                </p>
                {errors.file && (
                  <span className=" text-red-500 block p-[8px] mt-2">
                    Upload file *
                  </span>
                )}
              </div>
            </div>
            <form>
              <div className=" block lg:grid grid-cols-2 gap-5 mt-5">
                <div>
                  <label
                    for="First_Name"
                    className="font-medium text-[14px] mt-2 leading-[18px] text-[#3D3D3D]  block"
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
                      Enter Full Name *
                    </span>
                  )}
                </div>
                <div>
                  <label
                    for="Middle_Name"
                    className="font-medium text-[14px] mt-2 leading-[18px] text-[#3D3D3D]  block"
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
                <div>
                  <label
                    for="Last_Name"
                    className="font-medium text-[14px] mt-2 leading-[18px] text-[#3D3D3D]  block"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="Last_Name"
                    value={formData.Last_Name}
                    className=" mt-1 w-full  text-[14px]  outline-none  border p-2 border-[#D9D9D9] h-[40px] rounded-lg"
                    placeholder="Enter Details"
                    onChange={onchangeHandler}
                  />
                  {errors.Last_Name && (
                    <span className=" text-red-500 block p-[8px]">
                      Enter Last Name *
                    </span>
                  )}
                </div>
              </div>
              <div className=" block lg:grid grid-cols-2 gap-5 mt-5 border-b pb-5">
                <div>
                  <label
                    for="Gender"
                    className=" font-medium text-[14px] pt-4 leading-[18px]  text-[#3D3D3D]"
                  >
                    Gender
                  </label>
                  <select
                    type="text"
                    name="Gender"
                    value={formData.Gender}
                    onChange={onchangeHandler}
                    className="w-full mt-1 text-[14px]   outline-none  border p-2 border-[#D9D9D9] h-[40px] rounded-lg"
                  >
                    <option disabled value="">
                      Please Select Gender
                    </option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                  {errors.Gender && (
                    <span className=" text-red-500 block p-[8px]">
                      Select Gender *
                    </span>
                  )}
                </div>
                <div>
                  <label
                    for="Date_of_Birth"
                    className="font-medium text-[14px] mt-2 leading-[18px] text-[#3D3D3D]  block"
                  >
                    Date_of_Birth
                  </label>
                  <input
                    type="date"
                    name="Date_of_Birth"
                    value={formData.Date_of_Birth}
                    className=" mt-1 w-full  text-[14px]  outline-none  border p-2 border-[#D9D9D9] h-[40px] rounded-lg"
                    placeholder="Enter Details"
                    onChange={onchangeHandler}
                    max={new Date().toISOString().split("T")[0]} // Restrict selection to past dates
                  />
                  {errors.Date_of_Birth && (
                    <span className=" text-red-500 block p-[8px]">
                      Enter Date of Birth *
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-4 Border hidden ">
                <label className=" font-medium text-[14px] leading-[18px] text-[#3D3D3D]">
                  Description
                </label>
                <textarea
                  value={formData.Description}
                  onChange={onchangeHandler}
                  placeholder="Enter Message Here"
                  name="Description"
                  className=" outline-none w-full border border-[#D9D9D9] py-[10px] px-[16px] rounded-lg h-[149px]"
                ></textarea>
                {errors.Description && (
                  <span className=" text-red-500">{errors.Description}</span>
                )}
              </div>

              <div className=" block lg:grid grid-cols-2 gap-5 mt-5">
                {/* Phone Number  */}
                <div>
                  <label
                    for="Phone_Number"
                    className="font-medium text-[14px] mt-5  leading-[18px] text-[#3D3D3D] pb-[8px]"
                  >
                    Phone Number
                  </label>
                  <div className="flex gap-5">
                    {/*<div className="flex w-[82px] flex-col gap-5 ">
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
                      </div>*/}
                    <div className="flex  flex-col gap-2 w-full">
                      <input
                        type="text"
                        name="Phone_Number"
                        id="phonenumber"
                        value={formData.Phone_Number}
                        onChange={onchangeHandler}
                        className="w-full mt-1  text-[14px]  outline-none  border p-2 border-[#D9D9D9] h-[40px] rounded-lg"
                        placeholder="Enter Details"
                      />
                      {errors.Phone_Number && (
                        <span className=" text-red-500">
                          {errors.Phone_Number}
                        </span>
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

                <div className="hidden">
                  <label
                    for="LGA"
                    className="font-medium text-[14px] mt-5 leading-[18px] text-[#3D3D3D] "
                  >
                    LGA
                  </label>
                  <select
                    type="text"
                    name="LGA"
                    value={formData.LGA}
                    onChange={(e) => {
                      onchangeHandler(e);
                      const localGovernment = adminData.find(
                        (lg) => lg.id == e.target.value
                      );
                      setAcadmyData(localGovernment.academies);
                    }}
                    className="w-full mt-1  text-[14px]  outline-none  border p-2 border-[#D9D9D9] h-[40px] rounded-lg"
                  >
                    <option disabled value="">
                      Please Select
                    </option>
                    {adminData?.map((item) => {
                      return <option value={item?.id}>{item?.name}</option>;
                    })}
                  </select>
                  {errors.LGA && (
                    <span className="text-red-500 block p-[8px]">
                      {" "}
                      Enter LGA *
                    </span>
                  )}
                </div>
                <div className="hidden">
                  <label
                    for="Academy_Name"
                    className="font-medium mt-5 text-[14px] leading-[18px] text-[#3D3D3D] "
                  >
                    Academy Name
                  </label>
                  <select
                    type="text"
                    name="Academy_Name"
                    placeholder="Enter Details"
                    value={formData.Academy_Name}
                    onChange={(e) => {
                      onchangeHandler(e);
                      const academiesData = acadmyData.find(
                        (lg) => lg.academy_name == e.target.value
                      );

                      setformData((prevFormData) => ({
                        ...prevFormData,
                        ["Academy_Code"]: academiesData?.id,
                        ["Senatorial_District"]: academiesData?.sentorial,
                      }));
                    }}
                    className=" w-full mt-1 text-[14px]  outline-none  border p-2 border-[#D9D9D9] h-[40px] rounded-lg"
                  >
                    <option disabled value="">
                      Please Select
                    </option>
                    {acadmyData?.map((item) => {
                      return (
                        <option value={item?.academy_name}>
                          {item?.academy_name}
                        </option>
                      );
                    })}
                  </select>
                  {errors.Academy_Name && (
                    <span className=" text-red-500 block p-[8px]">
                      {" "}
                      Enter Academy Name *
                    </span>
                  )}
                </div>

                <div className="hidden">
                  <label
                    for="Academy_Code"
                    className="font-medium mt-5 text-[14px] leading-[18px] text-[#3D3D3D] "
                  >
                    Academy Code
                  </label>
                  <input
                    type="text"
                    name="Academy_Code"
                    placeholder="Enter Details"
                    value={formData.Academy_Code}
                    onChange={onchangeHandler}
                    className="w-full mt-1  text-[14px]  outline-none  border p-2 border-[#D9D9D9] h-[40px] rounded-lg"
                  />
                  {errors.Academy_Code && (
                    <span className="text-red-500 block p-[8px]">
                      Enter Academy Code *
                    </span>
                  )}
                </div>
                <div className="hidden">
                  <label
                    for="Senatorial_District"
                    className="font-medium mt-5 text-[14px] leading-[18px] text-[#3D3D3D] "
                  >
                    Senatorial District
                  </label>
                  <input
                    type="text"
                    name="Senatorial_District"
                    placeholder="Enter Details"
                    value={formData.Senatorial_District}
                    onChange={onchangeHandler}
                    className="w-full mt-1  text-[14px]   outline-none  border p-2 border-[#D9D9D9] h-[40px] rounded-lg"
                  />
                  {errors.Senatorial_District && (
                    <span className="text-red-500 block p-[8px]">
                      Enter Senatorial District *
                    </span>
                  )}
                </div>
                <div className="hidden">
                  <label
                    for="Course"
                    className="font-medium  text-[14px] mt-2 block leading-[18px] text-[#3D3D3D] "
                  >
                    Select Course
                  </label>
                  <select
                    type="text"
                    name="Course"
                    value={formData.Course}
                    onChange={(e) => {
                      onchangeHandler(e);
                      const localGovernment = courseData.find(
                        (lg) => lg.id == e.target.value
                      );
                      setGradeData(localGovernment.classes);
                    }}
                    className=" w-full mt-1 text-[14px]  outline-none  border p-2 border-[#D9D9D9] h-[40px] rounded-lg"
                  >
                    <option disabled value="">
                      Please Select
                    </option>
                    {courseData?.map((item) => {
                      return <option value={item?.id}>{item?.name}</option>;
                    })}
                  </select>
                  {errors.Course && (
                    <span className="text-red-500 block p-[8px]">
                      Enter Course *
                    </span>
                  )}
                </div>
                {/* Grade */}
                <div className="hidden">
                  <label
                    for="Grade"
                    className="font-medium  text-[14px] mt-2 block leading-[18px] text-[#3D3D3D] "
                  >
                    Teacher Grade
                  </label>
                  <select
                    type="text"
                    name="Grade"
                    value={formData.Grade}
                    onChange={onchangeHandler}
                    className=" w-full mt-1 text-[14px]  outline-none  border p-2 border-[#D9D9D9] h-[40px] rounded-lg"
                  >
                    <option disabled value="">
                      Please Select
                    </option>
                    {gradeData?.map((item) => {
                      return <option value={item?.id}>{item?.name}</option>;
                    })}
                  </select>
                  {errors.Grade && (
                    <span className="text-red-500 block p-[8px]">
                      Enter Grade *
                    </span>
                  )}
                </div>
                <div className="hidden">
                  <label
                    for="Id"
                    className="font-medium text-[14px] leading-[18px] text-[#3D3D3D] "
                  >
                    Teacher's ID
                  </label>
                  <input
                    type="text"
                    name="Id"
                    placeholder="Enter Details"
                    value={formData.Id}
                    onChange={onchangeHandler}
                    className="w-full   text-[14px]  outline-none  border p-2 border-[#D9D9D9] h-[40px] rounded-lg"
                  />
                  {errors.Id && (
                    <span className="text-red-500 block p-[8px]">
                      {errors.Id}
                    </span>
                  )}
                </div>
              </div>
              <div className="mt-5">
                <label
                  for="Address"
                  className="font-medium text-[14px]  mt-5 leading-[18px] text-[#3D3D3D] "
                >
                  Address
                </label>
                <input
                  type="text"
                  name="Address"
                  value={formData.Address}
                  onChange={onchangeHandler}
                  placeholder="Enter Details"
                  className="w-full mt-1  text-[14px]  outline-none  border p-2 border-[#D9D9D9] h-[40px] rounded-lg"
                />
                {errors.Address && (
                  <span className=" text-red-500 block p-[8px]">
                    Enter Address *
                  </span>
                )}
              </div>
            </form>
          </div>
        </div>
        <div className="users bg-[#ffffff] lg:mt-0 mt-5 lg:w-[45%] rounded-lg h-[50%]">
          <h2 className="text-[18px]  leading-[20px]  pb-[10px] text-[#000000] font-medium">
            Summary
          </h2>
          <div className="rounded-2xl bg-[#E9FDEE] p-2">
            {Object.entries(formData).map(([key, value]) => (
              <div
                key={key}
                className="flex  justify-between mt-2 "
                style={{ display: key == "file" ? "none" : "flex" }}
              >
                <div className="font-light mt-3 text-[14px] leading-[16px] text-[#5A5B5C]">
                  {key.replace(/_/g, " ")}
                </div>
                <div className="text-[16px] mt-2 leading-[24px] text-[#000000]">
                  {value}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-[FFF9FD] m-auto my-10">
            <button
              type="button"
              className=" h-[32px] rounded-lg text-center  w-[200px]  text-white bg-[#27AE60]"
              onClick={submitContactForm}
            >
              {" "}
              Add Teacher
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddTeacher;
