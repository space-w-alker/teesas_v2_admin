import React from 'react';
import search from "../../assets/images/search.svg";
import bell from "../../assets/images/bell.svg";
import frame2 from "../../assets/images/Frame2.png";
import Avatar from "../../assets/images/Avatar.png";
import { useNavigate } from 'react-router-dom';

const SearchBox = ({ isOpen }) => {
  const Navigate=useNavigate()
  return (
    <div className="mb-2">
      <div className={`search flex justify-between items-center px-[24px] md:px-[78px] ${isOpen ? 'xl:ml-[260px]' : ''}`}>
        <div className="flex items-center relative lg:w-[594px]">
          <img src={search} className="absolute w-[20px] h-[20px] top-[56%]  -translate-y-1/2 left-[8px] z-50" alt="Search icon" />
          <input
            type="text"
            name="search"
            className="mt-1 w-full pl-[30px] outline-none bg-[#F8F8F8] text-[14px] border p-2 border-[#ECEDEE] shadows h-[32px] rounded-[16px]"
            placeholder="Search Item"
          />
        </div>
        <div className="flex justify-center items-center w-[74px] h-[35px]">
          <img src={bell} className="w-[25px] h-[24px]" alt="Bell icon" />
          <img src={Avatar} className="w-[32px] h-[32px]" alt="Avatar" onClick={()=>Navigate('/Profile')} />
          <img src={frame2} className="w-[16px] h-[16px]" alt="Frame 2" />
        </div>
      </div>
    </div>
  );
};

export default SearchBox;
