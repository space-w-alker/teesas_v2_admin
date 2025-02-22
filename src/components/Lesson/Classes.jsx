import React, { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Headers from '../common/Headers';
import Headcomponent from '../common/Headcomponent';
import bookopen from '../../assets/images/bookopen.png';
import StatCard from '../common/StatCard';
import { getCategoryDetailsAsync } from '../../apis/slices/categoriesSlice';

const ClassItem = ({ classData }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-[#F9F9F9] rounded-xl p-4 flex items-center justify-between hover:shadow-md transition-shadow">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-white rounded-lg">
          <img src={bookopen} alt="book" className="w-6 h-6" />
        </div>
        <span className="font-medium text-gray-800">{classData.name}</span>
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate(`/class/${classData.id}/subjects`)}
          className="px-4 py-2 text-[#27AE60] hover:text-[#219652] transition-colors font-medium"
        >
          View Subjects
        </button>
        <button
          onClick={() => navigate(`/categories/${classData.categoryId}/edit-class/${classData.id}`)}
          className="px-4 py-2 text-blue-600 hover:text-blue-700 transition-colors font-medium"
        >
          Edit
        </button>
      </div>
    </div>
  );
};

const Classes = ({ isOpen }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { category } = location.state || {};
  const { data, isLoading } = useSelector(state => state.categories.details);

  useEffect(() => {
    if (category?.id) {
      dispatch(getCategoryDetailsAsync(category.id));
    }
  }, [dispatch, category]);

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""} transition-all duration-300`}>
      <Headers value1="Home" value2="Classes" />

      <div className="p-6 border-b border-gray-100">
        <div className="flex justify-between items-center">
          <Headcomponent value="Lessons" showSearch={false} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
        <StatCard title="Total Classes" count={data?.classes?.length || 0} />
        <StatCard title="Total Grade" count={data?.totalGrades || 0} />
        <StatCard title="Total subject" count={data?.totalSubjects || 0} />
        <StatCard title="Total Chapter" count={data?.totalChapters || 0} />
      </div>

      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b border-gray-100">
          <Headcomponent value="Classes List" showSearch={false} />
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {data?.classes?.map((classData) => (
              <ClassItem
                key={classData.id}
                classData={{
                  ...classData,
                  categoryId: category?.id
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Classes;
