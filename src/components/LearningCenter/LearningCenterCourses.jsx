import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FaPlus, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import Headers from '../common/Headers';
import Headcomponent from '../common/Headcomponent';
import Custombutton from '../common/Custombutton';
import StatCard from '../common/StatCard';
import Modal from '../common/Modal';
import { TailSpin } from "react-loader-spinner";
import { getCoursesAsync, getParticipantStatsAsync, deleteCourseAsync } from '../../apis/slices/learningCenterSlice';
import SuccessModal from '../common/SuccessModal';

const LearningCenterCourses = ({ isOpen }) => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("authToken");
  const [loading, setLoading] = useState(false);
  const [coursesData, setCoursesData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [participantStats, setParticipantStats] = useState({
    totalParticipants: 0,
    paidParticipants: 0,
    unpaidParticipants: 0
  });
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetchCourses();
    fetchParticipantStats();
  }, []);

  const fetchCourses = (page = 1, search = searchTerm) => {
    setLoading(true);
    getCoursesAsync({
      dispatch: dispatch,
      data: {
        page: page,
        limit: 10,
        search: search
      },
      token: token,
      callbackFn: (res) => {
        setLoading(false);
        if (res?.data?.status === 200) {
          setCoursesData(res.data.data.courses || []);
          setCurrentPage(res.data.data.pagination.page);
          setTotalPages(res.data.data.pagination.totalPages);
        } else {
          console.error("Failed to fetch courses:", res?.data?.message);
        }
      },
    });
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    fetchCourses(1, value);
  };

  const fetchParticipantStats = () => {
    getParticipantStatsAsync({
      dispatch: dispatch,
      token: token,
      callbackFn: (res) => {
        if (res?.data?.status === 200) {
          const stats = res.data.data;
          setParticipantStats({
            totalParticipants: stats.totalParticipants || 0,
            paidParticipants: stats.paidParticipants || 0,
            unpaidParticipants: stats.unpaidParticipants || 0
          });
        } else {
          console.error("Failed to fetch participant stats:", res?.data?.message);
        }
      },
    });
  };

  const handleAddCourse = (value) => {
    if (value === 'unit') {
      navigate('/add-single-course');
    } else if (value === 'bulk') {
      navigate('/add-bulk-courses');
    }
  };

  const handleDeleteCourse = (courseId) => {
    setSelectedCourseId(courseId);
    setShowDeleteModal(true);
  };

  const confirmDeleteCourse = () => {
    if (!selectedCourseId) return;
    
    setLoading(true);
    deleteCourseAsync({
      dispatch: dispatch,
      courseId: selectedCourseId,
      token: token,
      callbackFn: (res) => {
        setLoading(false);
        setShowDeleteModal(false);
        
        if (res?.data?.status === 200) {
          setSuccessMessage("Course deleted successfully");
          setShowSuccessModal(true);
          fetchCourses(currentPage, searchTerm);
        } else {
          setSuccessMessage("Failed to delete course: " + (res?.data?.message || "Unknown error"));
          setShowSuccessModal(true);
        }
      },
    });
  };

  const coursesList = [
    {
      date: '2024-05-15',
      courses: coursesData.map(course => ({
        name: course.name,
        participants: course.participants_count || 0,
        status: course.status,
        id: course.id
      }))
    }
  ];

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

      <Headers value1="Home" value2="Learning Center" value3="LearningCenterCourses" />

      <div className="p-6 border-b border-gray-100">
        <div className="flex justify-between items-center">
          <Headcomponent value="Learning Center Courses" showSearch={false} />
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Courses" count={coursesData.length} color="bg-blue-50" />
        <StatCard title="Total Participants" count={participantStats.totalParticipants} color="bg-green-50" />
        <StatCard title="Paid Participants" count={participantStats.paidParticipants} color="bg-purple-50" />
        <StatCard title="Unpaid Participants" count={participantStats.unpaidParticipants} color="bg-orange-50" />
      </div>

      <div className="flex justify-end gap-4 mb-6">
        <button
          className="flex items-center gap-2 px-4 py-2 bg-[#27AE60] text-white rounded-lg hover:bg-[#229652] transition-colors"
          onClick={() => navigate('/learning-center/add-subject')}
        >
          <FaPlus className="text-white" />
          Add Course
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b border-gray-100">
          <Headcomponent 
            value="Course List" 
            showSearch={true}
            onSearch={handleSearch}
            searchValue={searchTerm}
            onClear={() => {
              setSearchTerm("");
              fetchCourses(1, "");
            }}
          />
        </div>

        <div className="p-6">
          {coursesData.length === 0 && searchTerm ? (
            <div className="text-center py-8">
              <h3 className="text-lg font-medium text-gray-700">No courses found</h3>
              <p className="text-gray-500 mt-2">
                We couldn't find any courses matching "{searchTerm}".
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {coursesList.map((group, groupIndex) => (
                <div key={groupIndex}>
                  <div className="space-y-4">
                    {group.courses.map((course, index) => (
                      <div
                        key={index}
                        className="bg-white rounded-xl p-4 flex items-center justify-between hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => navigate('/jamb-ssce', {
                          state: {
                            courseName: course.name,
                            courseId: course.id
                          }
                        })}
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                            {course.name[0].toUpperCase()}
                          </div>
                          <div className="flex flex-col">
                            <span className="font-medium text-gray-800">{course.name}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <button
                            className="text-green-600"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate('/jamb-ssce', {
                                state: {
                                  courseName: course.name,
                                  courseId: course.id
                                }
                              });
                            }}
                          >
                            View
                          </button>
                          <button
                            className="text-red-600"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteCourse(course.id);
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
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
                fetchCourses(currentPage - 1);
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
                fetchCourses(currentPage + 1);
              }
            }}
            disabled={currentPage === totalPages}
          />
        </div>
      </div>

      {showModal && (
        <Modal
          label="ADD COURSE"
          value1="Add Single Course"
          value2="Upload Bulk Courses"
          closeModal={() => setShowModal(false)}
          onClick={handleAddCourse}
          addSingleButton={() => handleAddCourse('unit')}
          addMutipleButton={() => handleAddCourse('bulk')}
        />
      )}

      {/* Delete Confirmation Modal */}
      <SuccessModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        type="caution"
        title="Delete Course"
        message="Are you sure you want to delete this course? This action cannot be undone."
        buttonText="Delete"
        onConfirm={confirmDeleteCourse}
      />

      {/* Success/Error Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        type={successMessage.includes("Failed") ? "error" : "success"}
        title={successMessage.includes("Failed") ? "Error" : "Success"}
        message={successMessage}
      />
    </div>
  );
};

export default LearningCenterCourses;
