import React from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Headers from '../common/Headers';
import Headcomponent from '../common/Headcomponent';
import StatCard from '../common/StatCard';
import Custombutton from '../common/Custombutton';
import { FaPlus, FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const SubscriptionPlanDetails = ({ isOpen }) => {
  const { category } = useParams();
  const navigate = useNavigate();

  return (
    <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""} transition-all duration-300`}>
      <Headers value1="Home" value2="Subscription Types" value3={category} />

      <div className="mt-6 ">
        <StatCard title="Total Subscription Plans" count="15" />
      </div>

      <div className="flex justify-end mb-6">
        <Custombutton 
          value={
            <div className="flex items-center gap-2">
              <FaPlus className="text-white" />
              <span>Add Subscription Plan</span>
            </div>
          }
          onClick={() => navigate('/add-subscription-plan')}
          textcolor="text-white"
          backgroundcolor="bg-[#27AE60]"
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b border-gray-100">
          <Headcomponent value="Subscription Plans" showSearch={true} />
        </div>
        <div className="p-6">
          <div className="bg-gray-50 rounded-lg p-4 space-y-4">
            {[1, 2, 3].map((item, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium text-gray-900">Subscription for Grade {item}</h3>
                  <Custombutton
                    value="Manage"
                    textcolor="text-[#27AE60]"
                    backgroundcolor="bg-transparent"
                  />
                </div>
                <div className="bg-white rounded-lg p-4">
                  <div className="grid grid-cols-3 gap-8">
                    <div>
                      <p className="text-gray-600 text-sm">Duration</p>
                      <p className="font-medium">3 Months</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm">Price</p>
                      <p className="font-medium">₦15,000</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm">Amount</p>
                      <p className="font-medium">₦20,000</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm">Discount</p>
                      <p className="font-medium">25%</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm">Country</p>
                      <p className="font-medium">Nigeria</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm">Time Plan</p>
                      <p className="font-medium">Quarterly</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm">Plan ID</p>
                      <p className="font-medium">#SUB{1000 + item}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm">Description</p>
                      <p className="font-medium">Access to all Grade {item} subjects and resources</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="p-6 border-t border-gray-100 flex justify-between items-center">
          <Custombutton
            value={
              <div className="flex items-center gap-2">
                <FaArrowLeft />
                <span>Previous</span>
              </div>
            }
            backgroundcolor="bg-gray-100"
            textcolor="text-gray-600"
            width="w-[100px]"
            extraStyle="py-2"
          />
          <span className="text-gray-600">Page 1 of 5</span>
          <Custombutton
            value={
              <div className="flex items-center gap-2">
                <span>Next</span>
                <FaArrowRight />
              </div>
            }
            backgroundcolor="bg-gray-100"
            textcolor="text-gray-600"
            width="w-[80px]"
            extraStyle="py-2"
          />
        </div>
        </div>
      </div>
   
  );
};

export default SubscriptionPlanDetails;
