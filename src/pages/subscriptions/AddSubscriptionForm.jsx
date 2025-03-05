import React, { useState, useEffect } from 'react';
import { FaChevronLeft } from "react-icons/fa";
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  getSubscriptionWorkflowAsync,
  createSubscriptionAsync,
  selectSubscriptionWorkflow,
  selectSubscriptionCreation,
  resetSubscriptionCreation
} from '../../apis/slices/subscriptionsSlice';
import { TailSpin } from "react-loader-spinner";
import { toast } from 'react-toastify';

const AddSubscriptionForm = ({ isOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const token = localStorage.getItem("authToken");

  const selectedUser = location.state?.user;
  const [formData, setFormData] = useState({
    user_id: selectedUser?.id || '',
    category_id: '',
    class_id: '',
    subscription_id: '',
    start_date: new Date().toISOString().substr(0, 10),
    transaction_id: `manual-${Date.now()}`,
    tx_ref: `manual-ref-${Date.now()}`
  });

  // Redux state selectors
  const workflowState = useSelector(selectSubscriptionWorkflow);
  const subscriptionCreationState = useSelector(selectSubscriptionCreation);

  // Local state for UI
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [classes, setClasses] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);

  // Initial load - fetch categories
  useEffect(() => {
    if (selectedUser?.id) {
      getSubscriptionWorkflowAsync({
        dispatch,
        body: { user_id: selectedUser.id },
        token,
        callbackFn: (result) => {
          if (result?.error) {
            toast.error("Failed to load categories: " + result.error.message);
          }
        }
      });
    } else {
      toast.error("No user selected. Please go back and select a user.");
      navigate('/add-single-subscription');
    }
  }, [dispatch, selectedUser, token, navigate]);

  // Handle workflow data updates
  useEffect(() => {
    if (workflowState.data) {
      setCategories(workflowState.data.categories || []);

      // Only update classes if we have a category selected
      if (formData.category_id) {
        setClasses(workflowState.data.classList || []);
      }

      // Only update subscriptions if we have a class selected
      if (formData.class_id) {
        setSubscriptions(workflowState.data.availableSubscriptions || []);
      }
    }
  }, [workflowState.data, formData.category_id, formData.class_id]);

  // Watch for subscription creation success
  useEffect(() => {
    if (subscriptionCreationState.success) {
      setShowSuccessModal(true);
    }
    if (subscriptionCreationState.error) {
      toast.error("Failed to create subscription: " + subscriptionCreationState.error);
    }
  }, [subscriptionCreationState]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = {
      ...formData,
      [name]: value
    };

    // Reset dependent fields when parent field changes
    if (name === 'category_id') {
      updatedFormData.class_id = '';
      updatedFormData.subscription_id = '';

      // If category changes, fetch classes for this category
      if (value) {
        getSubscriptionWorkflowAsync({
          dispatch,
          body: {
            user_id: selectedUser.id,
            category_id: value
          },
          token
        });
      }
    } else if (name === 'class_id') {
      updatedFormData.subscription_id = '';

      // If class changes, fetch subscriptions for this class
      if (value) {
        getSubscriptionWorkflowAsync({
          dispatch,
          body: {
            user_id: selectedUser.id,
            category_id: updatedFormData.category_id,
            class_id: value
          },
          token
        });
      }
    }

    setFormData(updatedFormData);
  };

  const handleSubmit = () => {
    // Validate required fields
    if (!formData.category_id) {
      toast.warning("Please select a category");
      return;
    }
    if (!formData.class_id) {
      toast.warning("Please select a class");
      return;
    }
    if (!formData.subscription_id) {
      toast.warning("Please select a subscription plan");
      return;
    }

    createSubscriptionAsync({
      dispatch,
      body: formData,
      token,
      callbackFn: (result) => {
        if (result?.error) {
          toast.error("Failed to create subscription: " + result.error.message);
        }
      }
    });
  };

  const SuccessModal = () => {
    const handleClose = () => {
      setShowSuccessModal(false);
      dispatch(resetSubscriptionCreation());
      navigate('/subscribed-users');
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-8 w-[400px] text-center">
          <div className="w-24 h-24 rounded-full bg-[#27AE60] flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold mb-4">Success!</h3>
          <p className="text-gray-600 mb-8">Subscription has been added successfully</p>
          <button
            onClick={handleClose}
            className="w-full py-3 bg-[#27AE60] text-white rounded-lg hover:bg-[#219652]"
          >
            Close
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""}`}>
      <div className='flex justify-start items-center lg:gap-3'>
        <FaChevronLeft onClick={() => navigate(-1)} className="cursor-pointer" />
        <div>
          <div className='font-normal text-[14px] lg:text-[16px] leading-[20px] text-[#B6B6B6]'>
            Subscribed Users /<span className='text-black font-medium'> Add Subscription</span>
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-3 gap-6">
        <div className="col-span-2 bg-white rounded-xl p-6">
          <h2 className="font-bold text-[22px] leading-[28px] text-[#2C2E32] mb-4">
            Add Subscription
          </h2>

          {/* Add user info prominently at the top of the form */}
          <div className="mb-6 p-4 bg-[#F8F8F8] rounded-lg">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-[#E9FDEE] text-[#27AE60] flex items-center justify-center font-medium mr-3">
                {selectedUser?.name ? selectedUser.name.charAt(0).toUpperCase() : "U"}
              </div>
              <div>
                <h3 className="font-semibold text-[16px]">{selectedUser?.name || "Unknown User"}</h3>
                <p className="text-gray-600 text-sm">{selectedUser?.email || "No email available"}</p>
              </div>
              {selectedUser?.is_verified && (
                <span className="ml-auto px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">Verified</span>
              )}
            </div>
          </div>

          {workflowState.isLoading && !categories.length ? (
            <div className="flex justify-center my-8">
              <TailSpin color="orange" radius={5} />
            </div>
          ) : (
            <>
              <div className="mb-6">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-[14px] text-gray-600 mb-2">Select Category</label>
                    <select
                      name="category_id"
                      value={formData.category_id}
                      onChange={handleInputChange}
                      className="w-full bg-[#F8F8F8] border border-[#ECEDEE] rounded-lg p-2"
                    >
                      <option value="">Select Category</option>
                      {categories.map(category => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[14px] text-gray-600 mb-2">Select Class</label>
                    <select
                      name="class_id"
                      value={formData.class_id}
                      onChange={handleInputChange}
                      className="w-full bg-[#F8F8F8] border border-[#ECEDEE] rounded-lg p-2"
                      disabled={!formData.category_id || workflowState.isLoading}
                    >
                      <option value="">Select Class</option>
                      {classes.map(classItem => (
                        <option key={classItem.id} value={classItem.id}>{classItem.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[14px] text-gray-600 mb-2">Subscription Plan</label>
                    <select
                      name="subscription_id"
                      value={formData.subscription_id}
                      onChange={handleInputChange}
                      className="w-full bg-[#F8F8F8] border border-[#ECEDEE] rounded-lg p-2"
                      disabled={!formData.class_id || workflowState.isLoading}
                    >
                      <option value="">Select Plan</option>
                      {subscriptions.map(plan => (
                        <option key={plan.id} value={plan.id}>
                          {plan.description} - ₦{plan.amount} for {plan.time} days
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[14px] text-gray-600 mb-2">Starting Date</label>
                    <input
                      type="date"
                      name="start_date"
                      value={formData.start_date}
                      onChange={handleInputChange}
                      className="w-full bg-[#F8F8F8] border border-[#ECEDEE] rounded-lg p-2"
                    />
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-[14px] text-gray-600 mb-2">Transaction Reference (Optional)</label>
                <input
                  type="text"
                  name="transaction_id"
                  value={formData.transaction_id}
                  onChange={handleInputChange}
                  className="w-full bg-[#F8F8F8] border border-[#ECEDEE] rounded-lg p-2"
                  placeholder="Enter transaction reference"
                />
              </div>

              <button
                onClick={handleSubmit}
                disabled={subscriptionCreationState.isLoading}
                className="w-full py-3 rounded-lg text-white bg-[#27AE60] hover:bg-[#219652] mt-6 disabled:bg-gray-300"
              >
                {subscriptionCreationState.isLoading ? 'Processing...' : 'Add Subscription'}
              </button>
            </>
          )}
        </div>

        <div className="bg-white rounded-xl p-6">
          <h3 className="font-bold text-[18px] leading-[24px] text-[#2C2E32] mb-6">Summary</h3>
          <div className="space-y-4">
            <div>
              <p className="text-gray-600 text-sm">User Name</p>
              <p className="font-medium">{selectedUser?.name || '-'}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Email</p>
              <p className="font-medium">{selectedUser?.email || '-'}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Category</p>
              <p className="font-medium">
                {formData.category_id ?
                  categories.find(c => c.id == formData.category_id)?.name || '-' :
                  '-'}
              </p>
            </div>
            <div>

              <p className="text-gray-600 text-sm">Subscription</p>
              <p className="font-medium">
                {formData.subscription_id ?
                  subscriptions.find(s => s.id == formData.subscription_id)?.description || '-' :
                  '-'}
              </p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Start Date</p>
              <p className="font-medium">{formData.start_date || '-'}</p>
            </div>
          </div>
        </div>
      </div>
      {showSuccessModal && <SuccessModal />}
    </div>
  );
};

export default AddSubscriptionForm;
