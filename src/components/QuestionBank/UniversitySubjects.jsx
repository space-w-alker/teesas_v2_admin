import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Headers from '../common/Headers';
import Headcomponent from '../common/Headcomponent';
import StatCard from '../common/StatCard';
import Custombutton from '../common/Custombutton';
import bookopen from '../../assets/images/bookopen.png';
import book from '../../assets/images/book.png';
import { FaPlus } from 'react-icons/fa';
import SuccessModal from '../common/SuccessModal';
import { useState } from 'react';

const SubjectItem = ({ name, navigate, universityName }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <>
      <div className="bg-gray-50 rounded-xl p-4 flex items-center justify-between hover:shadow-md transition-shadow">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white rounded-lg">
            <img src={bookopen} alt="book" className="w-6 h-6" />
                  </div>
                  <span 
                    onClick={() => navigate('/university-subject-detail', { state: { name } })}
                    className="font-medium text-gray-800 cursor-pointer hover:text-[#27AE60]"
                  >
                    {name}
                  </span>
                </div>
        <div className="flex gap-4 items-center">
          <Custombutton
            value="Add Pdf"
            onClick={() => navigate('/university-add-pdf')}
            textcolor="text-[#27AE60]"
            backgroundcolor="bg-transparent"
            extraStyle="font-medium"
          />
          <Custombutton
  value="View Pdf"
  onClick={() => navigate('/university-view-pdf', { state: { subjectName: name } })}
  textcolor="text-[#27AE60]"
  backgroundcolor="bg-transparent"
  extraStyle="font-medium"
/>

          <Custombutton
            value="Edit"
            onClick={() => navigate('/university-add-subject', { 
              state: { 
                isEdit: true,
                universityData: {
                  universityName: universityName,
                  subjectTitle: name
                }
              }
            })}
            textcolor="text-[#27AE60]"
            backgroundcolor="bg-transparent"
            extraStyle="font-medium"
          />
          <Custombutton
            value="Delete"
            onClick={() => setShowDeleteModal(true)}
            textcolor="text-red-600"
            backgroundcolor="bg-transparent"
            extraStyle="font-medium"
          />
        </div>
      </div>

      <SuccessModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        type="caution"
        title="Delete Subject"
        message="Are you sure you want to delete this subject?"
        buttonText="Delete"
      />
    </>
  );
};

const UniversitySubjects = ({ isOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { universityName } = location.state || {};

  const subjects = [
    'Mathematics',
    'Physics',
    'Chemistry',
    'Biology'
  ];

  return (
    <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""} transition-all duration-300`}>
      <Headers 
        value1="Home" 
        value2="Universities" 
        value3={universityName} 
      />
      
      <div className="p-6 border-b border-gray-100">
        <div className="flex justify-between items-center">
          <Headcomponent value={universityName} showSearch={false} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
        <StatCard title="Total Subjects" count="12" />
        <StatCard title="Active Subjects" count="10" />
        <StatCard title="Total Questions" count="240" />
        <StatCard title="Total PDF Uploaded" count="150" />
      </div>
      <div className="flex justify-end mb-6">
        <Custombutton
          value={
            <div className="flex items-center gap-2">
              <FaPlus className="text-white" />
              <span>Add Subject</span>
            </div>
          }
          onClick={() => navigate('/university-add-subject')}
          textcolor="text-white"
          backgroundcolor="bg-[#27AE60]"
          extraStyle="hover:bg-[#219652]"
        />
      </div>
      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <Headcomponent value="Subjects" showSearch={false} />
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {subjects.map((subject, index) => (
              <SubjectItem 
                key={index} 
                name={subject} 
                navigate={navigate}
                universityName={universityName}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniversitySubjects;