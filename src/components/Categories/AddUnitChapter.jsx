import React, { useState } from 'react';
import { FiTrash2, FiPlus } from 'react-icons/fi';
import book from '../../assets/images/book.png';

const AddUnitChapter = ({ isOpen }) => {
  const [chapterName, setChapterName] = useState('');
  const [topics, setTopics] = useState(['']);

  const addTopic = () => {
    setTopics([...topics, '']);
  };

  const removeTopic = (index) => {
    const newTopics = topics.filter((_, i) => i !== index);
    setTopics(newTopics);
  };

  const updateTopic = (index, value) => {
    const newTopics = [...topics];
    newTopics[index] = value;
    setTopics(newTopics);
  };

  return (
    <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""}`}>
      <div className="mb-8">
        <div className="font-normal text-[14px] lg:text-[16px] leading-[20px] text-[#B6B6B6]">
          Home / Categories / Primary 1 / Mathematics / Chapters / <span className="text-black font-medium">Add Chapter</span>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Left Section */}
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
              <label className="block text-gray-700 font-medium mb-2">Add Topics</label>
              {topics.map((topic, index) => (
                <div key={index} className="flex gap-4 mb-4">
                  <input
                    type="text"
                    value={topic}
                    onChange={(e) => updateTopic(index, e.target.value)}
                    className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#27AE60]"
                    placeholder="Enter topic name"
                  />
                  <button 
                    onClick={() => removeTopic(index)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <FiTrash2 size={20} />
                  </button>
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

            <button className="w-full py-3 bg-[#27AE60] text-white rounded-lg font-medium hover:bg-[#219652]">
              Add Lesson
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex-1 bg-white rounded-xl p-6 h-fit">
          <h3 className="text-xl font-bold mb-6">Summary</h3>
          
          <div className="space-y-4">
            <div>
              <p className="text-gray-600 mb-1">Chapter Name</p>
              <p className="font-medium">{chapterName || 'Not specified'}</p>
            </div>

            <div>
              <p className="text-gray-600 mb-1">Topics</p>
              <p className="font-medium">{topics.filter(t => t).length} Topics</p>
            </div>

            <button className="w-full py-3 bg-[#27AE60] text-white rounded-lg font-medium hover:bg-[#219652] mt-6">
              Create Chapter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUnitChapter;
