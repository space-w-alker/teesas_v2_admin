import React, { useEffect, useState, useRef } from 'react';
import Headers from '../common/Headers';
import Headcomponent from '../common/Headcomponent';
import StatCard from '../common/StatCard';
import Custombutton from '../common/Custombutton';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getResellersAsync, selectResellersList } from '../../apis/slices/resellersSlice';
import { TailSpin } from "react-loader-spinner";
import { toast } from 'react-toastify';

const ResellerItem = ({ name, status, id, navigate }) => {
  const navigateToDetails = () => {
    navigate('/reseller-form-details', {
      state: {
        id: id,
        name: name,
        status: status
      }
    });
  };

  return (
    <div
      className="bg-white rounded-xl p-4 flex items-center justify-between hover:shadow-md transition-shadow cursor-pointer"
      onClick={navigateToDetails}
    >
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
          {name && name[0] ? name[0].toUpperCase() : ''}
        </div>
        <div className="flex items-center gap-3">
          <span className="font-medium text-gray-800">{name}</span>
          <span className={`px-3 py-1 rounded-full text-sm ${status === 'Approved' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
            }`}>
            {status}
          </span>
        </div>
      </div>
      <Custombutton
        value="View"
        onClick={(e) => {
          // Prevent click event from propagating to parent div
          e.stopPropagation();
          navigateToDetails();
        }}
        textcolor="text-[#27AE60]"
        backgroundcolor="bg-transparent"
        extraStyle="font-medium"
      />
    </div>
  );
};

const formatDate = (dateString) => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  } catch (error) {
   
    return dateString || "Unknown date";
  }
};

const ResellerForm = ({ isOpen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const isInitialMount = useRef(true);

  const resellersState = useSelector(selectResellersList) || {
    data: [],
    isLoading: false,
    pagination: null,
    statistics: {
      total_resellers: 0,
      approved_resellers: 0,
      pending_approval: 0
    }
  };



 
  useEffect(() => {
    if (isInitialMount.current) {
      dispatch(getResellersAsync(1, ''));
      isInitialMount.current = false;
    }
  }, [dispatch]);


  useEffect(() => {
    if (!isInitialMount.current && currentPage > 1) {
      dispatch(getResellersAsync(currentPage, searchTerm));
    }
  }, [currentPage, dispatch, searchTerm]);


  useEffect(() => {
    if (!isInitialMount.current && searchTerm !== '') {
      const delayDebounceFn = setTimeout(() => {
        setCurrentPage(1);
        dispatch(getResellersAsync(1, searchTerm));
      }, 800);
      return () => clearTimeout(delayDebounceFn);
    }
  }, [searchTerm, dispatch]);

  const handlePageChange = (newPage) => {
    if (newPage < 1 || (resellersState.pagination && newPage > resellersState.pagination.total_pages)) {
      return;
    }
    setCurrentPage(newPage);
  };

  const handleSearch = (value) => {
    const sanitizedValue = value.trim();
    setSearchTerm(sanitizedValue);
    if (!sanitizedValue) {
      setCurrentPage(1);
      dispatch(getResellersAsync(1, ''));
    }
  };

  const handleReload = () => {
    setSearchTerm('');
    setCurrentPage(1);
    dispatch(getResellersAsync(1, ''));
  };


  const renderResellerItems = () => {

    if (!resellersState.data || !Array.isArray(resellersState.data) || resellersState.data.length === 0) {

      if (resellersState.statistics && resellersState.statistics.total_resellers > 0) {
        return (
          <div className="text-center py-8">

            <p className="text-gray-500">No Data Found</p>

          </div>
        );
      }

      return (
        <div className="text-center py-8 text-gray-500">
          {resellersState.isLoading ? "Loading..." : searchTerm ? "No results found for your search" : "No reseller forms found"}
        </div>
      );
    }


    const isGroupedByDate = resellersState.data[0] && resellersState.data[0].date && resellersState.data[0].forms;

    if (isGroupedByDate) {

      return (
        <div className="space-y-6">
          {resellersState.data.map((group, groupIndex) => (
            <div key={groupIndex}>
              <div className="text-gray-400 text-sm mb-3">{formatDate(group.date)}</div>
              <div className="space-y-4">
                {group.forms && group.forms.map((form, index) => (
                  <ResellerItem
                    key={index}
                    id={form.id}
                    name={form.name}
                    status={form.status}
                    navigate={navigate}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      );
    } else {
     
      return (
        <div className="space-y-4">
          {resellersState.data.map((reseller, index) => (
            <ResellerItem
              key={index}
              id={reseller.id}
              name={reseller.name || 'Unknown Name'}
              status={reseller.status || 'Unknown Status'}
              navigate={navigate}
            />
          ))}
        </div>
      );
    }
  };

  return (
    <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""} transition-all duration-300`}>
      <Headers value1="Home" value2="Reseller Form" />

      {resellersState.isLoading && (
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

      <div className="mt-6 mb-8">
        <h1 className="text-xl text-gray-900 cursor-pointer hover:text-[#27AE60] transition-colors"
          onClick={handleReload}
        >Reseller Forms</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
        <StatCard
          title="Total Resellers"
          count={resellersState.statistics?.total_resellers || 0}
        />
        <StatCard
          title="Approved Resellers"
          count={resellersState.statistics?.approved_resellers || 0}
        />
        <StatCard
          title="Pending Approval"
          count={resellersState.statistics?.pending_approval || 0}
        />
      </div>

      <div className="flex justify-end mb-6">
        <Custombutton
          value="Export Excel"
          onClick={() => { }}
          textcolor="text-white"
          backgroundcolor="bg-[#27AE60]"
          extraStyle="hover:bg-[#219652]"
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b border-gray-100">
          <Headcomponent
            value="Matric Reseller's Registration"
            showSearch={true}
            showFilter={false}
            showMenu={false} 
            onSearch={handleSearch}
            searchValue={searchTerm}
            onClear={() => {
              setSearchTerm('');
              setCurrentPage(1);
              dispatch(getResellersAsync(1, ''));
            }}
          />
        </div>

        <div className="p-6">
          {renderResellerItems()}
        </div>

        {resellersState && resellersState.pagination && (
          <div className="p-6 border-t border-gray-100 flex justify-between items-center">
            <Custombutton
              value="Previous"
              icon={<FaArrowLeft />}
              backgroundcolor="bg-[#F2F2F2]"
              textcolor="text-[#000000]"
              imagePosition="left"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            />

            <Custombutton
              value={`Page ${currentPage} of ${resellersState.pagination.total_pages || 1}`}
              backgroundcolor="bg-[#F2F2F2]"
              textcolor="text-[#000000]"
            />

            <Custombutton
              value="Next"
              icon={<FaArrowRight />}
              backgroundcolor="bg-[#F2F2F2]"
              textcolor="text-[#000000]"
              imagePosition="right"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage >= (resellersState.pagination.total_pages || 1)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ResellerForm;
