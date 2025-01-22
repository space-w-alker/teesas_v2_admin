import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Headers from '../common/Headers';
import Headcomponent from '../common/Headcomponent';
import StatCard from '../common/StatCard';
import Custombutton from '../common/Custombutton';
import SuccessModal from '../common/SuccessModal';
import bookopen from '../../assets/images/bookopen.png';
import Modal from '../common/Modal';

const TopicItem = ({ name }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleAddSingleMedia = () => {
    navigate('/practice-media-upload');
  };

  const handleBulkMedia = () => {
    navigate('/bulk-upload-media');
  };

  return (
    <div className="bg-[#F9F9F9] rounded-xl p-4 flex items-center justify-between hover:shadow-md transition-shadow">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-white rounded-lg">
          <img src={bookopen} alt="book" className="w-6 h-6" />
        </div>
        <span className="font-medium text-gray-800">{name}</span>
      </div>
      <div className="flex gap-4 items-center">
        <Custombutton
          value="Add Media"
          onClick={() => setShowModal(true)}
          textcolor="text-[#27AE60]"
          backgroundcolor="bg-transparent"
        />
        <Custombutton
          value="Practice List"
          onClick={() => navigate('/practice-topic-list')}
          textcolor="text-[#27AE60]"
          backgroundcolor="bg-transparent"
        />
      </div>

      {showModal && (
        <Modal
          label="ADD MEDIA"
          value1="Add Single Media"
          value2="Upload Bulk Media"
          closeModal={() => setShowModal(false)}
          addSingleButton={handleAddSingleMedia}
          addMutipleButton={handleBulkMedia}
        />
      )}
    </div>
  );
};

const PracticeTopic = ({ isOpen }) => {
  const topics = [
    'Mathematics of Beginning',
    'Number and Numeration',
    'Fractions',
    'Decimals',
    'Algebra',
    'Geometry',
  ];

  return (
    <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""} transition-all duration-300`}>
      <Headers value1="Home" value2="Practice" value3="Topics" />

      <div className="p-6 border-b border-gray-100">
        <div className="flex justify-between items-center">
          <Headcomponent value="Practice Topics" showSearch={false} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
        <StatCard title="Total Topics" count="6" />
        <StatCard title="Active Topics" count="6" />
        <StatCard title="Total Media" count="24" />
        <StatCard title="Total Questions" count="120" />
      </div>

      <div className="bg-white rounded-xl shadow-sm mt-[50px]">
        <div className="p-6 border-b border-gray-100">
          <Headcomponent value="Topics List" showSearch={false} />
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
      </div>
    </div>
  );
};

export default PracticeTopic;
