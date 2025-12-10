import React from "react";

const GeneralEnquiryComponent = ({ enquiryData }) => {
  if (!enquiryData) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6 text-center">
        <p className="text-gray-500">Loading enquiry details...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Details Section */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="border-b border-gray-200 pb-2 mb-4">
          <h3 className="text-lg font-bold text-gray-900">Contact Information</h3>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="bg-white rounded-lg p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">Name:</p>
                <p className="font-medium">{enquiryData.name || "N/A"} {enquiryData.lastName || ""}</p>
              </div>
              <div>
                <p className="text-gray-600">Email:</p>
                <p className="font-medium">{enquiryData.email || "N/A"}</p>
              </div>
              <div>
                <p className="text-gray-600">Phone Number:</p>
                <p className="font-medium">{enquiryData.phoneNumber || "N/A"}</p>
              </div>
              <div>
                <p className="text-gray-600">Tag:</p>
                <p className="font-medium">
                  {enquiryData.tag ? (
                    <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                      {enquiryData.tag}
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

      {/* Message Section */}
      <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
        <div className="border-b border-gray-200 pb-2 mb-4">
          <h3 className="text-lg font-bold text-gray-900">Message</h3>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="bg-white rounded-lg p-4">
            <p className="text-gray-700 whitespace-pre-wrap">
              {enquiryData.message || "No message provided"}
            </p>
          </div>
        </div>
      </div>

      {/* Additional Information Section */}
      <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
        <div className="border-b border-gray-200 pb-2 mb-4">
          <h3 className="text-lg font-bold text-gray-900">Additional Information</h3>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="bg-white rounded-lg p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">Preferred Centre:</p>
                <p className="font-medium">{enquiryData.preferredCentre || "N/A"}</p>
              </div>
              <div>
                <p className="text-gray-600">Number of Children:</p>
                <p className="font-medium">{enquiryData.numberOfChildren || "N/A"}</p>
              </div>
              <div>
                <p className="text-gray-600">Preferred Mode of Learning:</p>
                <p className="font-medium">{enquiryData.preferredModeOfLearning || "N/A"}</p>
              </div>
              <div>
                <p className="text-gray-600">How Did You Hear About Us:</p>
                <p className="font-medium">{enquiryData.howDidYouHearAboutUs || "N/A"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Timestamps Section */}
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
                  {enquiryData.createdAt
                    ? new Date(enquiryData.createdAt).toLocaleString()
                    : "N/A"}
                </p>
              </div>
              <div>
                <p className="text-gray-600">Updated At:</p>
                <p className="font-medium">
                  {enquiryData.updatedAt
                    ? new Date(enquiryData.updatedAt).toLocaleString()
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

export default GeneralEnquiryComponent;

