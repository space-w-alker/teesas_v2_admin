
import React, { useState,useEffect } from "react";
import FeedbackInfo from '../../components/Core/Dashboard/Admin/FeedbackInfo'
import { FaChevronLeft } from "react-icons/fa";
import { Navigate, useNavigate } from "react-router-dom";
import {getUserFeedbackAsync } from "../../apis/slices/feedBackSlice";
import { useDispatch, useSelector } from "react-redux";
import { TailSpin } from "react-loader-spinner";

const UserFeedbackDetails = ({isOpen}) => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("authToken");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModalClose = () => {
    setIsModalOpen(false);
  };
  const [pageData, setPageData] = useState({});
  const [data, setdata] = useState([]);
  const [searchValue, setVearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [totalFeedback, setTotalFeedback] = useState("")

  useEffect(() => {
    setLoading(true);
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    const newData = {
      feedback_id: id,
    };
    getUserFeedbackAsync({
      dispatch: dispatch,
      data: newData,
      token: token,
      callbackFn: (res) => {
        if (res?.data?.status === 200) {
          setdata(res?.data?.data?.feedback);
          setLoading(false);
        } else {
          alert(res?.data?.message);
          setLoading(false);
        }
      },
    });
  }, []);
  return (
    <div className={` py-[7rem] lg:px-[5rem]  px-[10px] ${isOpen ? "xl:ml-[260px]" : ""}`}>
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
        <TailSpin color="orange" radius={5}  />
      </div>
    )}
        <div className='flex justify-start  items-center lg:gap-3'>
        <FaChevronLeft />
        <div>
          <div className=' font-normal text-[14px] lg:text-[16px] leading-[20px] text-[#B6B6B6]'>Home / User Feedback /<span className='text-black font-medium'> User Feedback Details</span></div>
        </div>
      </div>
    <div className="bg-[#FFF9ED] border rounded-lg  mt-10 mb-[20px] border-[#CAC4D0] h-[68px] p-[8px]">
      <div className="flex items-center gap-4">
        <div>
          {/* <img src={letter} className="w-[40px] h-[40px]" /> */}
        </div>
        <div className="">
          <p className=" font-bold text-[16px] leading-[24px]  tracking-wider text-[#1D2026]">
            {data?.Users?.first_name} {data?.Users?.last_name}
          </p>
          {data?.Users?.status == 1 ? 
          <button className="w-[64px] h-[20px] rounded-full font-medium text-[13px] leading-[15px] mt-[4px] pt-[2px]  text-white bg-[#08AA58]">
            Active
          </button> : <button className="w-[64px] h-[20px] rounded-full font-medium text-[13px] leading-[15px] mt-[4px] pt-[2px]  text-white bg-[#aa0808]">
          Inactive
        </button>
          }
          
        </div>
      </div>
    </div>
    <div>
        <p className=' text-[14px] leading-[20px] text-center text-[#F2994A] cursor-pointer' onClick={()=>{
           Navigate(`/userDetails?id=${data?.Users?.id}`)}}>View Profile</p>
    </div>

  <FeedbackInfo/>
    </div>
  )
}

export default UserFeedbackDetails
