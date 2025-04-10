import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Headers from '../common/Headers';
import Headcomponent from '../common/Headcomponent';
import Custombutton from '../common/Custombutton';
import SuccessModal from '../common/SuccessModal';

const TutorialDetails = ({ isOpen }) => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [showCaution, setShowCaution] = useState(false);
  const location = useLocation();
  const tutorialName = location.state?.name || 'Tutorial Name';
  const tutorialStatus = location.state?.status || 'Active';

  const handleApprove = () => {
    setShowSuccess(true);
  };

  const handleReject = () => {
    setShowCaution(true);
  };

  return (
    <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""} transition-all duration-300`}>
      <Headers
        value1="Home"
        value2="JAMB Tutorial"
        value3={tutorialName}
      />

      <div className="mt-6 bg-[#E9FDEE] rounded-xl p-6 mb-6">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
            <span className="text-blue-600 font-medium">
              {tutorialName[0].toUpperCase()}
            </span>
          </div>
          <div className="flex flex-col">
            <h2 className="font-bold text-gray-900">{tutorialName}</h2>
            <Custombutton
              value={tutorialStatus}
              textcolor={tutorialStatus === 'Active' ? 'text-green-600' : 'text-yellow-600'}
              backgroundcolor={tutorialStatus === 'Active' ? 'bg-green-100' : 'bg-yellow-100'}
              extraStyle="mt-2 w-fit rounded-full px-4 py-1"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-center mb-6">
        <Custombutton
          value="Manage"
          textcolor="text-[#27AE60]"
          backgroundcolor="bg-transparent"
          extraStyle="font-medium"
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="border-b border-gray-200 pb-2 mb-4">
          <Headcomponent value="Tutorial Details" showSearch={false} />
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="bg-white rounded-lg p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">Subject Name:</p>
                <p className="font-medium">{tutorialName}</p>
              </div>
              <div>
                <p className="text-gray-600">Tutorial Type:</p>
                <p className="font-medium">JAMB</p>
              </div>
              <div>
                <p className="text-gray-600">Duration:</p>
                <p className="font-medium">2 Hours</p>
              </div>
              <div>
                <p className="text-gray-600">Schedule:</p>
                <p className="font-medium">Mon, Wed, Fri</p>
              </div>
              <div>
                <p className="text-gray-600">Category:</p>
                <p className="font-medium">Science</p>
              </div>
              <div>
                <p className="text-gray-600">Level:</p>
                <p className="font-medium">Intermediate</p>
              </div>
              <div>
                <p className="text-gray-600">Instructor:</p>
                <p className="font-medium">John Doe</p>
              </div>
              <div>
                <p className="text-gray-600">Created Date:</p>
                <p className="font-medium">January 15, 2024</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorialDetails;
