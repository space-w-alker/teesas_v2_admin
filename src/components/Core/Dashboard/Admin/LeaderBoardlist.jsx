import React, { useState, useEffect } from "react";
import Custombutton from "../../../common/Custombutton";
import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import {
  GetLeaderBoardAsync,
  GetLocalSchoolsAsync,
} from "../../../../apis/slices/feedBackSlice";
import { getCoursesAsync } from "../../../../apis/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { TailSpin } from "react-loader-spinner";
import frame from "../../../../assets/images/Frame2.png";
import search from "../../../../assets/images/search.svg";
import { NavLink } from "react-router-dom";

const LeaderBoardlist = () => {
  const Navigate = useNavigate();
  // const token = localStorage.getItem("authToken");
  // const token =
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzQxMzI4ODU3LCJleHAiOjE3NDM5MjA4NTd9.0SFMftryZT9gXW89a_GgU3H2yWfs3fs08UyhtYrG634";
  const dispatch = useDispatch();
  const [localSchools, setLocalSchools] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState("all");
  const [studentData, setStudentData] = useState([]);
  const [currentLevel, setCurrentLevel] = useState("");
  const [searchValue, setVearchValue] = useState("");

  const [pagingData, setPagingData] = useState({});

  const [loading, setLoading] = useState(false);
  const [courseData, setCourseData] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("all");
  const [schoolId, setSchoolId] = useState("all");
  const [page, setPage] = useState(1);
  // const [pageData, setPageData] = useState([]);

  useEffect(() => {
    setLoading(true);

    /*
    GetLocalSchoolsAsync({
      dispatch: dispatch,
      data: {},
      token: token,
      callbackFn: (res) => {
        setLocalSchools(res?.data?.local_school);
        setSchoolId(res?.data?.current_student?.id);
      },
    });
    
    getCoursesAsync({
      dispatch: dispatch,
      data: {},
      token: token,
      callbackFn: (res) => {
        if (res?.data?.status === 200) {
          setCourseData(res?.data?.data?.courses);
        } else {
          toast(res?.data?.message);
        }
      },
    });
    */

    // Keep the leaderboard API call
    GetLeaderBoardAsync({
      dispatch: dispatch,
      data: {
        data: "",
        filterList: "", // Filters applied
        sort: "",
        search: "",
        class_id: 71,
        filterBy: "monthly",
        page: 1,
        page_size: 20,
      },
      // token: token,
      callbackFn: (res) => {
        // Add console log to see actual response structure
        console.log("API Response:", res);

        // Check if data is in the expected format
        if (res?.data?.leaderboard && Array.isArray(res?.data?.leaderboard)) {
          setStudentData(res.data.leaderboard);
        } else if (res?.leaderboard && Array.isArray(res?.leaderboard)) {
          // Sometimes APIs wrap data differently
          setStudentData(res.leaderboard);
        } else {
          console.error("Unexpected data format:", res);
          setStudentData([]);
        }

        setLoading(false);
      },
    });
  }, []);

  return (
    <>
      <div className="lg:flex justify-end items-center gap-5">
        {/* <div className="flex gap-5 my-5">
          <NavLink
            to=""
            className="text-[16px] font-bold leading-[21px]  text-[#B8B8B8] flex items-center"
          >
            <div className="w-[17px] h-[17px] bg-[#FB9F00] rounded-full"></div>
            <div className="my-auto ml-2">
              <select
                value={selectedSchool}
                onChange={(e) => {
                  setLoading(true);
                  const str = e.target.value;
                  const parts = str.split("/");

                  const part1 = parts[0];
                  const part2 = parts[1];
                  setSelectedSchool(str);
                  setSchoolId(part2);
                  setLoading(true);
                  GetLeaderBoardAsync({
                    dispatch: dispatch,
                    data: {
                      page: 1,
                      page_size: 20,
                      ...(str == "all" ? {} : { school_id: part2 }),
                      ...(selectedCourse == "all"
                        ? {}
                        : { class_id: selectedCourse }),
                    },
                    token: token,
                    callbackFn: (res) => {
                      setStudentData(res?.data?.leaderboard || []);
                      setLoading(false);
                    },
                  });
                }}
                className="rounded-[0.125rem] border-none w-[150px] bg-[#f4f1f1]  text-sm "
              >
                <option disabled value="">
                  Please Select School
                </option>
                <option value="all">All LGAs</option>
                {localSchools?.map((localSchool) => {
                  return (
                    <>
                      <option value={localSchool.name + "/" + localSchool.id}>
                        {localSchool?.name}
                      </option>
                    </>
                  );
                })}
              </select>
            </div>
          </NavLink>

          <NavLink
            to=""
            className="text-[16px] font-bold leading-[21px] w-[200px]  text-[#B8B8B8] flex items-center gap-2"
          >
            <select
              value={selectedCourse}
              onChange={(e) => {
                setLoading(true);
                setSelectedCourse(e.target.value);
                GetLeaderBoardAsync({
                  dispatch: dispatch,
                  data: {
                    page: 1,
                    page_size: 20,
                    class_id: e.target.value,
                  },
                  token: token,
                  callbackFn: (res) => {
                    setStudentData(res?.data?.leaderboard || []);
                    setLoading(false);
                  },
                });
              }}
              className="rounded-[0.125rem] border-none bg-[#f4f1f1] w-[150px] hover:border-none  text-sm "
            >
              <option disabled value="">
                Please Select Grade
              </option>
              <option value="all">All Grade</option>
              {courseData?.map((localSchool) => {
                return (
                  <>
                    <option value={localSchool.id}>{localSchool?.name}</option>
                  </>
                );
              })}
            </select>
          </NavLink>
        </div> */}

        {/* <div className="flex items-center relative lg:w-[204px]">
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
                GetLeaderBoardAsync({
                  dispatch: dispatch,
                  data: {
                    page: 1,
                    page_size: 20,
                    search: searchValue,
                  },
                  token: token,
                  callbackFn: (res) => {
                    setStudentData(res?.data?.leaderboard || []);
                    setLoading(false);
                  },
                });
              }
            }}
          />
          <img
            src={search}
            className="absolute w-[30px] h-[30px] top-[56%]  -translate-y-1/2 right-[8px] z-50 cursor-pointer"
            alt="Search icon"
            onClick={() => {
              if (searchValue != "") {
                setLoading(true);
                GetLeaderBoardAsync({
                  dispatch: dispatch,
                  data: {
                    page: 1,
                    page_size: 20,
                    search: searchValue,
                  },
                  token: token,
                  callbackFn: (res) => {
                    setStudentData(res?.data?.leaderboard || []);
                    setLoading(false);
                  },
                });
              }
            }}
          />
        </div> */}
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
            <TailSpin color="orange" radius={5} />
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
              {/* <th className="px-4 py-4 whitespace-nowrap font-bold text-[14px] leading-[16px] text-white">
                Academy Name
              </th>
              <th className="px-4 py-4 whitespace-nowrap font-bold text-[14px] leading-[16px] text-white">
                Local Government
              </th>
              <th className="px-4 py-4 whitespace-nowrap font-bold text-[14px] leading-[16px] text-white">
                Last seen
              </th> */}
              <th className="px-4 py-4 whitespace-nowrap font-bold text-[14px] leading-[16px] text-white">
                Points
              </th>
              <th className="px-4 py-4 whitespace-nowrap font-bold text-[14px] leading-[16px] text-white"></th>
            </tr>
          </thead>
          <tbody>
            {studentData?.map((item, i) => {
              return (
                <tr className="bg-white my-4" key={i}>
                  <td className="px-4 py-5 text-center whitespace-nowrap font-semibold text-[15px] leading-[20px] text-[#000000]">
                    {item?.rank_number ?? i + 1}
                  </td>
                  <td className="px-4 py-5 text-center whitespace-nowrap font-semibold text-[15px] leading-[20px] text-[#000000]">
                    {item?.user?.name}
                  </td>
                  {/* <td className="px-4 py-4 text-center whitespace-nowrap font-semibold text-[15px] leading-[20px] text-[#000000]">

                    {item?.academy_name || "-"}
                  </td>
                  <td className="px-4 py-4 text-center whitespace-nowrap font-semibold text-[15px] leading-[20px] text-[#000000]">

                    {item?.local_government || "-"}
                  </td>
                  <td className="px-4 py-4 text-center whitespace-nowrap font-semibold text-[15px] leading-[20px] text-[#000000]">

                    {item?.last_seen || "-"}
                  </td> */}
                  <td className="px-4 py-4 text-center whitespace-nowrap font-semibold text-[15px] leading-[20px] text-[#000000]">
                    {item?.user_score || 0}
                  </td>
                  <td className="px-4 py-4 text-center whitespace-nowrap font-semibold text-[15px] leading-[20px] text-[#000000]">
                    <div
                      className="text-[#FB9F00] font-normal text-[12px] leading-[16px] cursor-pointer"
                      onClick={() => {
                        Navigate(
                          `/LeaderBoardProfile?user_id=${item?.user?.id}&class_id=${item?.class?.id}`
                        );
                      }}
                    >
                      View Performance
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="user bg-white">
          <Custombutton
            onClick={() => {
              if (page > 1) {
                setLoading(true);
                const newData = {
                  page: page - 1,
                  page_size: 10,
                };
                setPage(page - 1);
                GetLeaderBoardAsync({
                  dispatch: dispatch,
                  data: newData,
                  token: token,
                  callbackFn: (res) => {
                    setStudentData(res?.data?.leaderboard || []);
                    setLoading(false);
                  },
                });
              }
            }}
            value="Previous"
            // hidden="hidden"
            icon={<FaArrowLeft />}
            backgroundcolor="bg-[#F2F2F2]"
            textcolor="text-[#000000]"
            imagePosition="left"
            width="w-[115px]"
          />
          <div className="text-[#667085] text-[12px]">
            Page {pagingData?.currentPage || page} of{" "}
            {pagingData?.total_pages || 1}
          </div>
          <Custombutton
            onClick={() => {
              setLoading(true);
              const newData = {
                page: page + 1,
                page_size: 10,
              };
              setPage(page + 1);
              GetLeaderBoardAsync({
                dispatch: dispatch,
                data: newData,
                token: token,
                callbackFn: (res) => {
                  setStudentData(res?.data?.leaderboard || []);

                  setLoading(false);
                },
              });
            }}
            value="Next"
            // hidden="hidden"
            icon={<FaArrowRight />}
            backgroundcolor="bg-[#F2F2F2]"
            textcolor="text-[#000000]"
            imagePosition="right"
          />
        </div>
      </div>
    </>
  );
};

export default LeaderBoardlist;
