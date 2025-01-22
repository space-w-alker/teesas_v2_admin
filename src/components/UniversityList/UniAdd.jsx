import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Headers from '../common/Headers';
import Headcomponent from '../common/Headcomponent';
import Custombutton from '../common/Custombutton';
import SuccessModal from '../common/SuccessModal';
import bookopen from '../../assets/images/bookopen.png';
import book from '../../assets/images/book.png';

const UniAdd = ({ isOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    universityName: location.state?.universityData?.universityName || '',
    icon: location.state?.universityData?.icon || bookopen
  });

  const icons = [
    { name: 'Book Open', src: bookopen },
    { name: 'Book', src: book },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuccess(true);
  };

  const handleClose = () => {
    setShowSuccess(false);
    navigate('/uni-list');
  };

  return (
    <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""} transition-all duration-300`}>
      <Headers 
        value1="Home" 
        value2={location.state?.isEdit ? "Edit University" : "Add University"} 
      />

      <div className="flex gap-6">
        <div className="flex-[2] bg-white rounded-xl shadow-sm p-6">
          <Headcomponent 
            value={location.state?.isEdit ? "Edit University" : "Add University"} 
            showSearch={false} 
          />
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  University Name
                </label>
                <input
                  type="text"
                  value={formData.universityName}
                  onChange={(e) => setFormData({...formData, universityName: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27AE60]"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  University Icon
                </label>
                <select
                  value={formData.icon}
                  onChange={(e) => setFormData({...formData, icon: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27AE60]"
                  required
                >
                  <option value="">Select Icon</option>
                  {icons.map((icon, index) => (
                    <option key={index} value={icon.src}>
                      {icon.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </form>
        </div>

        <div className="flex-1">
          <div className="bg-white rounded-xl p-8 shadow-sm h-full">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Summary</h2>
            <div className="bg-[#E9FDEE] rounded-lg p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">University Name:</span>
                  <span className="font-medium">{formData.universityName || '-'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Icon:</span>
                  <img src={formData.icon} alt="university icon" className="w-8 h-8" />
                </div>
              </div>
            </div>
            <Custombutton
              value={location.state?.isEdit ? "Update University" : "Create University"}
              onClick={handleSubmit}
              textcolor="text-white"
              backgroundcolor="bg-[#27AE60]"
              extraStyle="w-full mt-8 hover:bg-[#219652]"
            />
          </div>
        </div>
      </div>

      <SuccessModal 
        isOpen={showSuccess}
        onClose={handleClose}
        type="success"
        title={location.state?.isEdit ? "University Updated Successfully" : "University Created Successfully"}
        buttonText="Close"
      />
    </div>
  );
};

export default UniAdd;
