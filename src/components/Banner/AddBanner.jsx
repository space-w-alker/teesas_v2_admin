import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Headers from '../common/Headers';
import Headcomponent from '../common/Headcomponent';
import Custombutton from '../common/Custombutton';
import SuccessModal from '../common/SuccessModal';
import { TailSpin } from "react-loader-spinner";
import {
  createBannerAsync,
  createBanner,
  createBannerResponse,
  updateBannerAsync,
  updateBanner,
  updateBannerResponse,
  getBannerByIdAsync,
  getBannerById,
  getBannerByIdResponse
} from '../../apis/slices/bannerSlice';

// Routes for banner placement
const bannerRoutes = [
  { value: '/auth', label: 'Authentication' },
  { value: '/enroll', label: 'Enroll' },
  { value: '/enrolled', label: 'Enrolled' },
  { value: '/e-book', label: 'E-Book' },
  { value: '/e-book-details', label: 'E-Book Details' },
  { value: '/intro', label: 'Introduction' },
  { value: '/live', label: 'Live' },
  { value: '/live-class', label: 'Live Class' },
  { value: '/omotab-store', label: 'Omotab Store' },
  { value: '/omotab-store-details', label: 'Omotab Store Details' },
  { value: '/one-on-one', label: 'One on One' },
  { value: '/refer-earn', label: 'Refer & Earn' },
  { value: '/teesas-portal', label: 'Teesas Portal' },
  { value: '/baseMain', label: 'Base Main' },
  { value: '/login', label: 'Login' },
  { value: '/otp', label: 'OTP' },
  { value: '/addAccount', label: 'Add Account' },
  { value: '/addAccountCategory', label: 'Add Account Category' },
  { value: '/profilesView', label: 'Profiles View' },
  { value: '/chapters', label: 'Chapters' },
  { value: '/chooseSubject', label: 'Choose Subject' },
  { value: '/editProfile', label: 'Edit Profile' },
  { value: '/leaderBoardDetails', label: 'Leader Board Details' },
  { value: '/mockPractice', label: 'Mock Practice' },
  { value: '/mockQuestion', label: 'Mock Question' },
  { value: '/performance_report', label: 'Performance Report' },
  { value: '/report_show', label: 'Report Show' },
  { value: '/settings', label: 'Settings' },
  { value: '/splash', label: 'Splash' },
  { value: '/subjectDetails', label: 'Subject Details' },
  { value: '/subjects', label: 'Subjects' },
  { value: '/subscription', label: 'Subscription' },
  { value: '/profile', label: 'Profile' },
  { value: '/achievementsAllChallenges', label: 'Achievements All Challenges' },
  { value: '/view_history', label: 'View History' },
  { value: '/download', label: 'Download' },
  { value: '/selectProfile', label: 'Select Profile' },
  { value: '/forgotPassword', label: 'Forgot Password' },
  { value: '/updatePassword', label: 'Update Password' },
  { value: '/webView', label: 'Web View' },
  { value: '/questionBank', label: 'Question Bank' },
  { value: '/questionBankDetails', label: 'Question Bank Details' },
];

const AddBanner = ({ isOpen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const bannerId = searchParams.get('id');
  const isEditMode = !!bannerId;

  const { isLoading: createLoading } = useSelector(createBannerResponse);
  const { isLoading: updateLoading } = useSelector(updateBannerResponse);
  const { isLoading: fetchLoading, response: bannerResponse } = useSelector(getBannerByIdResponse);

  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    route: '',
    image: null
  });
  const [currentImageUrl, setCurrentImageUrl] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Add validation state
  const [errors, setErrors] = useState({
    title: '',
    description: '',
    route: '',
    image: '',
    general: ''
  });

  // Fetch banner data if in edit mode
  useEffect(() => {
    if (isEditMode) {
      setLoading(true);
      dispatch(getBannerById({ isLoading: true }));

      getBannerByIdAsync({
        dispatch,
        bannerId,
        callbackFn: (res) => {
          setLoading(false);
          if (res?.data?.status === 200) {
            const banner = res.data.data.Banner.find(b => b.id === parseInt(bannerId) || b.id === bannerId);

            if (banner) {
              setFormData({
                title: banner.title || '',
                description: banner.description || '',
                route: banner.route_path || '',
                image: null // We don't set the image file here, just keep track of the URL
              });
              setCurrentImageUrl(banner.image_url || '');
            } else {
              setErrors(prev => ({
                ...prev,
                general: "Banner not found"
              }));
            }
          } else {
            setErrors(prev => ({
              ...prev,
              general: res?.data?.message || "Failed to fetch banner details"
            }));
          }
        }
      });
    }
  }, [isEditMode, bannerId]);

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

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      image: e.target.files[0]
    }));

    if (errors.image) {
      setErrors(prev => ({
        ...prev,
        image: ''
      }));
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      title: '',
      description: '',
      route: '',
      image: '',
      general: ''
    };

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
      isValid = false;
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
      isValid = false;
    }

    if (!formData.route) {
      newErrors.route = 'Please select a route';
      isValid = false;
    }

    // Only require image for new banners, not for updates
    if (!isEditMode && !formData.image) {
      newErrors.image = 'Please upload an image';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('route_path', formData.route);

    // Only append image if it's provided (required for new banners, optional for updates)
    if (formData.image) {
      data.append('image', formData.image);
    }

    if (isEditMode) {
      // Update existing banner
      dispatch(updateBanner({ isLoading: true }));

      updateBannerAsync({
        dispatch,
        formData: data,
        bannerId,
        callbackFn: (res) => {
          setLoading(false);
          if (res?.data?.status === 200) {
            setSuccessMessage("Banner updated successfully");
            setShowSuccess(true);
          } else {
            setErrors(prev => ({
              ...prev,
              general: res?.data?.message || "Failed to update banner"
            }));
          }
        }
      });
    } else {
      // Create new banner
      dispatch(createBanner({ isLoading: true }));

      createBannerAsync({
        dispatch,
        formData: data,
        callbackFn: (res) => {
          setLoading(false);
          if (res?.data?.status === 200) {
            setSuccessMessage("Banner created successfully");
            setShowSuccess(true);
          } else {
            setErrors(prev => ({
              ...prev,
              general: res?.data?.message || "Failed to create banner"
            }));
          }
        }
      });
    }
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    navigate('/Banner');
  };

  return (
    <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""} transition-all duration-300`}>
      {loading && (
        <div style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 9999,
        }}>
          <TailSpin color="green" radius={5} />
        </div>
      )}

      <Headers
        value1="Home"
        value2="Banners"
        value3={isEditMode ? "Edit Banner" : "Add Banner"}
      />

      <div className="mt-6 flex gap-6">
        <div className="flex-[2] bg-white rounded-xl shadow-sm p-6">
          <Headcomponent value={isEditMode ? "Edit Banner" : "Add Banner"} showSearch={false} />
          <div className="border-b border-gray-200 mb-6"></div>

          {errors.general && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Banner Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className={`w-full p-2 border ${errors.title ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27AE60]`}
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Banner Route</label>
                <select
                  name="route"
                  value={formData.route}
                  onChange={handleInputChange}
                  className={`w-full p-2 border ${errors.route ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27AE60]`}
                >
                  <option value="">Select a route</option>
                  {bannerRoutes.map((route) => (
                    <option key={route.value} value={route.value}>
                      {route.label}
                    </option>
                  ))}
                </select>
                {errors.route && (
                  <p className="mt-1 text-sm text-red-600">{errors.route}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className={`w-full p-2 border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27AE60]`}
                  rows="4"
                ></textarea>
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {isEditMode ? "Update Banner Image (Optional)" : "Banner Image"}
                </label>
                <input
                  type="file"
                  name="image"
                  onChange={handleFileChange}
                  className={`w-full p-2 border ${errors.image ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27AE60]`}
                  accept="image/*"
                />
                {errors.image && (
                  <p className="mt-1 text-sm text-red-600">{errors.image}</p>
                )}

                {isEditMode && currentImageUrl && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-500 mb-2">Current Image:</p>
                    <img
                      src={currentImageUrl}
                      alt="Current banner"
                      className="w-full max-h-[200px] object-contain border rounded"
                    />
                  </div>
                )}
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
                  <span className="text-gray-600">Title:</span>
                  <span className="font-medium">{formData.title || '_____'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Route:</span>
                  <span className="font-medium">{formData.route || '_____'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Description:</span>
                  <span className="font-medium">{formData.description ? (formData.description.length > 20 ? formData.description.substring(0, 20) + '...' : formData.description) : '_____'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Image:</span>
                  <span className="font-medium">
                    {formData.image?.name || (isEditMode && currentImageUrl ? 'Current image' : '_____')}
                  </span>
                </div>
              </div>
            </div>
            <Custombutton
              value={isEditMode ? "Update Banner" : "Create Banner"}
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
        onClose={handleSuccessClose}
        type="success"
        title={isEditMode ? "Banner Updated Successfully" : "Banner Created Successfully"}
        message={successMessage}
        buttonText="Close"
        onConfirm={handleSuccessClose}
      />
    </div>
  );
};

export default AddBanner;

