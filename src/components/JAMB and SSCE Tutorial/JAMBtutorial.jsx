import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import book from '../../assets/images/book.png';
import sharp from '../../assets/images/sharp.png';
import Headers from '../common/Headers';
import Headcomponent from '../common/Headcomponent';
import Custombutton from '../common/Custombutton';
import StatCard from '../common/StatCard';
import Modal from '../common/Modal';

const JAMBtutorial = ({ isOpen }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const navigate = useNavigate();

  const handleAddTutorial = (value) => {
    if (value === 'unit') {
      navigate('/add-single-participant');
    } else if (value === 'bulk') {
      navigate('/add-bulk-participant');
    }
  };

  const tutorialGroups = [
    {
      date: '2024-01-15',
      tutorials: [
        { name: 'Mathematics Tutorial', status: 'Active' },
        { name: 'English Language', status: 'Active' }
      ]
    },
    {
      date: '2024-01-14',
      tutorials: [
        { name: 'Physics Masterclass', status: 'Active' },
        { name: 'Chemistry Review', status: 'Active' }
      ]
    }
  ];

  return (
    <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""} transition-all duration-300`}>
      <Headers value1="Home" value2="JAMB and SSCE Tutorials" />

      <div className="mt-6 grid grid-cols-2 gap-6 mb-8">
        <StatCard title="Total JAMB Tutorials" count="150" color="bg-blue-50" />
        <StatCard title="Total SSCE Tutorials" count="180" color="bg-green-50" />
      </div>

      <div className="flex justify-end gap-4 mb-6">
        <Custombutton
          value="Export"
          textcolor="text-[#27AE60]"
          backgroundcolor="bg-white"
          extraStyle="border border-[#27AE60]"
        />
        <Custombutton
          value={
            <div className="flex items-center gap-2">
              <FaPlus className="text-white" />
              Add Tutorial
            </div>
          }
          onClick={() => setShowModal(true)}
          textcolor="text-white"
          backgroundcolor="bg-[#27AE60]"
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b border-gray-100">
          <Headcomponent value="Tutorial List" />
        </div>
        
        <div className="p-6">
          <div className="space-y-6">
            {tutorialGroups.map((group, groupIndex) => (
              <div key={groupIndex}>
                <div className="text-gray-400 text-sm mb-3">{group.date}</div>
                <div className="space-y-4">
                  {group.tutorials.map((tutorial, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-xl p-4 flex items-center justify-between hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => navigate('/tutorial-details', {
                        state: {
                          name: tutorial.name,
                          status: tutorial.status
                        }
                      })}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                          {tutorial.name[0].toUpperCase()}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-medium text-gray-800">{tutorial.name}</span>
                          <span className="text-sm text-gray-500">{tutorial.type}</span>
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
      value1="Add Single Participant"
      value2="Upload Bulk Participants"
      closeModal={() => setShowModal(false)}
      onClick={handleAddTutorial}
      addSingleButton={() => handleAddTutorial('unit')}
      addMutipleButton={() => handleAddTutorial('bulk')}
    />
  )}


    </div>
  );
};

export default JAMBtutorial;
