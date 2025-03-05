import { React, useState, useEffect } from "react";
import live from "../../../assets/images/live.png";
import liveimage from "../../../assets/images/liveimage.png";
import UserCard from "../../../components/common/UserCard";
import TeacherLists from "../../../components/Core/Dashboard/Admin/TeacherLists";
import { FaChevronLeft } from "react-icons/fa";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTeachersAsync } from "../../../apis/slices/teacherSlice";
import { TailSpin } from "react-loader-spinner";

const TeacherList = ({ isOpen }) => {
  const Navigate = useNavigate();
  const token = localStorage.getItem("authToken");
  const dispatch = useDispatch();
  const [adminData, setAdminData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getTeachersAsync({
      dispatch: dispatch,
      data: {
        page: 1,
        page_size: 10,
      },
      token: token,
      callbackFn: (res) => {
        if (res?.data?.status === 200) {
          setAdminData(res?.data?.data?.total);
          //  setPageData({
          //    limit: res?.data?.data?.limit,
          //    page: res?.data?.data?.page,
          //    total: res?.data?.data?.total,
          //  });
          setLoading(false);
        } else {
          setLoading(false);
          alert(res?.data?.message);
        }
      },
    });
  }, []);

  return (
    <div
      className={`py-[7rem] lg:px-[5rem]  flex flex-col gap-2 px-[10px] ${
        isOpen ? "xl:ml-[260px]" : ""
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
        <FaChevronLeft />
        <div>
          <div className=" font-normal text-[14px] lg:text-[16px] leading-[20px] text-[#B6B6B6]">
            Home / <span className="text-black font-medium">Live Classes</span>
          </div>
        </div>
      </div>
      <h2 className=" mt-6 font-bold text-[22px]  leading-[28px] text-[#2C2E32] ">
        Teacher
      </h2>
      <div className=" mt-3 ">
        <UserCard
          label="Total Teacher"
          height="h-[111px]"
          backgroundcolor="bg-[#FFFFFF]"
          value={adminData}
          imgbg={live}
          imglogo={liveimage}
        />
      </div>
      <div className=" flex  justify-end mt-4 ">
        <button
          className="text-[14px] leading-[20px] text-center font-bold  w-[181px] h-[40px] rounded-lg py-[7px] px-[12px] bg-[#F2994A] text-white"
          onClick={() => Navigate("/Teacher/AddTeacher")}
        >
          + Add Teacher
        </button>
      </div>
      <TeacherLists />
    </div>
  );
};

export default TeacherList;
