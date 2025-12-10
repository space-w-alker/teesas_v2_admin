import React, { useState, useEffect } from 'react'
import GeneralEnquiryComponent from '../../../components/Core/Dashboard/Admin/GeneralEnquiryComponent'
import { useDispatch } from 'react-redux'
import { FaChevronLeft } from "react-icons/fa"
import { useParams, useNavigate } from 'react-router-dom'
import { TailSpin } from "react-loader-spinner"
import { getEnquiryByIdAsync, getEnquiryById } from '../../../apis/slices/enquirySlice'

const GeneralEnquiryDetails = ({ isOpen }) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false)
  const [enquiryData, setEnquiryData] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (id) {
      fetchEnquiryDetails()
    }
  }, [id])

  const fetchEnquiryDetails = () => {
    setLoading(true)
    dispatch(getEnquiryById({ isLoading: true }))

    getEnquiryByIdAsync({
      dispatch,
      enquiryId: id,
      callbackFn: (res) => {
        setLoading(false)
        if (res?.data?.status === 200) {
          setEnquiryData(res.data.data)
        } else {
          setError(res?.data?.message || "Failed to fetch enquiry details")
        }
      }
    })
  }

  const handleGoBack = () => {
    navigate('/general-enquiries')
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
            Home / General Enquiries /<span className='text-black font-medium'>Enquiry Details</span>
          </div>
        </div>
      </div>

      {error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-6">
          {error}
        </div>
      ) : (
        <>
          <div className="bg-[#E9FDEE] border rounded-lg mt-7 mb-[20px] border-[#CAC4D0] h-[68px] p-[8px]">
            <div className="flex items-center gap-4">
              <div className="w-[40px] h-[40px] rounded-full overflow-hidden bg-green-100 flex items-center justify-center">
                <span className="text-green-600 font-bold text-lg">
                  {enquiryData?.name?.charAt(0)?.toUpperCase() || "E"}
                </span>
              </div>
              <div className="">
                <p className="font-bold text-[16px] leading-[24px] tracking-wider text-[#1D2026]">
                  {enquiryData?.name ? `${enquiryData.name} ${enquiryData.lastName || ''}` : "Enquiry Details"}
                </p>
              </div>
            </div>
          </div>

          <GeneralEnquiryComponent enquiryData={enquiryData} />
        </>
      )}
    </div>
  )
}

export default GeneralEnquiryDetails

