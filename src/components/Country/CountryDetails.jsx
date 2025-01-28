import React, { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { TailSpin } from "react-loader-spinner"
import badgeIcon from "../../assets/images/Banner-icon.png";

const CountryDetails = ({isOpen}) => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const countryId = searchParams.get('id')
  const [countryData, setCountryData] = useState({
    id: 1,
    name: "Nigeria",
    status: true,
    code: "NGA",
    capital: "Abuja",
    currency: "Nigerian Naira (NGN)",
    timezone: "WAT (UTC+1)",
    population: "206 million",
    official_language: "English",
    region: "West Africa",
    description: "Nigeria is a federal republic in West Africa..."
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [countryId])

  return (
    <div className={`py-[8rem] lg:px-[10rem] px-[10px] ${isOpen ? "ml-[240px]" : ""}`}>
      <div className="flex items-center gap-2 text-sm mb-6">
        <span className="text-gray-400">Home</span>
        <span className="text-gray-400">/</span>
        <span className="text-gray-400">Countries</span>
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
          <TailSpin color="orange" radius={5} />
        </div>
      )}
      
      <div className="bg-[#FFF9ED] border rounded-lg mb-[10px] border-[#CAC4D0] h-[80px] p-[8px]">
        <div className="flex items-center gap-4">
          <div className="rounded-full text-center p-2 w-[40px] h-[40px] bg-[#F8F5ED]">
           <img src={badgeIcon} alt="badge-icon" className="w-[20px] h-[20px] object-contain" />
          </div>
          <div className="">
            <p className="font-bold text-[16px] leading-[24px] tracking-wider text-[#1D2026]">
              {countryData?.name}
            </p>
            {countryData?.status ? (
              <button className="w-[64px] h-[20px] rounded-full font-medium text-[13px] leading-[15px] mt-[4px] pt-[2px] text-white bg-[#08AA58]">
                Active
              </button>
            ) : (
              <button className="w-[64px] h-[20px] rounded-full font-medium text-[13px] leading-[15px] mt-[4px] pt-[2px] text-white bg-[#aa0808]">
                Inactive
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="text-center mb-4">
        <button className="font-medium text-[14px] leading-[20px] text-[#F2994A] cursor-pointer">
          Mange
        </button>
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
                <p className="font-medium">{countryData.code}</p>
              </div>
              <div>
                <p className="text-gray-600">Capital City:</p>
                <p className="font-medium">{countryData.capital}</p>
              </div>
              <div>
                <p className="text-gray-600">Currency:</p>
                <p className="font-medium">{countryData.currency}</p>
              </div>
              <div>
                <p className="text-gray-600">Timezone:</p>
                <p className="font-medium">{countryData.timezone}</p>
              </div>
              <div>
                <p className="text-gray-600">Population:</p>
                <p className="font-medium">{countryData.population}</p>
              </div>
              <div>
                <p className="text-gray-600">Official Language:</p>
                <p className="font-medium">{countryData.official_language}</p>
              </div>
              <div>
                <p className="text-gray-600">Region:</p>
                <p className="font-medium">{countryData.region}</p>
              </div>
              <div className="col-span-2">
                <p className="text-gray-600">Description:</p>
                <p className="font-medium">{countryData.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CountryDetails
