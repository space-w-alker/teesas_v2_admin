import React from 'react';
import { useNavigate } from 'react-router-dom';
import book from '../../assets/images/book.png';
import bookopen from '../../assets/images/bookopen.png';
import Searchbutton from '../../../src/assets/images/Searchbutton.png';
import Vector from '../../../src/assets/images/Vector.png';
import statelayer from '../../../src/assets/images/state-layer.png';
//import more from '../../assets/images/more.png';

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

const TopicItem = ({ name, navigate }) => (
  <div className="bg-white rounded-xl p-4 flex items-center justify-between hover:shadow-md transition-shadow">
    <div className="flex items-center gap-4">
      <div className="p-3 bg-gray-50 rounded-lg">
        <img src={bookopen} alt="book" className="w-6 h-6" />
      </div>
      <span className="font-medium text-gray-800">{name}</span>
    </div>
    <div className="flex gap-4 items-center">
      <button className="text-[#27AE60] over:text-[#219652]">
        Edit
      </button>
      <button className="text-[#27AE60] hover:text-[#219652]">
        Add Practice
      </button>
      <button 
        onClick={() => navigate('/add-media')}
        className="text-blue-500 hover:text-blue-600"
      >
        Add Media
      </button>
      <button className="text-red-500 hover:text-red-600">
        Delete
      </button>
    </div>
  </div>
);

const AddTopicUtme = ({ isOpen }) => {
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
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-400">Home</span>
          <span className="text-gray-400">/</span>
          <span className="text-gray-400">UTME Subjects</span>
          <span className="text-gray-400">/</span>
          <span className="text-gray-900 font-medium">Topics</span>
        </div>
      </div>

      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Topic Management</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
        <StatCard title="Total Topics" count="5" />
        <StatCard title="Total Lessons" count="25" />
        <StatCard title="Total Questions" count="100" />
        <StatCard title="Total Resources" count="50" />
      </div>

      <div className="flex justify-end mb-6">
        <button 
          onClick={() => navigate('/add-topic-utme')}
          className="px-6 py-2 bg-[#27AE60] text-white rounded-lg font-medium hover:bg-[#219652]"
        >
          Add Topic
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900">Topics</h2>
          <div className="flex items-center gap-4">
            <img src={Searchbutton} alt="search" className="w-5 h-5 cursor-pointer" />
            <img src={Vector} alt="filter" className="w-5 h-5 cursor-pointer" />
            <img src={statelayer} alt="filter" className="w-5 h-5 cursor-pointer" />
            
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {topics.map((topic, index) => (
              <TopicItem
                key={index}
                name={topic}
                navigate={navigate}
              />
            ))}
          </div>
        </div>
        <div className="p-6 border-t border-gray-100 flex justify-between items-center">
          <button className="px-4 py-2 text-gray-600 hover:text-gray-800">
            Previous
          </button>
          <span className="text-gray-600">Page 1 of 5</span>
          <button className="px-4 py-2 text-gray-600 hover:text-gray-800">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
export default AddTopicUtme;