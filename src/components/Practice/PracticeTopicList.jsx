import React from 'react';
import { useNavigate } from 'react-router-dom';
import Headers from '../common/Headers';
import Headcomponent from '../common/Headcomponent';
import StatCard from '../common/StatCard';
import Custombutton from '../common/Custombutton';
import bookopen from '../../assets/images/bookopen.png';
import { FaArrowLeft, FaArrowRight, FaPlus } from 'react-icons/fa';
import sharp from '../../assets/images/sharp.png';

const TopicItem = ({ name }) => {
  const navigate = useNavigate();
  
  return (
    <div 
      className="bg-[#F9F9F9] rounded-xl p-4 flex items-center justify-between hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => navigate(`/practice-details`, { state: { name: name } })}
    >
      <div className="flex items-center gap-4">
        <div className="p-3 bg-white rounded-lg">
          <img src={bookopen} alt="book" className="w-6 h-6" />
        </div>
        <span className="font-medium text-gray-800">{name}</span>
      </div>
      <div className="flex gap-4 items-center">
        <Custombutton
          value={
            <div className="flex items-center gap-2">
              <div className="flex">
                <img src={sharp} alt="sharp" className="w-4 h-4" />
              </div>
              <span>Visible</span>
            </div>
          }
          textcolor="text-blue-600"
          backgroundcolor="bg-green-50"
          extraStyle="px-4 py-2 rounded-lg"
        />
      </div>
    </div>
  );
};

const PracticeTopicList = ({ isOpen }) => {
  const navigate = useNavigate();
  
  const topics = [
    'Introduction to Algebra',
    'Linear Equations',
    'Quadratic Equations',
    'Polynomials',
    'Matrices'
  ];

  return (
    <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""} transition-all duration-300`}>
      <Headers value1="Home" value2="Practice" value3="List" />

      <div className="p-6 border-b border-gray-100">
        <div className="flex justify-between items-center">
          <Headcomponent value="Practice List" showSearch={false} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
        <StatCard title="Total Topics" count="5" />
        <StatCard title="Total Lessons" count="25" />
        <StatCard title="Total Questions" count="100" />
        <StatCard title="Total Resources" count="50" />
      </div>

      <div className="flex justify-end mb-6">
        <Custombutton
          value={
            <div className="flex items-center gap-2">
              <FaPlus className="text-sm" />
              <span>Add Practice</span>
            </div>
          }
          onClick={() => navigate('/add-practice')}
          backgroundcolor="bg-[#27AE60]"
          textcolor="text-white"
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm mt-[50px]">
        <div className="p-6 border-b border-gray-100">
          <Headcomponent value="Practice List" showSearch={true} />
        </div>
        
        <div className="p-6">
          <div className="space-y-4">
            {topics.map((topic, index) => (
              <TopicItem 
                key={index} 
                name={topic}
              />
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

export default PracticeTopicList;
