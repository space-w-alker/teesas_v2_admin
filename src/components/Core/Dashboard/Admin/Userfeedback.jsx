import React, { useState, useEffect } from "react";
import Custombutton from "../../../common/Custombutton";
import Modal from "../../../common/Modal";
import frame2 from "../../../../assets/images/Frame2.png";
import arrowright from "../../../../assets/images/arrowright.png";
import arrowleft from "../../../../assets/images/arrowleft.png";
import check from "../../../../assets/images/check.png";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { Navigate, useNavigate } from "react-router-dom";
import { getUsersFeedbackAsync } from "../../../../apis/slices/feedBackSlice";
import SearchButton from "../../../../assets/images/Searchbutton.png";
import container from "../../../../assets/images/container.png";
import Vector from "../../../../assets/images/Vector.png";
import { useDispatch, useSelector } from "react-redux";
import { TailSpin } from "react-loader-spinner";

const Userfeedback = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("authToken");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModalClose = () => {
    setIsModalOpen(false);
    setIsModalFilterOpen(false);
  };
  const [page, setPage] = useState(1);
  const [pageData, setPageData] = useState({});
  const [data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [totalFeedback, setTotalFeedback] = useState("");
  const [isModalFilterOpen, setIsModalFilterOpen] = useState(false);
  const [sortKey, setSortKey] = useState('Latest');

  useEffect(() => {
    fetchData(1, 10, sortKey);
  }, []);

  const fetchData = (page, pageSize, filter, search = "") => {
    setLoading(true);
    const newData = {
      page: page,
      limit: pageSize,
      // filter: filter,
      // search: search
    };
    getUsersFeedbackAsync({
      dispatch: dispatch,
      data: newData,
      token: token,
      callbackFn: (res) => {
        if (res?.data?.status === 200) {
          setData(res?.data?.data?.data);
          setPageData(res?.data?.data?.data?.overview);
          setTotalFeedback(res?.data?.data?.total_resolved);
        } else {
          alert(res?.data?.message);
        }
        setLoading(false);
      },
    });
  };

  const handleFilterByCourse = (course) => {
    setSelectedCourse(course);
    setIsModalOpen(false);
  };

  const handleFilterByStatus = (status) => {
    setSelectedStatus(status);
    setIsModalOpen(false);
  };

  const handleFilterByMonth = (month) => {
    setSelectedMonth(month);
    setIsModalOpen(false);
  };

  const latestOnClick = () => {
    setSortKey('Latest');
    fetchData(1, 10, 'Latest');
    handleModalClose();
  };

  const oldestOnClick = () => {
    setSortKey('Oldest');
    fetchData(1, 10, 'Oldest');
    handleModalClose();
  };

  return (
    <>
      <div className={`flex justify-end items-center relative mt-3`}>
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
                  setSearchValue(e.target.value);
                  if (e.target.value === "") {
                    fetchData(1, 10, sortKey);
                  }
                }}
              />
              <img
                src={SearchButton}
                className="absolute w-[30px] h-[30px] top-[56%]  -translate-y-1/2 right-[8px] z-50 cursor-pointer"
                alt="Search icon"
                onClick={() => {
                  if (searchValue !== "") {
                    fetchData(1, 10, sortKey, searchValue);
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
      <div className="py-[2px]  rounded-[18px] bg-[#FFFFFF] ">
        <div className="user border-b border-[#ECEDEE]">
          <h2 className="text-[22px]  leading-6 text-[#2C2E32] font-medium">
            Users Feedback
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
            {console.log('fff', { data })}

            {data?.feedback?.map((item, i) => (
              < li key={i} >
                {console.log({ item })}

                <div className="px-[18px] py-[10px] mt-3">
                  <h6 className=" font-light text-[12px] leading-[13px] text-[#767676] ">
                    {item.date}
                  </h6>
                </div>
                < div className="flex flex-col gap-2 " key={i} >
                  <div className="flex  items-center gap-3 px-[18px] mt-3">
                    <div
                      className="flex items-center cursor-pointer text-[#171717] text-[14px] font-extrabold  gap-2"
                      onClick={() => {
                        navigate(`/UserFeedBackDetails`, { state: { item } });
                      }}
                    >
                      {/* {console.log('test', item?.user)} */}
                      {/* <p>{item?.user?.name}</p> */}
                      < p > {item?.user?.name.split(' ')[0]}</p>
                      <p>{item?.user?.name.split(' ')[1]}</p><br />
                      <p>{item?.user?.user_courses[0]?.course?.name}</p>
                    </div>
                  </div>
                  <div className="flex justify-between pr-[15px]">
                    <div>
                      <div className="pl-[20px]  flex flex-col gap-[10px]">
                        <p className=" font-normal text-[#555555] text-[12px] leading-[15px]">
                          {item?.review}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul >
        </div >
        <div className="user">
          <Custombutton
            value="Previous"
            // hidden="hidden"
            icon={<FaArrowLeft />}
            backgroundcolor="bg-[#F2F2F2]"
            textcolor="text-[#000000]"
            imagePosition="left"
            width="w-[115px]"
            onClick={() => {
              if (page > 1) {
                setPage(page - 1);
                fetchData(page - 1, 10, sortKey);
              }
            }}
          />
          <div className="text-[#667085] text-[12px]">
            Page {pageData?.page} of {pageData?.totalPages}
          </div>
          <Custombutton
            value="Next"
            // hidden="hidden"
            icon={<FaArrowRight />}
            backgroundcolor="bg-[#F2F2F2]"
            textcolor="text-[#000000]"
            imagePosition="right"
            onClick={() => {
              setPage(page + 1);
              fetchData(page + 1, 10, sortKey);
            }}
          />
        </div>
      </div >
      {isModalOpen && (
        <Modal
          closeModal={handleModalClose}
          value1="Filter By Course"
          value2="Filter By Status"
          value3="Filter By Month"
          onSelectCourse={handleFilterByCourse}
          onSelectStatus={handleFilterByStatus}
          onselectmonth={handleFilterByMonth}
          label="Filter"
        />
      )
      }
      {
        isModalFilterOpen && (
          <Modal
            closeModalWithClick1={latestOnClick}
            closeModalWithClick2={oldestOnClick}
            closeModal={handleModalClose}
            label="Sort By"
          />
        )
      }
    </>
  );
};

export default Userfeedback;
