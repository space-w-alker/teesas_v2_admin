import React from 'react';
import Group10000001600 from '../../../src/assets/images/Group1000001600.png';
import banklogo from '../../assets/images/banklogo.png';
import arrowleft from '../../assets/images/arrowleft.png';
import arrowright from '../../assets/images/arrowright.png';
import Vector from '../../../src/assets/images/Vector.png';
import iconplus from '../../../src/assets/images/iconplus.png';
import { useNavigate } from 'react-router-dom';

const BankCard = ({ bankName, accountType, accountNumber }) => {
  const navigate = useNavigate();
  
  return (
    <div className="flex items-center justify-between py-4 border-b border-gray-100">
      <div className="flex items-center gap-4">
        <img src={banklogo} alt="bank" className="w-8 h-8" />
        <div>
          <h3 className="font-medium text-gray-900">{bankName}</h3>
          <p className="text-sm text-gray-500">{accountType}</p>
          <p className="text-sm text-gray-500">{accountNumber}</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
      <button 
        onClick={() => navigate(`/payments/view-bank`)}
        className="px-4 py-2 thover:text-[#219652] transition-colors font-medium"
      >
        View
      </button>

      <button 
            onClick={() => navigate('/payments/edit-bank')}
            className=" hover:text-[#219652] transition-colors font-medium"
          >
            Edit
          </button>
        <button className="px-4 py-2 text-red-500 hover:text-red-600 transition-colors font-medium">
          Delete
        </button>
      </div>
    </div>
  );
};
const BankDetails = ({ isOpen }) => {
  const navigate = useNavigate();
  
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

  return (    <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""} transition-all duration-300`}>
      
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-400">Home</span>
          <span className="text-gray-400">/</span>
          <span className="text-gray-900 font-medium">Payments</span>
        </div>
      </div>

      
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Payments</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-gray-50 rounded-lg">
            <img src={Group10000001600} alt="book" className="w-8 h-8" />
          </div>
          <div>
            <p className="text-gray-600 text-sm font-medium">Total Bank Accounts</p>
            <p className="font-bold text-2xl mt-2 text-gray-900">5 Accounts</p>
          </div>
        </div>
      </div>

     
      <div className="flex justify-end mb-6">
      <div className="flex justify-end mb-6">
      <button 
  onClick={() => navigate('/payments/add-bank')}
  className="px-6 py-2 bg-[#27AE60] text-white rounded-lg font-medium hover:bg-[#219652] transition-colors flex items-center gap-2"
>
  <img src={iconplus} alt="" className="w-4 h-4" />
  Add New Bank
</button>

</div>
      </div>

      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Bank Details</h2>
          <button className="p-2 hover:bg-gray-50 rounded-lg">
            <img src={Vector} alt="filter" className="w-4 h-4" />
          </button>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {banks.map((bank, index) => (
              <BankCard key={index} {...bank} />
            ))}
          </div>
        </div>
      </div>

      
      <div className="flex items-center justify-between mt-6">
      <button className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors font-medium flex items-center gap-2">
          <img src={arrowleft} alt="previous" className="w-4 h-4" />
          Previous
        </button>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-[#27AE60] text-white rounded">1</span>
          <span className="px-3 py-1 text-gray-600">2</span>
          <span className="px-3 py-1 text-gray-600">3</span>
        </div>
        <button className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors font-medium flex items-center gap-2">
          Next
          <img src={arrowright} alt="next" className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default BankDetails;


