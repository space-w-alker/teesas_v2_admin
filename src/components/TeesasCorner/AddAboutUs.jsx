import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addAboutUsAsync } from '../../apis/slices/cornerSlice';
import Headers from '../common/Headers';
import Headcomponent from '../common/Headcomponent';
import Custombutton from '../common/Custombutton';

const AddAboutUs = ({ isOpen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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

  const handleSubmit = () => {
    const data = { content: formData.description };
    dispatch(addAboutUsAsync({ dispatch, data, token: 'your-auth-token', callbackFn: () => navigate('/about-us') }));
  };

  return (
    <div className={`py-[7rem] px-[5rem] ${isOpen ? "xl:ml-[260px]" : ""}`}>
      <Headers
        value1="Home / About Us"
        value2="Add About Us"
      />

      <div className="grid grid-cols-3 gap-8 mt-8">
        <div className="col-span-2">
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <h1 className="text-xl  text-gray-900 mb-4">Add About Us</h1>
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
                  value="Create About Us"
                  backgroundcolor="bg-[#27AE60] hover:bg-[#219652]"
                  textcolor="text-white"
                  width="w-[130px]"
                  onClick={handleSubmit}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAboutUs;
