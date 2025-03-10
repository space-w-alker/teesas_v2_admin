import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUniversitiesAsync, createSubjectAsync, updateSubjectAsync, deleteSubjectAsync } from '../../apis/slices/categoriesSlice';
import Headers from '../common/Headers';
import Headcomponent from '../common/Headcomponent';
import SuccessModal from '../common/SuccessModal';
import Custombutton from '../common/Custombutton';

const CreateSubject = ({ isOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { data: universities } = useSelector(state => state.categories.universities);
  const { success, isLoading } = useSelector(state => state.categories.createSubject);
  const { mode, subjectData } = location.state || {};
  const isEditMode = mode === 'edit';
  const classId = location.state?.classId;

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [formData, setFormData] = useState({
    name: isEditMode ? subjectData?.name : '',
    university: isEditMode ? subjectData?.university_id : '',
    preferredColor: isEditMode ? subjectData?.preferred_color : '#27AE60',
    media: null
  });

  useEffect(() => {
    dispatch(getUniversitiesAsync());
  }, [dispatch]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('active', 'true');
    formDataToSend.append('university_id', formData.university);
    formDataToSend.append('preferred_color', formData.preferredColor);

    if (formData.media) {
      formDataToSend.append('image', formData.media);
    }

    let result;
    if (isEditMode) {
      result = await dispatch(updateSubjectAsync(classId, subjectData.id, formDataToSend));
    } else {
      result = await dispatch(createSubjectAsync(classId, formDataToSend));
    }

    if (result) {
      setShowSuccessModal(true);
    }
  };
  // Add useEffect to properly initialize form data in edit mode
  useEffect(() => {
    if (isEditMode && subjectData) {
      setFormData({
        name: subjectData.name,
        university: subjectData.university_id,
        preferredColor: subjectData.preferred_color || '#27AE60',
        media: null
      });
    }
  }, [isEditMode, subjectData]);





  return (
    <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""} transition-all duration-300`}>
      <Headers value1="Home" value2={isEditMode ? "Edit Subject" : "Create Subject"} />

      <div className="mt-6 flex gap-6">
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
                  Subject Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                  onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27AE60]"
                  required
                >
                  <option value="">Select University</option>
                  {universities?.map(uni => (
                    <option key={uni.id} value={uni.id}>{uni.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Subject Icon
                </label>
                <input
                  type="file"
                  onChange={(e) => setFormData({ ...formData, media: e.target.files[0] })}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27AE60]"
                  accept="image/*"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Preferred Color
                </label>
                <select
                  value={formData.preferredColor}
                  onChange={(e) => setFormData({ ...formData, preferredColor: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27AE60]"
                  required
                >
                  <option value="">Select Color</option>
                  <option value="#27AE60">Green</option>
                  <option value="#2F80ED">Blue</option>
                  <option value="#EB5757">Red</option>
                  <option value="#F2C94C">Yellow</option>
                  <option value="#9B51E0">Purple</option>
                  <option value="#27AE60">Orange</option>
                  <option value="#56CCF2">Light Blue</option>
                  <option value="#219653">Dark Green</option>
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
                  <span className="text-gray-600">Subject Name:</span>
                  <span className="font-medium">{formData.name || '-'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">University:</span>
                  <span className="font-medium">
                    {universities?.find(u => u.id === parseInt(formData.university))?.name || '-'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Color:</span>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: formData.preferredColor }}
                    />
                    <span className="font-medium">{formData.preferredColor}</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Icon:</span>
                  <span className="font-medium">
                    {formData.media ? formData.media.name : '-'}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-8">
              <Custombutton
                value={isEditMode ? "Update Subject" : "Create Subject"}
                onClick={handleSubmit}
                backgroundcolor="bg-[#27AE60]"
                textcolor="text-white"
                width="w-[130px] mt-4"
                extraStyle="mt-8 py-3"
              />
            </div>
          </div>
        </div>
      </div>

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => {
          setShowSuccessModal(false);
          navigate(-1);
        }}
        type="success"
        title={isEditMode ? "Subject Updated!" : "Subject Created!"}
        message={isEditMode ? "Subject has been updated successfully" : "Subject has been created successfully"}
        buttonText="Continue"
      />
    </div>
  );
};

export default CreateSubject;
