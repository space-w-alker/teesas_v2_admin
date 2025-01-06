import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import book from '../../assets/images/book.png';
import bookopen from '../../assets/images/bookopen.png';
import caution from '../../assets/images/caution.png';
import success from '../../assets/images/success.png';
import { FiMoreVertical } from 'react-icons/fi';
import { useCallback } from 'react';


const SubjectDetails = ({ isOpen }) => {
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pin, setPin] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);

  const handleAddSubject = useCallback(() => {
    setIsModalOpen(true);
  }, []);

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
const SubjectCard = ({ name, chapters, lessons }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleDelete = () => {
    setShowDropdown(false);
    setShowDeleteModal(true);
  };

  return (
    <>
      <div className="bg-[#F9F9F9] rounded-xl p-6 relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gray-50 rounded-lg">
              <img src={bookopen} alt="subject" className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">{name}</h3>
            </div>
          </div>
          <div className="relative">
            <FiMoreVertical
              className="text-gray-400 cursor-pointer"
              onClick={() => setShowDropdown(!showDropdown)}
            />
            {showDropdown && (
              <div className="absolute right-0 top-8 bg-white rounded-lg shadow-lg py-2 z-10">
                <button
                  className="w-full px-4 py-2 text-left hover:bg-gray-50"
                  onClick={() => navigate(`/subjects/${name}`)}
                >
                  View Subject
                </button>
                <button
                  className="w-full px-4 py-2 text-left hover:bg-gray-50"
                  onClick={() => {
                    setShowDropdown(false);
                    setShowSuccessModal(true);
                  }}
                >
                  Edit
                </button>
                <button
                  className="w-full px-4 py-2 text-left text-red-500 hover:bg-gray-50"
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <div>
            <p className="text-sm text-gray-500">Chapters</p>
            <p className="font-medium">{chapters}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Lessons</p>
            <p className="font-medium">{lessons}</p>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 text-center">
            <img src={caution} alt="caution" className="w-24 h-24 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-2 text-red-500">CAUTION!</h2>
            <p className="text-xl text-gray-600 mb-6">You're about to delete this subject</p>
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
            <p className="text-gray-600 mb-8">Subject deleted successfully</p>
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
  return (
    <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""}`}>
      <div className="mb-8">
        <div className="font-normal text-[14px] lg:text-[16px] leading-[20px] text-[#B6B6B6]">
          Home / Categories / Primary 1 /<span className="text-black font-medium"> Subjects</span>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 mb-8">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-[#E9FDEE] rounded-lg">
            <img src={bookopen} alt="category" className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Primary 1</h1>
            <button className="mt-2 px-6 py-1 rounded-full text-sm font-medium bg-[#27AE60] text-white">
              Published
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard title="Total Subjects" count="6" />
        <StatCard title="Total Chapters" count="24" />
        <StatCard title="Total Lessons" count="120" />
      </div>

      <div className="flex justify-end mb-6">
        <button 
          onClick={handleAddSubject}
          className="px-6 py-2 bg-[#27AE60] text-white rounded-lg font-medium hover:bg-[#219652] transition-colors"
        >
          Add Subject
        </button>
      </div>
      <div className="bg-white rounded-xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <SubjectCard name="Mathematics" chapters="8" lessons="32" />
          <SubjectCard name="English" chapters="6" lessons="24" />
          <SubjectCard name="Science" chapters="10" lessons="40" />
          <SubjectCard name="Social Studies" chapters="7" lessons="28" />
          <SubjectCard name="Arts" chapters="5" lessons="20" />
          <SubjectCard name="Physical Education" chapters="4" lessons="16" />
        </div>
      </div>
      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 text-center">
            <img src={caution} alt="caution" className="w-24 h-24 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-2 text-red-500">CAUTION!</h2>
            <p className="text-xl text-gray-600 mb-6">You're about to delete this subject</p>
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
            <p className="text-gray-600 mb-8">Subject deleted successfully</p>
            <button 
              onClick={() => setShowSuccessModal(false)}
              className="w-full py-3 bg-[#27AE60] text-white rounded-lg hover:bg-[#219652]"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-[400px] p-6">
            <h2 className="text-xl font-bold mb-4">Add Subject</h2>
            <p className="text-gray-600 mb-4">Select one of the options below</p>
            
            <div className="bg-[#E9FDEE] rounded-xl p-4 space-y-4">
              <div className="flex items-center gap-4">
                <div
                  onClick={() => setSelectedOption('unit')}
                  className={`w-6 h-6 rounded-full cursor-pointer border-2 ${
                    selectedOption === 'unit' ? 'bg-[#27AE60] border-[#27AE60]' : 'border-gray-300'
                  }`}
                />
                <span className="font-medium">Add Single Subject</span>
              </div>

              <div className="flex items-center gap-4">
                <div
                  onClick={() => setSelectedOption('bulk')}
                  className={`w-6 h-6 rounded-full cursor-pointer border-2 ${
                    selectedOption === 'bulk' ? 'bg-[#27AE60] border-[#27AE60]' : 'border-gray-300'
                  }`}
                />
                <span className="font-medium">Upload Bulk Subjects</span>
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (selectedOption === 'unit') {
                    navigate('/add-subject');
                  }
                  setShowModal(false);
                }}
                disabled={!selectedOption}
                className="px-6 py-2 bg-[#27AE60] text-white rounded-lg font-medium hover:bg-[#219652] transition-colors disabled:opacity-50"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default SubjectDetails;
