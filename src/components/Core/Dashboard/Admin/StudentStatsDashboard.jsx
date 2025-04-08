import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getReportPerformanceAsync } from "../../../../apis/slices/performanceSlice";

const StudentStatsDashboard = ({ id, class: classId }) => {
  const dispatch = useDispatch();
  const [reportData, setReportData] = useState(null);

  useEffect(() => {
    const fetchReportData = async () => {
      dispatch(
        getReportPerformanceAsync(15, (error, data) => {
          if (error) {
            console.error(error);
          } else {
            setReportData(data);
          }
        })
      );
    };
    fetchReportData();
  }, [dispatch, id]);

  const weekdays = ["S", "M", "T", "W", "T", "F", "S"];

  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Daily Points Stats */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-lg text-gray-500 font-medium mb-4">
            Daily Points Stats
          </h2>
          <div className="relative mb-4">
            <div className="absolute inset-0 flex justify-center items-center">
              <div className="bg-green-400 text-white px-4 py-2 rounded-full text-sm font-medium">
                234 pts
              </div>
            </div>
            <div className="h-48 flex items-end justify-between">
              {weekdays.map((day, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center space-y-2 w-8"
                >
                  <div className="relative w-2 bg-gray-200 rounded-t">
                    <div
                      className={`absolute bottom-0 w-2 ${index % 2 === 1 ? "bg-green-400" : "bg-gray-800"
                        } rounded-t`}
                      style={{ height: `${Math.random() * 80 + 20}%` }}
                    />
                    <div className="h-48 w-full" />
                  </div>
                  <div className="text-gray-500">{day}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Overall Stats */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-lg text-gray-500 font-medium mb-4">
            Overall Stats
          </h2>
          <div className="flex justify-center items-center h-48">
            <div className="relative w-40 h-40">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                {/* Create donut chart */}
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#f5f5f5"
                  strokeWidth="10"
                />
                {/* Donut segments */}
                {reportData &&
                  reportData.Reports.Graph.map((subject, index) => (
                    <circle
                      key={index}
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke={subject.color}
                      strokeWidth="10"
                      strokeDasharray={`${subject.percentage} ${100 - subject.percentage
                        }`}
                      strokeDashoffset={
                        index === 0
                          ? 0
                          : reportData.Reports.Graph.slice(0, index).reduce(
                            (acc, curr) => acc + curr.percentage,
                            0
                          )
                      }
                    />
                  ))}
              </svg>
              <div className="absolute inset-0 flex flex-col justify-center items-center">
                <div className="text-sm font-medium text-gray-700">
                  Overall Performance
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap justify-center mt-2">
            {reportData &&
              reportData.Reports.Graph.map((subject, index) => (
                <div key={index} className="flex items-center mr-4 mb-2">
                  <div
                    className={`w-3 h-3 rounded-full ${subject.color} mr-1`}
                  ></div>
                  <span className="text-xs text-gray-600">
                    {subject.Subject}: {subject.percentage}%
                  </span>
                </div>
              ))}
          </div>
        </div>

        {/* Statistics */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h2 className="text-lg text-gray-500 font-medium mb-4">Statistics</h2>
          <div className="space-y-4">
            {reportData &&
              reportData.Reports.Statistics.map((stat, index) => (
                <div
                  key={index}
                  className="p-2 border border-gray-100 rounded-lg flex items-center"
                >
                  <div className="flex-1">
                    <div className="font-bold text-lg">{stat.data}</div>
                    <div className="text-xs text-gray-400">{stat.title}</div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentStatsDashboard;
