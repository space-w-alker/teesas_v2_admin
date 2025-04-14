import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FaPlus, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import book from '../../assets/images/book.png';
import sharp from '../../assets/images/sharp.png';
import Headers from '../common/Headers';
import Headcomponent from '../common/Headcomponent';
import Custombutton from '../common/Custombutton';
import StatCard from '../common/StatCard';
import Modal from '../common/Modal';
import { TailSpin } from "react-loader-spinner";
import { getCourseParticipantsAsync, toggleParticipantStatusAsync } from '../../apis/slices/learningCenterSlice';
import SuccessModal from '../common/SuccessModal';

const JAMBtutorial = ({ isOpen }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("authToken");

  // Get courseId and courseName from location state
  const { courseId, courseName } = location.state || {};

  const [loading, setLoading] = useState(false);
  const [participants, setParticipants] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (courseId) {
      fetchParticipants();
    }
  }, [courseId]);

  const fetchParticipants = (page = 1, search = "") => {
    setLoading(true);
    getCourseParticipantsAsync({
      dispatch: dispatch,
      courseId: courseId,
      data: {
        page: page,
        limit: 10,
        search: search
      },
      token: token,
      callbackFn: (res) => {
        setLoading(false);
        if (res?.data?.status === 200) {
          setParticipants(res.data.data.participants || []);
          setCurrentPage(res.data.data.pagination.page);
          setTotalPages(res.data.data.pagination.totalPages);
        } else {
          console.error("Failed to fetch participants:", res?.data?.message);
        }
      },
    });
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    fetchParticipants(1, value);
  };

  const handleAddTutorial = (value) => {
    if (value === 'unit') {
      navigate('/add-single-participant', { state: { courseId, courseName } });
    } else if (value === 'bulk') {
      navigate('/add-bulk-participant', { state: { courseId, courseName } });
    }
  };

  const handleToggleStatus = (participantId, currentStatus) => {
    setLoading(true);
    toggleParticipantStatusAsync({
      dispatch: dispatch,
      participantId: participantId,
      token: token,
      callbackFn: (res) => {
        setLoading(false);
        if (res?.data?.status === 200) {
          // Show success message
          setSuccessMessage(`Participant status changed to ${currentStatus === "PAID" ? "Unpaid" : "Paid"} successfully`);
          setShowSuccessModal(true);
          
          // Refresh the participants list
          fetchParticipants(currentPage, searchTerm);
        } else {
          console.error("Failed to toggle participant status:", res?.data?.message);
        }
      },
    });
  };

  return (
    <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""} transition-all duration-300`}>
      {loading && (
        <div style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 9999,
        }}>
          <TailSpin color="green" radius={5} />
        </div>
      )}

      <Headers value1="Home" value2="Learning Center" value3={courseName || "Course Participants"} />

      <div className="p-6 border-b border-gray-100">
        <div className="flex justify-between items-center">
          <Headcomponent value={`${courseName || "Course"} Participants`} showSearch={false} showFilter={false}
            showMenu={false} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-8">
        <StatCard title="Total Participants" count={participants.length} color="bg-blue-50" />
        <StatCard title="Active Participants" count={participants.filter(p => p.status === "PAID").length} color="bg-green-50" />
      </div>

      <div className="flex justify-end gap-4 mb-6">
        <Custombutton
          value={
            <div className="flex items-center gap-2">
              <FaPlus className="text-white" />
              Add Participant
            </div>
          }
          onClick={() => navigate('/add-single-participant', { state: { courseId, courseName } })}
          textcolor="text-white"
          backgroundcolor="bg-[#27AE60]"
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b border-gray-100">
          <Headcomponent 
            value="Participants List" 
            showSearch={true}
            showFilter={false}
            showMenu={false}
            onSearch={handleSearch}
            searchValue={searchTerm}
            onClear={() => {
              setSearchTerm("");
              fetchParticipants(1, "");
            }}
          />
        </div>

        <div className="p-6">
          {participants.length > 0 ? (
            <div className="space-y-4">
              {participants.map((participant, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-4 flex items-center justify-between hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => navigate('/tutorial-details', {
                    state: {
                      participant,
                      courseName
                    }
                  })}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      {participant.first_name ? participant.first_name[0].toUpperCase() : 'U'}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-800">{participant.first_name + ' ' + participant.last_name || 'Unknown'}</span>
                      <span className="text-sm text-gray-500">{participant.email || 'No email'}</span>
                    </div>
                  </div>
                  <Custombutton
                    value={
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          <img src={sharp} alt="sharp" className="w-4 h-4" />
                        </div>
                        <span>{participant.status === "PAID" ? 'Paid' : 'Unpaid'}</span>
                      </div>
                    }
                    textcolor={participant.status === "PAID" ? "text-blue-600" : "text-red-600"}
                    backgroundcolor={participant.status === "PAID" ? "bg-[#E9FDEE]" : "bg-red-100"}
                    extraStyle="px-4 py-2 rounded-lg"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleStatus(participant.id, participant.status);
                    }}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              {searchTerm ? (
                <div>
                  <h3 className="text-lg font-medium text-gray-700">No participants found</h3>
                  <p className="text-gray-500 mt-2">
                    We couldn't find any participants matching "{searchTerm}".
                  </p>
                </div>
              ) : (
                "No participants found for this course."
              )}
            </div>
          )}
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
            onClick={() => {
              if (currentPage > 1) {
                fetchParticipants(currentPage - 1, searchTerm);
              }
            }}
            disabled={currentPage === 1}
          />
          <span className="text-gray-600">Page {currentPage} of {totalPages}</span>
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
            onClick={() => {
              if (currentPage < totalPages) {
                fetchParticipants(currentPage + 1, searchTerm);
              }
            }}
            disabled={currentPage === totalPages}
          />
        </div>
      </div>

      {showModal && (
        <Modal
          label="ADD PARTICIPANT"
          value1="Add Single Participant"
          value2="Upload Bulk Participants"
          closeModal={() => setShowModal(false)}
          onClick={handleAddTutorial}
          addSingleButton={() => handleAddTutorial('unit')}
          addMutipleButton={() => handleAddTutorial('bulk')}
        />
      )}

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        type="success"
        title="Success"
        message={successMessage}
      />
    </div>
  );
};

export default JAMBtutorial;
