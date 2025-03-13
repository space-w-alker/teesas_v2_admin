import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import Headers from '../common/Headers';
import Headcomponent from '../common/Headcomponent';
import StatCard from '../common/StatCard';
import Custombutton from '../common/Custombutton';
import book from '../../assets/images/book.png';
import { getPromocodesAsync, getPromocodesResponse } from '../../apis/slices/promocodeSlice';

const PromoCodeItem = ({ code, status, category, onView }) => {
  return (
    <div className="bg-white rounded-xl p-4 flex items-center justify-between hover:shadow-md transition-shadow">
      <div
        className="flex items-center gap-4 cursor-pointer"
        onClick={onView}
      >
        <div className="p-3 bg-gray-50 rounded-lg">
          <img src={book} alt="book" className="w-6 h-6" />
        </div>
        <div className="flex flex-col">
          <span className="font-medium text-gray-800">{code}</span>
          <span className="text-blue-500 text-sm">{category || 'Coupon Categories'}</span>
        </div>
      </div>
      <div className="flex gap-4 items-center">
        <Custombutton
          value={status ? 'Visible' : 'Hidden'}
          textcolor={status ? "text-blue-400" : "text-red-400"}
          backgroundcolor={status ? "bg-green-100" : "bg-red-100"}
          width="w-[100px]"
        />
      </div>
    </div>
  );
};

const PromoCodes = ({ isOpen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const promocodesData = useSelector(getPromocodesResponse);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [promocodes, setPromocodes] = useState([]);
  const [totalActive, setTotalActive] = useState(0);

  useEffect(() => {
    fetchPromocodes();
  }, [currentPage]);

  const fetchPromocodes = () => {
    setLoading(true);
    const token = localStorage.getItem('token');

    getPromocodesAsync({
      dispatch,
      data: {},
      token,
      callbackFn: (response) => {
        setLoading(false);
        if (response?.data?.status === 200) {
          const data = response.data.data;
          setPromocodes(data.promocodes || []);
          setTotalPages(data.totalPages || 1);
          setTotalActive(data.totalActive || 0);
        }
      }
    });
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleViewPromocode = (id) => {
    navigate(`/promo-code-details/${id}`);
  };

  return (
    <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""} transition-all duration-300`}>
      <Headers value1="Home" value2="Promo Codes" />

      <div className="mt-6">
        <StatCard title="Total Active Promo Codes" count={totalActive.toString()} />
      </div>

      <div className="flex justify-end mb-6">
        <Custombutton
          value={
            <div className="flex items-center gap-2">
              <FaPlus className="text-white" />
              <span>Add Promo Code</span>
            </div>
          }
          onClick={() => navigate('/add-promo-code')}
          textcolor="text-white"
          backgroundcolor="bg-[#27AE60]"
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b border-gray-100">
          <Headcomponent value="Promo Code List" showSearch={true} />
        </div>
        <div className="p-6">
          {loading ? (
            <div className="py-4 text-center">Loading promo codes...</div>
          ) : (
            <div className="space-y-4">
              {promocodes.length > 0 ? (
                promocodes.map((promo, index) => (
                  <PromoCodeItem
                    key={index}
                    code={promo.code}
                    status={promo.isActive}
                    category={promo.category}
                    onView={() => handleViewPromocode(promo.id)}
                  />
                ))
              ) : (
                <div className="py-4 text-center">No promo codes found</div>
              )}
            </div>
          )}
        </div>
        <div className="p-6 border-t border-gray-100 flex justify-between items-center">
          <Custombutton
            value={
              <div className="flex items-center gap-2">
                <FaArrowLeft />
                <span>Previous</span>
              </div>
            }
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            backgroundcolor={currentPage === 1 ? "bg-gray-50" : "bg-gray-100"}
            textcolor={currentPage === 1 ? "text-gray-400" : "text-gray-600"}
            width="w-[100px]"
            extraStyle="py-2"
          />
          <span className="text-gray-600">Page {currentPage} of {totalPages}</span>
          <Custombutton
            value={
              <div className="flex items-center gap-2">
                <span>Next</span>
                <FaArrowRight />
              </div>
            }
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            backgroundcolor={currentPage === totalPages ? "bg-gray-50" : "bg-gray-100"}
            textcolor={currentPage === totalPages ? "text-gray-400" : "text-gray-600"}
            width="w-[80px]"
            extraStyle="py-2"
          />
        </div>
      </div>
    </div>
  );
};

export default PromoCodes;
