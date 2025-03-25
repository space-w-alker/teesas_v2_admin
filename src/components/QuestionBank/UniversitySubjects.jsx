import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  getUniversitySubjectsAsync,
  deleteUniversitySubjectAsync,
  getUniversityStatisticsAsync,
  getUniversityStatisticsResponse
} from '../../apis/slices/questionBankSlice';
import Headers from '../common/Headers';
import Headcomponent from '../common/Headcomponent';
import StatCard from '../common/StatCard';
import Custombutton from '../common/Custombutton';
import bookopen from '../../assets/images/bookopen.png';
import { FaArrowLeft, FaArrowRight, FaPlus } from 'react-icons/fa';
import SuccessModal from '../common/SuccessModal';
import { TailSpin } from "react-loader-spinner";
import { toast } from 'react-toastify';

const SubjectItem = ({ subject, navigate, universityName, universityId, onDeleteSuccess }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const dispatch = useDispatch();
  const token = localStorage.getItem("authToken");

  const handleDeleteConfirm = () => {
    console.log("Deleting subject with ID:", subject.id);
    setIsDeleting(true);

    deleteUniversitySubjectAsync({
      dispatch,
      subjectId: subject.id,
      token,
      callbackFn: (response) => {
        console.log("Delete response:", response);
        setIsDeleting(false);
        setShowDeleteModal(false);

        if (response?.data?.status === 200) {
          toast.success("Subject deleted successfully");
          onDeleteSuccess(); // Refresh the subjects list
        } else {
          toast.error(response?.data?.message || "Failed to delete subject");
        }
      }
    });
  };

  return (
    <>
      <div className="bg-gray-50 rounded-xl p-4 flex items-center justify-between hover:shadow-md transition-shadow">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white rounded-lg">
            <img src={bookopen} alt="book" className="w-6 h-6" />
          </div>
          <span className="font-medium text-gray-800 cursor-pointer hover:text-[#27AE60]">
            {subject.name}
          </span>
        </div>
        <div className="flex gap-4 items-center">
          <Custombutton
            value="Add Pdf"
            onClick={() => navigate('/university-add-pdf', {
              state: {
                subjectId: subject.id,
                subjectName: subject.name
              }
            })}
            textcolor="text-[#27AE60]"
            backgroundcolor="bg-transparent"
            extraStyle="font-medium"
          />
          <Custombutton
            value="View Pdf"
            onClick={() => navigate('/university-view-pdf', {
              state: {
                subjectId: subject.id,
                subjectName: subject.name
              }
            })}
            textcolor="text-[#27AE60]"
            backgroundcolor="bg-transparent"
            extraStyle="font-medium"
          />
          <Custombutton
            value="Edit"
            onClick={() => navigate('/university-add-subject', {
              state: {
                isEdit: true,
                subjectId: subject.id,
                universityId: universityId,
                universityName: universityName,
                subjectTitle: subject.name
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
        title="Delete Subject"
        message="Are you sure you want to delete this subject?"
        buttonText="Delete"
        onConfirm={handleDeleteConfirm}
      />
    </>
  );
};

const UniversitySubjects = ({ isOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { universityId, universityName } = location.state || {};

  const [isLoading, setIsLoading] = useState(false);
  const [universityData, setUniversityData] = useState({
    id: 0,
    name: '',
    totalSubjects: 0,
    totalPdfs: 0,
    subjects: []
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1
  });
  const [currentPage, setCurrentPage] = useState(1);

  const statisticsResponse = useSelector(getUniversityStatisticsResponse);
  const statistics = statisticsResponse?.data || {};

  const token = localStorage.getItem("authToken");

  useEffect(() => {
    if (universityId) {
      fetchSubjects();
      fetchUniversityStatistics();
    } else {
      navigate('/university-list');
      toast.error("University ID is required");
    }
  }, [universityId, currentPage]);

  const fetchSubjects = () => {
    setIsLoading(true);

    getUniversitySubjectsAsync({
      dispatch,
      universityId,
      page: currentPage,
      limit: 10,
      token,
      callbackFn: (response) => {
        setIsLoading(false);

        if (response?.data?.status === 200) {
          setUniversityData(response.data.data);
          setPagination(response.data.data.pagination);
        } else {
          toast.error(response?.data?.message || "Failed to fetch subjects");
        }
      }
    });
  };

  const fetchUniversityStatistics = () => {
    getUniversityStatisticsAsync({
      dispatch,
      token,
      callbackFn: (response) => {
        if (!response || response?.data?.status !== 200) {
          toast.error("Failed to fetch university statistics");
        }
      }
    });
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < pagination.totalPages) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const handleDeleteSuccess = () => {
    console.log("Subject deleted successfully, refreshing list");
    fetchSubjects();
    fetchUniversityStatistics(); // Refresh statistics after deletion
  };

  return (
    <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""} transition-all duration-300`}>
      <Headers
        value1="Home"
        value2="Universities"
        value3={universityData.name || universityName}
      />

      {isLoading && (
        <div style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 9999,
        }}>
          <TailSpin color="orange" radius={5} />
        </div>
      )}

      <div className="p-6 border-b border-gray-100">
        <div className="flex justify-between items-center">
          <Headcomponent value={universityData.name || universityName} showSearch={false} />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-8">

        <StatCard
          title="Total Subjects"
          count={(universityData.totalSubjects || statistics.totalSubjects || 0).toString()}
        />

        <StatCard
          title="Total PDF Uploaded"
          count={(universityData.totalPdfs || statistics.totalPdfs || 0).toString()}
        />
      </div>

      <div className="flex justify-end mb-6">
        <Custombutton
          value={
            <div className="flex items-center gap-2">
              <FaPlus className="text-white" />
              <span>Add Subject</span>
            </div>
          }
          onClick={() => navigate('/university-add-subject', {
            state: {
              universityId: universityData.id || universityId,
              universityName: universityData.name || universityName
            }
          })}
          textcolor="text-white"
          backgroundcolor="bg-[#27AE60]"
          extraStyle="hover:bg-[#219652]"
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <Headcomponent value="Subjects" showSearch={false} />
        </div>

        <div className="p-6">
          {universityData.subjects && universityData.subjects.length > 0 ? (
            <div className="space-y-4">
              {universityData.subjects.map((subject) => (
                <SubjectItem
                  key={subject.id}
                  subject={subject}
                  navigate={navigate}
                  universityName={universityData.name || universityName}
                  universityId={universityId}
                  onDeleteSuccess={handleDeleteSuccess}
                />
              ))}
            </div>
          ) : !isLoading ? (
            <div className="text-center py-8 text-gray-500">
              No subjects found
            </div>
          ) : null}
        </div>

        {pagination.totalPages > 1 && (
          <div className="p-6 border-t border-gray-100 flex justify-between items-center">
            <Custombutton
              value="Previous"
              icon={<FaArrowLeft />}
              backgroundcolor="bg-[#F2F2F2]"
              textcolor={currentPage <= 1 ? "text-[#cccccc]" : "text-[#000000]"}
              imagePosition="left"
              onClick={handlePrevPage}
              disabled={currentPage <= 1}
            />

            <span className="text-gray-600">Page {pagination.page} of {pagination.totalPages}</span>

            <Custombutton
              value="Next"
              icon={<FaArrowRight />}
              backgroundcolor="bg-[#F2F2F2]"
              textcolor={currentPage >= pagination.totalPages ? "text-[#cccccc]" : "text-[#000000]"}
              imagePosition="right"
              onClick={handleNextPage}
              disabled={currentPage >= pagination.totalPages}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default UniversitySubjects;