import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Headers from '../common/Headers';
import Headcomponent from '../common/Headcomponent';
import Custombutton from '../common/Custombutton';
import SuccessModal from '../common/SuccessModal';
import { FaCloudUploadAlt } from "react-icons/fa";

const AddBulk7HabitBootcamp = ({ isOpen }) => {
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    files: null
  });
  const [dragActive, setDragActive] = useState(false);

  const handleFileUpload = (e) => {
    setFormData({...formData, files: e.target.files});
  };

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
    if (e.dataTransfer.files) {
      setFormData({...formData, files: e.dataTransfer.files});
    }
  };

  const handleSubmit = () => {
    setShowSuccess(true);
  };

  return (
    <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""} transition-all duration-300`}>
      <Headers value1="Home" value2="Add Bulk 7 Habits Bootcamp Participants" />

      <div className=" mt-6 flex gap-6">
        <div className="flex-[2] bg-white rounded-xl shadow-sm p-6">
          <Headcomponent value="Upload Multiple Bootcamp Participants" showSearch={false} />
          <div
            className={`bg-green-50 border-2 border-dashed rounded-lg p-8 text-center ${
              dragActive ? 'bg-[#E9FDEE] border-[#27AE60]' : 'border-gray-300'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <FaCloudUploadAlt className="mx-auto text-5xl text-gray-400 mb-4" />
            <p className="text-gray-600 mb-4">
              Drag and drop your Excel file here, or
              <label className="text-[#27AE60] cursor-pointer ml-1">
                browse
                <input
                  type="file"
                  className="hidden"
                  accept=".xlsx, .xls, .csv"
                  onChange={handleFileUpload}
                  required
                />
              </label>
            </p>
            <p className="text-sm text-gray-500 mb-2">Supported formats: XLSX, XLS, CSV</p>
            <p className="text-sm text-gray-500">Maximum file size: 5MB</p>
            <Custombutton
              value="Download Template"
              onClick={() => {}}
              textcolor="text-[#27AE60]"
              extraStyle="mt-4 border border-[#27AE60]"
            />
            {formData.files && (
              <div className="mt-4 text-left bg-gray-50 p-4 rounded-lg">
                <p className="font-medium">Selected file:</p>
                <ul className="list-disc list-inside text-gray-600">
                  {Array.from(formData.files).map((file, index) => (
                    <li key={index}>{file.name}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

        </div>

        <div className="flex-1">
          <div className="bg-white rounded-xl p-8 shadow-sm h-full">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Summary</h2>
            <div className="bg-[#E9FDEE] rounded-lg p-6">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">File Status:</span>
                  <span className="font-medium">
                    {formData.files ? `${formData.files.length} file selected` : 'No file selected'}
                  </span>
                </div>
              </div>
            </div>
            <Custombutton
              value="Upload Participants"
              onClick={handleSubmit}
              textcolor="text-white"
              backgroundcolor="bg-[#27AE60]"
              extraStyle="w-full mt-8 hover:bg-[#219652]"
            />
          </div>
        </div>
      </div>

      <SuccessModal
        isOpen={showSuccess}
        onClose={() => {
          setShowSuccess(false);
          navigate('/7habitsbootcamp');
        }}
        type="success"
        title="Participants Uploaded Successfully"
        message="Your bootcamp participants list has been uploaded successfully"
        buttonText="Close"
      />
    </div>
  );
};

export default AddBulk7HabitBootcamp;
