import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Headers from '../common/Headers';
import Headcomponent from '../common/Headcomponent';
import Custombutton from '../common/Custombutton';
import SuccessModal from '../common/SuccessModal';
import bookopen from '../../assets/images/bookopen.png';
import { FaFilePdf, FaTimes } from 'react-icons/fa';

const PdfItem = ({ name }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showPdfModal, setShowPdfModal] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <div className="bg-gray-50 rounded-xl p-4 flex items-center justify-between hover:shadow-md transition-shadow">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white rounded-lg">
            <FaFilePdf className="w-6 h-6 text-red-500" />
          </div>
          <span className="font-medium text-gray-800">{name}</span>
        </div>
        <div className="flex gap-4 items-center">
          <Custombutton
            value="View"
            onClick={() => setShowPdfModal(true)}
            textcolor="text-[#27AE60]"
            backgroundcolor="bg-transparent"
            extraStyle="font-medium"
          />
          <Custombutton
            value="Edit"
            onClick={() => navigate('/university-add-pdf', { 
              state: { 
                isEdit: true,
                pdfData: {
                  name: name,
                  file: 'sample.pdf'
                }
              }
            })}
            textcolor="text-[#27AE60]"
            backgroundcolor="bg-transparent"
            extraStyle="font-medium"
          />
          <Custombutton
            value="Delete"
            onClick={() => setShowDeleteModal(true)}
            textcolor="text-red-600"
            backgroundcolor="bg-transparent"
            extraStyle="font-medium"
          />
        </div>
      </div>

      {showPdfModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-4 w-[80%] h-[80%]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">{name}</h2>
              <FaTimes 
                onClick={() => setShowPdfModal(false)} 
                className="w-5 h-5 text-gray-500 cursor-pointer hover:text-gray-700"
              />
            </div>
            <embed
              src="/sample.pdf"
              type="application/pdf"
              className="w-full h-full rounded-lg"
            />
          </div>
        </div>
      )}

      <SuccessModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        type="caution"
        title="Delete PDF"
        message="Are you sure you want to delete this PDF?"
        buttonText="Delete"
      />
    </>
  );
};const UniversitySubjectDetail = ({ isOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { name } = location.state || {};

  const pdfs = [
    'Chapter 1 PDF',
    'Chapter 2 PDF',
    'Chapter 3 PDF',
    'Chapter 4 PDF'
  ];

  return (
    <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""} transition-all duration-300`}>
      <Headers 
        value1="Home" 
        value2="Subjects" 
        value3={name} 
      />

      <div className=" mt-6 bg-[#E9FDEE] rounded-xl p-6 mb-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white rounded-lg">
            <img src={bookopen} alt="book" className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">{name}</h2>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4 mb-6">
        <Custombutton
          value="Manage"
          onClick={() => {}}
          textcolor="text-[#27AE60]"
          backgroundcolor="bg-white"
          extraStyle="border border-[#27AE60]"
        />
        <Custombutton
          value="Update PDF"
          onClick={() => navigate('/university-add-pdf')}
          textcolor="text-white"
          backgroundcolor="bg-[#27AE60]"
          extraStyle="hover:bg-[#219652]"
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b border-gray-100">
          <Headcomponent value="Added PDFs" showSearch={false} />
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {pdfs.map((pdf, index) => (
              <PdfItem key={index} name={pdf} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniversitySubjectDetail;
