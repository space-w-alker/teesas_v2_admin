import React from 'react';
import success from '../../assets/images/success.png';
import caution from '../../assets/images/caution.png';

const SuccessModal = ({ 
  isOpen, 
  onClose, 
  type = 'success', // success or caution
  title, 
  message,
  buttonText = 'Close'
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 text-center max-w-md">
        <div className="flex justify-center mb-4">
          <img 
            src={type === 'success' ? success : caution} 
            alt={type} 
            className="w-16 h-16"
          />
        </div>
        <h2 className={`text-xl font-bold mb-2 ${
          type === 'success' ? 'text-[#27AE60]' : 'text-[#F2994A]'
        }`}>
          {title}
        </h2>
        <p className="text-gray-600 mb-6">{message}</p>
        <button
          onClick={onClose}
          className={`px-8 py-2 text-white rounded-lg font-medium ${
            type === 'success' ? 'bg-[#27AE60] hover:bg-[#219652]' : 'bg-[#F2994A] hover:bg-[#E08B3E]'
          } transition-colors`}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;
