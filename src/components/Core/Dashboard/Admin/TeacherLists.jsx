import React, { useState, useEffect } from "react";
import Custombutton from "../../../common/Custombutton";
import arrowleft from "../../../../assets/images/arrowleft.png";
import arrowright from "../../../../assets/images/arrowright.png";
import bookopen from "../../../../assets/images/bookopen.png";
import sharp from "../../../../assets/images/sharp.png";
import Headcomponent from "../../../common/Headcomponent";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTeachersAsync } from "../../../../apis/slices/teacherSlice";
import SearchButton from "../../../../assets/images/Searchbutton.png";
import Vector from "../../../../assets/images/Vector.png";
import container from "../../../../assets/images/container.png";
import { TailSpin } from "react-loader-spinner";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const TeacherLists = () => {
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
    getTeachersAsync({
      dispatch: dispatch,
      data: {
        page: 1,
        limit: 10,
      },
      token: token,
      callbackFn: (res) => {
        if (res?.data?.status === 200) {
          setAdminData(res?.data?.data?.data);
          setPageData({
            limit: res?.data?.data?.limit,
            page: res?.data?.data?.page,
            total: res?.data?.data?.total,
          });
          setLoading(false);
        } else {
          setLoading(false);
          alert(res?.data?.message);
        }
      },
    });
  }, []);
  return (
    <div className="bg-[#FFFFFF] p-4 mt-5 rounded-[18px]">
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
                        limit: 10,
                      };
                      getTeachersAsync({
                        dispatch: dispatch,
                        data: newData,
                        token: token,
                        callbackFn: (res) => {
                          if (res?.data?.status === 200) {
                            setAdminData(res?.data?.data?.data);
                            setPageData({
                              limit: res?.data?.data?.limit,
                              page: res?.data?.data?.page,
                              total: res?.data?.data?.total,
                            });
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
                        limit: 10,
                        search: searchValue,
                      };
                      getTeachersAsync({
                        dispatch: dispatch,
                        data: newData,
                        token: token,
                        callbackFn: (res) => {
                          if (res?.data?.status === 200) {
                            setAdminData(res?.data?.data?.data);
                            setPageData({
                              limit: res?.data?.data?.limit,
                              page: res?.data?.data?.page,
                              total: res?.data?.data?.total,
                            });
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
                //onClick={() => setIsModalFilterOpen(true)}
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
          {adminData?.map((user) => (
            <li key={user.id}>
              <div
                className="flex justify-between gap-4 items-center"
                onClick={() =>
                  Navigate("/Teacher/TeacherDetails", { state: { user } })
                }
              >
                <div className="px-[18px] py-[10px] mt-5 flex  items-center gap-[10px] pr-[15px]">
                  <div className="w-[32px] h-[32px] rounded-[16px] bg-[#F8F5ED] relative">
                    <img
                      src={bookopen}
                      alt=""
                      className=" absolute top-[8px] left-[9px]"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 px-[18px]">
                      {/* <div>
                  <img src={item.icon1} alt="Icon 1" />
                </div> */}
                      <div className="flex items-center  gap-2">
                        <p className=" font-bold text-[14px] leading-[16px] text-[#171717] ">
                          {user?.first_name} {user?.middle_name}{" "}
                          {user?.last_name}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <Custombutton
                    value="View"
                    img={sharp}
                    backgroundcolor="bg-[#E9FDEE]"
                    textcolor="text-[#2760EA]"
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
                  limit: 10,
                };
                setPage(page - 1);
                getTeachersAsync({
                  dispatch: dispatch,
                  data: newData,
                  token: token,
                  callbackFn: (res) => {
                    if (res?.data?.status === 200) {
                      setAdminData(res?.data?.data?.data);
                      setPageData({
                        limit: res?.data?.data?.limit,
                        page: res?.data?.data?.page,
                        total: res?.data?.data?.total,
                      });
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
            icon={<FaArrowLeft />}
            backgroundcolor="bg-[#F2F2F2]"
            textcolor="text-[#000000]"
            imagePosition="left"
            width="w-[115px]"
          />
          <div className="text-[#667085] text-[12px]">
            Page {pageData?.page} of{" "}
            {Math.ceil(pageData?.total / pageData?.limit)}
          </div>
          <Custombutton
            onClick={() => {
              if (
                pageData?.page < Math.ceil(pageData?.total / pageData?.limit)
              ) {
                setLoading(true);
                setLoading(true);
                const newData = {
                  page: page + 1,
                  limit: 10,
                };
                setPage(page + 1);
                getTeachersAsync({
                  dispatch: dispatch,
                  data: newData,
                  token: token,
                  callbackFn: (res) => {
                    if (res?.data?.status === 200) {
                      setAdminData(res?.data?.data?.data);
                      setPageData({
                        limit: res?.data?.data?.limit,
                        page: res?.data?.data?.page,
                        total: res?.data?.data?.total,
                      });
                      setLoading(false);
                    } else {
                      setLoading(false);
                      alert(res?.data?.message);
                    }
                  },
                });
              }
            }}
            value="Next"
            icon={<FaArrowRight />}
            backgroundcolor="bg-[#F2F2F2]"
            textcolor="text-[#000000]"
            imagePosition="right"
          />
        </div>
      </div>
    </div>
  );
};

export default TeacherLists;
