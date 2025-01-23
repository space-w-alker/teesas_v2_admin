import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Headers from '../common/Headers';
import Headcomponent from '../common/Headcomponent';
import Custombutton from '../common/Custombutton';
import SuccessModal from '../common/SuccessModal';
import { FaPlus } from 'react-icons/fa';
import book from '../../assets/images/book.png';
import bookopen from '../../assets/images/bookopen.png';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import StatCard from '../common/StatCard';





const TopicItem = ({ name, onDelete }) => {
  const navigate = useNavigate();
  
  return (
    <div 
      className="bg-[#F9F9F9] rounded-xl p-4 flex items-center justify-between hover:shadow-md transition-shadow cursor-pointer"
      
    >
      <div className="flex items-center gap-4">
        <div className="p-3 bg-white rounded-lg">
          <img src={bookopen} alt="book" className="w-6 h-6" />
        </div>
        <span className="font-medium text-gray-800">{name}</span>
      </div>
      <div className="flex gap-4 items-center">
      <button className="text-[#27AE60] hover:text-[#219652]"
       onClick={() => navigate(`/topic/${name.replace(/\s+/g, '-').toLowerCase()}`)}
        >
          View
        </button>
      
        <button className="text-[#27AE60] hover:text-[#219652]"
        onClick={() => navigate('/add-practice-utme')}
        >
          Add Practice
        </button>
        <button 
          onClick={() => navigate('/add-media')}
          className="text-[#27AE60] hover:text-[#219652]"
        >
          Add Media
        </button>
        <button 
          onClick={() => onDelete(name)}
          className="text-red-500 hover:text-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
};
const AddTopicUtme = ({ isOpen }) => {
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState(null);
  
  const topics = [
    'Introduction to Algebra',
    'Linear Equations',
    'Quadratic Equations',
    'Polynomials',
    'Matrices'
  ];

  const handleDelete = (topic) => {
    setSelectedTopic(topic);
    setShowDeleteModal(true);
  };

  return (
    <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""} transition-all duration-300`}>
      <Headers value1="Home" value2="Topics" />

     <div className="p-6 border-b border-gray-100">
          <div className="flex justify-between items-center">
            <Headcomponent value="Topics List" showSearch={false} />
           
          </div>
        </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
        <StatCard title="Total Topics" count="5" />
        <StatCard title="Total Lessons" count="25" />
        <StatCard title="Total Questions" count="100" />
        <StatCard title="Total Resources" count="50" />
      </div>

      

      <div className="bg-white rounded-xl shadow-sm">
      <div className=" ml-6  border-b border-gray-100">
            <Headcomponent value="Topics List" showSearch={true}  />
            </div>
        
        <div className="p-6">
          <div className="space-y-4">
            {topics.map((topic, index) => (
              <TopicItem
                key={index}
                name={topic}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </div>
        <div className="p-6 border-t border-gray-100 flex justify-between items-center">
  <Custombutton
    value={
      <div className="flex items-center gap-2">
        <FaArrowLeft className="text-sm" />
        <span>Previous</span>
      </div>
    }
    backgroundcolor="bg-gray-100"
    textcolor="text-gray-600"
    width="w-[120px]"
    extraStyle="py-2"
  />
  <span className="text-gray-600">Page 1 of 5</span>
  <Custombutton
    value={
      <div className="flex items-center gap-2">
        <span>Next</span>
        <FaArrowRight className="text-sm" />
      </div>
    }
    backgroundcolor="bg-gray-100"
    textcolor="text-gray-600"
    width="w-[120px]"
    extraStyle="py-2"
  />
</div>
      </div>

      <SuccessModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        type="caution"
        title="Confirm Delete"
        message={`Are you sure you want to delete ${selectedTopic}?`}
        buttonText="Delete"
      />
    </div>
  );
};

export default AddTopicUtme;