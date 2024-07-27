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
  const token = localStorage.getItem("authToken");
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
    GetLocalSchoolsAsync({
      dispatch: dispatch,
      data: {},
      token: token,
      callbackFn: (res) => {
        setLocalSchools(res?.data?.local_school);
        setSchoolId(res?.data?.current_student?.id);
        // setLoading(false)
      },
    });
    getCoursesAsync({
      dispatch: dispatch,
      data: {},
      token: token,
      callbackFn: (res) => {
        if (res?.data?.status === 200) {
          setCourseData(res?.data?.data?.courses);
          // setLoading(false);
        } else {
          toast(res?.data?.message);
          // setLoading(false);
        }
      },
    });
    // setLoading(true);
    GetLeaderBoardAsync({
      dispatch: dispatch,
      data: {
        page: 1,
        page_size: 20,
      },
      token: token,
      callbackFn: (res) => {
        setStudentData(res?.data?.users);
        setCurrentLevel(res?.data?.level);
        setPagingData(res?.data?.paging);
        setLoading(false);
      },
    });
  }, []);

  return (
    <>
      <div className="lg:flex justify-end items-center gap-5">
        <div className="flex gap-5 my-5">
          {/*<NavLink
            to=""
            className=" text-[16px] font-bold leading-[21px]  text-[#B8B8B8]"
          >
            ALL
          </NavLink>*/}

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

                  const part1 = parts[0]; // "Esan North East"
                  const part2 = parts[1]; // "4"
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
                      setStudentData(res?.data?.users);
                      setCurrentLevel(res?.data?.level);
                      setPagingData(res?.data?.paging);
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
                    // ...(schoolId == 'all' ? {} : { school_id: schoolId }),
                  },
                  token: token,
                  callbackFn: (res) => {
                    setStudentData(res?.data?.users);
                    setCurrentLevel(res?.data?.level);
                    setPagingData(res?.data?.paging);
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
        </div>
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
                GetLeaderBoardAsync({
                  dispatch: dispatch,
                  data: {
                    page: 1,
                    page_size: 20,
                    search: searchValue,
                    // ...(schoolId == 'all' ? {} : { school_id: schoolId }),
                  },
                  token: token,
                  callbackFn: (res) => {
                    setStudentData(res?.data?.users);
                    setCurrentLevel(res?.data?.level);
                    setPagingData(res?.data?.paging);
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
                const newData = {
                  page: 1,
                  page_size: 10,
                };
                GetLeaderBoardAsync({
                  dispatch: dispatch,
                  data: {
                    page: 1,
                    page_size: 20,
                    search: searchValue,
                    // ...(schoolId == 'all' ? {} : { school_id: schoolId }),
                  },
                  token: token,
                  callbackFn: (res) => {
                    setStudentData(res?.data?.users);
                    setCurrentLevel(res?.data?.level);
                    setPagingData(res?.data?.paging);
                    setLoading(false);
                  },
                });
              }
            }}
          />
        </div>
      </div>

      <div class="overflow-x-auto mt-5  rounded-t-[16px]  ">
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

        <table id="table-body" class=" min-w-full rounded-2xl">
          <thead class="bg-[#B053F9] text-white">
            <tr>
              <th class="px-4 py-4 whitespace-nowrap font-bold text-[14px] leading-[16px] text-white">
                Position
              </th>
              <th class="px-4 py-4 whitespace-nowrap font-bold text-[14px] leading-[16px] text-white">
                Student Name
              </th>
              <th class="px-4 py-4 whitespace-nowrap font-bold text-[14px] leading-[16px] text-white">
                Academy Name
              </th>
              <th class="px-4 py-4 whitespace-nowrap font-bold text-[14px] leading-[16px] text-white">
                Local Government
              </th>
              <th class="px-4 py-4 whitespace-nowra font-bold text-[14px] leading-[16px] text-whitep">
                Last seen
              </th>
              <th class="px-4 py-4 whitespace-nowrap font-bold text-[14px] leading-[16px] text-white">
                Points
              </th>
              <th class="px-4 py-4 whitespace-nowrap font-bold text-[14px] leading-[16px] text-white"></th>
            </tr>
          </thead>
          <tbody>
            {studentData?.map((user, i) => {
              return (
                <tr class="bg-white my-4">
                  <td class="px-4 py-5 text-center whitespace-nowrap  font-semibold text-[15px] leading-[20px] text-[#000000] ">
                    {user?.rank}
                  </td>
                  <td class="px-4 py-5 text-center whitespace-nowrap  font-semibold text-[15px] leading-[20px] text-[#000000] ">
                    {user?.first_name} {user?.last_name}
                  </td>
                  <td class="px-4 py-4 text-center whitespace-nowrap  font-semibold text-[15px] leading-[20px] text-[#000000] ">
                    {user?.academies?.academy_name}
                  </td>
                  <td class="px-4 py-4 text-center whitespace-nowrap  font-semibold text-[15px] leading-[20px] text-[#000000] ">
                    {user?.academies?.schools?.name}
                  </td>
                  <td class="px-4 py-4 text-center whitespace-nowrap  font-semibold text-[15px] leading-[20px] text-[#000000] ">
                    {user?.updated_at}
                  </td>
                  <td class="px-4 py-4 text-center whitespace-nowrap  font-semibold text-[15px] leading-[20px] text-[#000000] ">
                    {" "}
                    {user?.total_points ? user?.total_points : 0}
                  </td>
                  <td class="px-4 py-4 text-center whitespace-nowrap  font-semibold text-[15px] leading-[20px] text-[#000000] ">
                    <div
                      className="text-[#FB9F00] font-normal text-[12px] leading-[16px] cursor-pointer"
                      onClick={() => {
                        Navigate(`/LeaderBoardProfile?id=${user?.id}`);
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
                getuserAsync({
                  dispatch: dispatch,
                  body: newData,
                  token: token,
                  callbackFn: (res) => {
                    if (res?.data?.status === 200) {
                      setStudentData(res?.data?.users);
                      setCurrentLevel(res?.data?.level);
                      setPagingData(res?.data?.paging);
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
            Page {pagingData?.currentPage} of {pagingData?.total_pages}
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
                  setStudentData(res?.data?.users);
                  setCurrentLevel(res?.data?.level);
                  setPagingData(res?.data?.paging);
                  setLoading(false);
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
      </div>
    </>
  );
};

export default LeaderBoardlist;
