import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Headers from '../common/Headers';
import Headcomponent from '../common/Headcomponent';
import StatCard from '../common/StatCard';
import Custombutton from '../common/Custombutton';
import SuccessModal from '../common/SuccessModal';
import bookopen from '../../assets/images/bookopen.png';
import book from '../../assets/images/book.png';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const UniversityItem = ({ name, navigate }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <>
      <div className="bg-gray-50 rounded-xl p-4 flex items-center justify-between hover:shadow-md transition-shadow">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white rounded-lg">
            <img src={bookopen} alt="book" className="w-6 h-6" />
          </div>
          <span className="font-medium text-gray-800">{name}</span>
        </div>
        <div className="flex gap-4 items-center">
          <Custombutton
            value="Add Subject"
            onClick={() => navigate('/university-subjects', { state: { universityName: name } })}
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
        title="Delete University"
        message="Are you sure you want to delete this university?"
        buttonText="Delete"
      />
    </>
  );
};

const UniversityList = ({ isOpen }) => {
  const navigate = useNavigate();
  
  const universities = [
    'University of Lagos',
    'University of Ibadan',
    'Covenant University',
    'Federal University of Technology'
  ];

  return (
    <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""} transition-all duration-300`}>
      <Headers value1="Home" value2="University List" />

      <div className="mb-8 mt-6">
        <h1 className="text-2xl font-bold text-gray-900">University List</h1>
      </div>

      <div className=" mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
        <StatCard title="Total Universities" count="25" />
        <StatCard title="Total Subjects" count="20" />
        <StatCard title="Total PDF Uploaded" count="150" />
      </div>

      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b border-gray-100">
          <Headcomponent value="Universities" showSearch={true} />
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {universities.map((uni, index) => (
              <UniversityItem 
                key={index} 
                name={uni} 
                navigate={navigate}
              />
            ))}
          </div>
        </div>
        <div className="p-6 border-t border-gray-100 flex justify-between items-center">
          <Custombutton
            value={
              <div className="flex items-center gap-2">
                <FaArrowLeft />
                <span>Previous</span>
              </div>
            }
            backgroundcolor="bg-gray-100"
            textcolor="text-gray-600"
            width="w-[100px]"
            extraStyle="py-2"
          />
          <span className="text-gray-600">Page 1 of 5</span>
          <Custombutton
            value={
              <div className="flex items-center gap-2">
                <span>Next</span>
                <FaArrowRight />
              </div>
            }
            backgroundcolor="bg-gray-100"
            textcolor="text-gray-600"
            width="w-[80px]"
            extraStyle="py-2"
          />
        </div>
      </div>
    </div>
  );
};

export default UniversityList;
