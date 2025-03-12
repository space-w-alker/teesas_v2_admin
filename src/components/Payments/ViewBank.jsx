import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Headers from '../common/Headers';
import Headcomponent from '../common/Headcomponent';
import Custombutton from '../common/Custombutton';
import { FaArrowLeft, FaEdit } from 'react-icons/fa';
import { config } from '../../apis/client/config';
import banklogo from '../../assets/images/banklogo.png';
import { getCountriesAsync } from '../../apis/slices/bankSlice';

const ViewBank = ({ isOpen }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const { id } = useParams();
    const { BASEURL } = config;
    const [countries, setCountries] = useState([]);
    const [isLoadingCountries, setIsLoadingCountries] = useState(false);

    // Get bank data from navigation state
    const bankData = location.state?.bankData || {};

    // Fetch countries when component mounts
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

    // Function to get country name from country ID
    const getCountryName = (countryId) => {
        if (!countryId || !Array.isArray(countries) || countries.length === 0) {
            return '-';
        }

        const country = countries.find(c => c.id && c.id.toString() === countryId.toString());
        return country ? country.name : '-';
    };

    return (
        <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""} transition-all duration-300`}>
            <Headers value1="Home" value2="Payments" value3="Bank Details" />

            <div className="bg-[#E9FDEE] rounded-lg p-6 mb-6 mt-6 shadow-sm">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden bg-white flex items-center justify-center border-2 border-green-100">
                        <img
                            src={bankData.icon ? `${BASEURL}${bankData.icon}` : banklogo}
                            alt={bankData.bank_name}
                            className="w-12 h-12 object-contain"
                            onError={(e) => { e.target.src = banklogo }}
                        />
                    </div>
                    <div className="flex-1">
                        <h2 className="text-2xl font-bold text-gray-800">{bankData.bank_name || '-'}</h2>
                        <div className="flex items-center gap-2 mt-1">
                            <span className={`px-2 py-0.5 text-xs rounded-full ${bankData.status === '1' || bankData.status === 1 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                {bankData.status === '1' || bankData.status === 1 ? 'Active' : 'Inactive'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Second box with remaining details */}
            <div className="bg-white rounded-lg shadow-sm p-6">
                <Headcomponent value="Bank Information" border="Border" showSearch={false} />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-sm font-medium text-gray-500">Account Name</h3>
                            <p className="text-base font-medium">{bankData.account_name || '-'}</p>
                        </div>

                        <div>
                            <h3 className="text-sm font-medium text-gray-500">Account Number</h3>
                            <p className="text-base font-medium">{bankData.account_number || '-'}</p>
                        </div>

                        <div>
                            <h3 className="text-sm font-medium text-gray-500">Bank Code</h3>
                            <p className="text-base font-medium">{bankData.bankcode || '-'}</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <h3 className="text-sm font-medium text-gray-500">Country</h3>
                            <p className="text-base font-medium">
                                {isLoadingCountries
                                    ? 'Loading...'
                                    : getCountryName(bankData.country_id)
                                }
                            </p>
                        </div>

                        <div>
                            <h3 className="text-sm font-medium text-gray-500">Created At</h3>
                            <p className="text-base font-medium">
                                {bankData.created_at ? new Date(bankData.created_at).toLocaleDateString() : '-'}
                            </p>
                        </div>

                        <div>
                            <h3 className="text-sm font-medium text-gray-500">Last Updated</h3>
                            <p className="text-base font-medium">
                                {bankData.updated_at ? new Date(bankData.updated_at).toLocaleDateString() : '-'}
                            </p>
                        </div>
                    </div>
                </div>

                {bankData.description && (
                    <div className="mt-6">
                        <h3 className="text-sm font-medium text-gray-500">Description</h3>
                        <p className="text-base mt-1 text-gray-700">{bankData.description}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ViewBank;
