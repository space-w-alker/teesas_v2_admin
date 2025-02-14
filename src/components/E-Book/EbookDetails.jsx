import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Headers from '../common/Headers';
import Headcomponent from '../common/Headcomponent';
import Custombutton from '../common/Custombutton';
import { FaBook } from 'react-icons/fa';
import Screenshot from '../../assets/images/Screenshot.png';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getEbookDetailsAsync } from '../../apis/slices/ebookSlice';


const EbookDetails = ({ isOpen }) => {
  const location = useLocation();
  const { id } = useParams();

  const dispatch = useDispatch();
  const ebooks = useSelector((state) => state.ebook.ebookDetails || []);

  useEffect(() => {
    dispatch(getEbookDetailsAsync({ dispatch, id }));
  }, []);

  console.log(ebooks.data.ebook.class.name)
  const bookName = location.state?.name || ebooks.data.ebook.title;

  return (
    <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""} transition-all duration-300`}>
      <Headers
        value1="Home"
        value2="E-Books"
        value3={bookName}
      />

      <div className="mt-6 bg-[#E9FDEE] rounded-xl p-6 mb-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white rounded-lg">
            <FaBook className="w-5 h-5 text-[#27AE60]" />
          </div>
          <div className="flex flex-col">
            <h2 className="font-bold text-gray-900">{bookName}</h2>
            <Custombutton
              value="Visible"
              textcolor="text-[#27AE60]"
              backgroundcolor="bg-[#E9FDEE]"
              extraStyle="mt-2 w-fit"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-center mb-6">
        <Custombutton
          value="Manage"
          textcolor="text-[#27AE60]"
          backgroundcolor="bg-transparent"
          extraStyle="font-medium"
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="border-b border-gray-200 pb-2 mb-4">
          <Headcomponent value="Details" showSearch={false} />
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="bg-white rounded-lg p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">Category:</p>
                <p className="font-medium">{ebooks.data.ebook.course.name}</p>
              </div>
              <div>
                <p className="text-gray-600">Grade:</p>
                <p className="font-medium">{ebooks.data.ebook.class.name}</p>
              </div>
              <div>
                <p className="text-gray-600">Chapter:</p>
                <p className="font-medium">{ebooks.data.ebook.subject.name}</p>
              </div>
              <div>
                <p className="text-gray-600">Status:</p>
                <p className="font-medium text-[#27AE60]">{ebooks.data.ebook.status == "1" ? "Active" : "Inactive"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="border-b border-gray-200 pb-2 mb-4">
          <Headcomponent value="Uploaded E-Book" showSearch={false} />
        </div>
        <div className="space-y-4">
          <div className="p-4 border border-gray-200 rounded-lg">
            <img src={Screenshot} alt="ebook preview" className="w-full h-[400px] object-cover rounded" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EbookDetails;
