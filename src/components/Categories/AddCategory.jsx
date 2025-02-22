import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createCategoryAsync, updateCategoryAsync, getCountriesAsync, selectCountries } from '../../apis/slices/categoriesSlice';
import Popup from 'reactjs-popup';
import success from '../../assets/images/success.png';
import Headers from '../common/Headers';
import { debounce } from 'lodash';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';


const FORM_CONSTANTS = {
  MAX_CLASSES: 10,
  MIN_CATEGORY_LENGTH: 3,
  MAX_CATEGORY_LENGTH: 50
};


class CategoryFormErrorBoundary extends React.Component {
  componentDidCatch(error, info) {
    console.error('Form Error:', error, info);
  }
  render() {
    return this.props.children;
  }
}

const AddCategory = ({ isOpen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const isEdit = location.state?.isEdit;
  const categoryData = location.state?.categoryData;
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: countries, isLoading: countriesLoading } = useSelector(selectCountries);

  const [formData, setFormData] = useState({
    categoryName: location.state?.categoryData?.name || '',
    country: location.state?.categoryData?.country || '',
    classes: location.state?.categoryData?.classes || [{ name: '' }]
  });

  useEffect(() => {
    dispatch(getCountriesAsync());
  }, []);

  const validateForm = () => {
    const errors = {};
    if (!formData.categoryName.trim()) errors.categoryName = 'Category name is required';
    if (!formData.country) errors.country = 'Country selection is required';
    if (formData.classes.some(c => !c.name.trim())) errors.classes = 'All class names are required';
    return errors;
  };

  const sanitizeInput = (value) => {
    return value.trim().replace(/[^a-zA-Z0-9\s]/g, '');
  };

  const handleAddClass = () => {
    if (formData.classes.length < FORM_CONSTANTS.MAX_CLASSES) {
      setFormData(prev => ({
        ...prev,
        classes: [...prev.classes, { name: '' }]
      }));
    }
  };

  const handleDeleteClass = (index) => {
    setFormData(prev => ({
      ...prev,
      classes: prev.classes.filter((_, i) => i !== index)
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: sanitizeInput(value)
    }));
  };

  const handleClassChange = useCallback((index, value) => {
    setFormData(prev => {
      const updatedClasses = [...prev.classes];
      updatedClasses[index].name = sanitizeInput(value);
      return { ...prev, classes: updatedClasses };
    });
  }, []);

  const handleAddCategory = async () => {
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        name: formData.categoryName,
        country_id: parseInt(formData.country),
        classes: formData.classes.map(c => ({ name: c.name }))
      };

      if (isEdit) {
        const result = await dispatch(updateCategoryAsync(categoryData.id, payload));
        if (result) setShowSuccess(true);
      } else {
        const result = await dispatch(createCategoryAsync(payload));
        if (result) setShowSuccess(true);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const debouncedSubmit = useCallback(
    debounce(() => handleAddCategory(), 300),
    [formData]
  );

  const handleClose = () => {
    setShowSuccess(false);
    navigate('/categories');
  };

  return (
    <CategoryFormErrorBoundary>
      <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""}`}>
        <Headers value1="Home" value2="Add Categories" />

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-8">Add Category</h2>
              <div className="grid grid-cols-2 gap-6">
                <div className="col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-3">Category Name</label>
                  <input
                    type="text"
                    name="categoryName"
                    value={formData.categoryName}
                    onChange={handleChange}
                    className={`w-full p-3 border ${errors.categoryName ? 'border-red-500' : 'border-gray-200'} rounded-lg focus:outline-none focus:border-[#27AE60]`}
                    placeholder="Enter Category Name"
                  />
                  {errors.categoryName && <p className="text-red-500 text-sm mt-1">{errors.categoryName}</p>}
                </div>

                <div className="col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-3">Select Country</label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className={`w-full p-3 border ${errors.country ? 'border-red-500' : 'border-gray-200'} rounded-lg focus:outline-none focus:border-[#27AE60]`}
                  >
                    <option value="">Select Country</option>
                    {countries?.map((country) => (
                      <option key={country.id} value={country.id}>
                        {country.emoji} {country.name}
                      </option>
                    ))}
                  </select>
                  {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
                </div>

                {/* Classes Section */}
                {formData.classes.map((classItem, index) => (
                  index % 2 === 0 && (
                    <div key={index} className="col-span-2 grid grid-cols-2 gap-6">
                      <div className="col-span-1">
                        <div className="flex flex-col gap-2">
                          <label className="block text-sm font-medium text-gray-700 mb-3">Class Name</label>
                          <input
                            type="text"
                            value={classItem.name}
                            onChange={(e) => handleClassChange(index, e.target.value)}
                            className={`w-full p-3 border ${errors.classes ? 'border-red-500' : 'border-gray-200'} rounded-lg focus:outline-none focus:border-[#27AE60]`}
                            placeholder="Enter Class Name"
                          />
                          <button
                            onClick={() => handleDeleteClass(index)}
                            className="text-red-500 hover:text-red-600 text-left mt-2"
                          >
                            Delete
                          </button>
                        </div>
                      </div>

                      {index + 1 < formData.classes.length && (
                        <div className="col-span-1">
                          <div className="flex flex-col gap-2">
                            <label className="block text-sm font-medium text-gray-700 mb-3">Class Name</label>
                            <input
                              type="text"
                              value={formData.classes[index + 1].name}
                              onChange={(e) => handleClassChange(index + 1, e.target.value)}
                              className={`w-full p-3 border ${errors.classes ? 'border-red-500' : 'border-gray-200'} rounded-lg focus:outline-none focus:border-[#27AE60]`}
                              placeholder="Enter Class Name"
                            />
                            <button
                              onClick={() => handleDeleteClass(index + 1)}
                              className="text-red-500 hover:text-red-600 text-left mt-2"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                ))}
                {errors.classes && <p className="text-red-500 text-sm mt-1 col-span-2">{errors.classes}</p>}

                <div className="col-span-2 flex justify-start">
                  <button
                    onClick={handleAddClass}
                    disabled={formData.classes.length >= FORM_CONSTANTS.MAX_CLASSES}
                    className="px-6 py-3 bg-[#E9FDEE] text-[#27AE60] rounded-lg font-medium hover:bg-[#d8f5e3] transition-colors disabled:opacity-50"
                  >
                    + Add Another Class
                  </button>
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
                    <span className="text-gray-600">Category Name:</span>
                    <span className="font-medium">{formData.categoryName || '-'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Country:</span>
                    <span className="font-medium">{formData.country || '-'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Classes:</span>
                    <span className="font-medium">{formData.classes.length}</span>
                  </div>
                  {formData.classes.map((classItem, index) => (
                    <div key={index} className="flex justify-between">
                      <span className="text-gray-600">Class {index + 1}:</span>
                      <span className="font-medium">{classItem.name || '-'}</span>
                    </div>
                  ))}
                </div>
              </div>
              <button
                onClick={debouncedSubmit}
                disabled={isSubmitting}
                className="w-full mt-8 px-6 py-3 bg-[#27AE60] text-white rounded-lg disabled:opacity-50"
              >
                {isSubmitting ? 'Processing...' : isEdit ? 'Update Category' : 'Add Category'}
              </button>
            </div>
          </div>
        </div>

        <Popup open={showSuccess} closeOnDocumentClick={false} modal>
          <div className="bg-white rounded-xl p-8 text-center">
            <div className="flex justify-center mb-4">
              <img src={success} alt="success" className="w-16 h-16" />
            </div>
            <h2 className="text-xl font-bold mb-6">
              {isEdit ? 'Category Updated Successfully' : 'Category Added Successfully'}
            </h2>
            <button
              onClick={handleClose}
              className="px-8 py-2 bg-[#27AE60] text-white rounded-lg"
            >
              Close
            </button>
          </div>
        </Popup>
      </div>
    </CategoryFormErrorBoundary>
  );
};

AddCategory.propTypes = {
  isOpen: PropTypes.bool.isRequired
};

export default AddCategory;
