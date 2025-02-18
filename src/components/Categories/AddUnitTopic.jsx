import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { FiUpload } from 'react-icons/fi';
import { uploadTopicMediaAsync } from '../../apis/slices/categoriesSlice';
import success from '../../assets/images/success.png';

const AddUnitTopic = ({ isOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  
  const { isLoading: uploadLoading } = useSelector(state => state.categories.topicMedia);

  const [formData, setFormData] = useState({
    title: '',
    video: null,
    thumbnail: null,
    contentType: 'PAID',
    duration: '00:00'
  });
  const [error, setError] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        thumbnail: file
      }));
    }
  };

  const calculateVideoDuration = (file) => {
    const video = document.createElement('video');
    video.preload = 'metadata';
    
    return new Promise((resolve) => {
      video.onloadedmetadata = () => {
        const minutes = Math.floor(video.duration / 60);
        const seconds = Math.floor(video.duration % 60);
        resolve(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
      };
      video.src = URL.createObjectURL(file);
    });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const duration = await calculateVideoDuration(file);
      setFormData(prev => ({
        ...prev,
        video: file,
        duration
      }));
    }
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.video || !formData.thumbnail) {
      setError('Please fill all required fields');
      return;
    }
  
    const submitData = new FormData();
    submitData.append('title', formData.title);
    submitData.append('video', formData.video);
    submitData.append('thumbnail', formData.thumbnail);
    submitData.append('content_type', formData.contentType);
    submitData.append('duration', formData.duration);
    submitData.append('source_type', 'FILE');
  
    try {
      const success = await dispatch(uploadTopicMediaAsync(id, submitData));
      if (success) {
        setShowSuccessModal(true);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""}`}>
      <div className="mb-8">
        <div className="font-normal text-[14px] lg:text-[16px] leading-[20px] text-[#B6B6B6]">
          Home / Categories / <span className="text-black font-medium">Add Media</span>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          {error}
        </div>
      )}

      <div className="flex gap-6">
        <div className="flex-[2] bg-white rounded-xl p-6">
          <h2 className="text-2xl font-bold mb-6">Add Media</h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Media Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#27AE60]"
                placeholder="Enter media title"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Content Type</label>
              <select
                value={formData.contentType}
                onChange={(e) => setFormData({...formData, contentType: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#27AE60]"
              >
                <option value="PAID">Paid</option>
                <option value="FREE">Free</option>
              </select>
            </div>
            <div>
  <label className="block text-gray-700 font-medium mb-2">Upload Thumbnail</label>
  <div className={`border-2 border-dashed ${formData.thumbnail ? 'border-[#27AE60] bg-[#E9FDEE]' : 'border-gray-300'} rounded-lg p-8`}>
    <div className="text-center">
      {!formData.thumbnail ? (
        <>
          <FiUpload className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600 mb-2">Drag and drop your thumbnail here</p>
          <p className="text-gray-400 text-sm mb-4">Supported formats: JPG, PNG</p>
        </>
      ) : (
        <div className="space-y-2">
          <div className="flex items-center justify-center gap-2">
            <FiUpload className="w-8 h-8 text-[#27AE60]" />
            <span className="font-medium text-[#27AE60]">{formData.thumbnail.name}</span>
          </div>
          <p className="text-sm text-gray-500">Size: {(formData.thumbnail.size / (1024 * 1024)).toFixed(2)} MB</p>
        </div>
      )}
      
      <input
        type="file"
        id="thumbnailUpload"
        className="hidden"
        accept="image/*"
        onChange={handleThumbnailChange}
      />
      <label
        htmlFor="thumbnailUpload"
        className={`mt-4 inline-block px-6 py-2 ${
          formData.thumbnail 
            ? 'bg-white border-2 border-[#27AE60] text-[#27AE60]' 
            : 'bg-[#27AE60] text-white'
        } rounded-lg font-medium hover:opacity-90 cursor-pointer`}
      >
        {formData.thumbnail ? 'Change Thumbnail' : 'Browse Files'}
      </label>
    </div>
  </div>
</div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Upload Video</label>
              <div className={`border-2 border-dashed ${formData.video ? 'border-[#27AE60] bg-[#E9FDEE]' : 'border-gray-300'} rounded-lg p-8`}>
                <div className="text-center">
                  {!formData.video ? (
                    <>
                      <FiUpload className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                      <p className="text-gray-600 mb-2">Drag and drop your video here</p>
                      <p className="text-gray-400 text-sm mb-4">Supported formats: MP4, MOV</p>
                    </>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex items-center justify-center gap-2">
                        <FiUpload className="w-8 h-8 text-[#27AE60]" />
                        <span className="font-medium text-[#27AE60]">{formData.video.name}</span>
                      </div>
                      <p className="text-sm text-gray-500">Duration: {formData.duration}</p>
                      <p className="text-sm text-gray-500">Size: {(formData.video.size / (1024 * 1024)).toFixed(2)} MB</p>
                    </div>
                  )}
                  
                  <input
                    type="file"
                    id="videoUpload"
                    className="hidden"
                    accept="video/*"
                    onChange={handleFileChange}
                  />
                  <label
                    htmlFor="videoUpload"
                    className={`mt-4 inline-block px-6 py-2 ${
                      formData.video 
                        ? 'bg-white border-2 border-[#27AE60] text-[#27AE60]' 
                        : 'bg-[#27AE60] text-white'
                    } rounded-lg font-medium hover:opacity-90 cursor-pointer`}
                  >
                    {formData.video ? 'Change Video' : 'Browse Files'}
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 bg-white rounded-xl p-6 h-fit">
          <h3 className="text-xl font-bold mb-6">Summary</h3>
          
          <div className="space-y-4">
            <div>
              <p className="text-gray-600 mb-1">Title</p>
              <p className="font-medium">{formData.title || 'Not specified'}</p>
            </div>

            <div>
              <p className="text-gray-600 mb-1">Content Type</p>
              <p className="font-medium">{formData.contentType}</p>
            </div>

            <div>
              <p className="text-gray-600 mb-1">Duration</p>
              <p className="font-medium">{formData.duration}</p>
            </div>

            <div>
              <p className="text-gray-600 mb-1">Video</p>
              <p className="font-medium">{formData.video?.name || 'No video selected'}</p>
            </div>

            <button 
              onClick={handleSubmit}
              disabled={uploadLoading}
              className={`w-full py-3 rounded-lg font-medium mt-6 
                ${uploadLoading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-[#27AE60] hover:bg-[#219652] text-white'}`}
            >
              {uploadLoading ? 'Uploading...' : 'Upload Media'}
            </button>
          </div>
        </div>
      </div>

      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 text-center">
            <img src={success} alt="success" className="w-24 h-24 mx-auto mb-6" />
            <h3 className="text-2xl font-bold mb-4">Success!</h3>
            <p className="text-gray-600 mb-8">Media uploaded successfully</p>
            <button 
              onClick={() => {
                setShowSuccessModal(false);
                navigate(-1);
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
