import React, { useState } from "react";
import Group1000001082 from "../../assets/images/Content.png";
import menu from "../../assets/images/menu.svg";
import { Link } from "react-router-dom";

import SearchBox from "./SearchBox";
const Navigation = ({ isOpen, toggleSidebar }) => {
  return (
    <>
      <div className="fixed top-0 w-full z-40 bg-[#E9FDEE]">
        <div className="flex items-center justify-between px-[24px] md:px-[78px] py-4">
          <div className="max-w-content" onClick={toggleSidebar}>
            <img src={menu} className="w-8 h-8" alt="Menu" />
          </div>
          <div className="m-auto">
            <Link to="/">
              <img
                src={Group1000001082}
                className="w-32 h-10"
                alt="Logo"
              />
            </Link>
          </div>
        </div>
        <SearchBox isOpen={isOpen} />
      </div>
     
    </>
  );
};
export default Navigation;


