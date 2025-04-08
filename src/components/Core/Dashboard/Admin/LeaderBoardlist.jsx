import React, { useState, useEffect } from "react";
import Custombutton from "../../../common/Custombutton";
import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import {
  GetLeaderBoardAsync,
  GetCoursesAndClassesAsync
} from "../../../../apis/slices/feedBackSlice";
import { useDispatch } from "react-redux";
import { TailSpin } from "react-loader-spinner";
import search from "../../../../assets/images/search.svg";
import { NavLink } from "react-router-dom";

const LeaderBoardlist = () => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const [studentData, setStudentData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [pagingData, setPagingData] = useState({
    currentPage: 1,
    totalPages: 1,
    total: 0
  });
  const [loading, setLoading] = useState(false);

  const [courses, setCourses] = useState([]);
  const [classes, setClasses] = useState([]);
  const [filteredClasses, setFilteredClasses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("all");
  const [selectedClass, setSelectedClass] = useState("all");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const fetchLeaderboardData = (params = {}) => {
    setLoading(true);

    const apiParams = {
      page: params.page || page,
      page_size: pageSize,
      ...(searchValue.trim() !== "" && !params.clearSearch ? { search: searchValue } : {}),
      ...(selectedCourse !== "all" ? { course_id: selectedCourse } : {}),
      ...(selectedClass !== "all" ? { class_id: selectedClass } : {}),
      ...params
    };

    if (params.clearSearch) {
      delete apiParams.search;
    }

    if (params.page) {
      setPage(params.page);
    }

    GetLeaderBoardAsync({
      dispatch: dispatch,
      data: apiParams,
      callbackFn: (res) => {
        if (res?.data?.leaderboard && Array.isArray(res?.data?.leaderboard)) {
          setStudentData(res.data.leaderboard);

          if (res.data.pagination) {
            setPagingData({
              currentPage: res.data.pagination.currentPage || 1,
              totalPages: res.data.pagination.totalPages || 1,
              total: res.data.pagination.total || 0
            });

            setPage(res.data.pagination.currentPage || 1);
          }
        } else if (res?.leaderboard && Array.isArray(res?.leaderboard)) {
          setStudentData(res.leaderboard);
        } else {
          setStudentData([]);
        }

        setLoading(false);
      },
    });
  };

  useEffect(() => {
    GetCoursesAndClassesAsync({
      dispatch: dispatch,
      data: {},
      callbackFn: (res) => {
        if (res?.data?.courses && Array.isArray(res?.data?.courses)) {
          setCourses(res.data.courses);
        }

        if (res?.data?.classes && Array.isArray(res?.data?.classes)) {
          setClasses(res.data.classes);
          setFilteredClasses(res.data.classes);
        }

        fetchLeaderboardData();
      },
    });
  }, []);

  useEffect(() => {
    if (selectedCourse === "all") {
      setFilteredClasses(classes);
    } else {
      const filtered = classes.filter(cls => cls.course_id === parseInt(selectedCourse));
      setFilteredClasses(filtered);
    }
  }, [selectedCourse, classes]);

  const handleSearch = (value) => {
    setSearchValue(value);

    if (value.trim() === "") {
      fetchLeaderboardData({ page: 1, clearSearch: true });
    }
  };

  const executeSearch = () => {
    if (searchValue.trim() !== "") {
      fetchLeaderboardData({ page: 1 });
    }
  };

  return (
    <>
      <div className="lg:flex justify-end items-center gap-5">
        <div className="flex gap-5 my-5">
          <NavLink
            to=""
            className="text-[16px] font-bold leading-[21px] text-[#B8B8B8] flex items-center"
          >
            <div className="w-[17px] h-[17px] bg-[#FB9F00] rounded-full"></div>
            <div className="my-auto ml-2">
              <select
                value={selectedCourse}
                onChange={(e) => {
                  setSelectedCourse(e.target.value);
                  fetchLeaderboardData({
                    page: 1,
                    course_id: e.target.value === "all" ? undefined : e.target.value
                  });
                }}
                className="rounded-[0.125rem] border-none w-[150px] bg-[#f4f1f1] text-sm"
              >
                <option disabled value="">
                  Please Select Course
                </option>
                <option value="all">All Courses</option>
                {courses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.name}
                  </option>
                ))}
              </select>
            </div>
          </NavLink>

          <NavLink
            to=""
            className="text-[16px] font-bold leading-[21px] w-[200px] text-[#B8B8B8] flex items-center gap-2"
          >
            <select
              value={selectedClass}
              onChange={(e) => {
                setSelectedClass(e.target.value);
                fetchLeaderboardData({
                  page: 1,
                  class_id: e.target.value === "all" ? undefined : e.target.value
                });
              }}
              className="rounded-[0.125rem] border-none bg-[#f4f1f1] w-[150px] hover:border-none text-sm"
            >
              <option disabled value="">
                Please Select Class
              </option>
              <option value="all">All Classes</option>
              {filteredClasses.map((cls) => (
                <option key={cls.id} value={cls.id}>
                  {cls.name}
                </option>
              ))}
            </select>
          </NavLink>
        </div>

        <div className="flex items-center relative lg:w-[204px]">
          <input
            type="text"
            name="search"
            className="mt-1 w-full pr-[40px] pl-[20px] outline-none bg-[#F8F8F8] text-[14px] border p-2 border-[#ECEDEE] shadows h-[32px] rounded-[16px]"
            placeholder="Search Student"
            value={searchValue}
            onChange={(e) => handleSearch(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                executeSearch();
              }
            }}
          />
          <img
            src={search}
            className="absolute w-[30px] h-[30px] top-[56%] -translate-y-1/2 right-[8px] z-50 cursor-pointer"
            alt="Search icon"
            onClick={executeSearch}
          />
        </div>
      </div>

      <div className="overflow-x-auto mt-5 rounded-t-[16px]">
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

        <table id="table-body" className="min-w-full rounded-2xl">
          <thead className="bg-[#B053F9] text-white">
            <tr>
              <th className="px-4 py-4 whitespace-nowrap font-bold text-[14px] leading-[16px] text-white">
                Position
              </th>
              <th className="px-4 py-4 whitespace-nowrap font-bold text-[14px] leading-[16px] text-white">
                Student Name
              </th>
              <th className="px-4 py-4 whitespace-nowrap font-bold text-[14px] leading-[16px] text-white">
                Course Name
              </th>
              <th className="px-4 py-4 whitespace-nowrap font-bold text-[14px] leading-[16px] text-white">
                Class Name
              </th>
              <th className="px-4 py-4 whitespace-nowrap font-bold text-[14px] leading-[16px] text-white">
                Points
              </th>
              <th className="px-4 py-4 whitespace-nowrap font-bold text-[14px] leading-[16px] text-white"></th>
            </tr>
          </thead>
          <tbody>
            {studentData.length > 0 ? (
              studentData.map((item, i) => (
                <tr className="bg-white my-4" key={i}>
                  <td className="px-4 py-5 text-center whitespace-nowrap font-semibold text-[15px] leading-[20px] text-[#000000]">
                    {item?.rank || i + 1}
                  </td>
                  <td className="px-4 py-5 text-center whitespace-nowrap font-semibold text-[15px] leading-[20px] text-[#000000]">
                    {item?.user?.name}
                  </td>
                  <td className="px-4 py-4 text-center whitespace-nowrap font-semibold text-[15px] leading-[20px] text-[#000000]">
                    {item?.class?.course?.name || "-"}
                  </td>
                  <td className="px-4 py-4 text-center whitespace-nowrap font-semibold text-[15px] leading-[20px] text-[#000000]">
                    {item?.class?.name || "-"}
                  </td>
                  <td className="px-4 py-4 text-center whitespace-nowrap font-semibold text-[15px] leading-[20px] text-[#000000]">
                    {item?.user_score || 0}
                  </td>
                  <td className="px-4 py-4 text-center whitespace-nowrap font-semibold text-[15px] leading-[20px] text-[#000000]">
                    <div
                      className="text-[#FB9F00] font-normal text-[12px] leading-[16px] cursor-pointer"
                      onClick={() => {
                        Navigate('/LeaderBoardProfile', { state: { user_id: item?.user?.id, class_id: item?.class?.id } });
                      }} >
                      View Performance
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-4 py-5 text-center whitespace-nowrap font-semibold text-[15px]">
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="user bg-white flex justify-between items-center py-3 px-4">
          <Custombutton
            onClick={() => {
              if (page > 1) {
                fetchLeaderboardData({ page: page - 1 });
              }
            }}
            value="Previous"
            icon={<FaArrowLeft />}
            backgroundcolor="bg-[#F2F2F2]"
            textcolor={page > 1 ? "text-[#000000]" : "text-[#BBBBBB]"}
            imagePosition="left"
            width="w-[115px]"
            className={page <= 1 ? "opacity-50 cursor-not-allowed" : ""}
          />

          <div className="text-[#667085] text-[12px]">
            Page {pagingData.currentPage} of {pagingData.totalPages}
          </div>

          <Custombutton
            onClick={() => {
              if (page < pagingData.totalPages) {
                fetchLeaderboardData({ page: page + 1 });
              }
            }}
            value="Next"
            icon={<FaArrowRight />}
            backgroundcolor="bg-[#F2F2F2]"
            textcolor={page < pagingData.totalPages ? "text-[#000000]" : "text-[#BBBBBB]"}
            imagePosition="right"
            width="w-[115px]"
            className={page >= pagingData.totalPages ? "opacity-50 cursor-not-allowed" : ""}
          />
        </div>
      </div >
    </>
  );
};

export default LeaderBoardlist;
