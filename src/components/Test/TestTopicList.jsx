import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import Headers from '../common/Headers';
import Headcomponent from '../common/Headcomponent';
import StatCard from '../common/StatCard';
import Custombutton from '../common/Custombutton';
import bookopen from '../../assets/images/bookopen.png';
import sharp from '../../assets/images/sharp.png';
import { FaPlus } from 'react-icons/fa';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import Modal from "../common/Modal";
import { useDispatch, useSelector } from "react-redux";
import { getTopicsListAsync } from "../../apis/slices/categoriesSlice";
const TopicItem = ({ name, navigate, status, topic }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div
      onClick={() => navigate('/test-detail', { state: { id: topic.id, name } })}
      className="bg-[#F9F9F9] rounded-xl p-4 flex items-center justify-between hover:shadow-md transition-shadow cursor-pointer"
    >
      <div className="flex items-center gap-4">
        <div className="p-3 bg-white rounded-lg">
          <img src={bookopen} alt="book" className="w-6 h-6" />
        </div>
        <span className="font-medium text-gray-800">{name}</span>
      </div>
      <div className="flex gap-4 items-center">
        <Custombutton
          value="View"
          onClick={(e) => {
            e.stopPropagation();
            navigate('/test-detail', { state: { id: topic.id, name, topic } });
          }}
          backgroundcolor="bg-[#27AE60]"
          textcolor="text-white"
          extraStyle="hover:bg-blue-600"
        />

        <Custombutton
          value="Add Bulk Practice and Mock Test"
          onClick={(e) => {
            e.stopPropagation();
            setShowModal(true);
          }}
          backgroundcolor="bg-[#27AE60]"
          textcolor="text-white"
          extraStyle="hover:bg-green-50"
        />

        <Custombutton
          value={
            <div className="flex items-center gap-2">
              <div className="flex">
                <img src={sharp} alt="sharp" className="w-4 h-4" />
              </div>
              <span>{status ? "Active" : "Hidden"}
              </span>
            </div>
          }
          onClick={(e) => {
            e.stopPropagation();
            navigate('/test-detail', { state: { id: topic.id, name, topic } });
          }}
          textcolor="text-blue-600"
          backgroundcolor="bg-green-50"
          extraStyle="px-4 py-2 rounded-lg"
        />
      </div>

      {showModal && (
        <Modal
          label="ADD MEDIA"
          closeModal={() => setShowModal(false)}
          value1="Add MCQ Questions"
          value2="Add Theory Questions"
          addSingleButton={() => navigate('/upload-questions', {
            state: {
              questionType: 'mcq',
              topic: name,
              id: topic.id,
              category: 'Mathematics', // This would come from your API
              grade: 'Grade 8'  // This would come from your API
            }
          })}
          addMutipleButton={() => navigate('/upload-questions', {
            state: {
              questionType: 'theory',
              topic: name,
              id: topic.id,
              category: 'Mathematics', // This would come from your API
              grade: 'Grade 8'  // This would come from your API
            }
          })}
        />
      )}
    </div>
  );
};
const TestTopicList = ({ isOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [sort, setSort] = useState({
    data: "",
    filterList: "",  // Filters applied
    sort: "",
    search: "",
    page: 1,
    limit: 100
  });
  const handleSearchChange = (e) => {
    setSort((prevSort) => ({ ...prevSort, search: e.target.value }));
  };

  const id = location.state.id || {};
  const topics = useSelector((state) => state.categories?.topics?.data?.lessons || []);
  console.log('topic', id, useSelector((state) => state.categories?.topics));

  useEffect(() => {
    dispatch(getTopicsListAsync(id)).then(() => setLoading(false));
  }, [dispatch])


  return (
    <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""} transition-all duration-300`}>
      <Headers value1="Home" value2="Practice Subjects" value3="Test" />

      <div className="p-6 border-b border-gray-100">
        <div className="flex justify-between items-center">
          <Headcomponent value="Test" showSearch={false} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
        <StatCard title="Total Topics" count={topics.length.toString()} />
        <StatCard title="Total Lessons" count="25" />
        <StatCard title="Total Questions" count="100" />
        <StatCard title="Total Resources" count="50" />
      </div>

      <div className="flex justify-end mb-6">

      </div>

      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b border-gray-100">
          <Headcomponent value="Topic List" showSearch={true} onSearchChange={handleSearchChange} />
        </div>

        <div className="p-6">
          <div className="space-y-4">
            {topics.map((topic, index) => (
              <TopicItem
                key={index}
                name={topic.name}
                status={topic.active}
                topic={topic}
                navigate={navigate}
              />
            ))}
          </div>
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
          />
          <span className="text-gray-600">Page 1 of 5</span>
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
          />
        </div>
      </div>
    </div>
  );
};

export default TestTopicList;