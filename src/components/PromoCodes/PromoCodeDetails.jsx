import React from 'react';
import { useLocation } from 'react-router-dom';
import Headers from '../common/Headers';
import Headcomponent from '../common/Headcomponent';
import Custombutton from '../common/Custombutton';
import book from '../../assets/images/book.png';

const PromoCodeDetails = ({ isOpen }) => {
  const location = useLocation();
  const promoCode = location.state?.code || 'Promo Code';
  const status = location.state?.status || 'Active';

  return (
    <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""} transition-all duration-300`}>
      <Headers value1="Home" value2="Promo Codes" value3={promoCode} />

      <div className="mt-6  bg-[#E9FDEE] rounded-xl p-6 mb-6">
        <div className="flex items-center gap-4">
           <img src={book} alt="book" className="w-6 h-6" />
          <div className="flex flex-col">
            <h2 className="font-bold text-gray-900">{promoCode}</h2>
            <span className="mt-2 px-4 py-1 rounded-full text-sm w-fit bg-green-100 text-green-600">
              {status}
            </span>
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-4 mb-6">
        <Custombutton
          value="Manage"
          textcolor="text-green-600"
         
        />
       
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="border-b border-gray-200 pb-2 mb-4">
          <Headcomponent value="Promo Code Details" showSearch={false} />
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex justify-end">
          </div>
          <div className="bg-white rounded-lg p-4">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-gray-600">Promo Code:</p>
                <p className="font-medium">{promoCode}</p>
              </div>
              <div>
                <p className="text-gray-600">Discount:</p>
                <p className="font-medium">20%</p>
              </div>
              <div>
                <p className="text-gray-600">Valid Until:</p>
                <p className="font-medium">December 31, 2024</p>
              </div>
              <div>
                <p className="text-gray-600">Usage Count:</p>
                <p className="font-medium">45/100</p>
              </div>
              <div>
                <p className="text-gray-600">Categories:</p>
                <p className="font-medium">All Categories</p>
              </div>
              <div>
                <p className="text-gray-600">Status:</p>
                <p className="font-medium">Active</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromoCodeDetails;
