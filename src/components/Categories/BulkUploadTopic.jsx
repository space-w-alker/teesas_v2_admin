import React, { useState } from 'react';
import { FiUpload, FiDownload } from 'react-icons/fi';

const BulkUploadTopic = ({ isOpen }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  return (
    <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""}`}>
      <div className="mb-8">
        <div className="font-normal text-[14px] lg:text-[16px] leading-[20px] text-[#B6B6B6]">
          Home / Categories / Primary 1 / Mathematics / Chapters / Addition / <span className="text-black font-medium">Bulk Upload Topics</span>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Left Section */}
        <div className="flex-[2] bg-white rounded-xl p-6">
          <h2 className="text-2xl font-bold mb-6">Bulk Upload Topics</h2>
          
          <div className="space-y-6">
            <div className="mb-6">
              <button className="flex items-center gap-2 text-[#27AE60] hover:text-[#219652] font-medium">
                <FiDownload size={20} />
                Download Template
              </button>
            </div>

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
              <div className="text-center">
                <FiUpload className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600 mb-2">Drag and drop your file here</p>
                <p className="text-gray-400 text-sm mb-4">Supported formats: .xlsx, .xls</p>
                <input
                  type="file"
                  id="fileUpload"
                  className="hidden"
                  accept=".xlsx,.xls"
                  onChange={(e) => setSelectedFile(e.target.files[0])}
                />
                <label
                  htmlFor="fileUpload"
                  className="px-6 py-2 bg-[#27AE60] text-white rounded-lg font-medium hover:bg-[#219652] cursor-pointer"
                >
                  Browse Files
                </label>
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Upload Video Files</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
                <div className="text-center">
                  <FiUpload className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600 mb-2">Drag and drop your video files here</p>
                  <p className="text-gray-400 text-sm mb-4">Supported formats: MP4, MOV</p>
                  <input
                    type="file"
                    id="videoUpload"
                    className="hidden"
                    accept="video/*"
                    multiple
                  />
                  <label
                    htmlFor="videoUpload"
                    className="px-6 py-2 bg-[#27AE60] text-white rounded-lg font-medium hover:bg-[#219652] cursor-pointer"
                  >
                    Browse Files
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex-1 bg-white rounded-xl p-6 h-fit">
          <h3 className="text-xl font-bold mb-6">Summary</h3>
          
          <div className="space-y-4">
            <div>
              <p className="text-gray-600 mb-1">Selected Template</p>
              <p className="font-medium">{selectedFile?.name || 'No file selected'}</p>
            </div>

            <button 
              className="w-full py-3 bg-[#27AE60] text-white rounded-lg font-medium hover:bg-[#219652] mt-6 disabled:opacity-50"
              disabled={!selectedFile}
            >
              Upload Topics
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkUploadTopic;
