import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaArrowLeft, FaArrowRight, FaSearch } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { searchUsersAsync, selectSearchUsers } from '../../apis/slices/subscriptionsSlice';
import { TailSpin } from "react-loader-spinner";
import { toast } from 'react-toastify';
import Custombutton from '../../components/common/Custombutton';

const AddSingleSubscription = ({ isOpen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const token = localStorage.getItem("authToken");
  const [currentPage, setCurrentPage] = useState(1);
  const [isPaginating, setIsPaginating] = useState(false);


  const searchUsersState = useSelector(selectSearchUsers);
  const searchResults = searchUsersState?.data || [];
  const paging = searchUsersState?.paging || { page: 1, totalPages: 1, total: 0 };
  const isLoading = searchUsersState?.isLoading;


  const fetchUsers = (page = 1, search = "", isPaginationRequest = false) => {
    searchUsersAsync({
      dispatch,
      body: {
        filterList: "active:true",
        sort: "name:ASC",
        search: search,
        page: page,
        limit: 10
      },
      token,
      isPagination: isPaginationRequest,
      callbackFn: (result) => {
        if (result?.error) {
          toast.error("Failed to fetch users: " + result.error.message);
        }
        if (isPaginationRequest) {
          setIsPaginating(false);
        }
      }
    });
  };


  useEffect(() => {
    fetchUsers(1, "");
  }, [dispatch, token]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);

    if (window.searchTimer) clearTimeout(window.searchTimer);

    window.searchTimer = setTimeout(() => {
      setCurrentPage(1); // Reset to first page on new search
      fetchUsers(1, e.target.value);
    }, 500);
  };

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > paging.totalPages) return;

    setCurrentPage(newPage);
    setIsPaginating(true); // Set paginating flag
    fetchUsers(newPage, searchQuery, true); // Pass true for isPaginationRequest
  };

  const handleContinue = () => {
    if (selectedUser) {
      navigate('/add-subscription-form', { state: { user: selectedUser } });
    } else {
      toast.warning("Please select a user first");
    }
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name.charAt(0).toUpperCase();
  };

  return (
    <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""}`}>
      <div className='flex justify-start items-center lg:gap-3'>
        <FaChevronLeft onClick={() => navigate(-1)} className="cursor-pointer" />
        <div>
          <div className='font-normal text-[14px] lg:text-[16px] leading-[20px] text-[#B6B6B6]'>
            Subscribed Users /<span className='text-black font-medium'> Add Single Subscription</span>
          </div>
        </div>
      </div>
      <div className="mt-8 bg-white rounded-xl p-6">
        <h2 className="font-bold text-[22px] leading-[28px] text-[#2C2E32] mb-6">
          Add Subscription
        </h2>

        <div className="flex items-center relative lg:w-full max-w-[594px] mb-6">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full pl-[45px] pr-4 outline-none bg-[#F8F8F8] text-[14px] border p-3 border-[#ECEDEE] shadows h-[42px] rounded-[16px]"
            placeholder="Search by name, email or phone..."
          />
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>

        <h3 className="font-medium text-[18px] text-[#2C2E32] mb-4">
          {searchResults.length ? 'Search Results' : 'Enter search term above'}
        </h3>


        {isLoading && !isPaginating && (
          <div className="flex justify-center my-8">
            <TailSpin color="green" radius={5} />
          </div>
        )}

        <div className="mt-4">
          {searchResults && searchResults.length > 0 ? (
            searchResults.map((user) => (
              <div
                key={user.id || Math.random()}
                onClick={() => setSelectedUser(user)}
                className={`p-4 border rounded-lg mb-2 cursor-pointer flex items-center gap-4 ${selectedUser?.id === user.id ? 'border-[#27AE60] bg-[#E9FDEE]' : 'border-[#ECEDEE]'
                  }`}
              >
                <div className="w-10 h-10 rounded-full bg-[#E9FDEE] text-[#27AE60] flex items-center justify-center font-medium">
                  {getInitials(user.name)}
                </div>
                <div className="flex-1">
                  <p className="font-medium">{user.name || "Unknown"}</p>
                  <div className="flex flex-col md:flex-row md:gap-4 text-sm text-gray-600">
                    <span>{user.email || "No email"}</span>
                  </div>
                </div>
                {user.is_verified && (
                  <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">Verified</span>
                )}
              </div>
            ))
          ) : !isLoading ? (
            <div className="text-center py-8 text-gray-500">
              {searchQuery ? `No users found matching "${searchQuery}"` : 'No users available'}
            </div>
          ) : null}
        </div>

        {searchResults.length > 0 && (
          <div className="flex justify-between items-center mt-6 mb-6">
            <Custombutton
              onClick={() => handlePageChange(paging.page - 1)}
              value="Previous"
              icon={
                paging.page <= 1 ?
                  <FaArrowLeft color="#cccccc" /> :
                  <FaArrowLeft color="#000000" />
              }
              backgroundcolor="bg-[#F2F2F2]"
              textcolor={paging.page <= 1 ? "text-[#cccccc]" : "text-[#000000]"}
              imagePosition="left"
              disabled={paging.page <= 1}
            />

            <div className="text-[#667085] text-[14px] font-medium">
              Page {paging.page} of {paging.totalPages || 1}
            </div>

            <Custombutton
              onClick={() => handlePageChange(paging.page + 1)}
              value="Next"
              icon={
                paging.page >= paging.totalPages ?
                  <FaArrowRight color="#cccccc" /> :
                  <FaArrowRight color="#000000" />
              }
              backgroundcolor="bg-[#F2F2F2]"
              textcolor={paging.page >= paging.totalPages ? "text-[#cccccc]" : "text-[#000000]"}
              imagePosition="right"
              disabled={paging.page >= paging.totalPages}
            />

          </div>
        )}

        <button
          onClick={handleContinue}
          disabled={!selectedUser}
          className={`w-full py-3 rounded-lg text-white text-center ${selectedUser
            ? 'bg-[#27AE60] hover:bg-[#219652] cursor-pointer'
            : 'bg-gray-200 cursor-not-allowed'
            }`}
        >
          Continue with {selectedUser ? selectedUser.name : 'Selected User'}
        </button>
      </div>
    </div>
  );
};

export default AddSingleSubscription;
