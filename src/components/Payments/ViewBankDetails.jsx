import React from 'react';
import { useNavigate } from 'react-router-dom';

const ViewBankDetails = ({ isOpen }) => {
  const navigate = useNavigate();

  return (
    <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""} transition-all duration-300`}>
     
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-400">Home</span>
          <span className="text-gray-400">/</span>
          <span className="text-gray-400">Payments</span>
          <span className="text-gray-400">/</span>
          <span className="text-gray-900 font-medium">View Bank Details</span>
        </div>
      </div>

    
      <div className="bg-[#F9F9F9] rounded-xl shadow-sm p-6 mb-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#E9FDEE] flex items-center justify-center">
            <span className="text-[#27AE60] font-medium text-xl">G</span>
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">GT Bank</h2>
            <button className="mt-2 px-6 py-1 bg-[#27AE60] text-white rounded-full font-medium text-sm">
              Active
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">Payment Method</h2>
        </div>
        
        <div className="border-b border-gray-200 mb-6"></div>
        
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">Payment Details</h2>
          <button 
            onClick={() => navigate('/payments/edit-bank')}
            className="text-[#27AE60] hover:text-[#219652] transition-colors font-medium"
          >
            Edit
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">Account Name</label>
            <p className="text-lg font-medium text-gray-900">Teesas Education Limited</p>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Account Number</label>
              <p className="text-lg font-medium text-gray-900">1001010393</p>
            </div>
           
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">Country</label>
            <p className="text-lg font-medium text-gray-900">Ghana</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewBankDetails;