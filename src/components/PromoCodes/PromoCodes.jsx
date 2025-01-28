import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import Headers from '../common/Headers';
import Headcomponent from '../common/Headcomponent';
import StatCard from '../common/StatCard';
import Custombutton from '../common/Custombutton';
import book from '../../assets/images/book.png';

const PromoCodeItem = ({ code }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-white rounded-xl p-4 flex items-center justify-between hover:shadow-md transition-shadow">
    <div 
        className="flex items-center gap-4 cursor-pointer"
        onClick={() => navigate('/promo-code-details')}
      >
        <div className="p-3 bg-gray-50 rounded-lg">
          <img src={book} alt="book" className="w-6 h-6" />
        </div>
        <div className="flex flex-col">
          <span className="font-medium text-gray-800">{code}</span>
          <span className="text-blue-500 text-sm">coupn Categories</span>
        </div>
      </div>
      <div className="flex gap-4 items-center">
        <Custombutton 
          value="Visible"
          
          textcolor="text-blue-400"
          backgroundcolor="bg-green-100"
          width="w-[100px]"
        />
      </div>
    </div>
  );
};

const PromoCodes = ({ isOpen }) => {
  const navigate = useNavigate();

  const promoCodes = [
    { code: 'SUMMER2024' },
    { code: 'WELCOME10' },
    { code: 'SPECIAL25' },
    { code: 'FLASH50' },
  ];

  return (
    <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""} transition-all duration-300`}>
      <Headers value1="Home" value2="Promo Codes" />

      <div className="mt-6">
        <StatCard title="Total Active Promo Codes" count="12" />
      </div>

      <div className="flex justify-end mb-6">
        <Custombutton
          value={
            <div className="flex items-center gap-2">
              <FaPlus className="text-white" />
              <span>Add Promo Code</span>
            </div>
          }
          onClick={() => navigate('/add-promo-code')}
          textcolor="text-white"
          backgroundcolor="bg-[#27AE60]"
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b border-gray-100">
          <Headcomponent value="Promo Code List" showSearch={true} />
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {promoCodes.map((promo, index) => (
              <PromoCodeItem key={index} code={promo.code} />
            ))}
          </div>
        </div>
        <div className="p-6 border-t border-gray-100 flex justify-between items-center">
          <Custombutton
            value={
              <div className="flex items-center gap-2">
                <FaArrowLeft />
                <span>Previous</span>
              </div>
            }
            backgroundcolor="bg-gray-100"
            textcolor="text-gray-600"
            width="w-[100px]"
            extraStyle="py-2"
          />
          <span className="text-gray-600">Page 1 of 5</span>
          <Custombutton
            value={
              <div className="flex items-center gap-2">
                <span>Next</span>
                <FaArrowRight />
              </div>
            }
            backgroundcolor="bg-gray-100"
            textcolor="text-gray-600"
            width="w-[80px]"
            extraStyle="py-2"
          />
        </div>
      </div>
    </div>
  );
};

export default PromoCodes;
