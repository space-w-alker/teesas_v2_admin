import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Headers from '../common/Headers';
import Headcomponent from '../common/Headcomponent';
import Custombutton from '../common/Custombutton';
import SuccessModal from '../common/SuccessModal';

const UniversityAddSubject = ({ isOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    universityName: location.state?.isEdit ? location.state.universityData.universityName : '',
    subjectTitle: location.state?.isEdit ? location.state.universityData.subjectTitle : ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuccess(true);
  };

  const handleClose = () => {
    setShowSuccess(false);
    setFormData({
      universityName: '',
      subjectTitle: ''
    });
    navigate('/university-subjects');
  };

  return (
    <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""} transition-all duration-300`}>
      <Headers 
        value1="Home" 
        value2={location.state?.isEdit ? "Edit Subject" : "Add Subject"} 
      />

      <div className="mt-6  flex gap-6">
        <div className="flex-[2] bg-white rounded-xl shadow-sm p-6 mb-6">
          <Headcomponent 
            value={location.state?.isEdit ? "Edit Subject" : "Add Subject"} 
            showSearch={false} 
          />
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  University Name
                </label>
                <input
                  type="text"
                  value={formData.universityName}
                  onChange={(e) => setFormData({...formData, universityName: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27AE60]"
                  required
                />
              </div>
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
            </div>
          </form>
        </div>

        <div className="flex-1">
          <div className="bg-white rounded-xl p-8 shadow-sm h-full">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Summary</h2>
            <div className="bg-[#E9FDEE] rounded-lg p-6">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">University Name:</span>
                  <span className="font-medium">{formData.universityName || '-'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Subject Title:</span>
                  <span className="font-medium">{formData.subjectTitle || '-'}</span>
                </div>
              </div>
            </div>
            <Custombutton
              value={location.state?.isEdit ? "Update Subject" : "Create Subject"}
              onClick={handleSubmit}
              textcolor="text-white"
              backgroundcolor="bg-[#27AE60]"
              extraStyle="w-full mt-8 hover:bg-[#219652]"
            />
          </div>
        </div>
      </div>

      <SuccessModal 
        isOpen={showSuccess}
        onClose={handleClose}
        type="success"
        title={location.state?.isEdit ? "Subject Updated Successfully" : "Subject Created Successfully"}
        buttonText="Close"
      />
    </div>
  );
};

export default UniversityAddSubject;
