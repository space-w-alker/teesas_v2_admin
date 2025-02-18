import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaVideo } from 'react-icons/fa';
import Headers from '../common/Headers';
import Headcomponent from '../common/Headcomponent';
import Custombutton from '../common/Custombutton';
import { getTopicDetailAsync , deleteTopicMediaAsync } from '../../apis/slices/categoriesSlice';
import { config } from '../../apis/client/config';


const TopicDetail = ({ isOpen }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data } = useSelector(state => state.categories.topicDetail);
  console.log('Component Data:', data); // Add this to verify the data
  const mediaData = data?.[0];

  useEffect(() => {
    dispatch(getTopicDetailAsync(id));
  }, [dispatch, id]);

  const lessonData = mediaData?.lesson;

  const handleDeleteMedia = async () => {
    const success = await dispatch(deleteTopicMediaAsync(id, mediaData.id));
    if (success) {
      // Refresh the topic details
      dispatch(getTopicDetailAsync(id));
    }
  };

  return (
    <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""}`}>
      <Headers 
        value1="Home" 
        value2="Topics" 
        value3={lessonData?.name} 
      />

      <div className="mt-6 bg-[#E9FDEE] rounded-xl p-6 mb-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white rounded-lg">
            <FaVideo className="w-5 h-5 text-[#27AE60]" />
          </div>
          <div className="flex flex-col">
            <h2 className="font-bold text-gray-900">{lessonData?.name}</h2>
            <Custombutton
              value={mediaData?.active ? "Active" : "Inactive"}
              textcolor="text-[#27AE60]"
              backgroundcolor="bg-[#E9FDEE]"
              extraStyle="mt-2 w-fit"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="border-b border-gray-200 pb-2 mb-4">
          <Headcomponent value="Details" showSearch={false} />
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="bg-white rounded-lg p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">Chapter:</p>
                <p className="font-medium">{lessonData?.chapters?.name}</p>
              </div>
              <div>
                <p className="text-gray-600">Subject:</p>
                <p className="font-medium">{lessonData?.chapters?.subjects?.name}</p>
              </div>
              <div>
                <p className="text-gray-600">Class:</p>
                <p className="font-medium">{lessonData?.chapters?.subjects?.classes?.name}</p>
              </div>
              <div>
                <p className="text-gray-600">Course:</p>
                <p className="font-medium">{lessonData?.chapters?.subjects?.classes?.course?.name}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="border-b border-gray-200 pb-2 mb-4">
          <Headcomponent value="Lesson Content" showSearch={false} />
        </div>
        <div className="space-y-4">
          {mediaData && (
            <div className="p-4 border border-gray-200 rounded-lg">
            <img 
  src={`${config.MainUrl}public/${mediaData.thumbnail}`}
  alt={mediaData.title}
  className="w-full h-[400px] object-cover rounded"
/>


              <div className="mt-4 space-y-2">
                <p className="font-medium">{mediaData.title}</p>
                <p className="text-sm text-gray-500">Duration: {mediaData.duration}</p>
                <p className="text-sm text-gray-500">Type: {mediaData.content_type}</p>
                <p className="text-sm text-gray-500">Created: {new Date(mediaData.created_at).toLocaleDateString()}</p>

                <div className="flex justify-end mt-4">
  <button
    onClick={handleDeleteMedia}
    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
  >
    Delete Media
  </button>
</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopicDetail;
