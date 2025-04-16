import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getSubjectsAsync, getAdminReportPerformanceAsync } from "../../../../apis/slices/performanceSlice";

const StudentStatsDashboard = ({ id, class: classId }) => {
  const dispatch = useDispatch();
  const [subjectsData, setSubjectsData] = useState(null);
  const [processedData, setProcessedData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [reportData, setReportData] = useState(null);

  useEffect(() => {
    if (!classId || !id) {
      setError("No class ID or user ID provided");
      return;
    }

    setLoading(true);

    getSubjectsAsync({
      dispatch: dispatch,
      data: {
        classId,
        userId: id  // Pass the user ID from props
      },
      token: localStorage.getItem("authToken"),
      callbackFn: (res) => {
        if (res?.data?.status === 200) {
          setSubjectsData(res.data.data);


          if (res.data.data && res.data.data.subjects) {
            const subjects = res.data.data.subjects;


            const graphData = subjects.map((subject, index) => {
              const completionPercentage = subject.totalLessons > 0
                ? parseFloat(((subject.completedLessons / subject.totalLessons) * 100).toFixed(1))
                : 0;

              const colors = [
                "#4CAF50", "#2196F3", "#FFC107", "#E91E63",
                "#9C27B0", "#FF5722", "#607D8B", "#3F51B5",
                "#009688", "#795548", "#CDDC39", "#00BCD4",
                "#8BC34A", "#673AB7"
              ];

              return {
                Subject: subject.name,
                percentage: completionPercentage,
                color: colors[index % colors.length],
                totalLessons: subject.totalLessons,
                completedLessons: subject.completedLessons
              };
            });

            setProcessedData({
              subjects: subjects,
              graphData: graphData
            });
          }
        } else {
          setError(res?.data?.message || "Failed to fetch subjects");
        }
      },
    });

    // Add the new API call for performance report
    getAdminReportPerformanceAsync({
      dispatch,
      userId: id,
      token: localStorage.getItem("authToken"),
      callbackFn: (res) => {
        setLoading(false);
        if (res?.data?.status === 200) {
          setReportData(res.data.data);
        } else {
          console.error("Failed to fetch performance report:", res?.data?.message);
        }
      }
    });
  }, [dispatch, classId, id]);

  const weekdays = ["S", "M", "T", "W", "T", "F", "S"];

  // Calculate overall completion percentage
  const overallPercentage = processedData?.graphData?.length > 0
    ? parseFloat((
      processedData.graphData.reduce((sum, subject) => sum + subject.percentage, 0) /
      processedData.graphData.length
    ).toFixed(1))
    : 0;

  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
      {loading && (
        <div className="text-center py-4">
          <p>Loading subject data...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4">
          <p>Error loading data: {error}</p>
        </div>
      )}

      {!loading && !error && processedData && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Daily Points Stats */}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h2 className="text-lg text-gray-500 font-medium mb-4">
              Daily Points Stats
            </h2>
            <div className="relative mb-4">
              <div className="absolute inset-0 flex justify-center items-center">
                {/* <div className="bg-green-400 text-white px-4 py-2 rounded-full text-sm font-medium">
                  234 pts
                </div> */}
              </div>
              <div className="h-48 flex items-end justify-between mt-20">
                {reportData && reportData.Reports && reportData.Reports.Graph ?
                  reportData.Reports.Graph.slice(0, 7).map((subject, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center space-y-2 w-8"
                    >
                      <div className="relative w-2 bg-gray-200 rounded-t">
                        <div
                          className={`absolute bottom-0 w-2 ${index % 2 === 1 ? "bg-green-400" : "bg-gray-800"} rounded-t`}
                          style={{ height: `${subject.percentage}%` }}
                        />
                        <div className="h-48 w-full" />
                      </div>
                      <div className="text-gray-500">{weekdays[index % 7]}</div>
                    </div>
                  )) :
                  weekdays.map((day, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center space-y-2 w-8"
                    >
                      <div className="relative w-2 bg-gray-200 rounded-t">
                        <div
                          className={`absolute bottom-0 w-2 ${index % 2 === 1 ? "bg-green-400" : "bg-gray-800"} rounded-t`}
                          style={{ height: `${Math.random() * 80 + 20}%` }}
                        />
                        <div className="h-48 w-full" />
                      </div>
                      <div className="text-gray-500">{day}</div>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>


          {/* Overall Stats */}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h2 className="text-lg text-gray-500 font-medium mb-4">
              Subject Completion
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
                  {processedData.graphData.map((subject, index) => (
                    <circle
                      key={index}
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke={subject.color}
                      strokeWidth="10"
                      strokeDasharray={`${subject.percentage} ${100 - subject.percentage}`}
                      strokeDashoffset={
                        index === 0
                          ? 0
                          : processedData.graphData.slice(0, index).reduce(
                            (acc, curr) => acc + curr.percentage,
                            0
                          )
                      }
                    />
                  ))}
                </svg>
                <div className="absolute inset-0 flex flex-col justify-center items-center">
                  <div className="text-3xl font-bold text-gray-700">
                    {overallPercentage}%
                  </div>
                  <div className="text-sm font-medium text-gray-500">
                    Overall Completion
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap justify-center mt-2">
              {processedData.graphData.map((subject, index) => (
                <div key={index} className="flex items-center mr-4 mb-2">
                  <div
                    className="w-3 h-3 rounded-full mr-1"
                    style={{ backgroundColor: subject.color }}
                  ></div>
                  <span className="text-xs text-gray-600">
                    {subject.Subject}: {subject.percentage}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Statistics - This is the new section using the API data */}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h2 className="text-lg text-gray-500 font-medium mb-4">Statistics</h2>
            <div className="space-y-4">
              {reportData && reportData.Reports ? (
                <>
                  <div className="p-2 border border-gray-100 rounded-lg flex items-center">
                    <div className="flex-1">
                      <div className="font-bold text-lg">{`${reportData.Reports.Statistics[0].data}%` }</div>
                      <div className="text-xs text-gray-400">Accuracy</div>
                    </div>
                  </div>
                  <div className="p-2 border border-gray-100 rounded-lg flex items-center">
                    <div className="flex-1">
                      <div className="font-bold text-lg">{reportData.Reports.Key_Focus_Areas.total_questions}</div>
                      <div className="text-xs text-gray-400">Total Questions</div>
                    </div>
                  </div>
                  <div className="p-2 border border-gray-100 rounded-lg flex items-center">
                    <div className="flex-1">
                      <div className="font-bold text-lg">{reportData.Reports.Correct}</div>
                      <div className="text-xs text-gray-400">Correct Answers</div>
                    </div>
                  </div>
                  <div className="p-2 border border-gray-100 rounded-lg flex items-center">
                    <div className="flex-1">
                      <div className="font-bold text-lg">{reportData.Reports.Incorrect}</div>
                      <div className="text-xs text-gray-400">Incorrect Answers</div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-4 text-gray-500">
                  No statistics available
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentStatsDashboard;
