import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Headers from '../common/Headers';
import Headcomponent from '../common/Headcomponent';
import StatCard from '../common/StatCard';
import Custombutton from '../common/Custombutton';
import Modal from '../common/Modal';
import bookopen from '../../assets/images/bookopen.png';
import sharp from '../../assets/images/sharp.png';
import { FaPlus, FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const JobItem = ({ name }) => {
  const navigate = useNavigate();
  return (
    <div className="mt-6 bg-white rounded-xl p-4 flex items-center justify-between hover:shadow-md transition-shadow">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-gray-50 rounded-lg">
          <img src={bookopen} alt="job" className="w-6 h-6" />
        </div>
        <div className="flex flex-col">
          <span className="font-medium text-gray-800">{name}</span>
          <Custombutton 
  value={
    <div className="flex items-center gap-2">
      <img src={sharp} alt="sharp" className="w-4 h-4" />
      <span>Visible</span>
    </div>
  }
  backgroundcolor="bg-green-100"
  textcolor="text-blue-400"
  width="w-[100px]"
/>

        </div>
      </div>
      <div className="flex gap-4 items-center">
        <Custombutton 
          value="View"
          onClick={() => navigate('/job-details', { 
            state: { 
              jobTitle: name,
              status: 'Published' 
            }
          })}
          
        />
        <Custombutton 
          value="Edit"
          
        />
        <Custombutton 
          value="Delete"
          textcolor="text-red-600"
        />
      </div>
    </div>
  );
};

const JobOpenings = ({ isOpen }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const jobs = [
    'Software Engineer',
    'Product Manager',
    'UI/UX Designer',
    'Marketing Manager'
  ];

  return (
    <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""} transition-all duration-300`}>
      <Headers value1="Home" value2="Job Openings" />

      <div className="mt-6 bg-white rounded-xl shadow-sm p-6 mb-8">
        <StatCard title="Total Job Openings" count="25" />
      </div>

      <div className="flex justify-end mb-6">
        <Custombutton

          value={
            <div className="flex items-center gap-2">
             
              <FaPlus />
              <span>Add Job Opening</span>
            </div>
          }
          onClick={() => setShowModal(true)}
          textcolor="text-white"
          backgroundcolor="bg-[#27AE60]"
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b border-gray-100">
          <Headcomponent value="Job Opening List" showSearch={true} />
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {jobs.map((job, index) => (
              <JobItem key={index} name={job} />
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
          label="Add Job Opening"
          closeModal={() => setShowModal(false)}
          value1="Add Single Job Opening"
          value2="Upload Bulk Job Openings"
          addSingleButton={() => {
            navigate('/add-unit-job');
            setShowModal(false);
          }}
          addMutipleButton={() => {
            navigate('/add-bulk-jobs');
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
};

export default JobOpenings;
