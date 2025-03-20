import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Headers from '../common/Headers';
import Headcomponent from '../common/Headcomponent';
import StatCard from '../common/StatCard';
import Custombutton from '../common/Custombutton';
import bookopen from '../../assets/images/bookopen.png';
import { getCategoriesAsync } from "../../apis/slices/categoriesSlice";
import { useDispatch, useSelector } from "react-redux";

const CategoryItem = ({ name, onNext }) => (
  <div className="bg-[#F9F9F9] rounded-xl p-4 flex items-center justify-between hover:shadow-md transition-shadow cursor-pointer">
    <div className="flex items-center gap-4">
      <div className="p-3 bg-white rounded-lg">
        <img src={bookopen} alt="book" className="w-6 h-6" />
      </div>
      <span className="font-medium text-gray-800">{name}</span>
    </div>
    <Custombutton
      value="Next"
      onClick={onNext}
      textcolor="text-[#27AE60]"
      backgroundcolor="bg-transparent"
      extraStyle="hover:bg-green-50"
    />
  </div>
);

const Test = ({ isOpen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const category = useSelector((state) => state.categories.list || []);
  console.log(category);

  useEffect(() => {
    dispatch(getCategoriesAsync(page, 10, search)).then(() => setLoading(false));
  }, [dispatch, page, search]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1); // Reset to first page on new search
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""} transition-all duration-300`}>
      <Headers value1="Home" value2="Test" value3="Categories" />

      <div className="p-6 border-b border-gray-100">
        <div className="flex justify-between items-center">
          <Headcomponent value="Test Categories" showSearch={false} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
        <StatCard title="Total Categories" count={category?.stats?.totalCourses} />
        <StatCard title="Total Grades" count={category?.stats?.totalClasses} />
        <StatCard title="Total Subjects" count={category?.stats?.totalSubjects} />
        <StatCard title="Total Chapters" count={category?.stats?.totalChapters} />
      </div>

      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b border-gray-100">
          <Headcomponent value="Categories" showSearch={true} onSearch={setSearch} />
          {/* <input
            type="text"
            placeholder="Search categories..."
            value={search}
            onChange={handleSearchChange}
            className="mt-2 p-2 border rounded"
          /> */}
        </div>

        <div className="p-6">
          <div className="space-y-4">
            {category?.data?.map((category, index) => (
              <CategoryItem
                key={index}
                name={category.name}
                onNext={() => navigate('/test-class', { state: { name: category.name, classes: category.classes } })}
              />
            ))}
          </div>
          <div className="flex justify-between mt-4">
            <Custombutton
              value="Previous"
              onClick={() => handlePageChange(page - 1)}
              disabled={page <= 1}
              textcolor="text-[#000000]"
              backgroundcolor="bg-[#F2F2F2]"
            />
            <span className="text-gray-600">Page {page} of {Math.ceil((category?.stats?.totalCourses || 0) / 10)}</span>
            <Custombutton
              value="Next"
              onClick={() => handlePageChange(page + 1)}
              disabled={page >= (category?.stats?.totalPages || 1)}
              textcolor="text-[#000000]"
              backgroundcolor="bg-[#F2F2F2]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Test;
