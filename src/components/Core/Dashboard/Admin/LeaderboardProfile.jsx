import Ellipse from "../../../../assets/images/Ellipse.png";
import PieChart from "../../Userpage/piechart";
import BarChart from "./Barcharts";
import Profile from "../../../../assets/images/Profile.png";
import ActivityLog from "./ActivityLog";
import { FaChevronLeft } from "react-icons/fa";
import { useLocation } from "react-router-dom";

import { Bar, Doughnut } from "react-chartjs-2";

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  GetUserProfileAsync,
  GetLocalSchoolsAsync,
  GetPerformanceHistoryAsync,
  GetMonthlyReportAsync,
} from "../../../../apis/slices/feedBackSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { TailSpin } from "react-loader-spinner";
import TestSchedule from "./TestSchedule";
import StudentStatsDashboard from "./StudentStatsDashboard";

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    // title: {
    //   display: true,
    //   text: 'Weekly Chart',
    // },
  },
};

const doughnutOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "right",
      align: "end",
      labels: {
        usePointStyle: true,
        pointStyle: "circle",
      },
    },
  },
};

const LeaderboardProfile = ({ isOpen }) => {
  const Navigate = useNavigate();
  const token = localStorage.getItem("authToken");
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [userData, setUserData] = useState([]);
  const location = useLocation();
  const { user_id, class_id } = location.state || {};
  const [loading, setLoading] = useState(false);
  const [performanceHistory, setPerformanceHistory] = useState([]);
  const [monthlyData, setMonthlyData] = useState({});
  console.log(user_id, class_id);
  useEffect(() => {
    setLoading(true);
    GetUserProfileAsync({
      dispatch: dispatch,
      data: {
        user_id,
        class_id,
      },
      token: token,
      callbackFn: (res) => {
        if (res?.status == 200) {
          setUserData(res?.data);
          setLoading(false);
        } else {
          setLoading(false);
          toast.error(res?.message);
        }
      },
    });
    // GetMonthlyReportAsync({
    //   dispatch: dispatch,
    //   data: {
    //      user_id: id,
    //   },
    //   token: token,
    //   callbackFn: (res) => {
    //     setMonthlyData(res?.data?.pointsByMonth);
    //   },
    // });

    // GetPerformanceHistoryAsync({
    //   dispatch: dispatch,
    //   data: {
    //      user_id: id,
    //   },
    //   token: token,
    //   callbackFn: (res) => {
    //     setPerformanceHistory(res?.data?.result);
    //     setLoading(false)
    //   },
    // });
  }, []);

  const labels = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "Points",
        data: userData?.week_points,
        backgroundColor: "rgba(209, 204, 242, 1)",
        // innerWidth: '1rem',
        // outerHeight: '13rem'
      },
    ],
  };

  const newLabels = userData?.subjects?.map((subject) => subject.subject_name);
  const newData = userData?.subjects?.map((subject) => subject.total_points);
  const data2 = [
    {
      time: userData?.accuracy,
      accuracy: "Accuracy",
      img: { Profile },
    },
    {
      time: userData?.avg_speed + " sec",
      accuracy: " Avg Speed /Question",
      img: { Profile },
    },
    // {
    //   time:"12 sec",
    //   accuracy:'Avg Speed /Question',
    //   img:{Profile}
    // },
    // {
    //   time:"12 sec",
    //   accuracy:'Avg Speed /Question',
    //   img:{Profile}
    // },
  ];
  return (
    <div
      className={`py-[7rem] lg:px-[5rem]  px-[10px] ${
        isOpen ? "xl:ml-[260px]" : ""
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
        <button
          onClick={() => Navigate(-1)}
          className="flex items-center text-gray-600"
        >
          <FaChevronLeft />
        </button>
        <div>
          <div
            onClick={() => {
              Navigate(-1);
            }}
            className=" font-normal text-[14px] lg:text-[16px] leading-[20px] text-[#B6B6B6]"
          >
            Home /<span className="text-black font-medium"> LeaderBoard</span>
          </div>
        </div>
      </div>
      <div>
        <h2 className=" font-bold mt-7 text-[22px] leading-[28px] text-[#2C2E32]">
          Profile Details
        </h2>
      </div>
      <div className=" rounded-2xl lg:h-[150px] lg:p-[16px]  bg-[#FFFFFF]  lg:flex items-center  gap-40   mt-5">
        <div className="flex items-center gap-5">
          <div>
            <img src={Ellipse} />
          </div>
          <div className="flex flex-col items-center gap-2 pt-[12px] lg:pt-0">
            <h3 className=" font-bold text-[20px] leading-[27px] text-[#171818]">
              {userData?.leaderboardDetails?.user?.name}{" "}
              {/* {userData?.user?.last_name} */}
            </h3>
            <div className="w-[118px] text-center">
              <p
                className=" font-bold text-[14
              px] text-[#7A7A7A]"
              >
                {userData?.leaderboardDetails?.classes?.name}
              </p>
              <p className=" pt-3  font-normal text-[12px] leading-[21px] text-[#7A7A7A]">
                Last seen - {userData?.leaderboardDetails?.lastOpenAplication}
              </p>
            </div>
          </div>
        </div>

        <div className=" md:grid lg:grid grid-cols-4 gap-5 px-[8px] pb-[10px] lg:pb-0 lg:px-0">
          <div className="p-[10px] bg-[#F3F7FC] mt-4 lg:mt-0 flex flex-col gap-2  lg:w-[223px] h-[80px]  py-[10px]  px-[15px] rounded-xl">
            <div>
              <p className="text-[16px] font-normal leading-[12px] text-[#001D4A] mt-2">
                Total Points
              </p>
            </div>
            <div>
              <p className="font-bold text-[19px] lg:text-[26px] leading-[38px] text-[#000000]">
                {userData?.leaderboardDetails?.totalPoints}
              </p>
            </div>
          </div>
          <div className="p-[10px] bg-[#F3F7FC] flex flex-col gap-2 mt-4 lg:mt-0  lg:w-[223px]  lh-[80px]  py-[10px]  px-[15px] rounded-xl">
            <div>
              <p className="text-[16px] leading-[12px] text-[#001D4A] mt-2">
                Dialogues Passed
              </p>
            </div>
            <div>
              <p className="font-bold text-[19px] lg:text-[26px] leading-[38px] text-[#000000]">
                {userData?.leaderboardDetails?.dialoguesPassed}
              </p>
            </div>
          </div>
          <div className="p-[10px] bg-[#F3F7FC] mt-4 lg:mt-0  flex flex-col gap-2  lg:w-[223px] h-[80px]  py-[10px]  px-[15px] rounded-xl">
            <div>
              <p className="text-[16px] leading-[12px] text-[#001D4A] mt-2">
                Top 3 Finish
              </p>
            </div>
            <div>
              <p className="font-bold text-[19px] lg:text-[26px] leading-[38px] text-[#000000]">
                {userData?.leaderboardDetails?.top3Finish}
              </p>
            </div>
          </div>
          <div className="p-[10px] bg-[#F3F7FC] mt-4 lg:mt-0  flex flex-col gap-2    lg:w-[223px] h-[80px]  py-[10px]  px-[15px] rounded-xl">
            <div>
              <p className="text-[16px] leading-[12px] text-[#001D4A] mt-2">
                Highest Score
              </p>
            </div>
            <div>
              <p className="font-bold text-[26px] leading-[38px] text-[#000000]">
                {userData?.leaderboardDetails?.highestScore}
              </p>
            </div>
          </div>
        </div>
      </div>
      <StudentStatsDashboard id={user_id} class={class_id} />
      <div>
        <div className=" rounded-[12px] border border-[#EFF1F5] lg:p-[24px] bg-[#FFFFFF] mt-10 hidden">
          {/* <div className=" lg:grid grid-cols-3 gap-[33px]">
            <div className=" font-bold text-[18px] leading-[20px] text-[#A7A7A7]">
              Daily Points Stats
            </div>
            <div className=" font-bold text-[18px] text-left leading-[20px] text-[#A7A7A7]">
              Overall Stats
            </div>
            <div className=" font-bold text-[18px] text-left leading-[20px] text-[#A7A7A7] ">
              Statistics
            </div>
          </div> */}
          <div className=" lg:grid grid-cols-3 gap-6 mt-3">
            <div>
              <div className=" my-[20px] px-[10px] font-bold text-[18px] leading-[20px] text-[#A7A7A7]">
                Daily Points Stats
              </div>
              <div className=" rounded-lg px-[10px] lg:p-[16px] bg-[#FFFAF4]">
                <Bar width={100} height={100} options={options} data={data} />
              </div>
            </div>
            <div>
              <div className=" my-[20px] px-[10px] font-bold text-[18px] text-left leading-[20px] text-[#A7A7A7]">
                Overall Stats
              </div>
              <div className=" lg:mt-0 mt-5 rounded-lg lg:p-[16px] bg-[#FFFAF4] ">
                <Doughnut
                  width={300}
                  height={300}
                  options={doughnutOptions}
                  datasetIdKey="donut1"
                  data={{
                    labels: newLabels,
                    datasets: [
                      {
                        label: "Points",
                        data: newData,
                        backgroundColor: [
                          "#61CDBB",
                          "#E8A838",
                          "#F1E15B",
                          "#F47560",
                          "#E8C1A0",
                        ],
                      },
                    ],
                  }}
                />
              </div>
            </div>
            <div>
              <div className=" my-[20px] px-[10px] font-bold text-[18px] text-left leading-[20px] text-[#A7A7A7] ">
                Statistics
              </div>
              <div className=" rounded-lg  lg:p-[16px] bg-[#FFFAF4] ">
                <div>
                  <div className="lg:mt-0 mt-5  p-[8px] w-full flex flex-col  gap-[2rem] ">
                    {data2.map((item, index) => (
                      <div
                        key={index}
                        className="lg:flex items-center w-full  bg-[#FFFFFF]  p-2 border-2 border-[#EFF1F5] rounded-[16px]"
                      >
                        <div className="w-[24px] h-[24px] roumded-[4px]">
                          <img src={Profile} />
                        </div>
                        <div>
                          <p className=" text-[16px]  leading-[20px] font-bold text-[#252526]">
                            {item.time}
                          </p>
                          <p className=" font-light text-[10px] leading-[12px] text-[#A7A7A7]">
                            {item.accuracy}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ActivityLog
        userData={userData}
        monthlyData={monthlyData}
        performanceHistory={performanceHistory}
      />

      <TestSchedule id={user_id} />
    </div>
  );
};

export default LeaderboardProfile;
