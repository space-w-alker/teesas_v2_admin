import React, { useEffect, useState } from "react";
import arrowleft from "../../assets/images/arrowleft.png";
import arrowright from "../../assets/images/arrowright.png";
import Custombutton from "../common/Custombutton";
import frame2 from "../../assets/images/Frame2.png";
import check from "../../assets/images/check.png";
import Modal from "../common/Modal";
import {
  getuserAsync,
  userAsync,
  getCoursesAsync,
} from "../../apis/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import SearchButton from "../../assets/images/Searchbutton.png";
import container from "../../assets/images/container.png";
import Vector from "../../assets/images/Vector.png";
import { TailSpin } from "react-loader-spinner";
import { toast } from "react-toastify";

const StudentList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [data, setdata] = useState([]);
  const Navigate = useNavigate();
  const token = localStorage.getItem("authToken");
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [pageData, setPageData] = useState({});
  const [loading, setLoading] = useState(false);
  const [isModalFilterOpen, setIsModalFilterOpen] = useState(false);
  const [searchValue, setVearchValue] = useState("");
  const [sortKey, setSortKey] = useState("Latest");
  const [coursesData, setCoursesData] = useState([]);

  const [selectedCourses, setSelectedCourses] = useState([]);
  const [activeUsers, setActiveUsers] = useState(true);

  const handleModalClose = () => {
    setIsModalOpen(false);
    setIsModalFilterOpen(false);
  };

  const handleFilterByCourse = (course) => {
    setSelectedCourses((prevSelectedCourses) => {
      if (prevSelectedCourses.includes(course.id)) {
        return prevSelectedCourses.filter((c) => c !== course.id);
      } else {
        return [...prevSelectedCourses, course.id];
      }
    });
  };

  const handleApply = () => {
    setLoading(true);
    const newData = {
      page: 1,
      page_size: 10,
      sort: sortKey,
      course_id: selectedCourses,
      status: activeUsers ? "Active" : "Inactive",
    };
    getuserAsync({
      dispatch: dispatch,
      body: newData,
      token: token,
      callbackFn: (res) => {
        if (res?.data?.status === 200) {
          setdata(res?.data?.data?.users);
          setPageData(res?.data?.data?.paging);
          setLoading(false);
          handleModalClose();
        } else {
          alert(res?.data?.message);
          setLoading(false);
        }
      },
    });
  };

  // const handleFilterByCourse = (course) => {
  //   setSelectedCourse(course);
  //   setIsModalOpen(false);
  // };

  const handleFilterByStatus = (status) => {
    setActiveUsers(status);
  };

  const handleFilterByMonth = (month) => {
    setSelectedMonth(month);
    setIsModalOpen(false);
  };
  const latestOnClick = () => {
    setLoading(true);
    setSortKey("Latest");
    const newData = {
      page: 1,
      page_size: 10,
      sort: "Latest",
      course_id: selectedCourses,
      status: activeUsers ? "Active" : "Inactive",
    };
    getuserAsync({
      dispatch: dispatch,
      body: newData,
      token: token,
      callbackFn: (res) => {
        if (res?.data?.status === 200) {
          setdata(res?.data?.data?.users);
          setPageData(res?.data?.data?.paging);
          setLoading(false);
          handleModalClose();
        } else {
          alert(res?.data?.message);
          setLoading(false);
        }
      },
    });
  };

  const oldestOnClick = () => {
    setLoading(true);
    setSortKey("Oldest");
    const newData = {
      page: 1,
      page_size: 10,
      sort: "Oldest",
      course_id: selectedCourses,
      status: activeUsers ? "Active" : "Inactive",
    };
    getuserAsync({
      dispatch: dispatch,
      body: newData,
      token: token,
      callbackFn: (res) => {
        if (res?.data?.status === 200) {
          setdata(res?.data?.data?.users);
          setPageData(res?.data?.data?.paging);
          setLoading(false);
          setPage(1);
          handleModalClose();
        } else {
          alert(res?.data?.message);
          setLoading(false);
        }
      },
    });
  };
  useEffect(() => {
    // setLoading(true);
    const newData = {
      page: 1,
      page_size: 10,
    };
    // getuserAsync({
    //   dispatch: dispatch,
    //   body: newData,
    //   token: token,
    //   callbackFn: (res) => {
    //     if (res?.data?.status === 200) {
    //       setdata(res?.data?.data?.users);
    //       setPageData(res?.data?.data?.paging);
    //       setLoading(false);
    //       setPage(1);
    //     } else {
    //       alert(res?.data?.message);
    //       setLoading(false);
    //     }
    //   },
    // });
    // setLoading(true);
    // getCoursesAsync({
    //   dispatch: dispatch,
    //   body: {},
    //   token: token,
    //   callbackFn: (res) => {
    //     if (res?.data?.status === 200) {
    //       setCoursesData(res?.data?.data?.courses);
    //       setLoading(false);
    //     } else {
    //       alert(res?.data?.message);
    //       setLoading(false);
    //     }
    //   },
    // });
  }, [dispatch, token]);

  return (
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
          <TailSpin color="red" radius={5} />
        </div>
      )}
      <div className={`flex justify-end items-center relative mt-3`}>
        <div className="flex items-center relative">
          <div className="h-[60px] lg:px-[8px] flex items-center mt-[5px]">
            <div className="flex items-center relative lg:w-[204px]">
              <input
                type="text"
                name="search"
                className="mt-1 w-full pr-[40px] pl-[20px] outline-none bg-[#F8F8F8] text-[14px] border p-2 border-[#ECEDEE] shadows h-[32px] rounded-[16px]"
                placeholder="Search Item"
                value={searchValue}
                onChange={(e) => {
                  setVearchValue(e.target.value);
                  if (e.target.value == "") {
                    setLoading(true);
                    const newData = {
                      page: 1,
                      page_size: 10,
                      course_id: selectedCourses,
                      status: activeUsers ? "Active" : "Inactive",
                      sort: sortKey,
                    };
                    getuserAsync({
                      dispatch: dispatch,
                      body: newData,
                      token: token,
                      callbackFn: (res) => {
                        if (res?.data?.status === 200) {
                          setdata(res?.data?.data?.users);
                          setPageData(res?.data?.data?.paging);
                          setLoading(false);
                          setPage(1);
                        } else {
                          alert(res?.data?.message);
                          setLoading(false);
                        }
                      },
                    });
                  }
                }}
              />
              <img
                src={SearchButton}
                className="absolute w-[30px] h-[30px] top-[56%]  -translate-y-1/2 right-[8px] z-50 cursor-pointer"
                alt="Search icon"
                onClick={() => {
                  if (searchValue != "") {
                    setLoading(true);
                    const newData = {
                      page: 1,
                      page_size: 10,
                      search: searchValue,
                      course_id: selectedCourses,
                      status: activeUsers ? "Active" : "Inactive",
                      sort: sortKey,
                    };
                    getuserAsync({
                      dispatch: dispatch,
                      body: newData,
                      token: token,
                      callbackFn: (res) => {
                        if (res?.data?.status === 200) {
                          setdata(res?.data?.data?.users);
                          setPageData(res?.data?.data?.paging);
                          setLoading(false);
                          setPage(1);
                        } else {
                          alert(res?.data?.message);
                          setLoading(false);
                        }
                      },
                    });
                  }
                }}
              />
            </div>
            <div
              className="w-[20px] lg:w-[24px] lg:h-[24px] cursor-pointer ml-2"
              onClick={() => setIsModalFilterOpen(true)}
            >
              <img src={Vector} alt="Vector" />
            </div>
            <div className="w-[30px] lg:w-[34px] lg:h-[40px] ml-2">
              <img src={container} alt="Container" />
            </div>
          </div>
        </div>
      </div>
      <div className="py-[2px]  rounded-[18px] bg-[#FFFFFF]  mt-3 ">
        <div className="user">
          <h2 className="text-[22px]  leading-6 text-[#2C2E32] font-medium">
            Users/Student List
          </h2>
          <Custombutton
            value="Filter"
            img={frame2}
            backgroundcolor="bg-[#F2F2F2]"
            textcolor="text-[#000000]"
            imagePosition="right"
            onClick={() => setIsModalOpen(true)}
          />
        </div>
        <div className="">
          <ul>
            {data.map((user) => (
              <li
                key={user.id}
                className="cursor-pointer"
                onClick={() => {
                  Navigate(`/userDetails?id=${user?.id}`);
                }}
              >
                <div className="px-[18px] py-[10px]">
                  <h6 className=" font-light text-[12px] leading-[13px] text-[#767676] ">
                    {user.created_at}
                  </h6>
                </div>
                <div className="flex items-center justify-between p-5 max-sm:flex-col  ">
                  <div className="flex  items-center gap-3 px-[18px] ">
                    <div className=" rounded-full text-center p-2 w-[40px] h-[40px] bg-[#F8F5ED]">
                      {user?.first_name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="flex pl-[20px] items-center  gap-2">
                        <p>{user.first_name}</p>
                        <p>{user.last_name}</p>
                      </div>
                      <div className="pl-[20px]  flex flex-col gap-[10px]">
                        <p className=" font-normal text-[#555555] text-[12px] leading-[15px]">
                          {user?.userCourses[0]?.classes?.name}
                        </p>
                        <div className="flex  items-center   h-[16px]  bg-[#F2F2F2] ">
                          {/* <img
                      className="h-[11px]"
                      src={item.icon2}
                      alt="Icon 2"
                    /> */}
                          <p className=" font-bold w-full text-[12px] leading-[15px] text-[#555555]">
                            {user?.academies?.academy_name} /{" "}
                            {user?.academies?.sentorial}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="max-sm:mt-5 ">
                    <Custombutton
                      value="Status"
                      img={check}
                      backgroundcolor="bg-[#ede1d5]"
                      textcolor="text-[#EA8527]"
                      imagePosition="left"
                    />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="user">
          <Custombutton
            onClick={() => {
              if (page > 1) {
                setLoading(true);
                const newData = {
                  page: page - 1,
                  page_size: 10,
                  course_id: selectedCourses,
                  status: activeUsers ? "Active" : "Inactive",
                  sort: sortKey,
                  ...(searchValue == '' ? {} : {  search: searchValue, })
                };
                setPage(page - 1);
                getuserAsync({
                  dispatch: dispatch,
                  body: newData,
                  token: token,
                  callbackFn: (res) => {
                    if (res?.data?.status === 200) {
                      setdata(res?.data?.data?.users);
                      setPageData(res?.data?.data?.paging);
                      setLoading(false);
                    } else {
                      alert(res?.data?.message);
                      setLoading(false);
                    }
                  },
                });
              }
            }}
            value="Previous"
            hidden="hidden"
            icon={<FaArrowLeft />}
            backgroundcolor="bg-[#F2F2F2]"
            textcolor="text-[#000000]"
            imagePosition="left"
            width="w-[115px]"
          />
          <div className="text-[#667085] text-[12px]">
            Page {pageData?.currentPage} of {pageData?.total_pages}
          </div>
          <Custombutton
            onClick={() => {
              if(pageData?.currentPage < pageData.total_pages)
              setLoading(true);
              const newData = {
                page: page + 1,
                page_size: 10,
                course_id: selectedCourses,
                status: activeUsers ? "Active" : "Inactive",
                sort: sortKey,
                ...(searchValue == '' ? {} : {  search: searchValue, })
              };
              setPage(page + 1);
              getuserAsync({
                dispatch: dispatch,
                body: newData,
                token: token,
                callbackFn: (res) => {
                  if (res?.data?.status === 200) {
                    setdata(res?.data?.data?.users);
                    setPageData(res?.data?.data?.paging);
                    setLoading(false);
                  } else {
                    alert(res?.data?.message);
                    setLoading(false);
                  }
                },
              });
            }}
            value="Next"
            hidden="hidden"
            icon={<FaArrowRight />}
            backgroundcolor="bg-[#F2F2F2]"
            textcolor="text-[#000000]"
            imagePosition="right"
          />
        </div>
        {isModalOpen && (
          <Modal
            closeModal={handleModalClose}
            label="Filter"
            coursesData={coursesData}
            onSelectCourse={handleFilterByCourse}
            onSelectStatus={handleFilterByStatus}
            onClick={handleApply}
            selectedCoursesData={selectedCourses}
            selectedStatusData={activeUsers}
          />
        )}

        {isModalFilterOpen && (
          <Modal
            closeModalWithClick1={latestOnClick}
            closeModalWithClick2={oldestOnClick}
            closeModal={handleModalClose}
            label="Sort By"
          />
        )}
      </div>
    </>
  );
};

export default StudentList;
