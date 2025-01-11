import React from 'react';
import Searchbutton from '../../../src/assets/images/Searchbutton.png';
import Group10000001600 from '../../../src/assets/images/Group1000001600.png';
import Vector from '../../../src/assets/images/Vector.png';
import statelayer from '../../../src/assets/images/state-layer.png';
import arrowupward from '../../../src/assets/images/arrow_upward.png';
import { useNavigate } from 'react-router-dom';


const PaymentCard = ({ name, subscription, date }) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="text-sm text-gray-400 mb-2">{date}</div>
      <div className="flex items-center justify-between py-4 border-b border-gray-100">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-[#E9FDEE] flex items-center justify-center">
            <span className="text-[#27AE60] font-medium">{name[0]}</span>
          </div>
          <div>
            <h3 className="font-medium text-gray-900">{name}</h3>
            <p className="text-sm text-gray-500">{subscription}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(`/payments/details`)}
            className="px-4 py-2 text-[#27AE60] hover:text-[#219652] transition-colors font-medium"
          >
            View
          </button>
         
        </div>
      </div>
    </>
  );
};

const Payments = ({ isOpen }) => {
  const payments = [
    {
      name: "John Doe",
      subscription: "Monthly Subscription/Payment",
      date: "Today"
    },
    {
      name: "Sarah Smith",
      subscription: "Annual Subscription/Payment",
      date: "Yesterday"
    },
    {
      name: "Michael Brown",
      subscription: "Quarterly Subscription/Payment",
      date: "23 March, 2024"
    }
  ];

  return (
    <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""} transition-all duration-300`}>
      {/* Breadcrumb */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-400">Home</span>
          <span className="text-gray-400">/</span>
          <span className="text-gray-900 font-medium">Payments</span>
        </div>
      </div>

      {/* Page Title */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Payments</h1>
      </div>

      {/* Stats Card */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-gray-50 rounded-lg">
            <img src={Group10000001600} alt="book" className="w-8 h-8" />
          </div>
          <div>
            <p className="text-gray-600 text-sm font-medium">Total Amount Received</p>
            <p className="font-bold text-2xl mt-2 text-gray-900">₦210,000</p>
            <div className="flex items-center gap-2 mt-2">
              <div className="p-1 bg-[#E9FDEE] rounded">
               <img src="arrowupward" alt="" />
              </div>
              <span className="text-sm text-[#27AE60]">+15% from yesterday</span>
            </div>
          </div>
        </div>
      </div>

      {/* Payments List */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Recent Payments</h2>
          <div className="flex items-center gap-4">
            <div className="relative">
              <img 
                src={Searchbutton} 
                alt="search" 
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
              />
              <input 
                type="text" 
                placeholder="Search payments..."
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#27AE60]"
              />
            </div>
            <button className="p-2 hover:bg-gray-50 rounded-lg">
              <img src={Vector} alt="filter" className="w-4 h-4" />
            </button>
            <button><img src={statelayer} alt="arrow" /></button>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-2">
            {payments.map((payment, index) => (
              <PaymentCard key={index} {...payment} />
            ))}
          </div>
          <div className="mt-6 text-center">
            <button className="px-6 py-2 text-[#27AE60] hover:text-[#219652] transition-colors font-medium">
              View All Payments
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payments;