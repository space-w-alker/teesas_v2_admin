import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Headers from '../common/Headers';
import Headcomponent from '../common/Headcomponent';
import StatCard from '../common/StatCard';
import Custombutton from '../common/Custombutton';
import bookopen from '../../assets/images/bookopen.png';

const ClassItem = ({ name, id }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#F9F9F9] rounded-xl p-4 flex items-center justify-between hover:shadow-md transition-shadow cursor-pointer">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-white rounded-lg">
          <img src={bookopen} alt="book" className="w-6 h-6" />
        </div>
        <span className="font-medium text-gray-800">{name}</span>
      </div>
      <Custombutton
        value="Next"
        onClick={() => navigate('/test-subject', { state: { id } })}
        textcolor="text-[#27AE60]"
        backgroundcolor="bg-transparent"
        extraStyle="hover:bg-green-50"
      />
    </div>
  );
};

const TestClass = ({ isOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const name = location.state?.name || "N/A";
  const classes = location.state?.classes || "N/A";
  console.log(name, classes);
  // const classes = [
  //   'Class 1',
  //   'Class 2',
  //   'Class 3',
  //   'Class 4',
  //   'Class 5',
  //   'Class 6'
  // ];

  return (
    <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""} transition-all duration-300`}>
      <Headers value1="Home" value2="Test" value3="Classes" />

      <div className="p-6 border-b border-gray-100">
        <div className="flex justify-between items-center">
          <Headcomponent value="Test Classes" showSearch={false} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
        <StatCard title="Total Classes" count="6" />
        <StatCard title="Active Classes" count="4" />
        <StatCard title="Students" count="120" />
        <StatCard title="Teachers" count="8" />
      </div>

      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b border-gray-100">
          <Headcomponent value="Classes" showSearch={false} />
        </div>

        <div className="p-6">
          <div className="space-y-4">
            {classes.map((className, index) => (
              <ClassItem
                key={index}
                name={className.name}
                id={className.id}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestClass;
