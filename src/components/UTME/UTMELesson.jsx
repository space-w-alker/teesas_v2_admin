import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCategoryDetailsAsync, selectCategoryDetails } from '../../apis/slices/categoriesSlice';
import Headers from '../common/Headers';
import Headcomponent from '../common/Headcomponent';
import SuccessModal from '../common/SuccessModal';
import bookopen from '../../assets/images/bookopen.png';
import Custombutton from '../common/Custombutton';
import StatCard from '../common/StatCard';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';


const ClassItem = ({ name, id, onDelete }) => {
  const navigate = useNavigate();

  const handleAddSubject = () => {
    navigate('/create-new-subject', {
      state: {
        classId: id,
        mode: 'create'
      }
    });
  };

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
          onClick={() => navigate('/add-subject-utme', {
            state: {
              classId: id,
              className: name
            }
          })}
          className="text-[#27AE60] hover:text-[#219652] font-medium"
        >
          View Subjects
        </button>

        <button
          onClick={handleAddSubject}
          className="text-[#27AE60] hover:text-[#219652] font-medium"
        >
          Add Subject
        </button>


      </div>
    </div>
  );
};

const UTMELesson = ({ isOpen }) => {
  const dispatch = useDispatch();
  const { data: categoryData, isLoading } = useSelector(selectCategoryDetails);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);

  useEffect(() => {
    dispatch(getCategoryDetailsAsync(163));
  }, [dispatch]);

  if (isLoading || !categoryData?.classes) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""}`}>
      <Headers value1="Home" value2="Classes" />

      <div className="p-6 border-b border-gray-100">
        <div className="flex justify-between items-center">
          <Headcomponent value="Classes Management" showSearch={false} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard title="Total Subject" count={categoryData.totalSubjects} />
        <StatCard title="Total Chapter" count={categoryData.totalChapters} />
        <StatCard title="Total Topics" count={categoryData.totalLessons} />

      </div>

      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b border-gray-100">
          <Headcomponent value="Classes List" showSearch={false} />
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {categoryData.classes.map((classItem) => (
              <ClassItem
                key={classItem.id}
                id={classItem.id}
                name={classItem.name}
                onDelete={(name) => {
                  setSelectedClass(name);
                  setShowDeleteModal(true);
                }}
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
        message={`Are you sure you want to delete ${selectedClass}?`}
        buttonText="Delete"
      />
    </div>
  );
};
export default UTMELesson;