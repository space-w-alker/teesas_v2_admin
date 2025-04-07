import React, { useState, useEffect } from 'react';
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
  const [expandedSections, setExpandedSections] = useState({});
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');

  const handleModalClose = () => {
    setShow(false);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Get user permissions from localStorage
  const getUserPermissions = () => {
    try {
      const userData = localStorage.getItem('userData');
      if (!userData) return {};

      const parsedData = JSON.parse(userData);
      return parsedData.permissions || {};
    } catch (error) {
      console.error('Error parsing user permissions:', error);
      return {};
    }
  };

  // Check if user has required permissions for a menu item
  const hasPermissions = (requiredPermissions = []) => {
    const userPermissions = getUserPermissions();

    return requiredPermissions.every(permission => {
      const [resource, action] = permission.split(':');
      return userPermissions[resource]?.[action] === true;
    });
  };

  // Filter menu items based on permissions and search
  const filterMenuItems = (items) => {
    return items.filter(item => {
      // First check permissions
      if (item.permissions && item.permissions.length > 0) {
        if (!hasPermissions(item.permissions)) return false;
      }

      // Then check search term if it exists
      if (searchTerm) {
        return item.name.toLowerCase().includes(searchTerm.toLowerCase());
      }

      return true;
    });
  };

  // Filter sections that have at least one accessible item
  const getFilteredSections = () => {
    return Sidebardata.filter(section => {
      const accessibleItems = filterMenuItems(section.items);
      return accessibleItems.length > 0;
    });
  };

  // Initialize expanded sections
  useEffect(() => {
    const initialExpandedState = {};
    Sidebardata.forEach(section => {
      initialExpandedState[section.id] = false;
    });
    setExpandedSections(initialExpandedState);
  }, []);
  if (!isOpen) {
    return null
  }

  return (
    <div className={`w-80 side-bar bg-white fixed z-40 top-[105px] ml-4 flex flex-col py-[10px] px-[18px] pb-5 overflow-y-auto h-[calc(100vh-100px)]`}>
      <div className='w-full border border-[#E1E1E1] rounded-xl mb-4 bg-white'>
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
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full mt-1 bg-[#F8F8F8] text-[14px] border p-2 border-[#D9D9D9] h-[36px] rounded-[4px] pl-[50px]"
          placeholder="Search menu items..."
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
          {getFilteredSections().map((section) => (
            <li key={section.id} className='cursor-pointer'>
              <div
                className='flex items-center justify-between py-2'
                onClick={() => toggleSection(section.id)}
              >
                <h3 className='text-[14px] font-medium text-[#98A2B3] pl-[19px]'>{section.heading}</h3>
                <div className='pr-2'>
                  {expandedSections[section.id] ? <BiChevronUp size={20} /> : <BiChevronDown size={20} />}
                </div>
              </div>

              {expandedSections[section.id] && (
                <div className='pl-4 flex flex-col gap-[18px] my-2'>
                  {filterMenuItems(section.items).map((item, i) => (
                    <Link
                      to={item.path}
                      key={i}
                      className={`py-2 px-4 rounded w-full flex items-center gap-4 ${isActive(item.path) ? 'bg-[#E1F6E1] text-black' : ''
                        }`}
                    >
                      <img src={item.icon} alt={item.name} className='w-[20px] h-[20px]' />
                      <div className='text-[14px] leading-[20px] text-[#596780]'>{item.name}</div>
                    </Link>
                  ))}
                </div>
              )}
            </li>
          ))}

          <div className='pl-[19px]'>
            <li className='cursor-pointer'>
              <div className='flex flex-col gap-[18px]'>
                <div>
                  <div
                    className='flex items-center gap-4 cursor-pointer'
                    onClick={() => setShow(true)}
                  >
                    <img src={Logout} alt="logout" />
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
