import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Headers from '../common/Headers';
import Headcomponent from '../common/Headcomponent';
import bookopen from '../../assets/images/bookopen.png';
import StatCard from '../common/StatCard';


const SubjectItem = ({ name, onEdit }) => {
  const navigate = useNavigate();
  return(
  <div className="bg-[#F9F9F9] rounded-xl p-4 flex items-center justify-between hover:shadow-md transition-shadow">
    <div className="flex items-center gap-4">
      <div className="p-3 bg-white rounded-lg">
        <img src={bookopen} alt="book" className="w-6 h-6" />
      </div>
      <span className="font-medium text-gray-800">{name}</span>
    </div>
    <button 
       onClick={() => navigate('/chapters')}
      className="px-4 py-2 text-[#27AE60] hover:text-[#219652] transition-colors font-medium"
    >
      Edit
    </button>
  </div>
  )
};

const Subjects = ({ isOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { className } = location.state || {};
  const [showModal, setShowModal] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);

  const subjects = [
    'Mathematics',
    'English',
    'Science',
    'Social Studies',
    'Computer Science',
    'Arts'
  ];

  const handleEdit = (subject) => {
    setSelectedSubject(subject);
    setShowModal(true);
  };

  const handleAddUnitMedia = () => {
    navigate('/add-unit-media', { state: { subjectName: selectedSubject } });
    setShowModal(false);
  };

  const handleBulkUpload = () => {
    navigate('/upload-bulk-media', { state: { subjectName: selectedSubject } });
    setShowModal(false);
  };

  return (
    <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""} transition-all duration-300`}>
      <Headers value1="Home" value2="Subjects" />

      <div className="p-6 border-b border-gray-100">
        <div className="flex justify-between items-center">
          <Headcomponent value="Lessons" showSearch={false} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
        <StatCard title="Total Subjects" count="6" />
        <StatCard title="Active Subjects" count="6" />
        <StatCard title="Total Topics" count="24" />
        <StatCard title="Total Chapters" count="120" />
      </div>

      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b border-gray-100">
          <Headcomponent value="Subjects List" showSearch={false} />
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {subjects.map((subject, index) => (
              <SubjectItem 
                key={index} 
                name={subject}
                onEdit={() => handleEdit(subject)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subjects;