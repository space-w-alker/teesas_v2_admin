import React, { useEffect, useState } from "react";
import Custombutton from "../common/Custombutton";
import frame2 from "../../assets/images/Frame2.png";
import check from "../../assets/images/check.png";
import Modal from "../common/Modal";
import { getSubscribedUsersAsync, selectSubscribedUsers } from "../../apis/slices/subscriptionsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import SearchButton from "../../assets/images/Searchbutton.png";
import container from "../../assets/images/container.png";
import Vector from "../../assets/images/Vector.png";
import { TailSpin } from "react-loader-spinner";
import { toast } from "react-toastify";

const SubscribedUserList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const Navigate = useNavigate();
  const token = localStorage.getItem("authToken");
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [isModalFilterOpen, setIsModalFilterOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [sortKey, setSortKey] = useState("Latest");
  const [coursesData, setCoursesData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [selectedCourses, setSelectedCourses] = useState([]);
  const [activeStatus, setActiveStatus] = useState(true);

  // Get subscribed users from Redux
  const subscribedUsersState = useSelector(selectSubscribedUsers);
  const subscriptions = subscribedUsersState?.data || [];
  const pageData = {
    currentPage: subscribedUsersState?.paging?.page || 1,
    total_pages: subscribedUsersState?.paging?.total
      ? Math.ceil(subscribedUsersState.paging.total / (subscribedUsersState.paging.limit || 10))
      : 1,
    total: subscribedUsersState?.paging?.total || 0
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setIsModalFilterOpen(false);
  };

  const handleFilterByCourse = (course) => {
    if (!course || !course.id) {
      return; // Skip if course is invalid
    }

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
    const queryParams = {
      page: 1,
      limit: 10,
      sort: sortKey,
      status: activeStatus ? "Active" : "Inactive",
    };

    if (selectedCourses.length > 0) {
      queryParams.subscription_id = selectedCourses;
    }

    if (searchValue.trim()) {
      queryParams.search = searchValue;
    }

    fetchSubscribedUsers(queryParams);
  };

  const handleFilterByStatus = (status) => {
    setActiveStatus(status);
  };

  const latestOnClick = () => {
    setLoading(true);
    setSortKey("Latest");
    fetchSubscribedUsers({
      page: 1,
      limit: 10,
      sort: "Latest",
      status: activeStatus ? "Active" : "Inactive",
      search: searchValue || undefined,
    });
  };

  const oldestOnClick = () => {
    setLoading(true);
    setSortKey("Oldest");
    fetchSubscribedUsers({
      page: 1,
      limit: 10,
      sort: "Oldest",
      status: activeStatus ? "Active" : "Inactive",
      search: searchValue || undefined,
    });
  };

  const fetchSubscribedUsers = (params) => {
    console.log("Fetching subscribed users with params:", params);
    getSubscribedUsersAsync({
      dispatch,
      body: params,
      token,
      callbackFn: (res) => {
        console.log("Fetched subscriptions response:", res);
        setLoading(false);
        if (res?.error) {
          toast.error(res.error.message || "Failed to fetch subscriptions");
        }
      },
    });
  };

  useEffect(() => {
    console.log("SubscribedUserList mounted, fetching initial data");
    setLoading(true);
    fetchSubscribedUsers({ page: 1, limit: 10 });

    // The courses API is failing with 404, so let's not call it for now
    // Instead, use an empty array for coursesData
    setCoursesData([]);

    /* 
    The line below is causing a 404 error. This appears to be from authSlice.jsx line 352.
    It's trying to fetch course data for filters, but the endpoint doesn't exist.
    
    Commenting out this call to prevent the 404 error:
    
    getCoursesAsync({
      dispatch,
      body: {},
      token,
      callbackFn: (res) => {
        if (res?.data?.status === 200) {
          setCoursesData(res.data.data.courses);
        } else {
          toast.error(res?.data?.message || "Failed to fetch courses");
        }
      },
    });
    */
  }, [dispatch, token]);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (e) {
      console.error("Date formatting error:", e);
      return dateString;
    }
  };

  const isLoading = subscribedUsersState?.isLoading || loading;

  return (
    <>
      {isLoading && (
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
                  setSearchValue(e.target.value);
                  if (e.target.value === "") {
                    setLoading(true);
                    fetchSubscribedUsers({
                      page: 1,
                      limit: 10,
                      sort: sortKey,
                      status: activeStatus ? "Active" : "Inactive",
                    });
                  }
                }}
              />
              <img
                src={SearchButton}
                className="absolute w-[30px] h-[30px] top-[56%] -translate-y-1/2 right-[8px] z-50 cursor-pointer"
                alt="Search icon"
                onClick={() => {
                  if (searchValue.trim() !== "") {
                    setLoading(true);
                    fetchSubscribedUsers({
                      page: 1,
                      limit: 10,
                      search: searchValue,
                      sort: sortKey,
                      status: activeStatus ? "Active" : "Inactive",
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
      <div className="py-[2px] rounded-[18px] bg-[#FFFFFF] mt-3">
        <div className="user">
          <h2 className="text-[22px] leading-6 text-[#2C2E32] font-medium">
            Subscribed User List
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
          {subscriptions.length === 0 && !isLoading ? (
            <div className="text-center py-8 text-gray-500">
              No subscriptions found
            </div>
          ) : (
            <ul>
              {subscriptions.map((subscription, index) => (
                <li
                  key={subscription?.id || `subscription-${index}`}
                  className="cursor-pointer"
                  onClick={() => {
                    if (subscription?.user?.id) {
                      Navigate(`/userDetails?id=${subscription.user.id}`);
                    }
                  }}
                >
                  <div className="px-[18px] py-[10px]">
                    <h6 className="font-light text-[12px] leading-[13px] text-[#767676]">
                      {formatDate(subscription?.create_time)}
                    </h6>
                  </div>
                  <div className="flex items-center justify-between p-5 max-sm:flex-col">
                    <div className="flex items-center gap-3 px-[18px]">
                      <div className="rounded-full text-center p-2 w-[40px] h-[40px] bg-[#F8F5ED]">
                        {subscription?.user?.name ? subscription.user.name.charAt(0).toUpperCase() : "U"}
                      </div>
                      <div>
                        <div className="flex pl-[20px] items-center gap-2">
                          <p>{subscription?.user?.name || "Unknown User"}</p>
                        </div>
                        <div className="pl-[20px] flex flex-col gap-[10px]">
                          <p className="font-normal text-[#555555] text-[12px] leading-[15px]">
                            {subscription?.subscription?.description || "No description"}
                          </p>
                          <div className="flex items-center h-[16px] bg-[#F2F2F2]">
                            <p className="font-bold w-full text-[12px] leading-[15px] text-[#555555]">
                              Amount: ${subscription?.subscription?.amount || "0.00"} / {subscription?.subscription?.time || "0"} days
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="max-sm:mt-5">
                      <Custombutton
                        value={subscription?.status ? "Active" : "Expired"}
                        img={check}
                        backgroundcolor={subscription?.status ? "bg-[#ede1d5]" : "bg-[#f0f0f0]"}
                        textcolor={subscription?.status ? "text-[#EA8527]" : "text-[#999999]"}
                        imagePosition="left"
                      />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="user">
          <Custombutton
            onClick={() => {
              if (pageData.currentPage > 1) {
                setLoading(true);
                setPage(pageData.currentPage - 1);
                fetchSubscribedUsers({
                  page: pageData.currentPage - 1,
                  limit: 10,
                  subscription_id: selectedCourses.length > 0 ? selectedCourses : undefined,
                  status: activeStatus ? "Active" : "Inactive",
                  sort: sortKey,
                  ...(searchValue ? { search: searchValue } : {}),
                });
              }
            }}
            value="Previous"
            hidden="hidden"
            icon={<FaArrowLeft />}
            backgroundcolor="bg-[#F2F2F2]"
            textcolor={pageData.currentPage > 1 ? "text-[#000000]" : "text-[#cccccc]"}
            imagePosition="left"
            width="w-[115px]"
            disabled={pageData.currentPage <= 1}
          />
          <div className="text-[#667085] text-[12px]">
            Page {pageData.currentPage} of {pageData.total_pages}
          </div>
          <Custombutton
            onClick={() => {
              if (pageData.currentPage < pageData.total_pages) {
                setLoading(true);
                setPage(pageData.currentPage + 1);
                fetchSubscribedUsers({
                  page: pageData.currentPage + 1,
                  limit: 10,
                  subscription_id: selectedCourses.length > 0 ? selectedCourses : undefined,
                  status: activeStatus ? "Active" : "Inactive",
                  sort: sortKey,
                  ...(searchValue ? { search: searchValue } : {}),
                });
              }
            }}
            value="Next"
            hidden="hidden"
            icon={<FaArrowRight />}
            backgroundcolor="bg-[#F2F2F2]"
            textcolor={pageData.currentPage < pageData.total_pages ? "text-[#000000]" : "text-[#cccccc]"}
            imagePosition="right"
            disabled={pageData.currentPage >= pageData.total_pages}
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
            selectedStatusData={activeStatus}
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

export default SubscribedUserList;
