import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Headers from '../common/Headers';
import Headcomponent from '../common/Headcomponent';
import StatCard from '../common/StatCard';
import Custombutton from '../common/Custombutton';
import Modal from '../common/Modal';
import { FaBook, FaPlus } from 'react-icons/fa';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const OrderItem = ({ bookName, price }) => (
  <div className="bg-gray-50 rounded-xl p-4 flex items-center justify-between hover:shadow-md transition-shadow">
    <div className="flex items-center gap-4">
      <div className="p-3 bg-white rounded-lg">
        <FaBook className="w-6 h-6 text-[#27AE60]" />
      </div>
      <div className="flex flex-col">
        <span className="font-medium text-gray-800">{bookName}</span>
        <span className="text-sm text-[#27AE60]">{price}</span>
      </div>
    </div>
  </div>
);

const EbookOrderList = ({ isOpen }) => {
  const navigate = useNavigate();

  const bookOrders = [
    {
      date: '2024-01-15',
      orders: [
        { bookName: 'Advanced Calculus', price: '$45.99' },
        { bookName: 'Organic Chemistry', price: '$39.99' },
        { bookName: 'Modern Physics', price: '$52.99' }
      ]
    },
    {
      date: '2024-01-14',
      orders: [
        { bookName: 'Biology Basics', price: '$35.99' },
        { bookName: 'Chemistry Guide', price: '$42.99' }
      ]
    }
  ];

  return (
    <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""} transition-all duration-300`}>
      <Headers value1="Home" value2="Book Orders" />

      <div className="p-6 border-b border-gray-100">
        <div className="flex justify-between items-center">
          <Headcomponent value="E-Books" showSearch={false} />
        </div>
      </div>

      <div className="mt-6 bg-white rounded-xl shadow-sm mb-8">
        <StatCard title="Total Orders" count="150" />
      </div>

      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b border-gray-100">
          <Headcomponent value="All Book Orders" showSearch={true} />
        </div>
        <div className="p-6">
          <div className="space-y-6">
            {bookOrders.map((orderGroup, groupIndex) => (
              <div key={groupIndex}>
                <div className="text-gray-400 text-sm mb-3">{orderGroup.date}</div>
                <div className="space-y-4">
                  {orderGroup.orders.map((order, index) => (
                    <OrderItem
                      key={index}
                      bookName={order.bookName}
                      price={order.price}
                    />
                  ))}
                </div>
              </div>
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

export default EbookOrderList;


