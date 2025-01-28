import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Headers from '../common/Headers';
import Headcomponent from '../common/Headcomponent';
import Custombutton from '../common/Custombutton';
import SuccessModal from '../common/SuccessModal';
import bookopen from '../../assets/images/bookopen.png';
import { FaPlus } from 'react-icons/fa';
import StatCard from '../common/StatCard';



const SubjectItem = ({ name, onEdit, onDelete }) => {
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
          onClick={() => navigate('/create-chapter')}
          className="text-black"
        >
          Add Chapter
        </button>
        <button 
          onClick={onEdit}
          className="text-black"
        >
          Edit
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

const AddSubjectUTME = ({ isOpen }) => {
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);
  
  const subjects = [
    'Mathematics',
    'Physics',
    'Chemistry',
    'Biology',
    'English Language',
    'Literature',
    'Government',
    'Economics',
    'Geography',
    'Computer Science'
  ];

  const handleEdit = (subject) => {
    navigate('/create-new-subject', { 
      state: { 
        mode: 'edit',
        subjectData: {
          subjectTitle: subject,
          university: 'unilag'
        }
      }
    });
  };

  const handleDelete = (subject) => {
    setSelectedSubject(subject);
    setShowDeleteModal(true);
  };

  return (
    <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""} transition-all duration-300`}>
      <Headers value1="Home" value2="UTME Subjects" />

      <div className="p-6 border-b border-gray-100">
        <div className="flex justify-between items-center">
          <Headcomponent value="UTME Subject Management" showSearch={false} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
        <StatCard title="Total Subjects" count="10" />
        <StatCard title="Total Chapters" count="48" />
        <StatCard title="Total Topics" count="240" />
        <StatCard title="Total Lessons" count="720" />
      </div>

      <div className="flex justify-end mb-6">
        <Custombutton
           value={
            <div className="flex items-center gap-2">
              <FaPlus className="text-sm" />
              <span>Add Subject</span>
            </div>
          }
          onClick={() => navigate('/create-new-subject')}
          backgroundcolor="bg-[#27AE60]"
          textcolor="text-white"
          width="w-[130px]"
          extraStyle="py-2"
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b border-gray-100">
          <Headcomponent value="Subjects" showSearch={false} />
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {subjects.map((subject, index) => (
              <SubjectItem
                key={index}
                name={subject}
                onEdit={() => handleEdit(subject)}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </div>
      </div>

      <SuccessModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        type="caution"
        title="Confirm Delete"
        message={`Are you sure you want to delete ${selectedSubject}?`}
        buttonText="Delete"
      />
    </div>
  );
};

export default AddSubjectUTME;