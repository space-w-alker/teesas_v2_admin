import React from 'react';
import { useLocation } from 'react-router-dom';
import Headers from '../common/Headers';
import Headcomponent from '../common/Headcomponent';
import bookopen from '../../assets/images/bookopen.png';
import Screenshot from '../../assets/images/Screenshot.png';
import sharp from '../../assets/images/sharp.png';
import Custombutton from '../common/Custombutton';

const PracticeDetails = ({ isOpen }) => {
  const location = useLocation();
  const topicName = location.state?.name || 'Topic Name';

  return (
    <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""} transition-all duration-300`}>
      <Headers value1="Home" value2="Practice" value3={topicName} />

      <div className="bg-[#E9FDEE] rounded-xl mt-6 p-6 mb-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white rounded-lg">
            <img src={bookopen} alt="book" className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <h2 className="font-bold text-gray-900">{topicName}</h2>
            <Custombutton
          value={
            <div className="flex items-center gap-2">
              <div className="flex">
                <img src={sharp} alt="sharp" className="w-4 h-4" />
              </div>
              <span>Visible</span>
            </div>
          }
          textcolor="text-blue-600"
          backgroundcolor="bg-green-50"
          extraStyle="px-4 py-2 rounded-lg"
        />
          </div>
        </div>
      </div>

      <div className="flex justify-center mb-6">
        <button className="px-8 py-2 text-[#27AE60] font-medium">
          Manage
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <Headcomponent value="Details" showSearch={false} />
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="bg-white rounded-lg p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">Category:</p>
                <p className="font-medium">Mathematics</p>
              </div>
              <div>
                <p className="text-gray-600">Grade:</p>
                <p className="font-medium">Grade 5</p>
              </div>
              <div>
                <p className="text-gray-600">Chapter:</p>
                <p className="font-medium">Chapter 3</p>
              </div>
              <div>
                <p className="text-gray-600">Status:</p>
                <p className="font-medium text-[#27AE60]">Active</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <Headcomponent value="Uploaded Practice" showSearch={false} />
        <div className="space-y-4">
          <div className="p-4 border border-gray-200 rounded-lg">
            <img src={Screenshot} alt="practice screenshot" className="w-full h-[400px] object-cover rounded" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PracticeDetails;
