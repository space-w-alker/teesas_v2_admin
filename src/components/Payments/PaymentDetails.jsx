import React, { useState } from 'react';
import Headers from '../common/Headers';
import Modal from '../common/Modal';
import Custombutton from '../common/Custombutton';
import { useNavigate } from 'react-router-dom';
import banklogo from "../../assets/images/banklogo.png";
import SuccessModal from '../common/SuccessModal';

const PaymentDetails = ({ isOpen }) => {

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showCautionModal, setShowCautionModal] = useState(false);
  const navigate = useNavigate();

  const paymentData = {
    name: "John Doe",
    amount: "₦ 50,000",
    paymentType: "Monthly Subscription/Payment",
    status: "Active",
    date: "January 20, 2024",
    paymentMethod: "Bank Transfer",
    email: "johndoe@example.com",
    phone: "+234 123 456 7890"
  };

  return (
    <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""}`}>
      <Headers value1="Home" value2="Payment Details" />

      <div className="bg-[#E9FDEE] rounded-xl p-6 mt-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#FFFFFF] flex items-center justify-center">
            <span className="text-[#27AE60] font-medium text-xl">{paymentData.name[0]}</span>
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">{paymentData.name}</h2>
            <p className="text-sm text-gray-500">{paymentData.paymentType}</p>
            <Custombutton
              value="Active"
              hidden="hidden"
              backgroundcolor="bg-[#27AE60] rounded-lg"
              textcolor="text-white"
              imagePosition="center"
              width="w-[80px]"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-center mb-8">
        <Custombutton
          value="View Profile"
          hidden="hidden"
          backgroundcolor="bg-[#F2F2F2]"
          textcolor="text-[#27AE60]"
          imagePosition="center"
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="border-b border-gray-200 pb-2 mb-4">
          <h3 className="text-lg font-bold text-gray-900">Payment Method</h3>
        </div>
        <div className="p-4 border border-gray-200 rounded-lg">
          <div className="flex items-center gap-4">
            <img src={banklogo} alt="bank" className="w-8 h-8" />
            <p className="text-gray-600">{paymentData.paymentMethod}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="border-b border-gray-200 pb-2 mb-4">
          <h3 className="text-lg font-bold text-gray-900">Payment Details</h3>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="bg-white rounded-lg p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">Amount:</p>
                <p className="font-medium text-[#27AE60]">{paymentData.amount}</p>
              </div>
              <div>
                <p className="text-gray-600">Payment Date:</p>
                <p className="font-medium">{paymentData.date}</p>
              </div>
              <div>
                <p className="text-gray-600">Email:</p>
                <p className="font-medium">{paymentData.email}</p>
              </div>
              <div>
                <p className="text-gray-600">Phone:</p>
                <p className="font-medium">{paymentData.phone}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-4 mt-6">
          <Custombutton
            value="Reject"
            hidden="hidden"
            backgroundcolor="bg-red-500"
            textcolor="text-white"
            imagePosition="center"
            width="w-[80px]"
            onClick={() => setShowCautionModal(true)}
          />
          <Custombutton
            value="Approve"
            hidden="hidden"
            backgroundcolor="bg-[#27AE60]"
            textcolor="text-white"
            imagePosition="center"
            width="w-[80px]"
            onClick={() => setShowSuccessModal(true)}

          />
        </div>
      </div>
      


<SuccessModal
  isOpen={showSuccessModal}
  onClose={() => setShowSuccessModal(false)}
  type="success"
  title="Payment Approved!"
  message="The payment has been successfully approved."
  buttonText="Continue"
/>


<SuccessModal
  isOpen={showCautionModal}
  onClose={() => setShowCautionModal(false)}
  type="caution"
  title="Confirm Rejection"
  message="Are you sure you want to reject this payment?"
  buttonText="Confirm"
/>


    </div>
  );
};

export default PaymentDetails;
