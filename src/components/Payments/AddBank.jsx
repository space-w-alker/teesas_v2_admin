import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Popup from 'reactjs-popup';
import success from '../../assets/images/success.png';

const AddBank = ({ isOpen }) => {
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    type: '',
    country: '',
    category: '',
    bank: '',
    accountNumber: '',
    accountName: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleAddBank = () => {
    setShowSuccess(true);
  };

  const handleClose = () => {
    setShowSuccess(false);
    navigate('/payments/bank-details');
  };

  return (
    <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""} transition-all duration-300`}>
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-400">Home</span>
          <span className="text-gray-400">/</span>
          <span className="text-gray-400">Payments</span>
          <span className="text-gray-400">/</span>
          <span className="text-gray-900 font-medium">Add Bank Details</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-8">Add Bank Details</h2>
            <div className="grid grid-cols-2 gap-6">
              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-3">Select Type</label>
                <select 
                  name="type"
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#27AE60]"
                >
                  <option value="">Select Type</option>
                  <option value="savings">Savings</option>
                  <option value="current">Current</option>
                </select>
              </div>

              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-3">Select Country</label>
                <select 
                  name="country"
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#27AE60]"
                >
                  <option value="">Select Country</option>
                  <option value="nigeria">Nigeria</option>
                  <option value="ghana">Ghana</option>
                </select>
              </div>

              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-3">Select Category</label>
                <select 
                  name="category"
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#27AE60]"
                >
                  <option value="">Select Category</option>
                  <option value="personal">Personal</option>
                  <option value="business">Business</option>
                </select>
              </div>

              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-3">Select Bank</label>
                <select 
                  name="bank"
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#27AE60]"
                >
                  <option value="">Select Bank</option>
                  <option value="gtbank">GT Bank</option>
                  <option value="access">Access Bank</option>
                </select>
              </div>

              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-3">Account Number</label>
                <input 
                  type="text"
                  name="accountNumber"
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#27AE60]"
                  placeholder="Enter Account Number"
                />
              </div>

              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-3">Account Name</label>
                <input 
                  type="text"
                  name="accountName"
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#27AE60]"
                  placeholder="Enter Account Name"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl p-8 shadow-sm h-full">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Summary</h2>
            <div className="bg-[#E9FDEE] rounded-lg p-6">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Type:</span>
                  <span className="font-medium">{formData.type || '-'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Country:</span>
                  <span className="font-medium">{formData.country || '-'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Category:</span>
                  <span className="font-medium">{formData.category || '-'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Bank:</span>
                  <span className="font-medium">{formData.bank || '-'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Account Number:</span>
                  <span className="font-medium">{formData.accountNumber || '-'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Account Name:</span>
                  <span className="font-medium">{formData.accountName || '-'}</span>
                </div>
              </div>
            </div>
            <button 
              onClick={handleAddBank}
              className="w-full mt-8 px-6 py-3 bg-[#27AE60] text-white rounded-lg font-medium hover:bg-[#219652] transition-colors"
            >
              Add Bank
            </button>
          </div>
        </div>
      </div>

      <Popup open={showSuccess} closeOnDocumentClick={false} modal>
        <div className="bg-white rounded-xl p-8 text-center">
          <div className="flex justify-center mb-4">
            <img src={success} alt="success" className="w-16 h-16" />
          </div>
          <h2 className="text-xl font-bold mb-6">Your action was successful</h2>
          <button 
            onClick={handleClose}
            className="px-8 py-2 bg-[#27AE60] text-white rounded-lg font-medium hover:bg-[#219652] transition-colors"
          >
            Close
          </button>
        </div>
      </Popup>
    </div>
  );
};

export default AddBank;