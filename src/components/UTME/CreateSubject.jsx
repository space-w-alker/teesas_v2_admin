import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import book from '../../assets/images/book.png';
import success from '../../assets/images/success.png'; // Make sure to add success icon

const CreateSubject = ({ isOpen }) => {
  const navigate = useNavigate();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [formData, setFormData] = useState({
    subjectTitle: '',
    university: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuccessModal(true);
    
    // Navigate after modal is shown for 1.5 seconds
    setTimeout(() => {
      navigate('/add-subject-utme');
    }, 1500);
  };

  return (
    <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""} transition-all duration-300`}>
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-400">Home</span>
          <span className="text-gray-400">/</span>
          <span className="text-gray-400">UTME Subjects</span>
          <span className="text-gray-400">/</span>
          <span className="text-gray-900 font-medium">Create Subject</span>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Left Section - Main Form */}
        <div className="flex-[2] bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-gray-50 rounded-lg">
              <img src={book} alt="book" className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Add Subject</h2>
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
            <button
              onClick={handleSubmit}
              className="w-full mt-8 px-6 py-3 bg-[#27AE60] text-white rounded-lg font-medium hover:bg-[#219652] transition-colors"
            >
              Create Subject
            </button>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 text-center">
            <img src={success} alt="success" className="w-24 h-24 mx-auto mb-6" />
            <h3 className="text-2xl font-bold mb-4">Success!</h3>
            <p className="text-gray-600 mb-8">Subject created successfully</p>
            <button
              onClick={() => setShowSuccessModal(false)}
              className="w-full py-3 bg-[#27AE60] text-white rounded-lg hover:bg-[#219652]"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateSubject;