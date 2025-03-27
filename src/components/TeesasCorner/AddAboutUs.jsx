import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addAboutUsAsync, updateAboutUsAsync } from '../../apis/slices/cornerSlice';
import Headers from '../common/Headers';
import Headcomponent from '../common/Headcomponent';
import Custombutton from '../common/Custombutton';
import { toast } from 'react-toastify';

const AddAboutUs = ({ isOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const token = localStorage.getItem('authToken') || '';

  // Check if we're in edit mode
  const isEditMode = location.state?.isEdit || false;
  const existingData = location.state?.aboutUsData || null;

  const [formData, setFormData] = useState({
    id: '',
    title: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Load existing data if in edit mode
  useEffect(() => {
    if (isEditMode && existingData) {
      setFormData({
        id: existingData.id || '',
        title: existingData.title || '',
        description: existingData.description || ''
      });
    }
  }, [isEditMode, existingData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      toast.error('Please fill all required fields');
      return;
    }

    setLoading(true);

    const data = {
      title: formData.title.trim(),
      description: formData.description.trim()
    };


    if (isEditMode) {
      data.id = formData.id;
    }

    const action = isEditMode ? updateAboutUsAsync : addAboutUsAsync;

    dispatch(action({
      dispatch,
      data,
      token,
      callbackFn: (response) => {
        setLoading(false);
        if (response?.data?.status === 200) {
          navigate('/about-us');
        }
      }
    }));
  };

  return (
    <div className={`py-[7rem] px-[5rem] ${isOpen ? "xl:ml-[260px]" : ""}`}>
      <Headers
        value1="Home / About Us"
        value2={isEditMode ? "Edit About Us" : "Add About Us"}
      />

      <div className="grid grid-cols-3 gap-8 mt-8">
        <div className="col-span-2">
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <h1 className="text-xl text-gray-900 mb-4">{isEditMode ? "Edit About Us" : "Add About Us"}</h1>
            <div className="h-[1px] w-full bg-black mb-8"></div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Title <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className={`w-full p-3 border ${errors.title ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500`}
                  placeholder="Enter title"
                />
                {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Description <span className="text-red-500">*</span></label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className={`w-full h-[calc(70vh-400px)] p-3 border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500`}
                  placeholder="Enter description"
                />
                {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-1">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl text-gray-900 mb-8">Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between bg-green-100 p-4 rounded-lg">
                <span className="text-gray-600">Title:</span>
                <span className="text-gray-800 font-medium truncate max-w-[150px]">{formData.title || '-'}</span>
              </div>

              <div className="flex justify-between bg-green-100 p-4 rounded-lg mt-4">
                <span className="text-gray-600">Description:</span>
                <span className="text-gray-800 font-medium truncate max-w-[150px]">{formData.description ? `${formData.description.substring(0, 20)}...` : '-'}</span>
              </div>

              <div className="pt-6 mt-6 border-t flex justify-center">
                <Custombutton
                  value={loading ? "Processing..." : (isEditMode ? "Update About Us" : "Create About Us")}
                  backgroundcolor="bg-[#27AE60] hover:bg-[#219652]"
                  textcolor="text-white"
                  width="w-full"
                  onClick={handleSubmit}
                  disabled={loading}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAboutUs;
