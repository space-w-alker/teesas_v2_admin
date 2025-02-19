import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Headers from '../common/Headers';
import Headcomponent from '../common/Headcomponent';
import Custombutton from '../common/Custombutton';
import SuccessModal from '../common/SuccessModal';
import bookopen from '../../assets/images/bookopen.png';
import StatCard from '../common/StatCard';
import { useDispatch, useSelector } from 'react-redux';
import { getChapterDetailsAsync } from '../../apis/slices/categoriesSlice';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const ChapterItem = ({ name, id, onDelete }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#F9F9F9] rounded-xl p-4 flex items-center justify-between hover:shadow-md transition-shadow">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-white rounded-lg">
          <img src={bookopen} alt="book" className="w-6 h-6" />
        </div>
        <span className="font-medium text-gray-800">{name}</span>
      </div>
      <div className="flex gap-4 items-center">
        <button
          onClick={() => navigate(`/add-topic/${chapter.id}`, {
            state: {
              chapterId: chapter.id,
              chapterName: name
            }
          })}
          className="text-black"
        >
          Add Topic
        </button>
        <button
          className="text-black"
          onClick={() => navigate('/add-test-utme')}
        >
          Add Test
        </button>
        <button
          onClick={() => onDelete(name)}
          className="text-red-500 hover:text-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
}; const CreateChapter = ({ isOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { data: chapterData, isLoading } = useSelector(state => state.categories.chapters);
  const { subjectId, subjectName } = location.state || {};
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedChapter, setSelectedChapter] = useState(null);

  useEffect(() => {
    if (subjectId) {
      dispatch(getChapterDetailsAsync(subjectId));
    }
  }, [dispatch, subjectId]);

  const handleDelete = (chapter) => {
    setSelectedChapter(chapter);
    setShowDeleteModal(true);
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""} transition-all duration-300`}>
      <Headers value1="Home" value2="Chapters" />

      <div className="p-6 border-b border-gray-100">
        <div className="flex justify-between items-center">
          <Headcomponent value={`Chapters - ${chapterData?.name || ''}`} showSearch={false} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-8">
        <StatCard title="Total Chapters" count={chapterData?.totalChapters || 0} />
        <StatCard title="Total Topics" count={chapterData?.totalLessons || 0} />
      </div>

      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b border-gray-100">
          <div className="flex justify-between items-center">
            <Headcomponent value="Chapters List" showSearch={false} />
            <Custombutton
              value="Add Chapter"
              onClick={() => navigate(`/add-unit-chapter/${subjectId}`, {
                state: { subjectId, subjectName }
              })}
              backgroundcolor="bg-[#27AE60]"
              textcolor="text-white"
              width="w-[130px]"
              extraStyle="py-2"
            />

          </div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {chapterData?.chapters?.map((chapter) => (
              <ChapterItem
                key={chapter.id}
                name={chapter.name}
                onDelete={handleDelete}
              />
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
      </div>

      <SuccessModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        type="caution"
        title="Confirm Delete"
        message={`Are you sure you want to delete ${selectedChapter}?`}
        buttonText="Delete"
      />
    </div>
  );
};
export default CreateChapter;