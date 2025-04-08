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
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [isModalFilterOpen, setIsModalFilterOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [sortKey, setSortKey] = useState("Latest");
  const [coursesData, setCoursesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(5);

  const [selectedCourses, setSelectedCourses] = useState([]);
  const [activeStatus, setActiveStatus] = useState(true);
  const subscribedUsersState = useSelector(selectSubscribedUsers);

  const subscriptions = subscribedUsersState?.data || [];


  const pageData = {
    currentPage: subscribedUsersState?.paging?.page || 1,
    totalPages: subscribedUsersState?.paging?.totalPages || 1,
    total: subscribedUsersState?.paging?.total || 0,
    limit: subscribedUsersState?.paging?.limit || 100
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setIsModalFilterOpen(false);
  };

  const handleApply = () => {
    setLoading(true);
    const queryParams = {
      page: 1,
      limit: limit,
      sort: sortKey === "Latest" ? "create_time:DESC" : "create_time:ASC",
      activeFilter: activeStatus ? "active" : "inactive",
    };

    if (searchValue.trim()) {
      queryParams.search = searchValue;
    }

    fetchSubscribedUsers(queryParams);
    handleModalClose();
  };

  const handleFilterByStatus = (status) => {
    setActiveStatus(status);
    setLoading(true);
    const queryParams = {
      page: 1,
      limit: limit,
      sort: sortKey === "Latest" ? "create_time:DESC" : "create_time:ASC",
      activeFilter: status ? "active" : "inactive",
      ...(searchValue ? { search: searchValue } : {})
    };
    fetchSubscribedUsers(queryParams);
  }

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);


    if (e.target.value === "") {
      setLoading(true);
      fetchSubscribedUsers({
        page: 1,
        limit: limit,
        sort: sortKey === "Latest" ? "create_time:DESC" : "create_time:ASC",
        activeFilter: activeStatus ? "active" : "inactive",
      });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && searchValue.trim() !== "") {
      setLoading(true);
      fetchSubscribedUsers({
        page: 1,
        limit: limit,
        search: searchValue,
        sort: sortKey === "Latest" ? "create_time:DESC" : "create_time:ASC",
        activeFilter: activeStatus ? "active" : "inactive",
      });
    }
  };

  const fetchSubscribedUsers = (params) => {
    const apiParams = { ...params };

    if (apiParams.sort === "Latest") {
      apiParams.sort = "create_time:DESC";
    } else if (apiParams.sort === "Oldest") {
      apiParams.sort = "create_time:ASC";
    }

    console.log("Fetching users with params:", apiParams);

    getSubscribedUsersAsync({
      dispatch,
      body: apiParams,
      token,
      callbackFn: (res) => {
        setLoading(false);
        if (res?.error) {
          toast.error(res.error.message || "Failed to fetch subscriptions");
        } else {
          console.log("Search response:", res?.data?.data);
          setPage(res?.data?.data?.page || 1);
        }
      },
    });
  };

  const handleSearchClick = () => {
    if (searchValue.trim() !== "") {
      setLoading(true);
      fetchSubscribedUsers({
        page: 1,
        limit: limit,
        search: searchValue,
        sort: sortKey === "Latest" ? "create_time:DESC" : "create_time:ASC",
        activeFilter: activeStatus ? "active" : "inactive",
      });
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > pageData.totalPages) {
      return;
    }

    setPage(newPage);
    setLoading(true);

    fetchSubscribedUsers({
      page: newPage,
      limit: limit,
      sort: sortKey === "Latest" ? "create_time:DESC" : "create_time:ASC",
      activeFilter: activeStatus ? "active" : "inactive",
      ...(searchValue ? { search: searchValue } : {}),
    });
  };

  useEffect(() => {
    setLoading(true);
    fetchSubscribedUsers({
      page: 1,
      limit: limit,
      activeFilter: activeStatus ? "active" : "inactive",
      sort: sortKey === "Latest" ? "create_time:DESC" : "create_time:ASC"
    });

    setCoursesData([]);
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
          <TailSpin color="green" radius={5} />
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
                      limit: limit,
                      sort: sortKey === "Latest" ? "create_time:DESC" : "create_time:ASC",
                      activeFilter: activeStatus ? "active" : "inactive",
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
                      limit: limit,
                      search: searchValue,
                      sort: sortKey === "Latest" ? "create_time:DESC" : "create_time:ASC",
                      activeFilter: activeStatus ? "active" : "inactive",
                    });
                  }
                }}
              />
            </div>
            {/* <div
              className="w-[20px] lg:w-[24px] lg:h-[24px] cursor-pointer ml-2"
              onClick={() => setIsModalFilterOpen(true)}
            >
              <img src={Vector} alt="Vector" />
            </div>
            <div className="w-[30px] lg:w-[34px] lg:h-[40px] ml-2">
              <img src={container} alt="Container" />
            </div> */}
          </div>
        </div>
      </div>
      <div className="py-[2px] rounded-[18px] bg-[#FFFFFF] mt-3">
        <div className="user">
          <h2 className="text-[22px] leading-6 text-[#2C2E32] font-medium">
            Subscribed User List {activeStatus ? "(Active)" : "(Expired)"}
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
              No User found
            </div>
          ) : (
            <ul>
              {subscriptions.map((subscription, index) => (
                <li
                  key={subscription?.id || `subscription-${index}`}
                  className="cursor-pointer"





                  onClick={() => {
                    if (subscription?.user?.id) {
                      navigate(`/userdetails/${subscription.user.id}`);
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
                      <div className="rounded-full text-center p-2 w-[40px] h-[40px] bg-[##E9FDEE]">
                        {subscription?.user?.name ? subscription.user.name.charAt(0).toUpperCase() : "U"}
                      </div>
                      <div>
                        <div className="flex pl-[20px] items-center gap-2">
                          <p>{subscription?.user?.name || "Unknown User"}</p>
                        </div>
                        <div className="pl-[20px] flex flex-col gap-[10px]">
                          <p className="font-normal text-[#555555] text-[12px] leading-[15px]">
                            {subscription?.user?.email || "No email"}
                          </p>
                          <p className="font-normal text-[#555555] text-[12px] leading-[15px]">
                            {subscription?.subscription?.description || "No description"}
                          </p>
                        </div>
                      </div>
                    </div>


                    <div className="max-sm:mt-5">
                      <Custombutton
                        value={subscription?.is_expired ? "Expired" : "Active"}
                        img={check}
                        backgroundcolor={subscription?.is_expired ? "bg-[#c14345]" : "bg-[#27ae60]"}
                        textcolor="text-[#ffffff]"
                        imagePosition="left"
                      />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex justify-between items-center mt-6 ml-4 mr-4 mb-4">
          <Custombutton
            value="Previous"
            icon={
              pageData.currentPage > 1 ?
                <FaArrowLeft color="#000000" /> :
                <FaArrowLeft color="#cccccc" />
            }
            backgroundcolor="bg-[#F2F2F2]"
            textcolor={pageData.currentPage > 1 ? "text-[#000000]" : "text-[#cccccc]"}
            imagePosition="left"
            onClick={() => handlePageChange(pageData.currentPage - 1)}
            disabled={pageData.currentPage <= 1}
          />


          <Custombutton
            value={`Page ${pageData.currentPage} of ${pageData.totalPages}`}
            backgroundcolor="bg-[#F2F2F2]"
            textcolor="text-[#000000]"
          />


          <Custombutton
            value="Next"
            icon={
              pageData.currentPage < pageData.totalPages ?
                <FaArrowRight color="#000000" /> :
                <FaArrowRight color="#cccccc" />
            }
            backgroundcolor="bg-[#F2F2F2]"
            textcolor={pageData.currentPage < pageData.totalPages ? "text-[#000000]" : "text-[#cccccc]"}
            imagePosition="right"
            onClick={() => handlePageChange(pageData.currentPage + 1)}
            disabled={pageData.currentPage >= pageData.totalPages}
          />

        </div>


        {isModalOpen && (
          <Modal
            closeModal={handleModalClose}
            label="Filter"
            coursesData={coursesData}
            //onSelectCourse={handleFilterByCourse}
            onSelectStatus={handleFilterByStatus}
            onClick={handleApply}
            selectedCoursesData={selectedCourses}
            selectedStatusData={activeStatus}
          />
        )}

        {/* {isModalFilterOpen && (
          <Modal
            closeModalWithClick1={latestOnClick}
            closeModalWithClick2={oldestOnClick}
            closeModal={handleModalClose}
            label="Sort By"
          />
        )} */}
      </div>
    </>
  );
};

export default SubscribedUserList;

