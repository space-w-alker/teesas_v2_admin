import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Popup from 'reactjs-popup';
import success from '../../assets/images/success.png';

const AddCategory = ({ isOpen }) => {
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    categoryName: '',
    description: '',
    gradeLevel: '',
    status: '',
    subjects: '',
    chapters: '',
    lessons: ''
  });

  const [classes, setClasses] = useState([{ name: '' }]);

  const handleAddClass = () => {
    setClasses([...classes, { name: '' }]);
  };

  const handleDeleteClass = (index) => {
    const newClasses = classes.filter((_, i) => i !== index);
    setClasses(newClasses);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleAddCategory = () => {
    setShowSuccess(true);
  };

  const handleClose = () => {
    setShowSuccess(false);
    navigate('/categories');
  };

  return (
    <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""} transition-all duration-300`}>
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-400">Home</span>
          <span className="text-gray-400">/</span>
          <span className="text-gray-400">Categories</span>
          <span className="text-gray-400">/</span>
          <span className="text-gray-900 font-medium">Add Category</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-8">Add Category</h2>
            <div className="grid grid-cols-2 gap-6">
              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-3">Category Name</label>
                <input
                  type="text"
                  name="categoryName"
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#27AE60]"
                  placeholder="Enter Category Name"
                />
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
              {classes.map((_, index) => (
                index % 2 === 0 && (
                  <div key={index} className="col-span-2 grid grid-cols-2 gap-6">
                    {/* First class in row */}
                    <div className="col-span-1">
                      <div className="flex flex-col gap-2">
                        <label className="block text-sm font-medium text-gray-700 mb-3">Class Name</label>
                        <input
                          type="text"
                          name={`className-${index}`}
                          onChange={handleChange}
                          className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#27AE60]"
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

                    {/* Second class in row */}
                    {index + 1 < classes.length && (
                      <div className="col-span-1">
                        <div className="flex flex-col gap-2">
                          <label className="block text-sm font-medium text-gray-700 mb-3">Class Name</label>
                          <input
                            type="text"
                            name={`className-${index + 1}`}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#27AE60]"
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
              <div className="col-span-2 flex justify-start">
                <button
                  onClick={handleAddClass}
                  className="px-6 py-3 bg-[#E9FDEE] text-[#27AE60] rounded-lg font-medium hover:bg-[#d8f5e3] transition-colors"
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
                  <span className="font-medium">{classes.length}</span>
                </div>
                {classes.map((classItem, index) => (
                  <div key={index} className="flex justify-between">
                    <span className="text-gray-600">Class {index + 1}:</span>
                    <span className="font-medium">{classItem.name || '-'}</span>
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={handleAddCategory}
              className="w-full mt-8 px-6 py-3 bg-[#27AE60] text-white rounded-lg font-medium hover:bg-[#219652] transition-colors"
            >
              Add Category
            </button>
          </div>
        </div>
      </div>

      <Popup open={showSuccess} closeOnDocumentClick={false} modal>
        <div className="bg-white rounded-xl p-8 text-center">
          <div className="flex justify-center mb-4">
            <img src={success} alt="success" className="w-16 h-16" />
          </div>
          <h2 className="text-xl font-bold mb-6">Category Added Successfully</h2>
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

export default AddCategory;
