import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaCloudUploadAlt } from "react-icons/fa";
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { uploadBulkLiveClassesAsync, selectBulkLiveClassUpload, resetBulkLiveClassUpload } from '../../../apis/slices/liveClassSlice';
import SuccessModal from '../../../components/common/SuccessModal';

const UploadBulkLiveClass = ({ isOpen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { classType } = location.state || { classType: 'group' }; 

  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    type: 'success',
    title: '',
    message: '',
    buttonText: 'Close'
  });

  const bulkUploadState = useSelector(selectBulkLiveClassUpload);
  const { isLoading, data, error, success } = bulkUploadState;
  const token = localStorage.getItem('authToken') || '';

  const pageTitle = classType === 'one_on_one' ? 'One-on-One Classes' : 'Live Classes';
  const returnPath = classType === 'one_on_one' ? '/one-on-oneclassmanagement' : '/scheduleliveclasses';

  useEffect(() => {
    if (success && data) {
      const successCount = data.data?.length || 0;

      setModalConfig({
        isOpen: true,
        type: 'success',
        title: 'Upload Successful',
        message: `${data.message || `Processed ${successCount} classes successfully`}`,
        buttonText: `Back to ${pageTitle}`
      });
    }

    if (error) {
      setModalConfig({
        isOpen: true,
        type: 'caution',
        title: 'Upload Failed',
        message: error,
        buttonText: 'Try Again'
      });
    }

    // Cleanup function to reset state when component unmounts
    return () => {
      dispatch(resetBulkLiveClassUpload());
    };
  }, [success, data, error, pageTitle, dispatch]);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleCloseModal = () => {
    setModalConfig(prev => ({ ...prev, isOpen: false }));
    if (modalConfig.type === 'success') {
      navigate(returnPath);
    }
  };

  const handleUpload = () => {
    if (!file) {
      setModalConfig({
        isOpen: true,
        type: 'caution',
        title: 'No File Selected',
        message: 'Please select a file to upload',
        buttonText: 'OK'
      });
      return;
    }

    dispatch(uploadBulkLiveClassesAsync({
      file,
      classType,
      token,
      callbackFn: (result) => {
        // Optional callback handling if needed
        console.log('Upload result:', result);
      }
    }));
  };

  const downloadTemplate = () => {
    // Create a simple Excel template for live classes
    let csvContent;

    if (classType === 'one_on_one') {
      csvContent = "topic,subject_id,teacher_id,class_time,date,duration,description,meeting_link\n" +
        "One-on-One Math Class,1,1,10:00 AM,2023-12-25,60,One-on-one math tutoring,https://zoom.us/j/123456789\n" +
        "One-on-One Science Class,2,2,02:00 PM,2023-12-26,45,One-on-one science tutoring,https://zoom.us/j/987654321";
    } else {
      csvContent = "topic,subject_id,teacher_id,class_time,date,duration,description,meeting_link\n" +
        "Group Math Class,1,1,10:00 AM,2023-12-25,60,Group math session,https://zoom.us/j/123456789\n" +
        "Group Science Class,2,2,02:00 PM,2023-12-26,45,Group science session,https://zoom.us/j/987654321";
    }

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${classType === 'one_on_one' ? 'one_on_one' : 'live'}_class_template.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""}`}>
      <div className='flex justify-start items-center lg:gap-3'>
        <FaChevronLeft onClick={() => navigate(-1)} className="cursor-pointer" />
        <div>
          <div className='font-normal text-[14px] lg:text-[16px] leading-[20px] text-[#B6B6B6]'>
            {pageTitle} /<span className='text-black font-medium'> Upload Bulk {pageTitle}</span>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-white rounded-xl p-6 flex flex-col md:flex-row">
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-6">Upload Bulk {pageTitle}</h2>

          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center ${dragActive ? 'bg-[#E9FDEE] border-[#27AE60]' : 'bg-gray-50 border-gray-300'}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <FaCloudUploadAlt className="mx-auto text-5xl text-gray-400 mb-4" />
            <p className="text-gray-600 mb-4">
              Drag and drop your file here, or
              <label className="text-[#27AE60] cursor-pointer ml-1">
                browse
                <input
                  type="file"
                  className="hidden"
                  accept=".xlsx,.xls,.csv"
                  onChange={handleChange}
                />
              </label>
            </p>
            <p className="text-sm text-gray-500">Supported formats: CSV, Excel (.xlsx, .xls)</p>
            {file && (
              <div className="mt-4 text-left bg-gray-50 p-4 rounded-lg">
                <p className="font-medium">Selected file:</p>
                <p className="text-gray-600">{file.name}</p>
              </div>
            )}
            <button
              onClick={downloadTemplate}
              className="mt-4 text-[#27AE60] font-medium"
            >
              Download Sample File
            </button>
          </div>
        </div>

        <div className="md:ml-8 mt-6 md:mt-0 md:w-1/3 bg-[#E9FDEE] rounded-xl p-6">
          <h3 className="font-bold text-[18px] leading-[24px] text-[#2C2E32] mb-6">Summary</h3>
          <div className="space-y-4">
            <div>
              <p className="text-gray-600 text-sm">File Selected</p>
              <p className="font-medium">{file ? file.name : '-'}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">File Size</p>
              <p className="font-medium">{file ? `${(file.size / 1024).toFixed(2)} KB` : '-'}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">File Type</p>
              <p className="font-medium">{file ? file.type : '-'}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Class Type</p>
              <p className="font-medium">{classType === 'one_on_one' ? 'One-on-One Class' : 'Group Live Class'}</p>
            </div>
          </div>
          <button
            onClick={handleUpload}
            disabled={!file || isLoading}
            className={`w-full py-3 rounded-lg text-white ${!file || isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#27AE60] hover:bg-[#219652]'} mt-6`}
          >
            {isLoading ? 'Uploading...' : `Upload ${pageTitle}`}
          </button>
        </div>
      </div>

      <SuccessModal
        isOpen={modalConfig.isOpen}
        onClose={handleCloseModal}
        type={modalConfig.type}
        title={modalConfig.title}
        message={modalConfig.message}
        buttonText={modalConfig.buttonText}
        onConfirm={handleCloseModal}
      />
    </div>
  );
};

export default UploadBulkLiveClass;
