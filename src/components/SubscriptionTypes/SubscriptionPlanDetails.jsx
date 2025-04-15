import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { TailSpin } from "react-loader-spinner";
import Headers from '../common/Headers';
import Headcomponent from '../common/Headcomponent';
import StatCard from '../common/StatCard';
import Custombutton from '../common/Custombutton';
import SuccessModal from '../common/SuccessModal';
import { FaPlus, FaArrowLeft, FaEdit, FaArrowRight, FaTrash } from 'react-icons/fa';
import { getCourseSubscriptionsAsync, deleteSubscriptionPlanAsync } from '../../apis/slices/subscriptionsSlice';

const SubscriptionPlanDetails = ({ isOpen }) => {
  const { courseId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [courseData, setCourseData] = useState(null);
  const [activeClass, setActiveClass] = useState(null);
  const [error, setError] = useState(null);

  // State for delete confirmation modal
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [planToDelete, setPlanToDelete] = useState(null);

  // State for success modal after deletion
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const plansPerPage = 5;

  const courseName = location.state?.courseName || 'Course Details';

  const fetchCourseData = () => {
    const token = localStorage.getItem('token') || '';

    setLoading(true);

    getCourseSubscriptionsAsync({
      dispatch,
      courseId,
      token,
      callbackFn: (res) => {
        setLoading(false);
        if (res?.data?.status === 200) {
          setCourseData(res.data.data);
          if (res.data.data.classes && res.data.data.classes.length > 0) {
            setActiveClass(res.data.data.classes[0].id);
          }
        } else {
          setError(res?.data?.message || "Failed to fetch subscription plans");
        }
      }
    });
  };

  useEffect(() => {
    fetchCourseData();
  }, [dispatch, courseId]);

  // Function to handle delete button click
  const handleDeleteClick = (plan) => {
    setPlanToDelete(plan);
    setShowDeleteConfirm(true);
  };

  // Function to handle delete confirmation
  const handleDeleteConfirm = () => {
    const token = localStorage.getItem('token') || '';

    setLoading(true);
    setShowDeleteConfirm(false);

    deleteSubscriptionPlanAsync({
      dispatch,
      planId: planToDelete.id,
      token,
      callbackFn: (res) => {
        setLoading(false);
        if (res?.data?.status === 200) {
          setShowDeleteSuccess(true);
          // Refresh the data after successful deletion
          fetchCourseData();
        } else {
          setError(res?.data?.message || "Failed to delete subscription plan");
        }
      }
    });
  };

  // Get filtered plans based on active class
  const filteredPlans = activeClass && courseData?.subscriptionPlans
    ? courseData.subscriptionPlans.filter(plan => plan.class_id === activeClass)
    : [];

  // Calculate pagination
  const totalPages = Math.ceil(filteredPlans.length / plansPerPage);
  const indexOfLastPlan = currentPage * plansPerPage;
  const indexOfFirstPlan = indexOfLastPlan - plansPerPage;
  const currentPlans = filteredPlans.slice(indexOfFirstPlan, indexOfLastPlan);

  // Pagination handlers
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""} transition-all duration-300`}>
      <Headers value1="Home" value2="Subscription Types" value3={courseName} />

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <TailSpin color="green" radius={5} />
        </div>
      ) : error ? (
        <div className="text-center py-8 text-red-500">{error}</div>
      ) : courseData ? (
        <>
          <div className="mt-6">
            <StatCard title="Total Subscription Plans" count={courseData.total || "0"} />
          </div>

          <div className="flex justify-end mb-6">
            <Custombutton
              value={
                <div className="flex items-center gap-2">
                  <FaPlus className="text-white" />
                  <span>Add Subscription Plan</span>
                </div>
              }
              onClick={() => navigate('/add-subscription-plan', { state: { courseId, courseName } })}
              textcolor="text-white"
              backgroundcolor="bg-[#27AE60]"
            />
          </div>

          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-6 border-b border-gray-100">
              <Headcomponent value="Subscription Plans" showSearch={false} />
            </div>

            {courseData.classes && courseData.classes.length > 0 && (
              <div className="p-4 border-b border-gray-100">
                <div className="flex gap-4">
                  {courseData.classes.map(classItem => (
                    <button
                      key={classItem.id}
                      className={`px-4 py-2 rounded-lg ${activeClass === classItem.id ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                      onClick={() => setActiveClass(classItem.id)}
                    >
                      {classItem.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="p-6">
              <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                {currentPlans.length > 0 ? (
                  currentPlans.map((plan) => (
                    <div key={plan.id}>
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium text-gray-900">
                          Subscription for {plan.classes?.name || 'Class'} - {plan.time} Days
                        </h3>
                        <div className="flex gap-2">
                          <Custombutton
                            value={<FaEdit />}
                            textcolor="text-blue-500"
                            backgroundcolor="bg-transparent"
                            onClick={() => navigate(`/edit-subscription-plan/${plan.id}`, { 
                              state: { 
                                courseId, 
                                courseName,
                                planId: plan.id
                              } 
                            })}
                          />
                          <Custombutton
                            value={<FaTrash />}
                            textcolor="text-red-500"
                            backgroundcolor="bg-transparent"
                            onClick={() => handleDeleteClick(plan)}
                          />
                        </div>
                      </div>
                      <div className="bg-white rounded-lg p-4">
                        <div className="grid grid-cols-3 gap-8">
                          <div>
                            <p className="text-gray-600 text-sm">Duration</p>
                            <p className="font-medium">{plan.time} Days</p>
                          </div>
                          <div>
                            <p className="text-gray-600 text-sm">Price</p>
                            <p className="font-medium">{plan.amount}</p>
                          </div>
                          <div>
                            <p className="text-gray-600 text-sm">Discount</p>
                            <p className="font-medium">{plan.discount}%</p>
                          </div>
                          <div>
                            <p className="text-gray-600 text-sm">Country</p>
                            <p className="font-medium">{plan.country_id}</p>
                          </div>
                          <div>
                            <p className="text-gray-600 text-sm">Plan ID</p>
                            <p className="font-medium">{plan.plan_id}</p>
                          </div>
                          <div>
                            <p className="text-gray-600 text-sm">Description</p>
                            <p className="font-medium">{plan.description}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    No subscription plans available for this class
                  </div>
                )}
              </div>
            </div>

            <div className="p-6 border-t border-gray-100 flex justify-between items-center">
              <Custombutton
                value={
                  <div className="flex items-center gap-2">
                    <FaArrowLeft />
                    <span>Previous</span>
                  </div>
                }
                onClick={handlePreviousPage}
                backgroundcolor="bg-gray-100"
                textcolor="text-gray-600"
                width="w-[100px]"
                extraStyle={`py-2 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={currentPage === 1}
              />
              <span className="text-gray-600">Page {currentPage} of {totalPages || 1}</span>
              <Custombutton
                value={
                  <div className="flex items-center gap-2">
                    <span>Next</span>
                    <FaArrowRight />
                  </div>
                }
                onClick={handleNextPage}
                backgroundcolor="bg-gray-100"
                textcolor="text-gray-600"
                width="w-[80px]"
                extraStyle={`py-2 ${currentPage === totalPages || totalPages === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={currentPage === totalPages || totalPages === 0}
              />
            </div>
          </div>
        </>
      ) : (
        <div className="text-center py-8 text-gray-500">No course data available</div>
      )}

      <SuccessModal
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        type="caution"
        title="Delete Subscription Plan"
        message={`Are you sure you want to delete this subscription plan?`}
        buttonText="Delete"
        onConfirm={handleDeleteConfirm}
      />


      <SuccessModal
        isOpen={showDeleteSuccess}
        onClose={() => setShowDeleteSuccess(false)}
        type="success"
        title="Success"
        message="Subscription plan has been deleted successfully"
        buttonText="OK"
      />
    </div>
  );
};

export default SubscriptionPlanDetails;
