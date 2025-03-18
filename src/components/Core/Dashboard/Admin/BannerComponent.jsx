import React from 'react'
import defaultBanner from "../../../../assets/images/Screenshot.png"
import { config } from "../../../../apis/client/config";

const BannerComponent = ({ bannerData }) => {
  // If no banner data is provided, show loading or placeholder
  if (!bannerData) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6 text-center">
        <p className="text-gray-500">Loading banner details...</p>
      </div>
    )
  }

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
                <p className="font-medium">{bannerData.title}</p>
              </div>
              <div>
                <p className="text-gray-600">Route:</p>
                <p className="font-medium">{bannerData.route_path || "N/A"}</p>
              </div>
              <div className="col-span-2">
                <p className="text-gray-600">Description:</p>
                <p className="font-medium">
                  {bannerData.description || "No description available"}
                </p>
              </div>
              <div>
                <p className="text-gray-600">Created At:</p>
                <p className="font-medium">
                  {bannerData.created_at ? new Date(bannerData.created_at).toLocaleString() : "N/A"}
                </p>
              </div>
              <div>
                <p className="text-gray-600">Status:</p>
                <p className="font-medium">
                  <span className="inline-block px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                    {bannerData.status || "Active"}
                  </span>
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
              src={`${config.MainUrl}public/${bannerData.image_url}`}
              alt={bannerData.title || "Banner Preview"}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default BannerComponent
