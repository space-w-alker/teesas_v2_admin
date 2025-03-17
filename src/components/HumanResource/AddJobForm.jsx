import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Headers from "../common/Headers";
import Headcomponent from "../common/Headcomponent";
import Custombutton from "../common/Custombutton";
import SuccessModal from "../common/SuccessModal";
import { addJobAsync } from "../../apis/slices/adminSlice";
import { useDispatch, useSelector } from "react-redux";
import validateAddJob from "../../components/validator/addJobValidator";
import { toast } from "react-toastify";
import { TailSpin } from "react-loader-spinner";

const AddJobForm = ({ isOpen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setError] = useState({});
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    jobTitle: "",
    location: "",
    duration: "",
    jobType: "",
    jobDescription: "",
    duties: "",
    qualifications: "",
  });

  const handleSubmit = (status) => {
    const errorData = validateAddJob(formData);
    setError(errorData);
    if (Object.keys(errorData).length < 1) {
      setLoading(true);
      const form_data = {
        jobTitle: formData?.jobTitle,
        location: formData?.location,
        duration: formData?.duration,
        jobType: formData?.jobType,
        jobDescription: formData?.jobDescription,
        duties: formData?.duties,
        qualifications: formData?.qualifications,
        status: status,
      };

      addJobAsync({
        dispatch: dispatch,
        body: form_data,
        // token: token,
        callbackFn: (res) => {
          if (res?.data?.status === 200) {
            setFormData({
              jobTitle: "",
              location: "",
              duration: "",
              jobType: "",
              jobDescription: "",
              duties: "",
              qualifications: "",
            });
            setShowSuccess(true);
            setLoading(false);
            toast.success(res?.data?.message);
          } else {
            toast.error(res?.data?.message);
            setLoading(false);
          }
        },
      });
    } else {
      toast.error("Please fill all fields");
    }
  };

  return (
    <div
      className={`py-[7rem] lg:px-[5rem] px-[10px] ${
        isOpen ? "xl:ml-[260px]" : ""
      } transition-all duration-300`}
    >
      <Headers value1="Home" value2="Add Job Opening" />
      {loading && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 9999,
          }}
        >
          <TailSpin color="orange" radius={5} />
        </div>
      )}

      <div className=" mt-6 flex gap-6">
        <div className="flex-[2] bg-white rounded-xl shadow-sm p-6">
          <Headcomponent value="Add Job Opening" showSearch={false} />
          <div className="border-b border-gray-200 mb-6"></div>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Title
                </label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27AE60]"
                  value={formData.jobTitle}
                  onChange={(e) =>
                    setFormData({ ...formData, jobTitle: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27AE60]"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Duration
                </label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27AE60]"
                  value={formData.duration}
                  onChange={(e) =>
                    setFormData({ ...formData, duration: e.target.value })
                  }
                  required
                >
                  <option value="">Select Duration</option>
                  <option value="Contract">Contract</option>
                  <option value="Fulltime">Fulltime</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Type
                </label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27AE60]"
                  value={formData.jobType}
                  onChange={(e) =>
                    setFormData({ ...formData, jobType: e.target.value })
                  }
                  required
                >
                  <option value="">Select Type</option>
                  <option value="Remote">Remote</option>
                  <option value="On-Site">On-Site</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job Description
              </label>
              <textarea
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27AE60]"
                value={formData.jobDescription}
                onChange={(e) =>
                  setFormData({ ...formData, jobDescription: e.target.value })
                }
                rows="4"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duties & Responsibilities
              </label>
              <textarea
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27AE60]"
                value={formData.duties}
                onChange={(e) =>
                  setFormData({ ...formData, duties: e.target.value })
                }
                rows="4"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Required Skills and Qualifications
              </label>
              <textarea
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27AE60]"
                value={formData.qualifications}
                onChange={(e) =>
                  setFormData({ ...formData, qualifications: e.target.value })
                }
                rows="4"
                required
              />
            </div>
          </div>
        </div>

        <div className="flex-1">
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Summary</h2>
            <div className="bg-[#E9FDEE] rounded-lg p-6">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Job Title:</span>
                  <span className="font-medium">{formData.jobTitle || ""}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Location:</span>
                  <span className="font-medium">{formData.location || ""}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-medium">{formData.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Job Type:</span>
                  <span className="font-medium">{formData.jobType}</span>
                </div>
              </div>
            </div>
            <Custombutton
              value="Publish Job"
              onClick={() => handleSubmit(1)}
              textcolor="text-white"
              backgroundcolor="bg-[#27AE60]"
              extraStyle="w-full mt-8 hover:bg-[#219652]"
            />
            <Custombutton
              value="Save and Publish Later"
              onClick={() => {
                handleSubmit(0);
              }}
              textcolor="text-[#27AE60]"
              backgroundcolor="bg-white"
              border={true}
              extraStyle="w-full mt-4 border border-[#27AE60] hover:bg-[#E9FDEE]"
            />
          </div>
        </div>
      </div>

      <SuccessModal
        isOpen={showSuccess}
        onClose={() => {
          setShowSuccess(false);
          navigate("/job-opening");
        }}
        type="success"
        title="Job Posted Successfully"
        message="Your job posting has been published successfully"
        buttonText="Close"
      />
    </div>
  );
};

export default AddJobForm;
