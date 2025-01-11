import React, { useState } from 'react';
import { FiUpload } from 'react-icons/fi';

const AddUnitTopic = ({ isOpen }) => {
  const [topicTitle, setTopicTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  return (
    <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""}`}>
      <div className="mb-8">
        <div className="font-normal text-[14px] lg:text-[16px] leading-[20px] text-[#B6B6B6]">
          Home / Categories / Primary 1 / Mathematics / Chapters / Addition / <span className="text-black font-medium">Add Topic</span>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Left Section */}
        <div className="flex-[2] bg-white rounded-xl p-6">
          <h2 className="text-2xl font-bold mb-6">Add Topic</h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Topic Title</label>
              <input
                type="text"
                value={topicTitle}
                onChange={(e) => setTopicTitle(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#27AE60]"
                placeholder="Enter topic title"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="4"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#27AE60]"
                placeholder="Enter topic description"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Upload Lesson Video</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
                <div className="text-center">
                  <FiUpload className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600 mb-2">Drag and drop your video here</p>
                  <p className="text-gray-400 text-sm mb-4">Supported formats: MP4, MOV</p>
                  <input
                    type="file"
                    id="videoUpload"
                    className="hidden"
                    accept="video/*"
                    onChange={(e) => setSelectedVideo(e.target.files[0])}
                  />
                  <label
                    htmlFor="videoUpload"
                    className="px-6 py-2 bg-[#27AE60] text-white rounded-lg font-medium hover:bg-[#219652] cursor-pointer"
                  >
                    Browse Files
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex-1 bg-white rounded-xl p-6 h-fit">
          <h3 className="text-xl font-bold mb-6">Summary</h3>
          
          <div className="space-y-4">
            <div>
              <p className="text-gray-600 mb-1">Topic Title</p>
              <p className="font-medium">{topicTitle || 'Not specified'}</p>
            </div>

            <div>
              <p className="text-gray-600 mb-1">Video</p>
              <p className="font-medium">{selectedVideo?.name || 'No video selected'}</p>
            </div>

            <button 
              onClick={() => setShowSuccessModal(true)}
              className="w-full py-3 bg-[#27AE60] text-white rounded-lg font-medium hover:bg-[#219652] mt-6"
            >
              Create Topic
            </button>
          </div>
        </div>
      </div>

      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 text-center">
            <img src={success} alt="success" className="w-24 h-24 mx-auto mb-6" />
            <h3 className="text-2xl font-bold mb-4">Success!</h3>
            <p className="text-gray-600 mb-8">Topic uploaded successfully</p>
            <button 
              onClick={() => {
                setShowSuccessModal(false);
                navigate('/chapters');
              }}
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

export default AddUnitTopic;