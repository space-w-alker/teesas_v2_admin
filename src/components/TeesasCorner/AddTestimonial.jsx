import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addTestimonialAsync } from "../../apis/slices/cornerSlice";
import Headers from "../common/Headers";
import Custombutton from "../common/Custombutton";
import SuccessModal from "../common/SuccessModal";
import { toast } from "react-toastify";

const AddTestimonial = ({ isOpen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    description: "",
    author: "",
  });
  const [errors, setErrors] = useState({
    description: "",
    author: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Check if description is empty or only contains whitespace
    if (!formData.description || formData.description.trim() === "") {
      newErrors.description = "Testimonial content is required";
    }

    // Check if author is empty or only contains whitespace
    if (!formData.author || formData.author.trim() === "") {
      newErrors.author = "Author name is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) {
      toast.error("Please fill all required fields");
      return;
    }

    setLoading(true);

    const data = {
      description: formData.description.trim(),
      name: formData.author.trim(),
    };

    dispatch(
      addTestimonialAsync({
        dispatch,
        data,
        token: localStorage.getItem("authToken") || "",
        callbackFn: (res) => {
          setLoading(false);
          if (res?.data?.status === 200) {
            setIsSuccessModalOpen(true);
          } else {
            toast.error(res?.data?.message || "Failed to add testimonial");
          }
        },
      })
    );
  };

  const handleCloseModal = () => {
    setIsSuccessModalOpen(false);
    navigate(-1); // Navigate back to previous page
  };

  return (
    <div className={`py-[7rem] px-[5rem] ${isOpen ? "xl:ml-[260px]" : ""}`}>
      <Headers value1="Home / Testimonials" value2="Add Testimonial" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
        <div className="md:col-span-2">
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <h1 className="text-xl font-bold text-gray-900 mb-4">Add Testimonial</h1>
            <div className="h-[1px] w-full bg-gray-200 mb-8"></div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Testimonial Content <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className={`w-full min-h-[200px] p-4 border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500`}
                  placeholder="Enter testimonial content"
                />
                {errors.description && (
                  <p className="text-red-500 text-xs mt-1">{errors.description}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Author <span className="text-red-500">*</span>
                </label>
                <input
                  name="author"
                  type="text"
                  value={formData.author}
                  onChange={handleInputChange}
                  className={`w-full p-4 border ${errors.author ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500`}
                  placeholder="Enter author name"
                />
                {errors.author && (
                  <p className="text-red-500 text-xs mt-1">{errors.author}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-1">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Summary</h2>
            <div className="space-y-6">
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm font-medium text-gray-600 mb-2">Content:</p>
                <p className="text-gray-800 break-words">
                  {formData.description ?
                    (formData.description.length > 100 ?
                      `${formData.description.substring(0, 100)}...` :
                      formData.description) :
                    '-'}
                </p>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm font-medium text-gray-600 mb-2">Author:</p>
                <p className="text-gray-800">{formData.author || '-'}</p>
              </div>

              <div className="pt-6 mt-6 border-t">
                <Custombutton
                  onClick={handleSave}
                  value={loading ? "Processing..." : "Add Testimonial"}
                  backgroundcolor="bg-[#27AE60] hover:bg-[#219652]"
                  textcolor="text-white"
                  width="w-full"
                  disabled={loading}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={handleCloseModal}
        type="success"
        title="Testimonial Added Successfully"
        message="Your testimonial has been successfully saved."
        buttonText="Back to Testimonials"
        onConfirm={handleCloseModal}
      />
    </div>
  );
};

export default AddTestimonial;
