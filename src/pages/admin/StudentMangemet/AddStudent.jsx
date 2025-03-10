import React, { useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { reserveLiveClassAsync, getLiveClassesAsync } from "../../../apis/slices/liveClassSlice";
import Select from "react-select";
import { useDispatch } from "react-redux";
import {
  getuserAsync,
  userAsync,
  getCoursesAsync,
} from "../../../apis/slices/authSlice";

import { toast } from "react-toastify"

const SearchableDropdown = ({
  label,
  name,
  value,
  onChange,
  options,
  error,
  onSearch,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSearch = (event) => {
    const value = event.target.value;

    onChange(event);
    if (value != "") {
      setIsOpen(true)
      onSearch(value);
    }

  };

  return (
    <div className="relative">
      <label
        htmlFor={name}
        className="font-medium text-[14px] leading-[18px] text-[#3D3D3D]"
      >
        {label}
      </label>
      <input
        type="text"
        name={name}
        placeholder="Enter Details"
        value={value}
        onChange={handleSearch}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setTimeout(() => setIsOpen(false), 100)}
        className="w-full mt-1 text-[14px] outline-none border p-2 border-[#D9D9D9] h-[40px] rounded-lg"
      />
      {error && <span className="text-red-500 block p-[8px]">{error}</span>}
      {isOpen && options?.length > 0 && (
        <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded max-h-48 overflow-y-auto">
          {options.map((option, index) => {
            return (
              <li
                key={index}
                onMouseDown={() => {
                  onChange({ target: { name, value: name == "Student_Name" ? (option?.first_name + " " + option?.id) : (option?.title + " " + option?.id) } });
                  setIsOpen(false);
                }}
                className="px-4 py-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100"
              >
                {name == "Student_Name" ? (option?.first_name + " " + option?.last_name) : (option?.title)}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  );
};

const AddStudent = ({ isOpen }) => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("authToken");
  const [errors, setError] = useState({});
  const [formData, setformData] = useState({
    Student_Name: "",
    Live_Class_Name: "",
  });
  const [studentOptions, setStudentOptions] = useState([]);
  const [liveClassOptions, setLiveClassOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    const validationErrors = validateLiveClass(formData);
    setError(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      setLoading(true);
      const parts = formData?.Student_Name.split(' ');

      const parts2 = formData?.Live_Class_Name.split(' ');
      var form_data = {
        user_id: parts[1],
        class_id: parts2[2],
      };

      reserveLiveClassAsync({
        dispatch: dispatch,
        body: form_data,
        token: token,
        callbackFn: (res) => {
          if (res?.data?.status === 200) {
            setformData({
              Student_Name: "",
              Live_Class_Name: "",
            });
            setStudentOptions([]);
            setStudentOptions([]);
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

  const validateLiveClass = (formData) => {

    const errors = {};


    if (!formData.Student_Name) {
      errors.Student_Name = 'Student Name is required';
    }
    if (!formData.Live_Class_Name) {
      errors.Live_Class_Name = 'Live Class  is required';
    }

    return errors;
  };

  const onchangeHandler = (event) => {
    const { name, value } = event.target;
    setformData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const fetchStudentNames = async (query) => {
    // setLoading(true);
    const newData = {
      page: 1,
      page_size: 100,
      search: query,
    };
    await getuserAsync({
      dispatch: dispatch,
      body: newData,
      token: token,
      callbackFn: (res) => {
        if (res?.data?.status === 200) {
          setStudentOptions(res?.data?.data?.users);
        } else {
          alert(res?.data?.message);
          // setLoading(false);
        }
      },
    });
  };

  const fetchLiveClassNames = async (query) => {
    const newData = {
      page: 1,
      page_size: 100,
      search: query,
    };
    getLiveClassesAsync({
      dispatch: dispatch,
      data: newData,
      token: token,
      callbackFn: (res) => {
        setLiveClassOptions(res?.data?.data?.live_classes);
      },
    });
  };
  return (
    <div
      className={`py-[7rem] lg:px-[5rem]  flex flex-col gap-2 px-[10px] ${isOpen ? "lg:ml-[260px]" : ""
        }`}
    >
      <div className="flex justify-start  items-center lg:gap-3">
        <FaChevronLeft />
        <div>
          <div className=" font-normal text-[14px] lg:text-[16px] leading-[20px] text-[#B6B6B6]">
            Home / Practice{" "}
            <span className="text-black font-medium">
              Add Live Class Student
            </span>
          </div>
        </div>
      </div>
      <div className="lg:flex gap-14 ">
        <div className=" rounded-[24px] py-[20px] px-[16px] bg-[#FFFFFF] lg:w-[80%]">
          <div className="Border ">
            <h2 className=" font-medium text-[18px] mt-5  leading-[20px] text-[#000000] pb-[20px]">
              Add Live Class Student
            </h2>
          </div>
          <div>
            <div className="block lg:grid grid-cols-2 gap-5 mt-5 pb-[18px]">
              <div className="">
                <SearchableDropdown
                  label="Student Name"
                  name="Student_Name"
                  value={formData.Student_Name}
                  onChange={onchangeHandler}
                  onSearch={fetchStudentNames}
                  options={studentOptions}
                  error={errors.Student_Name}
                />
              </div>
              <div className="">
                <SearchableDropdown
                  label="Select Live Class"
                  name="Live_Class_Name"
                  value={formData.Live_Class_Name}
                  onChange={onchangeHandler}
                  onSearch={fetchLiveClassNames}
                  options={liveClassOptions}
                  error={errors.Live_Class_Name}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="users bg-[#ffffff] lg:mt-0 mt-5 lg:w-[50%] rounded-lg h-[50%]">
          <h2 className="text-[18px]  leading-[20px]  pb-[10px] text-[#000000] font-medium">
            Summary
          </h2>
          <div className="rounded-2xl bg-[#EFF6F1] p-2">
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
              className=" h-[32px] rounded-lg text-center  w-[200px]  text-white bg-[#27AE60]"
              onClick={() => {
                handleSubmit()
              }}
            >
              Add Student
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddStudent;
