import React, { useState } from 'react';
import { FaChevronLeft } from "react-icons/fa";
import { useNavigate, useLocation } from 'react-router-dom';
const AddSubscriptionForm = ({ isOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedUser = location.state?.user;
  const [formData, setFormData] = useState({
    category: '',
    subscriptionPlan: '',
    class: '',
    duration: '',
    startDate: ''
  });
  const [categories, setCategories] = useState([{ category: '', plan: '', class: '', duration: '' }]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  
  const addCategory = () => {
    setCategories([...categories, { category: '', plan: '', class: '', duration: '' }]);
  };

  const categoryOptions = [
    'Search',
    'Matric',
    'Leader In Me',
    'Primary',
    'Secondary',
    'Common Entrance'
  ];

  const classOptions = [
    'Search',
    'Primary 1',
    'Primary 2',
    'Primary 3',
    'Primary 4'
  ];

  const durationOptions = [
    '1 Month',
    '3 Months',
    '6 Months'
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const SuccessModal = () => {
    const handleClose = () => {
      setShowSuccessModal(false);
      navigate('/subscribed-users'); 
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-8 w-[400px] text-center">
          <div className="w-24 h-24 rounded-full bg-[#27AE60] flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold mb-4">Success!</h3>
          <p className="text-gray-600 mb-8">Your action is successful</p>
          <button 
            onClick={handleClose}
            className="w-full py-3 bg-[#27AE60] text-white rounded-lg hover:bg-[#219652]"
          >
            Close
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""}`}>
      <div className='flex justify-start items-center lg:gap-3'>
        <FaChevronLeft onClick={() => navigate(-1)} className="cursor-pointer" />
        <div>
          <div className='font-normal text-[14px] lg:text-[16px] leading-[20px] text-[#B6B6B6]'>
            Subscribed Users /<span className='text-black font-medium'> Add Subscription</span>
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-3 gap-6">
        <div className="col-span-2 bg-white rounded-xl p-6">
          <h2 className="font-bold text-[22px] leading-[28px] text-[#2C2E32] mb-6">
            Add Subscription
          </h2>
          {categories.map((item, index) => (
            <div key={index} className="mb-6">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-[14px] text-gray-600 mb-2">Select Category</label>
                  <select className="w-full bg-[#F8F8F8] border border-[#ECEDEE] rounded-lg p-2">
                    <option value="">Select Category</option>
                    {categoryOptions.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[14px] text-gray-600 mb-2">Subscription Plan</label>
                  <select className="w-full bg-[#F8F8F8] border border-[#ECEDEE] rounded-lg p-2">
                    <option value="">Select Plan</option>
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly</option>
                    <option value="yearly">Yearly</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[14px] text-gray-600 mb-2">Select Class</label>
                  <select className="w-full bg-[#F8F8F8] border border-[#ECEDEE] rounded-lg p-2">
                    <option value="">Select Class</option>
                    {classOptions.map((cls) => (
                      <option key={cls} value={cls}>{cls}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[14px] text-gray-600 mb-2">Select Duration</label>
                  <select className="w-full bg-[#F8F8F8] border border-[#ECEDEE] rounded-lg p-2">
                    <option value="">Select Duration</option>
                    {durationOptions.map((duration) => (
                      <option key={duration} value={duration}>{duration}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              {index > 0 && (
                <div className="flex justify-end mt-2">
                  <button 
                    onClick={() => {
                      const newCategories = categories.filter((_, i) => i !== index)
                      setCategories(newCategories)
                    }}
                    className="text-red-500 text-sm"
                  >
                    Delete Category
                  </button>
                </div>
              )}
            </div>
          ))}

          <button 
            onClick={addCategory}
            className="text-black flex items-center gap-2 mb-6"
          >
            <span className="text-[#27AE60] text-xl">+</span> Add Another Category
          </button>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[14px] text-gray-600 mb-2">Starting Date</label>
              <input
                type="date"
                className="w-full bg-[#F8F8F8] border border-[#ECEDEE] rounded-lg p-2"
              />
            </div>
            <div>
              <label className="block text-[14px] text-gray-600 mb-2">Sales Referral Code</label>
              <input
                type="text"
                className="w-full bg-[#F8F8F8] border border-[#ECEDEE] rounded-lg p-2"
                placeholder="Enter referral code"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6">
          <h3 className="font-bold text-[18px] leading-[24px] text-[#2C2E32] mb-6">Summary</h3>
          <div className="space-y-4">
            <div>
              <p className="text-gray-600 text-sm">User Name</p>
              <p className="font-medium">{selectedUser?.name || 'Esther Obianuju'}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Category</p>
              <p className="font-medium">{categories[0]?.category || '-'}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Class</p>
              <p className="font-medium">{categories[0]?.class || '-'}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Duration</p>
              <p className="font-medium">{categories[0]?.duration || '-'}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Start Date</p>
              <p className="font-medium">{formData.startDate || '-'}</p>
            </div>
          </div>
          <button 
            onClick={() => setShowSuccessModal(true)}
            className="w-full py-3 rounded-lg text-white bg-[#27AE60] hover:bg-[#219652] mt-6"
          >
            Add Subscription
          </button>
        </div>
      </div>
      {showSuccessModal && <SuccessModal />}
    </div>
  );
};
export default AddSubscriptionForm;