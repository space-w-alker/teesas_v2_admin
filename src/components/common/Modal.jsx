import React, { useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { CSVLink } from "react-csv";
import { FaCheck } from "react-icons/fa";

const Modal = ({
  closeModal,
  label,
  value1,
  value2,
  value3,
  onClick,
  csvData1,
  csvData2,
  closeModalWithClick1,
  closeModalWithClick2,
  closeModalWithClick3,
  coursesData,
  addSingleButton,
  addMutipleButton,
  onSelectCourse,
  onSelectStatus,
  selectedCoursesData,
  selectedStatusData,
}) => {
  const [formData, setFormData] = useState({
    Adduser: "",
  });

  const [active, Setactive] = useState(false);
  const onchangeHandler = (event) => {
    setFormData(() => ({
      ...formData,
      Adduser: event.target.value,
    }));
  };
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [activeUsers, setActiveUsers] = useState(false);

  // const handleCourseClick = (course) => {
  //   setSelectedCourses((prevSelectedCourses) => {
  //     if (prevSelectedCourses.includes(course.name)) {
  //       return prevSelectedCourses.filter((c) => c !== course.id);
  //     } else {
  //       return [...prevSelectedCourses, course.id];
  //     }
  //   });
  // };

  const handleOptionClick = (value) => {
    if (onClick) {
      onClick(value);
    }
  };

  const csvData = [
    ["firstname", "lastname", "email"],
    ["Ahmed", "Tomi", "ah@smthing.co.com"],
    ["Raed", "Labes", "rl@smthing.co.com"],
    ["Yezzi", "Min l3b", "ymin@cocococo.com"],
  ];

  const [filters, setFilters] = useState({
    courses: {
      reception: false,
      primary1: false,
      primary2: false,
      primary3: false,
      primary4: false,
      primary5: false,
      primary6: false,
      jss1: false,
      jss2: false,
      jss3: false,
    },
    status: {
      activeUsers: false,
      inactiveUsers: false,
    },
  });

  const handleCourseChange = (course) => {
    setFilters((prevState) => ({
      ...prevState,
      courses: {
        ...prevState.courses,
        [course]: !prevState.courses[course],
      },
    }));
  };

  const handleStatusChange = (status) => {
    setFilters((prevState) => ({
      ...prevState,
      status: {
        ...prevState.status,
        [status]: !prevState.status[status],
      },
    }));
  };
  const handleCheckboxChange = (category, item) => {
    setFilters((prevState) => ({
      ...prevState,
      [category]: {
        ...prevState[category],
        [item]: !prevState[category][item],
      },
    }));
  };

  const renderModalContent = () => {
    switch (label) {
      case "ADD USER":
        return (
          <div className="px-[20px]">
            <p className="font-light text-[14px] leading-[16px] text-[#4C4C4C] my-2">
              Select one of the options below
            </p>
            <div className="py-[16px] px-[10px] bg-[#FFFFFF] flex flex-col gap-4 mt-4 rounded-[24px] h-[128px]">
              <div className="flex items-center gap-[20px] mt-2 px-[10px]">
                <div
                  className="w-[24px] h-[24px] bg-[#CCCCCC] rounded-full"
                  onClick={addSingleButton}
                ></div>
                <label className="font-bold text-[16px] leading-[16px] text-[#162D3A]">
                  {value1}
                </label>
              </div>
              <div className="flex items-center gap-[20px] px-[10px]">
                <div
                  className="w-[24px] h-[24px]  bg-[#CCCCCC] rounded-full"
                  onClick={addMutipleButton}
                />
                <label className="font-bold text-[16px] leading-[16px] text-[#162D3A] ">
                  {value2}
                </label>
              </div>
            </div>
          </div>
        );

      case "Add Job Opening":
        return (
          <div className="px-[20px]">
            <p className="font-light text-[14px] leading-[16px] text-[#4C4C4C] my-2">
              Select one of the options below
            </p>
            <div className="py-[16px] px-[10px] bg-[#FFFFFF] flex flex-col gap-4 mt-4 rounded-[24px] h-[128px]">
              <div className="flex items-center gap-[20px] mt-2 px-[10px]">
                <div
                  className="w-[24px] h-[24px] bg-[#CCCCCC] rounded-full cursor-pointer"
                  onClick={addSingleButton}
                ></div>
                <label className="font-bold text-[16px] leading-[16px] text-[#162D3A]">
                  {value1}
                </label>
              </div>
              <div className="flex items-center gap-[20px] px-[10px]">
                <div
                  className="w-[24px] h-[24px] bg-[#CCCCCC] rounded-full cursor-pointer"
                  onClick={addMutipleButton}
                />
                <label className="font-bold text-[16px] leading-[16px] text-[#162D3A]">
                  {value2}
                </label>
              </div>
            </div>
          </div>
        );

      case "ADD MEDIA":
        return (
          <div className="px-[20px]">
            <p className="font-light text-[14px] leading-[16px] text-[#4C4C4C] my-2">
              Select one of the options below
            </p>
            <div className="py-[16px] px-[10px] bg-[#FFFFFF] flex flex-col gap-4 mt-4 rounded-[24px] h-[128px]">
              <div className="flex items-center gap-[20px] mt-2 px-[10px]">
                <div
                  className="w-[24px] h-[24px] bg-[#CCCCCC] rounded-full cursor-pointer"
                  onClick={addSingleButton}
                ></div>
                <label className="font-bold text-[16px] leading-[16px] text-[#162D3A]">
                  {value1}
                </label>
              </div>
              <div className="flex items-center gap-[20px] px-[10px]">
                <div
                  className="w-[24px] h-[24px] bg-[#CCCCCC] rounded-full cursor-pointer"
                  onClick={addMutipleButton}
                />
                <label className="font-bold text-[16px] leading-[16px] text-[#162D3A]">
                  {value2}
                </label>
              </div>
            </div>
          </div>
        );
      // Add this case in the renderModalContent() switch statement
      case "Add Category":
        return (
          <div className="px-[20px]">
            <p className="font-light text-[14px] leading-[16px] text-[#4C4C4C] my-2">
              Select one of the options below
            </p>
            <div className="py-[16px] px-[10px] bg-[#FFFFFF] flex flex-col gap-4 mt-4 rounded-[24px] h-[128px]">
              <div className="flex items-center gap-[20px] mt-2 px-[10px]">
                <div
                  className="w-[24px] h-[24px] bg-[#CCCCCC] rounded-full cursor-pointer"
                  onClick={addSingleButton}
                ></div>
                <label className="font-bold text-[16px] leading-[16px] text-[#162D3A]">
                  {value1}
                </label>
              </div>
              <div className="flex items-center gap-[20px] px-[10px]">
                <div
                  className="w-[24px] h-[24px] bg-[#CCCCCC] rounded-full cursor-pointer"
                  onClick={addMutipleButton}
                />
                <label className="font-bold text-[16px] leading-[16px] text-[#162D3A]">
                  {value2}
                </label>
              </div>
            </div>
          </div>
        );

      case "Add Test":
        return (
          <div className="px-[20px]">
            <p className="font-light text-[14px] leading-[16px] text-[#4C4C4C] my-2">
              Select option below
            </p>
            <div className="py-[16px] px-[10px] bg-[#FFFFFF] flex flex-col gap-4 mt-4 rounded-[24px] h-[80px]">
              <div className="flex items-center gap-[20px] mt-2 px-[10px]">
                <div
                  className="w-[24px] h-[24px] bg-[#CCCCCC] rounded-full cursor-pointer"
                  onClick={addSingleButton}
                ></div>
                <label className="font-bold text-[16px] leading-[16px] text-[#162D3A]">
                  {value1}
                </label>
              </div>
            </div>
          </div>
        );

      case "Add Class":
        return (
          <div className="px-[20px]">
            <p className="font-light text-[14px] leading-[16px] text-[#4C4C4C] my-2">
              Select one of the options below
            </p>
            <div className="py-[16px] px-[10px] bg-[#FFFFFF] flex flex-col gap-4 mt-4 rounded-[24px] h-[128px]">
              <div className="flex items-center gap-[20px] mt-2 px-[10px]">
                <div
                  className="w-[24px] h-[24px] bg-[#CCCCCC] rounded-full cursor-pointer"
                  onClick={addSingleButton}
                ></div>
                <label className="font-bold text-[16px] leading-[16px] text-[#162D3A]">
                  {value1}
                </label>
              </div>
              <div className="flex items-center gap-[20px] px-[10px]">
                <div
                  className="w-[24px] h-[24px] bg-[#CCCCCC] rounded-full cursor-pointer"
                  onClick={addMutipleButton}
                />
                <label className="font-bold text-[16px] leading-[16px] text-[#162D3A]">
                  {value2}
                </label>
              </div>
            </div>
          </div>
        );

      case "Export":
        return (
          <div className="px-[20px]">
            <p className="font-light text-[14px] leading-[16px] text-[#4C4C4C] my-2">
              Select one of the options below
            </p>
            <div className="py-[16px] px-[10px] bg-[#FFFFFF] flex flex-col gap-4 mt-4 rounded-[24px] h-[128px]">
              <CSVLink
                style={{ textDecoration: "none", color: "white" }}
                data={csvData1 ?? csvData}
                separator={";"}
                filename="User_List.csv"
              >
                <div
                  className="flex items-center gap-[20px] mt-2 px-[10px]"
                  onClick={closeModal}
                >
                  <div className="w-[24px] h-[24px] bg-[#CCCCCC] rounded-full"></div>
                  <label className="font-bold text-[16px] leading-[16px] text-[#162D3A]">
                    Users' List
                  </label>
                </div>
              </CSVLink>
              <CSVLink
                style={{ textDecoration: "none", color: "white" }}
                data={csvData2 ?? csvData}
                separator={";"}
                filename="User_Progress.csv"
              >
                <div
                  className="flex items-center gap-[20px] px-[10px]"
                  onClick={closeModal}
                >
                  <div className="w-[24px] h-[24px]  bg-[#CCCCCC] rounded-full" />
                  <label className="font-bold text-[16px] leading-[16px] text-[#162D3A]">
                    Users' Progress
                  </label>
                </div>
              </CSVLink>
            </div>
          </div>
        );
      case "Filter":
        return (
          <div className="filter lg:px-[20px] px-[10px]">
            <div className="lg:px-[20px] px-[10px] py-[20px] bg-[#FFFFFF] mt-4 rounded-[24px]">
              {/* <h3 className=" font-bold text-[16px] leading-[16px] mb-[24px]">
                Filter By Course
              </h3> */}
              {/* <div className=" md:grid lg:grid grid-cols-2 gap-5 bg-[#F5F5F5] px-[20px] py-[20px] rounded-[20px]">
                {coursesData?.map((course) => (
                  <div
                    key={course.id}
                    className="flex justify-between py-[5px] cursor-pointer"
                    onClick={() => onSelectCourse(course)}
                  >
                    <div className="font-medium text-[16px] leading-[16px] capitalize">
                      {course?.name}
                    </div>
                    <div className="relative">
                      {selectedCoursesData.includes(course?.id) ? (
                        <div className="w-[24px] h-[24px] rounded-[4px] bg-[#27AE60] relative">
                          <FaCheck className="text-white absolute top-1 left-1" />
                        </div>
                      ) : (
                        <div className="w-[24px] h-[24px] rounded-[4px] border border-[#C4C4C4]"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div> */}
              <div className="py-[16px]  px-[10px] bg-[#FFFFFF] mt-4 rounded-[24px]">
                <h3 className=" font-bold text-[16px] leading-[16px] mb-[24px]">
                  Filter By Status
                </h3>
                <div className="md:grid lg:grid grid-cols-2 gap-1  bg-[#F5F5F5]  rounded-[16px]">
                  <div
                    className="flex justify-between items-center max-sm:px-2 py-[5px] cursor-pointer"
                    onClick={() => onSelectStatus(true)}
                  >
                    <div className="px-[20px] py-[10px]  font-medium text-[16px] leading-[16px] capitalize">
                      Active Users
                    </div>
                    <div className="relative">
                      {selectedStatusData == true ? (
                        <div className="w-[24px] h-[24px] rounded-[4px] bg-[#27AE60] relative">
                          <FaCheck className="text-white absolute top-1 left-1" />
                        </div>
                      ) : (
                        <div className="w-[24px] h-[24px] rounded-[4px] border border-[#C4C4C4]"></div>
                      )}
                    </div>
                  </div>
                  <div
                    className="flex justify-between items-center py-[5px] mr-2 cursor-pointer"
                    onClick={() => onSelectStatus(false)}
                  >
                    <div className="px-[20px] py-[10px] font-medium text-[16px] leading-[16px] capitalize">
                      Inactive Users
                    </div>
                    <div className="relative">
                      {selectedStatusData == false ? (
                        <div className="w-[24px] h-[24px] rounded-[4px] bg-[#27AE60] relative">
                          <FaCheck className="text-white absolute top-1 left-1" />
                        </div>
                      ) : (
                        <div className="w-[24px] h-[24px] rounded-[4px] border border-[#C4C4C4]"></div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end items-center">
                <button
                  className="bg-[#27AE60] text-white text-[14px] px-8 py-3 rounded-lg"
                  onClick={onClick}
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        );
      case "Filter7":
        return (
          <div className="px-[20px]">
            <div className="py-[16px] px-[10px] bg-[#FFFFFF] flex flex-col gap-4 mt-4 rounded-[24px]">
              <div
                className="font-bold text-[16px] px-[10px] leading-[16px] text-[#162D3A] cursor-pointer"
                onClick={() => handleOptionClick("status")}
              >
                Filter By Status
              </div>
              <div
                className="font-bold text-[16px] px-[10px] leading-[16px] text-[#162D3A] cursor-pointer"
                onClick={() => handleOptionClick("course")}
              >
                Filter By Course
              </div>
              <div
                className="font-bold text-[16px] px-[10px] leading-[16px] text-[#162D3A] cursor-pointer"
                onClick={() => handleOptionClick("primary")}
              >
                Filter By Primary School Lesson
              </div>
              <div
                className="font-bold text-[16px] px-[10px] leading-[16px] text-[#162D3A] cursor-pointer"
                onClick={() => handleOptionClick("secondary")}
              >
                Filter By Secondary School Lesson
              </div>
              <div
                className="font-bold text-[16px] px-[10px] leading-[16px] text-[#162D3A] cursor-pointer"
                onClick={() => handleOptionClick("habit")}
              >
                Filter By 7 Habit Coaching
              </div>
              <div
                className="font-bold text-[16px] px-[10px] leading-[16px] text-[#162D3A] cursor-pointer"
                onClick={() => handleOptionClick("animation")}
              >
                Filter By Animation
              </div>
            </div>
          </div>
        );

      case "Add Subject":
        return (
          <div className="px-[20px]">
            <p className="font-light text-[14px] leading-[16px] text-[#4C4C4C] my-2">
              Select one of the options below
            </p>
            <div className="py-[16px] px-[10px] bg-[#FFFFFF] flex flex-col gap-4 mt-4 rounded-[24px] h-[128px]">
              <div className="flex items-center gap-[20px] mt-2 px-[10px]">
                <div
                  className="w-[24px] h-[24px] bg-[#CCCCCC] rounded-full cursor-pointer"
                  onClick={addSingleButton}
                ></div>
                <label className="font-bold text-[16px] leading-[16px] text-[#162D3A]">
                  {value1}
                </label>
              </div>
              <div className="flex items-center gap-[20px] px-[10px]">
                <div
                  className="w-[24px] h-[24px] bg-[#CCCCCC] rounded-full cursor-pointer"
                  onClick={addMutipleButton}
                />
                <label className="font-bold text-[16px] leading-[16px] text-[#162D3A]">
                  {value2}
                </label>
              </div>
            </div>
          </div>
        );

      case "Sort By":
        return (
          <div className="px-[20px]">
            <div className="py-[16px] px-[10px] bg-[#FFFFFF] h-[128px] flex flex-col gap-4 mt-4 rounded-[24px]">
              <div
                onClick={closeModalWithClick1}
                className="font-bold text-[16px] mt-6 px-[10px] leading-[16px] text-[#162D3A] cursor-pointer"
              >
                Ascending Order
              </div>
              <label
                onClick={closeModalWithClick2}
                className="font-bold text-[16px] px-[10px] leading-[16px] text-[#162D3A] cursor-pointer"
              >
                Descending Order
              </label>
            </div>
          </div>
        );

      case "User Details":
        return (
          <div className="px-[20px]">
            <div className="py-[16px] px-[10px] bg-[#FFFFFF] h-[128px] flex flex-col gap-4 mt-4 rounded-[24px]">
              <div
                onClick={closeModalWithClick1}
                className="font-bold text-[16px] mt-6 px-[10px] leading-[16px] text-[#162D3A] cursor-pointer"
              >
                {value1}
              </div>
              <label
                onClick={closeModalWithClick2}
                className="font-bold text-[16px] px-[10px] leading-[16px] text-[#162D3A] cursor-pointer"
              >
                {value2}
              </label>
              <label
                onClick={closeModalWithClick3}
                className="font-bold text-[16px] px-[10px] leading-[16px] text-[#162D3A] cursor-pointer"
              >
                {value3}
              </label>
            </div>
          </div >
        );

      case "ADD LIVE CLASS":
        return (
          <div className="px-[20px]">
            <p className="font-light text-[14px] leading-[16px] text-[#4C4C4C] my-2">
              Select one of the options below
            </p>
            <div className="py-[16px] px-[10px] bg-[#FFFFFF] flex flex-col gap-4 mt-4 rounded-[24px] h-[128px]">
              <div className="flex items-center gap-[20px] mt-2 px-[10px]">
                <div
                  className="w-[24px] h-[24px] bg-[#CCCCCC] rounded-full cursor-pointer"
                  onClick={addSingleButton}
                ></div>
                <label className="font-bold text-[16px] leading-[16px] text-[#162D3A]">
                  {value1}
                </label>
              </div>
              <div className="flex items-center gap-[20px] px-[10px]">
                <div
                  className="w-[24px] h-[24px] bg-[#CCCCCC] rounded-full cursor-pointer"
                  onClick={addMutipleButton}
                />
                <label className="font-bold text-[16px] leading-[16px] text-[#162D3A]">
                  {value2}
                </label>
              </div>
            </div>
          </div>
        );

      default:
        return <p>No content available</p>;
    }
  };

  return (
    <div>
      <Popup
        open={true}
        closeOnDocumentClick={false}
        onClose={closeModal}
        position="center center"
      >
        <div className=" pb-[20px] pt-2 bg-[#EFF6F1] overflow-y-scroll">
          <div className="flex justify-end cursor-pointer">
            <IoIosCloseCircleOutline
              onClick={closeModal}
              className="text-[20px]"
            />
          </div>
          <div>
            <h2
              className="font-medium pl-[20px] text-[18px] leading-[20px] text-[#162D3A]"
              style={{ display: label == "User Details" ? "none" : "block" }}
            >
              {label}
            </h2>
            {renderModalContent()}
          </div>
        </div>
      </Popup>
    </div>
  );
};

export default Modal;
