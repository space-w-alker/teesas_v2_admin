
import star from '../../assets/images/star.png'
import { CiStar } from "react-icons/ci";
import React, { useState,useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {replyFeedbackAsync } from "../../apis/slices/feedBackSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import { TailSpin } from "react-loader-spinner";

const Message = (data) => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("authToken");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModalClose = () => {
    setIsModalOpen(false);
  };
  const [data1, setdata1] = useState([]);
  const [searchValue, setVearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [data2, setData2] = useState(false)
  const [show, setshow] = useState(false);


  const handleSubmit = ()=> {
    setLoading(true);
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    const newData = {
      feedback_id: id,
      reply:searchValue
    };
    replyFeedbackAsync({
      dispatch: dispatch,
      body: newData,
      token: token,
      callbackFn: (res) => {
        if (res?.data?.status === 200) {
            setshow(!show) 
            setVearchValue("");
            setLoading(false);
            setData2(true)
        } else {
          alert(res?.data?.message);
          setLoading(false);
        }
      },
    });
  }
    
    const handleclick=()=>{
        // setshow(!show) 
        if (!show) {
          setIsModalOpen(true);
        }
        else{
          if(searchValue != ""){
            handleSubmit();
          }
          else{
            toast.error("Please fill required field")
          }
        }

      }
  return (
    <div className="mt-10 bg-[#FFFFFF] border border-[#ECEDEE] rounded-[18px]  pb-[20px] box-shadow">
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
    <div className="">
      <div className=" py-[20px] px-[15px] Border">
        <h2 className=" font-medium text-[18px] leading-[25px] text-[#2C2E32]">
          Message
        </h2>
      </div>
      <p className=' text-end px-[20px] pt-[14px] font-normal text-[14px] leading-[20px] bg-[#27AE60]'>Update Status</p>
    </div>
    <div className="px-[10px] mt-5 h-full">
      <div className=" rounded-2xl bg-[#F2F2F2]  p-[16px] ">
        <div className="bg-[#FFFFFF] pt-[30px] px-[8px] rounded-[4px]">
          <div className="lg:h-[38px] ">
            <p className="text-[14px] leading-4  text-[#222222E5] mb-[5px]">
              {data?.data?.review}
            </p>
          </div>
          <div className=" h-[1px] bg-[#A3A3A3]"></div>
          <div className="mt-2 flex items-center pb-[10px]">
            <span className=" text-[#B8B8B8] text-[12px] font-normal leading-[21px]">
              Rating :
            </span>
            <span className="flex text-[#FF9F1C]">
                  <img src={star}/>
            </span>
          </div>
        </div>
        <div className="mt-4 text-[#27AE60] text-[14px] font-bold">
      {isModalOpen ? "You will have to give us more details so we can help you." : ""}
    </div>

        <div className=" mt-2 p-[8px] rounded-lg ">
          {show ? (
            <>
               {/* <label>Message</label> */}
              <div className="bg-[#FFFFFF] p-[8px]  rounded-lg mt-2 h-[130px] border  border-[#D9D9D9] ">
                <textarea
                  placeholder="Enter Message Here"
                  className=" outline-none w-full "
                  onChange={(e)=>{
                       setVearchValue(e.target.value);
                  }}
                ></textarea>
                   <div className="flex justify-end   gap-[20px] my-[20px]">
                  <button
                    onClick={() => {setshow(!show);
                      setVearchValue("");
                    }}
                    className="text-[#828282] py-[10px] rounded-lg cancel px-[24px] text-[14px] leading-[20px] text-center font-bold "
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-[#27AE60] rounded-lg h-[40px] roundrd-l py-[10px] px-[24px] text-[#FFFFFF] font-bold leading-[20px]"
                    onClick={handleclick}
                  >
                    Send
                  </button>
                </div>
              </div>
          
            </>
          ) : (
            <div style={{display:data2 ? "none":"flex"}} className="flex justify-end items-center">
              <button
                className="text-[14px] leading-[20px]  bg-[#27AE60] h-[40px] rounded-lg py-[10px] px-[24px] text-center  text-white"
                onClick={() => setshow(!show)}
              >
                Reply
              </button>
              </div>
          )}
        </div>
      </div>
    </div>
  </div>
  )
}

export default Message
