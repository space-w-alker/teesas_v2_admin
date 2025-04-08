import React, { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { TailSpin } from "react-loader-spinner"
import badgeIcon from "../../assets/images/Banner-icon.png";
import { useDispatch } from 'react-redux'
import { getCountryDetailsAsync } from '../../apis/slices/countrySlice'
import { toast } from "react-toastify"
import { FaChevronLeft } from "react-icons/fa"

const CountryDetails = ({ isOpen }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [searchParams] = useSearchParams()
  const countryId = searchParams.get('id')
  const [countryData, setCountryData] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (countryId) {
      fetchCountryDetails(countryId)
    } else {
      toast.error("Country ID is required")
      navigate('/Countries')
    }
  }, [countryId])

  const fetchCountryDetails = (id) => {
    setLoading(true)
    getCountryDetailsAsync({
      dispatch,
      id,
      token: localStorage.getItem("token"),
      callbackFn: (res) => {
        if (res?.data?.status === 200) {
          setCountryData(res?.data?.data?.country || null)
        } else {
          toast.error(res?.data?.message || "Failed to fetch country details")
          navigate('/Countries')
        }
        setLoading(false)
      }
    })
  }

  return (
    <div className={`py-[8rem] lg:px-[10rem] px-[10px] ${isOpen ? "ml-[240px]" : ""}`}>
      <div className="flex items-center gap-2 text-sm mb-6">
        <FaChevronLeft onClick={() => navigate('/country-list')} className="cursor-pointer" />
        <span className="text-gray-400">Home</span>
        <span className="text-gray-400">/</span>
        <span className="text-gray-400 cursor-pointer" onClick={() => navigate('/Countries')}>Countries</span>
        <span className="text-gray-400">/</span>
        <span className="text-gray-900 font-medium">Country Details</span>
      </div>

      {loading && (
        <div style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 9999,
        }}>
          <TailSpin color="green" radius={5} />
        </div>
      )}

      {countryData && (
        <>
          <div className="bg-[#EFF6F1] border rounded-lg mb-[10px] border-[#CAC4D0] h-[80px] p-[8px]">
            <div className="flex items-center gap-4">
              <div className="rounded-full text-center p-2 w-[40px] h-[40px] bg-[#F8F5ED]">
                {countryData.image ? (
                  <img
                    src={countryData.image}
                    alt={`${countryData.name} flag`}
                    className="w-full h-full object-contain rounded-full"
                  />
                ) : (
                  <img
                    src={badgeIcon}
                    alt="badge-icon"
                    className="w-[20px] h-[20px] object-contain"
                  />
                )}
              </div>
              <div className="">
                <p className="font-bold text-[16px] leading-[24px] tracking-wider text-[#1D2026]">
                  {countryData?.name}
                </p>
                <button className="w-[64px] h-[20px] rounded-full font-medium text-[13px] leading-[15px] mt-[4px] pt-[2px] text-white bg-[#08AA58]">
                  Active
                </button>
              </div>
            </div>
          </div>

          <div className="text-center mb-4">
            {/* <button
              className="font-medium text-[14px] leading-[20px] text-[#27AE60] cursor-pointer"
              onClick={() => navigate(`/Countries/Edit?id=${countryId}`)}
            >
              Manage
            </button> */}
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="border-b border-gray-200 pb-2 mb-4">
              <h3 className="text-lg font-bold text-gray-900">Country Details</h3>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="bg-white rounded-lg p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600">Country Code:</p>
                    <p className="font-medium">{countryData.code || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Region:</p>
                    <p className="font-medium">{countryData.region || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Dial Code:</p>
                    <p className="font-medium">{countryData.dial_code || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Emoji:</p>
                    <p className="font-medium">{countryData.emoji || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Symbol:</p>
                    <p className="font-medium">{countryData.symbol || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Price Rate:</p>
                    <p className="font-medium">{countryData.price_rate || 'N/A'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default CountryDetails
