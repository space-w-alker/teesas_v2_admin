import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Headers from '../common/Headers';
import Headcomponent from '../common/Headcomponent';
import Custombutton from '../common/Custombutton';
import SuccessModal from '../common/SuccessModal';
import { TailSpin } from "react-loader-spinner";
import {
  addPromocodeAsync,
  getClassesByCourseAsync,
  getPlansByClassAsync,
  getCoursesAsync,
  getCountriesAsync,
  selectAddPromocode,
  selectClassesByCourse,
  selectPlansByClass,
  selectCourses,
  selectCountries,
  resetAddPromocode
} from '../../apis/slices/promocodeSlice';

const AddPromoCode = ({ isOpen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const addPromocodeState = useSelector(selectAddPromocode);
  const classesByCourseState = useSelector(selectClassesByCourse);
  const plansByClassState = useSelector(selectPlansByClass);
  const coursesState = useSelector(selectCourses);
  const countriesState = useSelector(selectCountries);

  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState('');
  const [selectedClassIds, setSelectedClassIds] = useState([]);
  const [selectedPlanIds, setSelectedPlanIds] = useState([]);

  const [formData, setFormData] = useState({
    title: '',
    code: '',
    description: '',
    country_id: '',
    type: 'percentage',
    value: '',
    start_date: '',
    end_date: '',
    is_active: true,
  });

  useEffect(() => {

    const token = localStorage.getItem('token');

    getCoursesAsync({
      dispatch,
      token,
      callbackFn: () => { }
    });

    getCountriesAsync({
      dispatch,
      token,
      callbackFn: () => { }
    });


    return () => {
      dispatch(resetAddPromocode());
    };
  }, [dispatch]);

  useEffect(() => {
    if (selectedCourseId) {
      const token = localStorage.getItem('token');
      getClassesByCourseAsync({
        dispatch,
        courseId: selectedCourseId,
        token,
        callbackFn: () => { }
      });


      setSelectedClassIds([]);
      setSelectedPlanIds([]);
    }
  }, [selectedCourseId, dispatch]);

  useEffect(() => {
    if (selectedClassIds.length > 0) {
      const token = localStorage.getItem('token');

      getPlansByClassAsync({
        dispatch,
        classId: selectedClassIds[0],
        token,
        callbackFn: () => { }
      });
    }
  }, [selectedClassIds, dispatch]);

  useEffect(() => {
    if (addPromocodeState.success) {
      setShowSuccess(true);
    }
  }, [addPromocodeState.success]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCourseChange = (e) => {
    setSelectedCourseId(e.target.value);
    setSelectedClassIds([]);
    setSelectedPlanIds([]);
  };

  const handleClassCheckboxChange = (e, classId) => {
    if (e.target.checked) {
      setSelectedClassIds(prev => [...prev, classId]);
    } else {
      setSelectedClassIds(prev => prev.filter(id => id !== classId));
    }
  };

  const handlePlanCheckboxChange = (e, planId) => {
    if (e.target.checked) {
      setSelectedPlanIds(prev => [...prev, planId]);
    } else {
      setSelectedPlanIds(prev => prev.filter(id => id !== planId));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');

    // Format dates to ISO strings
    const startDate = new Date(formData.start_date).toISOString();
    const endDate = new Date(formData.end_date).toISOString();

    const payload = {
      ...formData,
      start_date: startDate,
      end_date: endDate,
      country_id: Number(formData.country_id),
      value: Number(formData.value),
      class_ids: selectedClassIds,
      plan_ids: selectedPlanIds,
    };

    addPromocodeAsync({
      dispatch,
      body: payload,
      token,
      callbackFn: () => { }
    });
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    navigate('/promo-codes');
  };

  return (
    <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""} transition-all duration-300`}>
      <Headers value1="Home" value2="Promo Codes" value3="Add Promo Code" />

      {addPromocodeState.isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <TailSpin color="orange" radius={5} />
        </div>
      )}

      <div className="mt-6 flex flex-col lg:flex-row gap-6">
        <div className="flex-[2] bg-white rounded-xl shadow-sm p-6">
          <Headcomponent value="Add Promo Code" showSearch={false} />
          <div className="border-b border-gray-200 mb-6"></div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Promo Title*</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27AE60]"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Promo Code*</label>
                  <input
                    type="text"
                    name="code"
                    value={formData.code}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27AE60]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Country*</label>
                  <select
                    name="country_id"
                    value={formData.country_id}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27AE60]"
                    required
                  >
                    <option value="">Select Country</option>
                    {countriesState.isLoading ? (
                      <option disabled>Loading countries...</option>
                    ) : countriesState.error ? (
                      <option disabled>Error loading countries</option>
                    ) : countriesState.data && countriesState.data.length > 0 ? (
                      countriesState.data.map(country => (
                        <option key={country.id} value={country.id}>
                          {country.name} ({country.code})
                        </option>
                      ))
                    ) : (
                      <>
                        <option value="1">Nigeria</option>
                        <option value="2">Ghana</option>
                      </>
                    )}
                  </select>

                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Discount Type*</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27AE60]"
                    required
                  >
                    <option value="percentage">Percentage</option>
                    <option value="fixed">Fixed Amount</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {formData.type === 'percentage' ? 'Percentage (%)' : 'Amount'}*
                  </label>
                  <input
                    type="number"
                    name="value"
                    value={formData.value}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27AE60]"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Start Date*</label>
                  <input
                    type="datetime-local"
                    name="start_date"
                    value={formData.start_date}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27AE60]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">End Date*</label>
                  <input
                    type="datetime-local"
                    name="end_date"
                    value={formData.end_date}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27AE60]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description*</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27AE60]"
                  rows="4"
                  required
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Course*</label>
                <select
                  value={selectedCourseId}
                  onChange={handleCourseChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#27AE60]"
                >
                  <option value="">Select Course</option>
                  {coursesState.isLoading ? (
                    <option disabled>Loading courses...</option>
                  ) : coursesState.error ? (
                    <option disabled>Error loading courses</option>
                  ) : coursesState.data && coursesState.data.length > 0 ? (
                    coursesState.data.map(course => (
                      <option key={course.id} value={course.id}>{course.name}</option>
                    ))
                  ) : (
                    <option disabled>No courses available</option>
                  )}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Classes</label>
                  <div className="bg-gray-50 p-3 rounded-lg max-h-40 overflow-y-auto">
                    {classesByCourseState.isLoading ? (
                      <div className="text-center py-2">Loading classes...</div>
                    ) : classesByCourseState.error ? (
                      <div className="text-center py-2 text-red-500">{classesByCourseState.error}</div>
                    ) : classesByCourseState.data && classesByCourseState.data.length > 0 ? (
                      classesByCourseState.data.map(classItem => (
                        <div className="flex items-center mb-2" key={classItem.id}>
                          <input
                            type="checkbox"
                            id={`class-${classItem.id}`}
                            checked={selectedClassIds.includes(classItem.id)}
                            onChange={(e) => handleClassCheckboxChange(e, classItem.id)}
                            className="mr-2"
                          />
                          <label htmlFor={`class-${classItem.id}`}>{classItem.name}</label>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-2 text-gray-500">No classes available</div>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subscription Plans</label>
                  <div className="bg-gray-50 p-3 rounded-lg max-h-40 overflow-y-auto">
                    {plansByClassState.isLoading ? (
                      <div className="text-center py-2">Loading plans...</div>
                    ) : plansByClassState.error ? (
                      <div className="text-center py-2 text-red-500">{plansByClassState.error}</div>
                    ) : plansByClassState.data && plansByClassState.data.length > 0 ? (
                      plansByClassState.data.map(plan => (
                        <div className="flex flex-col mb-3 border-b pb-2" key={plan.id}>
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              id={`plan-${plan.id}`}
                              checked={selectedPlanIds.includes(plan.id)}
                              onChange={(e) => handlePlanCheckboxChange(e, plan.id)}
                              className="mr-2"
                            />
                            <label htmlFor={`plan-${plan.id}`} className="font-medium">
                              {plan.time} Days - {plan.amount}
                            </label>
                          </div>
                          {plan.description && (
                            <div className="ml-6 mt-1 text-sm text-gray-600">
                              {plan.description}
                            </div>
                          )}
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-2 text-gray-500">No plans available</div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="is_active"
                  name="is_active"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                  className="mr-2"
                />
                <label htmlFor="is_active">Active</label>
              </div>

              {addPromocodeState.error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                  {addPromocodeState.error}
                </div>
              )}
            </div>

            <div className="mt-8">
              <Custombutton
                value="Create Promo Code"
                type="submit"
                textcolor="text-white"
                backgroundcolor="bg-[#27AE60]"
                extraStyle="w-full hover:bg-[#219652]"
                disabled={addPromocodeState.isLoading}
              />
            </div>
          </form>
        </div>

        <div className="flex-1 mt-6 lg:mt-0">
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Summary</h2>
            <div className="bg-[#E9FDEE] rounded-lg p-6">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Promo Title:</span>
                  <span className="font-medium">{formData.title || '_____'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Promo Code:</span>
                  <span className="font-medium">{formData.code || '_____'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Country:</span>
                  <span className="font-medium">
                    {formData.country_id ?
                      (countriesState.data?.find(c => c.id === parseInt(formData.country_id))?.name || formData.country_id)
                      : '_____'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Discount Type:</span>
                  <span className="font-medium">{formData.type === 'percentage' ? 'Percentage' : 'Fixed Amount'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Value:</span>
                  <span className="font-medium">
                    {formData.value ? (formData.type === 'percentage' ? `${formData.value}%` : `₦${formData.value}`) : '_____'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Active:</span>
                  <span className="font-medium">{formData.is_active ? 'Yes' : 'No'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Classes:</span>
                  <span className="font-medium">{selectedClassIds.length} selected</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Plans:</span>
                  <span className="font-medium">{selectedPlanIds.length} selected</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Start Date:</span>
                  <span className="font-medium">
                    {formData.start_date ? new Date(formData.start_date).toLocaleDateString() : '_____'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">End Date:</span>
                  <span className="font-medium">
                    {formData.end_date ? new Date(formData.end_date).toLocaleDateString() : '_____'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <SuccessModal
        isOpen={showSuccess}
        onClose={handleSuccessClose}
        type="success"
        title="Promo Code Created Successfully"
        message="Your promo code has been created successfully"
        buttonText="Go to Promo Codes"
      />
    </div>
  );
};

export default AddPromoCode;
