import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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


const ClassItem = ({ name }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  const handleAddMedia = () => {
    if (selectedOption === 'unit') {
      navigate('/practice-media-upload');
    } else if (selectedOption === 'bulk') {
      navigate('/bulk-upload-media');
    }
    setShowModal(false);
  };

  return (    <div className="bg-white rounded-xl p-4 flex items-center justify-between hover:shadow-md transition-shadow">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-gray-50 rounded-lg">
          <img src={bookopen} alt="book" className="w-6 h-6" />
        </div>
        <span className="font-medium text-gray-800">{name}</span>
      </div>
      <div className="flex gap-4 items-center">
        <button 
          onClick={() => setShowModal(true)}
          className="text-green-600 hover:text-gray-800"
        >
          Add Media
        </button>
        <button 
          onClick={() => navigate('/practice-topic-list')}
          className='text-green-600 hover:text-gray-800'
        >
          Topic List
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-[400px] p-6">
            <h2 className="text-xl font-bold mb-4">Add Media</h2>
            <p className="text-gray-600 mb-4">Select one of the options below</p>
            
            <div className="bg-[#E9FDEE] rounded-xl p-4 space-y-4">
              <div className="flex items-center gap-4">
                <div
                  onClick={() => setSelectedOption('unit')}
                  className={`w-6 h-6 rounded-full cursor-pointer border-2 ${
                    selectedOption === 'unit' ? 'bg-[#27AE60] border-[#27AE60]' : 'border-gray-300'
                  }`}
                />
                <span className="font-medium">Add Single Media</span>
              </div>
              
              <div className="flex items-center gap-4">
                <div
                  onClick={() => setSelectedOption('bulk')}
                  className={`w-6 h-6 rounded-full cursor-pointer border-2 ${
                    selectedOption === 'bulk' ? 'bg-[#27AE60] border-[#27AE60]' : 'border-gray-300'
                  }`}
                />
                <span className="font-medium">Upload Bulk Media</span>
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleAddMedia}
                disabled={!selectedOption}
                className="px-6 py-2 bg-[#27AE60] text-white rounded-lg font-medium hover:bg-[#219652] transition-colors disabled:opacity-50"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};  

const PracticeChapters = ({ isOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { category } = location.state || {};
  
  const classes = [
    'Mathematics of Beggining',
    ' Number and Numeration',
    'Fractions',
    'Decimals',
    'Algebra',
    'Geometry',
  ];

  return (
    <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""} transition-all duration-300`}>
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-400">Home</span>
          <span className="text-gray-400">/</span>
          <span>Lesson</span>
         
        </div>
      </div>

      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Practice</h1>
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
        <StatCard title="Total Classes" count="6" />
        <StatCard title="Active Classes" count="4" />
        <StatCard title="Students" count="120" />
        <StatCard title="Teachers" count="8" />
      </div>

    
      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Topic</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {classes.map((className, index) => (
              <ClassItem 
                key={index} 
                name={className}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PracticeChapters;
