import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listAboutUsAsync, aboutUsList } from '../../apis/slices/cornerSlice';
import teesasLogo from '../../assets/images/Tessas.png';
import Headers from '../common/Headers';
import UserCard from '../common/UserCard';
import Headcomponent from '../common/Headcomponent';
import Custombutton from '../common/Custombutton';
import { FaEdit } from 'react-icons/fa';

const AboutUs = ({ isOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const aboutUsData = useSelector(aboutUsList);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    dispatch(listAboutUsAsync({
      dispatch,
      token: localStorage.getItem('authToken') || '',
      callbackFn: () => setLoading(false)
    }));
  }, [dispatch]);

  const handleEdit = () => {
    if (aboutUsData?.data) {
      navigate('/add-about-us', {
        state: {
          isEdit: true,
          aboutUsData: aboutUsData.data
        }
      });
    }
  };

  return (
    <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""} transition-all duration-300`}>
      <Headers
        value1="Home"
        value2="About Us"
      />

      <div className="bg-[#E9FDEE] rounded-xl p-6 mb-6 mt-6">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-sm">
            <img src={teesasLogo} alt="Teesas Logo" className="w-12 h-12 object-contain" />
          </div>
          <div className="flex flex-col">
            <Headcomponent
              value="About Us"
              showSearch={false}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-4 mt-4">
        {aboutUsData?.data ? (
          <Custombutton
            value="Manage"
            icon={<FaEdit className="mr-2" />}
            textcolor="text-green-600"
            backgroundcolor="hover:text-blue-700"
            onClick={handleEdit}
          />
        ) : (
          <Custombutton
            value="Add"
            textcolor="text-green-500"
            backgroundcolor="hover:text-green-700"
            onClick={() => navigate('/add-about-us')}
          />
        )}
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="border-b border-gray-200 pb-2 mb-4">
            <h3 className="text-lg font-bold text-gray-900">Our Story</h3>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="bg-white rounded-lg p-4">
              {aboutUsData?.data ? (
                <div className="mb-4">
                  <h4 className="text-md font-semibold text-gray-800">{aboutUsData.data.title}</h4>
                  <p className="text-gray-600 leading-relaxed">
                    {aboutUsData.data.description}
                  </p>
                  {aboutUsData.data.image && (
                    <img
                      src={aboutUsData.data.image}
                      alt={aboutUsData.data.title}
                      className="mt-4 max-w-full h-auto rounded-lg"
                    />
                  )}
                </div>
              ) : (
                <p className="text-gray-600 leading-relaxed">
                  No About Us information available. Click "Add" to create one.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutUs;
