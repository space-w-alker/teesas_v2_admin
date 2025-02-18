import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createTopicAsync, updateTopicAsync , getTopicDetailAsync} from '../../apis/slices/categoriesSlice';

const AddTopic = ({ isOpen }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [topicName, setTopicName] = useState('');
  const { data } = useSelector(state => state.categories.topics);
  
  const searchParams = new URLSearchParams(window.location.search);
  const topicId = searchParams.get('topicId');
  const isEdit = Boolean(topicId);

  useEffect(() => {
    if (isEdit && data?.lessons) {
      const topic = data.lessons.find(t => t.id === parseInt(topicId));
      if (topic) {
        setTopicName(topic.name);
      }
    }
  }, [isEdit, data, topicId]);

  const handleSubmit = async () => {
    // First check if topic already has a video
    const topicDetails = await dispatch(getTopicDetailAsync(id));
    if (topicDetails?.data?.length > 0) {
      setError('This topic already has a video. Only one video per topic is allowed.');
      return;
    }
    
    const data = {
      name: topicName
    };
  
    console.log('Sending data:', data); // Log the data being sent
  
    const response = isEdit 
      ? await dispatch(updateTopicAsync(topicId, data))
      : await dispatch(createTopicAsync(id, data));
  
    if (response) {
      navigate(`/chapters/${id}/topics`);
    }
  };
  
  
  

  return (
    <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""}`}>
      <div className="mb-8">
        <div className="font-normal text-[14px] lg:text-[16px] leading-[20px] text-[#B6B6B6]">
          Home / Categories / Topics / <span className="text-black font-medium">
            {isEdit ? 'Edit Topic' : 'Add Topic'}
          </span>
        </div>
      </div>

      <div className="flex gap-6">
        <div className="flex-[2] bg-white rounded-xl p-6">
          <h2 className="text-2xl font-bold mb-6">{isEdit ? 'Edit Topic' : 'Add Topic'}</h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Chapter Name</label>
              <input
                type="text"
                value={data?.chapter?.name || ''}
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
          >
            {isEdit ? 'Update Topic' : 'Create Topic'}
          </button>
        </div>

        <div className="flex-1 bg-white rounded-xl p-6 h-fit">
          <h3 className="text-xl font-bold mb-6">Summary</h3>
          
          <div className="space-y-4">
            <div>
              <p className="text-gray-600 mb-1">Chapter Name</p>
              <p className="font-medium">{data?.chapter?.name || 'Not specified'}</p>
            </div>

            <div>
              <p className="text-gray-600 mb-1">Topic Name</p>
              <p className="font-medium">{topicName || 'Not specified'}</p>
            </div>

            <button 
              onClick={handleSubmit}
              className="w-full py-3 bg-[#27AE60] text-white rounded-lg font-medium hover:bg-[#219652] mt-6"
            >
              {isEdit ? 'Update Topic' : 'Create Topic'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTopic;
