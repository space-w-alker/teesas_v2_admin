import React, { useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useDispatch  } from 'react-redux';
import { addClassAsync, updateClassAsync } from '../../apis/slices/categoriesSlice';
import Headers from '../common/Headers';
import SuccessModal from '../common/SuccessModal';


const AddClass = ({ isOpen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const location = useLocation();
  const { categoryId } = useParams(); 
  const classId = location.state?.classId;
  const isEdit = location.state?.isEdit;
  const { id } = useParams();
  const categoryName = location.state?.categoryName;
  
  const [formData, setFormData] = useState({
    className: location.state?.className || ''
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };


  const handleSubmit = async () => {
    let result;
    if (isEdit) {
      result = await dispatch(updateClassAsync({
        classId,
        categoryId,
        className: formData.className
      }));
    } else {
      result = await dispatch(addClassAsync( id ,formData.className));
    }
    
    if (result) {
      setShowSuccess(true);
    }
  };


  return (
    <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""}`}>
      <Headers value1="Home" value2={isEdit ? "Edit Class" : "Add Class"} />

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-8">
              {isEdit ? 'Edit Class' : 'Add Class'}
            </h2>
            <div className="grid grid-cols-2 gap-6">
              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-3">Class Name</label>
                <input
                  type="text"
                  name="className"
                  value={formData.className}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#27AE60]"
                  placeholder="Enter Class Name"
                />
              </div>

              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-3">Category Name</label>
                <input
                  type="text"
                  value={categoryName}
                  disabled
                  className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50"
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
                  <span className="text-gray-600">Class Name:</span>
                  <span className="font-medium">{formData.className || '-'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Category:</span>
                  <span className="font-medium">{categoryName || '-'}</span>
                </div>
              </div>
            </div>
            <button
              onClick={handleSubmit}
              className="w-full mt-8 px-6 py-3 bg-[#27AE60] text-white rounded-lg"
            >
              {isEdit ? 'Update Class' : 'Add Class'}
            </button>
          </div>
        </div>
      </div>

      <SuccessModal 
        isOpen={showSuccess}
        onClose={() => {
          setShowSuccess(false);
          navigate(`/categories`);
        }}
        type="success"
        title="Success"
        message={isEdit ? "Class updated successfully" : "Class added successfully"}
      />
    </div>
  );
};

export default AddClass;
 