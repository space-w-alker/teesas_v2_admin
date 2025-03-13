import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Headers from '../common/Headers';
import Headcomponent from '../common/Headcomponent';
import Custombutton from '../common/Custombutton';
import SuccessModal from '../common/SuccessModal';
import { addPromocodeAsync } from '../../apis/slices/promocodeSlice';

const AddPromoCode = ({ isOpen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [classes, setClasses] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedClasses, setSelectedClasses] = useState([]);

  const [formData, setFormData] = useState({
    title: '',
    code: '',
    description: '',
    country_id: 1, // Default to 1 (Nigeria)
    type: 'percentage', // Default to percentage
    plan_id: '',
    start_date: '',
    end_date: '',
    is_active: true,
  });

  // Mock data for now - in real implementation, you'd fetch these from your API
  useEffect(() => {
    // Simulating category and class data fetch
    setCategories([
      { id: 4, name: 'Pre School' },
      { id: 137, name: 'Primary School' }
    ]);

    setClasses([
      { id: 21, name: 'Reception' },
      { id: 27, name: 'Grade 1' }
    ]);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e, type, id) => {
    const { checked } = e.target;

    if (type === 'category') {
      if (checked) {
        setSelectedCategories([...selectedCategories, id]);
      } else {
        setSelectedCategories(selectedCategories.filter(catId => catId !== id));
      }
    } else if (type === 'class') {
      if (checked) {
        setSelectedClasses([...selectedClasses, id]);
      } else {
        setSelectedClasses(selectedClasses.filter(classId => classId !== id));
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem('token');

    // Format dates to ISO strings
    const startDate = new Date(formData.start_date).toISOString();
    const endDate = new Date(formData.end_date).toISOString();

    const payload = {
      ...formData,
      start_date: startDate,
      end_date: endDate,
      country_id: Number(formData.country_id),
      plan_id: Number(formData.plan_id),
      category_ids: selectedCategories,
      class_ids: selectedClasses,
    };

    addPromocodeAsync({
      dispatch,
      body: payload,
      token,
      callbackFn: (response) => {
        setLoading(false);
        if (response?.data?.status === 200) {
          setShowSuccess(true);
        } else {
          // Handle error (you could use a toast notification here)
          console.error("Failed to create promo code:", response?.data?.message);
        }
      }
    });
  };

  return (
    <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""} transition-all duration-300`}>
      <Headers value1="Home" value2="Add Promo Code" />

      <div className="mt-6 flex flex-col lg:flex-row gap-6">
        <div className="flex-[2] bg-white rounded-xl shadow-sm p-6">
          <Headcomponent value="Add Promo Code" showSearch={false} />
          <div className="border-b border-gray-200 mb-6"></div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Promo Title*</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27AE60]"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Promo Code*</label>
                  <input
                    type="text"
                    name="code"
                    value={formData.code}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27AE60]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Country*</label>
                  <select
                    name="country_id"
                    value={formData.country_id}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27AE60]"
                    required
                  >
                    <option value="1">Nigeria</option>
                    <option value="2">Ghana</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Discount Type*</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27AE60]"
                    required
                  >
                    <option value="percentage">Percentage</option>
                    <option value="fixed">Fixed Amount</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Plan ID*</label>
                  <select
                    name="plan_id"
                    value={formData.plan_id}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27AE60]"
                    required
                  >
                    <option value="">Select Plan</option>
                    <option value="1">Basic</option>
                    <option value="2">Standard</option>
                    <option value="3">Premium</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Start Date*</label>
                  <input
                    type="datetime-local"
                    name="start_date"
                    value={formData.start_date}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27AE60]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">End Date*</label>
                  <input
                    type="datetime-local"
                    name="end_date"
                    value={formData.end_date}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27AE60]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description*</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27AE60]"
                  rows="4"
                  required
                ></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Categories</label>
                  <div className="bg-gray-50 p-3 rounded-lg max-h-40 overflow-y-auto">
                    {categories.map(category => (
                      <div className="flex items-center mb-2" key={category.id}>
                        <input
                          type="checkbox"
                          id={`cat-${category.id}`}
                          onChange={(e) => handleCheckboxChange(e, 'category', category.id)}
                          className="mr-2"
                        />
                        <label htmlFor={`cat-${category.id}`}>{category.name}</label>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Classes</label>
                  <div className="bg-gray-50 p-3 rounded-lg max-h-40 overflow-y-auto">
                    {classes.map(classItem => (
                      <div className="flex items-center mb-2" key={classItem.id}>
                        <input
                          type="checkbox"
                          id={`class-${classItem.id}`}
                          onChange={(e) => handleCheckboxChange(e, 'class', classItem.id)}
                          className="mr-2"
                        />
                        <label htmlFor={`class-${classItem.id}`}>{classItem.name}</label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="is_active"
                  name="is_active"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                  className="mr-2"
                />
                <label htmlFor="is_active">Active</label>
              </div>
            </div>

            <div className="mt-8">
              <Custombutton
                value={loading ? "Creating..." : "Create Promo Code"}
                type="submit"
                textcolor="text-white"
                backgroundcolor="bg-[#27AE60]"
                extraStyle="w-full hover:bg-[#219652]"
                disabled={loading}
              />
            </div>
          </form>
        </div>

        <div className="flex-1 mt-6 lg:mt-0">
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Summary</h2>
            <div className="bg-[#E9FDEE] rounded-lg p-6">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Promo Title:</span>
                  <span className="font-medium">{formData.title || '_____'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Promo Code:</span>
                  <span className="font-medium">{formData.code || '_____'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Country:</span>
                  <span className="font-medium">{formData.country_id === 1 ? 'Nigeria' : 'Ghana'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Discount Type:</span>
                  <span className="font-medium">{formData.type === 'percentage' ? 'Percentage' : 'Fixed Amount'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Plan:</span>
                  <span className="font-medium">
                    {formData.plan_id === '1' ? 'Basic' :
                      formData.plan_id === '2' ? 'Standard' :
                        formData.plan_id === '3' ? 'Premium' : '_____'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Active:</span>
                  <span className="font-medium">{formData.is_active ? 'Yes' : 'No'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Categories:</span>
                  <span className="font-medium">{selectedCategories.length} selected</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Classes:</span>
                  <span className="font-medium">{selectedClasses.length} selected</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <SuccessModal
        isOpen={showSuccess}
        onClose={() => {
          setShowSuccess(false);
          navigate('/promo-codes');
        }}
        type="success"
        title="Promo Code Created Successfully"
        message="Your promo code has been created successfully"
        buttonText="Close"
      />
    </div>
  );
};

export default AddPromoCode;
