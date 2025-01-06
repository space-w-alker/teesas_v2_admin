import React from 'react';

const PaymentDetails = ({ isOpen }) => {
  return (
    <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""} transition-all duration-300`}>
      {/* Breadcrumb */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-400">Home</span>
          <span className="text-gray-400">/</span>
          <span className="text-gray-400">Payments</span>
          <span className="text-gray-400">/</span>
          <span className="text-gray-900 font-medium">Payment Details</span>
        </div>
      </div>

      {/* User Info Card */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#E9FDEE] flex items-center justify-center">
            <span className="text-[#27AE60] font-medium text-xl">J</span>
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">John Doe</h2>
            <p className="text-sm text-gray-500">Monthly Subscription/Payment</p>
            <button className="mt-2 px-6 py-1 bg-[#27AE60] text-white rounded-full font-medium text-sm">
              Active
            </button>
          </div>
        </div>
      </div>

      {/* View Profile Button */}
      <div className="text-center mb-8">
        <button className="text-[#27AE60] hover:text-[#219652] transition-colors font-medium">
          View Profile
        </button>
      </div>

      {/* Payment Method Card */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Payment Method</h2>
        <div className="p-4 border border-gray-200 rounded-lg">
          <p className="text-gray-600">Bank Transfer</p>
        </div>
      </div>

      {/* Uploaded Image Card */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Uploaded Image</h2>
        <div className="mb-6">
          <div className="w-full h-48 bg-gray-100 rounded-lg mb-4"></div>
        </div>
        <div className="flex justify-center gap-4">
          <button className="px-6 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors">
            Reject
          </button>
          <button className="px-6 py-2 bg-[#27AE60] text-white rounded-lg font-medium hover:bg-[#219652] transition-colors">
            Approve
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetails;