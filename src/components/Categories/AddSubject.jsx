import React, { useState } from 'react';
import { FiUpload } from 'react-icons/fi';

const AddSubject = ({ isOpen }) => {
  const [subjectName, setSubjectName] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  const colors = [
    { label: 'Green', value: '#27AE60' },
    { label: 'Blue', value: '#2D9CDB' },
    { label: 'Purple', value: '#9B51E0' },
    { label: 'Orange', value: '#F2994A' }
  ];

  return (
    <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""}`}>
      <div className="mb-8">
        <div className="font-normal text-[14px] lg:text-[16px] leading-[20px] text-[#B6B6B6]">
          Home / Categories / Primary 1 / <span className="text-black font-medium">Add Subject</span>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Left Section */}
        <div className="flex-[2] bg-white rounded-xl p-6">
          <h2 className="text-2xl font-bold mb-6">Add Subject</h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Subject Name</label>
              <input
                type="text"
                value={subjectName}
                onChange={(e) => setSubjectName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#27AE60]"
                placeholder="Enter subject name"
              />
            </div>

            <div className="flex gap-6">
              <div className="flex-1">
                <label className="block text-gray-700 font-medium mb-2">Upload Subject Image</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <FiUpload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                  <p className="text-gray-600 text-sm mb-2">Drag and drop your image here</p>
                  <button className="px-4 py-1.5 bg-[#27AE60] text-white rounded-lg text-sm font-medium hover:bg-[#219652]">
                    Browse Files
                  </button>
                </div>
              </div>

              <div className="flex-1">
                <label className="block text-gray-700 font-medium mb-2">Select Preferred Color</label>
                <select
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#27AE60]"
                >
                  <option value="">Select color</option>
                  {colors.map((color) => (
                    <option key={color.value} value={color.value}>
                      {color.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
        {/* Right Section */}
        <div className="flex-1 bg-white rounded-xl p-6 h-fit">
          <h3 className="text-xl font-bold mb-6">Summary</h3>
          
          <div className="space-y-4">
            <div>
              <p className="text-gray-600 mb-1">Subject Name</p>
              <p className="font-medium">{subjectName || 'Not specified'}</p>
            </div>

            {selectedColor && (
              <div>
                <p className="text-gray-600 mb-1">Selected Color</p>
                <div className="flex items-center gap-2">
                  <div 
                    className="w-6 h-6 rounded-full" 
                    style={{ backgroundColor: selectedColor }}
                  />
                  <span>{colors.find(c => c.value === selectedColor)?.label}</span>
                </div>
              </div>
            )}

            <button className="w-full py-3 bg-[#27AE60] text-white rounded-lg font-medium hover:bg-[#219652] mt-6">
              Create Subject
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSubject;
