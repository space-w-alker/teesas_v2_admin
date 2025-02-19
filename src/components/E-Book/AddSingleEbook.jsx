import React, { useState } from 'react';
import { FaCloudUploadAlt } from "react-icons/fa";
import { useLocation, useNavigate } from 'react-router-dom';
import Headers from '../common/Headers';
import Custombutton from '../common/Custombutton';
import SuccessModal from '../common/SuccessModal';
import { addEbookAsync } from '../../apis/slices/ebookSlice';
import { addEbookAsync } from '../../apis/slices/ebookSlice';
import { listCategoriesAsync, getCategoryDetailsAsync, getClassDetailsAsync, listChaptersAsync, listLessonsAsync } from '../../apis/slices/categorySlice';
import { useDispatch } from 'react-redux';


const AddSingleEbook = ({ isOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    category: location.state?.ebookData?.category || '',
    grade: location.state?.ebookData?.grade || '',
    chapter: location.state?.ebookData?.chapter || '',
    bookTitle: location.state?.ebookData?.bookTitle || '',
    price: location.state?.ebookData?.price || '',
    description: location.state?.ebookData?.description || '',
    pdf: location.state?.ebookData?.pdf || null
  });

  const [dragActive, setDragActive] = useState(false);

  const handlePdfUpload = (e) => {
    setFormData({ ...formData, pdf: e.target.files[0] });
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) {
      setFormData({ ...formData, pdf: e.dataTransfer.files[0] });
    }
  };
  const dispatch = useDispatch();
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Mapping formData to the required format with default empty values
    const requestData = {
      course_id: formData.category || '',
      class_id: formData.grade || '',
      subject_id: formData.chapter || '',
      title: formData.bookTitle || '',
      description: formData.description || '',
      short_des: formData.description ? formData.description.substring(0, 100) : '',
      icon: '', // Default empty if unavailable
      source: formData.pdf ? formData.pdf.name : '',
      sample_source: '', // Default empty if no sample
      price: formData.price || '',
      // discount: formData.discount || '',
      // seo: formData.bookTitle
      //   ? `${formData.bookTitle} ${formData.category || ''} ${formData.grade || ''} ${formData.chapter || ''}`
      //   : '',
      // publisher: formData.publisher || '',
      // publication: formData.publication || '',
      // ISBN_no: formData.ISBN_no || '',
      // country_id: formData.country_id || '',
      // language: formData.language || '',
      // publish_date: formData.publish_date || '',
      // status: formData.status || '',
      // is_paid: formData.is_paid || ''
    };

    // Creating FormData for sending files
    const formDataToSend = new FormData();
    Object.keys(requestData).forEach((key) => {
      formDataToSend.append(key, requestData[key]);
    });

    if (formData.pdf) {
      formDataToSend.append('pdf', formData.pdf);
    }

    // Dispatch Redux action to create an ebook
    dispatch(addEbookAsync({ dispatch, data: requestData }));
  };


  const handleClose = () => {
    setShowSuccess(false);
    setFormData({
      category: '',
      grade: '',
      chapter: '',
      bookTitle: '',
      description: '',
      pdf: null
    });
    navigate('/ebook-list');
  };

  return (
    <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""} transition-all duration-300`}>
      <Headers
        value1="Home"
        value2="Add E-Book"
      />

      <div className=" mt-6 flex gap-6">
        <div className="flex-[2] bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-4 mb-6">
            <h2 className="text-xl font-bold text-gray-900">Add E-Book</h2>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Select Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27AE60]"
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="1">Mathematics</option>
                    <option value="2">Science</option>
                    <option value="3">English</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Select Grade
                  </label>
                  <select
                    value={formData.grade}
                    onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27AE60]"
                    required
                  >
                    <option value="">Select Grade</option>
                    <option value="1">Grade 1</option>
                    <option value="2">Grade 2</option>
                    <option value="3">Grade 3</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Select Chapter
                  </label>
                  <select
                    value={formData.chapter}
                    onChange={(e) => setFormData({ ...formData, chapter: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27AE60]"
                    required
                  >
                    <option value="">Select Chapter</option>
                    <option value="1">Chapter 1</option>
                    <option value="2">Chapter 2</option>
                    <option label="3">Chapter 3</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Book Title
                  </label>
                  <input
                    type="text"
                    value={formData.bookTitle}
                    onChange={(e) => setFormData({ ...formData, bookTitle: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27AE60]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Book Price
                  </label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27AE60]"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27AE60] h-32"
                  required
                />
              </div>
              {/* upload icon */}
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Upload Icon
                </label>
                <div
                  className="border-2 border-dashed rounded-lg p-8 text-center bg-[#E9FDEE] border-[#27AE60]"
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <FaCloudUploadAlt className="mx-auto text-5xl text-gray-400 mb-4" />
                  <p className="text-gray-600 mb-4">
                    Drag and drop your Icon here, or
                    <label className="text-[#27AE60] cursor-pointer ml-1">
                      browse
                      <input
                        type="file"
                        className="hidden"
                        accept=".jpg"
                        onChange={handlePdfUpload}
                        required
                      />
                    </label>
                  </p>
                  <p className="text-sm text-gray-500 mb-2">Supported format: jpg</p>
                  <p className="text-sm text-gray-500">Maximum file size: 10MB</p>
                  {formData.icon && (
                    <div className="mt-4 text-left bg-gray-50 p-4 rounded-lg">
                      <p className="font-medium">Selected file:</p>
                      <p className="text-gray-600">{formData.pdf.name}</p>
                    </div>
                  )}
                </div>
              </div>
              {/* upload ebook */}
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Upload Ebook
                </label>
                <div
                  className="border-2 border-dashed rounded-lg p-8 text-center bg-[#E9FDEE] border-[#27AE60]"
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <FaCloudUploadAlt className="mx-auto text-5xl text-gray-400 mb-4" />
                  <p className="text-gray-600 mb-4">
                    Drag and drop your PDF here, or
                    <label className="text-[#27AE60] cursor-pointer ml-1">
                      browse
                      <input
                        type="file"
                        className="hidden"
                        accept=".pdf"
                        onChange={handlePdfUpload}
                        required
                      />
                    </label>
                  </p>
                  <p className="text-sm text-gray-500 mb-2">Supported format: PDF</p>
                  <p className="text-sm text-gray-500">Maximum file size: 10MB</p>
                  {formData.pdf && (
                    <div className="mt-4 text-left bg-gray-50 p-4 rounded-lg">
                      <p className="font-medium">Selected file:</p>
                      <p className="text-gray-600">{formData.pdf.name}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>

        <div className="flex-1">
          <div className="bg-white rounded-xl p-8 shadow-sm h-full">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Summary</h2>
            <div className="bg-[#E9FDEE] rounded-lg p-6">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Category:</span>
                  <span className="font-medium">{formData.category || '-'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Grade:</span>
                  <span className="font-medium">{formData.grade || '-'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Chapter:</span>
                  <span className="font-medium">{formData.chapter || '-'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Book Title:</span>
                  <span className="font-medium">{formData.bookTitle || '-'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Book Price:</span>
                  <span className="font-medium">{formData.price || '-'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">PDF:</span>
                  <span className="font-medium">{formData.pdf?.name || '-'}</span>
                </div>
              </div>
            </div>
            <Custombutton
              value="Add E-Book"
              onClick={handleSubmit}
              backgroundcolor="bg-[#27AE60]"
              textcolor="text-white"
              width="w-full"
              extraClasses="mt-8"
            />
          </div>
        </div>
      </div>

      {showSuccess && (
        <SuccessModal
          isOpen={showSuccess}
          onClose={handleClose}
          type="success"
          title="SUCCESS!"
          message="E-Book Created Successfully"
          buttonText="Close"
        />
      )}

    </div>
  );
};

export default AddSingleEbook;
