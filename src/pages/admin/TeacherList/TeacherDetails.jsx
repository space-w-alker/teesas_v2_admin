import { React, useState, useEffect } from "react";
import letter from "../../..//assets/images/letter.png";
import DetailsTech from "../../../components/Core/Dashboard/Admin/DetailsTech";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTeacherDetailsAsync } from "../../../apis/slices/teacherSlice";
import { TailSpin } from "react-loader-spinner";

const TeacherDetails = ({ isOpen }) => {
  const Navigate = useNavigate();
  const token = localStorage.getItem("authToken");
  const dispatch = useDispatch();
  const [adminData, setAdminData] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const { user } = location.state || {};
    setAdminData(user);
  }, []);
  return (
    <div
      className={` py-[8rem] lg:px-[10rem] px-[10px]  ${isOpen ? "ml-[240px]" : ""
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
      <div className="bg-[#EFF6F1] border rounded-lg mb-[10px] border-[#CAC4D0] h-[60px] p-[8px]">
        <div className="flex items-center gap-4">
          <div className=" rounded-full text-center p-2 w-[40px] h-[40px] bg-[#FFFFFF]">
            {adminData?.first_name?.charAt(0).toUpperCase()}
          </div>
          <div className="">
            <p className=" font-bold text-[16px] leading-[24px]  tracking-wider text-[#1D2026] capitalize">
              {adminData?.first_name} {adminData?.middle_name}{" "}
              {adminData?.last_name}
            </p>
            {/* {adminData?.status == true ? 
          <button className="w-[64px] h-[20px] rounded-full font-medium text-[13px] leading-[15px] mt-[4px] pt-[2px]  text-white bg-[#08AA58]">
            Active
          </button> : <button className="w-[64px] h-[20px] rounded-full font-medium text-[13px] leading-[15px] mt-[4px] pt-[2px]  text-white bg-[#aa0808]">
          Inactive
        </button>
          } */}
          </div>
        </div>
      </div>

      {/* <p className=' font-medium text-[14px] leading-[20px] text-[#27AE60] text-center cursor-pointer '>Delete</p> */}
      <DetailsTech adminData={adminData} />
    </div>
  );
};

export default TeacherDetails;
