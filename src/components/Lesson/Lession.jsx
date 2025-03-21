import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Headers from '../common/Headers';
import Headcomponent from '../common/Headcomponent';
import bookopen from '../../assets/images/bookopen.png';
import StatCard from '../common/StatCard';
import Custombutton from '../common/Custombutton';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { getCategoriesAsync, selectCategories } from '../../apis/slices/categoriesSlice';

const CategoryItem = ({ name, onNext }) => (
  <div className="bg-[#F9F9F9] rounded-xl p-4 flex items-center justify-between hover:shadow-md transition-shadow">
    <div className="flex items-center gap-4">
      <div className="p-3 bg-white rounded-lg">
        <img src={bookopen} alt="book" className="w-6 h-6" />
      </div>
      <span className="font-medium text-gray-800">{name}</span>
    </div>
    <button
      onClick={onNext}
      className="px-4 py-2 text-[#27AE60] hover:text-[#219652] transition-colors font-medium"
    >
      Next
    </button>
  </div>
);

const Lession = ({ isOpen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: categories, stats, isLoading, error } = useSelector(selectCategories);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
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
    if (categories?.length === limit) {
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

  if (isLoading && isInitialMount.current) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (error) return <div className="text-red-500 p-4">{error}</div>;

  return (
    <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""} transition-all duration-300`}>
      <Headers value1="Home" value2="Lesson" />

      <div className="p-6 border-b border-gray-100">
        <div className="flex justify-between items-center">
          <h1 className="text-xl text-gray-900 cursor-pointer hover:text-[#27AE60] transition-colors"
            onClick={handleReload}
          >Lessons</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
        <StatCard title="Total Categories" count={stats?.totalCourses || 0} />
        <StatCard title="Total Grades" count={stats?.totalClasses || 0} />
        <StatCard title="Total Subjects" count={stats?.totalSubjects || 0} />
        <StatCard title="Total Chapters" count={stats?.totalChapters || 0} />
      </div>

      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b">
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
        </div>
        <div className="p-6">
          {isLoading ? (
            <div className="flex justify-center items-center min-h-[200px]">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#27AE60]"></div>
            </div>
          ) : (
            <div className="space-y-4">
              {categories?.map((category) => (
                <CategoryItem
                  key={category.id}
                  name={category.name}
                  onNext={() => navigate('/classes', { state: { category } })}
                />
              ))}
              {!isLoading && (!categories || categories.length === 0) && (
                <div className="text-center py-8">
                  <p className="text-gray-500">No categories found</p>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex justify-between items-center p-6 border-t">
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
            disabled={!categories || categories.length < limit}
          />
        </div>
      </div>
    </div>
  );
};

export default Lession;
