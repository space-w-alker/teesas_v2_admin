import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Headers from '../common/Headers';
import Headcomponent from '../common/Headcomponent';
import Custombutton from '../common/Custombutton';
import SuccessModal from '../common/SuccessModal';
import Screenshot from '../../assets/images/Screenshot.png';

const ResellerFormDetails = ({ isOpen }) => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [showCaution, setShowCaution] = useState(false);
  const location = useLocation();
const resellerName = location.state?.name || 'Reseller Name';
const status = location.state?.status || 'Pending';


  const handleApprove = () => {
    setShowSuccess(true);
  };

  const handleReject = () => {
    setShowCaution(true);
  };
  

  return (
    
    <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""} transition-all duration-300`}>
      <Headers 
        value1="Home" 
        value2="Reseller Forms" 
        value3={resellerName} 
      />

      <div className="mt-6  bg-[#E9FDEE] rounded-xl p-6 mb-6">
      <div className="flex items-center gap-4">
  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
    <span className="text-blue-600 font-medium">
      {resellerName[0].toUpperCase()}
    </span>
  </div>
  <div className="flex flex-col">
    <h2 className="font-bold text-gray-900">{resellerName}</h2>
    <Custombutton
      value="Approved"
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
          <Headcomponent value="Personal Details" showSearch={false} />
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="bg-white rounded-lg p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">Full Name:</p>
                <p className="font-medium">{resellerName}</p>
              </div>
              <div>
                <p className="text-gray-600">Email:</p>
                <p className="font-medium">email@example.com</p>
              </div>
              <div>
                <p className="text-gray-600">Phone:</p>
                <p className="font-medium">+1234567890</p>
              </div>
              <div>
                <p className="text-gray-600">Location:</p>
                <p className="font-medium">City, Country</p>
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
            <img src={Screenshot} alt="document preview" className="w-full h-[400px] object-cover rounded" />
          </div>
          <div className="flex justify-center gap-4 mt-6">
            <Custombutton
              value="Reject"
              onClick={handleReject}
              textcolor="text-white"
              backgroundcolor="bg-red-500"
              extraStyle="hover:bg-red-600"
            />
            <Custombutton
              value="Approve"
              onClick={handleApprove}
              textcolor="text-white"
              backgroundcolor="bg-[#27AE60]"
              extraStyle="hover:bg-[#219652]"
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
      />
    </div>
  );
};

export default ResellerFormDetails;
