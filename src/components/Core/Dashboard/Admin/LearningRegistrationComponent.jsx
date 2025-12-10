import React from "react";

const LearningRegistrationComponent = ({ registrationData }) => {
  if (!registrationData) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6 text-center">
        <p className="text-gray-500">Loading registration details...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Contact Information */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="border-b border-gray-200 pb-2 mb-4">
          <h3 className="text-lg font-bold text-gray-900">Contact Information</h3>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="bg-white rounded-lg p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">Name:</p>
                <p className="font-medium">{registrationData.name || "N/A"}</p>
              </div>
              <div>
                <p className="text-gray-600">Email:</p>
                <p className="font-medium">{registrationData.email || "N/A"}</p>
              </div>
              <div>
                <p className="text-gray-600">Phone Number:</p>
                <p className="font-medium">{registrationData.phoneNumber || "N/A"}</p>
              </div>
              <div>
                <p className="text-gray-600">Gender:</p>
                <p className="font-medium">{registrationData.gender || "N/A"}</p>
              </div>
              <div>
                <p className="text-gray-600">Age:</p>
                <p className="font-medium">{registrationData.age || "N/A"}</p>
              </div>
              <div>
                <p className="text-gray-600">Type:</p>
                <p className="font-medium">{registrationData.type || "N/A"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Address Information */}
      {(registrationData.address || registrationData.city || registrationData.state) && (
        <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
          <div className="border-b border-gray-200 pb-2 mb-4">
            <h3 className="text-lg font-bold text-gray-900">Address Information</h3>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="bg-white rounded-lg p-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600">Address:</p>
                  <p className="font-medium">{registrationData.address || "N/A"}</p>
                </div>
                <div>
                  <p className="text-gray-600">City:</p>
                  <p className="font-medium">{registrationData.city || "N/A"}</p>
                </div>
                <div>
                  <p className="text-gray-600">State:</p>
                  <p className="font-medium">{registrationData.state || "N/A"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Learning Preferences */}
      <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
        <div className="border-b border-gray-200 pb-2 mb-4">
          <h3 className="text-lg font-bold text-gray-900">Learning Preferences</h3>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="bg-white rounded-lg p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">Learning Option:</p>
                <p className="font-medium">{registrationData.learningOption || "N/A"}</p>
              </div>
              <div>
                <p className="text-gray-600">Preferred Centre:</p>
                <p className="font-medium">{registrationData.preferredCentre || "N/A"}</p>
              </div>
              <div>
                <p className="text-gray-600">Preferred Cohort:</p>
                <p className="font-medium">{registrationData.preferredCohort || "N/A"}</p>
              </div>
              <div>
                <p className="text-gray-600">Dedicated Tutoring:</p>
                <p className="font-medium">{registrationData.dedicatedTutoring || "N/A"}</p>
              </div>
              <div>
                <p className="text-gray-600">Target Exam:</p>
                <p className="font-medium">{registrationData.targetExam || "N/A"}</p>
              </div>
              <div>
                <p className="text-gray-600">Tour Schedule:</p>
                <p className="font-medium">{registrationData.tourSchedule || "N/A"}</p>
              </div>
              {registrationData.childrenCount && (
                <div>
                  <p className="text-gray-600">Number of Children:</p>
                  <p className="font-medium">{registrationData.childrenCount}</p>
                </div>
              )}
            </div>
            {registrationData.subject && registrationData.subject.length > 0 && (
              <div className="mt-4">
                <p className="text-gray-600 mb-2">Subjects:</p>
                <div className="flex flex-wrap gap-2">
                  {registrationData.subject.map((subj, index) => (
                    <span
                      key={index}
                      className="inline-block px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs"
                    >
                      {subj}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {registrationData.subjectOther && (
              <div className="mt-4">
                <p className="text-gray-600">Other Subject:</p>
                <p className="font-medium">{registrationData.subjectOther}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Children Information */}
      {registrationData.children && registrationData.children.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
          <div className="border-b border-gray-200 pb-2 mb-4">
            <h3 className="text-lg font-bold text-gray-900">Children Information</h3>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="space-y-4">
              {registrationData.children.map((child, index) => (
                <div key={index} className="bg-white rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Child {index + 1}</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-600">Name:</p>
                      <p className="font-medium">{child.name || "N/A"}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Gender:</p>
                      <p className="font-medium">{child.gender || "N/A"}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Age:</p>
                      <p className="font-medium">{child.age || "N/A"}</p>
                    </div>
                    {child.profilePicURL && (
                      <div>
                        <p className="text-gray-600">Profile Picture:</p>
                        <img src={child.profilePicURL} alt={child.name} className="w-20 h-20 rounded object-cover mt-1" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Referral Information */}
      {registrationData.referralCode && (
        <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
          <div className="border-b border-gray-200 pb-2 mb-4">
            <h3 className="text-lg font-bold text-gray-900">Referral Information</h3>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="bg-white rounded-lg p-4">
              <p className="text-gray-600">Referral Code:</p>
              <p className="font-medium">{registrationData.referralCode}</p>
            </div>
          </div>
        </div>
      )}

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

export default LearningRegistrationComponent;

