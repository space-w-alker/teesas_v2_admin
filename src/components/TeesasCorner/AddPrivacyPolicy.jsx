import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addPrivacyPolicyAsync } from '../../apis/slices/cornerSlice';
import Headers from '../common/Headers';
import Headcomponent from '../common/Headcomponent';
import Custombutton from '../common/Custombutton';
import SuccessModal from '../common/SuccessModal';

const AddPrivacyPolicy = ({ isOpen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    description: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    const data = { content: formData.description };
    dispatch(addPrivacyPolicyAsync({
      dispatch,
      data,
      token: 'your-auth-token',
      callbackFn: () => setShowSuccess(true)
    }));
  };

  const handleClose = () => {
    setShowSuccess(false);
    navigate('/privacy-policy');
  };

  return (
    <div className={`py-[7rem] px-[5rem] ${isOpen ? "xl:ml-[260px]" : ""}`}>
      <Headers
        value1="Home / Privacy Policy"
        value2="Add Privacy Policy"
      />

      <div className="grid grid-cols-3 gap-8 mt-8">
        <div className="col-span-2">
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <h1 className="text-xl  text-gray-900 mb-4">Add Privacy Policy</h1>
            <div className="h-[1px] w-full bg-black mb-8"></div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full h-[calc(70vh-400px)] p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter description"
              />
            </div>
          </div>
        </div>

        <div className="col-span-1">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl  text-gray-900 mb-8">Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between bg-green-100 p-4 rounded-lg">
                <span className="text-gray-600">Description :</span>
                <input className='bg-green-100' type="text" value={formData.description} readOnly />
              </div>

              <div className="pt-6 mt-6 border-t flex justify-center">
                <Custombutton
                  onClick={handleSave}
                  value="Create Privacy Policy"
                  backgroundcolor="bg-[#27AE60] hover:bg-[#219652]"
                  textcolor="text-white"
                  width="w-[160px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <SuccessModal
        isOpen={showSuccess}
        onClose={handleClose}
        title="Privacy Policy Added Successfully"
        message="Your privacy policy has been successfully saved."
        buttonText="Close"
      />
    </div>
  );
};

export default AddPrivacyPolicy;
