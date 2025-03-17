import React, { useState, useEffect } from 'react'
import UserCard from '../common/UserCard'
import { FaChevronLeft } from "react-icons/fa"
import { useNavigate } from 'react-router-dom'
import { TailSpin } from "react-loader-spinner"
import CountriesTable from '../Core/Dashboard/Admin/CountriesTable'
import { useDispatch } from 'react-redux'
import { getCountriesAsync } from '../../apis/slices/countrySlice'

const CountryList = ({ isOpen }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [countryStats, setCountryStats] = useState({ total_countries: 0 })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchCountryStats()
  }, [])

  const fetchCountryStats = () => {
    setLoading(true)
    getCountriesAsync({
      dispatch,
      data: { page: 1, limit: 1 },
      token: localStorage.getItem("token"),
      callbackFn: (res) => {
        if (res?.data?.status === 200) {
          setCountryStats({
            total_countries: res?.data?.data?.pagination?.total || 0
          })
        }
        setLoading(false)
      }
    })
  }

  return (
    <div className={`py-[7rem] lg:px-[5rem] flex flex-col gap-2 px-[10px] ${isOpen ? "xl:ml-[260px]" : ""}`}>
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

      <div className='flex justify-start items-center lg:gap-3'>
        <FaChevronLeft onClick={() => navigate(-1)} className="cursor-pointer" />
        <div>
          <div className='font-normal text-[14px] lg:text-[16px] leading-[20px] text-[#B6B6B6]'>
            Home / <span className='text-black font-medium'>Countries</span>
          </div>
        </div>
      </div>

      <h2 className="mt-6 font-bold text-[22px] leading-[28px] text-[#2C2E32]">
        Countries
      </h2>

      <div className="mt-3">
        <UserCard
          label="Total Countries"
          height="h-[111px]"
          backgroundcolor="bg-[#FFFFFF]"
          value={countryStats.total_countries}
        />
      </div>

      <div className="flex justify-end mt-4">
        <button
          className="text-[14px] leading-[20px] text-center font-bold w-[181px] h-[40px] rounded-lg py-[7px] px-[12px] bg-[#27AE60] text-white"
          onClick={() => navigate('/Countries/AddCountry')}
        >
          + Add Country
        </button>
      </div>

      <CountriesTable />
    </div>
  )
}

export default CountryList
