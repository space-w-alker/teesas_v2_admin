import React from "react";

const WebinarRegistrationComponent = ({ registrationData }) => {
  if (!registrationData) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6 text-center">
        <p className="text-gray-500">Loading registration details...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Registration Information */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="border-b border-gray-200 pb-2 mb-4">
          <h3 className="text-lg font-bold text-gray-900">Registration Information</h3>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="bg-white rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600 text-sm">Name:</p>
                <p className="font-medium">{registrationData.name || "N/A"}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Email:</p>
                <p className="font-medium">{registrationData.email || "N/A"}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Phone Number:</p>
                <p className="font-medium">{registrationData.phoneNumber || "N/A"}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Location:</p>
                <p className="font-medium">{registrationData.location || "N/A"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Timestamps */}
      <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
        <div className="border-b border-gray-200 pb-2 mb-4">
          <h3 className="text-lg font-bold text-gray-900">Registration Timestamps</h3>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="bg-white rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {registrationData.createdAt && (
                <div>
                  <p className="text-gray-600 text-sm">Created At:</p>
                  <p className="font-medium">
                    {new Date(registrationData.createdAt).toLocaleString()}
                  </p>
                </div>
              )}
              {registrationData.updatedAt && (
                <div>
                  <p className="text-gray-600 text-sm">Updated At:</p>
                  <p className="font-medium">
                    {new Date(registrationData.updatedAt).toLocaleString()}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebinarRegistrationComponent;

