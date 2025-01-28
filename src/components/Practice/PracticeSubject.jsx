import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Headers from '../common/Headers';
import Headcomponent from '../common/Headcomponent';
import book from '../../assets/images/book.png';
import bookopen from '../../assets/images/bookopen.png';
import StatCard from '../common/StatCard';


const SubjectItem = ({ name }) => {
  const navigate = useNavigate();
  
  return (
    <div className="bg-[#F9F9F9] rounded-xl p-4 flex items-center justify-between hover:shadow-md transition-shadow">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-white rounded-lg">
          <img src={bookopen} alt="book" className="w-6 h-6" />
        </div>
        <span className="font-medium text-gray-800">{name}</span>
      </div>
      <div className="flex gap-4 items-center">
        <button 
          onClick={() => navigate('/practice-chapters')}
          className="text-[#27AE60] hover:text-[#219652]"
        >
          Next
        </button>
      </div>
    </div>
  );
};

const PracticeSubject = ({ isOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  
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
      <Headers value1="Home" value2="Practice" value3="Subjects" />

      <div className="p-6 border-b border-gray-100">
        <div className="flex justify-between items-center">
          <Headcomponent value="Practice Subjects" showSearch={false} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
        <StatCard title="Total Subjects" count="7" />
        <StatCard title="Active Subjects" count="5" />
        <StatCard title="Total Topics" count="35" />
        <StatCard title="Total Chapters" count="120" />
      </div>

      <div className="bg-white rounded-xl shadow-sm mt-[50px]">
        <div className="p-6 border-b border-gray-100">
          <Headcomponent value="Subjects List" showSearch={false} />
        </div>
        
        <div className="p-6">
          <div className="space-y-4">
            {subjects.map((subject, index) => (
              <SubjectItem 
                key={index} 
                name={subject}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PracticeSubject;
