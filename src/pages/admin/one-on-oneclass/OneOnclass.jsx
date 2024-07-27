import React, { useEffect, useState } from "react";
import OneClassList from '../../../components/Core/Dashboard/Admin/OneClassList'
import live from '../../../assets/images/live.png'
import liveimage from '../../../assets/images/liveimage.png'
import UserCard from "../../../components/common/UserCard";
import LiveclasesList from "../../../components/Core/Dashboard/Admin/LiveclasesList";
import { useNavigate } from "react-router-dom";
import Ynotes from "../../../assets/images/Ynotes.png";
import { FaChevronLeft } from "react-icons/fa";
import Headcomponent from "../../../components/common/Headcomponent";
import bookopen from "../../../assets/images/bookopen.png";
import Custombutton from "../../../components/common/Custombutton";
import sharp from "../../../assets/images/sharp.png";
import container from "../../../assets/images/container.png";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import Modal2 from "../../../components/common/Modal2";
import { getLiveClassesAsync,deleteLiveClassAsync } from "../../../apis/slices/liveClassSlice";
import { TailSpin } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import moment from "moment";

const OneOnclass = ({isOpen}) => {
    const Navigate=useNavigate();

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
  const [classData, setClassData] =  useState("")
  useEffect(() => {
    setLoading(true);
    getLiveClassesAsync({
      dispatch: dispatch,
      data: {
        page: 1,
        page_size: 10,
        class_type: "OTO",
      },
      token: token,
      callbackFn: (res) => {
        setAdminData(res?.data?.data?.live_classes);
        setPageData(res?.data?.data?.paging);
        setLoading(false);
      },
    });
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const onDeleteClass = (value) =>{
       deleteLiveClassAsync({
        dispatch: dispatch,
        data: {
          id:value
        },
        token: token,
        callbackFn: (res) => {
          getLiveClassesAsync({
            dispatch: dispatch,
            data: {
              page: 1,
              page_size: 10,
              class_type: "OTO",
            },
            token: token,
            callbackFn: (res) => {
              setAdminData(res?.data?.data?.live_classes);
              setPageData(res?.data?.data?.paging);
              setLoading(false);
              closeModal()
              setClassData("")
            },
          });
        },
      });
  };
  
  return (
    <div
    className={`py-[7rem] lg:px-[5rem]  flex flex-col gap-2 px-[10px] ${isOpen ? "lg:ml-[260px]" : ""}`}>
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
    <div className='flex justify-start  items-center lg:gap-3'>
        <FaChevronLeft />
        <div>
          <div className=' font-normal text-[14px] lg:text-[16px] leading-[20px] text-[#B6B6B6]'>Home / <span className='text-black font-medium'>Live Classes</span></div>
        </div>
      </div>
    <h2 className=" font-bold text-[22px] mt-5  leading-[28px] text-[#2C2E32] ">
    One -on-One Classes
    </h2>
    <div className=" mt-5 ">
      <UserCard
        label="Total 1-on-1 Classes"
        height="h-[111px]"
        backgroundcolor="bg-[#FFFFFF]"
        value={pageData?.total}
        imgbg={live}
        imglogo={liveimage}
      />
    </div>
    <div className=" flex  justify-end mt-4 ">
      <button className="text-[14px] leading-[20px] text-center font-bold  w-[200px] h-[40px] rounded-lg py-[7px] px-[12px] bg-[#F2994A] text-white" onClick={()=>Navigate('/Addone-on-oneClass')}>
     + Add One-on-One Class
      </button>
    </div>
   {/*<OneClassList/>*/}
   <div className="bg-[#FFFFFF] lg:p-4 mt-5 lg:pl-[8px] pl-[8px] rounded-[18px] pb-[20px]">
        <Headcomponent value="One-on-One Classes List" border="Border" />
        <div className="">
          <ul>
            {adminData.map((user, i) => (
              <li key={i}>
                <div className=" md:flex lg:flex justify-between  items-center gap-4">
                  <div className="lg:px-[18px] py-[10px] mt-5 flex  gap-[10px] pr-[15px]">
                    <div className="w-[32px] h-[32px] rounded-[16px] bg-[#F8F5ED] relative">
                      <img
                        src={bookopen}
                        alt=""
                        className=" absolute top-[8px] left-[9px]"
                      />
                    </div>
                    <div>
                      <h6
                        className=" font-bold text-[14px] leading-[24px] text-[#1D2026] cursor-pointer "
                        onClick={() => {
                          Navigate(`/LiveClassDetails?id=${user?.id}`);
                        }}
                      >
                        {user?.course?.name} - {user?.subject?.name}
                      </h6>
                      <span className=" font-normal text-[12px] leading-[24px] text-[#0F62FE]">
                        {moment(user?.date)?.format("DD.MM.YYYY")}
                      </span>
                      <span className=" font-normal text-[12px] ml-1 leading-[24px] text-[#0F62FE]">
                        {user?.start_time}
                      </span>
                      <div className="flex items-center gap-3 px-[18px]">
                        {/* <div>
                    <img src={item.icon1} alt="Icon 1" />
                  </div> */}
                        <div className="flex items-center  gap-2  cursor-pointer">
                          <p className=" font-normal text-[12px] leading-[15px] text-[#000000] ">
                            {user?.teacher?.name}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Custombutton
                      value={user?.active ? "Visible" : "Hidden"}
                      img={sharp}
                      backgroundcolor={
                        user?.active ? "bg-[#E9FDEE]" : "bg-[#565656]"
                      }
                      textcolor={
                        user?.active ? "text-[#2760EA]" : "text-[#707070]"
                      }
                      imagePosition="left"
                    />
                    <img src={container} onClick={()=>{
                      setClassData(user)
                      openModal()}} />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="user">
          <Custombutton
            value="Previous"
            hidden="hidden"
            icon={<FaArrowLeft />}
            backgroundcolor="bg-[#F2F2F2]"
            textcolor="text-[#000000]"
            imagePosition="left"
            width="w-[115px]"
             onClick={() => {
              if (page > 1) {
              setLoading(true);
                const newData = {
                  page: page - 1,
                  page_size: 10,
                 class_type: "OTO",
                };
                setPage(page - 1);
                getLiveClassesAsync({
                  dispatch: dispatch,
                  data: newData,
                  token: token,
                  callbackFn: (res) => {
                    setAdminData(res?.data?.data?.live_classes);
                    setPageData(res?.data?.data?.paging);
                    setLoading(false);
                  },
                });
              }
            }}
          />
          <div className="text-[#667085] text-[12px]">
          Page {pageData.currentPage} of {pageData?.total_pages}
        </div>
          <Custombutton
            value="Next"
            hidden="hidden"
            icon={<FaArrowRight />}
            backgroundcolor="bg-[#F2F2F2]"
            textcolor="text-[#000000]"
            imagePosition="right"
            onClick={() => {
              if (page <= pageData.total_pages) {
                setLoading(true);
                const newData = {
                  page: page + 1,
                  page_size: 10,
                  class_type: "OTO",
                };
                setPage(page + 1);
                getLiveClassesAsync({
                  dispatch: dispatch,
                  data: newData,
                  token: token,
                  callbackFn: (res) => {
                    setAdminData(res?.data?.data?.live_classes);
                    setPageData(res?.data?.data?.paging);
                    setLoading(false);
                  },
                });
              }
            }}
          />
        </div>

        <Modal2 isOpen={isModalOpen} onDelete={onDeleteClass} data={classData} onClose={closeModal} />
      </div>
  </div>
  )
}

export default OneOnclass
