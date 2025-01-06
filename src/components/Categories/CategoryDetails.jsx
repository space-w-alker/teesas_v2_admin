import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import book from '../../assets/images/book.png';
import bookopen from '../../assets/images/bookopen.png';
import caution from '../../assets/images/caution.png';
import success from '../../assets/images/success.png';

const CategoryDetails = ({ isOpen }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedItemToDelete, setSelectedItemToDelete] = useState(null);

  const handleAddClass = () => {
    if (selectedOption === 'unit') {
      navigate('/add-unit-class');
    } else if (selectedOption === 'bulk') {
      navigate('/upload-bulk-class');
    }
    setShowModal(false);
  };

  const handleDelete = () => {
    setShowDeleteModal(false);
    setShowSuccessModal(true);
  };

  const StatCard = ({ title, count }) => (
    <div className="bg-white rounded-xl p-6 flex items-center gap-4 shadow-sm">
      <div className="p-3 bg-[#E9FDEE] rounded-lg">
        <img src={book} alt="icon" className="w-8 h-8" />
      </div>
      <div>
        <p className="text-gray-600 text-sm">{title}</p>
        <p className="font-bold text-2xl mt-1">{count}</p>
      </div>
    </div>
  );

  const ClassItem = ({ name }) => (
    <div className="bg-white rounded-lg p-4 flex items-center justify-between">
      <span className="font-medium">{name}</span>
      <div className="flex items-center gap-4">
        <button 
          onClick={() => navigate('/subjectsdetails')}
          className="text-[#27AE60] hover:text-[#219652] transition-colors"
        >
          View Subjects
        </button>
        <button className="text-gray-600 hover:text-gray-800">
          <FiEdit size={18} />
        </button>
        <button 
          onClick={() => {
            setSelectedItemToDelete(name);
            setShowDeleteModal(true);
          }}
          className="text-red-500 hover:text-red-600"
        >
          <FiTrash2 size={18} />
        </button>
      </div>
    </div>
  );

  return (
    <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""}`}>
      <div className="mb-8">
        <div className="font-normal text-[14px] lg:text-[16px] leading-[20px] text-[#B6B6B6]">
          Home / Categories /<span className="text-black font-medium"> Category Details</span>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 mb-8">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-[#E9FDEE] rounded-lg">
            <img src={bookopen} alt="category" className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Primary Education</h1>
            <button className="mt-2 px-6 py-1 rounded-full text-sm font-medium bg-[#27AE60] text-white">
              Published
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard title="Total Grades" count="6" />
        <StatCard title="Total Chapters" count="24" />
        <StatCard title="Total Subjects" count="8" />
      </div>

      <div className="flex justify-end mb-6">
        <button 
          onClick={() => setShowModal(true)}
          className="px-6 py-2 bg-[#27AE60] text-white rounded-lg font-medium hover:bg-[#219652] transition-colors"
        >
          Add Class
        </button>
      </div>

      <div className="bg-white rounded-xl p-6">
        <h2 className="text-xl font-bold mb-6">Classes</h2>
        <div className="space-y-4">
          <ClassItem name="Primary 1" />
          <ClassItem name="Primary 2" />
          <ClassItem name="Primary 3" />
          <ClassItem name="Primary 4" />
          <ClassItem name="Primary 5" />
          <ClassItem name="Primary 6" />
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-[400px] p-6">
            <h2 className="text-xl font-bold mb-4">Add Class</h2>
            <p className="text-gray-600 mb-4">Select one of the options below</p>
            
            <div className="bg-[#E9FDEE] rounded-xl p-4 space-y-4">
              <div className="flex items-center gap-4">
                <div
                  onClick={() => setSelectedOption('unit')}
                  className={`w-6 h-6 rounded-full cursor-pointer border-2 ${
                    selectedOption === 'unit' ? 'bg-[#27AE60] border-[#27AE60]' : 'border-gray-300'
                  }`}
                />
                <span className="font-medium">Add Unit Class</span>
              </div>
              
              <div className="flex items-center gap-4">
                <div
                  onClick={() => setSelectedOption('bulk')}
                  className={`w-6 h-6 rounded-full cursor-pointer border-2 ${
                    selectedOption === 'bulk' ? 'bg-[#27AE60] border-[#27AE60]' : 'border-gray-300'
                  }`}
                />
                <span className="font-medium">Upload Bulk Class</span>
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleAddClass}
                disabled={!selectedOption}
                className="px-6 py-2 bg-[#27AE60] text-white rounded-lg font-medium hover:bg-[#219652] transition-colors disabled:opacity-50"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 text-center">
            <img src={caution} alt="caution" className="w-24 h-24 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-2 text-red-500">CAUTION!</h2>
            <p className="text-xl text-gray-600 mb-6">You're about to delete this item</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg font-medium"
              >
                No
              </button>
              <button
                onClick={handleDelete}
                className="px-6 py-2 bg-red-500 text-white rounded-lg font-medium"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}

      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 text-center">
            <img src={success} alt="success" className="w-24 h-24 mx-auto mb-6" />
            <h3 className="text-2xl font-bold mb-4">Success!</h3>
            <p className="text-gray-600 mb-8">Item deleted successfully</p>
            <button 
              onClick={() => setShowSuccessModal(false)}
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

export default CategoryDetails;
