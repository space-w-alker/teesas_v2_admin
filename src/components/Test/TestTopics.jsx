import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import Headers from '../common/Headers';
import Headcomponent from '../common/Headcomponent';
import StatCard from '../common/StatCard';
import Custombutton from '../common/Custombutton';
import Modal from '../common/Modal';
import bookopen from '../../assets/images/bookopen.png';
import { useDispatch, useSelector } from "react-redux";
import { getTopicsListAsync } from "../../apis/slices/categoriesSlice";

const ClassItem = ({ name, id, uploadedMedia }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleCreateTest = () => {
    // Navigate to test creation page with topic ID
    navigate('/test-topic-list', { state: { topicId: id, topicName: name } });
    setShowModal(false);
  };

  return (
    <div className="bg-[#F9F9F9] rounded-xl p-4 flex items-center justify-between hover:shadow-md transition-shadow cursor-pointer">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-white rounded-lg">
          <img src={bookopen} alt="book" className="w-6 h-6" />
        </div>
        <span className="font-medium text-gray-800">{name}</span>
      </div>
      <div className="flex gap-4 items-center">
        <Custombutton
          value="Add Bulk Practice and Mock Test"
          onClick={() => setShowModal(true)}
          textcolor="text-[#27AE60]"
          backgroundcolor="bg-transparent"
          extraStyle="hover:bg-green-50"
        />
      </div>

      {showModal && (
        <Modal
          label="Add Test"
          value1="Create New Test"
          closeModal={handleCloseModal}
          addSingleButton={handleCreateTest}
        />
      )}
    </div>
  );
};
const TestTopics = ({ isOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const id = location.state.id || {};
  const topics = useSelector((state) => state.categories?.topics?.data?.lessons || []);
  // console.log('topic', id, topics);

  useEffect(() => {
    dispatch(getTopicsListAsync(id)).then(() => setLoading(false));
  }, [dispatch])

  return (
    <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""} transition-all duration-300`}>
      <Headers value1="Home" value2="Test" value3="Topics" />

      <div className="p-6 border-b border-gray-100">
        <div className="flex justify-between items-center">
          <Headcomponent value="Test Topics" showSearch={false} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
        <StatCard title="Total Classes" count="6" />
        <StatCard title="Active Classes" count="4" />
        <StatCard title="Students" count="120" />
        <StatCard title="Teachers" count="8" />
      </div>

      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b border-gray-100">
          <Headcomponent value="Topics" showSearch={false} />
        </div>

        <div className="p-6">
          <div className="space-y-4">
            {topics.map((topicName, index) => (
              <ClassItem
                key={index}
                name={topicName.name}
                id={topicName.id}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestTopics;
