import React, { useState, useEffect } from 'react'
import Custombutton from '../../../components/common/Custombutton'
import sharp from '../../../assets/images/sharp.png'
import bookopen from "../../../assets/images/bookopen.png";
import Button from '../../../components/common/Button';
import Details from '../../../components/Core/Dashboard/Admin/Details';
import { FaChevronLeft } from "react-icons/fa";
import { getLiveClassAsync } from "../../../apis/slices/liveClassSlice";
import { TailSpin } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import moment from "moment";
import { useNavigate } from "react-router-dom";


const LiveClassDetails = ({ isOpen }) => {
  const Navigate = useNavigate();
  const token = localStorage.getItem("authToken");
  const dispatch = useDispatch();
  const [adminData, setAdminData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageData, setPageData] = useState({});
  const [classData, setClassData] = useState("")

  useEffect(() => {
    setLoading(true);
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    getLiveClassAsync({
      dispatch: dispatch,
      data: {
        id: id,
      },
      token: token,
      callbackFn: (res) => {
        setAdminData(res?.data?.data?.live_class);
        setLoading(false);
      },
    });
  }, []);
  return (
    <div
      className={`py-[7rem] lg:px-[5rem]  flex flex-col gap-2 px-[10px] ${isOpen ? "xl:ml-[260px]" : ""}`}>
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
        <FaChevronLeft onClick={() => Navigate(-1)} className="cursor-pointer" />

        <div>
          <div className=' font-normal text-[14px] lg:text-[16px] leading-[20px] text-[#B6B6B6]'>Home / Practice /<span className='text-black font-medium'>One-on-One Classes Details</span></div>
        </div>
      </div>
      <div className="bg-[#EFF6F1] mt-5 border rounded-lg lg:mb-[20px] border-[#CAC4D0] h-[80px] p-[8px]">
        <div className="flex items-center gap-4">
          <div className="w-[32px] h-[32px] rounded-[16px] bg-[#F8F5ED] relative">
            <img src={bookopen} alt="" className=" absolute top-[8px] left-[9px]" />
          </div>
          <div className="">
            <p className=" font-bold text-[16px] leading-[24px] lg:pb-0  tracking-wider text-[#1D2026]">
              {adminData?.class?.name} - {adminData?.subject?.name}
            </p>
            <div>
              <Custombutton
                value={adminData?.active ? "Visible" : "Hidden"}
                img={sharp}
                backgroundcolor={
                  adminData?.active ? "bg-[#E9FDEE]" : "bg-[#565656]"
                }
                textcolor={
                  adminData?.active ? "text-[#2760EA]" : "text-[#707070]"
                }
                imagePosition="left"
                width="w-[120px]"
              />
            </div>
          </div>
        </div>
      </div>
      <div>
        <div
          className="flex items-center justify-end"
        >
          <button onClick={() => {
            window.open(
              adminData?.zoom_meeting_url,
              '_blank' // <- This is what makes it open in a new window.
            );
          }} className=" border  rounded-[8px] bg-[#27AE60] text-white   text-[14px] leading-[20px]  pt-[2px]  w-[128px] h-[40px] text-center cursor-pointer">
            Launch Class
          </button>
        </div>
      </div>
      <Details adminData={adminData} />

    </div>
  )
}

export default LiveClassDetails
