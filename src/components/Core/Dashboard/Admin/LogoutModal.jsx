import React from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";
const LogoutModal = ({ closeModal }) => {
  const token = localStorage.getItem('authToken')
  const navigate = useNavigate();
  const handleclick = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    localStorage.clear();
    navigate('/')
  }
  return (
    <div>
      <Popup
        open={true}
        closeOnDocumentClick={false}
        onClose={closeModal}
        position="center center"
      >
        <div className=" p-[18px] ">
          <div>
            <p className="text-center text-[16px] font-medium text-[#2C2E32]">Are You Sure You Want to Logout</p>
            <div className="flex justify-center gap-[13px] mt-[25px]">
              <button className="bg-[#FFF3D0] rounded-lg h-[40px] roundrd-l py-[10px] px-[24px] text-black font-bold leading-[20px]" onClick={handleclick} >
                ok
              </button>
              <button className="text-[#828282] py-[10px] rounded-lg cancel px-[24px] text-[14px] leading-[20px] text-center font-bold" onClick={closeModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </Popup>
    </div>
  );
};

export default LogoutModal;
