import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Headers from '../common/Headers';
import Headcomponent from '../common/Headcomponent';
import Custombutton from '../common/Custombutton';
import SuccessModal from '../common/SuccessModal';
import { FaChevronLeft, FaCloudUploadAlt } from "react-icons/fa";

const TestBulkMediaUpload = ({ isOpen }) => {
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
    navigate('/test-topic');
  };

  return (
    <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""}`}>
      <div className='flex justify-start items-center lg:gap-3'>
        <FaChevronLeft onClick={() => navigate(-1)} className="cursor-pointer" />
        <Headers value1="Test" value2="Upload Bulk Media" />
      </div>
      <div className="mt-8 flex gap-8">
        {/* File Upload Box */}
        <div className="flex-1 bg-white rounded-xl p-6">
          <Headcomponent value="Upload Bulk Media" showSearch={false} />
          <div
            className={` bg-green-50 border-2 border-dashed rounded-lg p-8 text-center ${
              dragActive ? 'bg-[#E9FDEE] border-[#27AE60]' : 'border-gray-300'
            }`}
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
            <Custombutton
              value="Download Sample Template"
              onClick={() => window.open('/template.csv')}
              textcolor="text-[#27AE60]"
              backgroundcolor="bg-transparent"
              extraStyle="mt-4 font-medium hover:text-[#219652]"
            />
          </div>
        </div>

        {/* Summary Box */}
        <div className="w-1/3 bg-white rounded-xl p-6">
          <div className="bg-[#E9FDEE] rounded-xl p-6">
            <h3 className="font-bold text-[18px] leading-[24px] text-[#2C2E32] mb-6">Summary</h3>
            <div className="space-y-4">
              <div>
                <p className="text-gray-600 text-sm">File Name</p>
                <p className="font-medium">{file?.name || '-'}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">File Size</p>
                <p className="font-medium">{file?.size ? `${(file.size / 1024).toFixed(2)} KB` : '-'}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">File Type</p>
                <p className="font-medium">{file?.type || '-'}</p>
              </div>
            </div>
            <Custombutton
              value="Upload Media"
              onClick={() => setShowSuccessModal(true)}
              disabled={!file}
              textcolor="text-white"
              backgroundcolor="bg-[#27AE60]"
              extraStyle="w-full mt-6 hover:bg-[#219652] disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>
        </div>
      </div>
      <SuccessModal 
        isOpen={showSuccessModal}
        onClose={handleClose}
        type="success"
        title="Media files uploaded successfully"
        buttonText="Close"
      />
    </div>
  );
};

export default TestBulkMediaUpload;
