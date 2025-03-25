import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  getPaymentDetailsAsync,
  selectPaymentDetails,
  confirmBankTransferAsync,
  rejectBankTransferAsync
} from '../../apis/slices/paymentSlice';
import Headers from '../common/Headers';
import Custombutton from '../common/Custombutton';
import SuccessModal from '../common/SuccessModal';
import banklogo from "../../assets/images/banklogo.png";
import { config } from "../../apis/client/config";
import { TailSpin } from "react-loader-spinner";

const PaymentDetails = ({ isOpen }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: paymentData, isLoading } = useSelector(selectPaymentDetails);
  const [isConfirming, setIsConfirming] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (id) {
      dispatch(getPaymentDetailsAsync(id));
    }
  }, [dispatch, id]);

  const handleConfirmClick = () => {
    setShowConfirmModal(true);
  };

  const handleRejectClick = () => {
    setShowRejectModal(true);
  };

  const handleConfirm = async () => {
    setShowConfirmModal(false);
    setIsConfirming(true);
    const success = await dispatch(confirmBankTransferAsync(id));
    setIsConfirming(false);

    if (success) {
      setSuccessMessage("Payment confirmed successfully!");
      setShowSuccessModal(true);

      dispatch(getPaymentDetailsAsync(id));
    }
  };

  const handleReject = async () => {
    setShowRejectModal(false);
    setIsRejecting(true);
    const success = await dispatch(rejectBankTransferAsync(id));
    setIsRejecting(false);

    if (success) {
      setSuccessMessage("Payment rejected successfully!");
      setShowSuccessModal(true);

      dispatch(getPaymentDetailsAsync(id));
    }
  };

  if (isLoading || !paymentData) {
    return (
      <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""}`}>
        <div className="flex justify-center items-center h-[50vh]">
          <TailSpin color="#27AE60" height={80} width={80} />
        </div>
      </div>
    );
  }

  const { payment_info, user_info, transaction_details } = paymentData;
  const isBankTransfer = payment_info.payment_type === 'Bank Transfer';
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
        <div className="border-b border-gray-200 pb-2 mb-4 flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-900">Payment Proof</h3>

          {isBankTransfer && payment_info.status === 'in-progress' && (
            <div className="flex gap-3">
              <Custombutton
                value={isConfirming ? "Confirming..." : "Confirm Payment"}
                onClick={handleConfirmClick}
                backgroundcolor="bg-[#27AE60]"
                textcolor="text-white"
                disabled={isConfirming}
              />
              <Custombutton
                value={isRejecting ? "Rejecting..." : "Reject Payment"}
                onClick={handleRejectClick}
                backgroundcolor="bg-[#FF4D4F]"
                textcolor="text-white"
                disabled={isRejecting}
              />
            </div>
          )}
        </div>
        <div className="p-4 border border-gray-200 rounded-lg">
          {transaction_details.proof_image && (
            <img
              src={imageUrl}
              alt="Payment Proof"
              className="w-full h-[600px] object-cover rounded"
              onError={(e) => {
                console.log("Image load error:", e);
                e.target.style.display = 'none';
              }}
            />
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
            <div>
              <p className="text-gray-600">Status:</p>
              <p className={`font-medium ${payment_info.status === 'completed' ? 'text-green-600' :
                payment_info.status === 'in-progress' ? 'text-yellow-600' :
                  'text-red-600'
                }`}>
                {payment_info.status}
              </p>
            </div>
          </div>
        </div>
      </div>


      <SuccessModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        type="caution"
        title="CONFIRM PAYMENT"
        message="Are you sure you want to confirm this bank transfer payment?"
        buttonText="Confirm"
        onConfirm={handleConfirm}
      />


      <SuccessModal
        isOpen={showRejectModal}
        onClose={() => setShowRejectModal(false)}
        type="caution"
        title="REJECT PAYMENT"
        message="Are you sure you want to reject this bank transfer payment?"
        buttonText="Reject"
        onConfirm={handleReject}
      />


      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        type="success"
        title="SUCCESS!"
        message={successMessage}
        buttonText="Close"
      />
    </div>
  );
};

export default PaymentDetails;
