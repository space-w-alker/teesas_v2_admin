import React from 'react';
import { useLocation } from 'react-router-dom';
import book from '../../assets/images/receip.png';
import productImage from '../../assets/images/productImage.png'

const OrderItemDetails = ({ isOpen }) => {
  const location = useLocation();
  const orderNumber = location.state?.orderNumber || 'Order Number';
  const amount = location.state?.amount || '₦0';
  const status = location.state?.status || 'pending';

  return (
    <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""} transition-all duration-300`}>
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-400">Home</span>
          <span className="text-gray-400">/</span>
          <span className="text-gray-400">Orders</span>
          <span className="text-gray-400">/</span>
          <span className="text-gray-900 font-medium">Order #{orderNumber}</span>
        </div>
      </div>

      <div className="bg-[#E9FDEE] rounded-xl p-6 mb-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white rounded-lg">
            <img src={book} alt="order" className="w-8 h-8" />
          </div>
          <div className="flex flex-col">
            <h2 className="font-bold text-gray-900">Order #{orderNumber}</h2>
            <span className={`px-3 py-1 rounded-full text-sm w-fit ${
              status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
              status === 'success' ? 'bg-green-100 text-green-800' :
              'bg-red-100 text-red-800'
            }`}>
              {status}
            </span>
          </div>
        </div>
      </div>

      <div className="flex justify-center mb-6">
        <button className="px-8 py-2 text-[#27AE60] font-medium">
          Update Status
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="border-b border-gray-200 pb-2 mb-4">
          <h3 className="text-lg font-bold text-gray-900">Order Details</h3>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="bg-white rounded-lg p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">Order Number:</p>
                <p className="font-medium">#{orderNumber}</p>
              </div>
              <div>
                <p className="text-gray-600">Order Date:</p>
                <p className="font-medium">January 20, 2024</p>
              </div>
              <div>
                <p className="text-gray-600">Amount:</p>
                <p className="font-medium text-green-600">{amount}</p>
              </div>
              <div>
                <p className="text-gray-600">Payment Status:</p>
                <p className="font-medium text-[#27AE60]">Paid</p>
              </div>
              <div>
                <p className="text-gray-600">Customer Name:</p>
                <p className="font-medium">John Doe</p>
              </div>
              <div>
                <p className="text-gray-600">Contact:</p>
                <p className="font-medium">+234 123 456 7890</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="border-b border-gray-200 pb-2 mb-4">
          <h3 className="text-lg font-bold text-gray-900">Order Items</h3>
        </div>
        <div className="space-y-4">
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center gap-4">
             
            
                     
                         <img src={productImage} alt="product" className="w-full h-[800px] object-cover rounded" />
                     
                
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderItemDetails;
