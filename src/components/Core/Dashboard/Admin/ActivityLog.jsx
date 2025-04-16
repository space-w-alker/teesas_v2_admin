import React, { useState, useEffect } from "react";
import Parctice from "./Parctice";
import BarChart from "./Barcharts";
import Profile from "../../../../assets/images/Profile.png";
import { Bar, Doughnut } from "react-chartjs-2";
import { getSubjectsAsync } from "../../../../apis/slices/performanceSlice";
import { useDispatch } from "react-redux";

const ActivityLog = ({ userData, monthlyData, performanceHistory, userId, classId }) => {
  const dispatch = useDispatch();
  const [subjectsData, setSubjectsData] = useState([]);
  const [overallPerformance, setOverallPerformance] = useState(0);

  useEffect(() => {
    if (userId && classId) {
      getSubjectsAsync({
        dispatch,
        data: {
          classId: classId,
          userId: userId
        },
        token: localStorage.getItem("authToken"),
        callbackFn: (res) => {
          if (res?.data?.status === 200 && res.data.data && res.data.data.subjects) {
            setSubjectsData(res.data.data.subjects);

     
            const totalSubjects = res.data.data.subjects.length;
            if (totalSubjects > 0) {
              const totalPercentage = res.data.data.subjects.reduce((sum, subject) => {
                const percentage = subject.totalLessons > 0
                  ? (subject.completedLessons / subject.totalLessons) * 100
                  : 0;
                return sum + percentage;
              }, 0);

              setOverallPerformance(parseFloat((totalPercentage / totalSubjects).toFixed(1)));
            }
          }
        },
      });
    }
  }, [userId, classId]);

  const options2 = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Monthly Chart",
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  const labels2 = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const subjects = [
    {
      name: "Mathematics",
    },
    {
      name: "English",
    },
    {
      name: "Science",
    },
  ];
  const data2 = {
    labels2,
    datasets: [
      {
        label: "Points",
        data: monthlyData,
        backgroundColor: "rgba(209, 204, 242, 1)",
        // innerWidth: '1rem',
        // outerHeight: '13rem'
      },
    ],
  };
  return (
    <div className="lg:grid grid-cols-2  gap-10 mt-5">
      <div>
        <div className=" rounded-[12px] py-[20px] px-[25px] bg-[#FFFFFF] activity hidden">
          <div className="flex items-center justify-between">
            <div>
              <h2 className=" font-extrabold text-[15px] lg:text-[22px] leading-[30px] text-[#000000]">
                Activity Log
              </h2>
            </div>
            {/*<div className=" text-[12px] cursor-pointer lg:text-[14px] leading-[19px] font-normal text-[#0B6661] ">
              View All
            </div>*/}
          </div>

          <div className=" lg:px-[20px] py-[30px] flex flex-col gap-4 ">
            {userData?.activity_logs?.map((item, i) => {
              return (
                <>
                  <div
                    key={i}
                    className="flex h-full flex-col rounded-2xl bg-[#F9FCFF] p-4"
                  >
                    <div className="mb-3 text-[10px] font-extrabold text-[#999999]">
                      {item?.date}
                    </div>
                    {item?.activities?.map((item, i) => {
                      return (
                        <>
                          <div className="flex flex-col gap-y-2">
                            <div className="text-[0.875rem] font-bold">
                              {userData?.user?.first_name}{" "}
                              {userData?.user?.last_name} {item?.meta}
                            </div>
                            <div className="mb-3 text-[10px] text-[#126DFB]">
                              {item?.created_at}
                            </div>
                          </div>
                        </>
                      );
                    })}
                  </div>
                </>
              );
            })}
          </div>
        </div>
        <div className="">
          <div className=" rounded-[12px] py-[20px] px-[25px] bg-[#FFFFFF] activity ">
            <div className="flex items-center justify-between">
              <div>
                <h2 className=" font-extrabold  text-[15px] lg:text-[22px] leading-[30px] text-[#000000]">
                  Favourite Lessons
                </h2>
              </div>
              {/* <div className=" text-[12px] cursor-pointer lg:text-[14px] leading-[19px] font-normal text-[#0B6661] ">
              View All
            </div>*/}
            </div>

            <div className=" lg:px-[20px] py-[30px] flex flex-col gap-4 ">
              {userData?.bookmarks?.map((item, i) => {
                return (
                  <>
                    <div
                      key={i}
                      className="flex h-full flex-col rounded-2xl bg-[#F9FCFF] p-4"
                    >
                      <div className="mb-3 text-[10px] font-extrabold text-[#999999]">
                        {item?.updated_at}
                      </div>
                      <div className="flex flex-col gap-y-2">
                        <div className="text-[0.875rem] font-bold">
                          {userData?.leaderboardDetails?.user?.name}{" "}
                          Added {item?.video?.title}
                        </div>
                        {/* <div className="mb-3 text-[10px] text-[#126DFB]">
                          {item?.created_at}
                        </div> */}
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </div>
      
      </div>
      <div>
       
        <div className="  ">
          <div className="lg:p-[24px] rounded-[12px] bg-[#FFFFFF] border border-[#EFF1F5]   px-[8px] ">
            {/* Display each subject individually */}
            <h2 className="font-extrabold text-[18px] lg:text-[22px] leading-[30px] text-[#171818]">
              Subject Performance
            </h2>
            {subjectsData.map((subject, index) => {
              const percentage = subject.totalLessons > 0
                ? parseFloat(((subject.completedLessons / subject.totalLessons) * 100).toFixed(1))
                : 0;

              return (
                <div className="flex justify-between items-center mt-5" key={index}>
                  <div className="flex items-center gap-4">
                    <img src={Profile} className="lg:w-[40px] lg:h-[40px]" />
                    <p className="font-bold text-[15px] lg:text-[18px] leading-[24px] text-[#000000]">
                      {subject.name}
                    </p>
                  </div>
                  <div>
                    <p className="font-normal text-[12px] leading-[21px] text-[#000000]">
                      {percentage}% Completed
                    </p>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={percentage}
                      className="accent"
                    />
                  </div>
                </div>
              );
            })}

            {/* Show overall performance as well */}
            {subjectsData.length > 0 && (
              <div className="flex justify-between items-center mt-5 border-t pt-5">
                <div className="flex items-center gap-4">
                  <img src={Profile} className="lg:w-[40px] lg:h-[40px]" />
                  <p className="font-bold text-[15px] lg:text-[18px] leading-[24px] text-[#000000]">
                    Overall Subject Progress
                  </p>
                </div>
                <div>
                  <p className="font-normal text-[12px] leading-[21px] text-[#000000]">
                    {overallPerformance}% Completed
                  </p>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={overallPerformance || 0}
                    className="accent"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
        {/* <div className="">
          <div className=" rounded-[12px] py-[20px] px-[25px] bg-[#FFFFFF] activity ">
            <div className="flex items-center justify-between">
              <div>
                <h2 className=" font-extrabold  text-[15px] lg:text-[22px] leading-[30px] text-[#000000]">
                  Performance History
                </h2>
              </div>
              <div className=" text-[12px] cursor-pointer lg:text-[14px] leading-[19px] font-normal text-[#0B6661] ">
              View All
             </div>
            </div>

            <div className=" lg:px-[20px] py-[30px] flex flex-col gap-4 ">
              {userData?.bookmarks?.map((item, i) => {
                return (
                  <>
                    <div
                      key={i}
                      className="flex h-full flex-col rounded-2xl bg-[#F9FCFF] p-4"
                    >
                      <div className="mb-3 text-[10px] font-extrabold text-[#999999]">
                        {item?.updated_at}
                      </div>
                      <div className="flex flex-col gap-y-2">
                        <div className="text-[0.875rem] font-bold">
                          {userData?.leaderboardDetails?.user?.name}{" "}
                          Watched {item?.video?.title}
                        </div>
                        <div className="mb-3 text-[10px] text-[#126DFB]">
                          {item?.created_at}
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </div> */}
       </div>
    </div>
  );
};

export default ActivityLog;
