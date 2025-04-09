import React, { useState, useEffect } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import book from '../../assets/images/receip.png';
import productImage from '../../assets/images/productImage.png';
import { TailSpin } from "react-loader-spinner";
import SuccessModal from '../common/SuccessModal';
import banklogo from "../../assets/images/banklogo.png";
import onlinePaymentIcon from "../../assets/images/banklogo.png";
import { config } from "../../apis/client/config";
import Custombutton from '../common/Custombutton';
import {
  getBankTransferDetailsAsync,
  selectBankTransferDetails,
  acceptBankTransferAsync,
  rejectBankTransferAsync
} from '../../apis/slices/omotabSlice';

const OrderItemDetails = ({ isOpen }) => {
  const location = useLocation();
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orderNumber = location.state?.orderNumber || id || 'Order Number';
  const amount = location.state?.amount || '₦0';
  const status = location.state?.status || 'pending';
  const token = localStorage.getItem("authToken");

  const { isLoading, data: paymentData, error } = useSelector(selectBankTransferDetails);
  const [isConfirming, setIsConfirming] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    console.log("Order ID from params:", id);
    console.log("Order ID from location state:", location.state?.orderNumber);

    const orderId = id || location.state?.orderNumber;

    if (orderId) {
      console.log("Fetching payment details for order:", orderId);
      dispatch(getBankTransferDetailsAsync({
        dispatch,
        orderId,
        token,
      }));
    } else {
      console.error("No order ID available to fetch payment details");
    }
  }, [dispatch, id, location.state]);

  useEffect(() => {
    console.log("Payment data:", paymentData);
    console.log("Payment loading:", isLoading);
    console.log("Payment error:", error);
  }, [paymentData, isLoading, error]);

  const handleConfirmClick = () => {
    setShowConfirmModal(true);
  };

  const handleRejectClick = () => {
    setShowRejectModal(true);
  };

  const handleConfirm = async () => {
    setShowConfirmModal(false);
    setIsConfirming(true);

    try {
      await dispatch(acceptBankTransferAsync({
        dispatch,
        bankTransferId: paymentData.id,
        token,
        callbackFn: (res) => {
          if (res?.data?.status === 200) {
            setSuccessMessage("Payment accepted successfully!");
            setShowSuccessModal(true);
          } else {
            console.error("Failed to accept payment:", res?.data?.message);
          }
        }
      }));
    } finally {
      setIsConfirming(false);
    }
  };

  const handleReject = async () => {
    setShowRejectModal(false);
    setIsRejecting(true);

    try {
      await dispatch(rejectBankTransferAsync({
        dispatch,
        bankTransferId: paymentData.id,
        token,
        callbackFn: (res) => {
          if (res?.data?.status === 200) {
            setSuccessMessage("Payment rejected successfully!");
            setShowSuccessModal(true);
          } else {
            console.error("Failed to reject payment:", res?.data?.message);
          }
        }
      }));
    } finally {
      setIsRejecting(false);
    }
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    navigate('/produuct-list');
  };

  return (
    <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""} transition-all duration-300`}>
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-400">Home</span>
          <span className="text-gray-400">/</span>
          <span className="text-gray-400">Orders</span>
          <span className="text-gray-400">/</span>
          <span className="text-gray-900 font-medium">Order #{orderNumber}</span>
        </div>
      </div>

      <div className="bg-[#E9FDEE] rounded-xl p-6 mb-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white rounded-lg">
            <img src={book} alt="order" className="w-8 h-8" />
          </div>
          <div className="flex flex-col">
            <h2 className="font-bold text-gray-900">Order #{orderNumber}</h2>
            <span className={`px-3 py-1 rounded-full text-sm w-fit ${status === 'pending' || status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
              status === 'success' || status === 'confirmed' || status === 'paid' ? 'bg-green-100 text-green-800' :
                'bg-red-100 text-red-800'
              }`}>
              {status}
            </span>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-[200px]">
          <TailSpin color="#27AE60" height={80} width={80} />
        </div>
      ) : error ? (
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="text-center text-red-500">
            <p>Error loading payment details: {error}</p>
          </div>
        </div>
      ) : paymentData ? (
        <>

          {paymentData.isOnlinePayment ? (

            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <div className="border-b border-gray-200 pb-2 mb-4">
                <h3 className="text-lg font-bold text-gray-900">Online Payment Details</h3>
              </div>

              <div className="p-4 border border-gray-200 rounded-lg mb-4">
                <div className="flex items-center gap-4 mb-4">
                  <img src={onlinePaymentIcon} alt="online payment" className="w-8 h-8" />
                  <p className="text-gray-600">Online Payment ({paymentData.payment_type})</p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600">Payment Type:</p>
                    <p className="font-medium">{paymentData.payment_type}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Payment Status:</p>
                    <p className={`font-medium ${paymentData.payment_status === 'paid' ? 'text-green-600' : 'text-yellow-600'
                      }`}>
                      {paymentData.payment_status}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Transaction ID:</p>
                    <p className="font-medium">{paymentData.transaction_id}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (

            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <div className="border-b border-gray-200 pb-2 mb-4 flex justify-between items-center">
                <h3 className="text-lg font-bold text-gray-900">Payment Proof</h3>

                {(paymentData.status === 'pending' || paymentData.status === 'in-progress') && (
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

              <div className="p-4 border border-gray-200 rounded-lg mb-4">
                <div className="flex items-center gap-4 mb-4">
                  <img src={banklogo} alt="bank" className="w-8 h-8" />
                  <p className="text-gray-600">Bank Transfer</p>
                </div>

                {paymentData.proofImage ? (
                  <img
                    src={`${config.MainUrl}${paymentData.proofImage}`}
                    alt="Payment Proof"
                    className="w-full h-[400px] object-contain rounded"
                    onError={(e) => {
                      console.log("Image load error:", e);
                      e.target.style.display = 'none';
                      e.target.parentNode.innerHTML = '<p class="text-center text-gray-500 py-10">Failed to load image</p>';
                    }}
                  />
                ) : (
                  <div className="w-full h-[200px] flex items-center justify-center bg-gray-100 rounded">
                    <p className="text-gray-500">No proof image available</p>
                  </div>
                )}
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600">Account Holder:</p>
                    <p className="font-medium">{paymentData.accountHolderName}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Date:</p>
                    <p className="font-medium">{new Date(paymentData.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Status:</p>
                    <p className={`font-medium ${paymentData.status === 'confirmed' ? 'text-green-600' :
                      paymentData.status === 'pending' || paymentData.status === 'in-progress' ? 'text-yellow-600' :
                        'text-red-600'
                      }`}>
                      {paymentData.status}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Customer:</p>
                    <p className="font-medium">{paymentData.user?.name || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Email:</p>
                    <p className="font-medium">{paymentData.user?.email || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Phone:</p>
                    <p className="font-medium">{paymentData.user?.phone || 'N/A'}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="text-center text-gray-500">
            <p>No payment details available for this order.</p>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="border-b border-gray-200 pb-2 mb-4">
          <h3 className="text-lg font-bold text-gray-900">Order Details</h3>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="bg-white rounded-lg p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">Order Number:</p>
                <p className="font-medium">#{orderNumber}</p>
              </div>
              <div>
                <p className="text-gray-600">Order Date:</p>
                <p className="font-medium">January 20, 2024</p>
              </div>
              <div>
                <p className="text-gray-600">Amount:</p>
                <p className="font-medium text-green-600">{amount}</p>
              </div>
              <div>
                <p className="text-gray-600">Payment Status:</p>
                <p className={`font-medium ${(status === 'confirmed' || status === 'success' || status === 'paid') ? 'text-green-600' :
                  (status === 'pending' || status === 'in-progress') ? 'text-yellow-600' :
                    'text-red-600'
                  }`}>
                  {status}
                </p>
              </div>
              <div>
                <p className="text-gray-600">Customer Name:</p>
                <p className="font-medium">{paymentData?.user?.name || 'John Doe'}</p>
              </div>
              <div>
                <p className="text-gray-600">Contact:</p>
                <p className="font-medium">{paymentData?.user?.phone || '+234 123 456 7890'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="border-b border-gray-200 pb-2 mb-4">
          <h3 className="text-lg font-bold text-gray-900">Order Items</h3>
        </div>
        <div className="space-y-4">
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center gap-4">
              <img src={productImage} alt="product" className="w-full h-[800px] object-cover rounded" />
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
        onClose={handleSuccessModalClose}
        type="success"
        title="SUCCESS!"
        message={successMessage}
        buttonText="Close"
      />
    </div>
  );
};

export default OrderItemDetails;
