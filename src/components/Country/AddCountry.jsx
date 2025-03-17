import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaChevronLeft } from "react-icons/fa"
import { useDispatch } from 'react-redux'
import { addCountryAsync } from '../../apis/slices/countrySlice'
import { TailSpin } from "react-loader-spinner"
import { toast } from "react-toastify"

const AddCountry = ({ isOpen }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    region: '',
    dial_code: '',
    emoji: '',
    symbol: '',
    price_rate: '',
    image: null
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({
        ...prev,
        image: e.target.files[0]
      }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Validate form
    if (!formData.name || !formData.code || !formData.region) {
      toast.error("Please fill in all required fields")
      return
    }

    setLoading(true)

    // Create FormData object for file upload
    const data = new FormData()
    data.append('name', formData.name)
    data.append('code', formData.code)
    data.append('region', formData.region)
    data.append('dial_code', formData.dial_code)
    data.append('emoji', formData.emoji)
    data.append('symbol', formData.symbol)
    data.append('price_rate', formData.price_rate)
    if (formData.image) {
      data.append('image', formData.image)
    }

    addCountryAsync({
      dispatch,
      data,
      token: localStorage.getItem("token"),
      callbackFn: (res) => {
        setLoading(false)
        if (res?.data?.status === 200) {
          toast.success(res?.data?.message || "Country added successfully")
          navigate('/country-list')
        } else {
          toast.error(res?.data?.message || "Failed to add country")
        }
      }
    })
  }

  return (
    <div className={`py-[7rem] px-[5rem] ${isOpen ? "xl:ml-[260px]" : ""}`}>
      {loading && (
        <div style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 9999,
        }}>
          <TailSpin color="orange" radius={5} />
        </div>
      )}

      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm">
          <FaChevronLeft onClick={() => navigate(-1)} className="cursor-pointer" />
          <span className="text-gray-400">Home</span>
          <span className="text-gray-400">/</span>
          <span className="text-gray-400 cursor-pointer" onClick={() => navigate('/Countries')}>Countries</span>
          <span className="text-gray-400">/</span>
          <span className="text-gray-900 font-medium">Add Country</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2">
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Add Country</h1>
            <div className="h-[1px] w-full bg-gray-200 mb-8"></div>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Country Name*</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter country name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Region*</label>
                  <input
                    type="text"
                    name="region"
                    value={formData.region}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter region"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Country Code*</label>
                  <input
                    type="text"
                    name="code"
                    value={formData.code}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter country code"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Dial Code</label>
                  <input
                    type="text"
                    name="dial_code"
                    value={formData.dial_code}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter dial code"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Emoji</label>
                  <input
                    type="text"
                    name="emoji"
                    value={formData.emoji}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter emoji"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Symbol</label>
                  <input
                    type="text"
                    name="symbol"
                    value={formData.symbol}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter currency symbol"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Price Rate</label>
                  <input
                    type="text"
                    name="price_rate"
                    value={formData.price_rate}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter price rate"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Country Flag</label>
                  <input
                    type="file"
                    name="image"
                    onChange={handleFileChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    accept="image/*"
                  />
                </div>
              </div>

              <div className="mt-8">
                <button
                  type="submit"
                  className="py-3 px-6 bg-[#27AE60] text-white rounded-lg font-medium hover:bg-[#219652] transition-colors"
                  disabled={loading}
                >
                  Create Country
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="col-span-1">
          <h2 className="text-xl font-bold text-gray-900 mb-8">Summary</h2>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="space-y-4">
              <div className="flex justify-between bg-green-100 p-4 rounded-lg">
                <span className="text-gray-600">Name:</span>
                <span>{formData.name || 'Not set'}</span>
              </div>
              <div className="flex justify-between bg-green-100 p-4 rounded-lg">
                <span className="text-gray-600">Code:</span>
                <span>{formData.code || 'Not set'}</span>
              </div>
              <div className="flex justify-between bg-green-100 p-4 rounded-lg">
                <span className="text-gray-600">Region:</span>
                <span>{formData.region || 'Not set'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddCountry
