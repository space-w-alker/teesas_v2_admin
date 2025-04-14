import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Headers from "../common/Headers";
import PropTypes from "prop-types";
import { TailSpin } from "react-loader-spinner";
import { addCourseAsync } from "../../apis/slices/learningCenterSlice";
import SuccessModal from "../common/SuccessModal";

const AddSubject = ({ isOpen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("authToken");
  const [subjectName, setSubjectName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleChange = (e) => {
    setSubjectName(e.target.value);
    if (e.target.value.trim()) {
      setError("");
    }
  };

  const handleSubmit = () => {
    if (!subjectName.trim()) {
      setError("Subject name is required");
      return;
    }

    setLoading(true);

    addCourseAsync({
      dispatch: dispatch,
      data: {
        name: subjectName,
        status: true
      },
      token: token,
      callbackFn: (res) => {
        setLoading(false);
        if (res?.data?.status === 200) {
          setShowSuccessModal(true);
        } else {
          setError(res?.data?.message || "Failed to add course");
        }
      },
    });
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    navigate("/learning-center-courses");
  };

  return (
    <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""}`}>
      {loading && (
        <div style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 9999,
        }}>
          <TailSpin color="green" radius={5} />
        </div>
      )}

      <Headers value1="Home" value2="Learning Center" value3="Add Subject" />

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-8">
              Add Subject
            </h2>

            <div className="grid grid-cols-1 gap-6">
              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Subject Name
                </label>
                <input
                  type="text"
                  value={subjectName}
                  onChange={handleChange}
                  className={`w-full p-3 border ${error ? "border-red-500" : "border-gray-200"
                    } rounded-lg focus:outline-none focus:border-[#27AE60]`}
                  placeholder="Enter Subject Name"
                />
                {error && (
                  <p className="text-red-500 text-sm mt-1">{error}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl p-8 shadow-sm h-full">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Summary</h2>

            <div className="bg-[#E9FDEE] rounded-lg p-6">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subject Name:</span>
                  <span className="font-medium">
                    {subjectName || "-"}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full mt-8 px-6 py-3 bg-[#27AE60] text-white rounded-lg disabled:opacity-50"
            >
              {loading ? "Adding..." : "Add Subject"}
            </button>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={handleCloseSuccessModal}
        type="success"
        title="Success"
        message="Course added successfully!"
      />
    </div>
  );
};

AddSubject.propTypes = {
  isOpen: PropTypes.bool.isRequired,
};

export default AddSubject;
