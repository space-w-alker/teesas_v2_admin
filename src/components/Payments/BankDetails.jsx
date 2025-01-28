import React, { useState } from 'react';
import Headers from '../common/Headers';
import UserCard from '../common/UserCard';
import Headcomponent from '../common/Headcomponent';
import Custombutton from '../common/Custombutton';
import SuccessModal from '../common/SuccessModal';
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import Group10000001600 from '../../assets/images/Group1000001600.png';
import banklogo from '../../assets/images/banklogo.png';

import { FaPlus } from "react-icons/fa";

const BankDetails = ({isOpen}) => {
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedBank, setSelectedBank] = useState(null);
  
  const [bankData, setBankData] = useState({
    total_accounts: 150
  });

  const banks = [
    {
      bankName: "GT Bank",
      accountType: "Bank Transfer Ghana",
      accountNumber: "1001010393"
    },
    {
      bankName: "Access Bank",
      accountType: "Bank Transfer Ghana",
      accountNumber: "2001020394"
    },
    {
      bankName: "Zenith Bank",
      accountType: "Bank Transfer Ghana",
      accountNumber: "3001030395"
    }
  ];

  return (
    <div className={`py-[7rem] lg:px-[5rem] flex flex-col gap-2 px-[10px] ${isOpen ? "xl:ml-[260px]" : ""}`}>
      <Headers value1="Home" value2="Bank Details" />

      <div className="p-6 border-b border-gray-100">
        <div className="flex justify-between items-center">
          <Headcomponent value="Payments" showSearch={false} />
        </div>
      </div>

      <div className="mt-3">
        <UserCard
          label="Total Bank Accounts"
          height="h-[140px]"
          backgroundcolor="bg-[#FFFFFF]"
          value={bankData?.total_accounts}
          imgbg={Group10000001600}
        />
      </div>

      <div className="flex justify-end mt-4">
        <Custombutton
          value="Add New Bank"
          hidden="hidden"
          backgroundcolor="bg-[#27AE60]"
          textcolor="text-white"
          imagePosition="left"
          width="w-[160px]"
          height="h-[40px]"
          icon={<FaPlus className="w-4 h-4 text-white "  />}
          onClick={() => navigate('/payments/add-bank')}
        />
      </div>

      <div className="bg-white rounded-xl p-6 mt-6">
        <Headcomponent value="Bank Details List" border="Border" />

        <div className="space-y-4">
          {banks.map((bank, index) => (
            <div key={index} className="flex items-center justify-between py-4 ">
              <div className="flex items-center gap-4">
                <img src={banklogo} alt="bank" className="w-8 h-8" />
                <div>
                  <h3 className="font-medium text-gray-900">{bank.bankName}</h3>
                  <p className="text-sm text-gray-500">{bank.accountType}</p>
                  <p className="text-sm text-gray-500">{bank.accountNumber}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Custombutton
                  value="View"
                  hidden="hidden"
                  textcolor="text-[#27AE60]"
                  onClick={() => navigate(`/payments/view-bank`)}
                />
                <Custombutton
                  value="Edit"
                  hidden="hidden"
                  textcolor="text-[#27AE60]"
                  onClick={() => navigate('/payments/edit-bank')}
                />
                <Custombutton
                  value="Delete"
                  hidden="hidden"
                  textcolor="text-red-500"
                  onClick={() => {
                    setSelectedBank(bank);
                    setShowDeleteModal(true);
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center mt-6">
          <Custombutton
            value="Previous"
            hidden="hidden"
            icon={<FaArrowLeft />}
            backgroundcolor="bg-[#F2F2F2]"
            textcolor="text-[#000000]"
            imagePosition="left"
          />
          <div className="text-[#667085] text-[12px]">
            Page 1 of 5
          </div>
          <Custombutton
            value="Next"
            hidden="hidden"
            icon={<FaArrowRight />}
            backgroundcolor="bg-[#F2F2F2]"
            textcolor="text-[#000000]"
            imagePosition="right"
          />
        </div>
      </div>

      <SuccessModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        type="caution"
        title="Confirm Delete"
        message={`Are you sure you want to delete ${selectedBank?.bankName} account?`}
        buttonText="Confirm"
      />
    </div>
  );
};

export default BankDetails;
