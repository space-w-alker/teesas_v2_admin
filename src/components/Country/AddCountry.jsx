import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AddCountry = ({ isOpen }) => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    capital: '',
    currency: '',
    timezone: '',
    description: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div className={`py-[7rem] px-[5rem] ${isOpen ? "xl:ml-[260px]" : ""}`}>
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-400">Home</span>
          <span className="text-gray-400">/</span>
          <span className="text-gray-400">Countries</span>
          <span className="text-gray-400">/</span>
          <span className="text-gray-900 font-medium">Add Country</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2">
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Add Country</h1>
            <div className="h-[1px] w-full bg-black mb-8"></div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Country Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter country name"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Country Code</label>
                <input
                  type="text"
                  name="code"
                  value={formData.code}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter country code"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Capital City</label>
                <input
                  type="text"
                  name="capital"
                  value={formData.capital}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter capital city"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Currency</label>
                <input
                  type="text"
                  name="currency"
                  value={formData.currency}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter currency"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Timezone</label>
                <input
                  type="text"
                  name="timezone"
                  value={formData.timezone}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter timezone"
                />
              </div>

              <div className="space-y-2 col-span-2">
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full h-[calc(70vh-400px)] p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter country description"
                />
              </div>
            </div>
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
                <span className="text-gray-600">Capital:</span>
                <span>{formData.capital || 'Not set'}</span>
              </div>

              <div className="pt-6 mt-6 border-t">
                <button className="w-full py-3 bg-[#27AE60] text-white rounded-lg font-medium hover:bg-[#219652] transition-colors">
                  Create Country
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddCountry
