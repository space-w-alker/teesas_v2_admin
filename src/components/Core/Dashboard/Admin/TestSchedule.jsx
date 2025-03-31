import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getPerformanceAsync } from '../../../../apis/slices/performanceSlice';

const TestSchedule = ({ id }) => {
  const dispatch = useDispatch();
  const [scheduleData, setScheduleData] = useState([]);
  console.log(scheduleData);
  useEffect(() => {
    const fetchPerformanceData = async () => {
      dispatch(getPerformanceAsync(id, (error, data) => {
        if (error) {
          console.error(error);
        } else {
          setScheduleData(data);
        }
      }));
    };

    fetchPerformanceData();
  }, [dispatch, id]);

  return (
    <div className="lg:grid grid-cols-2 gap-10 mt-5">
      <div className="rounded-[12px] py-[20px] px-[25px] bg-[#FFFFFF] activity">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-extrabold text-[15px] lg:text-[22px] leading-[30px] text-[#000000]">
              Test Schedule
            </h2>
          </div>
        </div>
        <div className="bg-gray-50 p-6 rounded-lg shadow-sm max-w-md mx-auto">
          {scheduleData.length === 0 ? (
            <div className="text-gray-700 font-medium">No schedule</div>
          ) : (
            scheduleData.map((day) => (
              <div key={day.id} className="mb-4">
                <div className="text-gray-700 mb-2 font-medium">{day.date}</div>

                {day?.events?.map((event, index) => (
                  <div key={index} className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <button className={`px-4 py-2 rounded-md border bg-amber-50 border-amber-200 text-gray-800`}>
                        {event.type}
                      </button>
                      <div className="text-gray-700">{event.time}</div>
                    </div>

                    <div className="text-gray-800 font-medium mb-4">
                      {event.subjects.split(', ').map((subject, index) => (
                        <span key={index}>{subject}{index < event.subjects.split(', ').length - 1 ? ', ' : ''}</span>
                      ))}
                    </div>

                    {index < day.events.length - 1 && (
                      <hr className="border-gray-200 my-4" />
                    )}
                  </div>
                ))}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TestSchedule;