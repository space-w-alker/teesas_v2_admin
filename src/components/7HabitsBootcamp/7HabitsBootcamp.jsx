import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Headers from '../common/Headers';
import Headcomponent from '../common/Headcomponent';
import StatCard from '../common/StatCard';
import Custombutton from '../common/Custombutton';
import Modal from '../common/Modal';
import { FaPlus } from 'react-icons/fa';
import sharp from '../../assets/images/sharp.png';
import {  FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const ParticipantItem = ({ name, status }) => {
  const navigate = useNavigate();
  
  return (
    <div 
      className="bg-white rounded-xl p-4 flex items-center justify-between hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => navigate('/registration-details', { 
        state: { 
          name: name,
          status: status 
        }
      })}
    >
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
          {name[0].toUpperCase()}
        </div>
        <div className="flex items-center gap-3">
          <span className="font-medium text-gray-800">{name}</span>
        </div>
      </div>
      <Custombutton
          value={
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        <img src={sharp} alt="sharp" className="w-4 h-4" />
                      </div>
                      <span>Paid</span>
                    </div>
                  }
          textcolor="text-blue-600"
          backgroundcolor="bg-[#E9FDEE]"
          extraStyle="px-4 py-2 rounded-lg"
        />
    </div>
  );
};

const SevenHabitsBootcamp = ({ isOpen }) => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleSingleParticipant = () => {
    navigate('/add-participant');
    setShowModal(false);
  };

  const handleBulkParticipant = () => {
    navigate('/bulk-upload');
    setShowModal(false);
  };

  const participantGroups = [
    {
      date: '2024-01-15',
      participants: [
        { name: 'John Smith', status: 'Paid' },
        { name: 'Sarah Johnson', status: 'Pending' }
      ]
    },
    {
      date: '2024-01-14',
      participants: [
        { name: 'Michael Brown', status: 'Paid' },
        { name: 'Emily Davis', status: 'Paid' }
      ]
    }
  ];

  return (
    <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""} transition-all duration-300`}>
      <Headers value1="Home" value2="7's Habit Bootcamp Registration" />

      <div className=" mt-6 grid grid-cols-2 gap-6 mb-8">
        <StatCard title="Total Registered Users" count="350" color="bg-blue-50" />
        <StatCard title="Total Paid Participants" count="280" color="bg-green-50" />
      </div>

      <div className="flex justify-end gap-4 mb-6">
        <Custombutton
          value="Export"
          onClick={() => {}}
          textcolor="text-[#27AE60]"
          backgroundcolor="bg-white"
          extraStyle="border border-[#27AE60]"
        />
        <Custombutton
          value={
            <div className="flex items-center gap-2">
              <FaPlus className="text-white" />
              <span>Add Participants</span>
            </div>
          }
          onClick={() => setShowModal(true)}
          textcolor="text-white"
          backgroundcolor="bg-[#27AE60]"
          extraStyle="hover:bg-[#219652]"
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b border-gray-100">
          <Headcomponent value="Registration List" showSearch={true} />
        </div>
        
        <div className="p-6">
          <div className="space-y-6">
            {participantGroups.map((group, groupIndex) => (
              <div key={groupIndex}>
                <div className="text-gray-400 text-sm mb-3">{group.date}</div>
                <div className="space-y-4">
                  {group.participants.map((participant, index) => (
                    <ParticipantItem
                      key={index}
                      name={participant.name}
                      status={participant.status}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 border-t border-gray-100 flex justify-between items-center">
          <Custombutton
            value={
              <div className="flex items-center gap-2">
                <FaArrowLeft />
                <span>Previous</span>
              </div>
            }
            backgroundcolor="bg-gray-100"
            textcolor="text-gray-600"
            width="w-[100px]"
            extraStyle="py-2"
          />
          <span className="text-gray-600">Page 1 of 5</span>
          <Custombutton
            value={
              <div className="flex items-center gap-2">
                <span>Next</span>
                <FaArrowRight />
              </div>
            }
            backgroundcolor="bg-gray-100"
            textcolor="text-gray-600"
            width="w-[80px]"
            extraStyle="py-2"
          />
          </div>
      </div>

      {showModal && (
        <Modal
          label="ADD MEDIA"
          closeModal={() => setShowModal(false)}
          value1="Add Single Participant"
          value2="Upload Bulk Participants"
          addSingleButton={handleSingleParticipant}
          addMutipleButton={handleBulkParticipant}
        />
      )}
    </div>
  );
};

export default SevenHabitsBootcamp;
