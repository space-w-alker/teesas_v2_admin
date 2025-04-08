import React, { useState, useEffect } from "react";
import live from "../../../assets/images/live.png";
import liveimage from "../../../assets/images/liveimage.png";
import bookopen from "../../../assets/images/bookopen.png";
import sharp from "../../../assets/images/sharp.png";
import UserCard from "../../../components/common/UserCard";
import Headcomponent from "../../../components/common/Headcomponent";
import Custombutton from "../../../components/common/Custombutton";
import { useNavigate } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getAdminUsersAsync } from "../../../apis/slices/adminSlice";
import Modal from "../../../components/common/Modal";
import SearchButton from "./../../../assets/images/Searchbutton.png";
import Vector from "../../../assets/images/Vector.png";
import container from "../../../assets/images/container.png";
import { TailSpin } from "react-loader-spinner";
import SuccessModal from "../../../components/common/SuccessModal";
import { deleteAPICall } from "../../../apis/client/methodCalls";
import { config } from "../../../apis/client/config";

const AdminUser = ({ isOpen }) => {
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
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  useEffect(() => {
    setLoading(true);
    getAdminUsersAsync({
      dispatch: dispatch,
      data: {
        page: 1,
        page_size: 10,
      },
      token: token,
      callbackFn: (res) => {
        setAdminData(res?.data);
        setLoading(false);

        console.log(res?.data);
      },
    });
  }, []);

  const handleModalClose = () => {
    setIsModalOpen(false);
    setIsModalFilterOpen(false);
  };

  const latestOnClick = () => {
    setLoading(true);
    setSortKey("Latest");
    const newData = {
      page: 1,
      page_size: 10,
      filter: "Latest",
    };
    getAdminUsersAsync({
      dispatch: dispatch,
      data: newData,
      token: token,
      callbackFn: (res) => {
        if (res?.status === 200) {
          setAdminData(res?.data);
          setLoading(false);
          handleModalClose();
          setPage(1);
        } else {
          alert(res?.message);
          setLoading(false);
        }
      },
    });
  };

  const oldestOnClick = () => {
    setLoading(true);
    setSortKey("Oldest");
    const newData = {
      page: 1,
      page_size: 10,
      filter: "Oldest",
    };
    getAdminUsersAsync({
      dispatch: dispatch,
      data: newData,
      token: token,
      callbackFn: (res) => {
        if (res?.status === 200) {
          setAdminData(res?.data);
          setPage(1);
          setLoading(false);
          handleModalClose();
        } else {
          alert(res?.message);
          setLoading(false);
        }
      },
    });
  };

  // Add delete function
  const deleteAdminUser = async (userId) => {
    try {
      setLoading(true);
      const URL = `${config.BASEURL}admin/auth/users/${userId}`;
      const result = await deleteAPICall(URL, null, token);

      if (result?.data?.status === 200) {
        toast.success("Admin user deleted successfully");
        // Refresh the list
        getAdminUsersAsync({
          dispatch: dispatch,
          data: {
            page: 1,
            page_size: 10,
          },
          token: token,
          callbackFn: (res) => {
            setAdminData(res?.data);
            setLoading(false);
          },
        });
      } else {
        toast.error(result?.data?.message || "Failed to delete admin user");
        setLoading(false);
      }
    } catch (error) {
      toast.error("Error deleting admin user");
      setLoading(false);
    }
  };

  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (userToDelete) {
      deleteAdminUser(userToDelete.id);
      setShowDeleteConfirm(false);
    }
  };

  return (
    <div
      className={`py-[7rem] lg:px-[5rem]   px-[10px] ${isOpen ? "lg:ml-[260px]" : ""
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
          <TailSpin color="green" radius={5} />
        </div>
      )}
      <div className="flex justify-start  items-center lg:gap-3">
        <FaChevronLeft />
        <div>
          <div className=" font-normal text-[14px] lg:text-[16px] leading-[20px] text-[#B6B6B6]">
            Home / <span className="text-black font-medium"> Admin Users</span>
          </div>
        </div>
      </div>
      <h2 className=" font-bold text-[22px]  leading-[28px] text-[#2C2E32] mt-6">
        Admin Users
      </h2>
      <div className="mt-5">
        <UserCard
          label="Total Admin Users"
          height="h-[111px]"
          backgroundcolor="bg-[#FFFFFF]"
          value={adminData?.total}
          imgbg={live}
          imglogo={liveimage}
        />
      </div>
      <div className=" flex  justify-end mt-4 ">
        <button
          className="text-[14px] leading-[20px] text-center font-bold  w-[160px] h-[40px] rounded-lg py-[7px] px-[12px] bg-[#27AE60] text-white"
          onClick={() => {
            Navigate("/AddAdminUser");
          }}
        >
          + Add Admin Users
        </button>
      </div>
      <div className="py-[2px] px-[20px]  rounded-[18px] bg-[#FFFFFF] mt-8 ">
        <div className="Border">
          <div className={`flex justify-between items-center relative mt-3`}>
            <div>
              <h2 className="font-medium text-[16px] lg:text-[18px] leading-[25px] text-[#2C2E32]">
                Admin Users list
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
                        setLoading(false);
                        const newData = {
                          page: 1,
                          page_size: 10,
                        };
                        getAdminUsersAsync({
                          dispatch: dispatch,
                          data: newData,
                          token: token,
                          callbackFn: (res) => {
                            if (res?.status === 200) {
                              setAdminData(res?.data);
                              setLoading(false);
                              setPage(1);
                            } else {
                              alert(res?.message);
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
                        getAdminUsersAsync({
                          dispatch: dispatch,
                          data: newData,
                          token: token,
                          callbackFn: (res) => {
                            if (res?.status === 200) {
                              setAdminData(res?.data);
                              setLoading(false);
                              setPage(1);
                            } else {
                              alert(res?.message);
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
        </div>
        <div className="">
          <ul>
            {adminData?.users?.map((user) => (
              <li
                key={user.id}
                className="cursor-default"
              >
                <div className="flex justify-between gap-4 items-center">
                  <div
                    className="px-[18px] py-[10px] mt-5 flex items-center gap-[10px] pr-[15px] cursor-pointer"
                    onClick={() => Navigate(`/AdminUserDetails?id=${user?.id}`)}
                  >
                    <div className="w-[32px] h-[32px] rounded-[16px] bg-[#F8F5ED] relative">
                      <img
                        src={bookopen}
                        alt=""
                        className=" absolute top-[8px] left-[9px]"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 px-[18px]">
                        <div className="flex items-center gap-2">
                          <p className="font-bold text-[14px] leading-[16px] text-[#171717]">
                            {user?.firstName}
                          </p>
                          <p className="font-bold text-[14px] leading-[16px] text-[#171717]">
                            {user?.middleName}
                          </p>
                          <p className="font-bold text-[14px] leading-[16px] text-[#171717]">
                            {user?.lastName}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {user?.status == 1 ? (
                      <button className="w-[64px] h-[20px] rounded-full font-medium text-[13px] leading-[15px] mt-[4px] pt-[2px] text-white bg-[#08AA58]">
                        Active
                      </button>
                    ) : (
                      <button className="w-[64px] h-[20px] rounded-full font-medium text-[13px] leading-[15px] mt-[4px] pt-[2px] text-white bg-[#aa0808]">
                        Inactive
                      </button>
                    )}

                    {/* Add Delete Button */}
                    <button
                      onClick={() => handleDeleteClick(user)}
                      className="px-3 py-1 bg-red-500 text-white rounded-md text-sm hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
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
                setLoading(true);
                const newData = {
                  page: page + 1,
                  page_size: 10,
                  filter: sortKey,
                };
                setPage(page - 1);
                getAdminUsersAsync({
                  dispatch: dispatch,
                  data: newData,
                  token: token,
                  callbackFn: (res) => {
                    if (res?.status === 200) {
                      setAdminData(res?.data);
                      setLoading(false);
                    } else {
                      alert(res?.message);
                      setLoading(false);
                    }
                  },
                });
              }
            }}
          />
          <div className="text-[#667085] text-[12px]">
            Page {adminData?.page} of {adminData?.totalPages}
          </div>
          <Custombutton
            value="Next"
            // hidden="hidden"
            icon={<FaArrowRight />}
            backgroundcolor="bg-[#F2F2F2]"
            textcolor="text-[#000000]"
            imagePosition="right"
            onClick={() => {
              if (page < adminData?.totalPages) {
                setLoading(true);
                const newData = {
                  page: page + 1,
                  page_size: 10,
                  filter: sortKey,
                };
                setPage(page + 1);
                getAdminUsersAsync({
                  dispatch: dispatch,
                  data: newData,
                  token: token,
                  callbackFn: (res) => {
                    if (res?.status === 200) {
                      setAdminData(res?.data);
                      setLoading(false);
                    } else {
                      alert(res?.message);
                      setLoading(false);
                    }
                  },
                });
              }
            }}
          />
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <SuccessModal
          isOpen={showDeleteConfirm}
          onClose={() => setShowDeleteConfirm(false)}
          type="caution"
          title="Delete Admin User"
          message="Are you sure you want to delete this admin user?"
          buttonText="Delete"
          onConfirm={confirmDelete}
        />
      )}

      {isModalFilterOpen && (
        <Modal
          closeModal={handleModalClose}
          label="Sort By"
          closeModalWithClick1={latestOnClick}
          closeModalWithClick2={oldestOnClick}
        />
      )}
    </div>
  );
};

export default AdminUser;

