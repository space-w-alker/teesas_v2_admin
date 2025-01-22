import React from 'react';
import book from '../../assets/images/book.png';

const StatCard = ({ title, count }) => (
  <div className="bg-white rounded-xl shadow-sm p-4">
    <div className="flex items-start gap-4">
      <div className="p-3 bg-gray-50 rounded-lg">
        <img src={book} alt="book" className="w-8 h-8" />
      </div>
      <div className="flex flex-col">
        <p className="text-gray-600 text-sm font-medium">{title}</p>
        <p className="font-bold text-2xl mt-2 text-gray-900">{count}</p>
      </div>
    </div>
  </div>
);

export default StatCard;
