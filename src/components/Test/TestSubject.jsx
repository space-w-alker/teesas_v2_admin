import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Headers from '../common/Headers';
import Headcomponent from '../common/Headcomponent';
import StatCard from '../common/StatCard';
import Custombutton from '../common/Custombutton';
import bookopen from '../../assets/images/bookopen.png';

const ClassItem = ({ name }) => {
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
        value="Edit"
        onClick={() => navigate('/test-chapter')}
        textcolor="text-[#27AE60]"
        backgroundcolor="bg-transparent"
        extraStyle="hover:bg-green-50"
      />
    </div>
  );
};

const TestSubject = ({ isOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { category } = location.state || {};
  
  const subjects = [
    'Mathematics',
    'English',
    'Science', 
    'Social Studies',
    'French',
    'German',
    'Spanish',
  ];

  return (
    <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""} transition-all duration-300`}>
      <Headers value1="Home" value2="Test" value3="Subjects" />

      <div className="p-6 border-b border-gray-100">
        <div className="flex justify-between items-center">
          <Headcomponent value="Test Subjects" showSearch={false} />
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
          <Headcomponent value="Subjects" showSearch={false} />
        </div>
        
        <div className="p-6">
          <div className="space-y-4">
            {subjects.map((subjectName, index) => (
              <ClassItem 
                key={index} 
                name={subjectName}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestSubject;
