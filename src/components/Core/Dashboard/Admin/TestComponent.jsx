import React from "react";
import Headcomponent from "../../../common/Headcomponent";
import bookopen from "../../../../assets/images/bookopen.png";
import ActivityHistory from "../../Userpage/ActivityHistory";
import PieChart from "../../Userpage/piechart";

const TestComponent = () => {
  const data = [
    {
      id: 1,
      label: "ID",
      value: "TES110201",
    },
    {
      id: 2,
      label: "Date of registration",
      value: "10-10-2020",
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
      value: "John Doe",
    },
    {
      id: 2,
      label: "Gender",
      value: "Male",
    },
    {
      id: 3,
      label: "Date of Birth",
      value: "10-10-2020",
    },
    {
      id: 4,
      label: "Email",
      value: "sidd@gmail.com",
    },
    {
      id: 5,
      label: "Phone Number",
      value: "+234 9065245732",
    },
    {
      id: 6,
      label: "Address",
      value: "sid",
    },
  ];
  const ListData = [
    {
      id: 1,
      name: "Mathematics",
      icon: bookopen,
    },
    {
      id: 2,
      name: "English ",
      icon: bookopen,
    },
    {
      id: 3,
      name: "Science",
      icon: bookopen,
    },
  ];
  const LiveData = [
    {
      id: 1,
      Date: "25 Janurary 2023",
      items: [
        {
          name: "Logged In",
          icon: bookopen,
        },
        {
          name: "English for Secondary school Exam",
          icon: bookopen,
        },
      ],
    },
    {
      id: 2,
      Date: "24 Janurary 2023",
      items: [
        {
          name: "Logged In",
          icon: bookopen,
        },
      ],
    },
  ];
  const info = [300, 50, 100, 40, 120];
  const labels = ['Red', 'Blue', 'Yellow', 'Green', 'Purple'];
  return (
    <div className="mt-5">
      <div className=" w-full rounded-2xl border py-[10px] px-[12px] lg:px-[18px]   bg-[#FFFFFF] ">
        <div className="Border">
          <Headcomponent value="Basic Information" />
        </div>
        <div className=" lg:grid grid-cols-2 gap-5">
          <div className="rounded-2xl p-[8px] bg-[#F2F2F2] pb-[20px] h-[205px] mt-5">
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
              <div className=" text-green-500">Edit</div>
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

      <div className="mt-5 lg:grid grid-cols-2 gap-4 px-[10px] ">
        <div className=" mt-5 lg:mt-0 w-full rounded-2xl border py-[10px] lg:px-[18px]    bg-[#FFFFFF] ">
          <div className="Border lg:pl-0 pl-[6px]">
            <Headcomponent value={"Subjects"} />
            <div className=" flex  justify-end  my-[10px]">
              <button className=" text-[12px] lg:text-[14px] leading-[20px] text-center font-bold  w-[121px] h-[31px] lg:-[122px] lg:h-[40px] rounded-lg lg:py-[7px] lg:px-[12px]  mr-[5px] lg:mr-0 bg-[#27AE60] text-white">
                Add Subject
              </button>
            </div>
          </div>
          <div className="rounded-2xl p-[10px] bg-[#F2F2F2] px-[5px]  lg:pb-[20px] mt-5">
            <div className="px-[10px]">
              <div className="bg-[#FFFFFF] py-[10px] px-[10px] mt-[10px] rounded-[8px] flex flex-col gap-4">
                {ListData.map((item) => (
                  <div>
                    <div className="flex flex-col gap-5">
                      <div className="flex items-center gap-3">
                        <div className="w-[32px] h-[32px] rounded-[16px] bg-[#EBF2ED] relative">
                          <img
                            src={item.icon}
                            alt=""
                            className=" absolute top-[8px] left-[9px]"
                          />
                        </div>
                        <div>
                          <p className="text-[14px] lg:text-[16px]">
                            {item.name}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <div className=" flex justify-center">
                <button className=" rounded-[5px] font-normal text-[14px] leading-[18px] text-[#000000]  py-[6px] px-[19px] text-center bg-[#F2F2F2] border border-[#ECEDEE] h-[37px] w-[98px]">View All</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className=" mt-5 lg:mt-0 w-full rounded-2xl border py-[10px] lg:px-[18px] px-[8px]  bg-[#FFFFFF] ">
          <div className="Border">
            <Headcomponent value={"Live Classes Schedule"} />
            <div className=" flex  justify-end  my-[10px]">
              <button className="text-[14px] leading-[20px] text-center font-bold  w-[141px] h-[40px] rounded-lg py-[7px] px-[12px] bg-[#27AE60] text-white">
                Add Live Classes
              </button>
            </div>
          </div>
          <div className="rounded-2xl p-[10px] bg-[#F2F2F2]  pb-[20px] mt-5">
            <div className="px-[10px]">
              <div className="bg-[#FFFFFF] py-[10px] px-[10px] mt-[10px] rounded-[8px] flex flex-col gap-4">
                {LiveData.map((data) => (
                  <div key={data.id}>
                    <div className=" py-[10px]">
                      <h6 className="font-light text-[12px] leading-[13px] text-[#767676]">
                        {data.Date}
                      </h6>
                    </div>
                    <div className="flex flex-col gap-5">
                      {data.items.map((item, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className="w-[32px] h-[32px] rounded-[16px] bg-[#EBF2ED] relative">
                            <img
                              src={item.icon}
                              alt=""
                              className=" absolute top-[8px] left-[9px]"
                            />
                          </div>
                          <div>
                            <p className="text-[14px] lg:text-[16px]">
                              {item.name}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                    <div className=" flex justify-center">
                <button className=" rounded-[5px] font-normal text-[14px] leading-[18px] text-[#000000]  py-[6px] px-[19px] text-center bg-[#F2F2F2] border border-[#ECEDEE] h-[37px] w-[98px]">View All</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      
        <div className=" mt-5 lg:mt-0 w-full rounded-2xl border py-[10px] lg:px-[18px] px-[8px] h-[470px]  bg-[#FFFFFF] ">
            <div className="Border">
          <Headcomponent value={"Activity History"}
          />
          </div>
          <div className="rounded-2xl p-[10px] bg-[#F2F2F2]  pb-[20px] mt-5">
      <div className="px-[10px]">
        <h3 className=" font-medium text-[16px] leading-[35px] text-[#49454F]">Activity History</h3>
        <div className="bg-[#FFFFFF] py-[10px] px-[10px] mt-[10px] rounded-[8px] flex flex-col gap-4" >
          {
            LiveData.map((data) => (
              <div key={data.id}>
                <div className=" py-[10px]">
                  <h6 className="font-light text-[12px] leading-[13px] text-[#767676]">
                    {data.Date}
                  </h6>
                </div>
                <div className="flex flex-col gap-5">
                  {data.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div>
                        <img src={item.icon} alt="Icon" />
                      </div>
                      <div>
                        <p className='text-[14px] lg:text-[16px]'>{item.name}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          }
        <div className=" flex justify-center">
                <button className=" rounded-[5px] font-normal text-[14px] leading-[18px] text-[#000000]  py-[6px] px-[19px] text-center bg-[#F2F2F2] border border-[#ECEDEE] h-[37px] w-[98px]">View All</button>
                </div>
        </div>
      </div>
    </div>
        </div>

        <div className="">
          <div className=" w-full rounded-2xl border py-[10px] px-[18px]   bg-[#FFFFFF] ">
            <div className="Border">
          <Headcomponent value={"Report"}/>
          </div>
            <div className="rounded-2xl p-[10px] bg-[#F2F2F2] mt-5">
              <div className="px-[5px]">
                <h3 className=" font-medium text-[16px] leading-[35px] text-[#49454F]">General Performance</h3>
                <div className="bg-[#FFFFFF] py-[10px] px-[10px] mt-[10px] rounded-[4px] flex flex-col gap-4" >
                 <PieChart data={info} labels={labels}/>
                </div>
              </div>
            </div>
            <div className="rounded-2xl p-[10px] bg-[#F2F2F2] mt-5">
              <div className="px-[5px]">
                <h3 className=" font-medium text-[16px] leading-[35px] text-[#49454F]">Certain Performance</h3>
                <div className="bg-[#FFFFFF] py-[10px] px-[10px] mt-[10px] rounded-[4px] flex flex-col gap-4" >
                <PieChart data={info} labels={labels}/>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default TestComponent;
