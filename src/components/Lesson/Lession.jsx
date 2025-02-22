import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Headers from '../common/Headers';
import Headcomponent from '../common/Headcomponent';
import bookopen from '../../assets/images/bookopen.png';
import StatCard from '../common/StatCard';
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

  useEffect(() => {
    dispatch(getCategoriesAsync());
  }, [dispatch]);

  if (isLoading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (error) return <div className="text-red-500 p-4">{error}</div>;

  return (
    <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""} transition-all duration-300`}>
      <Headers value1="Home" value2="Lesson" />

      <div className="p-6 border-b border-gray-100">
        <div className="flex justify-between items-center">
          <Headcomponent value="Lessons" showSearch={false} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
        <StatCard title="Total Categories" count={stats?.totalCourses || 0} />
        <StatCard title="Total Grades" count={stats?.totalClasses || 0} />
        <StatCard title="Total Subjects" count={stats?.totalSubjects || 0} />
        <StatCard title="Total Chapters" count={stats?.totalChapters || 0} />
      </div>

      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b ">
          <Headcomponent value="Categories" showSearch={false} />
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {categories?.map((category) => (
              <CategoryItem
                key={category.id}
                name={category.name}
                onNext={() => navigate('/classes', { state: { category } })}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lession;
