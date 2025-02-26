import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Headers from '../common/Headers';
import Headcomponent from '../common/Headcomponent';
import StatCard from '../common/StatCard';
import Custombutton from '../common/Custombutton';
import SuccessModal from '../common/SuccessModal';
import bookopen from '../../assets/images/bookopen.png';
import { FaArrowLeft, FaArrowRight, FaPlus } from 'react-icons/fa';
import { getUniversitiesAsync, deleteUniversityAsync } from '../../apis/slices/universitySlice';
import { TailSpin } from 'react-loader-spinner';
import { config } from '../../apis/client/config'; // Import config for image URLs

const UniversityItem = ({ university, navigate, onDelete }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Use the icon from backend if available, otherwise use default
  const iconSrc = university.icon
    ? `${config.MainUrl}public/${university.icon}`
    : bookopen;

  return (
    <>
      <div className="bg-gray-50 rounded-xl p-4 flex items-center justify-between hover:shadow-md transition-shadow">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white rounded-lg">
            <img src={iconSrc} alt="university icon" className="w-6 h-6 object-cover" />
          </div>
          <span className="font-medium text-gray-800">{university.name}</span>
        </div>
        <div className="flex gap-4 items-center">
          <Custombutton
            value="Edit"
            onClick={() => navigate('/uni-add', {
              state: {
                isEdit: true,
                universityData: {
                  id: university.id,
                  universityName: university.name,
                  icon: university.icon,
                  address: university.address,
                  contactNumber: university.contact_number,
                  isActive: university.is_active
                }
              }
            })}
            textcolor="text-[#27AE60]"
            backgroundcolor="bg-transparent"
            extraStyle="font-medium"
          />

          <Custombutton
            value="Delete"
            onClick={() => setShowDeleteModal(true)}
            textcolor="text-red-600"
            backgroundcolor="bg-transparent"
            extraStyle="font-medium"
          />
        </div>
      </div>

      <SuccessModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        type="caution"
        title="Delete University"
        message={`Are you sure you want to delete ${university.name}?`}
        buttonText="Delete"
        onConfirm={() => {
          onDelete(university.id);
          setShowDeleteModal(false);
        }}
      />
    </>
  );
};
const UniList = ({ isOpen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState(null);
  const [showDeleteSuccessModal, setShowDeleteSuccessModal] = useState(false);
  const [deletedUniversityName, setDeletedUniversityName] = useState('');

  // Get universities data from Redux store
  const { isLoading, data, error } = useSelector((state) => state.university.universities);
  const deleteState = useSelector((state) => state.university.deleteUniversity);

  // Extract universities and pagination info from the data
  const universities = data?.universities || [];
  const pagination = data?.pagination || { total: 0, totalPages: 1 };

  // Fetch universities on component mount and when page changes
  useEffect(() => {
    dispatch(getUniversitiesAsync(currentPage, itemsPerPage));
  }, [dispatch, currentPage, itemsPerPage]);

  // Track delete operation status
  useEffect(() => {
    if (deleteState.isLoading) {
      setDeleteLoading(true);
    } else {
      setDeleteLoading(false);

      if (deleteState.error) {
        setDeleteError(deleteState.error);
      } else if (deleteState.data && !deleteLoading) {
        // Show success modal after delete
        setShowDeleteSuccessModal(true);
      }
    }
  }, [deleteState, deleteLoading]);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < pagination.totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleDeleteUniversity = async (id) => {
    try {
      // Find the university name before deletion
      const university = universities.find(uni => uni.id === id);
      if (university) {
        setDeletedUniversityName(university.name);
      }

      setDeleteError(null);
      await dispatch(deleteUniversityAsync(id));

    } catch (error) {
      setDeleteError(error.message || "Failed to delete university");
    }
  };

  const handleCloseDeleteSuccessModal = () => {
    setShowDeleteSuccessModal(false);
    // Refresh the list after successful deletion
    dispatch(getUniversitiesAsync(currentPage, itemsPerPage));
  };

  return (
    <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""} transition-all duration-300`}>
      <Headers value1="Home" value2="University List" />

      <div className="p-6 border-b border-gray-100">
        <div className="flex justify-between items-center">
          <Headcomponent value="University List" showSearch={false} />
        </div>
      </div>

      <div className="mt-6 bg-white rounded-xl shadow-sm mb-8">
        <div className="p-6">
          <StatCard title="Total Universities" count={pagination.total.toString()} />
        </div>
      </div>

      <div className="flex justify-end mb-6">
        <Custombutton
          value={
            <div className="flex items-center gap-2">
              <FaPlus className="text-white" />
              <span>Add University</span>
            </div>
          }
          onClick={() => navigate('/Uni-Add')}
          textcolor="text-white"
          backgroundcolor="bg-[#27AE60]"
          extraStyle="hover:bg-[#219652]"
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b border-gray-100">
          <Headcomponent value="Universities" showSearch={false} />
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center p-10">
            <TailSpin color="#27AE60" radius={5} />
          </div>
        ) : error ? (
          <div className="p-6 text-center text-red-500">
            Error loading universities: {error}
          </div>
        ) : (
          <div className="p-6">
            {universities.length === 0 ? (
              <div className="text-center text-gray-500 py-10">
                No universities found
              </div>
            ) : (
              <div className="space-y-4">
                {universities.map((uni) => (
                  <UniversityItem
                    key={uni.id}
                    university={uni}
                    navigate={navigate}
                    onDelete={handleDeleteUniversity}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        <div className="p-6 border-t border-gray-100 flex justify-between items-center">
          <Custombutton
            value={
              <div className="flex items-center gap-2">
                <FaArrowLeft />
                <span>Previous</span>
              </div>
            }
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            backgroundcolor={currentPage === 1 ? "bg-gray-200" : "bg-gray-100"}
            textcolor={currentPage === 1 ? "text-gray-400" : "text-gray-600"}
            width="w-[100px]"
            extraStyle="py-2"
          />
          <span className="text-gray-600">
            Page {currentPage} of {pagination.totalPages || 1}
          </span>
          <Custombutton
            value={
              <div className="flex items-center gap-2">
                <span>Next</span>
                <FaArrowRight />
              </div>
            }
            onClick={handleNextPage}
            disabled={currentPage === pagination.totalPages || pagination.totalPages === 0}
            backgroundcolor={currentPage === pagination.totalPages ? "bg-gray-200" : "bg-gray-100"}
            textcolor={currentPage === pagination.totalPages ? "text-gray-400" : "text-gray-600"}
            width="w-[80px]"
            extraStyle="py-2"
          />
        </div>
      </div>

      {/* Error Modal */}
      {deleteError && (
        <SuccessModal
          isOpen={Boolean(deleteError)}
          onClose={() => setDeleteError(null)}
          type="caution"
          title="Error"
          message={deleteError}
          buttonText="Close"
          onConfirm={() => setDeleteError(null)}
        />
      )}

      {/* Success Modal for Delete */}
      <SuccessModal
        isOpen={showDeleteSuccessModal}
        onClose={handleCloseDeleteSuccessModal}
        type="success"
        title="University Deleted"
        message={`${deletedUniversityName} has been successfully deleted.`}
        buttonText="OK"
        onConfirm={handleCloseDeleteSuccessModal}
      />

      {/* Loading Modal */}
      {deleteLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 flex flex-col items-center">
            <TailSpin color="#27AE60" radius={5} />
            <p className="mt-4 text-gray-700">Deleting university...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UniList;
