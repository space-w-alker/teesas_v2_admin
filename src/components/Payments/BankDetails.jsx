import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import { getBankListAsync, deleteBankAsync, getBankListResponse } from '../../apis/slices/bankSlice';
import { config } from '../../apis/client/config';

const BankDetails = ({ isOpen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedBank, setSelectedBank] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [banks, setBanks] = useState([]);
  const [totalBanks, setTotalBanks] = useState(0);

  const { BASEURL } = config;
  const token = localStorage.getItem('token'); // Assuming token is stored in localStorage

  useEffect(() => {
    loadBanks();
  }, [currentPage]);

  const loadBanks = () => {
    setIsLoading(true);
    getBankListAsync({
      dispatch,
      token,
      page: currentPage,
      limit: 10,
      callbackFn: (response) => {
        setIsLoading(false);
        if (response?.data?.status === 200) {
          setBanks(response.data.data.allBank || []);
          setTotalBanks(response.data.data.totalBanks || 0);
        } else {
          setBanks([]);
          setTotalBanks(0);
          console.error("Error loading banks:", response?.data?.message);
        }
      }
    });
  };

  const handleDeleteBank = () => {
    if (!selectedBank) return;

    // Show loading state
    setIsLoading(true);

    deleteBankAsync({
      dispatch,
      bankId: selectedBank.id,
      token,
      callbackFn: (response) => {
        setIsLoading(false);
        setShowDeleteModal(false);

        if (response?.data?.status === 200) {

          loadBanks();
        }
      }
    });
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const handleNextPage = () => {
    const totalPages = Math.ceil(totalBanks / 10);
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

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
          value={totalBanks}
          imgbg={Group10000001600}
        />
      </div>

      <div className="flex justify-end mt-4">
        <Custombutton
          value="Add New Bank"

          backgroundcolor="bg-[#27AE60]"
          textcolor="text-white"
          imagePosition="left"
          width="w-[160px]"
          height="h-[40px]"
          icon={<FaPlus className="w-4 h-4 text-white " />}
          onClick={() => navigate('/payments/add-bank')}
        />
      </div>

      <div className="bg-white rounded-xl p-6 mt-6">
        <Headcomponent value="Bank Details List" border="Border" showSearch={false} />

        {isLoading ? (
          <div className="flex justify-center py-10">
            <p>Loading banks...</p>
          </div>
        ) : banks.length === 0 ? (
          <div className="flex justify-center py-10">
            <p>No bank accounts found.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {banks.map((bank) => (
              <div key={bank.id} className="flex items-center justify-between py-4 border-b">
                <div className="flex items-center gap-4">
                  <img
                    src={bank.icon ? `${BASEURL}${bank.icon}` : banklogo}
                    alt={bank.bank_name}
                    className="w-8 h-8 object-contain"
                    onError={(e) => { e.target.src = banklogo }}
                  />
                  <div>
                    <h3 className="font-medium text-gray-900">{bank.bank_name}</h3>
                    <p className="text-sm text-gray-500">Account Name: {bank.account_name}</p>
                    <p className="text-sm text-gray-500">Account Number: {bank.account_number}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Custombutton
                    value="View"
                    textcolor="text-[#27AE60]"
                    onClick={() => navigate(`/payments/view-bank/${bank.id}`, {
                      state: { bankData: bank }
                    })}
                  />

                  <Custombutton
                    value="Edit"
                    textcolor="text-[#27AE60]"
                    onClick={() => navigate(`/payments/add-bank?id=${bank.id}`, {
                      state: { bankData: bank }
                    })}
                  />


                  <Custombutton
                    value="Delete"

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
        )}

        <div className="flex justify-between items-center mt-6">
          <Custombutton
            value="Previous"

            icon={<FaArrowLeft />}
            backgroundcolor="bg-[#F2F2F2]"
            textcolor="text-[#000000]"
            imagePosition="left"
            onClick={handlePrevPage}
            disabled={currentPage <= 1}
          />
          <div className="text-[#667085] text-[12px]">
            Page {currentPage} of {Math.ceil(totalBanks / 10) || 1}
          </div>
          <Custombutton
            value="Next"

            icon={<FaArrowRight />}
            backgroundcolor="bg-[#F2F2F2]"
            textcolor="text-[#000000]"
            imagePosition="right"
            onClick={handleNextPage}
            disabled={currentPage >= Math.ceil(totalBanks / 10)}
          />
        </div>
      </div>

      <SuccessModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        type="caution"
        title="Confirm Delete"
        message={`Are you sure you want to delete ${selectedBank?.bank_name} account?`}
        buttonText="Delete"
        onConfirm={handleDeleteBank}
      />
    </div>
  );
};

export default BankDetails;
