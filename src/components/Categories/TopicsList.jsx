import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FiEdit, FiTrash2, FiMoreVertical } from 'react-icons/fi';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { TailSpin } from "react-loader-spinner"; // Add this import
import Headers from '../common/Headers';
import bookopen from '../../assets/images/bookopen.png';
import { getTopicsListAsync, deleteTopicAsync } from '../../apis/slices/categoriesSlice';
import Modal from '../common/Modal';
import SuccessModal from '../common/SuccessModal';
import Custombutton from '../common/Custombutton';
import UserCard from '../common/UserCard';
import statelayer from '../../assets/images/state-layer.png';
import StatCard from '../common/StatCard';

const TopicsList = ({ isOpen }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [loading, setLoading] = useState(false); // Add loading state

  const { data, isLoading } = useSelector(state => state.categories.topics);

  useEffect(() => {
    setLoading(true); // Set loading to true when starting the API call
    const fetchData = async () => {
      try {
        await dispatch(getTopicsListAsync(id));
      } catch (error) {
        console.error("Error fetching topics:", error);
      } finally {
        setLoading(false); // Set loading to false when API call completes
      }
    };

    fetchData();
  }, [dispatch, id]);

  const handleDelete = async (topicId) => {
    setSelectedTopic(topicId);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (selectedTopic) {
      setLoading(true); // Set loading to true when starting the delete operation
      try {
        const success = await dispatch(deleteTopicAsync(selectedTopic));
        if (success) {
          setShowDeleteModal(false);
          setShowSuccessModal(true);
          await dispatch(getTopicsListAsync(id));
        }
      } catch (error) {
        console.error("Error deleting topic:", error);
      } finally {
        setLoading(false); // Set loading to false when delete operation completes
      }
    }
  };

  const TopicCard = ({ topic }) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();

    return (
      <div className="bg-[#F9F9F9] rounded-xl p-6 relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gray-50 rounded-lg">
              <img src={bookopen} alt="topic" className="w-8 h-8" />
            </div>
            <div>
              <h3
                className="text-lg font-medium text-gray-900 cursor-pointer hover:text-[#27AE60]"
                onClick={() => navigate(`/topic-detail/${topic.id}`)}
              >
                {topic.name}
              </h3>
              <button className={`mt-2 px-4 py-1 rounded-full text-sm font-medium ${topic.active ? 'bg-[#27AE60] text-white' : 'bg-red-500 text-white'
                }`}>
                {topic.active ? 'Published' : 'Inactive'}
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
                  onClick={() => navigate(`/add-media/${topic.id}`)}
                  className="w-full px-4 py-2 text-left text-blue-500 hover:bg-gray-50"
                >
                  Add Media
                </button>
                <button
                  className="w-full px-4 py-2 text-left hover:bg-gray-50"
                  onClick={() => {
                    console.log("Navigating to edit topic with ID:", topic.id);
                    navigate(`/add-topic/${id}?topicId=${topic.id}`);
                  }}
                >
                  Edit Topic
                </button>
                <button
                  className="w-full px-4 py-2 text-left text-red-500 hover:bg-gray-50"
                  onClick={() => handleDelete(topic.id)}
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

  return (
    <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""}`}>
      {/* Add the loader component */}
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

      <div className="mb-8">
        <Headers
          value1="Categories"
          value2="Topics"
        />
      </div>

      <div className="bg-white rounded-xl p-6 mb-8">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-[#E9FDEE] rounded-lg">
            <img src={bookopen} alt="chapter" className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-xl font-bold">{data?.chapter?.name}</h1>
            <button className={`mt-2 px-6 py-1 rounded-full text-sm font-medium ${data?.chapter?.active ? 'bg-[#27AE60] text-white' : 'bg-red-500 text-white'
              }`}>
              {data?.chapter?.active ? 'Published' : 'Inactive'}
            </button>
          </div>
        </div>
      </div>

      <StatCard
        title="Total Topics"
        count={data?.totalLessons}
        backgroundColor="bg-white"
        width="w-full"
        height="h-[120px]"
      />

      <div className="flex justify-end mt-6 mb-6">
        <button
          onClick={() => navigate(`/add-topic/${id}`)}
          className="px-6 py-2 bg-[#27AE60] text-white rounded-lg font-medium hover:bg-[#219652] transition-colors"
        >
          Add Topic
        </button>
      </div>

      <div className="bg-white rounded-xl p-6">
        <h2 className="text-xl font-bold mb-6">Topics</h2>
        <div className="grid grid-cols-1 gap-4">
          {data?.lessons?.map((lesson) => (
            <TopicCard key={lesson.id} topic={lesson} />
          ))}
        </div>

        <div className="flex justify-between items-center mt-6">
          <Custombutton
            value="Previous"
            icon={<FaArrowLeft />}
            backgroundcolor="bg-[#F2F2F2]"
            textcolor="text-[#000000]"
            imagePosition="left"
            onClick={() => {
              setLoading(true);
              setCurrentPage(prev => prev - 1);
              dispatch(getTopicsListAsync(id, prev - 1))
                .finally(() => setLoading(false));
            }}
          />
          <div className="text-sm text-gray-600">
            Page {currentPage} of {data?.pagination?.totalPages || 1}
          </div>
          <Custombutton
            value="Next"
            icon={<FaArrowRight />}
            backgroundcolor="bg-[#F2F2F2]"
            textcolor="text-[#000000]"
            imagePosition="right"
            onClick={() => {
              setLoading(true);
              setCurrentPage(prev => prev + 1);
              dispatch(getTopicsListAsync(id, prev + 1))
                .finally(() => setLoading(false));
            }}
          />
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <SuccessModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        type="caution"
        title="Delete Topic"
        message="Are you sure you want to delete this topic?"
        buttonText="Delete"
        onConfirm={confirmDelete}
      />

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => {
          setShowSuccessModal(false);
          setLoading(true);
          dispatch(getTopicsListAsync(id))
            .finally(() => setLoading(false));
        }}
        type="success"
        title="Success"
        message="Topic deleted successfully"
      />
    </div>
  );
};

export default TopicsList;
