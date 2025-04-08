import React, { useState, useEffect } from 'react'
import BannerComponent from '../Core/Dashboard/Admin/BannerComponent'
import { useDispatch } from 'react-redux'
import { FaChevronLeft } from "react-icons/fa"
import { useSearchParams, useNavigate } from 'react-router-dom'
import banner from '../../assets/images/Banner-icon.png'
import { TailSpin } from "react-loader-spinner"
import { getBannersAsync, getBanners } from '../../apis/slices/bannerSlice'

const BannerDetails = ({ isOpen }) => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const bannerId = searchParams.get('id')

  const [loading, setLoading] = useState(false)
  const [bannerData, setBannerData] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (bannerId) {
      fetchBannerDetails()
    }
  }, [bannerId])

  const fetchBannerDetails = () => {
    setLoading(true)
    dispatch(getBanners({ isLoading: true }))

    getBannersAsync({
      dispatch,
      callbackFn: (res) => {
        setLoading(false)
        if (res?.data?.status === 200) {
          // Find the specific banner by ID
          const banner = res.data.data.Banner.find(b => b.id === parseInt(bannerId) || b.id === bannerId)

          if (banner) {
            setBannerData(banner)
          } else {
            setError("Banner not found")
          }
        } else {
          setError(res?.data?.message || "Failed to fetch banner details")
        }
      },
      data: {
        id: bannerId
      }
    })
  }

  const handleGoBack = () => {
    navigate('/Banner')
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
            Home / Banners /<span className='text-black font-medium'>Banner Details</span>
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
              <div className="w-[40px] h-[40px] rounded-full overflow-hidden">
                <img src={banner} className="w-full h-full object-cover" alt="Banner preview" />
              </div>
              <div className="">
                <p className="font-bold text-[16px] leading-[24px] tracking-wider text-[#1D2026]">
                  {bannerData?.title || "Banner Details"}
                </p>
              </div>
            </div>
          </div>

          {/* Pass the banner data to the BannerComponent */}
          <BannerComponent bannerData={bannerData} />
        </>
      )}
    </div>
  )
}

export default BannerDetails
