import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FiMoreVertical } from 'react-icons/fi';
import { FaPlus } from 'react-icons/fa';
import book from '../../assets/images/book.png';
import Headers from '../common/Headers';
import Headcomponent from '../common/Headcomponent';
import StatCard from '../common/StatCard';
import Modal from '../common/Modal';
import SuccessModal from '../common/SuccessModal';
import Custombutton from '../common/Custombutton';
import { useRef } from 'react';
import { getCategoriesAsync, selectCategories, deleteCategoryAsync } from '../../apis/slices/categoriesSlice';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
const CategoryCard = ({ category }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const isMatric = category.name.toLowerCase().includes('matric');

  const handleEdit = () => {
    setShowDropdown(false);
    navigate('/categories/add-category', {
      state: {
        isEdit: true,
        categoryData: category
      }
    });
  };

  const handleDelete = () => {
    setShowDropdown(false);
    setShowDeletePopup(true);
  };

  const handleDeleteConfirm = () => {
    console.log('Deleting category with ID:', category.id);
    dispatch(deleteCategoryAsync(category.id)).then((success) => {
      console.log('Delete operation result:', success);
      if (success) {
        setShowDeletePopup(false);
      }
    });
  };

  const handleView = () => {
    if (isMatric) {
      navigate('/utme-lesson');
    } else {
      navigate(`/categories/details/${category.id}`);
    }
  };

  return (
    <div className={`
      bg-[#F9F9F9] rounded-xl p-6 relative
      ${isMatric ? 'border-2 border-blue-200' : ''}
    `}>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gray-50 rounded-lg">
            <img src={book} alt="category" className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900">{category.name}</h3>
            <button className={`mt-2 px-4 py-1 rounded-full text-sm font-medium ${category.active ? 'bg-[#27AE60] text-white' : 'bg-red-500 text-white'
              }`}>
              {category.active ? 'Published' : 'Inactive'}
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
                onClick={handleView}
              >
                {isMatric ? 'View UTME Courses' : 'View Class'}
              </button>

              <button
                className="w-full px-4 py-2 text-left hover:bg-gray-50"
                onClick={handleEdit}
              >
                Edit
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
          <p className="text-sm text-gray-500">Classes</p>
          <p className="font-medium">{category.totalClasses}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Subjects</p>
          <p className="font-medium">{category.totalSubjects}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Chapters</p>
          <p className="font-medium">{category.totalChapters}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Lessons</p>
          <p className="font-medium">{category.totalLessons}</p>
        </div>
      </div>

      {showSuccessPopup && (
        <SuccessModal
          isOpen={showSuccessPopup}
          onClose={() => setShowSuccessPopup(false)}
          type="success"
          title="SUCCESS!"
          message="Successfully Updated"
        />
      )}

      {showDeletePopup && (
        <SuccessModal
          isOpen={showDeletePopup}
          onClose={() => setShowDeletePopup(false)}
          type="caution"
          title="CAUTION!"
          message="You're about to delete this item"
          buttonText="Yes"
          onConfirm={handleDeleteConfirm}
        />
      )}
    </div>
  );
};

const Categories = ({ isOpen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, data, stats, error } = useSelector(selectCategories);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const isInitialMount = useRef(true);
  const limit = 10;


  // Initial mount fetch
  useEffect(() => {
    if (isInitialMount.current) {
      dispatch(getCategoriesAsync(1, limit, ''));
      isInitialMount.current = false;
    }
  }, []);

  // Pagination effect
  useEffect(() => {
    if (!isInitialMount.current && currentPage > 1) {
      dispatch(getCategoriesAsync(currentPage, limit, searchTerm));
    }
  }, [currentPage]);

  // Search effect
  useEffect(() => {
    if (!isInitialMount.current && searchTerm !== '') {
      const delayDebounceFn = setTimeout(() => {
        setCurrentPage(1);
        dispatch(getCategoriesAsync(1, limit, searchTerm));
      }, 800);
      return () => clearTimeout(delayDebounceFn);
    }
  }, [searchTerm]);

  const handleReload = () => {
    setSearchTerm('');
    setCurrentPage(1);
    dispatch(getCategoriesAsync(1, limit, ''));
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
      dispatch(getCategoriesAsync(currentPage - 1, limit, searchTerm));
    }
  };

  const handleNextPage = () => {
    if (data?.length === limit) {
      setCurrentPage(prev => prev + 1);
      dispatch(getCategoriesAsync(currentPage + 1, limit, searchTerm));
    }
  };

  const handleSearch = (value) => {
    const sanitizedValue = value.trim().replace(/[^a-zA-Z\s]/g, '');
    setSearchTerm(sanitizedValue);
    if (!sanitizedValue) {
      setCurrentPage(1);
      dispatch(getCategoriesAsync(1, limit, ''));
    }
  };

  return (
    <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""}`}>
      <Headers value1="Home" value2="Categories" />

      <div className="mt-6 mb-8">
        <h1 className="text-xl text-gray-900 cursor-pointer hover:text-[#27AE60] transition-colors"
          onClick={handleReload}
        >Categories</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
        <StatCard title="Total Categories" count={stats?.totalCourses || 0} />
        <StatCard title="Total Grades" count={stats?.totalClasses || 0} />
        <StatCard title="Total Subjects" count={stats?.totalSubjects || 0} />
        <StatCard title="Total Chapters" count={stats?.totalChapters || 0} />
      </div>

      <div className="flex justify-end mb-6">
        <Custombutton
          value={
            <div className="flex items-center gap-2">
              <FaPlus />
              <span>Add Category</span>
            </div>
          }
          backgroundcolor="bg-[#27AE60]"
          textcolor="text-white"
          onClick={() => setShowModal(true)}
        />
      </div>

      <div className="bg-white rounded-xl p-6">
        <Headcomponent
          value="Categories"
          showSearch={true}
          onSearch={handleSearch}
          searchValue={searchTerm}
          onClear={() => {
            setSearchTerm('');
            setCurrentPage(1);
            dispatch(getCategoriesAsync(1, limit, ''));
          }}
        />
        {isLoading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#27AE60]"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data?.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        )}
        {!isLoading && data?.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No categories found</p>
          </div>
        )}

        <div className="flex justify-between items-center mt-6">
          <Custombutton
            value="Previous"
            icon={<FaArrowLeft />}
            backgroundcolor="bg-[#F2F2F2]"
            textcolor="text-[#000000]"
            imagePosition="left"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          />

          <Custombutton
            value={`Page ${currentPage}`}
            backgroundcolor="bg-[#F2F2F2]"
            textcolor="text-[#000000]"
          />

          <Custombutton
            value="Next"
            icon={<FaArrowRight />}
            backgroundcolor="bg-[#F2F2F2]"
            textcolor="text-[#000000]"
            imagePosition="right"
            onClick={handleNextPage}
            disabled={!data || data.length < limit}
          />
        </div>
      </div>

      {showModal && (
        <Modal
          closeModal={() => setShowModal(false)}
          label="Add Category"
          value1="Add Unit Category"
          value2="Upload Bulk Category"
          addSingleButton={() => {
            navigate('/categories/add-category');
          }}
          addMutipleButton={() => {
            navigate('/categories/upload-bulk');
          }}
        />
      )}
    </div>
  );
}; export default Categories;
