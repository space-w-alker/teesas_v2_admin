import React from 'react';
import success from '../../assets/images/success.png';
import caution from '../../assets/images/caution.png';

const SuccessModal = ({
  isOpen,
  onClose,
  type = 'success',
  title,
  message,
  buttonText = 'Close',
  onConfirm
}) => {
  if (!isOpen) return null;
  const handleClick = () => {
    if (type === 'caution' && onConfirm) {
      onConfirm();
    } else {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 w-[400px] text-center relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>
        <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
          <img
            src={type === 'success' ? success : caution}
            alt={type}
            className="w-16 h-16"
          />
        </div>

        <h3 className="text-2xl font-bold mb-4">{title}</h3>

        <p className="text-gray-600 mb-8">{message}</p>

        <button
          onClick={handleClick}
          className={`w-full py-3 ${type === 'success' ? 'bg-[#27AE60] hover:bg-[#219652]' : 'bg-[#27AE60] hover:bg-[#E08B3E]'} text-white rounded-lg font-medium transition-colors`}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;
