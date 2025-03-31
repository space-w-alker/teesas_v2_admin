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
      // This is a placeholder for the actual data processing logic
      const fetchedData = [
        {
          id: 1,
          date: "22 - 04 - 2022",
          events: [
            {
              type: "Practice Test",
              subjects: "Maths, English, Agriculture, Sciences",
              time: "10:00 am",
              color: "bg-amber-50 border-amber-200"
            },
            {
              type: "Mock Practice",
              subjects: "Maths, English, Agriculture, Sciences",
              time: "10:00 am",
              color: "bg-blue-50 border-blue-200"
            }
          ]
        },
        {
          id: 2,
          date: "21 - 04 - 2022",
          events: []
        }
      ];
      // setScheduleData(fetchedData);
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
          {scheduleData.map((day) => (
            <div key={day.id} className="mb-4">
              <div className="text-gray-700 mb-2 font-medium">{day.date}</div>

              {day?.tests?.map((event, index) => (
                <div key={index} className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <button className={`px-4 py-2 rounded-md border bg-amber-50 border-amber-200 text-gray-800`}>
                      {event.testType}
                    </button>
                    <div className="text-gray-700">{event.time.split(' ')[1]}</div>
                  </div>

                  <div className="text-gray-800 font-medium mb-4">
                    {event.subjects.map((subject, index) => (
                      <span key={index}>{subject.name}{index < event.subjects.length - 1 ? ', ' : ''}</span>
                    ))}
                  </div>

                  {index < day.tests.length - 1 && (
                    <hr className="border-gray-200 my-4" />
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestSchedule;