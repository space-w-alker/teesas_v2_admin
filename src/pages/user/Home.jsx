import React, { useEffect, useState } from "react";
import Navigation from "../../components/common/Navigation";
import frame2 from "../../assets/images/Frame2.png";
import UserCard from "../../components/common/UserCard";
import Button from "../../components/common/Button";
import StudentList from "../../components/Core/StudentList";
import Headcomponent from "../../components/common/Headcomponent";
import arrow_upward from '../../assets/images/arrow_upward.png'
import { useDispatch, useSelector } from "react-redux";
// import { getUsersCsv, userAsync, getUserCsvAsync } from "../../apis/slices/authSlice";
import { FaChevronLeft } from "react-icons/fa";
import notes from "../../assets/images/Group1000001600.png";
import { TailSpin } from "react-loader-spinner";
import { fetchUsersAsync } from "../../apis/slices/userSlice";
import { getUserCsvAsync } from "../../apis/slices/authSlice";
import { exportUsersCsv } from "../../apis/slices/userSlice";
import { useNavigate } from "react-router-dom";




const Home = ({ isOpen, toggleSidebar }) => {
  const [selectedMonth, setSelectedMonth] = useState("August");
  const [data, setdata] = useState([]);
  const token = localStorage.getItem("authToken");
  const [dashFilter, setDashFilter] = useState('Daily');
  const [csvUser, setCsvUser] = useState([]);
  const [progressCsv, setProgressCsv] = useState([]);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const Navigate = useNavigate();

  const userList = useSelector((state) => state.users?.userList?.overview);
  const Tdata = useSelector((state) => state.users?.userList?.usersList);
  const exportResponse = useSelector((state) => state.users?.exportCsvResponse);

  const [sort, setSort] = useState({
    query_params: {
      filters: {
        // course: "",
        // status: "active",
        // location: "",
        // grade: ""
      },
      sort: {
        field: "userName",
        order: "asc"
      }
    }
  });


  useEffect(() => {

    dispatch(exportUsersCsv({ dispatch, token }));

    dispatch(fetchUsersAsync({ dispatch, params: sort, token }));
  }, [dispatch, token]);

  // const csvUser = [
  //   ["firstname", "lastname", "email"],
  //   ["Ahmed", "Tomi", "ah@smthing.co.com"],
  //   ["Raed", "Labes", "rl@smthing.co.com"],
  //   ["Yezzi", "Min l3b", "ymin@cocococo.com"]
  // ];
  // useEffect(() => {
  //   dispatch(fetchUsersAsync({ dispatch, params: sort }));
  //   dispatch(getUserCsvAsync({
  //     dispatch: dispatch,
  //     data: {},
  //     token: token,
  //     callbackFn: (res) => {
  //       if (res?.data?.status == 200) {
  //         console.log(res?.data?.data?.users)
  //         // setCsvUser(res?.data?.data?.users);
  //         // setProgressCsv(res?.data?.data?.user_progress)
  //         setLoading(false);
  //       } else {
  //         //toast.error(res?.message);
  //         setLoading(false);
  //       }
  //     },
  //   }));
  // }, [dispatch]);


  // Extract headers dynamically
  // const headers = Object.keys(data[0]).map(key => ({ label: key, key }));
  // useEffect(() => {
  //   if (!Tdata || !Tdata.length) {

  const flatData = Tdata?.map(item => ({
    ...item,
    parent: item.parent ? JSON.stringify(item.parent) : "", // Convert nested object to string
  }));
  // setCsvUser(flatData)
  // }
  // }, []);
  console.log('homedata', Tdata, flatData, userList);

  // useEffect(() => {
  //   setLoading(true);
  //   const saveData = {
  //     filter: dashFilter,
  //   }
  //   userAsync({
  //     dispatch: dispatch,
  //     data: saveData,
  //     token: token,
  //     callbackFn: (res) => {
  //       if (res?.status == 200) {
  //         setdata(res?.data?.statistics);
  //         // setLoading(false);
  //       } else {
  //         //toast.error(res?.message);
  //         // setLoading(false);
  //       }
  //     },
  //   });
  //   //setLoading(true)
  //   

  // }, []);

  return (
    <div>
      <div
        className={` py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""}`}>
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
        <div className='flex justify-start items-center lg:gap-3'>
          <FaChevronLeft onClick={() => Navigate(-1)} className="cursor-pointer" />
          <div>
            <div className=' font-normal text-[14px] lg:text-[16px] leading-[20px] text-[#B6B6B6]'>Home /<span className='text-black font-medium'> Users</span></div>
          </div>
        </div>
        <h2 className=" font-bold text-[22px]  leading-[28px] text-[#2C2E32] mt-10 ">
          Users
        </h2>
        <div className="flex gap-5 flex-col mt-4 ">
          <UserCard
            label="Total User"
            height="h-[153px]"
            backgroundcolor="bg-[#FFFFFF]"
            value={userList?.totalUsers}
            // value2={userList?.totalUsers + "% Since yesterday"}
            // img={arrow_upward}
            img2={notes}
          />
          <div className="  lg:h-[214px] py-[16px] px-[17px] rounded-xl bg-[#FFFFFF]">
            <div className="flex items-center justify-end mb-[10px] ">
              {/* <button className=" font-normal text-[14px] leading-[18px] text-[#000000]">
                Monthly
              </button>
              <img src={frame2} className="w-[22px] h-[22px]" /> */}
              {/* <select
                type="text"
                name="dashFilter"
                value={dashFilter}
                onChange={(e) => {
                  setLoading(true);
                  setDashFilter(e.target.value);
                  const saveData = {
                    filter: e.target.value,
                  }
                  userAsync({
                    dispatch: dispatch,
                    data: saveData,
                    token: token,
                    callbackFn: (res) => {
                      if (res?.status == 200) {
                        setdata(res?.data?.statistics);
                        setLoading(false);
                      } else {
                        toast.error(res?.message);
                        setLoading(false);
                      }
                    },
                  });

                }}
                className=" mt-1 text-[14px]  outline-none  border border-[#ECEDEE] ml-auto px-[8px] rounded w-[95px] h-[30px]"
              >
                <option value="Daily">Daily</option>
                <option value="Monthly" >Monthly</option>
                <option value="Yearly" >Yearly</option>

              </select> */}
            </div>
            <div className="lg:flex  block  gap-[10px] ">
              <UserCard
                label="Total Active Users"
                width="lg:w-[50%]"
                height="lg:h-[142px]"
                backgroundcolor="bg-[#F2F2F2]"
                value={userList?.activeUsers}
                // value2={userList?.totalUsers + "% Since yesterday"}
                // img={arrow_upward}
                img2={notes}
              />
              <UserCard
                label="Total Deactivated Users"
                width="lg:w-[50%]"
                height="lg:h-[142px]"
                backgroundcolor="bg-[#F2F2F2]"
                value={userList?.deactivatedUsers}
                // value2={userList?.totalUsers + "% Since yesterday"}
                // img={arrow_upward}
                img2={notes}
              />
            </div>
          </div>
        </div>
        <Button value1={"Export CSV"}
          value2={"Add User"} csvData1={flatData} csvData2={progressCsv} />
        <StudentList />
      </div>
    </div>
  );
};
export default Home;
