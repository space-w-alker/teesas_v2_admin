import React, { useState } from 'react';
import book from '../../assets/images/book.png';
import Searchbutton from '../../assets/images/Searchbutton.png';
import Vector from '../../assets/images/Vector.png';
import statelayer from '../../assets/images/state-layer.png';
import sharp from '../../assets/images/sharp.png';
import { useNavigate } from 'react-router-dom';

const StatCard = ({ title, count, color }) => (
  <div className="bg-white rounded-xl shadow-sm p-4 flex-1">
    <div className="flex items-start gap-4">
      <div className={`p-3 ${color} rounded-lg`}>
        <img src={book} alt="icon" className="w-8 h-8" />
      </div>
      <div className="flex flex-col">
        <p className="text-gray-600 text-sm font-medium">{title}</p>
        <p className="font-bold text-2xl mt-2 text-gray-900">{count}</p>
      </div>
    </div>
  </div>
);

const Parents = ({ isOpen }) => {
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  return (
    <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""} transition-all duration-300`}>
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-400">Home</span>
          <span className="text-gray-400">/</span>
          <span className="text-gray-900 font-medium">Privacy Policy</span>
        </div>
      </div>
      <h1 className="text-2xl font-bold mb-6">Parent-report-type</h1>

      {/* Stats Box */}
      <div className="grid grid-cols-1 gap-6 mb-4">
        <StatCard title="Total parent report type" count="2,547" color="bg-blue-50" />
      </div>

      {/* Add New button moved here */}
      <div className="flex justify-end mb-6">
        <button className="px-6 py-2 bg-[#27AE60] text-white rounded-lg"
        onClick={() => navigate('/add-parent-report')}
        >
          Add New
        </button>
      </div>
      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b border-gray-100">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900">Parent-report-type</h2>
            <div className="flex items-center gap-4">
              <img src={Searchbutton} alt="search" className="w-5 h-5 cursor-pointer" />
              <img src={Vector} alt="filter" className="w-5 h-5 cursor-pointer" />
              <img src={statelayer} alt="menu" className="w-5 h-5 cursor-pointer" />
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            <div className="bg-white rounded-xl p-4 flex items-center justify-between hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                  J
                </div>
                <span>John Doe</span>
              </div>
              
              <button className="flex bg-green-100 items-center border rounded-lg px-3 py-1">
                <img src={sharp} alt="status" className="w-4 h-4 mr-2" />
                Status
              </button>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-gray-100 flex justify-between items-center">
          <button 
            className={`px-4 py-2 text-gray-600 hover:text-gray-800 ${page === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={page === 1}
            onClick={() => setPage(p => p - 1)}
          >
            Prev
          </button>
          <span className="text-gray-600">Page {page}</span>
          <button 
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
            onClick={() => setPage(p => p + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Parents;
