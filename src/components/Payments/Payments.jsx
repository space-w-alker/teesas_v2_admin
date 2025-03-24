import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPaymentsAsync, selectPayments } from '../../apis/slices/paymentSlice';
import Custombutton from '../common/Custombutton';
import Headcomponent from '../common/Headcomponent';
import Headers from '../common/Headers';
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const PaymentCard = ({ id, user_name, subscription_type, date, status, subscription_amount, payment_type }) => {
  const navigate = useNavigate();
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Use first letter of subscription_type as fallback for account holder initial
  const initial = subscription_type ? subscription_type[0].toUpperCase() : 'U';

  return (
    <>
      <div className="text-sm text-gray-400 mb-2">{formattedDate}</div>
      <div className="flex items-center justify-between py-4 border-b">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-[#E9FDEE] flex items-center justify-center">
            <span className="text-[#27AE60] font-medium">{initial}</span>
          </div>
          <div>
            <h3 className="font-medium text-gray-900"> {user_name}</h3>
            <p className="text-sm text-gray-500">{subscription_type}</p>
            <div className="flex gap-2 mt-1">
              <span className="text-sm text-gray-500">{payment_type}</span>
              {/* <span className={`text-sm px-2 py-0.5 rounded ${status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                status === 'active' ? 'bg-green-100 text-green-800' :
                  'bg-red-100 text-red-800'
                }`}>
                {status}
              </span> */}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <span className="font-medium text-gray-900">₦{subscription_amount}</span>
          </div>
          <button
            onClick={() => navigate(`/payments/${id}/details`)}
            className="px-4 py-2 hover:text-[#219652] transition-colors font-medium"
          >
            View
          </button>
        </div>
      </div>
    </>
  );
};

const Payments = ({ isOpen }) => {
  const dispatch = useDispatch();
  const { isLoading, data } = useSelector(selectPayments);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 5;

  useEffect(() => {
    dispatch(getPaymentsAsync(currentPage, limit));
  }, [dispatch, currentPage]);

  // Extract data from the response
  const payments = data?.payments || [];
  const statistics = data?.statistics || {};
  const pagination = data?.pagination || {};

  console.log("Payments data:", data);
  console.log("Payments:", payments);

  const handleNextPage = () => {
    if (pagination.pages && currentPage < pagination.pages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""}`}>
      <Headers value1="Home" value2="Payments" />

      <div className="p-6 border-b border-gray-100">
        <div className="flex justify-between items-center">
          <Headcomponent value="Payments" showSearch={false} />
        </div>
      </div>

      <div className="mt-3 bg-white rounded-xl p-6">
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold text-gray-900">Total Amount</h3>
          <div className="flex items-center gap-4 mt-2">
            <span className="text-2xl font-bold">
              ₦ {statistics?.total_amount?.value || 0}
            </span>
            <div className="flex items-center text-green-600">
              <span className="text-sm">+{statistics?.total_amount?.percentage_increase || 0}%</span>
              <span className="text-xs ml-1">vs {statistics?.total_amount?.comparison_period || 'Last Period'}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 mt-6">
        <Headcomponent value="Payments History" border="Border" showSearch={false} />
        <div className="p-6">
          <div className="space-y-2">
            {isLoading ? (
              <div>Loading...</div>
            ) : payments && Array.isArray(payments) && payments.length > 0 ? (
              payments.map((payment) => (
                <PaymentCard
                  key={payment.id}
                  {...payment}
                />
              ))
            ) : (
              <div>No payments found</div>
            )}
          </div>
          <div className="flex justify-between items-center mt-6">
            <Custombutton
              value="Previous"
              // hidden={currentPage === 1 ? "hidden" : ""}
              icon={<FaArrowLeft />}
              backgroundcolor="bg-[#F2F2F2]"
              textcolor="text-[#000000]"
              imagePosition="left"
              onClick={handlePrevPage}
            />

            <div className="text-sm text-gray-600">
              Page {currentPage} of {pagination.pages || 1}
            </div>

            <Custombutton
              value="Next"
              // hidden={currentPage >= (pagination.pages || 1) ? "hidden" : ""}
              icon={<FaArrowRight />}
              backgroundcolor="bg-[#F2F2F2]"
              textcolor="text-[#000000]"
              imagePosition="right"
              onClick={handleNextPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payments;
