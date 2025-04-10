import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import Headers from '../common/Headers';
import Headcomponent from '../common/Headcomponent';
import Custombutton from '../common/Custombutton';
import StatCard from '../common/StatCard';
import Modal from '../common/Modal';

const LearningCenterCourses = ({ isOpen }) => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleAddCourse = (value) => {
    if (value === 'unit') {
      navigate('/add-single-course');
    } else if (value === 'bulk') {
      navigate('/add-bulk-courses');
    }
  };

  const coursesList = [
    {
      date: '2024-05-15',
      courses: [
        { name: 'Introduction to Programming', participants: 45, status: 'Active' },
        { name: 'Web Development Fundamentals', participants: 32, status: 'Active' }
      ]
    },
    {
      date: '2024-05-10',
      courses: [
        { name: 'Data Science Masterclass', participants: 28, status: 'Active' },
        { name: 'Mobile App Development', participants: 36, status: 'Active' }
      ]
    }
  ];

  return (
    <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""} transition-all duration-300`}>
      <Headers value1="Home" value2="Learning Center" value3="LearningCenterCourses" />

      <div className="p-6 border-b border-gray-100">
        <div className="flex justify-between items-center">
          <Headcomponent value="Learning Center Courses" showSearch={false} />
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Courses" count="120" color="bg-blue-50" />
        <StatCard title="Total Participants" count="1,250" color="bg-green-50" />
        <StatCard title="Paid Participants" count="980" color="bg-purple-50" />
        <StatCard title="Unpaid Participants" count="270" color="bg-orange-50" />
      </div>

      <div className="flex justify-end gap-4 mb-6">
        <button
          className="flex items-center gap-2 px-4 py-2 bg-[#27AE60] text-white rounded-lg hover:bg-[#229652] transition-colors"
          onClick={() => navigate('/learning-center/add-subject')}
        >
          <FaPlus className="text-white" />
          Add Course
        </button>
      </div>


      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b border-gray-100">
          <Headcomponent value="Course List" />
        </div>

        <div className="p-6">
          <div className="space-y-6">
            {coursesList.map((group, groupIndex) => (
              <div key={groupIndex}>

                <div className="space-y-4">
                  {group.courses.map((course, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-xl p-4 flex items-center justify-between hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => navigate('/tutorial-details', {
                        state: {
                          name: course.name,
                          status: course.status,
                          participants: course.participants
                        }
                      })}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                          {course.name[0].toUpperCase()}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-medium text-gray-800">{course.name}</span>
                          <span className="text-sm text-gray-500">{course.participants} participants</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <button
                          className="text-green-600"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate('/jamb-ssce', { state: { courseName: course.name } });
                          }}
                        >
                          View
                        </button>
                        <button
                          className="text-green-600"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate('/course-participants', { state: { courseName: course.name } });
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
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

      {showModal && (
        <Modal
          label="ADD COURSE"
          value1="Add Single Course"
          value2="Upload Bulk Courses"
          closeModal={() => setShowModal(false)}
          onClick={handleAddCourse}
          addSingleButton={() => handleAddCourse('unit')}
          addMutipleButton={() => handleAddCourse('bulk')}
        />
      )}
    </div>
  );
};

export default LearningCenterCourses;
