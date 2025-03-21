import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { TailSpin } from "react-loader-spinner";
import Headers from '../common/Headers';
import Custombutton from '../common/Custombutton';
import { getAllCoursesAsync } from '../../apis/slices/subscriptionsSlice';

const SubscriptionTypes = ({ isOpen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Get token from localStorage or your auth state
    const token = localStorage.getItem('token') || '';

    setLoading(true);

    getAllCoursesAsync({
      dispatch: dispatch,
      token: token,
      callbackFn: (res) => {
        if (res?.data?.status === 200) {
          setCourses(res.data.data);
          setLoading(false);
        } else {
          setLoading(false);
          console.error("Error fetching courses:", res?.data?.message);
        }
      },
    });
  }, [dispatch]);

  return (
    <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""} transition-all duration-300`}>
      <Headers value1="Home" value2="Subscription Categories" />
      <div className="mt-6 p-6 mb-4">
        <h2 className="text-2xl font-bold text-gray-900">Subscription Categories</h2>
      </div>

      {loading && (
        <div style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 9999,
        }}>
          <TailSpin color="orange" radius={5} />
        </div>
      )}

      <div className="mt-6 space-y-4">
        {courses && courses.length > 0 ? (
          courses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-xl shadow-sm p-6 flex items-center justify-between hover:bg-gray-50 cursor-pointer transition-all duration-300"
              onClick={() => navigate(`/subscription-plans/${course.id}`, { state: { courseName: course.name } })}
            >
              <span className="font-medium text-gray-800">{course.name}</span>
              <Custombutton
                value=">"
                textcolor="text-gray-400"
                backgroundcolor="bg-transparent"
              />
            </div>
          ))
        ) : !loading && (
          <div className="text-center py-8 text-gray-500">No courses available</div>
        )}
      </div>
    </div>
  );
};

export default SubscriptionTypes;
