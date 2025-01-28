import React, { useState } from 'react';
import { FaCloudUploadAlt } from "react-icons/fa";
import SuccessModal from '../common/SuccessModal';

const AddTestUtme = ({ isOpen }) => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    category: '',
    grade: '',
    chapter: '',
    lessonTitle: '',
    description: '',
    video: null
  });

  const [dragActive, setDragActive] = useState(false);

  const handleVideoUpload = (e) => {
    setFormData({...formData, video: e.target.files[0]});
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFormData({...formData, video: e.dataTransfer.files[0]});
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuccess(true);
  };

  const handleClose = () => {
    setShowSuccess(false);
    setFormData({
      category: '',
      grade: '',
      chapter: '',
      lessonTitle: '',
      description: '',
      video: null
    });
  };

  return (
    <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""} transition-all duration-300`}>
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-400">Home</span>
          <span className="text-gray-400">/</span>
          <span className="text-gray-900 font-medium">Add Test UTME</span>
        </div>
      </div>

      <div className="flex gap-6">
        <div className="flex-[2] bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-4 mb-6">
            <h2 className="text-xl font-bold text-gray-900">Add Test UTME</h2>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Select Subject
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27AE60]"
                    required
                  >
                    <option value="">Select Subject</option>
                    <option value="mathematics">Mathematics</option>
                    <option value="english">English</option>
                    <option value="physics">Physics</option>
                    <option value="chemistry">Chemistry</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Select Year
                  </label>
                  <select
                    value={formData.grade}
                    onChange={(e) => setFormData({...formData, grade: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27AE60]"
                    required
                  >
                    <option value="">Select Year</option>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                    <option value="2021">2021</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Select Topic
                  </label>
                  <select
                    value={formData.chapter}
                    onChange={(e) => setFormData({...formData, chapter: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27AE60]"
                    required
                  >
                    <option value="">Select Topic</option>
                    <option value="topic1">Algebra</option>
                    <option value="topic2">Calculus</option>
                    <option value="topic3">Statistics</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Test Title
                  </label>
                  <input
                    type="text"
                    value={formData.lessonTitle}
                    onChange={(e) => setFormData({...formData, lessonTitle: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27AE60]"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27AE60] h-32"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Upload Test Document
                </label>
                <div 
                  className="border-2 border-dashed rounded-lg p-8 text-center bg-[#E9FDEE] border-[#27AE60]"
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <FaCloudUploadAlt className="mx-auto text-5xl text-gray-400 mb-4" />
                  <p className="text-gray-600 mb-4">
                    Drag and drop your document here, or
                    <label className="text-[#27AE60] cursor-pointer ml-1">
                      browse
                      <input
                        type="file"
                        className="hidden"
                        accept=".pdf,.doc,.docx"
                        onChange={handleVideoUpload}
                        required
                      />
                    </label>
                  </p>
                  <p className="text-sm text-gray-500 mb-2">Supported formats: PDF, DOC, DOCX</p>
                  <p className="text-sm text-gray-500">Maximum file size: 10MB</p>
                  {formData.video && (
                    <div className="mt-4 text-left bg-gray-50 p-4 rounded-lg">
                      <p className="font-medium">Selected file:</p>
                      <p className="text-gray-600">{formData.video.name}</p>
                    </div>
                  )}
                  <button
                    onClick={() => window.open('/sample-test.pdf')}
                    className="mt-4 text-[#27AE60] font-medium"
                  >
                    Download Sample Test
                  </button>
                </div>
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
                  <span className="text-gray-600">Subject:</span>
                  <span className="font-medium">{formData.category || '-'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Year:</span>
                  <span className="font-medium">{formData.grade || '-'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Topic:</span>
                  <span className="font-medium">{formData.chapter || '-'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Test Title:</span>
                  <span className="font-medium">{formData.lessonTitle || '-'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Document:</span>
                  <span className="font-medium">{formData.video?.name || '-'}</span>
                </div>
              </div>
            </div>
            <button
              onClick={handleSubmit}
              className="w-full mt-8 px-6 py-3 bg-[#27AE60] text-white rounded-lg font-medium hover:bg-[#219652] transition-colors"
            >
              Create Test
            </button>
          </div>
        </div>
      </div>

      <SuccessModal 
        isOpen={showSuccess}
        onClose={handleClose}
        type="success"
        title="Test Created Successfully"
        message="Your UTME test has been created and saved successfully."
        buttonText="Close"
      />
    </div>
  );
};

export default AddTestUtme;
