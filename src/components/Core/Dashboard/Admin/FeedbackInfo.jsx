
import Vector from "../../../../assets/images/Vector.png";
import SearchButton from "../../../../assets/images/Searchbutton.png";
import Message from "../../../common/Message";
import React, { useState,useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {getUserFeedbackAsync } from "../../../../apis/slices/feedBackSlice";
import { useDispatch, useSelector } from "react-redux";
import { TailSpin } from "react-loader-spinner";
import {toast} from "react-toastify";

const FeedbackInfo = () => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("authToken");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModalClose = () => {
    setIsModalOpen(false);
  };
  const [pageData, setPageData] = useState({});
  const [data1, setdata1] = useState([]);
  const [searchValue, setVearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [totalFeedback, setTotalFeedback] = useState("")
  const [data, setData] = useState([  
    {
      id: 1,
      label: "First Name",
      value: "-",
    },
    {
      id: 2,
      label: "Last Name",
      value: "-",
    },
    {
      id: 3,
      label: "ID",
      value: "-",
    },
    {
      id: 4,
      label: "Date of registration",
      value: "-",
    },
    {
      id: 5,
      label: "Channel",
      value: "-",
    },
    {
      id: 6,
      label: "Date Sent",
      value: "-",
    },
    {
      id: 7,
      label: "Email",
      value: "-",
    },
    {
      id: 8,
      label: "Phone Number",
      value: "-",
    },
    {
      id: 9,
      label: "Status",
      value: "-",
    },
  ])

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
          setdata1(res?.data?.data?.feedback);
          const feedback = res?.data?.data?.feedback
          const updatedData = data.map(item => {
            switch (item.label) {
              case 'First Name':
                return { ...item, value: feedback.Users.first_name };
              case 'Last Name':
                return { ...item, value: feedback.Users.last_name };
              case 'ID':
                return { ...item, value: feedback.Users.student_id };
              case 'Status':
                return { ...item, value: feedback.status };
              case 'Email':
                return { ...item, value: feedback.Users.email || "Not Provided" };
              case 'Phone Number':
                return { ...item, value: feedback.Users.mobile || "Not Provided" };
              case 'Date of registration' : 
              return { ...item, value: feedback.created_at || "Not Provided" };
              case 'Date Sent' : 
              return { ...item, value: feedback.updated_at || "Not Provided" };
              case 'Channel' : 
              return { ...item, value: feedback.Users.userCourses[0].classes.name || "Not Provided" };
              // case 'Email' : 
              // return { ...item, value: feedback.Users?.email || "Not Provided" };
              default:
                return item;
            }
          });
      
          setData(updatedData);
          setLoading(false);
        } else {
          alert(res?.data?.message);
          setLoading(false);
        }
      },
    });
  }, []);

  
  return (
    <div>
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
      <div className="mt-10 bg-[#FFFFFF] border border-[#ECEDEE]  rounded-[18px]  pb-[20px] box-shadow">
        <div className="Border">
          <div className="flex justify-between items-center py-[10px] px-[15px] ">
            <div>
              <h2 className=" font-medium text-[18px] leading-[25px] text-[#2C2E32]">
                Feedback Information
              </h2>
            </div>
            <div className="flex items-center">
              <div className="w-[39px] h-[42px]">
                <img src={SearchButton} />
              </div>
              <div className="w-[24px] h-[24px]">
                <img src={Vector} />
              </div>
            </div>
          </div>
        </div>
        <div className="px-[10px] mt-5">
          <div className=" rounded-2xl bg-[#F2F2F2] p-[16px]">
            <div className="bg-[#FFFFFF] py-[10px] px-[8px] rounded-[4px]">
              {data.map((item) => (
                <div
                  key={item.id}
                  className=" flex gap-2 md:gap-[30rem] lg:gap-[40rem] mt-2 "
                >
                  <div className=" w-[121px] md:w-[121px] lg:w-[121px] font-normal text-[14px] leading-[18px] text-[#1F1F1FB2]">
                    {item.label}
                  </div>
                  
                  <div className="">
                  {item.label == "Status" ?  <div style={{backgroundColor:item?.value == "PENDING" ? "#ec3939" :"#70FFB7"}} className="h-[20px] px-10 w-full rounded-[15px] text-black font-normal text-[13px] leading-[15px] text-center">
                    {item.value}
                    </div> : <p className=" font-normal   text-[16px] leading-[20px] text-[#222222E5]">
                    {item.value}
                    </p>
                  }
                    
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    <Message data={data1} />
    </div>
  );
};

export default FeedbackInfo;
