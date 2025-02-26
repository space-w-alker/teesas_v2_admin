import React from 'react';
import { useLocation } from 'react-router-dom';
import bookopen from '../../assets/images/bookopen.png';
import Screenshot from '../../../src/assets/images/Screenshot.png';
const TestDetails = ({ isOpen }) => {
  const location = useLocation();
  const topicName = location.state?.name || 'Topic Name';
  const topic = location.state?.topic || {};
  console.log(topic);

  return (
    <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""} transition-all duration-300`}>

      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-400">Home</span>
          <span className="text-gray-400">/</span>
          <span className="text-gray-400">Test</span>
          <span className="text-gray-400">/</span>
          <span className="text-gray-900 font-medium">{topicName}</span>
        </div>
      </div>


      <div className="bg-[#E9FDEE] rounded-xl p-6 mb-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white rounded-lg">
            <img src={bookopen} alt="book" className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <h2 className=" font-bold text-gray-900">{topicName}</h2>
            <button className="mt-2 px-4 py-1 bg-[#E9FDEE] text-[#27AE60] rounded-lg w-fit">
              Visible
            </button>
          </div>
        </div>
      </div>


      <div className="flex justify-center mb-6">
        <button className="px-8 py-2 text-[#27AE60] font-medium">
          Manage
        </button>
      </div>


      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="border-b border-gray-200 pb-2 mb-4">
          <h3 className="text-lg font-bold text-gray-900">Details</h3>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="bg-white rounded-lg p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">Category:</p>
                <p className="font-medium">{topic?.lesson?.chapters?.subjects?.classes?.course.name}</p>
              </div>
              <div>
                <p className="text-gray-600">Grade:</p>
                <p className="font-medium">{topic?.lesson?.chapters?.subjects?.classes?.name}</p>
              </div>
              <div>
                <p className="text-gray-600">Chapter:</p>
                <p className="font-medium">{topic?.lesson?.chapters?.name}</p>
              </div>
              <div>
                <p className="text-gray-600">Status:</p>
                <p className="font-medium text-[#27AE60]">{topic?.active ? "Active" : "In-Active"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="border-b border-gray-200 pb-2 mb-4">
          <h3 className="text-lg font-bold text-gray-900">Uploaded Tests</h3>
        </div>
        <div className="space-y-4">
          <div className="p-4 border border-gray-200 rounded-lg">
            <img src={topic?.thumbnail ? topic?.thumbnail : Screenshot} alt="test screenshot" className="w-full h-[400px] object-cover rounded" />
          </div>
        </div>
      </div>    </div>
  );
};

export default TestDetails;
