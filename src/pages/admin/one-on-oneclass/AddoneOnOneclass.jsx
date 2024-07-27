import React, { useState, useEffect } from "react";
import { getCoursesAsync } from "../../../apis/slices/authSlice";
import { getLocalGovAsync } from "../../../apis/slices/teacherSlice";
import { addLiveClassAsync } from "../../../apis/slices/liveClassSlice";
import { useDispatch } from "react-redux";
import validateForm from "../../../components/validator/liveClassValidator";
import { FaChevronLeft } from "react-icons/fa";
import { TailSpin } from "react-loader-spinner";
import { toast } from "react-toastify";
import SucessfullSchedule from "./SucessfullSchedule";

const AddoneOnOneclass = ({ isOpen }) => {
  const dispatch = useDispatch();
  const [modalopen, setmodalopen] = useState(false);
  const [errors, setError] = useState({});
  const token = localStorage.getItem("authToken");
  const [adminData, setAdminData] = useState([]);
  const [pageData, setPageData] = useState([]);
  const [acadmyData, setAcadmyData] = useState("");
  const [imageFile, setImageFile] = useState({});
  const [loading, setLoading] = useState(false);
  const [courseData, setCourseData] = useState([]);
  const [gradeData, setGradeData] = useState([]);
  const [subjectData, setSubjectData] = useState([]);
  const [teacherData, setTeacherData] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
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

  const [formData, setformData] = useState({
    Category_Name: "",
    Grade_Name: "",
    Subject_Name: "",
    Lesson_Title: "",
    Teacher: "",
    Date: "",
    Start_Time: "",
    End_Time: "",
    Reoccurring: true,
    Description: "",
  });
  const onchangeHandler = (event) => {
    const { name, value } = event.target;
    setformData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    const validationErrors = validateForm(formData);
    setError(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      setLoading(true);
      var form_data = {
        title: formData?.Lesson_Title,
        description: formData?.Description,
        date: formData?.Date,
        start_time: formData?.Start_Time,
        end_time: formData?.End_Time,
        is_reoccurring: formData?.Reoccurring,
        class_type: "OTO",
        course_id: formData?.Category_Name,
        class_id: formData?.Grade_Name,
        subject_id:formData?.Subject_Name,
        teacher_id:formData?.Teacher
      };

      addLiveClassAsync({
        dispatch: dispatch,
        body: form_data,
        token: token,
        callbackFn: (res) => {
          if (res?.data?.status === 200) {
            setformData({
              Category_Name: "",
              Grade_Name: "",
              Subject_Name: "",
              Lesson_Title: "",
              Teacher: "",
              Date: "",
              Start_Time: "",
              End_Time: "",
              Reoccurring: true,
              Description: "",
            });
            setmodalopen(!modalopen);
            setAcadmyData(res?.data?.data?.live_class)
            setLoading(false);
          } else {
            toast.error(res?.data?.message);
            setLoading(false);
          }
        },
      });
    } else {
      setError(validationErrors);
    }
  };
  return (
    <div
      className={`py-[7rem] lg:px-[5rem]  flex flex-col gap-2 px-[10px] ${
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
            Home /
            <span className="text-black font-medium"> Add One-on-One Classes</span>
          </div>
        </div>
      </div>
      <div className="lg:flex gap-14  mt-5">
        <div className=" rounded-[24px] py-[20px] px-[16px] bg-[#FFFFFF] lg:w-[80%]">
          <div className="Border ">
            <h2 className=" font-medium text-[18px]  leading-[20px] text-[#000000] pb-[20px]">
            Add One-on-One Class
            </h2>
          </div>
          <div>
            <div className=" ">
              <form>
                {/* Grade */}
                <div className="block lg:grid grid-cols-2 gap-5 mt-5 pb-[18px]">
                  <div className="">
                    <label
                      for="Category_Name"
                      className="font-medium  text-[14px] mt-5 block leading-[18px] text-[#3D3D3D] "
                    >
                      Category
                    </label>
                    <select
                      type="text"
                      name="Category_Name"
                      value={formData.Category_Name}
                      onChange={(e) => {
                        onchangeHandler(e);
                        const localGovernment = courseData.find(
                          (lg) => lg.id == e.target.value
                        );
                        setGradeData(localGovernment.classes);
                        setTeacherData(localGovernment?.teachers);
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
                    {errors.Category_Name && (
                      <span className="text-red-500 block p-[8px]">
                        {errors.Category_Name} *
                      </span>
                    )}
                  </div>
                  <div className="">
                    <label
                      for="Grade_Name"
                      className="font-medium  text-[14px] mt-5 block leading-[18px] text-[#3D3D3D] "
                    >
                      Grade
                    </label>
                    <select
                      type="text"
                      name="Grade_Name"
                      value={formData.Grade_Name}
                      onChange={(e) => {
                        onchangeHandler(e);
                        const localGovernment = gradeData.find(
                          (lg) => lg.id == e.target.value
                        );
                        setSubjectData(localGovernment.subjects);
                      }}
                      className=" w-full mt-1 text-[14px]  outline-none  border p-2 border-[#D9D9D9] h-[40px] rounded-lg"
                    >
                      <option disabled value="">
                        Please Select
                      </option>
                      {gradeData?.map((item) => {
                        return <option value={item?.id}>{item?.name}</option>;
                      })}
                    </select>
                    {errors.Grade_Name && (
                      <span className="text-red-500 block p-[8px]">
                        {errors.Grade_Name} *
                      </span>
                    )}
                  </div>
                  <div className="">
                    <label
                      for="Subject_Name"
                      className="font-medium  text-[14px] mt-2 block leading-[18px] text-[#3D3D3D] "
                    >
                      Select Subject
                    </label>
                    <select
                      type="text"
                      name="Subject_Name"
                      value={formData.Subject_Name}
                      onChange={onchangeHandler}
                      className=" w-full mt-1 text-[14px]  outline-none  border p-2 border-[#D9D9D9] h-[40px] rounded-lg"
                    >
                      <option disabled value="">
                        Please Select
                      </option>
                      {subjectData?.map((item) => {
                        return <option value={item?.id}>{item?.name}</option>;
                      })}
                    </select>
                    {errors.Subject_Name && (
                      <span className="text-red-500 block p-[8px]">
                        {errors.Subject_Name} *
                      </span>
                    )}
                  </div>
                  <div className="">
                    <label
                      for="lesson"
                      className="font-medium text-[14px] leading-[18px] text-[#3D3D3D] "
                    >
                      Lesson Title
                    </label>
                    <input
                      type="text"
                      name="Lesson_Title"
                      placeholder="Enter Details"
                      value={formData.Lesson_Title}
                      onChange={onchangeHandler}
                      className="w-full mt-1  text-[14px]  outline-none  border p-2 border-[#D9D9D9] h-[40px] rounded-lg"
                    />
                    {errors.Lesson_Title && (
                      <span className="text-red-500 block p-[8px]">
                        {errors.Lesson_Title} *
                      </span>
                    )}
                  </div>
                  <div className="">
                    <label
                      for="Teacher"
                      className="font-medium  text-[14px] mt-2 block leading-[18px] text-[#3D3D3D] "
                    >
                      Select Teacher
                    </label>
                    <select
                      type="text"
                      name="Teacher"
                      value={formData.Teacher}
                      onChange={onchangeHandler}
                      className=" w-full mt-1 text-[14px]  outline-none  border p-2 border-[#D9D9D9] h-[40px] rounded-lg"
                    >
                      <option disabled value="">
                        Please Select
                      </option>
                      {teacherData?.map((item) => {
                        return <option value={item?.id}>{item?.name}</option>;
                      })}
                    </select>
                    {errors.Teacher && (
                      <span className="text-red-500 block p-[8px]">
                        {errors.Teacher} *
                      </span>
                    )}
                  </div>
                  <div className="">
                    <label
                      for="Date"
                      className="font-medium text-[14px] leading-[18px] text-[#3D3D3D] "
                    >
                      Select Date
                    </label>
                    <input
                      type="date"
                      name="Date"
                      placeholder="Enter Details"
                      value={formData.Date}
                      onChange={onchangeHandler}
                      className="w-full mt-1  text-[14px]  outline-none  border p-2 border-[#D9D9D9] h-[40px] rounded-lg"
                    />
                    {errors.Date && (
                      <span className="text-red-500 block p-[8px]">
                        {errors.Date} *
                      </span>
                    )}
                  </div>
                  <div className="">
                    <label
                      for="Start_Time"
                      className="font-medium text-[14px] leading-[18px] text-[#3D3D3D] "
                    >
                      Select Start Time
                    </label>
                    <input
                      type="time"
                      name="Start_Time"
                      placeholder="Enter Details"
                      value={formData.Start_Time}
                      onChange={onchangeHandler}
                      className="w-full mt-1  text-[14px]  outline-none  border p-2 border-[#D9D9D9] h-[40px] rounded-lg"
                    />
                    {errors.Start_Time && (
                      <span className="text-red-500 block p-[8px]">
                        {errors.Start_Time} *
                      </span>
                    )}
                  </div>
                  <div className="">
                    <label
                      for="End_Time"
                      className="font-medium text-[14px] leading-[18px] text-[#3D3D3D] "
                    >
                      Select End Time
                    </label>
                    <input
                      type="time"
                      name="End_Time"
                      placeholder="Enter Details"
                      value={formData.End_Time}
                      onChange={onchangeHandler}
                      className="w-full mt-1  text-[14px]  outline-none  border p-2 border-[#D9D9D9] h-[40px] rounded-lg"
                    />
                    {errors.End_Time && (
                      <span className="text-red-500 block p-[8px]">
                        {errors.End_Time} *
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="Reoccurring"
                    defaultChecked={formData?.Reoccurring}
                    onChange={(e) => {
                      setformData((prevFormData) => ({
                        ...prevFormData,
                        ["Reoccurring"]: !formData?.Reoccurring,
                      }));
                    }}
                  />
                  <p className=" font-normal text-[14px] leading-[20px] text-[#101928]">
                    Activate Reoccurring Live Class
                  </p>
                </div>
                <div className="mt-4">
                  <label className=" font-medium text-[14px] leading-[18px] text-[#3D3D3D]">
                    Description
                  </label>
                  <textarea
                    name="Description"
                    onChange={onchangeHandler}
                    placeholder="Enter Message Here"
                    className=" outline-none w-full border border-[#D9D9D9] py-[10px] px-[16px] rounded-lg h-[149px]"
                  ></textarea>
                  {errors.Description && (
                    <span className="text-red-500 block p-[8px]">
                      {errors.Description} *
                    </span>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="users bg-[#ffffff] lg:mt-0 mt-5 lg:w-[50%] rounded-lg h-[50%]">
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
                // setmodalopen(!modalopen);
                handleSubmit()
              }}
            >
              Schedule Class
            </button>
          </div>
        </div>
      </div>
      {modalopen && <SucessfullSchedule data={acadmyData} />}
    </div>
  );
};

export default AddoneOnOneclass;