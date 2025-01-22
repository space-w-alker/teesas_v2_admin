import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Headers from '../common/Headers';
import Headcomponent from '../common/Headcomponent';
import Modal from '../common/Modal';
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

const TopicItem = ({ name, status, onEdit }) => {
    const navigate = useNavigate();
    return (
  <div className="bg-[#F9F9F9] rounded-xl p-4 flex items-center justify-between hover:shadow-md transition-shadow">
    <div className="flex items-center gap-4">
      <div className="p-3 bg-white rounded-lg">
        <img src={bookopen} alt="book" className="w-6 h-6" />
      </div>
      <span className="font-medium text-gray-800">{name}</span>
    </div>
    <div className="flex items-center gap-4">
      <span 
        className={`px-3 py-1 rounded-full text-sm ${
          status === 'Active' 
            ? 'bg-[#E9FDEE] text-[#27AE60]' 
            : 'bg-[#FFE9E9] text-[#FF4949]'
        }`}
      >
        {status}
      </span>
      <button 
        onClick={onEdit}
        className="px-4 py-2 text-[#27AE60] hover:text-[#219652] transition-colors font-medium"
      >
        Add Media
      </button>
<button 
  onClick={() => navigate('/topic-details')}
  className="px-4 py-2 text-[#27AE60] hover:text-[#219652] transition-colors font-medium"
>
  View Details
</button>
    </div>
  </div>
)
}

const Topics = ({ isOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { chapterName } = location.state || {};
  const [showModal, setShowModal] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState(null);

  const topics = [
    { name: 'Topic 1: Basic Properties', status: 'Active' },
    { name: 'Topic 2: Theorems', status: 'Active' },
    { name: 'Topic 3: Problem Solving', status: 'Inactive' },
    { name: 'Topic 4: Examples', status: 'Active' },
    { name: 'Topic 5: Practice', status: 'Inactive' }
  ];

  const handleEdit = (topic) => {
    setSelectedTopic(topic);
    setShowModal(true);
  };

  const handleAddUnitMedia = () => {
    navigate('/add-unit-media', { state: { topicName: selectedTopic.name } });
    setShowModal(false);
  };

  const handleBulkUpload = () => {
    navigate('/upload-bulk-media', { state: { topicName: selectedTopic.name } });
    setShowModal(false);
  };

  return (
    <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""} transition-all duration-300`}>
      <Headers value1="Home" value2="Topics" />

      <div className="mb-8 mt-6">
        <Headcomponent value="Topics Management" showSearch={false} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
        <StatCard title="Total Topics" count="5" />
        <StatCard title="Active Topics" count="3" />
        <StatCard title="Total Videos" count="15" />
        <StatCard title="Total Documents" count="10" />
      </div>

      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b border-gray-100">
          <Headcomponent value="Topics List" showSearch={false} />
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {topics.map((topic, index) => (
              <TopicItem 
                key={index} 
                name={topic.name}
                status={topic.status}
                onEdit={() => handleEdit(topic)}
              />
            ))}
          </div>
        </div>
      </div>

      {showModal && (
        <Modal
          label="ADD MEDIA"
          value1="Add Unit Media"
          value2="Upload Bulk Media"
          showModal={showModal}
          setShowModal={setShowModal}
          addSingleButton={handleAddUnitMedia}
          addMutipleButton={handleBulkUpload}
        />
      )}
    </div>
  );
};

export default Topics;