import React, { useEffect, useState } from "react";
import UserCard from "../../components/common/UserCard";
import Custombutton from "../../components/common/Custombutton";
import edit from "../../assets/images/edit.png";
import actions from "../../assets/images/actions.png";
import frame2 from "../../assets/images/Frame2.png";
import Ynotes from "../../assets/images/Ynotes.png";
import Gnotes from "../../assets/images/Gnotes.png";
import Bnotes from "../../assets/images/Bnotes.png";
import Pnotes from "../../assets/images/Pnotes.png";
import Snotes from "../../assets/images/Snotes.png";
import catIcon from "../../assets/images/catIcon.png";
import EditItemModal from "../../components/Core/Dashboard/Admin/EditItemModal";
// import BarChart from "../../components/Core/Dashboard/Admin/Barcharts";
import { FaChevronLeft } from "react-icons/fa";
import Modal from "../../components/common/Modal";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getDashBoardAsync } from "../../apis/slices/adminSlice";
import { Navigate, useNavigate } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
import { getSubscribedUsersAsync } from "../../apis/slices/subscriptionsSlice";


const SignInList = ({ isOpen }) => {
  const token = localStorage.getItem("authToken");
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const [adminData, setAdminData] = useState([]);
  const [dashData, setDashData] = useState([]);
  const [items, setItems] = useState(null);
  const [todo, setTodo] = useState("");
  const [open, setOpen] = useState(false);
  const [list, setList] = useState([]);
  const [showAllData, setShowAllData] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [subscriptions, setSubscriptions] = useState([]);
  const [loadingSubscriptions, setLoadingSubscriptions] = useState(false);


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







  const data = [
    {
      name: "Allyson Stairs",
      status: "active",
      label1: "Class",
      labeel2: "Primary 1",
    },
    {
      name: "Allyson Stairs",
      status: "active",
      label1: "Class",
      labeel2: "Primary 1",
    },
    {
      name: "Allyson Stairs",
      status: "active",
      label1: "Class",
      labeel2: "Primary 1",
    },
    {
      name: "Allyson Stairs",
      status: "active",
      label1: "Class",
      labeel2: "Primary 1",
    },
  ];
  const ListData = [
    {
      id: 1,
      label: "This is an example about my task",
    },
    {
      id: 2,
      label: "This is an example about my task",
    },
    {
      id: 3,
      label: "This is an example about my task",
    },
    {
      id: 4,
      label: "This is an example about my task",
    },
    {
      id: 5,
      label: "This is an example about my task",
    },
    {
      id: 6,
      label: "This is an example about my task",
    },
    {
      id: 7,
      label: "This is an example about my task",
    },
    {
      id: 8,
      label: "This is an example about my task",
    },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
    setList([...ListData]);
    // setLoading(true);
    const storedAdminData = localStorage.getItem("userData");
    const admin = JSON.parse(storedAdminData);
    setAdminData(admin);
    getDashBoardAsync({
      dispatch: dispatch,
      data: {},
      token: token,
      callbackFn: (res) => {
        if (res?.data?.status === 200) {
          setDashData(res?.data?.data);
          setLoading(false);
        } else {
          alert(res?.data?.message);
          setLoading(false);
        }
      },
    });

    setLoadingSubscriptions(true);
    getSubscribedUsersAsync({
      dispatch,
      body: { page: 1, limit: 5, sort: "create_time:DESC" },
      token,
      callbackFn: (res) => {
        setLoadingSubscriptions(false);
        if (res?.data?.status === 200) {
          setSubscriptions(res?.data?.data?.subscriptions || []);

        }
      },
    });

  }, []);

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const toggleModal = () => {
    setOpen(!open);
  };

  const deleteItem = ({ id }) => {
    const result = list.filter((t) => t.id !== id);
    setList(result);
  };

  const editItem = (id) => {
    const tempArr = list;
    let newEditItem = tempArr.filter((t) => t.id === id);
    setItems(newEditItem[0]);
    toggleModal();
  };
  const handleCheck = (id) => {
    const tmp = list;
    const index = tmp.findIndex((l) => l.id == id);
  };
  const handleUpdate = () => { };
  const Finaldata = {
    labels: dashData?.overview?.formattedData?.map((item) => item.date),
    datasets: [
      {
        label: "Users per Month",
        data: dashData?.overview?.formattedData?.map((item) => item.tRCount),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "User Count",
        },
      },
      x: {
        title: {
          display: true,
          text: "Months",
        },
      },
    },
  };
  return (
    <div
      className={` py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""
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
        <FaChevronLeft />
        <div>
          <div className=" font-normal text-[14px] lg:text-[16px] leading-[20px] text-[#B6B6B6]">
            Home / Dashboard /{" "}
            <span className="text-black font-medium">Sign In Lists</span>
          </div>
        </div>
      </div>

      <h2 className=" pt-[20px] font-bold text-[22px] lg:pl-[16px] xl:pl-0 pl-[8px] leading-[24px] text-[#49454F]">
        Dashboard
      </h2>
      <div>
        <div className=" rounded-xl p-[16px] w-full bg-[#FFFFFF] dash mt-5">
          <div>
            <h3 className="font-bold text-[22px] text-[#2C2E32] leading-[28px] ">
              Welcome,{" "}
              <span className="text-[#4AC384]">
                {adminData?.user?.firstName} {adminData?.user?.lastName}{" "}
              </span>
            </h3>
          </div>
          <div className="  grid grid-cols-1 mt-4  md:grid  md:grid-cols-2 md:gap-5 xl:grid-cols-4  lg:grid lg:grid-cols-3 lg:gap-7">
            <div>
              <UserCard
                label="Total Users"
                height="h-[105px]"
                backgroundcolor="bg-[#F2F2F2]"
                value={dashData?.overview?.totalUsers}
                img2={Gnotes}
                width="w-[298px]"
              />
            </div>
            <div>
              <UserCard
                label="Total Active Users"
                height="h-[105px]"
                backgroundcolor="bg-[#F2F2F2]"
                value={dashData?.overview?.activeUsers}
                img2={Pnotes}
                width="w-[298px]"
              />
            </div>
            <div>
              <UserCard
                label="Total Subscribed Users"
                height="h-[105px]"
                backgroundcolor="bg-[#F2F2F2]"
                value={dashData?.overview?.totalActiveSubscriptions}
                img2={Ynotes}
                width="w-[298px]"
              />
            </div>
            <div>
              <UserCard
                label="Total Orders Received"
                height="h-[105px]"
                backgroundcolor="bg-[#F2F2F2]"
                value={dashData?.overview?.totalOrders}
                img2={Gnotes}
                width="w-[298px]"
              />
            </div>
            <div>
              <UserCard
                label="Total Courses"
                height="h-[105px]"
                backgroundcolor="bg-[#F2F2F2]"
                value={dashData?.overview?.totalCourse}
                img2={Bnotes}
                width="w-[298px]"
              />
            </div>
            <div>
              <UserCard
                label="Total Classes"
                height="h-[105px]"
                backgroundcolor="bg-[#F2F2F2]"
                value={dashData?.overview?.totalClasses}
                img2={Snotes}
                width="w-[298px]"
              />
            </div>
            <div>
              <UserCard
                label="Total Subjects"
                height="h-[105px]"
                backgroundcolor="bg-[#F2F2F2]"
                value={dashData?.overview?.totalSubjects}
                img2={Gnotes}
                width="w-[298px]"
              />
            </div>
            {/* <div>
              <UserCard
                label="Total Courses"
                height="h-[105px]"
                backgroundcolor="bg-[#F2F2F2]"
                value={adminData?.practice_test_count}
                img2={Pnotes}
                width="w-[298px]"
              />
            </div> */}

            <div>
              <UserCard
                label="Total Ebooks"
                height="h-[105px]"
                backgroundcolor="bg-[#F2F2F2]"
                value={dashData?.overview?.totalEbooks}
                img2={Snotes}
                width="w-[298px]"
              />
            </div>
          </div>
        </div>

        <div className="hidden rounded-xl p-[16px] w-full bg-[#FFFFFF] dash mt-5">
          <div className=" flex justify-between Border  pb-[8px]">
            <div>
              <h3 className=" font-medium text-[18px] text-[#2C2E32] leading-[25px] ">
                Suport Tracker
              </h3>
            </div>
            <div>
              <Custombutton
                value="Filter"
                img={frame2}
                backgroundcolor="bg-[#F2F2F2]"
                textcolor="text-[#000000]"
                imagePosition="right"
              // onClick={() => setIsModalOpen(true)}
              />
            </div>
          </div>
          <div className=" mt-4 lg:grid  md:grid md:grid-cols-2 md:gap-5 xl:grid-cols-4 lg:grid-cols-3 lg:gap-7">
            <div>
              <UserCard
                label="Total number of tickets"
                height="h-[105px]"
                backgroundcolor="bg-[#F2F2F2]"
                value="5,000"
                img2={Ynotes}
                width="w-[298px]"
              />
            </div>
            <div>
              <UserCard
                label="Total new tickets"
                height="h-[105px]"
                backgroundcolor="bg-[#F2F2F2]"
                value="20"
                img2={Gnotes}
                width="w-[298px]"
              />
            </div>
            <div>
              <UserCard
                label="Total opened tickets"
                height="h-[105px]"
                backgroundcolor="bg-[#F2F2F2]"
                value="12"
                img2={Bnotes}
                width="w-[298px]"
              />
            </div>
            <div>
              <UserCard
                label="Total Response Time"
                height="h-[105px]"
                backgroundcolor="bg-[#F2F2F2]"
                value="244 "
                img2={Pnotes}
                width="w-[298px]"
              />
            </div>
          </div>
        </div>
      </div>

      <div className=" block md:grid  lg:grid grid-cols-2  gap-5 ">
        <div className="rounded-xl w-full p-[16px] bg-[#FFFFFF] dash mt-5">
          <div className=" flex justify-between Border  pb-[8px]">
            <div>
              <h3 className=" font-medium text-[18px] text-[#2C2E32] leading-[25px] ">
                Data or Stat
              </h3>
            </div>
            <div>
              {/* <Custombutton
                value="Filter"
                img={frame2}
                backgroundcolor="bg-[#F2F2F2]"
                textcolor="text-[#000000]"
                imagePosition="right"
                onClick={() => setIsModalOpen(true)}
              /> */}
            </div>
          </div>
          <div className="h-[400px]">
            <Bar data={Finaldata} options={options} />
          </div>
        </div>
        <div>
          <div className="rounded-xl w-full p-[12px] bg-[#FFFFFF] dash mt-5">
            <h3 className=" font-medium text-[18px] text-[#2C2E32] leading-[25px] Border pb-[15px] ">
              SignIn
            </h3>
            <div className=" block signIn lg:grid grid-cols-2  gap-5 mt-5">
              {dashData?.usersList?.map((item, i) => {
                if (i < 6) {
                  return (
                    <div
                      key={i}
                      className="rounded-lg border border-[#ECEDEE] box-shadow  "
                    >
                      <div className="flex items-center gap-[18px] gaps lg:gap-[17px] xxl:gap-[21px] ">
                        <div className="font-bold p-3 text-[14px] pr-[16px] status xl:pr-[33px] xxl:pr-[77px] leading-[22px] border-dashed text-[#2C2E32] border-r border-[#A2A4A9]  xxl:pl-[21px] ">
                          <img src={catIcon} />
                          {item?.userName}
                        </div>
                        <div className="">
                          <div className="flex items-center gap-4 ">
                            <div className=" font-medium text-[12px] leading-[15px] text-[#2C2E32]">
                              Status
                            </div>
                            <div className="bg-[#DBF3E6] uppercase rounded-[22px] px-[8px] py-[5px]  lg:w-[48px] lg:h-[16px]  font-normal text-[9px] leading-[8px] text-[#6ECF9D]  ">
                              {item?.status}
                            </div>
                          </div>
                          <div className="flex items-center gap-4 bg-[#FFF3D0] mt-[10px] px-[5px] py-[5px] rounded-2xl">
                            <div className=" font-medium text-[12px] leading-[15px] text-[#2C2E32]">
                              Class
                            </div>
                            <div className=" font-medium text-[12px] leading-[15px] text-[#2C2E32]">
                              {item?.grade}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }
              })}
            </div>
            <div className="flex justify-center py-[20px]">
              <button
                className="bg-[#ECEDEE] text-[#000000] font-normal text-[14px] leading-[18px] mt-2 py-[6px] px-[19px] rounded-md"
                onClick={() => Navigate("/users")}
              >
                View All
              </button>
            </div>
          </div>
        </div>

        <div className="rounded-xl w-full p-[12px] bg-[#FFFFFF] dash lg:mt-0 mt-3">
          <h3 className="font-medium text-[18px] text-[#2C2E32] leading-[25px] Border pb-[15px]">
            Recent Subscriptions
          </h3>
          <div>
            {loadingSubscriptions ? (
              <div className="flex justify-center py-4">
                <p>Loading subscriptions...</p>
              </div>
            ) : subscriptions.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No User found
              </div>
            ) : (
              <ul>
                {subscriptions.slice(0, 4).map((subscription, index) => (
                  <li
                    key={subscription?.id || `subscription-${index}`}
                    className="cursor-pointer"
                  >
                    <div className="px-[18px] py-[10px]">
                      <h6 className="font-light text-[12px] leading-[13px] text-[#767676]">
                        {formatDate(subscription?.create_time)}
                      </h6>
                    </div>
                    <div className="flex items-center justify-between p-5 max-sm:flex-col">
                      <div className="flex items-center gap-3 px-[18px]">
                        <div className="rounded-full text-center p-2 w-[40px] h-[40px] bg-[#E9FDEE]">
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
            <div className="flex justify-center py-[20px]">
              <button
                className="bg-[#ECEDEE] text-[#000000] font-normal text-[14px] leading-[18px] mt-2 py-[6px] px-[19px] rounded-md"
                onClick={() => Navigate("/subscribed-users")}
              >
                View All
              </button>
            </div>
          </div>
        </div>



        <div className="hidden rounded-xl w-full p-[12px] bg-[#FFFFFF] dash lg:mt-0 mt-3 ">
          <h3 className="font-meduim text-[18px] text-[#2C2E32] leading-[25px] Border pb-[15px] ">
            Assigned tasks
          </h3>
          <div>
            <div className=" ">
              {showAllData
                ? ListData.map((item) => (
                  <div
                    className="flex items-center justify-between  gap-2 Border py-[10px] "
                    style={{
                      textDecoration:
                        items === item.id ? "line-through" : "none",
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        className=" rounded-full text-[#4AC384]"
                      />
                      <p>{item.label}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <img
                        src={actions}
                        onClick={() => deleteItem(item.id)}
                      />
                      <img src={edit} onClick={() => setOpen(true)} />
                    </div>
                    {open && (
                      <EditItemModal
                        closeModal={() => setOpen(false)}
                        item={items}
                        onEdit={handleUpdate}
                      />
                    )}
                  </div>
                ))
                : ListData.slice(0, 4).map((item, key) => (
                  <div
                    className="flex items-center justify-between  gap-2 Border py-[10px] "
                    style={{
                      textDecoration:
                        items === item.id ? "line-through" : "none",
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        className=" rounded-full text-[#4AC384]"
                      />
                      <p>{item.label}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <img
                        src={actions}
                        onClick={() => deleteItem(item.id)}
                      />
                      <img src={edit} onClick={() => setOpen(true)} />
                    </div>
                    {open && (
                      <EditItemModal
                        closeModal={() => setOpen(false)}
                        item={items}
                        onEdit={handleUpdate}
                      />
                    )}
                  </div>
                ))}
            </div>
            <div className="flex justify-center py-[20px]">
              <button
                className="bg-[#ECEDEE] text-[#000000] font-normal text-[14px] leading-[18px] mt-2 py-[6px] px-[19px] rounded-md"
                onClick={() => setShowAllData(!showAllData)}
              >
                {showAllData ? "Show Less" : "View All"}
              </button>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <Modal
          closeModal={handleModalClose}
          label="Filter"
          value1="Filter By Course"
          value2="Filter By Status"
          value3="Filter By Month"
        />
      )}
    </div>
  );
};

export default SignInList;
