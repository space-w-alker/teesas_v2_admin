import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Headers from '../common/Headers';
import Headcomponent from '../common/Headcomponent';
import Custombutton from '../common/Custombutton';
import book from '../../assets/images/book.png';
import { TailSpin } from "react-loader-spinner";
import { getPromocodeDetailsAsync, selectPromocodeDetails } from '../../apis/slices/promocodeSlice';

const PromoCodeDetails = ({ isOpen }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, data, error } = useSelector(selectPromocodeDetails);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (id) {
      getPromocodeDetailsAsync({
        dispatch,
        id,
        token,
        callbackFn: () => { }
      });
    }
  }, [dispatch, id]);

  if (isLoading) {
    return (
      <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""} transition-all duration-300 flex justify-center items-center`}>
        <TailSpin color="#27AE60" radius={5} />
      </div>
    );
  }

  if (error) {
    return (
      <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""} transition-all duration-300`}>
        <Headers value1="Home" value2="Promo Codes" value3="Error" />
        <div className="mt-6 bg-red-100 text-red-700 p-4 rounded-lg">
          {error}
        </div>
        <div className="mt-4">
          <Custombutton
            value="Back to Promo Codes"
            onClick={() => navigate('/promo-codes')}
            backgroundcolor="bg-[#27AE60]"
            textcolor="text-white"
          />
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""} transition-all duration-300`}>
        <Headers value1="Home" value2="Promo Codes" value3="Not Found" />
        <div className="mt-6 bg-yellow-100 text-yellow-700 p-4 rounded-lg">
          Promo code details not found
        </div>
        <div className="mt-4">
          <Custombutton
            value="Back to Promo Codes"
            onClick={() => navigate('/promo-codes')}
            backgroundcolor="bg-[#27AE60]"
            textcolor="text-white"
          />
        </div>
      </div>
    );
  }

  return (
    <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""} transition-all duration-300`}>
      <Headers value1="Home" value2="Promo Codes" value3={data.code || 'Promo Code'} />

      <div className="mt-6 bg-[#E9FDEE] rounded-xl p-6 mb-6">
        <div className="flex items-center gap-4">
          <img src={book} alt="book" className="w-6 h-6" />
          <div className="flex flex-col">
            <h2 className="font-bold text-gray-900">{data.code}</h2>
            <span className="mt-2 px-4 py-1 rounded-full text-sm w-fit bg-green-100 text-green-600">
              {data.is_active ? 'Active' : 'Inactive'}
            </span>
          </div>
        </div>
      </div>

      <div className="flex justify-between gap-4 mb-6">
        <Custombutton
          value="Back to List"
          onClick={() => navigate('/promo-codes')}
          backgroundcolor="bg-gray-100"
          textcolor="text-gray-700"
        />
        <Custombutton
          value="Edit Promo Code"
          onClick={() => navigate(`/edit-promo-code/${id}`, { state: { code: data } })}
          backgroundcolor="bg-[#27AE60]"
          textcolor="text-white"
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="border-b border-gray-200 pb-2 mb-4">
          <Headcomponent value="Promo Code Details" showSearch={false} />
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <div className="bg-white rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-gray-600">Promo Code:</p>
                <p className="font-medium">{data.code}</p>
              </div>
              <div>
                <p className="text-gray-600">Discount:</p>
                <p className="font-medium">{data.discount_value}{data.discount_type === 'percentage' ? '%' : ' NGN'}</p>
              </div>
              <div>
                <p className="text-gray-600">Valid From:</p>
                <p className="font-medium">{new Date(data.start_date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</p>
              </div>
              <div>
                <p className="text-gray-600">Valid Until:</p>
                <p className="font-medium">{new Date(data.end_date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</p>
              </div>
              <div>
                <p className="text-gray-600">Usage Count:</p>
                <p className="font-medium">{data.usage_count || 0}/{data.max_usage || 'Unlimited'}</p>
              </div>
              <div>
                <p className="text-gray-600">Status:</p>
                <p className="font-medium">{data.is_active ? 'Active' : 'Inactive'}</p>
              </div>
              <div>
                <p className="text-gray-600">Description:</p>
                <p className="font-medium">{data.description || 'No description provided'}</p>
              </div>
              <div>
                <p className="text-gray-600">Created At:</p>
                <p className="font-medium">{new Date(data.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</p>
              </div>
            </div>

            {data.applicable_courses && data.applicable_courses.length > 0 && (
              <div className="mt-6">
                <p className="text-gray-600 mb-2">Applicable Courses:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                  {data.applicable_courses.map((course, index) => (
                    <div key={index} className="bg-gray-50 p-2 rounded">
                      {course.name || course}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromoCodeDetails;
