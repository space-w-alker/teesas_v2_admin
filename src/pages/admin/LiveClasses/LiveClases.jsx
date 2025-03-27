import React, { useEffect, useState } from "react";
import UserCard from "../../../components/common/UserCard";
import LiveclasesList from "../../../components/Core/Dashboard/Admin/LiveclasesList";
import { useNavigate } from "react-router-dom";
import Ynotes from "../../../assets/images/Ynotes.png";
import { FaChevronLeft } from "react-icons/fa";
import Headcomponent from "../../../components/common/Headcomponent";
import bookopen from "../../../assets/images/bookopen.png";
import Custombutton from "../../../components/common/Custombutton";
import sharp from "../../../assets/images/sharp.png";
import container from "../../../assets/images/container.png";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import Modal2 from "../../../components/common/Modal2";
import Modal from "../../../components/common/Modal";
import SearchButton from "../../../assets/images/Searchbutton.png";
import Vector from "../../../assets/images/Vector.png";
import {
  getLiveClassesAsync,
  deleteLiveClassAsync,
} from "../../../apis/slices/liveClassSlice";
import { TailSpin } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import moment from "moment";
import { ToastContainer } from "react-toastify";

const LiveClases = ({ isOpen }) => {
  const Navigate = useNavigate();

  const token = localStorage.getItem("authToken");
  const dispatch = useDispatch();
  const [adminData, setAdminData] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isModalFilterOpen, setIsModalFilterOpen] = useState(false);
  const [searchValue, setVearchValue] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [pageData, setPageData] = useState({});
  const [classData, setClassData] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setLoading(true);
    getLiveClassesAsync({
      dispatch: dispatch,
      body: {
        page: 1,
        page_size: 10,
        class_type: "group",
      },
      token: token,
      callbackFn: (res) => {
        setAdminData(res?.data?.data?.classes);
        setPageData({
          total: res?.data?.data?.total,
          currentPage: res?.data?.data?.currentPage,
          totalPage: res?.data?.data?.totalPages,
        });
        setLoading(false);
      },
    });
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onDeleteClass = (value) => {
    deleteLiveClassAsync({
      dispatch: dispatch,
      data: {
        id: value,
      },
      token: token,
      callbackFn: (res) => {
        if (res?.data?.status == 200) {
          toast.success(res?.data?.message);
          getLiveClassesAsync({
            dispatch: dispatch,
            data: {
              page: 1,
              page_size: 10,
            },
            token: token,
            callbackFn: (res) => {
              setAdminData(res?.data?.data?.classes);
              setPageData({
                total: res?.data?.data?.total,
                currentPage: res?.data?.data?.currentPage,
                totalPage: res?.data?.data?.totalPages,
              });
              setLoading(false);
              closeModal();
              setClassData("");
            },
          });
        } else {
          toast.error(res?.data?.message);
        }
      },
    });
  };

  return (
    <div
      className={`py-[7rem] lg:px-[5rem] flex flex-col gap-2 px-[10px] ${isOpen ? "xl:ml-[260px]" : ""
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
      <div className="flex justify-start items-center lg:gap-3">
        <FaChevronLeft onClick={() => Navigate(-1)} className="cursor-pointer" />

        <div>
          <div className="font-normal text-[14px] lg:text-[16px] leading-[20px] text-[#B6B6B6]">
            Home /<span className="text-black font-medium">Live Classes</span>
          </div>
        </div>
      </div>
      <h2 className="mt-5 font-bold text-[22px] leading-[28px] text-[#2C2E32]">
        Live Classes
      </h2>
      <div className="mt-5">
        <UserCard
          label="Total Live Classes"
          height="h-[120px]"
          backgroundcolor="bg-[#FFFFFF]"
          value={pageData?.total}
          img2={Ynotes}
        />
      </div>
      <div className="flex justify-end">
        <button
          className="text-[14px] leading-[20px] text-center font-bold w-[166px] h-[40px] rounded-lg py-[7px] px-[12px] bg-[#27AE60] text-white"
          onClick={() => setShowModal(true)}
        >
          + Add Live Class
        </button>
      </div>
      <div className="bg-[#FFFFFF] lg:p-4 mt-5 lg:pl-[8px] pl-[8px] rounded-[18px] pb-[20px]">
        <div className="Border">
          <div className={`flex justify-between items-center relative mt-3`}>
            <div>
              <h2 className="font-medium text-[16px] lg:text-[18px] leading-[25px] text-[#2C2E32]">
                Live Classes List
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
                        getLiveClassesAsync({
                          dispatch: dispatch,
                          data: newData,
                          token: token,
                          callbackFn: (res) => {
                            if (res?.data?.status === 200) {
                              setAdminData(res?.data?.data?.classes);
                              setPageData({
                                total: res?.data?.data?.total,
                                currentPage: res?.data?.data?.currentPage,
                                totalPage: res?.data?.data?.totalPages,
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
                    className="absolute w-[30px] h-[30px] top-[56%] -translate-y-1/2 right-[8px] z-50 cursor-pointer"
                    alt="Search icon"
                    onClick={() => {
                      if (searchValue != "") {
                        setLoading(true);
                        const newData = {
                          page: 1,
                          page_size: 10,
                          search: searchValue,
                        };
                        getLiveClassesAsync({
                          dispatch: dispatch,
                          body: newData,
                          token: token,
                          callbackFn: (res) => {
                            if (res?.data?.status === 200) {
                              setAdminData(res?.data?.data?.classes);
                              setPageData({
                                total: res?.data?.data?.total,
                                currentPage: res?.data?.data?.currentPage,
                                totalPage: res?.data?.data?.totalPages,
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
                {/* <div
                  className="w-[20px] lg:w-[24px] lg:h-[24px] cursor-pointer ml-2"
                >
                  <img src={Vector} alt="Vector" />
                </div>
                <div className="w-[30px] lg:w-[34px] lg:h-[40px] ml-2">
                  <img src={container} alt="Container" />
                </div> */}
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <ul>
            {adminData?.map((user, i) => (
              <li key={i}>
                <div className="md:flex lg:flex justify-between items-center gap-4">
                  <div className="lg:px-[18px] py-[10px] mt-5 flex gap-[10px] pr-[15px]">
                    <div className="w-[32px] h-[32px] rounded-[16px] bg-[#F8F5ED] relative">
                      <img
                        src={bookopen}
                        alt=""
                        className="absolute top-[8px] left-[9px]"
                      />
                    </div>
                    <div>
                      <h6
                        className="font-bold text-[14px] leading-[24px] text-[#1D2026] cursor-pointer"
                        onClick={() => {
                          Navigate("/LiveClassDetails", {
                            state: { user },
                          });
                        }}
                      >
                        {user?.topic} - {user?.subject?.name}
                      </h6>
                      <span className="font-normal text-[12px] ml-1 leading-[24px] text-[#0F62FE]">
                        {user?.class_time}
                      </span>
                      <div className="flex items-center gap-3 px-[18px]">
                        <div className="flex items-center gap-2 cursor-pointer">
                          <p className="font-normal text-[12px] leading-[15px] text-[#000000]">
                            {user?.teacher?.name}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <img
                      src={container}
                      alt="Actions"
                      className="cursor-pointer"
                      onClick={() => {
                        setClassData(user);
                        openModal();
                      }}
                    />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="user">
          <Custombutton
            value="Previous"
            icon={<FaArrowLeft />}
            backgroundcolor="bg-[#F2F2F2]"
            textcolor="text-[#000000]"
            imagePosition="left"
            width="w-[115px]"
            onClick={() => {
              if (page > 1) {
                setLoading(true);
                const newData = {
                  page: page - 1,
                  page_size: 10,
                };
                setPage(page - 1);
                getLiveClassesAsync({
                  dispatch: dispatch,
                  body: newData,
                  token: token,
                  callbackFn: (res) => {
                    setAdminData(res?.data?.data?.classes);
                    setPageData({
                      total: res?.data?.data?.total,
                      currentPage: res?.data?.data?.currentPage,
                      totalPage: res?.data?.data?.totalPages,
                    });
                    setLoading(false);
                  },
                });
              }
            }}
          />
          <div className="text-[#667085] text-[12px]">
            Page {pageData?.currentPage} of {pageData?.totalPage}
          </div>
          <Custombutton
            value="Next"
            icon={<FaArrowRight />}
            backgroundcolor="bg-[#F2F2F2]"
            textcolor="text-[#000000]"
            imagePosition="right"
            onClick={() => {
              if (page < pageData.totalPage) {
                setLoading(true);
                const newData = {
                  page: page + 1,
                  page_size: 10,
                };
                setPage(page + 1);
                getLiveClassesAsync({
                  dispatch: dispatch,
                  body: newData,
                  token: token,
                  callbackFn: (res) => {
                    setAdminData(res?.data?.data?.classes);
                    setPageData({
                      total: res?.data?.data?.total,
                      currentPage: res?.data?.data?.currentPage,
                      totalPage: res?.data?.data?.totalPages,
                    });
                    setLoading(false);
                  },
                });
              }
            }}
          />
        </div>

        <Modal2
          isOpen={isModalOpen}
          onDelete={onDeleteClass}
          data={classData}
          onClose={closeModal}
        />
      </div>

      {/* Modal for adding live class */}
      {showModal && (
        <Modal
          closeModal={() => setShowModal(false)}
          label="ADD USER"
          value1="Add Single Live Class"
          value2="Upload Bulk Live Classes"
          addSingleButton={() => {
            Navigate('/AddLiveClass');
            setShowModal(false);
          }}
          addMutipleButton={() => {
            Navigate('/upload-bulk-live-classes', {
              state: { classType: 'group' }
            });
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
};

export default LiveClases;
