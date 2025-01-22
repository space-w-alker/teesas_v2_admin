import React, { useState } from 'react';
import Headers from '../common/Headers';
import Headcomponent from '../common/Headcomponent';
import Custombutton from '../common/Custombutton';
import SuccessModal from '../common/SuccessModal';

const AddPromoCode = ({ isOpen }) => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    promoTitle: '',
    promoCode: '',
    country: '',
    planType: '',
    planValidity: '',
    planDiscount: '',
    description: '',
    categories: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuccess(true);
  };

  return (
    <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""} transition-all duration-300`}>
      <Headers value1="Home" value2="Add Promo Code" />

      <div className=" mt-6 flex gap-6">
        <div className="flex-[2] bg-white rounded-xl shadow-sm p-6">
          <Headcomponent value="Add Promo Code" showSearch={false} />
          <div className="border-b border-gray-200 mb-6"></div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Promo Title</label>
                <input
                  type="text"
                  name="promoTitle"
                  value={formData.promoTitle}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27AE60]"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Promo Code</label>
                  <input
                    type="text"
                    name="promoCode"
                    value={formData.promoCode}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27AE60]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Categories</label>
                  <select
                    name="categories"
                    value={formData.categories}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27AE60]"
                    required
                  >
                    <option value="">Select Categories</option>
                    <option value="all">All Categories</option>
                    <option value="specific">Specific Categories</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27AE60]"
                    required
                  >
                    <option value="">Select Country</option>
                    <option value="nigeria">Nigeria</option>
                    <option value="ghana">Ghana</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Plan Type</label>
                  <select
                    name="planType"
                    value={formData.planType}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27AE60]"
                    required
                  >
                    <option value="">Select Plan Type</option>
                    <option value="basic">Basic</option>
                    <option value="standard">Standard</option>
                    <option value="premium">Premium</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Plan Validity</label>
                  <select
                    name="planValidity"
                    value={formData.planValidity}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27AE60]"
                    required
                  >
                    <option value="">Select Validity</option>
                    <option value="1">1 Month</option>
                    <option value="3">3 Months</option>
                    <option value="6">6 Months</option>
                    <option value="12">12 Months</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Plan Discount (%)</label>
                  <input
                    type="number"
                    name="planDiscount"
                    value={formData.planDiscount}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27AE60]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27AE60]"
                  rows="4"
                  required
                ></textarea>
              </div>
            </div>
          </form>
        </div>

        <div className="flex-1">
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Summary</h2>
            <div className="bg-[#E9FDEE] rounded-lg p-6">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Promo Title:</span>
                  <span className="font-medium">{formData.promoTitle || '_____'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Promo Code:</span>
                  <span className="font-medium">{formData.promoCode || '_____'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Categories:</span>
                  <span className="font-medium">{formData.categories || '_____'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Country:</span>
                  <span className="font-medium">{formData.country || '_____'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Plan Type:</span>
                  <span className="font-medium">{formData.planType || '_____'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Validity:</span>
                  <span className="font-medium">{formData.planValidity ? `${formData.planValidity} Months` : '_____'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Discount:</span>
                  <span className="font-medium">{formData.planDiscount ? `${formData.planDiscount}%` : '_____'}</span>
                </div>
              </div>
            </div>
            <Custombutton
              value="Create Promo Code"
              onClick={handleSubmit}
              textcolor="text-white"
              backgroundcolor="bg-[#27AE60]"
              extraStyle="w-full mt-8 hover:bg-[#219652]"
            />
            
          </div>
        </div>
      </div>

      <SuccessModal
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        type="success"
        title="Promo Code Created Successfully"
        message="Your promo code has been created successfully"
        buttonText="Close"
      />
    </div>
  );
};

export default AddPromoCode;
