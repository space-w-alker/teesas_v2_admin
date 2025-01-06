import React, { useState } from 'react';
import { FaChevronLeft, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const AddSingleSubscription = ({ isOpen }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);

  // Mock data - replace with your API call
  const searchResults = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    // Add more mock data
  ];

  const handleContinue = () => {
    if (selectedUser) {
      navigate('/add-subscription-form', { state: { user: selectedUser } });
    }
  };

  const getInitials = (name) => {
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
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-[30px] outline-none bg-[#F8F8F8] text-[14px] border p-2 border-[#ECEDEE] shadows h-[42px] rounded-[16px]"
            placeholder="Search users..."
          />
        </div>

        <h3 className="font-medium text-[18px] text-[#2C2E32] mb-4">Search Results</h3>

        <div className="mt-4">
          {searchResults.map((user) => (
            <div 
              key={user.id}
              onClick={() => setSelectedUser(user)}
              className={`p-4 border rounded-lg mb-2 cursor-pointer flex items-center gap-4 ${
                selectedUser?.id === user.id ? 'border-[#27AE60] bg-[#E9FDEE]' : 'border-[#ECEDEE]'
              }`}
            >
              <div className="w-10 h-10 rounded-full bg-[#E9FDEE] text-[#27AE60] flex items-center justify-center font-medium">
                {getInitials(user.name)}
              </div>
              <div>
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center mt-6 mb-6">
          <button 
            className="flex items-center gap-2 px-4 py-2 border rounded-lg"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          >
            <FaArrowLeft /> Previous
          </button>
          
          <span className="font-medium">Page {currentPage}</span>
          
          <button 
            className="flex items-center gap-2 px-4 py-2 border rounded-lg"
            onClick={() => setCurrentPage(prev => prev + 1)}
          >
            Next <FaArrowRight />
          </button>
        </div>

        <button
          onClick={handleContinue}
          disabled={!selectedUser}
          className={`w-full py-3 rounded-lg text-white text-center ${
            selectedUser 
              ? 'bg-[#27AE60] hover:bg-[#219652] cursor-pointer' 
              : 'bg-gray-200 cursor-not-allowed'
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  );
};
export default AddSingleSubscription;