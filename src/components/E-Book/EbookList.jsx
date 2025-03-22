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
import SuccessModal from '../common/SuccessModal';


import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listEbooksAsync, addEbookAsync, ebookList } from "../../apis/slices/ebookSlice";


const BookItem = ({ key, ebook }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // console.log('bookitem', ebooks);
  const handleDelete = (ebookId) => {
    // console.log(ebookId);
    dispatch(deleteEbookAsync({
      dispatch, id: ebookId,
    }));
    dispatch(listEbooksAsync({ dispatch, data: sort, token }));
  };
  return (
    <>
      <div className="space-y-4">
        <div key={key} className="bg-gray-50 rounded-xl p-4 flex items-center justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white rounded-lg">
              <FaBook className="w-6 h-6 text-[#27AE60]" />
            </div>
            <div className="flex flex-col">
              <span className="font-medium text-gray-800">{ebook.class.name}</span>
              <span className="text-sm text-blue-500">{ebook.course.name}</span>
            </div>
          </div>
          <div className="flex gap-4 items-center">
            <Custombutton
              value="View"
              onClick={() => navigate(`/ebook-details/${ebook.id}`)}
              textcolor="text-[#27AE60]"
              backgroundcolor="bg-transparent"
              extraStyle="font-medium"
            />
            <Custombutton
              value="Edit"
              onClick={() =>
                navigate("/add-single-ebook", {
                  state: {
                    isEdit: true,
                    ebookData: {
                      id: ebook.id,
                      category: ebook.course.id,
                      bookTitle: ebook.title,
                      grade: ebook.class.id,
                      chapter: ebook.subject_id,
                      description: ebook.short_des,
                      price: ebook.price,
                      icon: ebook.icon,
                      pdf: ebook.source

                    },
                  },
                })
              }
              textcolor="text-[#27AE60]"
              backgroundcolor="bg-transparent"
              extraStyle="font-medium"
            />
            <Custombutton
              value="Delete"
              onClick={() => handleDelete(ebook.id)}
              textcolor="text-red-600"
              backgroundcolor="bg-transparent"
              extraStyle="font-medium"
            />
          </div>
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

  const dispatch = useDispatch();
  const ebooks = useSelector((state) => state.ebook.ebookList || []);
  const token = localStorage.getItem("authToken");
  const [sort, setSort] = useState({
    data: "",
    filterList: "",  // Filters applied
    sort: "",
    search: "",
    page: 1,
    limit: 10
  });

  const handleSearchChange = (e) => {
    setSort((prevSort) => ({ ...prevSort, search: e.target.value }));
  };

  console.log("ebooks heres", ebooks);

  useEffect(() => {
    dispatch(listEbooksAsync({ dispatch, data: sort, token }));
  }, [sort]);


  return (
    <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""} transition-all duration-300`}>
      <Headers value1="Home" value2="E-Book List" />

      <div className="p-6 border-b border-gray-100">
        <div className="flex justify-between items-center">
          <Headcomponent value="E-Books" showSearch={false} />
        </div>
      </div>

      <div className="mt-6 bg-white rounded-xl shadow-sm mb-8">
        <StatCard title="Total E-Books" count={ebooks.totalEbooks} />
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
          <Headcomponent value="E-Book List" showSearch={true} onSearch={handleSearchChange} />
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {ebooks.data?.all_ebook?.map((ebookItem, index) =>
              ebookItem.ebook.map((book, bookIndex) => (
                <BookItem key={`${index}-${bookIndex}`} ebook={book} />
              ))
            )}

          </div>
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
