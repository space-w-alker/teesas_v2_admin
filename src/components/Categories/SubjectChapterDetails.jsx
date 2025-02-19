import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FiEdit, FiTrash2, FiMoreVertical } from 'react-icons/fi';
import Headers from '../common/Headers';
import bookopen from '../../assets/images/bookopen.png';
import { getChapterDetailsAsync } from '../../apis/slices/categoriesSlice';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import SuccessModal from '../common/SuccessModal';
import StatCard from '../common/StatCard';
import Headcomponent from '../common/Headcomponent';
import Custombutton from '../common/Custombutton';

const SubjectChapterDetails = ({ isOpen }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedChapter, setSelectedChapter] = useState(null);

  const { data, isLoading } = useSelector(state => state.categories.chapters);

  useEffect(() => {
    dispatch(getChapterDetailsAsync(id));
  }, [dispatch, id]);

  const ChapterCard = ({ chapter }) => {
    const [showDropdown, setShowDropdown] = useState(false);

    const handleDelete = () => {
      setShowDropdown(false);
      setSelectedChapter(chapter);
      setShowDeleteModal(true);
    };

    return (
      <div className="bg-[#F9F9F9] rounded-xl p-6 relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gray-50 rounded-lg">
              <img src={bookopen} alt="chapter" className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">{chapter.name}</h3>
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
                  onClick={() => navigate(`/chapters/${chapter.id}/topics`)}

                >
                  View Lessons
                </button>
                <button
                  className="w-full px-4 py-2 text-left hover:bg-gray-50"
                  onClick={() => navigate(`/edit-chapter/${chapter.id}`)}
                >
                  Edit Chapter
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
      </div>
    );
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""}`}>
      <div className="mb-8">
        <Headers
          value1="Home"
          value2={data?.name}
        />
      </div>

      <div className="bg-white rounded-xl p-6 mb-8">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-[#E9FDEE] rounded-lg">
            <img src={bookopen} alt="subject" className="w-8 h-8" />
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <StatCard title="Total Chapters" count={data?.totalChapters} />
        <StatCard title="Total Lessons" count={data?.totalLessons} />
      </div>

      <div className="flex justify-end mb-6">
        <button
          onClick={() => navigate(`/add-unit-chapter/${id}`)}
          className="px-6 py-2 bg-[#27AE60] text-white rounded-lg font-medium hover:bg-[#219652] transition-colors"
        >
          Add Chapter
        </button>
      </div>


      <div className="bg-white rounded-xl p-6">
        <Headcomponent value="Chapters" showSearch={false} />
        <div className="grid grid-cols-1 gap-4">
          {data?.chapters?.map((chapter) => (
            <ChapterCard key={chapter.id} chapter={chapter} />
          ))}
        </div>
        <div className="flex justify-between items-center mt-6">
          <Custombutton
            value="Previous"
            hidden="hidden"
            icon={<FaArrowLeft />}
            backgroundcolor="bg-[#F2F2F2]"
            textcolor="text-[#000000]"
            imagePosition="left"
          />

          <Custombutton
            value="View All"
            hidden="hidden"
            backgroundcolor="bg-[#F2F2F2]"
            textcolor="text-[#000000]"
          />

          <Custombutton
            value="Next"
            hidden="hidden"
            icon={<FaArrowRight />}
            backgroundcolor="bg-[#F2F2F2]"
            textcolor="text-[#000000]"
            imagePosition="right"
          />
        </div>

      </div>



      <SuccessModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        type="caution"
        title="Delete Chapter"
        message="Are you sure you want to delete this chapter?"
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
          dispatch(getChapterDetailsAsync(id));
        }}
        type="success"
        title="Success"
        message="Chapter deleted successfully"
      />
    </div>
  );
};

export default SubjectChapterDetails;
