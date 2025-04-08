import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUniversitySubjectAsync, updateUniversitySubjectAsync } from '../../apis/slices/questionBankSlice';
import Headers from '../common/Headers';
import Headcomponent from '../common/Headcomponent';
import Custombutton from '../common/Custombutton';
import SuccessModal from '../common/SuccessModal';
import { TailSpin } from "react-loader-spinner";
import { toast } from 'react-toastify';

const UniversityAddSubject = ({ isOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("authToken");

  // Get data from navigation state
  const {
    universityId,
    universityName,
    isEdit,
    subjectId,
    subjectTitle
  } = location.state || {};

  // Initialize form data
  const [formData, setFormData] = useState({
    universityName: universityName || '',
    subjectTitle: subjectTitle || ''
  });

  // Set page title based on mode
  const pageTitle = isEdit ? "Edit Subject" : "Add Subject";
  const buttonText = isEdit ? "Update Subject" : "Add Subject";
  const successMessage = isEdit ? "Subject Updated Successfully" : "Subject Created Successfully";

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.subjectTitle.trim()) {
      toast.error("Subject title is required");
      return;
    }

    setLoading(true);

    const subjectData = {
      name: formData.subjectTitle
    };

    if (isEdit) {
      // Update existing subject
      updateUniversitySubjectAsync({
        dispatch,
        universityId,
        subjectId,
        subjectData,
        token,
        callbackFn: (response) => {
          setLoading(false);

          if (response?.error) {
            toast.error(response.error.message || "Failed to update subject");
            return;
          }

          if (response?.data?.status === 200) {
            setShowSuccess(true);
          } else {
            toast.error(response?.data?.message || "Failed to update subject");
          }
        }
      });
    } else {
      // Add new subject
      addUniversitySubjectAsync({
        dispatch,
        universityId,
        subjectData,
        token,
        callbackFn: (response) => {
          setLoading(false);

          if (response?.error) {
            toast.error(response.error.message || "Failed to add subject");
            return;
          }

          if (response?.data?.status === 201) {
            setShowSuccess(true);
          } else {
            toast.error(response?.data?.message || "Failed to add subject");
          }
        }
      });
    }
  };

  const handleClose = () => {
    setShowSuccess(false);
    // Navigate back to university subjects page with the university ID
    navigate('/university-subjects', {
      state: {
        universityId,
        universityName: formData.universityName
      }
    });
  };

  return (
    <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""} transition-all duration-300`}>
      <Headers
        value1="Home"
        value2="University Subjects"
        value3={pageTitle}
      />

      {loading && (
        <div style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 9999,
        }}>
          <TailSpin color="green" radius={5} />
        </div>
      )}

      <div className="mt-6 flex gap-6">
        <div className="flex-[2] bg-white rounded-xl shadow-sm p-6 mb-6">
          <Headcomponent
            value={pageTitle}
            showSearch={false}
          />

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-6 mt-4">
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  University Name
                </label>
                <input
                  type="text"
                  value={formData.universityName}
                  disabled
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27AE60] bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Subject Title
                </label>
                <input
                  type="text"
                  value={formData.subjectTitle}
                  onChange={(e) => setFormData({ ...formData, subjectTitle: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27AE60]"
                  required
                />
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <Custombutton
                value={buttonText}
                onClick={handleSubmit}
                textcolor="text-white"
                backgroundcolor="bg-[#27AE60]"
                extraStyle="hover:bg-[#219652]"
              />
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
                <div className="flex justify-between">
                  <span className="text-gray-600">Action:</span>
                  <span className="font-medium">{isEdit ? 'Update Subject' : 'Create New Subject'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <SuccessModal
        isOpen={showSuccess}
        onClose={handleClose}
        type="success"
        title={successMessage}
        buttonText="Close"
      />
    </div>
  );
};

export default UniversityAddSubject;
