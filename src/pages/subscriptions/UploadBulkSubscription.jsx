import React, { useState } from 'react';
import { FaChevronLeft, FaCloudUploadAlt } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const UploadBulkSubscription = ({ isOpen }) => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleClose = () => {
    setShowSuccessModal(false);
  };

  return (
    <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""}`}>
      <div className='flex justify-start items-center lg:gap-3'>
        <FaChevronLeft onClick={() => navigate(-1)} className="cursor-pointer" />
        <div>
          <div className='font-normal text-[14px] lg:text-[16px] leading-[20px] text-[#B6B6B6]'>
            Subscribed Users /<span className='text-black font-medium'> Add Multiple Subscription</span>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-white rounded-xl p-6 flex">
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-6">Add Multiple  Subscription</h2>
          
          <div 
            className="border-2 border-dashed rounded-lg p-8 text-center bg-[#E9FDEE] border-[#27AE60]"
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <FaCloudUploadAlt className="mx-auto text-5xl text-gray-400 mb-4" />
            <p className="text-gray-600 mb-4">
              Drag and drop your file here, or
              <label className="text-[#27AE60] cursor-pointer ml-1">
                browse
                <input
                  type="file"
                  className="hidden"
                  accept=".csv,.xlsx,.xls"
                  onChange={handleChange}
                />
              </label>
            </p>
            <p className="text-sm text-gray-500">Supported formats: CSV, Excel</p>
            {file && (
              <div className="mt-4 text-left bg-gray-50 p-4 rounded-lg">
                <p className="font-medium">Selected file:</p>
                <p className="text-gray-600">{file.name}</p>
              </div>
            )}
            <button 
              onClick={() => window.open('/template.csv')}
              className="mt-4 text-[#27AE60] font-medium"
            >
              Download Sample File
            </button>
          </div>
        </div>

        <div className="ml-8 w-1/3 bg-[#E9FDEE] rounded-xl p-6">
          <h3 className="font-bold text-[18px] leading-[24px] text-[#2C2E32] mb-6">Summary</h3>
          <div className="space-y-4">
            <div>
              <p className="text-gray-600 text-sm">User Name</p>
              <p className="font-medium">Esther Obianuju</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Category</p>
              <p className="font-medium">-</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Class</p>
              <p className="font-medium">-</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Duration</p>
              <p className="font-medium">-</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Start Date</p>
              <p className="font-medium">-</p>
            </div>
          </div>
          <button 
            onClick={() => setShowSuccessModal(true)}
            className="w-full py-3 rounded-lg text-white bg-[#27AE60] hover:bg-[#219652] mt-6"
          >
            Add Subscription
          </button>
        </div>
      </div>

      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 w-[400px] text-center">
            <div className="w-24 h-24 rounded-full bg-[#27AE60] flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-4">Success!</h3>
            <p className="text-gray-600 mb-8">Your action is successful</p>
            <button 
              onClick={handleClose}
              className="w-full py-3 bg-[#27AE60] text-white rounded-lg hover:bg-[#219652]"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadBulkSubscription;