import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Headers from '../common/Headers';
import Headcomponent from '../common/Headcomponent';
import StatCard from '../common/StatCard';
import Custombutton from '../common/Custombutton';
import Modal from '../common/Modal';
import { FaBook, FaPlus } from 'react-icons/fa';
import sharp from '../../assets/images/sharp.png';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const BookItem = ({ name, category }) => {
  return (
    <div className="bg-white rounded-xl p-4 flex items-center justify-between hover:shadow-md transition-shadow">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-gray-50 rounded-lg">
          <FaBook className="w-6 h-6 text-[#27AE60]" />
        </div>
        <div className="flex flex-col">
          <span className="font-medium text-gray-800">{name}</span>
          <span className="text-sm text-blue-500">{category}</span>
        </div>
      </div>
      <div className="flex gap-4 items-center">
        <Custombutton
          value={
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        <img src={sharp} alt="sharp" className="w-4 h-4" />
                      </div>
                      <span>Visible</span>
                    </div>
                  }
          textcolor="text-blue-600"
          backgroundcolor="bg-[#E9FDEE]"
          extraStyle="px-4 py-2 rounded-lg"
        />
      </div>
    </div>
  );
};

const EbookList = ({ isOpen }) => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleSingleEbook = () => {
    navigate('/add-single-ebook');
    setShowModal(false);
  };

  const handleBulkEbook = () => {
    navigate('/add-bulk-ebook');
    setShowModal(false);
  };

  const ebooks = [
    { name: 'Mathematics Textbook', category: 'Mathematics' },
    { name: 'Physics Guide', category: 'Physics' },
    { name: 'Chemistry Lab Manual', category: 'Chemistry' },
    { name: 'Biology Reference', category: 'Biology' }
  ];

  return (
    <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""} transition-all duration-300`}>
      <Headers value1="Home" value2="E-Book List" />

      <div className="mt-6 bg-white rounded-xl shadow-sm mb-8">
        <StatCard title="Total E-Books" count="150" />
      </div>

      <div className="flex justify-end mb-6">
        <Custombutton
          value={
            <div className="flex items-center gap-2">
              <FaPlus className="text-white" />
              <span>Add E-Book</span>
            </div>
          }
          onClick={() => setShowModal(true)}
          textcolor="text-white"
          backgroundcolor="bg-[#27AE60]"
          extraStyle="hover:bg-[#219652]"
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b border-gray-100">
          <Headcomponent value="E-Book List" showSearch={true} />
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {ebooks.map((book, index) => (
              <BookItem 
                key={index} 
                name={book.name}
                category={book.category}
              />
            ))}
          </div>
          <div className="p-6 border-t border-gray-100 flex justify-between items-center">
          <Custombutton
            value={
              <div className="flex items-center gap-2">
                <FaArrowLeft />
                <span>Previous</span>
              </div>
            }
            backgroundcolor="bg-gray-100"
            textcolor="text-gray-600"
            width="w-[100px]"
            extraStyle="py-2"
          />
          <span className="text-gray-600">Page 1 of 5</span>
          <Custombutton
            value={
              <div className="flex items-center gap-2">
                <span>Next</span>
                <FaArrowRight />
              </div>
            }
            backgroundcolor="bg-gray-100"
            textcolor="text-gray-600"
            width="w-[80px]"
            extraStyle="py-2"
          />
        </div>  
        </div>
      </div>

      {showModal && (
        <Modal
          label="ADD MEDIA"
          closeModal={() => setShowModal(false)}
          value1="Add Single E-Book"
          value2="Upload Bulk E-Books"
          addSingleButton={handleSingleEbook}
          addMutipleButton={handleBulkEbook}
        />
      )}
    </div>
  );
};

export default EbookList;
