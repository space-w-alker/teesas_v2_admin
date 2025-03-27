import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Headers from '../common/Headers';
import Headcomponent from '../common/Headcomponent';
import bookopen from '../../assets/images/bookopen.png';
import StatCard from '../common/StatCard';
import { FaPlus } from 'react-icons/fa';
import SuccessModal from '../common/SuccessModal';
import { getCategoryDetailsAsync, deleteClassAsync } from '../../apis/slices/categoriesSlice';

const ClassItem = ({ classData, onEdit, onDelete }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#F9F9F9] rounded-xl p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white rounded-lg">
            <img src={bookopen} alt="book" className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900">{classData.name}</h3>
            <button className="mt-2 px-4 py-1 rounded-full text-sm font-medium bg-[#27AE60] text-white">
              Active
            </button>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            className="px-4 py-2  transition-colors font-medium"
            onClick={() => navigate(`/class/${classData.id}/subjects`)}
          >
            View Subjects
          </button>
          <button
            className="px-4 py-2  transition-colors font-medium"
            onClick={() => onEdit(classData)}
          >
            Edit
          </button>
          {/* <button
            className="px-4 py-2 text-red-500 hover:text-red-600 transition-colors font-medium"
            onClick={() => onDelete(classData.id)}
          >
            Delete
          </button> */}
        </div>
      </div>
    </div>
  );
};

const Classes = ({ isOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { category } = location.state || {};
  const { data, isLoading } = useSelector(state => state.categories.details);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedClassId, setSelectedClassId] = useState(null);

  useEffect(() => {
    if (category?.id) {
      dispatch(getCategoryDetailsAsync(category.id));
    }
  }, [dispatch, category]);

  const handleAddClass = () => {
    navigate(`/categories/${category.id}/add-class`, {
      state: { categoryName: category?.name }
    });
  };

  const handleEditClass = (classData) => {
    navigate(`/categories/${category.id}/edit-class`, {
      state: {
        isEdit: true,
        classId: classData.id,
        className: classData.name,
        categoryName: category?.name
      }
    });
  };

  const handleDeleteClass = (classId) => {
    setSelectedClassId(classId);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    const result = await dispatch(deleteClassAsync(selectedClassId));
    if (result) {
      setShowDeleteModal(false);
      // Refresh the classes list after successful deletion
      dispatch(getCategoryDetailsAsync(category.id));
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#27AE60]"></div>
      </div>
    );
  }

  return (
    <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""} transition-all duration-300`}>
      <Headers value1="Home" value2="Classes" />

      <div className="bg-[#E9FDEE] rounded-xl p-6 mt-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#FFFFFF] flex items-center justify-center">
            <span className="text-[#27AE60] font-medium text-xl">{category?.name?.[0]}</span>
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">{category?.name}</h2>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
        <StatCard title="Total Classes" count={data?.classes?.length || 0} />
        <StatCard title="Total Subjects" count={data?.totalSubjects || 0} />
        <StatCard title="Total Chapters" count={data?.totalChapters || 0} />
        <StatCard title="Total Lessons" count={data?.totalLessons || 0} />
      </div>

      <div className="flex justify-end mb-6">
        <button
          onClick={handleAddClass}
          className="flex items-center gap-2 px-6 py-3 bg-[#27AE60] text-white rounded-lg"
        >
          <FaPlus /> Add Class
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b border-gray-100">
          <Headcomponent value="Classes List" showSearch={false} />
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {data?.classes?.length > 0 ? (
              data.classes.map((classData) => (
                <ClassItem
                  key={classData.id}
                  classData={{
                    ...classData,
                    categoryId: category?.id
                  }}
                  onEdit={handleEditClass}
                  onDelete={handleDeleteClass}
                />
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No classes found</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* <SuccessModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        type="caution"
        title="Delete Class"
        message="Are you sure you want to delete this class?"
        buttonText="Delete"
        onConfirm={handleDeleteConfirm}
      /> */}
    </div>
  );
};

export default Classes;
