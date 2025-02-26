import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Headers from '../common/Headers';
import Headcomponent from '../common/Headcomponent';
import Custombutton from '../common/Custombutton';
import SuccessModal from '../common/SuccessModal';
import bookopen from '../../assets/images/bookopen.png';
import { createUniversityAsync, updateUniversityAsync } from '../../apis/slices/universitySlice';
import { TailSpin } from 'react-loader-spinner';
import { config } from '../../apis/client/config';

const UniAdd = ({ isOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);

  // Check if we're in edit mode and get university data
  const uniData = location.state?.universityData || {};
  const isEdit = Boolean(uniData.id);
  const universityId = uniData.id;

  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Initialize form data with university name
  const [formData, setFormData] = useState({
    universityName: uniData.universityName || ''
  });

  const [selectedFile, setSelectedFile] = useState(null);

  // Handle icon path correctly using the config approach
  const [previewImage, setPreviewImage] = useState(() => {
    if (uniData.icon) {
      // Use the same URL construction as shown in your example
      return `${config.MainUrl}public/${uniData.icon}`;
    }
    return bookopen; // Default image
  });

  // Get university state from Redux
  const universityState = useSelector((state) =>
    isEdit ? state.university?.updateUniversity : state.university?.createUniversity
  );

  const isLoading = universityState?.isLoading || false;
  const error = universityState?.error || null;

  useEffect(() => {
    if (error) {
      setErrorMessage(error);
    }
  }, [error]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);

      // Create preview for the selected image
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = (e) => {
    // Prevent form submission when clicking the file button
    e.preventDefault();
    e.stopPropagation();
    fileInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    // Form validation
    if (!formData.universityName.trim()) {
      setErrorMessage("University name is required");
      return;
    }

    if (!selectedFile && !isEdit) {
      setErrorMessage("Please select an icon for the university");
      return;
    }

    // Create FormData object for file upload
    const submitData = new FormData();

    // Add university name to FormData
    submitData.append('name', formData.universityName);

    // Only add the file if it was selected (required for new universities, optional for edits)
    if (selectedFile) {
      submitData.append('icon', selectedFile);
    }

    try {
      let result;

      if (isEdit) {
        // Update existing university
        result = await dispatch(updateUniversityAsync(universityId, submitData));
      } else {
        // Create new university
        result = await dispatch(createUniversityAsync(submitData));
      }

      if (!result?.error) {
        setShowSuccess(true);
      } else {
        setErrorMessage(result.error || `Failed to ${isEdit ? 'update' : 'create'} university`);
      }
    } catch (err) {
      console.error(`Error in form submission:`, err);
      setErrorMessage(err.message || `Failed to ${isEdit ? 'update' : 'create'} university. Please try again.`);
    }
  };

  const handleClose = () => {
    setShowSuccess(false);
    navigate('/uni-list');
  };

  return (
    <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""} transition-all duration-300`}>
      <Headers
        value1="Home"
        value2={isEdit ? "Edit University" : "Add University"}
      />

      <div className="mt-6 flex gap-6">
        <div className="mb-6 flex-[2] bg-white rounded-xl shadow-sm p-6">
          <Headcomponent
            value={isEdit ? "Edit University" : "Add University"}
            showSearch={false}
          />

          <form onSubmit={handleSubmit}>
            <div className="space-y-6 mt-6">
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  University Name
                </label>
                <input
                  type="text"
                  value={formData.universityName}
                  onChange={(e) => setFormData({ ...formData, universityName: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27AE60]"
                  placeholder="Enter university name"
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  University Icon
                </label>
                <div className="flex items-start gap-4">
                  <div className="w-24 h-24 border border-gray-300 rounded-lg overflow-hidden">
                    <img
                      src={previewImage}
                      alt="University icon preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <input
                      type="file"
                      ref={fileInputRef}
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                    <button
                      type="button" // Explicitly set to button type
                      onClick={triggerFileInput}
                      className="px-4 py-2 text-[#27AE60] bg-white border border-[#27AE60] rounded-lg hover:bg-green-50"
                    >
                      Choose File
                    </button>
                    <p className="text-xs text-gray-500">
                      {selectedFile ? selectedFile.name : isEdit ? "Keep current icon" : "No file chosen"}
                    </p>
                  </div>
                </div>
              </div>

              {errorMessage && (
                <div className="text-red-500 text-sm">{errorMessage}</div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full px-4 py-2 text-white bg-[#27AE60] rounded-lg hover:bg-[#219652] ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isLoading ? (
                  <TailSpin color="#ffffff" height={20} width={20} />
                ) : (
                  isEdit ? "Update University" : "Create University"
                )}
              </button>
            </div>
          </form>
        </div>

        <div className="flex-1">
          <div className="bg-white rounded-xl p-8 shadow-sm h-fit">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Summary</h2>
            <div className="bg-[#E9FDEE] rounded-lg p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">University Name:</span>
                  <span className="font-medium">{formData.universityName || '-'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Icon:</span>
                  <div className="w-10 h-10 rounded-lg overflow-hidden">
                    <img
                      src={previewImage}
                      alt="University icon"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                {isEdit && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">University ID:</span>
                    <span className="font-medium">{universityId}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <SuccessModal
        isOpen={showSuccess}
        onClose={handleClose}
        type="success"
        title={isEdit ? "University Updated Successfully" : "University Created Successfully"}
        message={isEdit
          ? "The university has been updated in the system."
          : "The university has been created and added to the system."}
        buttonText="Go to University List"
        onConfirm={handleClose}
      />
    </div>
  );
};

export default UniAdd;