import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaArrowLeft, FaArrowRight, FaSearch, FaTrash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import Headers from '../common/Headers';
import Headcomponent from '../common/Headcomponent';
import StatCard from '../common/StatCard';
import Custombutton from '../common/Custombutton';
import SuccessModal from '../common/SuccessModal';
import book from '../../assets/images/book.png';
import { TailSpin } from "react-loader-spinner";
import {
  getPromocodesAsync,
  deletePromocodeAsync,
  selectPromocodes,
  selectDeletePromocode,
  resetDeletePromocode
} from '../../apis/slices/promocodeSlice';

const PromoCodeItem = ({ code, status, category, id, onView, onDelete }) => {
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
          value={status ? 'Active' : 'Inactive'}
          textcolor={status ? "text-green-600" : "text-red-600"}
          backgroundcolor={status ? "bg-green-100" : "bg-red-100"}
          width="w-[100px]"
        />
        <Custombutton
          value={<FaTrash />}
          onClick={(e) => {
            e.stopPropagation();
            onDelete(id);
          }}
          textcolor="text-red-600"
          backgroundcolor="bg-red-100"
          width="w-[40px]"
        />
      </div>
    </div>
  );
};

const PromoCodes = ({ isOpen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const promocodesState = useSelector(selectPromocodes);
  const deletePromocodeState = useSelector(selectDeletePromocode);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [promocodeToDelete, setPromocodeToDelete] = useState(null);
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);

  useEffect(() => {
    fetchPromocodes();


    return () => {
      dispatch(resetDeletePromocode());
    };
  }, [currentPage, searchTerm]);

  useEffect(() => {
    if (deletePromocodeState.success) {
      setShowDeleteSuccess(true);
      fetchPromocodes();
      dispatch(resetDeletePromocode());
    }
  }, [deletePromocodeState.success]);

  const fetchPromocodes = () => {
    const token = localStorage.getItem('token');

    getPromocodesAsync({
      dispatch,
      data: {
        page: currentPage,
        limit: 10,
        search: searchTerm
      },
      token,
      callbackFn: () => { }
    });
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < (promocodesState.paging?.totalPages || 1)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(searchInput);
    setCurrentPage(1); // Reset to first page on new search
  };

  const handleViewPromocode = (id) => {
    navigate(`/promo-code-details/${id}`);
  };

  const handleDeleteClick = (id) => {
    setPromocodeToDelete(id);
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = () => {
    const token = localStorage.getItem('token');

    deletePromocodeAsync({
      dispatch,
      id: promocodeToDelete,
      token,
      callbackFn: () => {
        setShowDeleteConfirm(false);
      }
    });
  };

  const handleDeleteSuccessClose = () => {
    setShowDeleteSuccess(false);
  };

  return (
    <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""} transition-all duration-300`}>
      <Headers value1="Home" value2="Promo Codes" />

      <div className="mt-6">
        <StatCard title="Total Active Promo Codes" count={(promocodesState.paging?.total || 0).toString()} />
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
          <div className="flex justify-between items-center">
            <Headcomponent value="Promo Code List" showSearch={false} />
            <form onSubmit={handleSearch} className="flex">
              <input
                type="text"
                placeholder="Search promocodes..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#27AE60]"
              />
              <button
                type="submit"
                className="bg-[#27AE60] text-white px-4 py-2 rounded-r-lg hover:bg-[#219652]"
              >
                <FaSearch />
              </button>
            </form>
          </div>
        </div>
        <div className="p-6">
          {promocodesState.isLoading || deletePromocodeState.isLoading ? (
            <div className="flex justify-center items-center py-8">
              <TailSpin color="orange" radius={5} />
            </div>
          ) : promocodesState.error ? (
            <div className="text-center py-8 text-red-500">{promocodesState.error}</div>
          ) : promocodesState.data.length > 0 ? (
            <div className="space-y-4">
              {promocodesState.data.map((promo, index) => (
                <PromoCodeItem
                  key={promo.id || index}
                  id={promo.id}
                  code={promo.code}
                  status={promo.is_active}
                  category={promo.title}
                  onView={() => handleViewPromocode(promo.id)}
                  onDelete={handleDeleteClick}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">No promo codes found</div>
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
          <span className="text-gray-600">
            Page {currentPage} of {promocodesState.paging?.totalPages || 1}
          </span>
          <Custombutton
            value={
              <div className="flex items-center gap-2">
                <span>Next</span>
                <FaArrowRight />
              </div>
            }
            onClick={handleNextPage}
            disabled={currentPage === (promocodesState.paging?.totalPages || 1)}
            backgroundcolor={currentPage === (promocodesState.paging?.totalPages || 1) ? "bg-gray-50" : "bg-gray-100"}
            textcolor={currentPage === (promocodesState.paging?.totalPages || 1) ? "text-gray-400" : "text-gray-600"}
            width="w-[80px]"
            extraStyle="py-2"
          />
        </div>
      </div>


      <SuccessModal
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        type="caution"
        title="Delete Promo Code"
        message="Are you sure you want to delete this promo code? This action cannot be undone."
        buttonText="Delete"
        onConfirm={handleDeleteConfirm}
      />

      <SuccessModal
        isOpen={showDeleteSuccess}
        onClose={handleDeleteSuccessClose}
        type="success"
        title="Promo Code Deleted"
        message="The promo code has been deleted successfully."
        buttonText="Close"
      />
    </div>
  );
};

export default PromoCodes;

