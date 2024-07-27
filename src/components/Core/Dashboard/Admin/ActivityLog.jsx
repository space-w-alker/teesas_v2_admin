import React from "react";
import Parctice from "./Parctice";
import BarChart from "./Barcharts";
import Profile from '../../../../assets/images/Profile.png'
import { Bar, Doughnut } from 'react-chartjs-2';

const ActivityLog = (userData, monthlyData, performanceHistory) => {
  const options2 = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' ,
      },
      title: {
        display: true,
        text: 'Monthly Chart',
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
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const subjects=[
    {
        name:"Mathematics"
    },
    {
        name:"English"
    },
    {
        name:"Science"
    },
  ]
  const data2 = {
    labels2,
    datasets: [
      {
        label: 'Points',
        data: userData?.monthlyData,
        backgroundColor: 'rgba(209, 204, 242, 1)',
        // innerWidth: '1rem',
        // outerHeight: '13rem'
      },
    ],
  };
  return (
    <div className="lg:grid grid-cols-2  gap-10 mt-5">
      <div>
        <div className=" rounded-[12px] py-[20px] px-[25px] bg-[#FFFFFF] activity ">
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
          {userData?.userData?.activity_logs?.map((item, i) => {
            return (
              <>
                <div
                  key={i}
                  className='flex h-full flex-col rounded-2xl bg-[#F9FCFF] p-4'
                >
                  <div className='mb-3 text-[10px] font-extrabold text-[#999999]'>
                    {item?.date}
                  </div>
                  {item?.activities?.map((item, i) => {
                    return (
                      <>
                        <div className='flex flex-col gap-y-2'>
                          <div className='text-[0.875rem] font-bold'>
                            {userData?.user?.first_name}{' '}
                            {userData?.user?.last_name} {item?.meta}
                          </div>
                          <div className='mb-3 text-[10px] text-[#126DFB]'>
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
    
      <div className="mt-9">
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
            {userData?.userData?.favorite_lessons?.map((item, i) => {
                    return (
                      <>
                        <div
                          key={i}
                          className='flex h-full flex-col rounded-2xl bg-[#F9FCFF] p-4'
                        >
                          <div className='mb-3 text-[10px] font-extrabold text-[#999999]'>
                            {item?.date}
                          </div>
                          {item?.activities?.map((item, i) => {
                            return (
                              <>
                                <div className='flex flex-col gap-y-2'>
                                  <div className='text-[0.875rem] font-bold'>
                                    {userData?.user?.first_name}{' '}
                                    {userData?.user?.last_name} watched{' '}
                                    {item?.lessonMedia?.title}
                                  </div>
                                  <div className='mb-3 text-[10px] text-[#126DFB]'>
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
        </div>

        <div className=" mt-10">
            <div>
                <h2 className="font-extrabold text-[22px] leading-[30px] text-[#171818]">Stats</h2>
            </div>
            <div className="lg:p-[24px] rounded-[12px] bg-[#FFFFFF] border border-[#EFF1F5] mt-5">
                <div className=" rounded-[8px] lg:p-[16px] bg-[#FFFAF4] lg:w-[460px] lg:h-[290px]">
                <Bar
                // width={150}
                // height={100}
                options={options2}
                data={data2}
              />

                </div>

            </div>
        </div>
        <div className="mt-5 lg:mt-10 ">
            <div>
                <h2 className="font-extrabold text-[18px] lg:text-[22px] leading-[30px] text-[#171818]">Subject Performance</h2>
            </div>
            <div className="lg:p-[24px] rounded-[12px] bg-[#FFFFFF] border border-[#EFF1F5] mt-2 lg:mt-5 px-[8px] ">
           {
            userData?.userData?.subjects?.map((item,i)=>(
                <div className="flex justify-between items-center mt-5" key={i}>
                    <div className="flex items-center gap-4">
                    <img src={Profile} className="lg:w-[40px] lg:h-[40px]"/>
                    <p className=" font-bold text-[15px] lg:text-[18px] leading-[24px] text-[#000000] ">{item.subject_name}</p>
                    </div>
                    <div>
                        <p className=" font-normal text-[12px] leading-[21px] text-[#000000]">20% Completed</p>
                        <input type="range" min="0" max="100" value={item?.total_points} className="accent"/>
                    </div>
                </div>
            ))
           }
            </div>
        </div>
      </div>
      <div>
        <Parctice performanceHistory={userData?.performanceHistory} />
      </div>
    </div>
  );
};

export default ActivityLog;
