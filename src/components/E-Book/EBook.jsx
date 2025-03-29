import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Headers from "../common/Headers";
import Headcomponent from "../common/Headcomponent";
import StatCard from "../common/StatCard";
import Custombutton from "../common/Custombutton";
import SuccessModal from "../common/SuccessModal";
import Modal from "../common/Modal";
import { FaBook, FaPlus } from "react-icons/fa";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  listEbooksAsync,
  listDownloadedEbooksAsync,
  addEbookAsync,
  ebookList,
  deleteEbookAsync,
  updateEbookAsync,
  ebookdownloadedList,
} from "../../apis/slices/ebookSlice";

const BookItem = ({ key, ebook, onDelete }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    onDelete(ebook.id);
    setShowDeleteModal(false);
  };

  return (
    <>
      <div className="space-y-4">
        <div
          key={key}
          className="bg-gray-50 rounded-xl p-4 flex items-center justify-between hover:shadow-md transition-shadow"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white rounded-lg">
              <FaBook className="w-6 h-6 text-[#27AE60]" />
            </div>
            <div className="flex flex-col">
              <span className="font-medium text-gray-800">{ebook.title}</span>
              <span className="text-sm text-blue-500">
                {ebook.class.name} | {ebook.course.name}
              </span>
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
                      pdf: ebook.source,
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

              onClick={handleDelete}
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
        onConfirm={confirmDelete}
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
    navigate("/add-single-ebook");
    setShowModal(false);
  };

  const handleBulkEbook = () => {
    navigate("/add-bulk-ebook");
    setShowModal(false);
  };

  const bookOrders = [
    {
      date: "2024-01-15",
      orders: [],
    },
  ];

  const dispatch = useDispatch();
  const ebooks = useSelector((state) => state.ebook.ebookList || []);
  const bookOrder = useSelector(ebookdownloadedList);
  const token = localStorage.getItem("authToken");

  const [sort, setSort] = useState({
    data: "",
    filterList: "",
    sort: "",
    search: "",
    page: 1,
    limit: 10,
  });

  const [sort2, setSort2] = useState({
    data: "",
    filterList: "",
    sort: "",
    search: "",
    page: 1,
    limit: 10,
    isDownloaded: true,
  });

  const handleSearchChange = (e) => {
    setSort((prev) => ({
      ...prev,
      search: e,
      page: 1, // Reset to first page on new search
    }));
  };
  const handleSearchChange2 = (e) => {
    setSort2((prev) => ({
      ...prev,
      search: e,
      page: 1, // Reset to first page on new search
    }));
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= Math.ceil(ebooks.totalEbooks / sort.limit)) {
      setSort((prev) => ({
        ...prev,
        page: newPage,
      }));
    }
  };

  const handleDownloadedPageChange = (newPage) => {
    if (
      newPage >= 1 &&
      newPage <= Math.ceil(bookOrder?.totalEbooks / sort2.limit)
    ) {
      setSort2((prev) => ({
        ...prev,
        page: newPage,
      }));
    }
  };

  const handleDeleteEbook = (ebookId) => {
    dispatch(
      deleteEbookAsync({
        dispatch,
        id: ebookId,
        token,
        callbackFn: () => {
          // Refresh the list after deletion
          dispatch(listEbooksAsync({ dispatch, data: sort, token }));
        }
      })
    );
  };

  useEffect(() => {
    dispatch(
      listEbooksAsync({
        dispatch,
        data: sort,
        token,
        callbackFn: (data) => {
          console.log("Ebooks data received:", data);
        },
      })
    );

    dispatch(
      listDownloadedEbooksAsync({
        dispatch,
        data: sort2,
        token,
        callbackFn: (data) => {
          console.log("Downloaded ebooks data received:", data);
        },
      })
    );
  }, [dispatch, sort, sort2]);

  const handleDelete = (ebookId) => {
    onDelete(ebookId);
  };
  const latestOnClick = () => {
    setLoading(true);
    console.log("assending");
    setSortKey("Latest");

    setSort((prevSort) => ({
      ...prevSort,
      query_params: {
        ...prevSort.query_params,
        sort: {
          field: "created_at",
          order: "asc",
        },
      },
    }));
    setIsModalFilterOpen(false);
  };

  const oldestOnClick = () => {
    setLoading(true);
    console.log("desending");

    setSortKey("Oldest");

    setSort((prevSort) => ({
      ...prevSort,
      query_params: {
        ...prevSort.query_params,
        sort: {
          field: "created_at",
          order: "desc",
        },
      },
    }));
    setIsModalFilterOpen(false);
  };
  const totalPages = Math.ceil(ebooks.totalEbooks / sort.limit);
  const totalDownloadedPages = Math.ceil(bookOrder?.totalEbooks / sort2.limit);

  return (
    <div
      className={`py-[7rem] lg:px-[5rem] px-[10px] ${
        isOpen ? "xl:ml-[260px]" : ""
      } transition-all duration-300`}
    >
      <Headers value1="Home" value2="E-Book" />

      <div className="p-6 border-b border-gray-100">
        <div className="flex justify-between items-center">
          <Headcomponent
            value="E-Books"
            showSearch={false}
            showFilter={false}
            showMenu={false}
          />
        </div>
      </div>

      <div className=" mt-6 grid grid-cols-1 gap-8 mb-8">
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
          onClick={() => navigate("/add-single-ebook")}
          textcolor="text-white"
          backgroundcolor="bg-[#27AE60]"
          extraStyle="hover:bg-[#219652]"
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm mb-8">
        <div className="p-6 border-b border-gray-100">
          <Headcomponent
            value="E-Book List"
            showSearch={true}
            onSearch={handleSearchChange}
            latestOnClick={latestOnClick}
            oldestOnClick={oldestOnClick}
          />
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {ebooks.data?.all_ebook?.map((ebookItem, index) =>
              ebookItem.ebook.map((book, bookIndex) => (
                <BookItem
                  key={`${index}-${bookIndex}`}
                  ebook={book}
                  onDelete={handleDeleteEbook}
                />
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
            onClick={() => handlePageChange(sort.page - 1)}
            disabled={sort.page === 1}
            backgroundcolor={sort.page === 1 ? "bg-gray-200" : "bg-gray-100"}
            textcolor="text-gray-600"
            width="w-[100px]"
            extraStyle="py-2"
          />
          <span className="text-gray-600">
            Page {sort.page} of {totalPages || 1}
          </span>
          <Custombutton
            value={
              <div className="flex items-center gap-2">
                <span>Next</span>
                <FaArrowRight />
              </div>
            }
            onClick={() => handlePageChange(sort.page + 1)}
            disabled={sort.page === totalPages}
            backgroundcolor={
              sort.page === totalPages ? "bg-gray-200" : "bg-gray-100"
            }
            textcolor="text-gray-600"
            width="w-[80px]"
            extraStyle="py-2"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b border-gray-100">
          <Headcomponent
            value="Book Order"
            showSearch={true}
            showFilter={false}
            showMenu={false}
            onSearch={handleSearchChange2}
          />
        </div>
        <div className="p-6">
          {bookOrders.map((orderGroup, groupIndex) => (
            <div key={groupIndex} className="space-y-6">
              <div className="text-gray-400 text-sm">{orderGroup.date}</div>
              <div className="space-y-4">
                {bookOrder.data?.all_ebook?.map((ebookItem, index) =>
                  ebookItem.ebook.map((book, bookIndex) => (
                    <OrderItem
                      key={`${index}-${bookIndex}`}
                      bookName={book.title}
                      price={book.price}
                    />
                  ))
                )}
              </div>
            </div>
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
            onClick={() => handleDownloadedPageChange(sort2.page - 1)}
            disabled={sort2.page === 1}
            backgroundcolor={sort2.page === 1 ? "bg-gray-200" : "bg-gray-100"}
            textcolor="text-gray-600"
            width="w-[100px]"
            extraStyle="py-2"
          />
          <span className="text-gray-600">
            Page {sort2.page} of {totalDownloadedPages || 1}
          </span>
          <Custombutton
            value={
              <div className="flex items-center gap-2">
                <span>Next</span>
                <FaArrowRight />
              </div>
            }
            onClick={() => handleDownloadedPageChange(sort2.page + 1)}
            disabled={sort2.page === totalDownloadedPages}
            backgroundcolor={
              sort2.page === totalDownloadedPages
                ? "bg-gray-200"
                : "bg-gray-100"
            }
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
          // value2="Upload Bulk E-Books"
          addSingleButton={handleSingleEbook}
          // addMutipleButton={handleBulkEbook}
        />
      )}
    </div>
  );
};
export default EBook;
