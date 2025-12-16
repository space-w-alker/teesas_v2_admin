import React from "react";

const NewRegistrationComponent = ({ registrationData }) => {
  if (!registrationData) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6 text-center">
        <p className="text-gray-500">Loading registration details...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Parent/Student Information */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="border-b border-gray-200 pb-2 mb-4">
          <h3 className="text-lg font-bold text-gray-900">
            {registrationData.type === "parent" ? "Parent Information" : "Student Information"}
          </h3>
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
                <p className="text-gray-600 text-sm">Type:</p>
                <p className="font-medium capitalize">{registrationData.type || "N/A"}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Location:</p>
                <p className="font-medium">{registrationData.location || "N/A"}</p>
              </div>
              {registrationData.childrenCount !== null && (
                <div>
                  <p className="text-gray-600 text-sm">Children Count:</p>
                  <p className="font-medium">{registrationData.childrenCount}</p>
                </div>
              )}
              {registrationData.referralCode && (
                <div>
                  <p className="text-gray-600 text-sm">Referral Code:</p>
                  <p className="font-medium">{registrationData.referralCode}</p>
                </div>
              )}
              <div>
                <p className="text-gray-600 text-sm">Terms Accepted:</p>
                <p className="font-medium">{registrationData.terms ? "Yes" : "No"}</p>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {registrationData.address && (
                  <div>
                    <p className="text-gray-600 text-sm">Address:</p>
                    <p className="font-medium">{registrationData.address}</p>
                  </div>
                )}
                {registrationData.city && (
                  <div>
                    <p className="text-gray-600 text-sm">City:</p>
                    <p className="font-medium">{registrationData.city}</p>
                  </div>
                )}
                {registrationData.state && (
                  <div>
                    <p className="text-gray-600 text-sm">State:</p>
                    <p className="font-medium">{registrationData.state}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Children Information */}
      {registrationData.children && registrationData.children.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
          <div className="border-b border-gray-200 pb-2 mb-4">
            <h3 className="text-lg font-bold text-gray-900">
              Children Information ({registrationData.children.length})
            </h3>
          </div>
          <div className="space-y-6">
            {registrationData.children.map((child, index) => (
              <div key={child.id || index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="bg-white rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-200">
                    <h4 className="font-semibold text-lg text-gray-900">
                      Child {index + 1}: {child.name || "N/A"}
                    </h4>
                    {child.profilePicURL && (
                      <img
                        src={child.profilePicURL}
                        alt={child.name}
                        className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                      />
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <p className="text-gray-600 text-sm">Name:</p>
                      <p className="font-medium">{child.name || "N/A"}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm">Gender:</p>
                      <p className="font-medium">{child.gender || "N/A"}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm">Age:</p>
                      <p className="font-medium">{child.age || "N/A"}</p>
                    </div>
                    {child.discipline && (
                      <div>
                        <p className="text-gray-600 text-sm">Discipline:</p>
                        <p className="font-medium">{child.discipline}</p>
                      </div>
                    )}
                    {child.classSession && (
                      <div>
                        <p className="text-gray-600 text-sm">Class Session:</p>
                        <p className="font-medium">{child.classSession}</p>
                      </div>
                    )}
                    {child.subscriptionType && (
                      <div>
                        <p className="text-gray-600 text-sm">Subscription Type:</p>
                        <p className="font-medium">{child.subscriptionType}</p>
                      </div>
                    )}
                    {child.courseOfStudy && (
                      <div>
                        <p className="text-gray-600 text-sm">Course of Study:</p>
                        <p className="font-medium">{child.courseOfStudy}</p>
                      </div>
                    )}
                    {child.targetExam && (
                      <div>
                        <p className="text-gray-600 text-sm">Target Exam:</p>
                        <p className="font-medium">{child.targetExam}</p>
                      </div>
                    )}
                    {child.preferredCentre && (
                      <div>
                        <p className="text-gray-600 text-sm">Preferred Centre:</p>
                        <p className="font-medium">{child.preferredCentre}</p>
                      </div>
                    )}
                    {child.preferredDate && (
                      <div>
                        <p className="text-gray-600 text-sm">Preferred Date:</p>
                        <p className="font-medium">
                          {new Date(child.preferredDate).toLocaleDateString()}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Preferred Subjects */}
                  {child.preferredSubjects && child.preferredSubjects.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="text-gray-600 text-sm mb-2">Preferred Subjects:</p>
                      <div className="flex flex-wrap gap-2">
                        {child.preferredSubjects.map((subject, subIndex) => (
                          <span
                            key={subIndex}
                            className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium"
                          >
                            {subject === "__OTHERS__" ? "Others" : subject}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Other Preferred Subjects */}
                  {child.preferredSubjectsOther && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="text-gray-600 text-sm">Other Preferred Subjects:</p>
                      <p className="font-medium">{child.preferredSubjectsOther}</p>
                    </div>
                  )}

                  {/* Child Timestamps */}
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-gray-500">
                      {child.createdAt && (
                        <div>
                          <p className="text-gray-600 text-sm">Created:</p>
                          <p>{new Date(child.createdAt).toLocaleString()}</p>
                        </div>
                      )}
                      {child.updatedAt && (
                        <div>
                          <p className="text-gray-600 text-sm">Updated:</p>
                          <p>{new Date(child.updatedAt).toLocaleString()}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

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

export default NewRegistrationComponent;

