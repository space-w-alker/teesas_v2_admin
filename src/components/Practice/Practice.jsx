import React from 'react';
import { useNavigate } from 'react-router-dom';
import Headers from '../common/Headers';
import Headcomponent from '../common/Headcomponent';
import bookopen from '../../assets/images/bookopen.png';
import StatCard from '../common/StatCard';



const CategoryItem = ({ name, onNext }) => (
  <div className="bg-[#F9F9F9] rounded-xl p-4 flex items-center justify-between hover:shadow-md transition-shadow">
    <div className="flex items-center gap-4">
      <div className="p-3 bg-white rounded-lg">
        <img src={bookopen} alt="book" className="w-6 h-6" />
      </div>
      <span className="font-medium text-gray-800">{name}</span>
    </div>
    <button 
      onClick={onNext}
      className="text-[#27AE60] hover:text-[#219652]"
    >
      Next
    </button>
  </div>
);

const Practice = ({ isOpen }) => {
  const navigate = useNavigate();
  
  const categories = [
    'Primary Education',
    'Secondary Education',
    'Mathematics',
    'Science',
    'English Language',
    'Social Studies',
    'Computer Science',
    'Arts & Crafts',
    'Physical Education',
    'Music & Performance'
  ];

  return (
    <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""} transition-all duration-300`}>
      <Headers value1="Home" value2="Practice" />

      <div className="p-6 border-b border-gray-100">
        <div className="flex justify-between items-center">
          <Headcomponent value="Practice Classes" showSearch={false} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
        <StatCard title="Total Categories" count="10" />
        <StatCard title="Total Grades" count="12" />
        <StatCard title="Total Subjects" count="25" />
        <StatCard title="Total Chapters" count="150" />
      </div>

      <div className="bg-white rounded-xl shadow-sm mt-[50px]">
        <div className="p-6 border-b border-gray-100">
          <Headcomponent value="Categories List" showSearch={false} />
        </div>
        
        <div className="p-6">
          <div className="space-y-4">
            {categories.map((category, index) => (
              <CategoryItem 
                key={index} 
                name={category} 
                onNext={() => navigate('/practice-classes')}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Practice;
