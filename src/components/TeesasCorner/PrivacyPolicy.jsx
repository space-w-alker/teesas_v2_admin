import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listPrivacyPolicyAsync, privacyPolicyList } from '../../apis/slices/cornerSlice';
import teesasLogo from '../../assets/images/Tessas.png';
import Headers from '../common/Headers';
import Headcomponent from '../common/Headcomponent';
import Custombutton from '../common/Custombutton';

const PrivacyPolicy = ({ isOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const privacyPolicyData = useSelector(privacyPolicyList);
  // console.log('privacyPolicyData', privacyPolicyData);

  useEffect(() => {
    dispatch(listPrivacyPolicyAsync({ dispatch, token: '' }));
  }, [dispatch]);

  return (
    <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""} transition-all duration-300`}>
      <Headers
        value1="Home"
        value2="Privacy Policy"
      />

      <div className="bg-[#E9FDEE] rounded-xl p-6 mb-6 mt-6">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-sm">
            <img src={teesasLogo} alt="Teesas Logo" className="w-12 h-12 object-contain" />
          </div>
          <div className="flex flex-col">
            <Headcomponent
              value="Privacy Policy"
              showSearch={false}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-4">
        <Custombutton
          value="Manage"
          textcolor="text-green-400"
          backgroundcolor="hover:text-green-600"
          onClick={() => navigate('/add-privacy-policy')}
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="border-b border-gray-200 pb-2 mb-4">
          <h3 className="text-lg font-bold text-gray-900">Privacy Policy</h3>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="bg-white rounded-lg p-4">
            {privacyPolicyData?.data?.length > 0 ? (
              privacyPolicyData?.data?.map((item, index) => (
                <div key={index} className="mb-4">
                  <h4 className="text-lg font-bold text-gray-900">{item.title}</h4>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-600 leading-relaxed">
                No privacy policy information available.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
