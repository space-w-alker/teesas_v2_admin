import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Headers from '../common/Headers';
import Headcomponent from '../common/Headcomponent';
import Custombutton from '../common/Custombutton';
import SuccessModal from '../common/SuccessModal';

const AddContactUs = ({ isOpen }) => {
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    address: '',
    email: '',
    phone: '',
    country: '',
    workingHours: '',
    socialMedia: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    setShowSuccess(true);
  };

  const handleClose = () => {
    setShowSuccess(false);
    navigate('/contact-us');
  };

  return (
    <div className={`py-[7rem] px-[5rem] ${isOpen ? "xl:ml-[260px]" : ""}`}>
      <Headers 
        value1="Home / Contact Us"
        value2="Add Contact Us"
      />

      <div className="grid grid-cols-3 gap-8 mt-8">
        <div className="col-span-2">
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <h1 className="text-xl  text-gray-900 mb-4">Add Contact Information</h1>
            <div className="h-[1px] w-full bg-black mb-8"></div>

            <div className="grid grid-cols-1 gap-6 mb-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <input
                  name="address"
                  type="text"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter complete address"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter email address"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                <input
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter phone number"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Select Country</label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Select a country</option>
                  <option value="nigeria">Nigeria</option>
                  <option value="ghana">Ghana</option>
                  <option value="kenya">Kenya</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Working Hours</label>
                <input
                  name="workingHours"
                  type="text"
                  value={formData.workingHours}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="e.g., Mon-Fri, 9AM-5PM"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-1">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl  text-gray-900 mb-8">Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Address:</span>
                <span className="font-medium">{formData.address || '-'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Email:</span>
                <span className="font-medium">{formData.email || '-'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Phone:</span>
                <span className="font-medium">{formData.phone || '-'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Country:</span>
                <span className="font-medium">{formData.country || '-'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Working Hours:</span>
                <span className="font-medium">{formData.workingHours || '-'}</span>
              </div>

              <div className="pt-6 mt-6 border-t flex justify-center">
                <Custombutton 
                  onClick={handleSave}
                  value="Save Contact Information"
                  backgroundcolor="bg-[#27AE60] hover:bg-[#219652]"
                  textcolor="text-white"
                  width="w-[200px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <SuccessModal
        isOpen={showSuccess}
        onClose={handleClose}
        title="Contact Information Added Successfully"
        message="Your contact information has been successfully saved."
        buttonText="Close"
      />
    </div>
  );
};

export default AddContactUs;
