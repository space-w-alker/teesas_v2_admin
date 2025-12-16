import React, { useState, useEffect } from 'react'
import NewRegistrationComponent from '../../../components/Core/Dashboard/Admin/NewRegistrationComponent'
import { useDispatch } from 'react-redux'
import { FaChevronLeft } from "react-icons/fa"
import { useParams, useNavigate } from 'react-router-dom'
import { TailSpin } from "react-loader-spinner"
import { getSignUpRegistrationByIdAsync, getSignUpRegistrationById } from '../../../apis/slices/signUpRegistrationSlice'

const NewRegistrationDetails = ({ isOpen }) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false)
  const [registrationData, setRegistrationData] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (id) {
      fetchRegistrationDetails()
    }
  }, [id])

  const fetchRegistrationDetails = () => {
    setLoading(true)
    dispatch(getSignUpRegistrationById({ isLoading: true }))

    getSignUpRegistrationByIdAsync({
      dispatch,
      registrationId: id,
      callbackFn: (res) => {
        setLoading(false)
        if (res?.data) {
          // Handle both direct data and nested data structure
          const data = res.data.data?.data || res.data.data || res.data
          setRegistrationData(data)
        } else {
          setError(res?.data?.message || "Failed to fetch registration details")
        }
      }
    })
  }

  const handleGoBack = () => {
    navigate('/new-registrations')
  }

  return (
    <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""}`}>
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

      <div className='flex justify-start items-center lg:gap-3 cursor-pointer' onClick={handleGoBack}>
        <FaChevronLeft />
        <div>
          <div className='font-normal text-[14px] lg:text-[16px] leading-[20px] text-[#B6B6B6]'>
            Home / New Registration /<span className='text-black font-medium'>Registration Details</span>
          </div>
        </div>
      </div>

      {error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-6">
          {error}
        </div>
      ) : (
        <>
          {registrationData && (
            <div className="bg-[#E9FDEE] border rounded-lg mt-7 mb-[20px] border-[#CAC4D0] p-4">
              <div className="flex items-start gap-4">
                <div className="w-[50px] h-[50px] rounded-full overflow-hidden bg-green-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-green-600 font-bold text-xl">
                    {registrationData?.name?.charAt(0)?.toUpperCase() || "N"}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <p className="font-bold text-[18px] leading-[24px] tracking-wider text-[#1D2026]">
                      {registrationData?.name || "Registration Details"}
                    </p>
                    {registrationData?.type && (
                      <span className="px-2 py-1 rounded text-xs bg-purple-100 text-purple-600 font-medium capitalize">
                        {registrationData.type}
                      </span>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
                    {registrationData?.email && (
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Email:</span>
                        <span>{registrationData.email}</span>
                      </div>
                    )}
                    {registrationData?.phoneNumber && (
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Phone:</span>
                        <span>{registrationData.phoneNumber}</span>
                      </div>
                    )}
                    {registrationData?.location && (
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Location:</span>
                        <span>{registrationData.location}</span>
                      </div>
                    )}
                    {registrationData?.createdAt && (
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Date:</span>
                        <span>{new Date(registrationData.createdAt).toLocaleString()}</span>
                      </div>
                    )}
                    {registrationData?.childrenCount !== null && (
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Children:</span>
                        <span>{registrationData.childrenCount}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          <NewRegistrationComponent registrationData={registrationData} />
        </>
      )}
    </div>
  )
}

export default NewRegistrationDetails

