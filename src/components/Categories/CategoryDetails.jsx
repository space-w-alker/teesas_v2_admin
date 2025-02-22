import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FiMoreVertical } from 'react-icons/fi';
import { FaPlus, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import book from '../../assets/images/book.png';
import Headers from '../common/Headers';
import Headcomponent from '../common/Headcomponent';
import StatCard from '../common/StatCard';
import Custombutton from '../common/Custombutton';
import { useRef } from 'react';
import SuccessModal from '../common/SuccessModal';
import { getCategoryDetailsAsync, selectCategoryDetails, getCategoriesAsync, deleteClassAsync } from '../../apis/slices/categoriesSlice';

const ClassItem = ({ classData, onEdit, onDelete }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="bg-[#F9F9F9] rounded-xl p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gray-50 rounded-lg">
            <img src={book} alt="class" className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900">{classData.name}</h3>
            <button className="mt-2 px-4 py-1 rounded-full text-sm font-medium bg-[#27AE60] text-white">
              Active
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
                onClick={() => navigate(`/classes/${classData.id}/subjects`)}
              >
                View Subjects
              </button>
              <button
                className="w-full px-4 py-2 text-left hover:bg-gray-50"
                onClick={() => onEdit(classData)}
              >
                Edit
              </button>
              <button
                className="w-full px-4 py-2 text-left text-red-500 hover:bg-gray-50"
                onClick={() => onDelete(classData.id)}
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

const CategoryDetails = ({ isOpen }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, isLoading } = useSelector(selectCategoryDetails);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedClassId, setSelectedClassId] = useState(null);

  const isInitialMount = useRef(true);
  const limit = 10;

  // Initial mount fetch
  useEffect(() => {
    if (isInitialMount.current) {
      dispatch(getCategoryDetailsAsync(id, 1, limit, ''));
      isInitialMount.current = false;
    }
  }, []);

  // Pagination effect
  useEffect(() => {
    if (!isInitialMount.current && currentPage > 1) {
      dispatch(getCategoryDetailsAsync(id, currentPage, limit, searchTerm));
    }
  }, [currentPage]);

  // Search effect
  useEffect(() => {
    if (!isInitialMount.current && searchTerm !== '') {
      const delayDebounceFn = setTimeout(() => {
        setCurrentPage(1);
        dispatch(getCategoryDetailsAsync(id, 1, limit, searchTerm));
      }, 800);
      return () => clearTimeout(delayDebounceFn);
    }
  }, [searchTerm]);

  const handleSearch = (value) => {
    setSearchTerm(value);
    if (!value.trim()) {
      // Reset to initial data when search is cleared
      dispatch(getCategoryDetailsAsync(id, 1, limit, ''));
    }
  };

  const handleAddClass = () => {
    navigate(`/categories/${id}/add-class`, {
      state: { categoryName: data?.name }
    });
  };

  const handleEditClass = (classData) => {
    navigate(`/categories/${id}/edit-class`, {
      state: {
        isEdit: true,
        classId: classData.id,
        className: classData.name,
        categoryName: data?.name
      }
    });
  };

  const handleDeleteClass = (classId) => {
    setSelectedClassId(classId);
    setShowDeleteModal(true);
  };

  const handleReload = () => {
    setSearchTerm('');
    setCurrentPage(1);
    dispatch(getCategoriesAsync(1, limit, ''));
  };

  // Update the handleDeleteConfirm function
  const handleDeleteConfirm = async () => {
    const result = await dispatch(deleteClassAsync(selectedClassId));
    if (result) {
      setShowDeleteModal(false);
      // Refresh the classes list after successful deletion
      dispatch(getCategoryDetailsAsync(id, currentPage, limit, searchTerm));
    }
  };


  return (
    <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""}`}>
      <Headers value1="Home" value2="Category Details" />

      <div className="mt-6 mb-8">
        <h1 className="text-xl text-gray-900 cursor-pointer hover:text-[#27AE60] transition-colors"
          onClick={handleReload}
        >Classes</h1>
      </div>

      <div className="bg-[#E9FDEE] rounded-xl p-6 mt-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#FFFFFF] flex items-center justify-center">
            <span className="text-[#27AE60] font-medium text-xl">{data?.name?.[0]}</span>
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">{data?.name}</h2>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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

      <div className="bg-white rounded-xl p-6">
        <Headcomponent
          value="Classes"
          showSearch={true}
          onSearch={handleSearch}
          searchValue={searchTerm}
          onClear={() => {
            setSearchTerm('');
            setCurrentPage(1);
            dispatch(getCategoryDetailsAsync(id, 1, limit, ''));
          }}
        />

        <div className="space-y-4 mt-6">
          {isLoading ? (
            <div className="flex justify-center items-center min-h-[200px]">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#27AE60]"></div>
            </div>
          ) : data?.classes?.length > 0 ? (
            data.classes.map((classData) => (
              <ClassItem
                key={classData.id}
                classData={classData}
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

        <div className="flex justify-between items-center mt-6">
          <Custombutton
            value="Previous"
            icon={<FaArrowLeft />}
            backgroundcolor="bg-[#F2F2F2]"
            textcolor="text-[#000000]"
            imagePosition="left"
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
          />

          <Custombutton
            value={`Page ${currentPage} of ${data?.pagination?.totalPages || 1}`}
            backgroundcolor="bg-[#F2F2F2]"
            textcolor="text-[#000000]"
          />
          <Custombutton
            value="Next"
            icon={<FaArrowRight />}
            backgroundcolor="bg-[#F2F2F2]"
            textcolor="text-[#000000]"
            imagePosition="right"
            onClick={() => {
              if (currentPage < data?.pagination?.totalPages) {
                setCurrentPage(prev => prev + 1);
              }
            }}
            disabled={currentPage >= data?.pagination?.totalPages}
          />


        </div>
      </div>

      <SuccessModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        type="caution"
        title="Delete Class"
        message="Are you sure you want to delete this class?"
        buttonText="Delete"
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};
export default CategoryDetails;
