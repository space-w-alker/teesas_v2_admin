import React from 'react';
import { useLocation } from 'react-router-dom';


const SummerCampDetails = ({ isOpen }) => {
  const location = useLocation();
  const participantName = location.state?.name || 'Participant Name';
  const participantStatus = location.state?.status || 'Pending';

  return (
    <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""} transition-all duration-300`}>
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-400">Home</span>
          <span className="text-gray-400">/</span>
          <span className="text-gray-400">Summer Camp Details</span>
          <span className="text-gray-400">/</span>
          <span className="text-gray-900 font-medium">{participantName}</span>
        </div>
      </div>

      <div className="bg-[#E9FDEE] rounded-xl p-6 mb-6">
        <div className="flex items-center gap-4">
         
          <div className="flex flex-col">
            <h2 className="font-bold text-gray-900">{participantName}</h2>
            <span className={`mt-2 px-4 py-1 rounded-full text-sm w-fit ${
              participantStatus === 'Paid' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
            }`}>
              {participantStatus}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="border-b border-gray-200 pb-2 mb-4">
          <h3 className="text-lg font-bold text-gray-900">Registration Details</h3>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="bg-white rounded-lg p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">Full Name:</p>
                <p className="font-medium">{participantName}</p>
              </div>
              <div>
                <p className="text-gray-600">Email:</p>
                <p className="font-medium">participant@example.com</p>
              </div>
              <div>
                <p className="text-gray-600">Phone:</p>
                <p className="font-medium">+1234567890</p>
              </div>
              <div>
                <p className="text-gray-600">Registration Date:</p>
                <p className="font-medium">January 15, 2024</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummerCampDetails;
