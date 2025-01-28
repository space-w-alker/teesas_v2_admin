import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Headers from '../common/Headers';
import Headcomponent from '../common/Headcomponent';
import SuccessModal from '../common/SuccessModal';

const EditBankDetails = ({ isOpen }) => {
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    type: 'savings',
    country: 'ghana',
    category: 'business',
    bank: 'gtbank',
    accountNumber: '1001010393',
    accountName: 'Teesas Education Limited'
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdateBank = () => {
    setShowSuccess(true);
  };

  const handleClose = () => {
    setShowSuccess(false);
    navigate('/payments/bank-details');
  };

  return (
    <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""} transition-all duration-300`}>
      <Headers value1="Home" value2="Payments" value3="Edit Bank Details" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl p-8  mt-4 shadow-sm">
            <Headcomponent value="Edit Bank Details" border="Border" showSearch={false} />
            
            <div className="grid grid-cols-2 gap-6 mt-8">
              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-3">Select Type</label>
                <select 
                  name="type"
                  onChange={handleChange}
                  value={formData.type}
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
                  value={formData.country}
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
                  value={formData.category}
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
                  value={formData.bank}
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
                  value={formData.accountNumber}
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
                  value={formData.accountName}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#27AE60]"
                  placeholder="Enter Account Name"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl p-8 shadow-sm  mt-4 h-full">
            <Headcomponent value="Summary" border="Border" showSearch={false} />
            
            <div className="bg-[#E9FDEE] rounded-lg p-6 mt-6">
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
              onClick={handleUpdateBank}
              className="w-full mt-8 px-6 py-3 bg-[#27AE60] text-white rounded-lg font-medium hover:bg-[#219652] transition-colors"
            >
              Update Bank
            </button>
          </div>
        </div>
      </div>

      <SuccessModal 
  isOpen={showSuccess}
  onClose={handleClose}
  type="success"
  title="Bank details updated successfully"
  buttonText="Close"
/>
    </div>
  );
};

export default EditBankDetails;
