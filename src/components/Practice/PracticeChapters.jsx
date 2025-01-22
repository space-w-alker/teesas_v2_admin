import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Headers from '../common/Headers';
import Headcomponent from '../common/Headcomponent';
import bookopen from '../../assets/images/bookopen.png';
import StatCard from '../common/StatCard';

const ChapterItem = ({ name }) => {
  const navigate = useNavigate();
  
  return (
    <div className="bg-[#F9F9F9] rounded-xl p-4 flex items-center justify-between hover:shadow-md transition-shadow">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-white rounded-lg">
          <img src={bookopen} alt="book" className="w-6 h-6" />
        </div>
        <span className="font-medium text-gray-800">{name}</span>
      </div>
      <div className="flex gap-4 items-center">
        <button 
          onClick={() => navigate('/practice-topic')}
          className="text-[#27AE60] hover:text-[#219652]"
        >
          Next
        </button>
      </div>
    </div>
  );
};

const PracticeChapters = ({ isOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const chapters = [
    'Chapter 1',
    'Chapter 2',
    'Chapter 3',
  ];

  return (
    <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""} transition-all duration-300`}>
      <Headers value1="Home" value2="Practice" value3="Chapters" />

      <div className="p-6 border-b border-gray-100">
        <div className="flex justify-between items-center">
          <Headcomponent value="Practice Chapters" showSearch={false} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
        <StatCard title="Total Chapters" count="3" />
        <StatCard title="Active Chapters" count="3" />
        <StatCard title="Total Topics" count="15" />
        <StatCard title="Total Questions" count="45" />
      </div>

      <div className="bg-white rounded-xl shadow-sm mt-[50px]">
        <div className="p-6 border-b border-gray-100">
          <Headcomponent value="Chapters List" showSearch={false} />
        </div>
        
        <div className="p-6">
          <div className="space-y-4">
            {chapters.map((chapter, index) => (
              <ChapterItem 
                key={index} 
                name={chapter}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PracticeChapters;
