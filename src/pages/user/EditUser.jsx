import React, { useState, useEffect } from "react";
import countrycode from "../../components/data/Countrycode.json";
import Customadduser from "../../components/common/Customadduser";
import { addUserAsync, getCoursesAsync } from "../../apis/slices/authSlice";
import { getLocalGovAsync } from "../../apis/slices/teacherSlice";
import { useDispatch } from "react-redux";
import Validation from "../../components/validator/addUserValidator";
import { FaChevronLeft } from "react-icons/fa";
import { TailSpin } from "react-loader-spinner";
import {toast} from "react-toastify"
 import {GetUserProfileAsync} from "../../apis/slices/feedBackSlice"

const EditUser = ({ isOpen, togglesidebar }) => {
  const [showCustomAddUser, setShowCustomAddUser] = useState(false);
  const [errors, setError] = useState({});
  const [formData, setformData] = useState({
    First_Name: "",
    Last_Name: "",
    Student_ID: "",
    Gender: "",
    Date_of_Birth: "",
    Phone_Number: "",
    Email: "",
    Address: "",
    Academy_Code: "",
    Academy_Name: "",
    LGA: "",
    Senatorial_District: "",
    Course: "",
    Grade: "",
    Password: "",
    Confirm_Password: "",
  });
  const dispatch = useDispatch();
  const token = localStorage.getItem("authToken");
  const [adminData, setAdminData] = useState([]);
  const [pageData, setPageData] = useState([]);
  const [acadmyData, setAcadmyData] = useState([]);
  const [imageFile, setImageFile] = useState({});
  const [loading, setLoading] = useState(false);
  const [courseData, setCourseData] = useState([]);
  const [gradeData, setGradeData] = useState([]);
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  const [userData, setUserData] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true)
    GetUserProfileAsync({
      dispatch: dispatch,
      data: {
        user_id: id,
      },
      token: token,
      callbackFn: (res) => {
        setUserData(res?.data);
        const data=  res?.data;
        setformData({
          First_Name: data?.user?.first_name,
          Last_Name: data?.user?.last_name,
          Student_ID: data?.user?.id,
          Gender: data?.user?.gender,
          Date_of_Birth: data?.user?.birthday,
          Phone_Number: data?.user?.mobile,
          Email: data?.user?.email,
          Address: data?.user?.city,
          Academy_Code: "",
          Academy_Name: "",
          LGA: "",
          Senatorial_District: "",
          Course: data?.user?.userCourses[0]?.class_id,
          Grade:  data?.user?.userCourses[0]?.classes.id,
          Password: "",
          Confirm_Password: "",
        })
        setLoading(false)
      },
    });
    setLoading(true);
    getLocalGovAsync({
      dispatch: dispatch,
      data: {},
      token: token,
      callbackFn: (res) => {
        if (res?.data?.status === 200) {
          setAdminData(res?.data?.data?.local_government);
          setLoading(false);
        } else {
          alert(res?.data?.message);
          setLoading(false);
        }
      },
    });
    setLoading(true);
    getCoursesAsync({
      dispatch: dispatch,
      data: {},
      token: token,
      callbackFn: (res) => {
        if (res?.data?.status === 200) {
          setCourseData(res?.data?.data?.courses);
          setLoading(false);
        } else {
          alert(res?.data?.message);
          setLoading(false);
        }
      },
    });
  }, []);

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
      const finaldata = {
        first_name: formData.First_Name,
        last_name: formData.Last_Name,
        gender: formData.Gender.toUpperCase(),
        address: formData.Address,
        birthday: formData.Date_of_Birth,
        mobile: formData.Phone_Number,
        email: formData.Email,
        student_id: formData.Student_ID,
        academy_id: formData.Academy_Code,
        password: formData.Password,
        class_id: formData.Grade,
        file: imageFile,
      };
      const formDataObj = new FormData();

      for (const key in finaldata) {
        formDataObj.append(key, finaldata[key]);
      }
      addUserAsync({
        dispatch: dispatch,
        body: formDataObj,
        token: token,

        callbackFn: (res) => {
          if (res?.data?.status === 200) {
            setLoading(false);
            setformData({ First_Name: "",
              Last_Name: "",
              Student_ID: "",
              Gender: "",
              Date_of_Birth: "",
              Phone_Number: "",
              Email: "",
              Address: "",
              Academy_Code: "",
              Academy_Name: "",
              LGA: "",
              Senatorial_District: "",
              Course: "",
              Grade: "",
              Password: "",
              Confirm_Password: "",})
              setImageFile("")
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
    <div
      className={`  py-[7rem] lg:px-[5rem]  px-[10px] ${
        isOpen ? "xl:ml-[260px]" : ""
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
      <div className="flex justify-start  items-center lg:gap-3">
        <FaChevronLeft />
        <div>
          <div className=" font-normal text-[14px] lg:text-[16px] leading-[20px] text-[#B6B6B6]">
            Home / Users/
            <span className="text-black font-medium"> EditUsers</span>
          </div>
        </div>
      </div>
      <div className=" block lg:flex justify-center lg:gap-[17px] xl:gap-10 py-[2rem]">
        {showCustomAddUser ? (
          <Customadduser
            showCustomAddUser={showCustomAddUser}
            setShowCustomAddUser={setShowCustomAddUser}
            isOpen={isOpen}
            img=""
            text1="Drag and drop an image, or browse"
            text2="Upload .pdf, .doc or .doc, Max 6 MB "
            list1="Download Sample File"
            list2="Reupload List"
          />
        ) : (
          <>
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
              <h2 className="text-[18px]  leading-[20px] Border  pb-[10px] text-[#000000] font-medium">
              Edit User Details
              </h2>
              <div>
                <p className=" font-medium text-[14px] leading-[18px] mt-5 text-[#3D3D3D] pb-[8px]">
                  Upload User Image
                </p>
                <div className="h-[48px] py-[10px] border border-dashed border-[#B9B9B9]  text-[#B9B9B9] bg-[#FFF9ED] rounded-lg">
                  <p className=" font-normal text-center cursor-pointer text-[16px] leading-[24px]  translate-x-0 text-[#49454F]">
                    <div className="text-center relative ">
                      {" "}
                      Click to upload Image
                    </div>
                    <input
                    onChange={(e) => {
                      if (
                        e.target.files[0] !== null &&
                        e.target.files[0] !== undefined
                      ) {
                        const image_type_data = e.target.files[0].type;
                        const image_array = image_type_data.split("/");
                        const image_types = image_array[1].split(" ");
                        const img_type = image_types[0];
                        var types = [
                          "jpg",
                          "png",
                          "svg",
                          "jpeg",
                          "gif",
                          "webp",
                        ];
                        if (types.includes(img_type)) {
                          setImageFile(e.target.files[0])
                        } else {
                          toast.error("Please Upload Only Images.");
                        }
                      }
                    }}
                      type="file"
                      className="text-[#FFF9ED]   opacity-0 absolute top-0 left-[45%] max-sm:left-0 "
                      placeholder=""
                    />
                  </p>
                </div>
              </div>

              <div className=" ">
                <form>
                  {/* fullName  */}
                  <div className=" block lg:grid grid-cols-2 gap-5 mt-5">
                    <div>
                      <label
                        for="first_name"
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
                          Enter first_name *
                        </span>
                      )}
                    </div>
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
                        className=" mt-1 w-full  text-[14px]  outline-none  border p-2 border-[#D9D9D9] h-[40px] rounded-lg"
                        placeholder="Enter Details"
                        onChange={onchangeHandler}
                      />
                      {errors.Last_Name && (
                        <span className=" text-red-500 block p-[8px]">
                          Enter Last_name *
                        </span>
                      )}
                    </div>
                  </div>

                  <div className=" block lg:grid grid-cols-2 gap-5 mt-5">
                    <div>
                      <label
                        for="Student_ID"
                        className="font-medium text-[14px] mt-2 leading-[18px] text-[#3D3D3D]  block"
                      >
                        Student ID
                      </label>
                      <input
                        type="text"
                        name="Student_ID"
                        value={formData.Student_ID}
                        className="mt-1  text-[14px] w-full  outline-none  border p-2 border-[#D9D9D9] h-[40px] rounded-lg"
                        placeholder="Enter Details"
                        onChange={onchangeHandler}
                      />
                      {errors.Student_ID && (
                        <span className=" text-red-500 block p-[8px]">
                          Enter Student ID *
                        </span>
                      )}
                    </div>
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

                    {/* Phone Number  */}
                    <div>
                      <label
                        for="Phone_Number"
                        className="font-medium text-[14px] mt-5 leading-[18px] text-[#3D3D3D] pb-[8px]"
                      >
                        Phone Number
                      </label>
                      <div className="flex gap-5">
                        {/* <div className="flex w-[82px] flex-col gap-5 ">
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
                        <div className="flex w-full  flex-col gap-2">
                          <input
                            type="mobile-input"
                            name="Phone_Number"
                            id="phonenumber"
                            value={formData.Phone_Number}
                            onChange={onchangeHandler}
                            className="w-full mt-1  text-[14px]  outline-none  border p-2 border-[#D9D9D9] h-[40px] rounded-lg"
                            placeholder="Enter Details"
                          />
                          {errors.Phone_Number && (
                            <span className=" text-red-500">
                              {" "}
                              {errors.Phone_Number}{" "}
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
                    {/* Address */}
                    <div className="">
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
                  </div>

                  <div className=" block lg:grid grid-cols-2 gap-5 mt-5">
                    {/* local goverment  */}
                    <div>
                      <label
                        for="LGA"
                        className="font-medium mt-5 text-[14px] leading-[18px] text-[#3D3D3D] "
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
                          Select LGA *
                        </span>
                      )}
                    </div>

                    {/* Academy Name */}
                    <div className="">
                      <label
                        for="AcademyName"
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
                    {/* Academy Code */}

                    <div className="">
                      <label
                        for="Academy_Code"
                        className="font-medium mt-5 text-[14px] leading-[18px] text-[#3D3D3D] "
                      >
                        Academy Code
                      </label>
                      <input
                        disabled
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
                    <div>
                      <label
                        for="Senatorial_District"
                        className="font-medium mt-5 text-[14px] leading-[18px] text-[#3D3D3D] "
                      >
                        Senatorial District
                      </label>
                      <input
                        type="text"
                        disabled
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

                    <div className="">
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
                    <div className="">
                      <label
                        for="Grade"
                        className="font-medium  text-[14px] mt-2 block leading-[18px] text-[#3D3D3D] "
                      >
                        Grade
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
                  </div>

                  <div className="block lg:grid grid-cols-2 gap-5 mt-5">
                    <div className="">
                      <label
                        for="Password"
                        className="font-medium text-[14px] leading-[18px] text-[#3D3D3D] "
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        name="Password"
                        placeholder="Enter Details"
                        value={formData.Password}
                        onChange={onchangeHandler}
                        className="w-full mt-1  text-[14px]  outline-none  border p-2 border-[#D9D9D9] h-[40px] rounded-lg"
                      />
                      {errors.Password && (
                        <span className="text-red-500 block p-[8px]">Enter  Password *</span>
                      )}
                    </div>
                    <div className="">
                      <label
                        for="ConfirmPassword"
                        className="font-medium text-[14px] leading-[18px] text-[#3D3D3D] "
                      >
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        name="Confirm_Password"
                        value={formData.Confirm_Password}
                        placeholder="Enter Details"
                        onChange={onchangeHandler}
                        className="w-full mt-1  text-[14px]  outline-none  border p-2 border-[#D9D9D9] h-[40px] rounded-lg"
                      />
                      {errors.Confirm_Password && (
                        <span className="text-red-500 block p-[8px]">
                          Enter Confirm Password *
                        </span>
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
              <div className="rounded-2xl bg-[#FFF9ED] p-2">
                {Object.entries(formData).map(([key, value]) => (
                  <div key={key} className="flex  justify-between mt-2">
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
                  className=" h-[32px] rounded-lg text-center  w-[200px]  text-white bg-[#F2994A]"
                  onClick={() => {
                    submitContactForm();
                  }}
                >
                  {" "}
                  Update User
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EditUser;
