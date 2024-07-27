import React, { useState, useEffect } from "react";
import letter from "../../..//assets/images/bookopen.png";
import { FaChevronLeft } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getAdminUserAsync } from "../../../apis/slices/adminSlice";
import { TailSpin } from "react-loader-spinner";

const AdminUserDetails = ({ isOpen }) => {
 
  const token = localStorage.getItem("authToken");
  const dispatch = useDispatch();
  const [adminData, setAdminData] = useState({});

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    getAdminUserAsync({
      dispatch: dispatch,
      data: {
        user_id: id,
      },
      token: token,
      callbackFn: (res) => {
        setAdminData(res?.data?.admin_user);
        setLoading(false)
      },
    });
  }, []);
  return (
    <div
      className={`py-[7rem] lg:px-[5rem]   px-[10px] ${
        isOpen ? "lg:ml-[260px]" : ""
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
        <TailSpin color="orange" radius={5}  />
      </div>
    )}
      <div className="flex justify-start  items-center lg:gap-3">
        <FaChevronLeft />
        <div>
          <div className=" font-normal text-[14px] lg:text-[16px] leading-[20px] text-[#B6B6B6]">
            Home / Admin Users /{" "}
            <span className="text-black font-medium"> Admin Users Details</span>
          </div>
        </div>
      </div>
      <div className="bg-[#FFF9ED] mt-10 border rounded-lg mb-[10px] border-[#CAC4D0] h-[80px] p-[8px]">
        <div className="flex items-center gap-4">
          <div>
            <img src={letter} className="w-[20px] h-[20px]" />
          </div>
          <div className="">
            <p className=" font-bold text-[16px] leading-[24px]  tracking-wider text-[#1D2026]">
              {adminData?.first_name} {adminData?.last_name}
            </p>
            {adminData?.status == 1 ? (
              <button className="w-[64px] h-[20px] rounded-full font-medium text-[13px] leading-[15px] mt-[4px] pt-[2px]  text-white bg-[#08AA58]">
                Active
              </button>
            ) : (
              <button className="w-[64px] h-[20px] rounded-full font-medium text-[13px] leading-[15px] mt-[4px] pt-[2px]  text-white bg-[#aa0808]">
                Inactive
              </button>
            )}
          </div>
        </div>
      </div>

    { /* <p className=" font-medium text-[14px] leading-[20px] text-[#F2994A] text-center cursor-pointer ">
        Manage
      </p>*/}
      <div>
        <div>
          <div className=" rounded-[24px] py-[20px] px-[16px] bg-[#FFFFFF] mt-4 ">
            <div className="Border ">
              <h2 className=" font-medium text-[18px]  leading-[20px] text-[#2C2E32] pb-[20px]">
                Details
              </h2>
            </div>
            <div className="bg-[#F2F2F2] p-[16px] rounded-[16px] mt-3">
              <div className="flex justify-between max-w-[800px]">
                <div className="w-1/2">
                  <div className="flex flex-col mb-4">
                    <p className="font-normal text-[12px] lg:text-[14px] leading-[18px] text-[#1F1F1FB2]">
                      Email
                    </p>
                    <p className="text-[13px] lg:text-[16px] leading-[20px] font-normal text-[#222222E5]">
                      {adminData?.email}
                    </p>
                  </div>
                  <div className="flex flex-col mb-4">
                    <p className="font-normal text-[12px] lg:text-[14px] leading-[18px] text-[#1F1F1FB2]">
                      Whatsapp Number
                    </p>
                    <p className="text-[13px] lg:text-[16px] leading-[20px] font-normal text-[#222222E5]">
                      {adminData?.mobile}
                    </p>
                  </div>
                  <div className="flex flex-col mb-4">
                    <p className="font-normal text-[12px] lg:text-[14px] leading-[18px] text-[#1F1F1FB2]">
                      Registration Date
                    </p>
                    <p className="text-[13px] lg:text-[16px] leading-[20px] font-normal text-[#222222E5]">
                      {adminData?.created_at}
                    </p>
                  </div>
                </div>
                <div className="max-w-[800px]">
                  <div className="flex flex-col mb-4">
                    <p className="font-normal text-[12px] lg:text-[14px] leading-[18px] text-[#1F1F1FB2]">
                      Mobile Number
                    </p>
                    <p className="text-[13px] lg:text-[16px] leading-[20px] font-normal text-[#222222E5]">
                      {adminData?.mobile}
                    </p>
                  </div>
                  <div className="flex flex-col mb-4">
                    <p className="font-normal text-[12px] lg:text-[14px] leading-[18px] text-[#1F1F1FB2]">
                      Address
                    </p>
                    <p className="text-[13px] lg:text-[16px] leading-[20px] font-normal text-[#222222E5]">
                      {adminData?.city}
                    </p>
                  </div>
                  <div className="flex flex-col mb-4">
                    <p className="font-normal text-[12px] lg:text-[14px] leading-[18px] text-[#1F1F1FB2]">
                      Approved Date
                    </p>
                    <p className="text-[13px] lg:text-[16px] leading-[20px] font-normal text-[#222222E5]">
                      {adminData?.updated_at}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUserDetails;
