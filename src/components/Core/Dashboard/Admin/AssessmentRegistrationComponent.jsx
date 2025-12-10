import React from "react";

const AssessmentRegistrationComponent = ({ registrationData }) => {
  if (!registrationData) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6 text-center">
        <p className="text-gray-500">Loading registration details...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Child Information */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="border-b border-gray-200 pb-2 mb-4">
          <h3 className="text-lg font-bold text-gray-900">Child Information</h3>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="bg-white rounded-lg p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">Child Name:</p>
                <p className="font-medium">{registrationData.childName || "N/A"}</p>
              </div>
              <div>
                <p className="text-gray-600">Child Age:</p>
                <p className="font-medium">{registrationData.childAge || "N/A"}</p>
              </div>
              <div>
                <p className="text-gray-600">Child ID:</p>
                <p className="font-medium">{registrationData.childId || "N/A"}</p>
              </div>
             
            </div>
          </div>
        </div>
      </div>

      {/* Assessment Information */}
      <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
        <div className="border-b border-gray-200 pb-2 mb-4">
          <h3 className="text-lg font-bold text-gray-900">Assessment Information</h3>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="bg-white rounded-lg p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">Subject:</p>
                <p className="font-medium">{registrationData.subject || "N/A"}</p>
              </div>
              <div>
                <p className="text-gray-600">Exam:</p>
                <p className="font-medium">
                  {registrationData.exam ? (
                    <span className="inline-block px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs">
                      {registrationData.exam}
                    </span>
                  ) : (
                    "N/A"
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Parent Information */}
      <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
        <div className="border-b border-gray-200 pb-2 mb-4">
          <h3 className="text-lg font-bold text-gray-900">Parent Information</h3>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="bg-white rounded-lg p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">Parent Name:</p>
                <p className="font-medium">{registrationData.parentName || "N/A"}</p>
              </div>
              <div>
                <p className="text-gray-600">Parent Email:</p>
                <p className="font-medium">{registrationData.parentEmail || "N/A"}</p>
              </div>
              <div>
                <p className="text-gray-600">Parent Phone:</p>
                <p className="font-medium">{registrationData.parentPhone || "N/A"}</p>
              </div>
              <div>
                <p className="text-gray-600">Parent ID:</p>
                <p className="font-medium">{registrationData.parentId || "N/A"}</p>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Timestamps */}
      <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
        <div className="border-b border-gray-200 pb-2 mb-4">
          <h3 className="text-lg font-bold text-gray-900">Timestamps</h3>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="bg-white rounded-lg p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">Created At:</p>
                <p className="font-medium">
                  {registrationData.createdAt
                    ? new Date(registrationData.createdAt).toLocaleString()
                    : "N/A"}
                </p>
              </div>
              <div>
                <p className="text-gray-600">Updated At:</p>
                <p className="font-medium">
                  {registrationData.updatedAt
                    ? new Date(registrationData.updatedAt).toLocaleString()
                    : "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentRegistrationComponent;

