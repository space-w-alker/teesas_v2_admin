import React from 'react';
import Headers from '../common/Headers';
import Headcomponent from '../common/Headcomponent';

const TopicDetails = ({ isOpen }) => {
  return (
    <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""} transition-all duration-300`}>
      {/* Header Navigation */}
      <Headers value1="Home" value2="Topics" value3="Topic Details" />
      
      {/* Title Section */}
      <div className="p-6 bg-white rounded-xl shadow-sm mb-8">
        <Headcomponent value="Topic Details" showSearch={false} />
      </div>

      {/* Details Section */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Topic Information</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600">Topic Name</p>
            <p className="font-medium">Introduction to Algebra</p>
          </div>
          <div>
            <p className="text-gray-600">Created Date</p>
            <p className="font-medium">October 12, 2023</p>
          </div>
        </div>
      </div>

      {/* Uploaded Content Section */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Uploaded Content</h2>
        <div className="space-y-4">
          <div className="border-b pb-4">
            <h3 className="font-medium mb-2">Practice Questions</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              {/* List of practice questions */}
            </div>
          </div>
          <div>
            <h3 className="font-medium mb-2">Media Resources</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              {/* List of media resources */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopicDetails;
