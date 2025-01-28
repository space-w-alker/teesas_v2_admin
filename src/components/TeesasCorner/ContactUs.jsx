import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import teesasLogo from '../../assets/images/Tessas.png';
import Headers from '../common/Headers';
import Headcomponent from '../common/Headcomponent';
import Custombutton from '../common/Custombutton';

const ContactUs = ({ isOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""} transition-all duration-300`}>
      <Headers 
        value1="Home"
        value2="Contact Us"
      />

      <div className="bg-[#E9FDEE] rounded-xl p-6 mb-6 mt-6">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-sm">
            <img src={teesasLogo} alt="Teesas Logo" className="w-12 h-12 object-contain" />
          </div>
          <div className="flex flex-col">
            <Headcomponent 
              value="Contact Us"
              showSearch={false}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-4">
        <Custombutton 
          value="Manage"
          textcolor="text-green-400"
          backgroundcolor="hover:text-green-600"
          onClick={() => navigate('/add-contact-us')}
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="border-b border-gray-200 pb-2 mb-4">
          <h3 className="text-lg font-bold text-gray-900">Contact Details</h3>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="bg-white rounded-lg p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">Email:</p>
                <p className="font-medium">support@teesas.com</p>
              </div>
              <div>
                <p className="text-gray-600">Phone:</p>
                <p className="font-medium">+234 XXX XXX XXXX</p>
              </div>
              <div>
                <p className="text-gray-600">Address:</p>
                <p className="font-medium">123 Teesas Street, Lagos, Nigeria</p>
              </div>
              <div>
                <p className="text-gray-600">Working Hours:</p>
                <p className="font-medium">Monday - Friday, 9AM - 5PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
