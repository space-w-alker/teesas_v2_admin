import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPaymentDetailsAsync, selectPaymentDetails } from '../../apis/slices/paymentSlice';
import Headers from '../common/Headers';
import banklogo from "../../assets/images/banklogo.png";
import { config } from "../../apis/client/config";
const PaymentDetails = ({ isOpen }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data: paymentData, isLoading } = useSelector(selectPaymentDetails);

  useEffect(() => {
    if (id) {
      dispatch(getPaymentDetailsAsync(id));
    }
  }, [dispatch, id]);

  if (isLoading || !paymentData) return <div>Loading...</div>;

  const { payment_info, user_info, transaction_details } = paymentData;
  const imageUrl = `${config.MainUrl}${transaction_details.proof_image}`;

  return (
    <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""}`}>
      <Headers value1="Home" value2="Payment Details" />

      <div className="bg-[#E9FDEE] rounded-xl p-6 mt-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#FFFFFF] flex items-center justify-center">
            <span className="text-[#27AE60] font-medium text-xl">{user_info.name[0]}</span>
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">{user_info.name}</h2>
            <span className={`inline-block px-3 py-1 rounded-full text-sm ${payment_info.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
              payment_info.status === 'completed' ? 'bg-green-100 text-green-800' :
                'bg-red-100 text-red-800'
              }`}>
              {payment_info.status}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="border-b border-gray-200 pb-2 mb-4">
          <h3 className="text-lg font-bold text-gray-900">Payment Method</h3>
        </div>
        <div className="p-4 border border-gray-200 rounded-lg">
          <div className="flex items-center gap-4">
            <img src={banklogo} alt="bank" className="w-8 h-8" />
            <p className="text-gray-600">{payment_info.payment_type}</p>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="border-b border-gray-200 pb-2 mb-4">
          <h3 className="text-lg font-bold text-gray-900">Payment Proof</h3>
        </div>
        <div className="p-4 border border-gray-200 rounded-lg">
          {transaction_details.proof_image && (
            <>
              <img
                src={imageUrl}
                alt="Payment Proof"
                className="w-full h-[400px] object-cover rounded"
                onError={(e) => {
                  console.log("Image load error:", e);
                  e.target.style.display = 'none';
                }}
              />
            </>
          )}
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="border-b border-gray-200 pb-2 mb-4">
          <h3 className="text-lg font-bold text-gray-900">Transaction Details</h3>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600">Subscription:</p>
              <p className="font-medium">{transaction_details.subscription}</p>
            </div>
            <div>
              <p className="text-gray-600">Date:</p>
              <p className="font-medium">{new Date(payment_info.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</p>
            </div>
            <div>
              <p className="text-gray-600">Account Holder:</p>
              <p className="font-medium">{transaction_details.account_holder}</p>
            </div>
            <div>
              <p className="text-gray-600">Device ID:</p>
              <p className="font-medium">{transaction_details.device_id}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PaymentDetails;