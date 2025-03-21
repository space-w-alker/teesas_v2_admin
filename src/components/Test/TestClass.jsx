import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Headers from '../common/Headers';
import Headcomponent from '../common/Headcomponent';
import StatCard from '../common/StatCard';
import Custombutton from '../common/Custombutton';
import bookopen from '../../assets/images/bookopen.png';
import { getCategoryDetailsAsync } from '../../apis/slices/categoriesSlice';

const ClassItem = ({ name, id }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#F9F9F9] rounded-xl p-4 flex items-center justify-between hover:shadow-md transition-shadow cursor-pointer">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-white rounded-lg">
          <img src={bookopen} alt="book" className="w-6 h-6" />
        </div>
        <span className="font-medium text-gray-800">{name}</span>
      </div>
      <Custombutton
        value="Next"
        onClick={() => navigate('/test-subject', { state: { id } })}
        textcolor="text-[#27AE60]"
        backgroundcolor="bg-transparent"
        extraStyle="hover:bg-green-50"
      />
    </div>
  );
};

const TestClass = ({ isOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const limit = 10;
  const classId = location.state?.id || null;
  const classes = useSelector((state) => state.categories?.details?.data?.classes || []);

  const { data: data, totalSubjects, totalChapters, totalLessons, pagination } = useSelector(
    (state) => state.categories?.details?.data || { totalSubjects: 0, totalChapters: 0, totalLessons: 0, pagination: { total: 0, page: 1, limit: 10, totalPages: 1 } }
  );

  useEffect(() => {
    if (classId) {
      dispatch(getCategoryDetailsAsync(classId, page, limit, searchTerm));
    }
  }, [dispatch, classId, page, limit, searchTerm]);

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > pagination.totalPages) return;
    setPage(newPage);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""} transition-all duration-300`}>
      <Headers value1="Home" value2="Test" value3="Classes" />



      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
        <StatCard title="Total Subjects" count={totalSubjects} />
        <StatCard title="Total Chapters" count={totalChapters} />
        <StatCard title="Total Lessons" count={totalLessons} />
      </div>

      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b border-gray-100">
          <Headcomponent value="Classes" showSearch={true} onSearch={setSearchTerm} />
        </div>

        <div className="p-6">
          <div className="space-y-4">
            {classes?.length > 0 ? (
              classes?.map((className, index) => (
                <ClassItem
                  key={index}
                  name={className.name}
                  id={className.id}
                />
              ))
            ) : (
              <div className="text-center text-gray-600">No classes found</div>
            )}
          </div>
          <div className="flex justify-between mt-4">
            <Custombutton
              value="Previous"
              onClick={() => handlePageChange(page - 1)}
              disabled={page <= 1}
              textcolor="text-[#000000]"
              backgroundcolor="bg-[#F2F2F2]"
            />
            <span className="text-gray-600">Page {page} of {pagination.totalPages}</span>
            <Custombutton
              value="Next"
              onClick={() => handlePageChange(page + 1)}
              disabled={page >= pagination.totalPages}
              textcolor="text-[#000000]"
              backgroundcolor="bg-[#F2F2F2]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestClass;
