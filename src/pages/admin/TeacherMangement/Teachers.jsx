import React, { useState, useEffect } from "react"; import UserCard from '../../../components/common/UserCard'
import TeacherList from '../../../components/Core/Dashboard/Admin/TeacherList'
import { FaChevronLeft } from "react-icons/fa";

import Custombutton from "../../../components/common/Custombutton";
import arrowleft from "../../../assets/images/arrowleft.png";
import arrowright from "../../../assets/images/arrowright.png";
import bookopen from "../../../assets/images/bookopen.png";
import sharp from "../../../assets/images/check.png";
import Headcomponent from "../../../components/common/Headcomponent";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getLiveClassTeachersAsync } from "../../../apis/slices/teacherSlice";
import SearchButton from "../../../assets/images/Searchbutton.png";
import Vector from "../../../assets/images/Vector.png";
import container from "../../../assets/images/container.png";
import { TailSpin } from "react-loader-spinner";



const Teachers = ({ isOpen }) => {
  const Navigate = useNavigate();
  const token = localStorage.getItem("authToken");
  const dispatch = useDispatch();
  const [adminData, setAdminData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageData, setPageData] = useState([]);
  const [searchValue, setVearchValue] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getLiveClassTeachersAsync({
      dispatch: dispatch,
      data: {
        page: 1,
        page_size: 10,
      },
      token: token,
      callbackFn: (res) => {
        if (res?.data?.status === 200) {
          setAdminData(res?.data?.data?.teachers);
          setPageData(res?.data?.data?.paging);
          setLoading(false);
        } else {
          setLoading(false);
          alert(res?.data?.message);
        }
      },
    });
  }, []);
  return (
    <div className={`py-[7rem] lg:px-[5rem]  flex flex-col gap-2 px-[10px] ${isOpen ? "lg:ml-[260px]" : ""}`}>
      {loading && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 9999,
          }}
        >
          <TailSpin color="orange" radius={5} />
        </div>
      )}
      <div className='flex justify-start  items-center lg:gap-3'>
        <FaChevronLeft />
        <div>
          <div className=' font-normal text-[14px] lg:text-[16px] leading-[20px] text-[#B6B6B6]'>Home / <span className='text-black font-medium'>Live Classes</span></div>
        </div>
      </div>
      <h2 className=" font-bold text-[22px]   leading-[28px] text-[#2C2E32]  mt-6">
        Live Classes - Teachers
      </h2>
      <div className="mt-5">
        <UserCard
          label="Total Live Classes"
          height="h-[111px]"
          backgroundcolor="bg-[#FFFFFF]"
          value={pageData?.total}
        />
      </div>
      <div className=" flex  justify-end mt-4 ">
        <button className="text-[14px] leading-[20px] text-center font-bold  w-[170px] h-[40px] rounded-lg py-[7px] px-[12px] bg-[#27AE60] text-white" onClick={() => Navigate('/AddLiveClass')}>
          + Add Class
        </button>
      </div>
      <div className="bg-[#FFFFFF] p-4 mt-5 rounded-[18px]">
        <div className="Border">
          <div className={`flex justify-between items-center relative mt-3`}>
            <div>
              <h2 className="font-medium text-[16px] lg:text-[18px] leading-[25px] text-[#2C2E32]">
                Teachers List
              </h2>
            </div>
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
                        };
                        getLiveClassTeachersAsync({
                          dispatch: dispatch,
                          data: newData,
                          token: token,
                          callbackFn: (res) => {
                            if (res?.data?.status === 200) {
                              setAdminData(res?.data?.data?.teachers);
                              setPageData(res?.data?.data?.paging);
                              setPage(1);
                              setLoading(false);
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
                        };
                        getLiveClassTeachersAsync({
                          dispatch: dispatch,
                          data: newData,
                          token: token,
                          callbackFn: (res) => {
                            if (res?.data?.status === 200) {
                              setAdminData(res?.data?.data?.teachers);
                              setPageData(res?.data?.data?.paging);
                              setPage(1);
                              setLoading(false);
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
                // onClick={() => setIsModalFilterOpen(true)}
                >
                  <img src={Vector} alt="Vector" />
                </div>
                <div className="w-[30px] lg:w-[34px] lg:h-[40px] ml-2">
                  <img src={container} alt="Container" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <ul>
            {adminData.map((user) => (
              <li key={user.id}>
                <div
                  className="flex justify-between gap-4 items-center mt-3"
                  onClick={() =>
                    Navigate(`/Teacher/TeacherDetails?id=${user?.teacher?.id}`)
                  }
                >
                  <div className="flex  items-center gap-3 px-[18px] ">
                    <div className=" rounded-full text-center p-2 w-[40px] h-[40px] bg-[#F8F5ED]">
                      {user?.teacher?.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="flex pl-[20px] items-center  gap-2">
                        <p>{user?.teacher?.name}</p>
                      </div>
                      <div className="pl-[20px]  flex flex-col gap-[10px]">
                        <p className=" font-normal text-[#555555] text-[12px] leading-[15px]">
                          {user?.class?.name}
                        </p>
                        <div className="flex  items-center   h-[16px]  bg-[#F2F2F2] ">
                          <p className=" font-bold w-full text-[12px] leading-[15px] text-[#555555]">
                            {user?.course?.name} /{" "}
                            {user?.subject?.name}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="max-sm:mt-5 ">
                    <Custombutton
                      value="Status"
                      img={sharp}
                      backgroundcolor="bg-[#ede1d5]"
                      textcolor="text-[#EA8527]"
                      imagePosition="left"
                    />
                  </div>
                </div>
              </li>
            ))}
          </ul>
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
                  getLiveClassTeachersAsync({
                    dispatch: dispatch,
                    data: newData,
                    token: token,
                    callbackFn: (res) => {
                      if (res?.data?.status === 200) {
                        setAdminData(res?.data?.data?.teachers);
                        setPageData(res?.data?.data?.paging);
                        setLoading(false);
                      } else {
                        setLoading(false);
                        alert(res?.data?.message);
                      }
                    },
                  });
                }
              }}
              value="Previous"
              hidden="hidden"
              icon={<arrowleft />}
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
                if (pageData?.currentPage != pageData?.total_pages)
                  setLoading(true);
                const newData = {
                  page: page + 1,
                  page_size: 10,
                };
                setPage(page + 1);
                getLiveClassTeachersAsync({
                  dispatch: dispatch,
                  data: newData,
                  token: token,
                  callbackFn: (res) => {
                    if (res?.data?.status === 200) {
                      setAdminData(res?.data?.data?.teachers);
                      setPageData(res?.data?.data?.paging);
                      setLoading(false);
                    } else {
                      setLoading(false);
                      alert(res?.data?.message);
                    }
                  },
                });
              }}
              value="Next"
              hidden="hidden"
              icon={<arrowRight />}
              backgroundcolor="bg-[#F2F2F2]"
              textcolor="text-[#000000]"
              imagePosition="right"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Teachers
