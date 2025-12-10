import React, { useState, useEffect } from 'react'
import DemoRequestComponent from '../../../components/Core/Dashboard/Admin/DemoRequestComponent'
import { useDispatch } from 'react-redux'
import { FaChevronLeft } from "react-icons/fa"
import { useParams, useNavigate } from 'react-router-dom'
import { TailSpin } from "react-loader-spinner"
import { getDemoRequestByIdAsync, getDemoRequestById } from '../../../apis/slices/demoRequestSlice'

const DemoRequestDetails = ({ isOpen }) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false)
  const [requestData, setRequestData] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (id) {
      fetchRequestDetails()
    }
  }, [id])

  const fetchRequestDetails = () => {
    setLoading(true)
    dispatch(getDemoRequestById({ isLoading: true }))

    getDemoRequestByIdAsync({
      dispatch,
      requestId: id,
      callbackFn: (res) => {
        setLoading(false)
        if (res) {
          setRequestData(res.data)
        } else {
          setError(res?.data?.message || "Failed to fetch request details")
        }
      }
    })
  }

  const handleGoBack = () => {
    navigate('/demo-requests')
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
            Home / Demo Requests /<span className='text-black font-medium'>Request Details</span>
          </div>
        </div>
      </div>

      {error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-6">
          {error}
        </div>
      ) : (
        <>
          <div className="bg-[#E9FDEE] border rounded-lg mt-7 mb-[20px] border-[#CAC4D0] p-4">
            <div className="flex items-start gap-4">
              <div className="w-[50px] h-[50px] rounded-full overflow-hidden bg-green-100 flex items-center justify-center flex-shrink-0">
                <span className="text-green-600 font-bold text-xl">
                  {requestData?.schoolName?.charAt(0)?.toUpperCase() || "D"}
                </span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <p className="font-bold text-[18px] leading-[24px] tracking-wider text-[#1D2026]">
                    {requestData?.schoolName || "Request Details"}
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
                  {requestData?.requesterName && (
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Requester:</span>
                      <span>{requestData.requesterName}</span>
                    </div>
                  )}
                  {requestData?.email && (
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Email:</span>
                      <span>{requestData.email}</span>
                    </div>
                  )}
                  {requestData?.phoneNumber && (
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Phone:</span>
                      <span>{requestData.phoneNumber}</span>
                    </div>
                  )}
                  {requestData?.createdAt && (
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Date:</span>
                      <span>{new Date(requestData.createdAt).toLocaleString()}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <DemoRequestComponent requestData={requestData} />
        </>
      )}
    </div>
  )
}

export default DemoRequestDetails

