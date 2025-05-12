import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateWithdrawRequestAsync } from "../../apis/slices/teacherSlice";
import Headers from "../common/Headers";
import Custombutton from "../common/Custombutton";
import SuccessModal from "../common/SuccessModal";
import banklogo from "../../assets/images/banklogo.png";
import { TailSpin } from "react-loader-spinner";

const WithdrawRequestDetails = ({ isOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [isConfirming, setIsConfirming] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [paymentData, setpayemntData] = useState(location.state?.data || {});
  const token = localStorage.getItem("token"); // Assuming token is stored in localStorage

  const handleConfirmClick = () => {
    setShowConfirmModal(true);
  };
  const handleRejectClick = () => {
    setShowRejectModal(true);
  };

  const handleConfirm = async () => {
    setShowConfirmModal(false);
    setIsConfirming(true);
    const body = {
      id: paymentData?.id,
      status: "confirmed",
    };
    updateWithdrawRequestAsync({
      dispatch,
      token,
      body,
      callbackFn: (response) => {
        if (response?.data?.status === 200) {
          setSuccessMessage("Payment confirmed successfully!");
          setShowSuccessModal(true);
          navigate(-1);
        } else {
          console.error("Error confirming payment:", response?.data?.message);
        }
      },
    });
  };

  const handleReject = async () => {
    setShowRejectModal(false);
    setIsRejecting(true);
    const body = {
      id: paymentData?.id,
      status: "rejected",
    };
    updateWithdrawRequestAsync({
      dispatch,
      token,
      body,
      callbackFn: (response) => {
        setIsRejecting(false);
        if (response?.data?.status === 200) {
          setSuccessMessage("Payment rejected successfully!");
          setShowSuccessModal(true);
          navigate(-1);
        } else {
          console.error("Error rejecting payment:", response?.data?.message);
        }
      },
    });
  };

  if (isLoading || !paymentData) {
    return (
      <div
        className={`py-[7rem] lg:px-[5rem] px-[10px] ${
          isOpen ? "xl:ml-[260px]" : ""
        }`}
      >
        <div className="flex justify-center items-center h-[50vh]">
          <TailSpin color="#27AE60" height={80} width={80} />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`py-[7rem] lg:px-[5rem] px-[10px] ${
        isOpen ? "xl:ml-[260px]" : ""
      }`}
    >
      <Headers value1="Home" value2="Withdraw Request Details" />

      <div className="bg-[#E9FDEE] rounded-xl p-6 mt-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#FFFFFF] flex items-center justify-center">
            <span className="text-[#27AE60] font-medium text-xl">
              {paymentData?.user?.name[0]}
            </span>
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {paymentData?.user?.name}
            </h2>
            <span
              className={`inline-block px-3 py-1 rounded-full capitalize text-sm ${
                paymentData?.status === "confirmed"
                  ? "bg-green-100 text-green-800"
                  : paymentData?.status === "rejected"
                  ? "bg-red-100 text-red-800"
                  : paymentData?.status === "in-progress"
                  ? "bg-yellow-100 text-yellow-800"
                  : paymentData?.status === "completed"
                  ? "bg-green-100 text-green-800"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {paymentData?.status}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="border-b border-gray-200 pb-2 mb-4">
          <h3 className="text-lg font-bold text-gray-900">
            Withdraw Request Details
          </h3>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600">Name:</p>
              <p className="font-medium capitalize">
                {paymentData?.user?.name}
              </p>
            </div>
            <div>
              <p className="text-gray-600">Account Number:</p>
              <p className="font-medium capitalize">
                {paymentData?.account_number}
              </p>
            </div>
            <div>
              <p className="text-gray-600">Amount:</p>
              <p className="font-medium capitalize">
                ₦{paymentData?.limit_amount}
              </p>
            </div>
            <div>
              <p className="text-gray-600">Bank Name:</p>
              <p className="font-medium capitalize">{paymentData?.bank_name}</p>
            </div>
            <div>
              <p className="text-gray-600">Status:</p>
              <p
                className="capitalize font-medium "
                // className={`font-medium ${
                //   payment_info.status === "active"
                //     ? "text-green-600"
                //     : payment_info.status === "inactive"
                //     ? "text-red-600"
                //     : payment_info.status === "completed"
                //     ? "text-green-600"
                //     : payment_info.status === "in-progress"
                //     ? "text-yellow-600"
                //     : "text-gray-600"
                // }`}
              >
                {paymentData?.status}
              </p>
            </div>
            <div>
              <p className="text-gray-600">Date:</p>
              <p className="font-medium">{paymentData?.created_at}</p>
            </div>
          </div>
        </div>

        {paymentData?.status == "in-progress" ? (
          <div className="mt-6 flex gap-4 justify-end">
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
        ) : (
          ""
        )}
      </div>

      <SuccessModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        type="caution"
        title="CONFIRM REQUEST"
        message="Are you sure you want to confirm this REQUEST transfer payment?"
        buttonText="Confirm"
        onConfirm={handleConfirm}
      />

      <SuccessModal
        isOpen={showRejectModal}
        onClose={() => setShowRejectModal(false)}
        type="caution"
        title="REJECT REQUEST"
        message="Are you sure you want to reject this REQUEST transfer payment?"
        buttonText="Reject"
        onConfirm={handleReject}
      />
    </div>
  );
};

export default WithdrawRequestDetails;
