import React, { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Headers from '../common/Headers';
import Headcomponent from '../common/Headcomponent';
import Modal from '../common/Modal';
import bookopen from '../../assets/images/bookopen.png';
import StatCard from '../common/StatCard';
import { getChapterDetailsAsync } from '../../apis/slices/categoriesSlice';

const ChapterItem = ({ chapter, onEdit }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-[#F9F9F9] rounded-xl p-4 flex items-center justify-between hover:shadow-md transition-shadow">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-white rounded-lg">
          <img src={bookopen} alt="book" className="w-6 h-6" />
        </div>
        <span className="font-medium text-gray-800">{chapter.name}</span>
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate(`/chapters/${chapter.id}/topics`)}
          className="px-4 py-2 text-[#27AE60] hover:text-[#219652] transition-colors font-medium"
        >
          View Topics
        </button>
        <button
          onClick={() => onEdit(chapter)}
          className="px-4 py-2 text-blue-600 hover:text-blue-700 transition-colors font-medium"
        >
          Edit
        </button>
      </div>
    </div>
  );
};

const Chapters = ({ isOpen }) => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, isLoading } = useSelector(state => state.categories.chapters);
  const [showModal, setShowModal] = useState(false);
  const [selectedChapter, setSelectedChapter] = useState(null);

  useEffect(() => {
    if (id) {
      dispatch(getChapterDetailsAsync(id));
    }
  }, [dispatch, id]);

  const handleEdit = (chapter) => {
    setSelectedChapter(chapter);
    setShowModal(true);
  };

  const handleAddUnitMedia = () => {
    navigate('/add-unit-media', { state: { chapterName: selectedChapter.name } });
    setShowModal(false);
  };

  const handleBulkUpload = () => {
    navigate('/upload-bulk-media', { state: { chapterName: selectedChapter.name } });
    setShowModal(false);
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""} transition-all duration-300`}>
      <Headers value1="Home" value2="Chapters" />

      <div className="p-6 border-b border-gray-100">
        <div className="flex justify-between items-center">
          <Headcomponent value="Lessons" showSearch={false} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
        <StatCard title="Total Chapters" count={data?.totalChapters || 0} />
        <StatCard title="Active Chapters" count={data?.activeChapters || 0} />
        <StatCard title="Total Topics" count={data?.totalTopics || 0} />
        <StatCard title="Total Videos" count={data?.totalVideos || 0} />
      </div>

      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b border-gray-100">
          <Headcomponent value="Chapters List" showSearch={false} />
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {data?.chapters?.map((chapter) => (
              <ChapterItem
                key={chapter.id}
                chapter={chapter}
                onEdit={handleEdit}
              />
            ))}
          </div>
        </div>
      </div>

      {showModal && (
        <Modal
          label="ADD MEDIA"
          value1="Add Unit Media"
          value2="Upload Bulk Media"
          showModal={showModal}
          setShowModal={setShowModal}
          addSingleButton={handleAddUnitMedia}
          addMutipleButton={handleBulkUpload}
        />
      )}
    </div>
  );
};

export default Chapters;