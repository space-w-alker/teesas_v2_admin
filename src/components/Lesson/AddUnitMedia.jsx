import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import Headers from '../common/Headers';
import Headcomponent from '../common/Headcomponent';
import success from '../../assets/images/success.png';
import book from '../../assets/images/book.png';
import SuccessModal from '../common/SuccessModal';

const AddUnitMedia = ({ isOpen }) => {
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
      <Headers value1="Home" value2="Add Media" />

    

      <div className=" mt-6 flex gap-6">
        <div className="flex-[2] bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-4 mb-6">
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
                <label className="block  text-gray-700 text-sm font-medium mb-2">
                  Upload Lesson Video
                </label>
                <div className="border-2 bg-green-50 border-dashed border-gray-300 rounded-lg p-8">
                  <div className="text-center">
                    <input
                      type="file"
                      accept="video/*"
                      onChange={handleVideoUpload}
                      className="hidden"
                      id="video-upload"
                      required
                    />
                    <label
                      htmlFor="video-upload"
                      className="cursor-pointer inline-flex items-center px-4 py-2 bg-[#E9FDEE] text-[#27AE60] rounded-lg"
                    >
                      Choose Video
                    </label>
                    <p className="mt-2 text-sm text-gray-500">
                      Supported formats: MP4, WebM, MKV
                    </p>
                    <p className="text-sm text-gray-500">
                      Maximum file size: 500MB
                    </p>
                    {formData.video && (
                      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                        <p className="font-medium">Selected file:</p>
                        <p className="text-sm text-gray-600">{formData.video.name}</p>
                      </div>
                    )}
                  </div>
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

    
      <SuccessModal
        isOpen={showSuccess}
        onClose={handleClose}
        type="success"
        title="Your action was successful"
        message="Media has been added successfully"
        buttonText="Close"
      />
    </div>
   
  );
};

export default AddUnitMedia;