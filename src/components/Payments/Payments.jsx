import React from 'react';
import UserCard from '../common/UserCard';
import Custombutton from '../common/Custombutton';
import Headcomponent from '../common/Headcomponent';
import Headers from '../common/Headers';
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import Group10000001600 from '../../assets/images/Group1000001600.png';
import arrowupward from '../../assets/images/arrow_upward.png';

const PaymentCard = ({ name, subscription, date }) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="text-sm text-gray-400 mb-2">{date}</div>
      <div className="flex items-center justify-between py-4 ">
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
            className="px-4 py-2 hover:text-[#219652] transition-colors font-medium"
          >
            View
          </button>
        </div>
      </div>
    </>
  );
};

const Payments = ({ isOpen }) => {
  const navigate = useNavigate();
  
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
    <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""}`}>
      <Headers value1="Home" value2="Payments" />

      <div className="mt-3">
        <UserCard
          label="Total Amount Received"
          height="h-[140px]"
          backgroundcolor="bg-[#FFFFFF]"
          value={'₦ 210,000'}
          imgbg={Group10000001600}
          subContent={
            <div className="flex items-center gap-2">
              <div className="p-1 bg-[#E9FDEE] rounded">
                <img src={arrowupward} alt="trend" className="w-4 h-4" />
              </div>
              <span className="text-sm text-[#27AE60]">+15% from yesterday</span>
            </div>
          }
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm mt-6">
        <Headcomponent value="Recent Payments" border="Border" />
        
        <div className="p-6">
          <div className="space-y-2">
            {payments.map((payment, index) => (
              <PaymentCard key={index} {...payment} />
            ))}
          </div>
          
          <div className="flex justify-between items-center mt-6">
            <Custombutton
              value="Previous"
              hidden="hidden"
              icon={<FaArrowLeft />}
              backgroundcolor="bg-[#F2F2F2]"
              textcolor="text-[#000000]"
              imagePosition="left"
            />
            <div className="text-[#667085] text-[12px]">
              Page 1 of 5
            </div>
            <Custombutton
              value="Next"
              hidden="hidden"
              icon={<FaArrowRight />}
              backgroundcolor="bg-[#F2F2F2]"
              textcolor="text-[#000000]"
              imagePosition="right"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payments;
