import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation, useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import { TailSpin } from "react-loader-spinner";

import letter from "../../assets/images/letter.png";
import Headcomponent from "../../components/common/Headcomponent";

import ActivityHistory from "../../components/Core/Userpage/ActivityHistory";
import PieChart from "../../components/Core/Userpage/piechart";
import { FaChevronLeft } from "react-icons/fa";
import container from "../../assets/images/container.png";
import Vector from "../../assets/images/Vector.png";
import SearchButton from "../../assets/images/Searchbutton.png";
import Modal from '../../components/common/Modal';
import { Bar, Doughnut } from 'react-chartjs-2';
import { fetchUserDetailsAsync, deleteUserAsync } from "../../apis/slices/userSlice";

const doughnutOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'right',
      align: 'end',
      labels: {
        usePointStyle: true,
        pointStyle: 'circle',
      },
    },
  },
};


const UserDetails = ({ isOpen, togglesidebar }) => {
  const Navigate = useNavigate();
  const token = localStorage.getItem("authToken");
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSearchBoxOpen, setIsSearchBoxOpen] = useState(false);
  const userData = useSelector((state) => state.users?.userDetails?.usersList || {});

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onRefresh = () => {
    setLoading(true);
    dispatch(fetchUserDetailsAsync({
      dispatch: dispatch,
      userId: id,
    })).then(() => {
      setLoading(false);
      closeModal();
      toast.success('User details refreshed');
    }).catch((error) => {
      setLoading(false);
      closeModal();
      toast.error('Failed to refresh user details');
    });
  };

  const onDeleteUser = () => {
    setLoading(true);
    dispatch(deleteUserAsync({
      dispatch: dispatch,
      userId: id,
    })).then((response) => {
      setLoading(false);
      closeModal();
      toast.success('User deleted successfully');
      setTimeout(() => {
        Navigate('/users');
      }, 1000);
    }).catch((error) => {
      setLoading(false);
      closeModal();
    });
  };

  useEffect(() => {
    setLoading(true);
    dispatch(fetchUserDetailsAsync({
      dispatch: dispatch,
      userId: id,
    })).then(() => {
      setLoading(false);
    }).catch((error) => {
      setLoading(false);
      toast.error('Failed to fetch user details');
    });
  }, []);

  const data = [
    {
      id: 1,
      label: "ID",
      value: userData.id,
    },
    {
      id: 2,
      label: "Date of registration",
      value: userData?.date,
    },
    {
      id: 3,
      label: "Acquisition/Download Channel",
      value: "Google",
    },
  ];

  const formdata = [
    {
      id: 1,
      label: "Full Name",
      value: userData?.userName || 'NA',
    },
    {
      id: 2,
      label: "Gender",
      value: userData?.gender || 'NA',
    },
    {
      id: 3,
      label: "Date of Birth",
      value: userData?.dob || 'NA',
    },
    {
      id: 4,
      label: "Email",
      value: userData?.email || 'NA',
    },
    {
      id: 5,
      label: "Phone Number",
      value: userData?.phone || 'NA',
    },
    {
      id: 6,
      label: "Address",
      value: userData?.location?.name || 'NA',
    },
  ];

  const parentformdata = [
    {
      id: 1,
      label: "Full Name",
      value: userData?.parentInfo?.name || 'NA',
    },
    {
      id: 2,
      label: "Email",
      value: userData?.parentInfo?.email || 'NA',
    },
    {
      id: 3,
      label: "Relationship",
      value: userData?.parentInfo?.relationship || 'NA',
    },
    {
      id: 4,
      label: "Address",
      value: userData?.parentInfo?.address || userData?.location?.name || 'NA',
    },
  ];

  const labels = userData?.count?.rows?.map(
    (data) => data.name
  );
  const info = userData?.count?.rows?.map(
    (subject) => subject.lessonMediaCount
  );

  const splitName = (fullName) => {
    if (!fullName) return { first_name: "", middle_name: "", last_name: "" };

    const nameParts = fullName.trim().split(" ");
    return {
      first_name: nameParts[0] || "",
      middle_name: nameParts.length > 2 ? nameParts.slice(1, -1).join(" ") : "",
      last_name: nameParts.length > 1 ? nameParts[nameParts.length - 1] : ""
    };
  };

  // Extract name parts
  const nameParts = splitName(userData?.userName);

  return (
    <div
      className={` py-[7rem] lg:px-[5rem]  px-[10px] ${isOpen ? "xl:ml-[260px]" : ""
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
      <div className="flex justify-start  items-center lg:gap-3">
        <FaChevronLeft onClick={() => Navigate(-1)} className="cursor-pointer" />
        <div>
          <div className=" font-normal text-[14px] lg:text-[16px] leading-[20px] text-[#B6B6B6]">
            Home / Users/
            <span className="text-black font-medium">UserDetails</span>
          </div>
        </div>
      </div>
      <div className="bg-[#EFF6F1] mt-5 border rounded-lg mb-[20px] border-[#CAC4D0] h-[80px] p-[8px]">
        <div className="flex items-center gap-4">
          <div className=" rounded-full text-center p-2 w-[40px] h-[40px] bg-[#F8F5ED]">
            {userData?.userName?.charAt(0).toUpperCase()}
          </div>
          <div className="">
            <p className=" font-bold text-[16px] leading-[24px]  tracking-wider text-[#1D2026]">
              {userData?.userName}
            </p>
            {userData?.status == 'active' ?
              <button className="w-[64px] h-[20px] rounded-full font-medium text-[13px] leading-[15px] mt-[4px] pt-[2px]  text-white bg-[#08AA58]">
                Active
              </button> : <button className="w-[64px] h-[20px] rounded-full font-medium text-[13px] leading-[15px] mt-[4px] pt-[2px]  text-white bg-[#aa0808]">
                Inactive
              </button>}
          </div>
        </div>
      </div>
      <div className=" lg:grid grid-cols-2 gap-4">
        <div className="">
          <div className=" w-full rounded-2xl border py-[10px] px-[12px] lg:px-[18px]  bg-[#FFFFFF] ">


            <div className={`flex justify-between items-center relative mt-3`}>
              <div>
                <h2 className="font-medium text-[16px] lg:text-[18px] leading-[25px] text-[#2C2E32]">Basic Information</h2>
              </div>
              <div className="flex items-center relative">
                <div className="h-[60px] lg:px-[8px] flex items-center mt-[5px]">
                  <div className=" items-center relative lg:w-[204px] hidden">

                    <input
                      type="text"
                      name="search"
                      className="mt-1 w-full pr-[40px] pl-[20px] outline-none bg-[#F8F8F8] text-[14px] border p-2 border-[#ECEDEE] shadows h-[32px] rounded-[16px]"
                      placeholder="Search Item"
                    />
                    <img src={SearchButton} className="absolute w-[30px] h-[30px] top-[56%]  -translate-y-1/2 right-[8px] z-50 cursor-pointer" alt="Search icon" />
                  </div>
                  <div className="w-[20px] lg:w-[24px] lg:h-[24px] cursor-pointer ml-2 hidden">
                    <img src={Vector} alt="Vector" />
                  </div>
                  <div className="w-[30px] lg:w-[34px] lg:h-[40px] ml-2" onClick={() => setIsModalOpen(true)}>
                    <img src={container} alt="Container" />
                  </div>
                </div>
              </div>
              {isModalOpen && (
                <Modal
                  closeModal={closeModal}
                  label="User Details"
                  value1="Refresh"
                  value2="Delete User"
                  closeModalWithClick1={onRefresh}
                  closeModalWithClick2={onDeleteUser}
                />
              )}
            </div>
            <div className="rounded-2xl p-[8px] bg-[#F2F2F2] pb-[20px] mt-5">
              <div className="px-[5px]">
                <h3 className=" font-medium text-[16px] leading-[35px] text-[#49454F]">
                  General Details
                </h3>
                <div className="bg-[#FFFFFF] py-[10px] px-[10px] mt-[10px] rounded-[8px] flex flex-col gap-4">
                  {data.map((item, index) => (
                    <div
                      key={item.id}
                      className="flex lg:gap-[5rem] gap-[27px] md:gap-[10rem] items-center  "
                    >
                      <div className=" text-[14px] w-[124px] lg:w-[200px] leading-[18px] text-[#1F1F1FB2]">
                        {item.label}
                      </div>
                      <div className="text-[#222222E5] text-[14px] lg:text-[16px] font-normal">
                        {item.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-5 bg-[#F2F2F2] rounded-2xl px-[13px] lg:px-[20px] py-[20px]">
              <div className="flex justify-between items-center ">
                <div className="">
                  <h2 className="font-medium text-[16px] leading-[35px] text-[#49454F]">
                    Bio And Contact
                  </h2>
                </div>
                <div
                  className="text-green-500 cursor-pointer"
                  onClick={() => {
                    Navigate(`/EditUser/${id}`, {
                      state: {
                        isEdit: true,
                        userData: {
                          id: userData?.id,
                          first_name: nameParts.first_name,
                          middle_name: nameParts.middle_name,
                          last_name: nameParts.last_name,
                          phone: userData?.phone,
                          country_id: userData?.country_id?.id || 81,
                          date_of_birth: userData?.dob,
                          gender: userData?.gender?.toUpperCase(),
                          email: userData?.email,
                          password: userData?.password,
                          parent_name: userData?.parentInfo?.name,
                          parent_email: userData?.parentInfo?.email,
                          parent_address: userData?.parentInfo?.address,
                          parent_relationship: userData?.parentInfo?.relationship,
                          grade: parseInt(userData?.grade, 10) || 21,
                          course: parseInt(userData?.course, 10) || 153,
                          location: userData?.location?.name,
                          status: "active",
                        }
                      }
                    });
                  }}
                >
                  Edit
                </div>
              </div>
              <div className="bg-[#FFFFFF] py-[10px] px-[10px] mt-[10px] rounded-[8px] flex flex-col gap-4">
                {formdata.map((item, index) => (
                  <div
                    key={item.id}
                    className="flex lg:gap-[5rem] gap-[10px]  md:gap-[10rem] items-center  "
                  >
                    <div className=" text-[14px] w-[116px] lg:w-[200px] leading-[18px] text-[#1F1F1FB2]">
                      {item.label}
                    </div>
                    <div className="text-[#222222E5] text-[14px] lg:text-[16px] font-normal">
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <div className=" w-full rounded-2xl border py-[10px] px-[18px]   bg-[#FFFFFF] ">
            <Headcomponent
              value={"Report"}
              border="border-bottom:1px solid #EBE6DC"
            />
            <div className="rounded-2xl p-[10px] bg-[#F2F2F2] mt-5">
              <div className="px-[5px]">
                <h3 className=" font-medium text-[16px] leading-[35px] text-[#49454F]">
                  General Performance
                </h3>
                <div className="bg-[#FFFFFF] py-[10px] px-[10px] mt-[10px] rounded-[4px] flex flex-col gap-4">
                  <PieChart data={info} labels={labels} />
                </div>
              </div>
            </div>
            {/* <div className="rounded-2xl p-[10px] bg-[#F2F2F2] mt-5">
              <div className="px-[5px]">
                <h3 className=" font-medium text-[16px] leading-[35px] text-[#49454F]">
                  Certain Performance
                </h3>
                <div className="bg-[#FFFFFF] py-[10px] px-[10px] mt-[10px] rounded-[4px] flex flex-col gap-4">
                  <PieChart data={info} labels={labels} />
                </div>
              </div>
            </div>*/}
          </div>
        </div>

        <div className=" mt-5 lg:mt-0 w-full rounded-2xl border py-[10px] lg:px-[18px] px-[8px]  bg-[#FFFFFF] ">
          <div className="border-b border-[#EBE6DC]">
            <Headcomponent
              value={"Activity History"}
              border="border-bottom:1px solid #EBE6DC"
            />
          </div>

          <ActivityHistory data={userData?.activity_logs} />
        </div>

        <div className=" w-full rounded-2xl border py-[10px] px-[18px] lg:mt-0 mt-5 bg-[#FFFFFF] ">
          <div className="border-b border-[#EBE6DC]">
            <Headcomponent
              value={"Parent Details"}
              border="border-bottom:1px solid #EBE6DC"
              showSearch={false}
            />
          </div>
          <div className="mt-5 bg-[#F2F2F2] rounded-2xl px-[13px] lg:px-[20px] py-[20px]">
            {/* <div className="flex justify-between items-center ">
              <div className="">
                <h2 className="font-medium text-[16px] leading-[35px] text-[#49454F]">
                  Bio And Contact
                </h2>
              </div>
              <div
                className=" text-[#27AE60] cursor-pointer"
                onClick={() => {
                  // Navigate("/Parent");
                }}
              >
                Edit
              </div>
            </div> */}
            <div className="bg-[#FFFFFF] py-[10px] px-[10px] mt-[10px] rounded-[8px] flex flex-col gap-4">
              {parentformdata.map((item, index) => (
                <div
                  key={item.id}
                  className="flex lg:gap-[5rem] gap-[10px]  md:gap-[10rem] items-center  "
                >
                  <div className=" text-[14px] w-[116px] lg:w-[200px] leading-[18px] text-[#1F1F1FB2]">
                    {item.label}
                  </div>
                  <div className="text-[#222222E5] text-[14px] lg:text-[16px] font-normal">
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

export default UserDetails;

