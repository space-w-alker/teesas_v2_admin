import React from 'react'
import banner from "../../../../assets/images/Screenshot.png"

const BannerComponent = () => {
  return (
    <div>
     

      {/* Manage Button */}
      <div className="text-center mb-6">
        <button className="font-medium text-[14px] leading-[20px] text-[#27AE60]">
          Manage
        </button>
      </div>

      {/* Details Section */}
      <div className="bg-white rounded-xl shadow-sm p-6">
  <div className="border-b border-gray-200 pb-2 mb-4">
    <h3 className="text-lg font-bold text-gray-900">Details</h3>
  </div>
  <div className="bg-gray-50 rounded-lg p-4">
    <div className="bg-white rounded-lg p-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-gray-600">Title:</p>
          <p className="font-medium">Summer Sale Banner</p>
        </div>
        <div>
          <p className="text-gray-600">Type:</p>
          <p className="font-medium">Promotional</p>
        </div>
        <div className="col-span-2">
          <p className="text-gray-600">Description:</p>
          <p className="font-medium">
            Special summer sale promotion featuring exclusive discounts on all educational materials. Limited time offer for students and teachers.
          </p>
        </div>
      </div>
    </div>
  </div>
</div>

      {/* Image Section */}
      <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
        <div className="border-b border-gray-200 pb-2 mb-4">
          <h3 className="text-lg font-bold text-gray-900">Uploaded Image</h3>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="w-full h-48 rounded-lg overflow-hidden">
            <img 
              src={banner}
              alt="Banner Preview"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default BannerComponent
