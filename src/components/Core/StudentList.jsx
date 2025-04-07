import React, { useEffect, useState } from "react";
import arrowleft from "../../assets/images/arrowleft.png";
import arrowright from "../../assets/images/arrowright.png";
import Custombutton from "../common/Custombutton";
import frame2 from "../../assets/images/Frame2.png";
import check from "../../assets/images/check.png";
import Modal from "../common/Modal";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import SearchButton from "../../assets/images/Searchbutton.png";
import container from "../../assets/images/container.png";
import Vector from "../../assets/images/Vector.png";
import { TailSpin } from "react-loader-spinner";
import { toast } from "react-toastify";
import { fetchUsersAsync } from "../../apis/slices/userSlice";
import Headcomponent from "../common/Headcomponent";

const StudentList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [data, setdata] = useState([]);
  const Navigate = useNavigate();
  const token = localStorage.getItem("authToken");
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const [isModalFilterOpen, setIsModalFilterOpen] = useState(false);
  const [searchValue, setVearchValue] = useState("");
  const [sortKey, setSortKey] = useState("Latest");
  const [coursesData, setCoursesData] = useState([]);

  const [selectedCourses, setSelectedCourses] = useState([]);
  const [activeUsers, setActiveUsers] = useState(true);

  const [pageData, setPageData] = useState({
    currentPage: 1,
    totalPages: 1,
    total: 0,
    limit: 10,
  });

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

  const handleFilterByStatus = (status) => {
    setActiveUsers(status);
  };

  const handleFilterByMonth = (month) => {
    setSelectedMonth(month);
    setIsModalOpen(false);
  };

  // ---------------------------------------------NEW STUFF START-------------------------------------------------------------------

  const navigate = useNavigate();
  const userList = useSelector((state) => state.users?.userList);
  const [sort, setSort] = useState({
    query_params: {
      filters: {
        // course: "",
        // status: "active",
        // location: "",
        // grade: ""
        // search: ""
      },
      sort: {
        field: "created_at",
        order: "asc",
      },
    },
    limit: 10,
    page: 1,
  });

  useEffect(() => {
    setLoading(true);
    dispatch(fetchUsersAsync({ dispatch, params: sort }));
    setLoading(false);
  }, [dispatch, sort]);

  // if (loading) return <p>Loading users...</p>;
  // if (error) return <p>Error fetching users: {error}</p>;

  // console.log('data', userList)
  const latestOnClick = () => {
    setLoading(true);
    setSortKey("Latest");

    setSort((prevSort) => ({
      ...prevSort,
      query_params: {
        ...prevSort.query_params,
        sort: {
          field: "created_at",
          order: "asc",
        },
      },
    }));
    setIsModalFilterOpen(false);
  };

  const oldestOnClick = () => {
    setLoading(true);
    setSortKey("Oldest");

    setSort((prevSort) => ({
      ...prevSort,
      query_params: {
        ...prevSort.query_params,
        sort: {
          field: "created_at",
          order: "desc",
        },
      },
    }));
    setIsModalFilterOpen(false);
  };

  const handleSearchChange = (e) => {
    const searchValue = e.trim();

    setSort((prevSort) => {
      const updatedFilters = { ...prevSort.query_params.filters };


      if (!searchValue) {
        delete updatedFilters.search;
      } else {
        updatedFilters.search = searchValue;
      }

      return {
        ...prevSort,
        query_params: {
          ...prevSort.query_params,
          filters: updatedFilters
        }
      };
    });
  };

  useEffect(() => {
    if (userList?.overview) {
      setPageData({
        currentPage: userList.overview.page || 1,
        totalPages: userList.overview.totalPages || 1,
        total: userList.overview.totalUsers || 0,
        limit: userList.overview.limit || 10,
      });
    }
  }, [userList]);

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > pageData.totalPages) {
      return;
    }
    // setPage(newPage);
    setSort((prevSort) => ({
      ...prevSort,
      page: newPage,
    }));

    setLoading(true);
    console.log("sort real", sort);
    // dispatch(fetchUsersAsync({ dispatch, params: sort }));
  };
  // ---------------------------------------------NEW STUFF END-------------------------------------------------------------------

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
            <div className="flex items-center relative lg:w-[204px] w-full">
              <input
                type="text"
                name="search"
                onChange={(e) => handleSearchChange(e.target.value)}
                className="mt-1 w-full pr-[40px] pl-[20px] outline-none bg-[#F8F8F8] text-[14px] border p-2 border-[#ECEDEE] shadows h-[32px] rounded-[16px]"
                placeholder="Search Item"
              />
              <img src={SearchButton} className="absolute w-[30px] h-[30px] top-[56%] -translate-y-1/2 right-[8px] z-50 cursor-pointer" alt="Search icon" />
            </div>
            <div
              className="w-[20px] lg:w-[24px] lg:h-[24px] cursor-pointer ml-2"
              onClick={() => setIsModalFilterOpen(true)}
            >
              <img src={Vector} alt="Vector" />
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-xl w-full p-[16px] bg-[#FFFFFF] mt-3">
        <h3 className="font-medium text-[18px] text-[#2C2E32] leading-[25px] Border pb-[15px]">
          Users/Student List
        </h3>

        <div>
          {loading ? (
            <div className="flex justify-center items-center py-8">
              <p className="text-gray-500">Loading users...</p>
            </div>
          ) : userList?.usersList?.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No users found
            </div>
          ) : (
            <div className="space-y-4">
              {userList?.usersList?.map((user) => (
                <div
                  key={user.id}
                  className="border border-gray-100 rounded-lg shadow-sm cursor-pointer"
                  onClick={() => {
                    Navigate(`/userdetails/${user?.id}`);
                  }}
                >
                  <div className="px-4 py-2 border-b border-gray-100">
                    <h6 className="font-light text-[12px] text-gray-500">
                      {user.created_at}
                    </h6>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 gap-4">
                    <div className="flex items-start sm:items-center gap-3">
                      <div className="rounded-full flex-shrink-0 flex items-center justify-center text-center p-2 w-[40px] h-[40px] bg-[#F8F5ED] text-gray-700 font-medium">
                        {user?.userName?.charAt(0)?.toUpperCase() || "U"}
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-[14px] text-gray-800 mb-1 break-words">
                          {user.userName || "Unknown User"}
                        </p>

                        {user?.email && (
                          <p className="font-normal text-[12px] text-gray-500 mb-1 truncate">
                            {user.email}
                          </p>
                        )}

                        {(user?.grade || user?.course) && (
                          <p className="font-normal text-[12px] text-gray-600 break-words">
                            {[user?.grade, user?.course].filter(Boolean).join(" / ")}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="sm:flex-shrink-0">
                      <Custombutton
                        value={user?.status}
                        img={check}
                        backgroundcolor={user?.status?.toLowerCase() === "active" ? "bg-[#E9FDEE]" : "bg-[#FFE9E9]"}
                        textcolor={user?.status?.toLowerCase() === "active" ? "text-[#27ae60]" : "text-[#c14345]"}
                        imagePosition="left"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-between items-center mt-6 mb-4">
            <Custombutton
              value="Previous"
              icon={
                pageData.currentPage > 1 ? (
                  <FaArrowLeft color="#000000" />
                ) : (
                  <FaArrowLeft color="#cccccc" />
                )
              }
              backgroundcolor="bg-[#F2F2F2]"
              textcolor={
                pageData.currentPage > 1 ? "text-[#000000]" : "text-[#cccccc]"
              }
              imagePosition="left"
              onClick={() => handlePageChange(pageData?.currentPage - 1)}
              disabled={pageData.currentPage <= 1}
            />

            <Custombutton
              value={`Page ${pageData?.currentPage} of ${pageData?.totalPages}`}
              backgroundcolor="bg-[#F2F2F2]"
              textcolor="text-[#000000]"
            />

            <Custombutton
              value="Next"
              icon={
                pageData.currentPage < pageData.totalPages ? (
                  <FaArrowRight color="#000000" />
                ) : (
                  <FaArrowRight color="#cccccc" />
                )
              }
              backgroundcolor="bg-[#F2F2F2]"
              textcolor={
                pageData.currentPage < pageData.totalPages
                  ? "text-[#000000]"
                  : "text-[#cccccc]"
              }
              imagePosition="right"
              onClick={() => {
                handlePageChange(pageData?.currentPage + 1);
              }}
              disabled={pageData.currentPage >= pageData.totalPages}
            />
          </div>
        </div>
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
    </>
  );
};

export default StudentList;
