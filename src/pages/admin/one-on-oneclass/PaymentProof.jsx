import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaChevronLeft } from "react-icons/fa";
import Custombutton from '../../../components/common/Custombutton';
import SuccessModal from '../../../components/common/SuccessModal';
import banklogo from "../../../assets/images/banklogo.png";
import { config } from "../../../apis/client/config";
import { TailSpin } from "react-loader-spinner";
import {
    getBankTransferDetailsAsync,
    selectBankTransferDetails,
    acceptBankTransferAsync,
    rejectBankTransferAsync
} from '../../../apis/slices/liveClassSlice';

const PaymentProof = ({ isOpen }) => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoading, data: bankTransferData, error } = useSelector(selectBankTransferDetails);
    const [isConfirming, setIsConfirming] = useState(false);
    const [isRejecting, setIsRejecting] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showRejectModal, setShowRejectModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const token = localStorage.getItem("authToken");

    useEffect(() => {
        if (id) {
            getBankTransferDetailsAsync({
                dispatch,
                liveClassId: id,
                token,
            });
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

        try {
            await acceptBankTransferAsync({
                dispatch,
                liveClassId: id,
                bankTransferId: bankTransferData[0].id,
                token,
                callbackFn: (res) => {
                    if (res?.data?.status === 200) {
                        setSuccessMessage("Payment accepted successfully! Student has been enrolled in the class.");
                        setShowSuccessModal(true);

                        // Refresh the data
                        getBankTransferDetailsAsync({
                            dispatch,
                            liveClassId: id,
                            token,
                        });
                    } else {
                        console.error("Failed to accept payment:", res?.data?.message);
                    }
                }
            });
        } finally {
            setIsConfirming(false);
        }
    };

    const handleReject = async () => {
        setShowRejectModal(false);
        setIsRejecting(true);

        try {
            await rejectBankTransferAsync({
                dispatch,
                requestId: bankTransferData[0].id,
                token,
                callbackFn: (res) => {
                    if (res?.data?.status === 200) {
                        setSuccessMessage("Payment rejected successfully!");
                        setShowSuccessModal(true);

                        // Refresh the data
                        getBankTransferDetailsAsync({
                            dispatch,
                            liveClassId: id,
                            token,
                        });
                    } else {
                        console.error("Failed to reject payment:", res?.data?.message);
                    }
                }
            });
        } finally {
            setIsRejecting(false);
        }
    };

    if (isLoading) {
        return (
            <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""}`}>
                <div className="flex justify-center items-center h-[50vh]">
                    <TailSpin color="#27AE60" height={80} width={80} />
                </div>
            </div>
        );
    }

    if (error || !bankTransferData || bankTransferData.length === 0) {
        return (
            <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""}`}>
                <div className="flex justify-start items-center lg:gap-3">
                    <FaChevronLeft
                        onClick={() => navigate(-1)}
                        className="cursor-pointer"
                    />
                    <div>
                        <div className="font-normal text-[14px] lg:text-[16px] leading-[20px] text-[#B6B6B6]">
                            Home / One-on-One Classes / <span className="text-black font-medium">Payment Details</span>
                        </div>
                    </div>
                </div>
                <div className="mt-10 text-center">
                    <h2 className="text-xl font-semibold text-gray-700">No payment details found for this class</h2>
                    <button
                        className="mt-4 px-4 py-2 bg-[#27AE60] text-white rounded-lg"
                        onClick={() => navigate(-1)}
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    const paymentData = bankTransferData[0];
    const imageUrl = `${config.MainUrl}${paymentData.proofImage}`;
    // Updated to check for 'in-progress' status
    const isPending = paymentData.status === 'pending' || paymentData.status === 'in-progress';

    return (
        <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""}`}>
            <div className="flex justify-start items-center lg:gap-3">
                <FaChevronLeft
                    onClick={() => navigate(-1)}
                    className="cursor-pointer"
                />

                <div>
                    <div className="font-normal text-[14px] lg:text-[16px] leading-[20px] text-[#B6B6B6]">
                        Home / One-on-One Classes / <span className="text-black font-medium">Payment Details</span>
                    </div>
                </div>
            </div>
            <h2 className="mt-5 font-bold text-[22px] leading-[28px] text-[#2C2E32]">
                Payment Details
            </h2>

            <div className="bg-[#E9FDEE] rounded-xl p-6 mt-4 mb-6">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#FFFFFF] flex items-center justify-center">
                        <span className="text-[#27AE60] font-medium text-xl">{paymentData.user.name[0]}</span>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">{paymentData.user.name}</h2>
                        <span className={`inline-block px-3 py-1 rounded-full text-sm ${paymentData.status === 'pending' || paymentData.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                            paymentData.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                                'bg-red-100 text-red-800'
                            }`}>
                            {paymentData.status}
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
                        <p className="text-gray-600">Bank Transfer</p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                <div className="border-b border-gray-200 pb-2 mb-4 flex justify-between items-center">
                    <h3 className="text-lg font-bold text-gray-900">Payment Proof</h3>

                    {isPending && (
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
                    {paymentData.proofImage ? (
                        <img
                            src={imageUrl}
                            alt="Payment Proof"
                            className="w-full h-[600px] object-contain rounded"
                            onError={(e) => {
                                console.log("Image load error:", e);
                                e.target.style.display = 'none';
                                e.target.parentNode.innerHTML = '<p class="text-center text-gray-500 py-10">Failed to load image</p>';
                            }}
                        />
                    ) : (
                        <div className="w-full h-[300px] flex items-center justify-center bg-gray-100 rounded">
                            <p className="text-gray-500">No proof image available</p>
                        </div>
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
                            <p className="text-gray-600">Class:</p>
                            <p className="font-medium">{paymentData.liveClass.topic} - {paymentData.liveClass.subject}</p>
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
                            <p className="text-gray-600">Account Holder:</p>
                            <p className="font-medium">{paymentData.accountHolderName}</p>
                        </div>
                        <div>
                            <p className="text-gray-600">Device ID:</p>
                            <p className="font-medium">{paymentData.device_id}</p>
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
                            <p className="text-gray-600">Email:</p>
                            <p className="font-medium">{paymentData.user.email}</p>
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

export default PaymentProof;
