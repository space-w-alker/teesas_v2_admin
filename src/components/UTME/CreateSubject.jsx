import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Headers from '../common/Headers';
import Headcomponent from '../common/Headcomponent';
import SuccessModal from '../common/SuccessModal';
import Custombutton from '../common/Custombutton';
import book from '../../assets/images/book.png';

const CreateSubject = ({ isOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { mode, subjectData } = location.state || {};
  const isEditMode = mode === 'edit';
  
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [formData, setFormData] = useState({
    subjectTitle: isEditMode ? subjectData.subjectTitle : '',
    university: isEditMode ? subjectData.university : ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuccessModal(true);
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    navigate('/add-subject-utme');
  };

  return (
    <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""} transition-all duration-300`}>
      <Headers value1="Home" value2={isEditMode ? "Edit Subject" : "Create Subject"} />

     

      <div className=" mt-6 flex gap-6">
        {/* Left Section - Form */}
        <div className="flex-[2] bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-4 mb-6">
            
            <h2 className="text-xl font-bold text-gray-900">
              {isEditMode ? 'Edit Subject Details' : 'Subject Details'}
            </h2>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Subject Title
                </label>
                <input
                  type="text"
                  value={formData.subjectTitle}
                  onChange={(e) => setFormData({...formData, subjectTitle: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27AE60]"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Select University
                </label>
                <select
                  value={formData.university}
                  onChange={(e) => setFormData({...formData, university: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27AE60]"
                  required
                >
                  <option value="">Select University</option>
                  <option value="unilag">University of Lagos</option>
                  <option value="ui">University of Ibadan</option>
                  <option value="oau">Obafemi Awolowo University</option>
                </select>
              </div>
            </div>
          </form>
        </div>

        {/* Right Section - Summary */}
        <div className="flex-1">
          <div className="bg-white rounded-xl p-8 shadow-sm h-full">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Summary</h2>
            <div className="bg-[#E9FDEE] rounded-lg p-6">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subject Title:</span>
                  <span className="font-medium">{formData.subjectTitle || '-'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">University:</span>
                  <span className="font-medium">{formData.university || '-'}</span>
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-8">
            
            <Custombutton
  value={isEditMode ? "Update Subject" : "Create Subject"}
  onClick={handleSubmit}
  backgroundcolor="bg-[#27AE60]"
  textcolor="text-white"
  width="w-[130px] mt-4 "
  extraStyle="mt-8 py-3"
/>
</div>
          </div>
        </div>
      </div>

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={handleCloseModal}
        type="success"
        title={isEditMode ? "Subject Updated!" : "Subject Created!"}
        message={isEditMode ? "Subject has been updated successfully" : "Subject has been created successfully"}
        buttonText="Continue"
      />
    </div>
  );
};

export default CreateSubject;