import React from 'react';
import { useNavigate } from 'react-router-dom';
import Headers from '../common/Headers';
import Custombutton from '../common/Custombutton';

const SubscriptionTypes = ({ isOpen }) => {
  const navigate = useNavigate();

  const categories = [
    'Preschool',
    'Primary School',
    'Junior Secondary School',
    'Senior Secondary School',
    'University Preparation'
  ];

  return (
    <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""} transition-all duration-300`}>
      <Headers value1="Home" value2="Subscription Categories" />
      <div className="mt-6 p-6 mb-4">
  <h2 className="text-2xl font-bold text-gray-900">Subscription Categories</h2>
</div>

      <div className=" mt-6 space-y-4">
        {categories.map((category, index) => (
          <div 
            key={index}
            className="bg-white rounded-xl shadow-sm p-6 flex items-center justify-between hover:bg-gray-50 cursor-pointer transition-all duration-300"
            onClick={() => navigate(`/subscription`)}
          >
            <span className="font-medium text-gray-800">{category}</span>
            <Custombutton
              value=">"
              textcolor="text-gray-400"
              backgroundcolor="bg-transparent"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionTypes;
