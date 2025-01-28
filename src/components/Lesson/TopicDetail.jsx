import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Headers from '../common/Headers';
import Custombutton from '../common/Custombutton';
import SuccessModal from '../common/SuccessModal';
import bookopen from '../../assets/images/bookopen.png';

const VideoItem = ({ title, duration, thumbnail }) => (
  <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
    <div className="flex items-center gap-4">
      <div className="w-24 h-16 bg-gray-200 rounded-lg overflow-hidden">
        <img src={thumbnail} alt={title} className="w-full h-full object-cover" />
      </div>
      <div>
        <h4 className="font-medium text-gray-900">{title}</h4>
        <p className="text-sm text-gray-500">{duration}</p>
      </div>
    </div>
  </div>
);

const TopicDetails = ({ isOpen }) => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showCautionModal, setShowCautionModal] = useState(false);
  const location = useLocation();
  const { topic } = location.state || {};

  const topicData = {
    name: topic?.name || 'Topic 1: Basic Properties',
    status: topic?.status || 'Active',
    type: 'Mathematics',
    totalVideos: '4',
    totalDuration: '1h 20m',
    lastUpdated: 'January 20, 2024',
    description: 'This topic covers the fundamental properties of mathematics and includes practice exercises for better understanding.',
    author: 'John Smith'
  };

  const videos = [
    { title: "Introduction to Properties", duration: "15:30" },
    { title: "Basic Concepts Part 1", duration: "20:45" },
    { title: "Basic Concepts Part 2", duration: "18:20" },
    { title: "Practice Problems", duration: "25:10" }
  ];

  return (
    <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""}`}>
      <Headers value1="Home" value2="Topic Details" />

      {/* Topic Header */}
      <div className="bg-[#E9FDEE] rounded-xl p-6 mt-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#FFFFFF] flex items-center justify-center">
            <img src={bookopen} alt="book" className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">{topicData.name}</h2>
            <p className="text-sm text-gray-500">{topicData.type}</p>
            <Custombutton
              value={topicData.status}
              hidden="hidden"
              backgroundcolor={topicData.status === 'Active' ? 'bg-[#27AE60]' : 'bg-red-500'}
              textcolor="text-white"
              imagePosition="center"
              width="w-[80px]"
            />
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="flex justify-center mb-8">
        <Custombutton
          value="View Content"
          hidden="hidden"
          backgroundcolor="bg-[#F2F2F2]"
          textcolor="text-[#27AE60]"
          imagePosition="center"
        />
      </div>

      {/* Topic Details */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="border-b border-gray-200 pb-2 mb-4">
          <h3 className="text-lg font-bold text-gray-900">Topic Details</h3>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="bg-white rounded-lg p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">Total Videos:</p>
                <p className="font-medium">{topicData.totalVideos}</p>
              </div>
              <div>
                <p className="text-gray-600">Total Duration:</p>
                <p className="font-medium">{topicData.totalDuration}</p>
              </div>
              <div>
                <p className="text-gray-600">Last Updated:</p>
                <p className="font-medium">{topicData.lastUpdated}</p>
              </div>
              <div>
                <p className="text-gray-600">Author:</p>
                <p className="font-medium">{topicData.author}</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-gray-600">Description:</p>
              <p className="font-medium mt-2">{topicData.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Uploaded Videos */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="border-b border-gray-200 pb-2 mb-4">
          <h3 className="text-lg font-bold text-gray-900">Uploaded Videos</h3>
        </div>
        <div className="space-y-4">
          {videos.map((video, index) => (
            <VideoItem 
              key={index}
              title={video.title}
              duration={video.duration}
              thumbnail={bookopen}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopicDetails;