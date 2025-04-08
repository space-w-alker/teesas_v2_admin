import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createTopicAsync, updateTopicAsync, getTopicWithChapterAsync } from '../../apis/slices/categoriesSlice';
import Headers from '../common/Headers';
import SuccessModal from '../common/SuccessModal';

const AddTopic = ({ isOpen }) => {
  const { id } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [topicName, setTopicName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  
  const { data } = useSelector(state => state.categories.topics);
  const topicDetail = useSelector(state => state.categories.topicDetail);

  // Get topicId from URL query parameters
  const searchParams = new URLSearchParams(location.search);
  const topicId = searchParams.get('topicId');
  const isEdit = Boolean(topicId);

  console.log("Component mounted. URL:", location.pathname + location.search);
  console.log("Parsed parameters - isEdit:", isEdit, "topicId:", topicId, "chapterId:", id);

  // Fetch topic details when in edit mode
  useEffect(() => {
    console.log("useEffect for fetching topic details. isEdit:", isEdit, "topicId:", topicId);
    
    if (isEdit && topicId) {
      console.log("Conditions met, will fetch topic details for topicId:", topicId);
      setLoading(true);
      
      dispatch(getTopicWithChapterAsync(topicId))
        .then(response => {
          console.log("API call completed successfully:", response);
          setLoading(false);
        })
        .catch(error => {
          console.error("API call failed:", error);
          setLoading(false);
          setError("Failed to load topic details. Please try again.");
        });
    }
  }, [isEdit, topicId, dispatch]);

  // Update form when topic details are loaded
  useEffect(() => {
    console.log("useEffect for updating form. topicDetail:", topicDetail);
    
    if (isEdit && topicDetail.data) {
      // Adjust this based on the actual structure of the response from the new endpoint
      console.log("Setting topic name from API data:", topicDetail.data.lesson?.name);
      setTopicName(topicDetail.data.lesson?.name || '');
    }
  }, [isEdit, topicDetail.data]);

  const validateForm = () => {
    if (!topicName.trim()) {
      setError('Topic name is required');
      return false;
    } else if (topicName.length < 3) {
      setError('Topic name must be at least 3 characters long');
      return false;
    } else if (topicName.length > 30) {
      setError('Topic name must not exceed 30 characters');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }
    
    setError('');
    const data = {
      name: topicName
    };
  
    console.log('Sending data:', data);
  
    let success;
    if (isEdit) {
      success = await dispatch(updateTopicAsync(topicId, data));
      if (success) {
        setSuccessMessage('Topic updated successfully');
        setShowSuccessModal(true);
      } else {
        setError('Failed to update topic. Please try again.');
      }
    } else {
      success = await dispatch(createTopicAsync(id, data));
      if (success) {
        setSuccessMessage('Topic created successfully');
        setShowSuccessModal(true);
      } else {
        setError('Failed to create topic. Please try again.');
      }
    }
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    // Navigate back to the topics list page
    navigate(`/chapters/${id}/topics`);
  };

  if (loading) {
    return (
      <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""}`}>
        <div className="flex justify-center items-center h-64">
          <p className="text-xl">Loading topic details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""}`}>
      <div className="mb-8">
        <Headers 
          value1="Topics" 
          value2={isEdit ? 'Edit Topic' : 'Add Topic'}
        />
      </div>

      <div className="flex gap-6">
        <div className="flex-[2] bg-white rounded-xl p-6">
          <h2 className="text-2xl font-bold mb-6">{isEdit ? 'Edit Topic' : 'Add Topic'}</h2>
          
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          )}
          
          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Chapter Name</label>
              <input
                type="text"
                value={isEdit ? (topicDetail.data?.chapter?.name || '') : (data?.chapter?.name || '')}
                disabled
                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Topic Name</label>
              <input
                type="text"
                value={topicName}
                onChange={(e) => setTopicName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#27AE60]"
                placeholder="Enter topic name"
              />
            </div>
          </div>

          <button 
            onClick={handleSubmit}
            className="w-full py-3 bg-[#27AE60] text-white rounded-lg font-medium hover:bg-[#219652] mt-6"
            disabled={!topicName.trim()}
          >
            {isEdit ? 'Update Topic' : 'Create Topic'}
          </button>
        </div>

        <div className="flex-1 bg-white rounded-xl p-6 h-fit">
          <h3 className="text-xl font-bold mb-6">Summary</h3>

          <div className="space-y-4">
            <div>
              <p className="text-gray-600 mb-1">Chapter Name</p>
              <p className="font-medium">{isEdit ? (topicDetail.data?.chapter?.name || 'Not specified') : (data?.chapter?.name || 'Not specified')}</p>
            </div>

            <div>
              <p className="text-gray-600 mb-1">Topic Name</p>
              <p className="font-medium">{topicName || 'Not specified'}</p>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full py-3 bg-[#27AE60] text-white rounded-lg font-medium hover:bg-[#219652] mt-6"
              disabled={!topicName.trim()}
            >
              {isEdit ? 'Update Topic' : 'Create Topic'}
            </button>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={handleSuccessModalClose}
        type="success"
        title="Success"
        message={successMessage}
        buttonText="Continue"
      />
    </div>
  );
};

export default AddTopic;

