import React from 'react';
import Headers from '../common/Headers';
import Headcomponent from '../common/Headcomponent';
import StatCard from '../common/StatCard';
import Custombutton from '../common/Custombutton';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';


const ResellerItem = ({ name, status, navigate }) => (
  <div className="bg-white rounded-xl p-4 flex items-center justify-between hover:shadow-md transition-shadow">
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
        {name[0].toUpperCase()}
      </div>
      <div className="flex items-center gap-3">
        <span className="font-medium text-gray-800">{name}</span>
        <span className={`px-3 py-1 rounded-full text-sm ${
          status === 'Approved' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
        }`}>
          {status}
        </span>
      </div>
    </div>
    <Custombutton
  value="View"
  onClick={() => navigate('/reseller-form-details', { 
    state: { 
      name: name,
      status: status 
    }
  })}
  textcolor="text-[#27AE60]"
  backgroundcolor="bg-transparent"
  extraStyle="font-medium"
/>

  </div>
);

const ResellerForm = ({ isOpen }) => {
  const navigate = useNavigate();

  const resellerGroups = [
    {
      date: '2024-01-15',
      forms: [
        { name: 'John Doe', status: 'Approved' },
        { name: 'Jane Smith', status: 'Pending' }
      ]
    },
    {
      date: '2024-01-14',
      forms: [
        { name: 'Robert Johnson', status: 'Approved' },
        { name: 'Sarah Williams', status: 'Pending' }
      ]
    }
  ];

  return (
    <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""} transition-all duration-300`}>
      <Headers value1="Home" value2="Reseller Form" />

      <div className=" mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
        <StatCard title="Total Resellers" count="250" />
        <StatCard title="Approved Resellers" count="180" />
        <StatCard title="Pending Approval" count="70" />
      </div>

      <div className="flex justify-end mb-6">
        <Custombutton
          value="Export Excel"
          onClick={() => {}}
          textcolor="text-white"
          backgroundcolor="bg-[#27AE60]"
          extraStyle="hover:bg-[#219652]"
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b border-gray-100">
          <Headcomponent value="Matric Reseller's Registration" showSearch={true} />
        </div>

        <div className="p-6">
          <div className="space-y-6">
            {resellerGroups.map((group, groupIndex) => (
              <div key={groupIndex}>
                <div className="text-gray-400 text-sm mb-3">{group.date}</div>
                <div className="space-y-4">
                  {group.forms.map((form, index) => (
                    <ResellerItem
                      key={index}
                      name={form.name}
                      status={form.status}
                      navigate={navigate}
                    />
                  ))}
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

export default ResellerForm;
