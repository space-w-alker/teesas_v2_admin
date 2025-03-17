import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Headers from "../common/Headers";
import Custombutton from "../common/Custombutton";
import { updateJobAsync } from "../../apis/slices/adminSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const JobDetails = ({ isOpen }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [data, setData] = useState();
  useEffect(() => {
    setData(location.state.data);
  }, []);

  return (
    <div
      className={`py-[7rem] lg:px-[5rem] px-[10px] ${
        isOpen ? "xl:ml-[260px]" : ""
      } transition-all duration-300`}
    >
      <Headers value1="Home" value2="Job Details" value3={data?.title} />

      <div className="mt-6 bg-[#E9FDEE] rounded-xl p-6 mb-6">
        <div className="flex flex-col">
          <h2 className="font-bold text-gray-900">{data?.title}</h2>
          <span
            className={`mt-2 px-4 py-1 rounded-full text-sm w-fit ${
              data?.status === 1
                ? "bg-green-100 text-green-600"
                : "bg-yellow-100 text-yellow-600"
            }`}
          >
            {data?.status == 1 ? "Active" : "Disabled"}
          </span>
        </div>
      </div>

      <div className="flex justify-end gap-4 mb-6">
        {/* <Custombutton
          value="Manage Job"
          textcolor="text-white"
          backgroundcolor="bg-[#27AE60]"
        /> */}
        <Custombutton
          onClick={() => {
            updateJobAsync({
              dispatch: dispatch,
              body: {
                id: data?.id,
              },
              // token: token,
              callbackFn: (res) => {
                if (res?.data?.status === 200) {
                  toast.success(res?.data?.message);
                  setData(res?.data?.data);
                  setLoading(false);
                  // toast.success(res?.data?.message);
                } else {
                  toast.error(res?.data?.message);
                  setLoading(false);
                }
              },
            });
          }}
          value={data?.status == 1 ? "Unpublish Job" : "Publish Job"}
          textcolor={data?.status == 1 ? "text-red-600" : "text-[#27AE60]"}
          backgroundcolor="bg-white"
          border={true}
          extraStyle="border border-[#27AE60]"
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="border-b border-gray-200 pb-2 mb-4">
          <h3 className="text-lg font-bold text-gray-900">Job Details</h3>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex justify-end">
            {/* <Custombutton
              value="Download CSV"
              textcolor="text-[#27AE60]"
              onClick={() => {
                // CSV download logic here
              }}
            /> */}
          </div>
          <div className="bg-white rounded-lg p-4">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-gray-600">Job Title:</p>
                <p className="font-medium">{data?.title}</p>
              </div>
              <div>
                <p className="text-gray-600">Location:</p>
                <p className="font-medium">{data?.location}</p>
              </div>
              <div>
                <p className="text-gray-600">Duration:</p>
                <p className="font-medium">{data?.duration}</p>
              </div>
              <div>
                <p className="text-gray-600">Job Type:</p>
                <p className="font-medium">{data?.job_type}</p>
              </div>
            </div>
            <div className="mt-6">
              <p className="text-gray-600 mb-2">Duties & Responisibilities:</p>
              <p className="font-medium">{data?.skills}</p>
            </div>

            <div className="mt-6">
              <p className="text-gray-600 mb-2">Job Description:</p>
              <p className="font-medium">{data?.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
