import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Headers from '../common/Headers';
import Headcomponent from '../common/Headcomponent';
import SuccessModal from '../common/SuccessModal';
import { addBankAsync, updateBankAsync, getCountriesAsync } from '../../apis/slices/bankSlice';
import { FaUpload, FaTrash } from 'react-icons/fa';
import { config } from '../../apis/client/config';

const AddBank = ({ isOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [countries, setCountries] = useState([]);
  const [isLoadingCountries, setIsLoadingCountries] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [bankId, setBankId] = useState(null);
  const { BASEURL } = config;

  const [formData, setFormData] = useState({
    bank_name: '',
    account_number: '',
    bankcode: '',
    account_name: '',
    description: '',
    status: '1',
    country_id: '',
    icon: null
  });


  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');

    if (id && location.state?.bankData) {
      setIsEditMode(true);
      setBankId(id);

      const bankData = location.state.bankData;


      setFormData({
        bank_name: bankData.bank_name || '',
        account_number: bankData.account_number || '',
        bankcode: bankData.bankcode || '',
        account_name: bankData.account_name || '',
        description: bankData.description || '',
        status: bankData.status?.toString() || '1',
        country_id: bankData.country_id?.toString() || '',
        icon: null
      });

      if (bankData.icon) {
        setPreviewUrl(`${BASEURL}${bankData.icon}`);
      }
    }
  }, [location, BASEURL]);

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = () => {
    setIsLoadingCountries(true);
    const token = localStorage.getItem('token');

    getCountriesAsync({
      dispatch,
      token,
      callbackFn: (response) => {
        setIsLoadingCountries(false);
        if (response?.data?.status === 200) {
          // Access the countries array from the correct path
          const countriesArray = response?.data?.data?.countries || [];
          if (Array.isArray(countriesArray)) {
            setCountries(countriesArray);
          } else {
            console.error("Countries data is not an array:", countriesArray);
            setCountries([]);
          }
        } else {
          console.error("Error fetching countries:", response?.data?.message);
          setCountries([]);
        }
      }
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      setErrorMessage("File size exceeds 2MB limit");
      setShowError(true);
      return;
    }

    // Update formData with the file
    setFormData({
      ...formData,
      icon: file
    });

    setSelectedFile(file);

    // Create preview URL
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setFormData({
      ...formData,
      icon: null
    });
  };

  const handleSubmit = () => {
    setIsLoading(true);
    const token = localStorage.getItem('token');


    const bankData = new FormData();

    bankData.append('bank_name', formData.bank_name);
    bankData.append('account_number', formData.account_number);
    bankData.append('bankcode', formData.bankcode);
    bankData.append('account_name', formData.account_name);
    bankData.append('description', formData.description || '');
    bankData.append('status', formData.status);
    bankData.append('country_id', formData.country_id);


    if (formData.icon instanceof File) {
      bankData.append('icon', formData.icon);
    }


    if (isEditMode) {
      updateBankAsync({
        dispatch,
        bankId,
        bankData,
        token,
        callbackFn: (response) => {
          setIsLoading(false);
          if (response?.data?.status === 200) {
            setSuccessMessage("Bank updated successfully");
            setShowSuccess(true);
          } else {
            setErrorMessage(response?.data?.message || "Failed to update bank");
            setShowError(true);
          }
        }
      });
    } else {
      addBankAsync({
        dispatch,
        bankData,
        token,
        callbackFn: (response) => {
          setIsLoading(false);
          if (response?.data?.status === 200) {
            setSuccessMessage("Bank added successfully");
            setShowSuccess(true);
          } else {
            setErrorMessage("Failed to add bank");
            setShowError(true);
          }
        }
      });
    }
  };

  const handleClose = () => {
    setShowSuccess(false);
    setShowError(false);
    if (showSuccess) {
      navigate(-1);
    }
  };

  const validateForm = () => {
    return (
      formData.bank_name.trim() !== '' &&
      formData.account_number.trim() !== '' &&
      formData.bankcode.trim() !== '' &&
      formData.account_name.trim() !== '' &&
      formData.country_id.trim() !== ''
    );
  };


  const getCountryName = (id) => {
    if (!Array.isArray(countries)) return '-';
    const country = countries.find(c => c.id && c.id.toString() === id.toString());
    return country ? country.name : '-';
  };

  return (
    <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""} transition-all duration-300`}>
      <Headers value1="Home" value2="Payments" value3={isEditMode ? "Edit Bank Details" : "Add Bank Details"} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl p-8 mt-4 shadow-sm">
            <Headcomponent value={isEditMode ? "Edit Bank Details" : "Add Bank Details"} border="Border" showSearch={false} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-3">Bank Name*</label>
                <input
                  type="text"
                  name="bank_name"
                  value={formData.bank_name}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#27AE60]"
                  placeholder="Enter Bank Name"
                  required
                  onBlur={(e) => {
                    setFormData(prev => ({
                      ...prev,
                      bank_name: prev.bank_name.trim()
                    }));
                  }}
                />
              </div>

              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-3">Account Number*</label>
                <input
                  type="text"
                  name="account_number"
                  value={formData.account_number}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#27AE60]"
                  placeholder="Enter Account Number"
                  required
                />
              </div>

              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-3">Bank Code*</label>
                <input
                  type="text"
                  name="bankcode"
                  value={formData.bankcode}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#27AE60]"
                  placeholder="Enter Bank Code"
                  required
                />
              </div>

              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-3">Account Name*</label>
                <input
                  type="text"
                  name="account_name"
                  value={formData.account_name}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#27AE60]"
                  placeholder="Enter Account Name"
                  required
                />
              </div>

              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-3">Country*</label>
                {isLoadingCountries ? (
                  <div className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50">
                    Loading countries...
                  </div>
                ) : (
                  <select
                    name="country_id"
                    value={formData.country_id}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#27AE60]"
                    required
                  >
                    <option value="">Select Country</option>
                    {Array.isArray(countries) && countries.map(country => (
                      <option key={country.id} value={country.id}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-3">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#27AE60]"
                >
                  <option value="1">Active</option>
                  <option value="0">Inactive</option>
                </select>
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-3">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#27AE60] min-h-[100px]"
                  placeholder="Enter Description"
                ></textarea>
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-3">Bank Icon</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                  {previewUrl ? (
                    <div className="flex flex-col items-center">
                      <div className="relative w-32 h-32 mb-3">
                        <img
                          src={previewUrl}
                          alt="Preview"
                          className="w-full h-full object-contain rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={handleRemoveImage}
                          className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full w-6 h-6 flex items-center justify-center"
                        >
                          <FaTrash className="w-3 h-3" />
                        </button>
                      </div>
                      <p className="text-sm text-gray-500 truncate max-w-full">
                        {selectedFile?.name || "Current icon"}
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center p-6">
                      <FaUpload className="text-gray-400 w-10 h-10 mb-3" />
                      <p className="text-gray-500 mb-2">Upload bank logo image</p>
                      <p className="text-xs text-gray-400 mb-4">PNG, JPG, or JPEG up to 2MB</p>
                      <label className="bg-green-50 hover:bg-green-100 text-green-600 font-medium px-4 py-2 rounded-full cursor-pointer">
                        Select Image
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                      </label>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl p-8 mt-4 shadow-sm h-full">
            <Headcomponent value="Summary" border="Border" showSearch={false} />

            <div className="bg-[#E9FDEE] rounded-lg p-6 mt-6">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Bank Name:</span>
                  <span className="font-medium">{formData.bank_name || '-'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Account Number:</span>
                  <span className="font-medium">{formData.account_number || '-'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Bank Code:</span>
                  <span className="font-medium">{formData.bankcode || '-'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Account Name:</span>
                  <span className="font-medium">{formData.account_name || '-'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Country:</span>
                  <span className="font-medium">{getCountryName(formData.country_id)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className="font-medium">{formData.status === '1' ? 'Active' : 'Inactive'}</span>
                </div>
                {(selectedFile || previewUrl) && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Icon:</span>
                    <span className="font-medium truncate max-w-[120px]">
                      {selectedFile?.name || "Current icon"}
                    </span>
                  </div>
                )}
              </div>
            </div>
            <button
              onClick={handleSubmit}
              disabled={!validateForm() || isLoading}
              className={`w-full mt-8 px-6 py-3 ${validateForm() && !isLoading ? 'bg-[#27AE60] hover:bg-[#219652]' : 'bg-gray-300 cursor-not-allowed'} text-white rounded-lg font-medium transition-colors`}
            >
              {isLoading ? (isEditMode ? 'Updating...' : 'Adding...') : (isEditMode ? 'Update Bank' : 'Add Bank')}
            </button>
          </div>
        </div>
      </div>

      <SuccessModal
        isOpen={showSuccess}
        onClose={handleClose}
        type="success"
        title="Success"
        message={successMessage}
        buttonText="Close"
      />

      <SuccessModal
        isOpen={showError}
        onClose={handleClose}
        type="caution"
        title="Error"
        message={errorMessage}
        buttonText="Close"
      />
    </div>
  );
};

export default AddBank;
