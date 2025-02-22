import React, { useState } from "react";
import Group1000001082 from "../../assets/images/Content.png";
import menu from "../../assets/images/menu.svg";
import bell from "../../assets/images/bell.svg";
import frame2 from "../../assets/images/Frame2.png";
import Avatar from "../../assets/images/Avatar.png";
import { Link } from "react-router-dom";

const Navigation = ({ isOpen, toggleSidebar }) => {
  return (
    <>
      <div className="fixed top-0 w-full z-40 bg-[#E9FDEE] h-[100px]">
        <div className="flex items-center justify-between px-[24px] md:px-[78px] h-full">
          <div className="max-w-content" onClick={toggleSidebar}>
            <img src={menu} className="w-8 h-8" alt="Menu" />
          </div>
          <div>
            <Link to="/">
              <img
                src={Group1000001082}
                className="w-[129.53px] h-[59.54px] mx-[10px]"
                alt="Logo"
              />

            </Link>
          </div>
          <div className="flex items-center gap-4">
            <img src={bell} className="w-[25px] h-[24px]" alt="Bell icon" />
            <img src={Avatar} className="w-[32px] h-[32px]" alt="Avatar" onClick={() => Navigate('/Profile')} />
            <img src={frame2} className="w-[16px] h-[16px]" alt="Frame 2" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
