import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { TailSpin } from "react-loader-spinner";
import Headers from '../common/Headers';
import Headcomponent from '../common/Headcomponent';
import Custombutton from '../common/Custombutton';
import SuccessModal from '../common/SuccessModal';
import { createSubscriptionPlanAsync, getCourseSubscriptionsAsync } from '../../apis/slices/subscriptionsSlice';
import { getCountriesAsync } from '../../apis/slices/bankSlice';

const AddSubscriptionPlan = ({ isOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [classes, setClasses] = useState([]);
  const [error, setError] = useState(null);
  const [countries, setCountries] = useState([]);

  const courseId = location.state?.courseId;
  const courseName = location.state?.courseName || 'Course';

  const [formData, setFormData] = useState({
    class_id: '',
    amount: '',
    discount: '',
    country_id: '',
    time: '',
    description: '',
    detail: '',
    plan_id: `plan-${Date.now()}`,
    plan_id_inapp: `inapp-plan-${Date.now()}`
  });

  useEffect(() => {
    if (!courseId) {
      setError("No course selected. Please go back and select a course.");
      return;
    }

    const token = localStorage.getItem('token') || '';

    // Fetch classes for the selected course
    getCourseSubscriptionsAsync({
      dispatch,
      courseId,
      token,
      callbackFn: (res) => {
        if (res?.data?.status === 200) {
          setClasses(res.data.data.classes || []);
          if (res.data.data.classes && res.data.data.classes.length > 0) {
            setFormData(prev => ({
              ...prev,
              class_id: res.data.data.classes[0].id
            }));
          }
        } else {
          setError(res?.data?.message || "Failed to fetch course classes");
        }
      }
    });

    getCountriesAsync({
      dispatch,
      token,
      callbackFn: (res) => {
        if (res?.data?.status === 200) {
          setCountries(res.data.data || []);
        } else {
          console.error("Error fetching countries");
        }
      }
    });

  }, [dispatch, courseId]);



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'amount' || name === 'discount' || name === 'time'
        ? parseFloat(value) || ''
        : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token') || '';

    setLoading(true);

    createSubscriptionPlanAsync({
      dispatch,
      body: formData,
      token,
      callbackFn: (res) => {
        setLoading(false);
        if (res?.data?.status === 201) {
          setShowSuccess(true);
        } else {
          setError(res?.data?.message || "Failed to create subscription plan");
        }
      }
    });
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    navigate(`/subscription-plans/${courseId}`, { state: { courseName } });
  };

  return (
    <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""} transition-all duration-300`}>
      <Headers value1="Home" value2="Subscription Types" value3={courseName} value4="Add Subscription Plan" />

      {loading && (
        <div style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 9999,
        }}>
          <TailSpin color="orange" radius={5} />
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="mt-6 flex gap-6">
        <div className="flex-[2] bg-white rounded-xl shadow-sm p-6">
          <Headcomponent value="Add Subscription Plan" showSearch={false} />
          <div className="border-b border-gray-200 mb-6"></div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Class</label>
                <select
                  name="class_id"
                  value={formData.class_id}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27AE60]"
                  required
                >
                  <option value="">Select Class</option>
                  {classes.map(classItem => (
                    <option key={classItem.id} value={classItem.id}>
                      {classItem.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27AE60]"
                    required
                    step="0.01"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Discount (%)</label>
                  <input
                    type="number"
                    name="discount"
                    value={formData.discount}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27AE60]"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                  <select
                    name="country_id"
                    value={formData.country_id}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27AE60]"
                    required
                  >
                    <option value="">Select Country</option>
                    {countries.map(country => (
                      <option key={country.id} value={country.code}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Duration (Days)</label>
                  <input
                    type="number"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27AE60]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27AE60]"
                  rows="2"
                  required
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Detailed Description</label>
                <textarea
                  name="detail"
                  value={formData.detail}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27AE60]"
                  rows="4"
                  required
                ></textarea>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Plan ID</label>
                  <input
                    type="text"
                    name="plan_id"
                    value={formData.plan_id}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27AE60]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">In-App Plan ID</label>
                  <input
                    type="text"
                    name="plan_id_inapp"
                    value={formData.plan_id_inapp}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27AE60]"
                    required
                  />
                </div>
              </div>
            </div>
          </form>
        </div>

        <div className="flex-1">
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Summary</h2>
            <div className="bg-[#E9FDEE] rounded-lg p-6">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Class:</span>
                  <span className="font-medium">
                    {formData.class_id ? classes.find(c => c.id === formData.class_id)?.name || '_____' : '_____'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Amount:</span>
                  <span className="font-medium">{formData.amount || '_____'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Discount:</span>
                  <span className="font-medium">{formData.discount ? `${formData.discount}%` : '_____'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Country:</span>
                  <span className="font-medium">{formData.country_id || '_____'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-medium">{formData.time ? `${formData.time} Days` : '_____'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Plan ID:</span>
                  <span className="font-medium">{formData.plan_id || '_____'}</span>
                </div>
              </div>
            </div>
            <Custombutton
              value="Add Subscription Plan"
              onClick={handleSubmit}
              textcolor="text-white"
              backgroundcolor="bg-[#27AE60]"
              extraStyle="w-full mt-8 hover:bg-[#219652]"
            />
          </div>
        </div>
      </div>

      <SuccessModal
        isOpen={showSuccess}
        onClose={handleSuccessClose}
        type="success"
        title="Subscription Plan Added Successfully"
        message="Your subscription plan has been added successfully"
        buttonText="Go to Subscription Plans"
      />
    </div>
  );
};

export default AddSubscriptionPlan;
