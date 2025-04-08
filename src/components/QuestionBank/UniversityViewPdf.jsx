import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Headers from '../common/Headers';
import Headcomponent from '../common/Headcomponent';
import { FaFilePdf } from 'react-icons/fa';
import { getSubjectPdfsAsync, deleteSubjectPdfAsync } from '../../apis/slices/questionBankSlice';
import { useDispatch } from 'react-redux';
import { TailSpin } from "react-loader-spinner";
import SuccessModal from '../common/SuccessModal';
import { toast } from 'react-toastify';
import { config } from '../../apis/client/config';



const PDFItem = ({ pdf, onDelete }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const fileName = pdf.pdf_path.split('/').pop();
  const fileSize = "PDF Document";
  const uploadDate = new Date(pdf.created_at).toLocaleDateString();


  const pdfUrl = `${config.MainUrl}subjects/${fileName}`;
  return (
    <>
      <div className="bg-gray-50 rounded-xl p-4 flex items-center justify-between hover:shadow-md transition-shadow">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white rounded-lg">
            <FaFilePdf className="w-6 h-6 text-red-500" />
          </div>
          <div>
            <p className="font-medium text-gray-800">{fileName}</p>
            <p className="text-sm text-gray-500">{fileSize} • {uploadDate}</p>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <a
            href={
              pdfUrl
            }
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#27AE60] hover:text-[#219652] font-medium"
          >
            View PDF
          </a>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="text-red-500 hover:text-red-600 font-medium"
          >
            Delete
          </button>
        </div>
      </div>

      <SuccessModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        type="caution"
        title="Delete PDF"
        message="Are you sure you want to delete this PDF?"
        buttonText="Delete"
        onConfirm={() => {
          setShowDeleteModal(false);
          onDelete(pdf.id);
        }}
      />
    </>
  );
};
const UniversityViewPdf = ({ isOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { subjectId, subjectName } = location.state || {};
  const [pdfs, setPdfs] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    if (!subjectId) {
      toast.error("Subject ID is required");
      navigate('/university-list');
      return;
    }

    fetchPdfs();
  }, [subjectId]);

  const fetchPdfs = () => {
    setLoading(true);

    getSubjectPdfsAsync({
      dispatch,
      subjectId,
      token,
      callbackFn: (res) => {
        setLoading(false);

        if (res?.data?.status === 200) {
          setPdfs(res.data.data.pdfs || []);
        } else {
          toast.error(res?.data?.message || "Failed to fetch PDFs");
        }
      }
    });
  };

  const handleDeletePdf = (pdfId) => {
    setLoading(true);

    deleteSubjectPdfAsync({
      pdfId,
      token,
      callbackFn: (res) => {
        setLoading(false);

        if (res?.data?.status === 200) {
          toast.success("PDF deleted successfully");
          fetchPdfs();
        } else {
          toast.error(res?.data?.message || "Failed to delete PDF");
        }
      }
    });
  };

  return (
    <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""} transition-all duration-300`}>
      <div className='flex justify-start items-center lg:gap-3'>
        <Headers value1="Home" value2="Universities" value3="PDF List" />
      </div>

      {loading && (
        <div style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 9999,
        }}>
          <TailSpin color="green" radius={5} />
        </div>
      )}

      <div className="mb-8 mt-6">
        <h1 className="text-2xl font-bold text-gray-900">PDF Documents</h1>
        <p className="text-gray-600 mt-2">Subject: {subjectName}</p>
      </div>

      <div className="flex justify-end mb-6">
        <button
          onClick={() => navigate('/university-add-pdf', {
            state: { subjectId, subjectName }
          })}
          className="bg-[#27AE60] text-white px-4 py-2 rounded-md hover:bg-[#219652] transition-colors"
        >
          Add New PDF
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b border-gray-100">
          <Headcomponent value="PDF Files" showSearch={true} />
        </div>
        <div className="p-6">
          {pdfs.length > 0 ? (
            <div className="space-y-4">
              {pdfs.map((pdf) => (
                <PDFItem
                  key={pdf.id}
                  pdf={pdf}
                  onDelete={handleDeletePdf}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No PDF files found for this subject
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UniversityViewPdf;
