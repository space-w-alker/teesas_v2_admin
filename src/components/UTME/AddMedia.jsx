import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import success from '../../assets/images/success.png';
import book from '../../assets/images/book.png';

const AddMedia = ({ isOpen }) => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    topicTitle: '',
    description: '',
    video: null
  });

  const handleVideoUpload = (e) => {
    setFormData({...formData, video: e.target.files[0]});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Media added:', formData);
    setShowSuccess(true);
  };

  const handleClose = () => {
    setShowSuccess(false);
    
    setFormData({
      topicTitle: '',
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
          <span className="text-gray-900 font-medium">Add Media</span>
        </div>
      </div>

      <div className="flex gap-6">
        <div className="flex-[2] bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-gray-50 rounded-lg">
              <img src={book} alt="book" className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Add Media</h2>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Topic Title
                </label>
                <input
                  type="text"
                  value={formData.topicTitle}
                  onChange={(e) => setFormData({...formData, topicTitle: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27AE60]"
                  required
                />
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
                  Upload Lesson Video
                </label>
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleVideoUpload}
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
                  <span className="text-gray-600">Topic Title:</span>
                  <span className="font-medium">{formData.topicTitle || '-'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Description:</span>
                  <span className="font-medium">{formData.description || '-'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Video:</span>
                  <span className="font-medium">{formData.video?.name || '-'}</span>
                </div>
              </div>
            </div>
            <button
              onClick={handleSubmit}
              className="w-full mt-8 px-6 py-3 bg-[#27AE60] text-white rounded-lg font-medium hover:bg-[#219652] transition-colors"
            >
              Create Media
            </button>
          </div>
        </div>
      </div>

      <Popup open={showSuccess} closeOnDocumentClick={false} modal>
        <div className="bg-white rounded-xl p-8 text-center">
          <div className="flex justify-center mb-4">
            <img src={success} alt="success" className="w-16 h-16" />
          </div>
          <h2 className="text-xl font-bold mb-6">Your action was successful</h2>
          <button
            onClick={handleClose}
            className="px-8 py-2 bg-[#27AE60] text-white rounded-lg font-medium hover:bg-[#219652] transition-colors"
          >
            Close
          </button>
        </div>
      </Popup>
    </div>
  );
};

export default AddMedia;
