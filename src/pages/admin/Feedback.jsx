import React, { useState, useEffect } from "react";
import Headcomponent from "../../components/common/Headcomponent";
import Userfeedback from "../../components/Core/Dashboard/Admin/Userfeedback";
import { FaChevronLeft } from "react-icons/fa";
import Modal from "../../components/common/Modal";
import { getUsersFeedbackAsync, getUserFeedBacksCsvAsync } from "../../apis/slices/feedBackSlice";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import { CSVLink } from "react-csv";

const Feedback = ({ isOpen }) => {
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
  const [totalFeedback, setTotalFeedback] = useState("");
  const [totalResolvedFeedback, setTotalResolvedFeedback] = useState("");
  const [csvUser, setCsvUser] = useState([]);
  const [progressCsv, setProgressCsv] = useState([]);

  useEffect(() => {
    setLoading(true);
    const newData = {
      page: 1,
      limit: 10,
    };
    getUsersFeedbackAsync({
      dispatch: dispatch,
      data: newData,
      token: token,
      callbackFn: (res) => {
        if (res?.data?.status === 200) {
          // console.log('res', res?.data?.data?.data?.overview?.totalFeedback)
          setdata(res?.data?.data?.data?.feedback);
          setPageData(res?.data?.data?.data?.overview);
          setTotalFeedback(res?.data?.data?.data?.overview?.totalFeedback);
          setTotalResolvedFeedback(res?.data?.data?.data?.overview?.totalResolvedFeedback);
          setLoading(false);
        } else {
          alert(res?.data?.message);
          setLoading(false);
        }
      },
    });
    // getUserFeedBacksCsvAsync({
    //   dispatch: dispatch,
    //   data: newData,
    //   token: token,
    //   callbackFn: (res) => {
    //     if (res?.data?.status === 200) {
    //       setCsvUser(res?.data?.data?.feedback);
    //       setLoading(false);
    //     } else {
    //       alert(res?.data?.message);
    //       setLoading(false);
    //     }
    //   },
    // });
  }, []);


  const [isActive, setIsActive] = useState(false);
  const handleClick = () => {
    setIsActive(!isActive);
    setIsModalOpen(true);
  };
  return (
    <div
      className={` py-[7rem] lg:px-[5rem]  px-[10px] ${isOpen ? "xl:ml-[260px]" : ""
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
        <FaChevronLeft onClick={() => Navigate(-1)} className="cursor-pointer" />

        <div>
          <div className=" font-normal text-[14px] lg:text-[16px] leading-[20px] text-[#B6B6B6]">
            Home /<span className="text-black font-medium"> User Feedback</span>
          </div>
        </div>
      </div>
      <div>
        <h2 className=" font-bold text-[22px]  leading-[28px] text-[#2C2E32] mt-7">
          Users Feedback
        </h2>
        <div className="lg:flex gap-[10px]  justify-between mt-5 ">
          <div className="p-[10px] bg-[#FFFFFF] flex flex-col gap-2  w-full lg:h-[72px]  py-[10px]  px-[15px] rounded-xl">
            <div>
              <p className="text-[12px] leading-[12px] text-[#001D4A] mt-2">
                Total Feedback
              </p>
            </div>
            <div>
              <p className="font-meduim text-[20px] leading-[20px]">
                {totalFeedback}
              </p>
            </div>
          </div>

          <div className="p-[10px] bg-[#FFFFFF] flex flex-col gap-2  lg:mt-0 mt-5  w-full lg:h-[72px]  py-[10px]  px-[15px] rounded-xl">
            <div className="">
              <p className="text-[12px] leading-[12px] text-[#001D4A] mt-2">
                Total Resolved Feedback
              </p>
            </div>
            <div>
              <p className="font-meduim text-[20px] leading-[20px]">
                {totalResolvedFeedback}
              </p>
            </div>
          </div>
        </div>
        <div
          className={`border border-[#27AE60] w-[120px] h-[40px] rounded-lg py-[7px] px-[16px] mt-3 float-right bg-[#27AE60]`}
        >
          <CSVLink
            style={{ textDecoration: "none", color: "white" }}
            data={data}
            separator={";"}
            filename="User_List.csv"
          >
            <button
              className={`text-[14px] leading-[20px] text-center text-white `}
            // onClick={handleClick}
            >
              Export CSV
            </button>

          </CSVLink>
        </div>
      </div>

      <div className="mt-[60px]">
        <Userfeedback />
        {isModalOpen && <Modal csvData1={csvUser} csvData2={progressCsv} closeModal={handleModalClose} label="Export" />}
      </div>
    </div>
  );
};

export default Feedback;
