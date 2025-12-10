import React from "react";

const DemoRequestComponent = ({ requestData }) => {
  if (!requestData) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6 text-center">
        <p className="text-gray-500">Loading request details...</p>
      </div>
    );
  }

  return (
    <div>
      {/* School Information */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="border-b border-gray-200 pb-2 mb-4">
          <h3 className="text-lg font-bold text-gray-900">School Information</h3>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="bg-white rounded-lg p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">School Name:</p>
                <p className="font-medium">{requestData.schoolName || "N/A"}</p>
              </div>
              <div>
                <p className="text-gray-600">School Location:</p>
                <p className="font-medium">{requestData.schoolLocation || "N/A"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Requester Information */}
      <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
        <div className="border-b border-gray-200 pb-2 mb-4">
          <h3 className="text-lg font-bold text-gray-900">Requester Information</h3>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="bg-white rounded-lg p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">Requester Name:</p>
                <p className="font-medium">{requestData.requesterName || "N/A"}</p>
              </div>
              <div>
                <p className="text-gray-600">Designation:</p>
                <p className="font-medium">{requestData.designation || "N/A"}</p>
              </div>
              <div>
                <p className="text-gray-600">Email:</p>
                <p className="font-medium">{requestData.email || "N/A"}</p>
              </div>
              <div>
                <p className="text-gray-600">Phone Number:</p>
                <p className="font-medium">{requestData.phoneNumber || "N/A"}</p>
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
                  {requestData.createdAt
                    ? new Date(requestData.createdAt).toLocaleString()
                    : "N/A"}
                </p>
              </div>
              <div>
                <p className="text-gray-600">Updated At:</p>
                <p className="font-medium">
                  {requestData.updatedAt
                    ? new Date(requestData.updatedAt).toLocaleString()
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

export default DemoRequestComponent;

