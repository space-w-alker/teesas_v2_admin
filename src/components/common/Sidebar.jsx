import React, { useState } from 'react';
import home from '../../assets/images/home.png';
import search from "../../assets/images/search.svg";
import Logout from '../../assets/images/logout.png';
import Sidebardata from '../data/Sidebardata.jsx'
import Group1000001082 from "../../assets/images/TeesasLogo.png";
import { BiMoon, BiChevronDown, BiChevronUp } from "react-icons/bi";
import { Link, useLocation } from 'react-router-dom';
import LogoutModal from '../Core/Dashboard/Admin/LogoutModal';
import { HiOutlineSun } from "react-icons/hi2";

const Sidebar = ({ isOpen }) => {
  const [show, setShow] = useState(false);
  const [sidebarData, setSidebarData] = useState(Sidebardata);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();

  const handleModalClose = () => {
    setShow(false);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const toggleSection = (index) => {
    setSidebarData(sidebarData.map((section, i) =>
      i === index ? { ...section, isOpen: !section.isOpen } : section
    ));
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`w-80 side-bar bg-white fixed z-40 top-[105px]  ml-4 flex flex-col py-[10px] px-[18px] pb-5 overflow-y-auto h-[calc(100vh-100px)] ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300`}> <div className=' w-full border border-[#E1E1E1] rounded-xl mb-4 bg-white'>
      <div className='flex items-center justify-between px-4 py-2'>
        <div className='flex items-center gap-3'>
          <img
            src={Group1000001082}
            className="w-[50px] h-[30px]"
            alt="Teesas Logo"
          />
          <span className="text-[16px] font-medium text-gray-800">
            Teesas Primary
          </span>
        </div>
      </div>
    </div>



      <div className='flex items-center search'>
        {/* <img src={search} className="absolute left-[28px] top-[19px] w-[24px] h-[27px] z-50" alt="search icon" /> */}
        <input
          type="text"
          name="search"
          className="w-full mt-1 bg-[#F8F8F8] text-[14px] border p-2 border-[#D9D9D9] h-[36px] rounded-[4px] pl-[50px]"
          placeholder="search Item"
        />
      </div>
      <div className='flex flex-col w-full mt-[17px] gap-3'>
        <Link to='/Dashboard' className={`flex items-center gap-4 py-[12px] px-[16px] rounded w-full ${isActive('/Dashboard') ? 'bg-[#E1F6E1] text-black' : ''}`}>
          <img src={home} className='w-[20px] h-[20px]' alt="dashboard icon" />
          <div>
            <h2 className='text-[14px] leading-[20px] font-medium cursor-pointer'>Dashboard</h2>
          </div>
        </Link>
        <ul className='flex flex-col gap-[10px] mt-4'>
          {sidebarData.map((section, index) => (
            <li key={index} className='cursor-pointer'>
              <div className='flex items-center justify-between py-2' onClick={() => toggleSection(index)}>
                <h3 className='text-[14px] font-medium text-[#98A2B3] pl-[19px]'>{section.heading}</h3>
                <div className='pr-2'>
                  {section.isOpen ? <BiChevronUp size={20} /> : <BiChevronDown size={20} />}
                </div>
              </div>
              {section.isOpen && (
                <div className='pl-4 flex flex-col gap-[18px] my-2'>
                  {section.items.map((item, i) => (
                    <Link to={item.path} key={i} className={`py-2 px-4 rounded w-full flex items-center gap-4 ${isActive(item.path) ? 'bg-[#E1F6E1] text-black' : ''}`}>
                      <img src={item.icon} alt={item.name} className='w-[20px] h-[20px]' />
                      <div className='text-[14px] leading-[20px] text-[#596780]'>{item.name}</div>
                    </Link>
                  ))}
                </div>
              )}
            </li>
          ))}
          <div className='  pl-[19px]'>
            {/*<li className='cursor-pointer mt-auto '>
            <div className='flex flex-col gap-[18px] my-4'>
              <div className='flex items-center gap-[10px] cursor-pointer' onClick={toggleTheme}>
                <div className='flex items-center '>
                  <BiMoon />
                  <HiOutlineSun />
                </div>
                <p className='text-[14px] leading-[20px] text-[#596780] '>Dark MODE</p>
              </div>
            </div>
          </li>*/}
            <li className='cursor-pointer'>
              <div className=' flex flex-col gap-[18px]'>
                <div>
                  <div className='flex items-center gap-4 cursor-pointer' onClick={() => { setShow(!show) }}>
                    <img src={Logout} />
                    <p className='text-[14px] leading-[20px] text-[#596780]'>Logout</p>
                  </div>
                </div>
              </div>
            </li>
          </div>
        </ul>
      </div>
      {show && <LogoutModal closeModal={handleModalClose} />}
    </div>
  );
}

export default Sidebar;
