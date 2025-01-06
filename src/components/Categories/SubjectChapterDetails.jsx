import React, { useState } from 'react';
import { FiEdit, FiTrash2, FiMoreVertical } from 'react-icons/fi';
import book from '../../assets/images/book.png';
import { useNavigate } from 'react-router-dom';
import caution from '../../assets/images/caution.png';
import success from '../../assets/images/success.png';



const SubjectChapterDetails = ({ isOpen }) => {
  const navigate = useNavigate();
  const [showAddChapterModal, setShowAddChapterModal] = useState(false);
  const [showAddViewModal, setShowAddViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  const handleAddChapterContinue = () => {
    if (selectedOption === 'unit') {
      navigate('/add-unit-chapter');
    } else if (selectedOption === 'bulk') {
      navigate('/bulk-upload-chapter');
    }
    setShowAddChapterModal(false);
  };

  const handleAddViewContinue = () => {
    if (selectedOption === 'unit') {
      navigate('/add-unit-topic');
    } else if (selectedOption === 'bulk') {
      navigate('/bulk-upload-topic');
    }
    setShowAddViewModal(false);
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

  const ChapterCard = ({ name }) => {
    return (
      <div className="bg-white rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#E9FDEE] rounded-lg">
              <img src={book} alt="chapter" className="w-6 h-6" />
            </div>
            <span className="font-medium text-lg">{name}</span>
          </div>
          <div className="flex gap-4 items-center">
            <button 
              className="text-[#27AE60] hover:text-[#219652] font-medium"
              onClick={() => setShowAddViewModal(true)}
            >
              Add/View
            </button>
            <button className="text-gray-600 hover:text-gray-800">
              <FiEdit size={18} />
            </button>
            <button 
              onClick={() => setShowDeleteModal(true)}
              className="text-red-500 hover:text-red-600"
            >
              <FiTrash2 size={18} />
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""}`}>
        <div className="mb-8">
          <div className="font-normal text-[14px] lg:text-[16px] leading-[20px] text-[#B6B6B6]">
            Home / Subjects / <span className="text-black font-medium">Mathematics</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 mb-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#E9FDEE] rounded-lg">
              <img src={book} alt="subject" className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Mathematics</h1>
              <button className="mt-2 px-6 py-1 rounded-full text-sm font-medium bg-[#27AE60] text-white">
                Published
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <StatCard title="Total Chapters" count="8" />
          <StatCard title="Total Lessons" count="32" />
        </div>

        <div className="flex justify-end mb-6">
          <button 
            onClick={() => setShowAddChapterModal(true)}
            className="px-6 py-2 bg-[#27AE60] text-white rounded-lg font-medium hover:bg-[#219652] transition-colors"
          >
            Add Chapter
          </button>
        </div>

        <div className="bg-white rounded-xl p-6">
          <h2 className="text-xl font-bold mb-6">Chapters</h2>
          <div className="grid grid-cols-1 gap-4">
            <ChapterCard name="Addition" />
            <ChapterCard name="Subtraction" />
            <ChapterCard name="Multiplication" />
          </div>
        </div>
      </div>

      {/* Add Chapter Option Modal */}
      {showAddChapterModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-[400px] p-6">
            <h2 className="text-xl font-bold mb-4">Add Chapter</h2>
            <p className="text-gray-600 mb-4">Select one of the options below</p>
            
            <div className="bg-[#E9FDEE] rounded-xl p-4 space-y-4">
              <div className="flex items-center gap-4">
                <div
                  onClick={() => setSelectedOption('unit')}
                  className={`w-6 h-6 rounded-full cursor-pointer border-2 ${
                    selectedOption === 'unit' ? 'bg-[#27AE60] border-[#27AE60]' : 'border-gray-300'
                  }`}
                />
                <span className="font-medium">Add Unit Chapter</span>
              </div>

              <div className="flex items-center gap-4">
                <div
                  onClick={() => setSelectedOption('bulk')}
                  className={`w-6 h-6 rounded-full cursor-pointer border-2 ${
                    selectedOption === 'bulk' ? 'bg-[#27AE60] border-[#27AE60]' : 'border-gray-300'
                  }`}
                />
                <span className="font-medium">Upload Bulk Chapters</span>
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => setShowAddChapterModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleAddChapterContinue}
                disabled={!selectedOption}
                className="px-6 py-2 bg-[#27AE60] text-white rounded-lg font-medium hover:bg-[#219652] transition-colors disabled:opacity-50"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add/View Option Modal */}
      {showAddViewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-[400px] p-6">
            <h2 className="text-xl font-bold mb-4">Add Lesson</h2>
            <p className="text-gray-600 mb-4">Select one of the options below</p>
            
            <div className="bg-[#E9FDEE] rounded-xl p-4 space-y-4">
              <div className="flex items-center gap-4">
                <div
                  onClick={() => setSelectedOption('unit')}
                  className={`w-6 h-6 rounded-full cursor-pointer border-2 ${
                    selectedOption === 'unit' ? 'bg-[#27AE60] border-[#27AE60]' : 'border-gray-300'
                  }`}
                />
                <span className="font-medium">Add Unit Lesson</span>
              </div>

              <div className="flex items-center gap-4">
                <div
                  onClick={() => setSelectedOption('bulk')}
                  className={`w-6 h-6 rounded-full cursor-pointer border-2 ${
                    selectedOption === 'bulk' ? 'bg-[#27AE60] border-[#27AE60]' : 'border-gray-300'
                  }`}
                />
                <span className="font-medium">Upload Bulk Lessons</span>
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => setShowAddViewModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleAddViewContinue}
                disabled={!selectedOption}
                className="px-6 py-2 bg-[#27AE60] text-white rounded-lg font-medium hover:bg-[#219652] transition-colors disabled:opacity-50"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 text-center">
            <img src={caution} alt="caution" className="w-24 h-24 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-2 text-red-500">CAUTION!</h2>
            <p className="text-xl text-gray-600 mb-6">You're about to delete this chapter</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg font-medium"
              >
                No
              </button>
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setShowSuccessModal(true);
                }}
                className="px-6 py-2 bg-red-500 text-white rounded-lg font-medium"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 text-center">
            <img src={success} alt="success" className="w-24 h-24 mx-auto mb-6" />
            <h3 className="text-2xl font-bold mb-4">Success!</h3>
            <p className="text-gray-600 mb-8">Chapter deleted successfully</p>
            <button 
              onClick={() => setShowSuccessModal(false)}
              className="w-full py-3 bg-[#27AE60] text-white rounded-lg hover:bg-[#219652]"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default SubjectChapterDetails;