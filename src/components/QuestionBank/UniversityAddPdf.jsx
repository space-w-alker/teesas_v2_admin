import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Headers from '../common/Headers';
import Headcomponent from '../common/Headcomponent';
import Custombutton from '../common/Custombutton';
import SuccessModal from '../common/SuccessModal';
import { FaCloudUploadAlt } from "react-icons/fa";
import { addSubjectPdfAsync } from '../../apis/slices/questionBankSlice';
import { TailSpin } from "react-loader-spinner";
import { toast } from 'react-toastify';

const UniversityAddPdf = ({ isOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { subjectId, subjectName } = location.state || {}; const [formData, setFormData] = useState({
    pdfFile: null
  });
  const [dragActive, setDragActive] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("authToken");

  const handlePdfUpload = (e) => {
    if (e.target.files[0] && e.target.files[0].type === 'application/pdf') {
      setFormData({ ...formData, pdfFile: e.target.files[0] });
    } else {
      toast.error("Please select a valid PDF file");
    }
  };

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
      if (e.dataTransfer.files[0].type === 'application/pdf') {
        setFormData({ ...formData, pdfFile: e.dataTransfer.files[0] });
      } else {
        toast.error("Please drop a valid PDF file");
      }
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.pdfFile) {
      toast.error("Please select a PDF file");
      return;
    }

    if (!subjectId) {
      toast.error("Subject ID is required");
      return;
    }

    setLoading(true);

    // Create a new FormData instance
    const pdfFormData = new FormData();

    // IMPORTANT: Use 'pdf' as the field name (case-sensitive)
    pdfFormData.append('pdf', formData.pdfFile);

    // Debug logs
    console.log("File being uploaded:", formData.pdfFile);
    console.log("FormData entries:", [...pdfFormData.entries()]);

    addSubjectPdfAsync({
      subjectId,
      pdfData: pdfFormData,
      token,
      callbackFn: (res) => {
        setLoading(false);

        if (res?.error) {
          console.error("Error response:", res.error);
          toast.error(res?.data?.message || "Failed to upload PDF");
          return;
        }

        if (res?.data?.status === 200) {
          setShowSuccess(true);
        } else {
          toast.error(res?.data?.message || "Failed to upload PDF");
        }
      }
    });
  };
  const handleClose = () => {
    setShowSuccess(false);
    navigate('/university-view-pdf', {
      state: {
        subjectId,
        subjectName
      }
    });
  };

  return (
    <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""}`}>
      <div className='flex justify-start items-center lg:gap-3'>
        <Headers value1="Home" value2="Universities" value3="Add PDF" />
      </div>

      {loading && (
        <div style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 9999,
        }}>
          <TailSpin color="orange" radius={5} />
        </div>
      )}

      <div className="mt-8 flex gap-8">
        <div className="flex-[2] bg-white rounded-xl shadow-sm p-6">
          <Headcomponent value="Add PDF" showSearch={false} />

          <div
            className={`bg-green-50 border-2 border-dashed rounded-lg p-8 text-center ${dragActive ? 'bg-[#E9FDEE] border-[#27AE60]' : 'border-gray-300'
              }`}
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
            {formData.pdfFile && (
              <div className="mt-4 text-left bg-white p-4 rounded-lg">
                <p className="font-medium">Selected file:</p>
                <p className="text-gray-600">{formData.pdfFile.name}</p>
              </div>
            )}
          </div>
        </div>

        <div className="flex-1">
          <div className="bg-white rounded-xl p-8 shadow-sm h-full">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Summary</h2>
            <div className="bg-[#E9FDEE] rounded-lg p-6">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subject:</span>
                  <span className="font-medium">{subjectName || '-'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">PDF File:</span>
                  <span className="font-medium">{formData.pdfFile?.name || '-'}</span>
                </div>
              </div>
            </div>
            <Custombutton
              value="Upload PDF"
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
        onClose={handleClose}
        type="success"
        title="PDF Uploaded Successfully"
        buttonText="Close"
      />
    </div>
  );
};

export default UniversityAddPdf;
