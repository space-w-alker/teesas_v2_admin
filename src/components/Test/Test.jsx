import React from 'react';
import { useNavigate } from 'react-router-dom';
import book from '../../assets/images/book.png';
import bookopen from '../../assets/images/bookopen.png';

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

const CategoryItem = ({ name, onNext }) => (
  <div className="bg-white rounded-xl p-4 flex items-center justify-between hover:shadow-md transition-shadow">
    <div className="flex items-center gap-4">
      <div className="p-3 bg-gray-50 rounded-lg">
        <img src={bookopen} alt="book" className="w-6 h-6" />
      </div>
      <span className="font-medium text-gray-800">{name}</span>
    </div>
    <button 
      onClick={onNext}
      className="px-4 py-2 text-[#27AE60] hover:text-[#219652] transition-colors font-medium"
    >
      Next
    </button>
  </div>
);

const Text  = ({ isOpen }) => {
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
      {/* Breadcrumb */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-400">Home</span>
          <span className="text-gray-400">/</span>
          <span className="text-gray-900 font-medium">Test</span>
        </div>
      </div>

    
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Test</h1>
      </div>

  
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
        <StatCard title="Total Categories" count="10" />
        <StatCard title="Total Grades" count="12" />
        <StatCard title="Total Subjects" count="25" />
        <StatCard title="Total Chapters" count="150" />
      </div>

     
      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Categories</h2>
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
export default Text;
