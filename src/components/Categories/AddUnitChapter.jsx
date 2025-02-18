import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FiTrash2, FiPlus } from 'react-icons/fi';
import Headers from '../common/Headers';
import { createChapterAsync } from '../../apis/slices/categoriesSlice';

const AddUnitChapter = ({ isOpen }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [chapterName, setChapterName] = useState('');
  const [topics, setTopics] = useState([{ name: '', active: true }]);

  const addTopic = () => {
    setTopics([...topics, { name: '', active: true }]);
  };

  const removeTopic = (index) => {
    const newTopics = topics.filter((_, i) => i !== index);
    setTopics(newTopics);
  };

  const updateTopic = (index, value) => {
    const newTopics = [...topics];
    newTopics[index] = { ...newTopics[index], name: value };
    setTopics(newTopics);
  };

  const handleSubmit = async () => {
    const chapterData = {
      name: chapterName,
      active: true,
      topics: topics.filter(topic => topic.name.trim() !== '')
    };

    const success = await dispatch(createChapterAsync(id, chapterData));
    if (success) {
      navigate(`/subjects/${id}/chapters`);
    }
  };

  return (
    <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""}`}>
      <div className="mb-8">
        <Headers 
          value1="Chapters" 
          value2="Add Chapter" 
        />
      </div>

      <div className="flex gap-6">
        <div className="flex-[2] bg-white rounded-xl p-6">
          <h2 className="text-2xl font-bold mb-6">Add Chapter</h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Chapter Name</label>
              <input
                type="text"
                value={chapterName}
                onChange={(e) => setChapterName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#27AE60]"
                placeholder="Enter chapter name"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Topics</label>
              {topics.map((topic, index) => (
                <div key={index} className="flex gap-4 mb-4">
                  <input
                    type="text"
                    value={topic.name}
                    onChange={(e) => updateTopic(index, e.target.value)}
                    className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#27AE60]"
                    placeholder="Enter topic name"
                  />
                  {topics.length > 1 && (
                    <button 
                      onClick={() => removeTopic(index)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <FiTrash2 size={20} />
                    </button>
                  )}
                </div>
              ))}
              <button 
                onClick={addTopic}
                className="flex items-center gap-2 text-[#27AE60] hover:text-[#219652] font-medium"
              >
                <FiPlus size={20} />
                Add Topic
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 bg-white rounded-xl p-6 h-fit">
          <h3 className="text-xl font-bold mb-6">Summary</h3>
          
          <div className="space-y-4">
            <div>
              <p className="text-gray-600 mb-1">Chapter Name</p>
              <p className="font-medium">{chapterName || 'Not specified'}</p>
            </div>

            <div>
              <p className="text-gray-600 mb-1">Topics</p>
              <p className="font-medium">{topics.filter(t => t.name.trim()).length} Topics</p>
            </div>

            <button 
              onClick={handleSubmit}
              disabled={!chapterName || topics.every(t => !t.name.trim())}
              className="w-full py-3 bg-[#27AE60] text-white rounded-lg font-medium hover:bg-[#219652] mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Create Chapter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUnitChapter;
