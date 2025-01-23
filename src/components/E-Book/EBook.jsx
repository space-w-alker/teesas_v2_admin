import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Headers from '../common/Headers';
import Headcomponent from '../common/Headcomponent';
import StatCard from '../common/StatCard';
import Custombutton from '../common/Custombutton';
import SuccessModal from '../common/SuccessModal';
import { FaPlus } from 'react-icons/fa';
import { FaBook } from 'react-icons/fa';
import Modal from '../common/Modal';

const BookItem = ({ name, category }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <div className="bg-gray-50 rounded-xl p-4 flex items-center justify-between hover:shadow-md transition-shadow">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white rounded-lg">
            <FaBook className="w-6 h-6 text-[#27AE60]" />
          </div>
          <div className="flex flex-col">
            <span className="font-medium text-gray-800">{name}</span>
            <span className="text-sm text-blue-500">{category}</span>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <Custombutton
            value="View"
            onClick={() => navigate('/ebook-details')}
            textcolor="text-[#27AE60]"
            backgroundcolor="bg-transparent"
            extraStyle="font-medium"
          />
          <Custombutton
            value="Edit"
            onClick={() => navigate('/add-single-ebook', { 
              state: { 
                isEdit: true,
                ebookData: {
                  category: category,
                  bookTitle: name,
                  grade: 'Grade 1', // Add any other fields needed
                  chapter: 'Chapter 1',
                  description: 'Sample description',
                  pdf: null
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

      <SuccessModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        type="caution"
        title="Delete E-Book"
        message="Are you sure you want to delete this E-Book?"
        buttonText="Delete"
      />
    </>
  );
};

const OrderItem = ({ bookName, price, date }) => (
  <div className="bg-gray-50 rounded-xl p-4 flex items-center justify-between hover:shadow-md transition-shadow">
    <div className="flex items-center gap-4">
      <div className="p-3 bg-white rounded-lg">
        <FaBook className="w-6 h-6 text-[#27AE60]" />
      </div>
      <div>
        <span className="font-medium text-gray-800">{bookName}</span>
        <p className="text-sm text-[#27AE60]">{price}</p>
      </div>
    </div>
  </div>
);

const EBook = ({ isOpen }) => {
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

  const bookOrders = [
    {
      date: '2024-01-15',
      orders: [
        { bookName: 'Advanced Calculus', price: '$45.99' },
        { bookName: 'Organic Chemistry', price: '$39.99' }
      ]
    }
  ];

  return (
    <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""} transition-all duration-300`}>
      <Headers value1="Home" value2="E-Book" />

      <div className="p-6 border-b border-gray-100">
        <div className="flex justify-between items-center">
          <Headcomponent value="E-Books" showSearch={false} />
        </div>
      </div>

      <div className=" mt-6 grid grid-cols-1 gap-8 mb-8">
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

      <div className="bg-white rounded-xl shadow-sm mb-8">
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
        </div>
        <div className="p-4 border-t border-gray-100 flex justify-center">
          <Custombutton
            value="View All"
            onClick={() => navigate('/ebook-list')}
            textcolor="text-gray-500"
            backgroundcolor="bg-gray-100"
  extraStyle="rounded-full px-6 py-2 hover:bg-gray-200"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b border-gray-100">
          <Headcomponent value="Book Order" showSearch={true} />
        </div>
        <div className="p-6">
          {bookOrders.map((orderGroup, groupIndex) => (
            <div key={groupIndex} className="space-y-6">
              <div className="text-gray-400 text-sm">{orderGroup.date}</div>
              <div className="space-y-4">
                {orderGroup.orders.map((order, index) => (
                  <OrderItem
                    key={index}
                    bookName={order.bookName}
                    price={order.price}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 border-t border-gray-100 flex justify-center">
        <Custombutton
  value="View All"
  onClick={() => navigate('/ebook-orders')}
  textcolor="text-gray-500"
  backgroundcolor="bg-gray-100"
  extraStyle="rounded-full px-6 py-2 hover:bg-gray-200"
/>

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
export default EBook;