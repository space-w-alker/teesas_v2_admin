import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Headers from "../common/Headers";
import Headcomponent from "../common/Headcomponent";
import StatCard from "../common/StatCard";
import Custombutton from "../common/Custombutton";
import Modal from "../common/Modal";
import bookopen from "../../assets/images/bookopen.png";
import sharp from "../../assets/images/sharp.png";
import { FaPlus, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import {
  getJobsAsync,
  deleteJobAsync,
  updateJobAsync,
} from "../../apis/slices/adminSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const JobItem = ({
  name,
  status,
  data,
  toast,
  loading,
  setLoading,
  setJobs,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div className="mt-6 bg-white rounded-xl p-4 flex items-center justify-between hover:shadow-md transition-shadow">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-gray-50 rounded-lg">
          <img src={bookopen} alt="job" className="w-6 h-6" />
        </div>
        <div className="flex flex-col">
          <span className="font-medium text-gray-800">{name}</span>
          <Custombutton
            value={
              <div className="flex items-center gap-2">
                <img src={sharp} alt="sharp" className="w-4 h-4" />
                <span>{status == 1 ? "Visible" : "Invisible"}</span>
              </div>
            }
            backgroundcolor={status == 1 ? "bg-green-100" : "bg-gray"}
            textcolor={status == 1 ? "text-blue-400" : "text-gray-300"}
            width="w-[100px]"
          />
        </div>
      </div>
      <div className="flex gap-4 items-center">
        <Custombutton
          value="View"
          onClick={() =>
            navigate("/job-details", {
              state: {
                // jobTitle: name,
                // status: "Published",
                data,
              },
            })
          }
        />
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
                  // setLoading(false);
                  // const apiParams = {
                  //   page: page,
                  //   limit: limit,
                  //   ...(searchValue.trim() !== ""
                  //     ? { search: searchValue }
                  //     : {}),
                  // };
                  getJobsAsync({
                    dispatch: dispatch,
                    // data: apiParams,
                    callbackFn: (res) => {
                      if (res?.data?.status == 200) {
                        setJobs(res?.data?.data);
                        // setLoading(false);
                      } else {
                        // setLoading(false);
                      }
                    },
                  });
                  setLoading(false);
                  // toast.success(res?.data?.message);
                } else {
                  toast.error(res?.data?.message);
                  setLoading(false);
                }
              },
            });
          }}
          value={status == 1 ? "Unpublish" : "Publish"}
        />
        <Custombutton
          value="Delete"
          textcolor="text-red-600"
          onClick={() => {
            deleteJobAsync({
              dispatch: dispatch,
              data: data?.id,
              callbackFn: (res) => {
                if (res?.data?.status == 200) {
                  toast.success(res?.data?.message);
                  // setLoading(false);
                  // const apiParams = {
                  //   page: page,
                  //   limit: limit,
                  //   ...(searchValue.trim() !== ""
                  //     ? { search: searchValue }
                  //     : {}),
                  // };
                  getJobsAsync({
                    dispatch: dispatch,
                    // data: apiParams,
                    callbackFn: (res) => {
                      if (res?.data?.status == 200) {
                        setJobs(res?.data?.data);
                        // setLoading(false);
                      } else {
                        // setLoading(false);
                      }
                    },
                  });
                } else {
                  // setLoading(false);
                  toast.error(res?.data?.message);
                }
              },
            });
          }}
        />
      </div>
    </div>
  );
};

const JobOpenings = ({ isOpen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(1);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const apiParams = {
      page: page,
      limit: limit,
      ...(searchValue.trim() !== "" ? { search: searchValue } : {}),
    };
    getJobsAsync({
      dispatch: dispatch,
      data: apiParams,
      callbackFn: (res) => {
        if (res?.data?.status == 200) {
          setJobs(res?.data?.data);
          setLoading(false);
        } else {
          setLoading(false);
        }
      },
    });
  }, [page, searchValue]);

  return (
    <div
      className={`py-[7rem] lg:px-[5rem] px-[10px] ${
        isOpen ? "xl:ml-[260px]" : ""
      } transition-all duration-300`}
    >
      <Headers value1="Home" value2="Job Openings" />

      <div className="mt-6 bg-white rounded-xl shadow-sm p-6 mb-8">
        <StatCard title="Total Job Openings" count={jobs?.totalJobs} />
      </div>

      <div className="flex justify-end mb-6">
        <Custombutton
          value={
            <div className="flex items-center gap-2">
              <FaPlus />
              <span>Add Job Opening</span>
            </div>
          }
          onClick={() => navigate("/add-unit-job")}
          textcolor="text-white"
          backgroundcolor="bg-[#27AE60]"
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b border-gray-100">
          <Headcomponent
            value="Job Opening List"
            showSearch={true}
            onSearch={(e) => {
              setSearchValue(e);
            }}
          />
        </div>

        <div className="p-6">
          <div className="space-y-4">
            {jobs?.jobs?.map((job, index) => (
              <JobItem
                key={index}
                name={job?.title}
                status={job?.status}
                data={job}
                toast={toast}
                loading={loading}
                setLoading={setLoading}
                setJobs={setJobs}
              />
            ))}
          </div>
        </div>

        <div className="p-6 border-t border-gray-100 flex justify-between items-center">
          <Custombutton
            onClick={() => {
              if (page > 1) {
                setPage(page - 1);
              }
            }}
            value={
              <div className="flex items-center gap-2">
                <FaArrowLeft />
                <span>Previous</span>
              </div>
            }
            backgroundcolor="bg-gray-100"
            textcolor="text-gray-600"
            width="w-[100px]"
            extraStyle="py-2"
          />
          <span className="text-gray-600">
            Page {jobs?.pagination?.current_page} of{" "}
            {jobs?.pagination?.total_pages}
          </span>
          <Custombutton
            onClick={() => {
              if (page < jobs?.pagination?.total_pages) {
                setPage(page + 1);
              }
            }}
            value={
              <div className="flex items-center gap-2">
                <span>Next</span>
                <FaArrowRight />
              </div>
            }
            backgroundcolor="bg-gray-100"
            textcolor="text-gray-600"
            width="w-[80px]"
            extraStyle="py-2"
          />
        </div>
      </div>

      {showModal && (
        <Modal
          label="Add Job Opening"
          closeModal={() => setShowModal(false)}
          value1="Add Single Job Opening"
          // value2="Upload Bulk Job Openings"
          addSingleButton={() => {
            navigate("/add-unit-job");
            setShowModal(false);
          }}
          addMutipleButton={() => {
            navigate("/add-bulk-jobs");
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
};

export default JobOpenings;
