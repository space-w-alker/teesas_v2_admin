import React, { useState } from 'react';
import Headers from '../common/Headers';
import Headcomponent from '../common/Headcomponent';
import Custombutton from '../common/Custombutton';
import SuccessModal from '../common/SuccessModal';
import { FaCloudUploadAlt } from "react-icons/fa";

const AddTest = ({ isOpen }) => {
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
      <Headers value1="Home" value2="Add Test" />

      <div className="flex gap-6">
        <div className="flex-[2] mt-6 bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-4 mb-6">
            <Headcomponent value="Add Test" showSearch={false} />
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Select Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27AE60]"
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="math">Mathematics</option>
                    <option value="science">Science</option>
                    <option value="english">English</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Select Grade
                  </label>
                  <select
                    value={formData.grade}
                    onChange={(e) => setFormData({...formData, grade: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27AE60]"
                    required
                  >
                    <option value="">Select Grade</option>
                    <option value="1">Grade 1</option>
                    <option value="2">Grade 2</option>
                    <option value="3">Grade 3</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Select Chapter
                  </label>
                  <select
                    value={formData.chapter}
                    onChange={(e) => setFormData({...formData, chapter: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27AE60]"
                    required
                  >
                    <option value="">Select Chapter</option>
                    <option value="chapter1">Chapter 1</option>
                    <option value="chapter2">Chapter 2</option>
                    <option value="chapter3">Chapter 3</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Lesson Title
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
                  Upload Practice Video
                </label>
                <div 
                  className={`bg-green-50 border-2 border-dashed rounded-lg p-8 text-center ${dragActive ? 'bg-[#E9FDEE] border-[#27AE60]' : 'border-gray-300'}`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <FaCloudUploadAlt className="mx-auto text-5xl text-gray-400 mb-4" />
                  <p className="text-gray-600 mb-4">
                    Drag and drop your video here, or
                    <label className="text-[#27AE60] cursor-pointer ml-1">
                      browse
                      <input
                        type="file"
                        className="hidden"
                        accept="video/mp4"
                        onChange={handleVideoUpload}
                        required
                      />
                    </label>
                  </p>
                  <p className="text-sm text-gray-500 mb-2">Supported format: MP4</p>
                  <p className="text-sm text-gray-500">Maximum file size: 6MB</p>
                  {formData.video && (
                    <div className="mt-4 text-left bg-gray-50 p-4 rounded-lg">
                      <p className="font-medium">Selected file:</p>
                      <p className="text-gray-600">{formData.video.name}</p>
                    </div>
                  )}
                  <Custombutton
                    value="Download Sample Video"
                    onClick={() => window.open('/sample-video.mp4')}
                    textcolor="text-[#27AE60]"
                    backgroundcolor="bg-transparent"
                    extraStyle="mt-4 font-medium"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>

        <div className="flex-1">
          <div className="mt-6 bg-white rounded-xl p-8 shadow-sm h-full">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Summary</h2>
            <div className="bg-[#E9FDEE] rounded-lg p-6">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Category:</span>
                  <span className="font-medium">{formData.category || '-'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Grade:</span>
                  <span className="font-medium">{formData.grade || '-'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Chapter:</span>
                  <span className="font-medium">{formData.chapter || '-'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Lesson Title:</span>
                  <span className="font-medium">{formData.lessonTitle || '-'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Video:</span>
                  <span className="font-medium">{formData.video?.name || '-'}</span>
                </div>
              </div>
            </div>
            <Custombutton
              value="Add Test"
              onClick={handleSubmit}
              textcolor="text-white"
              backgroundcolor="bg-[#27AE60]"
              extraStyle="w-[120px] "
            />
          </div>
        </div>
      </div>

      <SuccessModal 
        isOpen={showSuccess}
        onClose={handleClose}
        type="success"
        title="Test Added  Successfully"
        buttonText="Close"
      />
    </div>
  );
};

export default AddTest;
