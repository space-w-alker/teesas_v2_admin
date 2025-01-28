import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Headers from '../common/Headers';
import Headcomponent from '../common/Headcomponent';
import { FaChevronLeft , FaFilePdf } from 'react-icons/fa';

const PDFItem = ({ name, size, date }) => (
  <div className="bg-gray-50 rounded-xl p-4 flex items-center justify-between hover:shadow-md transition-shadow">
    <div className="flex items-center gap-4">
      <div className="p-3 bg-white rounded-lg">
      <FaFilePdf className="w-6 h-6 text-red-500" />
      </div>
      <div>
        <p className="font-medium text-gray-800">{name}</p>
        <p className="text-sm text-gray-500">{size} • {date}</p>
      </div>
    </div>
    <div className="flex gap-4 items-center">
      <button 
        onClick={() => window.open('/sample.pdf')}
        className="text-[#27AE60] hover:text-[#219652] font-medium"
      >
        Download
      </button>
    </div>
  </div>
);

const UniversityViewPdf = ({ isOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { subjectName } = location.state || {};

  const pdfs = [
    { name: 'Chapter 1 Notes.pdf', size: '2.5 MB', date: '2023-12-01' },
    { name: 'Chapter 2 Notes.pdf', size: '1.8 MB', date: '2023-12-05' },
    { name: 'Practice Questions.pdf', size: '3.2 MB', date: '2023-12-10' },
    { name: 'Study Guide.pdf', size: '4.1 MB', date: '2023-12-15' }
  ];

  return (
    <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""} transition-all duration-300`}>
      <div className='flex justify-start items-center lg:gap-3'>
        <Headers value1="Home" value2="Universities" value3="PDF List" />
      </div>

      <div className="mb-8 mt-6">
        <h1 className="text-2xl font-bold text-gray-900">PDF Documents</h1>
        <p className="text-gray-600 mt-2">Subject: {subjectName}</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b border-gray-100">
          <Headcomponent value="PDF Files" showSearch={true} />
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {pdfs.map((pdf, index) => (
              <PDFItem 
                key={index}
                name={pdf.name}
                size={pdf.size}
                date={pdf.date}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniversityViewPdf;
