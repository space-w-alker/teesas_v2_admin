import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getUniversitiesAsync } from '../../apis/slices/universitySlice';
import Headers from '../common/Headers';
import Headcomponent from '../common/Headcomponent';
import StatCard from '../common/StatCard';
import Custombutton from '../common/Custombutton';
import bookopen from '../../assets/images/bookopen.png';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { TailSpin } from "react-loader-spinner";
import { toast } from 'react-toastify';

const UniversityItem = ({ name, id, navigate }) => (
  <div
    className="bg-gray-50 rounded-xl p-4 flex items-center justify-between hover:shadow-md transition-shadow cursor-pointer"
    onClick={() => navigate('/university-subjects', { state: { universityId: id, universityName: name } })}
  >
    <div className="flex items-center gap-4">
      <div className="p-3 bg-white rounded-lg">
        <img src={bookopen} alt="book" className="w-6 h-6" />
      </div>
      <span className="font-medium text-gray-800">{name}</span>
    </div>
    <div className="flex gap-4 items-center" onClick={(e) => e.stopPropagation()}>
      {/* <Custombutton
        value="Add Subject"
        onClick={() => navigate('/university-subjects', { state: { universityId: id, universityName: name } })}
        textcolor="text-[#27AE60]"
        backgroundcolor="bg-transparent"
        extraStyle="font-medium"
      /> */}
      <Custombutton
        value="Delete"
        onClick={() => { }}
        hidden={true}
        textcolor="text-red-600"
        backgroundcolor="bg-transparent"
        extraStyle="font-medium"
      />
    </div>
  </div>
);


const UniversityList = ({ isOpen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [universities, setUniversities] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1
  });

  const token = localStorage.getItem("authToken");

  useEffect(() => {
    fetchUniversities();
  }, [currentPage]);

  const fetchUniversities = () => {
    setIsLoading(true);

    dispatch(getUniversitiesAsync(currentPage, 10))
      .then(result => {
        setIsLoading(false);

        if (result?.status === 200) {
          setUniversities(result.data.universities || []);
          setPagination(result.data.pagination || {
            page: 1,
            limit: 10,
            total: 0,
            totalPages: 1
          });
        } else {
          toast.error(result?.message || "Failed to fetch universities");
        }
      })
      .catch(error => {
        setIsLoading(false);
        toast.error("Error fetching universities");
      });
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < pagination.totalPages) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  return (
    <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""} transition-all duration-300`}>
      <Headers value1="Home" value2="University List" />

      {isLoading && (
        <div style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 9999,
        }}>
          <TailSpin color="orange" radius={5} />
        </div>
      )}

      <div className="p-6 border-b border-gray-100">
        <div className="flex justify-between items-center">
          <Headcomponent value="University List" showSearch={false} />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
        <StatCard title="Total Universities" count={pagination.total.toString()} />
        <StatCard title="Total Subjects" count="20" />
        <StatCard title="Total PDF Uploaded" count="150" />
      </div>

      <div className="flex justify-end mb-6">
        <Custombutton
          value="Export Excel"
          onClick={() => { }}
          textcolor="text-white"
          backgroundcolor="bg-[#27AE60]"
          hidden={true}
          extraStyle="hover:bg-[#219652]"
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b border-gray-100">
          <Headcomponent value="Universities" showSearch={false} />
        </div>

        <div className="p-6">
          {universities && universities.length > 0 ? (
            <div className="space-y-4">
              {universities.map((university) => (
                <UniversityItem
                  key={university.id}
                  id={university.id}
                  name={university.name}
                  navigate={navigate}
                />
              ))}
            </div>
          ) : !isLoading ? (
            <div className="text-center py-8 text-gray-500">
              No universities found
            </div>
          ) : null}
        </div>

        {pagination.totalPages > 1 && (
          <div className="p-6 border-t border-gray-100 flex justify-between items-center">
            <Custombutton
              value="Previous"
              icon={<FaArrowLeft />}
              backgroundcolor="bg-[#F2F2F2]"
              textcolor={currentPage <= 1 ? "text-[#cccccc]" : "text-[#000000]"}
              imagePosition="left"
              onClick={handlePrevPage}
              disabled={currentPage <= 1}
            />

            <span className="text-gray-600">Page {pagination.page} of {pagination.totalPages}</span>

            <Custombutton
              value="Next"
              icon={<FaArrowRight />}
              backgroundcolor="bg-[#F2F2F2]"
              textcolor={currentPage >= pagination.totalPages ? "text-[#cccccc]" : "text-[#000000]"}
              imagePosition="right"
              onClick={handleNextPage}
              disabled={currentPage >= pagination.totalPages}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default UniversityList;