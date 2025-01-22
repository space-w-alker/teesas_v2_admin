import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AddBadge = ({ isOpen }) => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    image: '',
    title: '',
    type: '',
    description: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    setFormData(prev => ({
      ...prev,
      image: file
    }))
  }

  return (
    <div className={`py-[7rem] px-[5rem] ${isOpen ? "xl:ml-[260px]" : ""}`}>
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-400">Home</span>
          <span className="text-gray-400">/</span>
          <span className="text-gray-400">Badges</span>
          <span className="text-gray-400">/</span>
          <span className="text-gray-900 font-medium">Add Badge</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2">
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Add Badge</h1>
            <div className="h-[1px] w-full bg-black mb-8"></div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2 col-span-2">
                <label className="block text-sm font-medium text-gray-700">Badge Image</label>
                <input
                  type="file"
                  name="image"
                  onChange={handleImageChange}
                  accept="image/*"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter badge title"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Type</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Select type</option>
                  <option value="achievement">Achievement</option>
                  <option value="skill">Skill</option>
                  <option value="level">Level</option>
                </select>
              </div>

              <div className="space-y-2 col-span-2">
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full h-[calc(70vh-400px)] p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter badge description"
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
                <span className="text-gray-600">Title:</span>
                <span>{formData.title || 'Not set'}</span>
              </div>
              <div className="flex justify-between bg-green-100 p-4 rounded-lg">
                <span className="text-gray-600">Type:</span>
                <span>{formData.type || 'Not set'}</span>
              </div>

              <div className="pt-6 mt-6 border-t">
                <button className="w-full py-3 bg-[#27AE60] text-white rounded-lg font-medium hover:bg-[#219652] transition-colors">
                  Create Badge
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddBadge
