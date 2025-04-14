import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Headers from '../common/Headers';
import Headcomponent from '../common/Headcomponent';
import Custombutton from '../common/Custombutton';
import { TailSpin } from "react-loader-spinner";
import { getParticipantDetailsAsync } from '../../apis/slices/learningCenterSlice';

const TutorialDetails = ({ isOpen }) => {
  const [loading, setLoading] = useState(false);
  const [participantData, setParticipantData] = useState(null);
  const [error, setError] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { participantId } = useParams();

  // Get participant ID from params or location state
  const id = participantId || location.state?.participant?.id;
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    if (id) {
      setLoading(true);
      getParticipantDetailsAsync({
        dispatch,
        participantId: id,
        token,
        callbackFn: (res) => {
          setLoading(false);
          if (res?.data?.status === 200) {
            setParticipantData(res.data.data);
          } else {
            setError(res?.data?.message || "Failed to fetch participant details");
          }
        }
      });
    }
  }, [dispatch, id, token]);

  // Format date to a readable format
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""} transition-all duration-300`}>
      {loading && (
        <div style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 9999,
        }}>
          <TailSpin color="green" radius={5} />
        </div>
      )}

      <Headers
        value1="Home"
        value2="Learning Center"
        value3={participantData?.course?.name || "Course"}
        value4="Participant Details"
      />

      <div className="mt-6 bg-[#E9FDEE] rounded-xl p-6 mb-6">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
            <span className="text-blue-600 font-medium">
              {participantData?.first_name ? participantData.first_name[0].toUpperCase() : 'P'}
            </span>
          </div>
          <div className="flex flex-col">
            <h2 className="font-bold text-gray-900">
              {participantData ? `${participantData.first_name} ${participantData.middle_name ? participantData.middle_name + ' ' : ''}${participantData.last_name}` : 'Participant Name'}
            </h2>
            <Custombutton
              value={participantData?.status || "Status"}
              textcolor={participantData?.status === 'PAID' ? 'text-green-600' : 'text-red-600'}
              backgroundcolor={participantData?.status === 'PAID' ? 'bg-green-100' : 'bg-red-100'}
              extraStyle="mt-2 w-fit rounded-full px-4 py-1"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-center mb-6">
        <Custombutton
          value="Back to Participants"
          onClick={() => navigate(-1)}
          textcolor="text-[#27AE60]"
          backgroundcolor="bg-transparent"
          extraStyle="font-medium"
        />
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
          {error}
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="border-b border-gray-200 pb-2 mb-4">
          <Headcomponent value="Participant Details" showSearch={false} />
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="bg-white rounded-lg p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">Full Name:</p>
                <p className="font-medium">
                  {participantData ? `${participantData.first_name} ${participantData.middle_name ? participantData.middle_name + ' ' : ''}${participantData.last_name}` : 'N/A'}
                </p>
              </div>
              <div>
                <p className="text-gray-600">Email:</p>
                <p className="font-medium">{participantData?.email || 'N/A'}</p>
              </div>
              <div>
                <p className="text-gray-600">Phone Number:</p>
                <p className="font-medium">{participantData?.phone_number || 'N/A'}</p>
              </div>
              <div>
                <p className="text-gray-600">Gender:</p>
                <p className="font-medium">{participantData?.gender ? participantData.gender.charAt(0).toUpperCase() + participantData.gender.slice(1) : 'N/A'}</p>
              </div>
              <div>
                <p className="text-gray-600">Date of Birth:</p>
                <p className="font-medium">{participantData?.date_of_birth ? formatDate(participantData.date_of_birth) : 'N/A'}</p>
              </div>
              <div>
                <p className="text-gray-600">Address:</p>
                <p className="font-medium">{participantData?.address || 'N/A'}</p>
              </div>
              <div>
                <p className="text-gray-600">Course:</p>
                <p className="font-medium">{participantData?.course?.name || 'N/A'}</p>
              </div>
              <div>
                <p className="text-gray-600">Registration Date:</p>
                <p className="font-medium">{participantData?.registration_date ? formatDate(participantData.registration_date) : 'N/A'}</p>
              </div>
              <div>
                <p className="text-gray-600">Payment Status:</p>
                <p className="font-medium">
                  <span className={`px-2 py-1 rounded-full text-sm ${participantData?.status === 'PAID' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {participantData?.status || 'N/A'}
                  </span>
                </p>
              </div>
              <div>
                <p className="text-gray-600">Referral Code:</p>
                <p className="font-medium">{participantData?.referral_code || 'N/A'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorialDetails;
