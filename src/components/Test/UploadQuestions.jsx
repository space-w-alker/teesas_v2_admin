import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { bulkUploadAsync } from '../../apis/slices/questionSlice';
import Headers from '../../components/common/Headers';
import Headcomponent from '../../components/common/Headcomponent';
import Custombutton from '../../components/common/Custombutton';
import SuccessModal from '../../components/common/SuccessModal';
import { FaFileUpload, FaDownload } from 'react-icons/fa';
import { getTopicDetailAsync } from "../../apis/slices/categoriesSlice";

const UploadQuestions = ({ isOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const id = location.state.id || {};
  const upload = useSelector((state) => state.questions?.bulkUploadResponse || {});

  const topics = useSelector((state) => state.categories?.topicDetail?.data || []);
  console.log('topic', id, topics);

  useEffect(() => {
    dispatch(getTopicDetailAsync(id)).then(() => setLoading(false));
  }, [dispatch])

  // Get parameters from state
  const { questionType, topic, category, grade } = location.state || {};
  const isTheory = questionType === 'theory';
  const pageTitle = isTheory ? 'Theory Questions Upload' : 'MCQ Questions Upload';

  // Mock data if not provided in state
  const mockData = {
    category: category || 'Mathematics',
    grade: grade || 'Grade 8',
    topic: topic || 'Algebra Introduction',
    questionCount: 20
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const triggerFileInput = () => {
    document.getElementById('fileUpload').click();
  };

  const handleSubmit = async () => {
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('questionType', questionType);
    if (topics.length > 0) {
      const topic = topics[0]; // Assuming you need the first topic

      formData.append('lesson_id', topic.lesson_id);
      formData.append('subject_id', topic.lesson.chapters.subjects.id); // Extract subject name
      formData.append('class_id', topic.lesson.chapters.subjects.classes.id); // Extract class name
      formData.append('year', topic.lesson.chapters.subjects.classes.id); // Year is same as class
    }



    try {
      console.log('Dispatching bulkUploadAsync...');
      const response = await dispatch(bulkUploadAsync({ dispatch, formData }));
      console.log('Upload response:', response, upload);

      if (upload?.status == 200) {
        setShowSuccessModal(true);
      } else {
        console.error('Upload error response:', response);
        alert(response?.message || 'Upload failed. Please try again.');
      }
    } catch (error) {
      console.error('Upload failed:', error);
      alert(error?.message || 'Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }

  };

  const handleDownloadSample = () => {
    alert(`Downloading sample ${isTheory ? 'theory' : 'MCQ'} question template...`);
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
    navigate('/test-topic-list', {
      state: {
        id,
      }
    });
  };

  return (
    <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""}`}>
      <Headers value1="Home" value2="Practice Subjects" value3={isTheory ? 'Theory Upload' : 'MCQ Upload'} />

      <div className="p-6 border-b border-gray-100">
        <Headcomponent value={pageTitle} showSearch={false} />
      </div>

      <div className="flex gap-6">
        <div className="flex-[2] bg-white rounded-xl p-6">
          <h2 className="text-2xl font-bold mb-6">{pageTitle}</h2>

          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Upload Excel File</label>
              <div className="border-2 border-dashed border-gray-300 py-8 px-4 rounded-lg text-center">
                <input
                  type="file"
                  id="fileUpload"
                  accept=".xls,.xlsx"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <label htmlFor="fileUpload" className="cursor-pointer flex flex-col items-center justify-center">
                  <FaFileUpload className="text-4xl text-gray-400 mb-2" />
                  <span className="text-gray-700 text-lg mb-2">
                    {file ? file.name : "Click to upload XLS or XLSX file"}
                  </span>
                  {!file && <span className="text-sm text-gray-500">Only Excel files are accepted</span>}
                </label>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <Custombutton
                value="Select Excel File"
                backgroundcolor="bg-[#27AE60]"
                textcolor="text-white"
                width="w-full md:w-auto"
                onClick={triggerFileInput}
                extraStyle="hover:bg-[#219652]"
              />

              <Custombutton
                value={<div className="flex items-center gap-2"><FaDownload className="text-sm" /><span>Download Sample File</span></div>}
                backgroundcolor="bg-gray-100"
                textcolor="text-gray-700"
                width="w-full md:w-auto"
                onClick={handleDownloadSample}
              />
            </div>
          </div>
        </div>

        <div className="flex-1 bg-white rounded-xl p-6 h-fit">
          <h3 className="text-xl font-bold mb-6">Summary</h3>

          <div className="space-y-4 bg-green-100 rounded-lg">
            <div>
              <p className="text-gray-600 mb-1">Category</p>
              <p className="font-medium">{mockData.category || 'Not specified'}</p>
            </div>

            <div>
              <p className="text-gray-600 mb-1">Grade</p>
              <p className="font-medium">{mockData.grade || 'Not specified'}</p>
            </div>

            <div>
              <p className="text-gray-600 mb-1">Topic Title</p>
              <p className="font-medium">{mockData.topic || 'Not specified'}</p>
            </div>

            <div>
              <p className="text-gray-600 mb-1">Total Questions</p>
              <p className="font-medium">{mockData.questionCount || 'Not specified'}</p>
            </div>

            <button
              onClick={handleSubmit}
              disabled={!file || uploading}
              className={`w-full py-3 ${uploading ? 'bg-gray-400' : 'bg-[#27AE60]'} text-white rounded-lg font-medium hover:bg-[#219652] mt-6`}
            >
              {uploading ? 'Uploading...' : 'Submit Practice and Mock Test'}
            </button>
          </div>
        </div>
      </div>

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={closeSuccessModal}
        type="success"
        title="Upload Successful"
        message={`${isTheory ? 'Theory' : 'MCQ'} questions have been uploaded successfully!`}
        buttonText="Go to Test List"
        onConfirm={closeSuccessModal}
      />
    </div>
  );
};

export default UploadQuestions;
