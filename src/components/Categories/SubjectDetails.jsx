import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FiEdit, FiTrash2, FiMoreVertical } from 'react-icons/fi';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import book from '../../assets/images/book.png';
import Headers from '../common/Headers';
import bookopen from '../../assets/images/bookopen.png';
import { getSubjectDetailsAsync, deleteSubjectAsync } from '../../apis/slices/categoriesSlice';
import Modal from '../common/Modal';
import SuccessModal from '../common/SuccessModal';
import StatCard from '../common/StatCard';
import Custombutton from '../common/Custombutton';

const SubjectDetails = ({ isOpen }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedItemToDelete, setSelectedItemToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading } = useSelector(state => state.categories.subjects);

  useEffect(() => {
    dispatch(getSubjectDetailsAsync(id, currentPage));
  }, [dispatch, id, currentPage]);


  const SubjectCard = ({ subject }) => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const [showDropdown, setShowDropdown] = useState(false);

    const handleDelete = async () => {
      setShowDropdown(false);
      const success = await dispatch(deleteSubjectAsync(id, subject.id));
      if (success) {
        dispatch(getSubjectDetailsAsync(id));
      }
    };

    return (
      <div className="bg-[#F9F9F9] rounded-xl p-6 relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gray-50 rounded-lg">
              {subject.media_path ? (
                <img
                  src={book}
                  alt={subject.name}
                  className="w-8 h-8 object-cover rounded-lg"
                />
              ) : (
                <img src={bookopen} alt="subject" className="w-8 h-8" />
              )}
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">{subject.name}</h3>
              <button className={`mt-2 px-4 py-1 rounded-full text-sm font-medium ${subject.active ? 'bg-[#27AE60] text-white' : 'bg-red-500 text-white'
                }`}>
                {subject.active ? 'Published' : 'Inactive'}
              </button>
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
                  onClick={() => navigate(`/subjects/${subject.id}/chapters`)}
                >
                  View Chapters
                </button>
                <button
                  className="w-full px-4 py-2 text-left hover:bg-gray-50"
                  onClick={() => navigate(`/add-subject/${id}/${subject.id}`)}
                >
                  Edit Subject
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
            <p className="font-medium">{subject.totalChapters}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Lessons</p>
            <p className="font-medium">{subject.totalLessons}</p>
          </div>
        </div>
      </div>
    );
  };

  if (isLoading) return <div>Loading...</div>;

  const handleNextPage = () => {
    if (currentPage < data?.pagination?.totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  return (
    <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""}`}>
      <div className="mb-8">
        <Headers
          value1="Home"
          value2={"Subject Details"}
        />
      </div>

      <div className="bg-white rounded-xl p-6 mb-8">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-[#E9FDEE] rounded-lg">
            <img src={bookopen} alt="category" className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-xl font-bold">{data?.name}</h1>
            <button className={`mt-2 px-6 py-1 rounded-full text-sm font-medium ${data?.active ? 'bg-[#27AE60] text-white' : 'bg-red-500 text-white'
              }`}>
              {data?.active ? 'Published' : 'Inactive'}
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard title="Total Subjects" count={data?.totalSubjects} />
        <StatCard title="Total Chapters" count={data?.totalChapters} />
        <StatCard title="Total Lessons" count={data?.totalLessons || 0} />
      </div>

      <div className="flex justify-end mb-6">
        <button
          onClick={() => navigate(`/add-subject/${id}`)}
          className="px-6 py-2 bg-[#27AE60] text-white rounded-lg font-medium hover:bg-[#219652] transition-colors"
        >
          Add Subject
        </button>
      </div>

      <div className="bg-white rounded-xl p-6">
        <h2 className="text-xl font-bold mb-6">Subjects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.subjects?.map((subject) => (
            <SubjectCard key={subject.id} subject={subject} />
          ))}
        </div>

        <div className="flex justify-between items-center mt-6">
          <div>
            <Custombutton
              value="Previous"
              icon={<FaArrowLeft />}
              backgroundcolor={currentPage === 1 ? "bg-gray-100" : "bg-[#F2F2F2]"}
              textcolor={currentPage === 1 ? "text-gray-400" : "text-[#000000]"}
              imagePosition="left"
              width="w-[115px]"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            />
          </div>

          <span className="text-gray-600">
            Page {currentPage} of {data?.pagination?.totalPages || 1}
          </span>

          <div>
            <Custombutton
              value="Next"
              icon={<FaArrowRight />}
              backgroundcolor={currentPage === (data?.pagination?.totalPages || 1) ? "bg-gray-100" : "bg-[#F2F2F2]"}
              textcolor={currentPage === (data?.pagination?.totalPages || 1) ? "text-gray-400" : "text-[#000000]"}
              imagePosition="right"
              width="w-[115px]"
              onClick={handleNextPage}
              disabled={currentPage === (data?.pagination?.totalPages || 1)}
            />
          </div>
        </div>

      </div>

      {showModal && (
        <Modal
          closeModal={() => setShowModal(false)}
          label="Add Subject"
          value1="Add Single Subject"
          value2="Upload Bulk Subjects"
          addSingleButton={() => navigate(`/add-subject/${id}`)}
          addMutipleButton={() => navigate(`/bulk-upload-subjects/${id}`)}
        />
      )}

      <SuccessModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        type="caution"
        title="Delete Subject"
        message="Are you sure you want to delete this subject?"
        buttonText="Delete"
        onConfirm={() => {
          setShowDeleteModal(false);
          setShowSuccessModal(true);
        }}
      />

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => {
          setShowSuccessModal(false);
          dispatch(getSubjectDetailsAsync(id));
        }}
        type="success"
        title="Success"
        message="Subject deleted successfully"
      />
    </div>
  );
};

export default SubjectDetails;
