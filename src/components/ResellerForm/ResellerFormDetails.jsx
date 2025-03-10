import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  getResellerDetailsAsync,
  selectResellerDetails,
  approveResellerAsync,
  rejectResellerAsync,
  selectResellerAction,
  resetResellerAction
} from '../../apis/slices/resellersSlice';
import Headers from '../common/Headers';
import Headcomponent from '../common/Headcomponent';
import Custombutton from '../common/Custombutton';
import SuccessModal from '../common/SuccessModal';
import { TailSpin } from "react-loader-spinner";
import { toast } from 'react-toastify';
import { config } from '../../apis/client/config';

const ResellerFormDetails = ({ isOpen }) => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [showCaution, setShowCaution] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [rejectionNotes, setRejectionNotes] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const resellerId = location.state?.id;
  const resellerDetailsState = useSelector(selectResellerDetails);
  const resellerActionState = useSelector(selectResellerAction);
  const { isLoading, data: resellerData, error } = resellerDetailsState;

  // Reset action state when component unmounts
  useEffect(() => {
    return () => {
      dispatch(resetResellerAction());
    };
  }, [dispatch]);

  useEffect(() => {
    if (resellerId) {
      console.log("Fetching details for reseller ID:", resellerId);
      dispatch(getResellerDetailsAsync(resellerId));
    } else {
      toast.error("No reseller ID provided");
      navigate('/reseller-form');
    }
  }, [dispatch, resellerId, navigate]);

  useEffect(() => {
    if (error) {
      toast.error("Error loading reseller details: " + error);
    }
  }, [error]);

  // Effect for action state changes
  useEffect(() => {
    if (resellerActionState.success) {
      if (resellerActionState.message?.includes("approved")) {
        setShowSuccess(true);
        toast.success(resellerActionState.message || "Reseller approved successfully");
      } else if (resellerActionState.message?.includes("rejected")) {
        toast.success(resellerActionState.message || "Reseller rejected successfully");
        setShowCaution(false);
      }
    } else if (resellerActionState.error) {
      toast.error(resellerActionState.error);
    }
  }, [resellerActionState]);

  const handleApprove = () => {
    const approveData = {
      admin_id: "ADMIN123",
      notes: "Approved by admin"
    };

    dispatch(approveResellerAsync(resellerId, approveData));
  };

  const handleReject = () => {
    setShowCaution(true);
  };

  const confirmReject = () => {
    const rejectData = {
      admin_id: "ADMIN123",
      rejection_reason: rejectionReason || "Rejected by admin",
      notes: rejectionNotes || "Rejected by admin"
    };

    dispatch(rejectResellerAsync(resellerId, rejectData));
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (e) {
      return dateString;
    }
  };

  if (isLoading || resellerActionState.isLoading) {
    return (
      <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""} transition-all duration-300`}>
        <Headers
          value1="Home"
          value2="Reseller Forms"
          value3={location.state?.name || "Reseller Details"}
        />
        <div className="flex justify-center items-center h-[300px]">
          <TailSpin color="orange" radius={5} />
        </div>
      </div>
    );
  }

  return (
    <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""} transition-all duration-300`}>
      <Headers
        value1="Home"
        value2="Reseller Forms"
        value3={resellerData?.name || location.state?.name || "Reseller Details"}
      />

      <div className="mt-6 bg-[#E9FDEE] rounded-xl p-6 mb-6">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
            <span className="text-blue-600 font-medium">
              {resellerData?.name ? resellerData.name[0].toUpperCase() : "R"}
            </span>
          </div>
          <div className="flex flex-col">
            <h2 className="font-bold text-gray-900">{resellerData?.name || "Reseller Name"}</h2>
            <Custombutton
              value={resellerData?.status || "Pending"}
              textcolor={
                resellerData?.status === "Approved" ? "text-[#27AE60]" :
                  resellerData?.status === "Rejected" ? "text-[#EB5757]" :
                    "text-[#27AE60]"
              }
              backgroundcolor={
                resellerData?.status === "Approved" ? "bg-[#E9FDEE]" :
                  resellerData?.status === "Rejected" ? "bg-[#FDEDED]" :
                    "bg-[#FEF3E7]"
              }
              extraStyle="mt-2 w-fit"
            />
          </div>
        </div>
      </div>

      {/* <div className="flex justify-center mb-6">
        <Custombutton
          value="Manage"
          textcolor="text-[#27AE60]"
          backgroundcolor="bg-transparent"
          extraStyle="font-medium"
        />
      </div> */}

      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="border-b border-gray-200 pb-2 mb-4">
          <Headcomponent value="Personal Details" showSearch={false} />
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="bg-white rounded-lg p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">Full Name:</p>
                <p className="font-medium">{resellerData?.name || "N/A"}</p>
              </div>
              <div>
                <p className="text-gray-600">Email:</p>
                <p className="font-medium">{resellerData?.email || "N/A"}</p>
              </div>
              <div>
                <p className="text-gray-600">Phone:</p>
                <p className="font-medium">{resellerData?.mobile || "N/A"}</p>
              </div>
              <div>
                <p className="text-gray-600">WhatsApp:</p>
                <p className="font-medium">{resellerData?.whatsapp || "N/A"}</p>
              </div>
              <div>
                <p className="text-gray-600">Address:</p>
                <p className="font-medium">{resellerData?.address || "N/A"}</p>
              </div>
              <div>
                <p className="text-gray-600">Referral Code:</p>
                <p className="font-medium">{resellerData?.referal_code || "N/A"}</p>
              </div>
              <div>
                <p className="text-gray-600">Registration Date:</p>
                <p className="font-medium">{formatDate(resellerData?.registration_date)}</p>
              </div>
              <div>
                <p className="text-gray-600">Approval Date:</p>
                <p className="font-medium">{formatDate(resellerData?.approval_date)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="border-b border-gray-200 pb-2 mb-4">
          <Headcomponent value="ID Proof" showSearch={false} />
        </div>
        <div className="space-y-4">
          <div className="p-4 border border-gray-200 rounded-lg">
            {resellerData?.id_proof ? (
              <img
                src={`${config.MainUrl}public/${resellerData.id_proof}`}
                alt="ID Proof"
                className="w-full h-[400px] object-contain rounded"
                onError={(e) => {
                  e.target.onError = null;
                  const parent = e.target.parentNode;
                  e.target.style.display = 'none';
                  parent.innerHTML = '<div class="h-[400px] flex items-center justify-center bg-gray-100 rounded"><p class="text-gray-500">ID Proof Image Not Available</p></div>';
                }}
              />
            ) : (
              <div className="h-[400px] flex items-center justify-center bg-gray-100 rounded">
                <p className="text-gray-500">No ID proof document available</p>
              </div>
            )}
          </div>
          <div className="flex justify-center gap-4 mt-6">
            <Custombutton
              value="Reject"
              onClick={handleReject}
              textcolor="text-white"
              backgroundcolor="bg-red-500"
              extraStyle="hover:bg-red-600"
              hidden={resellerData?.status === "Approved" || resellerData?.status === "Rejected"}
            />
            <Custombutton
              value="Approve"
              onClick={handleApprove}
              textcolor="text-white"
              backgroundcolor="bg-[#27AE60]"
              extraStyle="hover:bg-[#219652]"
              hidden={resellerData?.status === "Approved" || resellerData?.status === "Rejected"}
            />
          </div>
        </div>
      </div>


      <SuccessModal
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        type="success"
        title="Reseller Approved Successfully"
        buttonText="Close"
      />


      <SuccessModal
        isOpen={showCaution}
        onClose={() => setShowCaution(false)}
        type="caution"
        title="Are you sure you want to reject this reseller?"
        buttonText="Reject"
        onConfirm={confirmReject}
        showCancel={true}
      // customContent={
      //   <div className="mt-4 mb-4">
      //     <div className="mb-4">
      //       <label className="block text-gray-700 text-sm font-bold mb-2">
      //         Rejection Reason *
      //       </label>
      //       <input
      //         className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      //         type="text"
      //         placeholder="Enter rejection reason"
      //         value={rejectionReason}
      //         onChange={(e) => setRejectionReason(e.target.value)}
      //         required
      //       />
      //     </div>
      //     <div>
      //       <label className="block text-gray-700 text-sm font-bold mb-2">
      //         Additional Notes
      //       </label>
      //       <textarea
      //         className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      //         placeholder="Enter additional notes (optional)"
      //         value={rejectionNotes}
      //         onChange={(e) => setRejectionNotes(e.target.value)}
      //         rows="3"
      //       />
      //     </div>
      //   </div>
      // }
      />
    </div>
  );
};

export default ResellerFormDetails;
