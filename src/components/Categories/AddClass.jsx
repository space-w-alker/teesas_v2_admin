import React, { useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  addClassAsync,
  updateClassAsync,
} from "../../apis/slices/categoriesSlice";
import Headers from "../common/Headers";
import SuccessModal from "../common/SuccessModal";
import PropTypes from "prop-types";

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
    className: location.state?.className || "",
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const errors = {};
    if (!formData.className.trim()) {
      errors.className = "Class name is required";
    }
    if (formData.className.length < 3) {
      errors.className = "Class name must be at least 3 characters";
    }
    if (formData.className.length > 30) {
      errors.className = "Class name must not exceed 30 characters";
    }
    return errors;
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    // Clear error when user starts typing
    if (formErrors.className) {
      setFormErrors({});
    }
  };

  const handleSubmit = async () => {
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    try {
      let result;
      if (isEdit) {
        result = await dispatch(
          updateClassAsync({
            classId,
            categoryId: id || categoryId,
            className: formData.className,
          })
        );
      } else {
        result = await dispatch(addClassAsync(id, formData.className));
      }
      if (result) setShowSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Update page title and button text based on mode
  const pageTitle = isEdit ? "Edit Class" : "Add Class";
  const buttonText = isEdit ? "Update Class" : "Add Class";

  return (
    <div
      className={`py-[7rem] lg:px-[5rem] px-[10px] ${
        isOpen ? "xl:ml-[260px]" : ""
      }`}
    >
      <Headers value1="Home" value2={pageTitle} />

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-8">
              {pageTitle}
            </h2>
            <div className="grid grid-cols-2 gap-6">
              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Class Name
                </label>
                <input
                  type="text"
                  name="className"
                  value={formData.className}
                  onChange={handleChange}
                  className={`w-full p-3 border ${
                    formErrors.className ? "border-red-500" : "border-gray-200"
                  } rounded-lg focus:outline-none focus:border-[#27AE60]`}
                  placeholder="Enter Class Name"
                />
                {formErrors.className && (
                  <p className="text-red-500 text-sm mt-1">
                    {formErrors.className}
                  </p>
                )}
              </div>

              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Category Name
                </label>
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
                  <span className="font-medium">
                    {formData.className.length > 20
                      ? formData.className.substring(0, 10) + "..."
                      : formData.className || "-"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Category:</span>
                  <span className="font-medium">{categoryName || "-"}</span>
                </div>
              </div>
            </div>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full mt-8 px-6 py-3 bg-[#27AE60] text-white rounded-lg disabled:opacity-50"
            >
              {isSubmitting ? "Processing..." : buttonText}
            </button>
          </div>
        </div>
      </div>

      <SuccessModal
        isOpen={showSuccess}
        onClose={() => {
          setShowSuccess(false);
          navigate(-1);
        }}
        title="Success"
        message={
          isEdit ? "Class updated successfully" : "Class added successfully"
        }
      />
    </div>
  );
};
AddClass.propTypes = {
  isOpen: PropTypes.bool.isRequired,
};

export default AddClass;
