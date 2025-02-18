import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { createStoreAsync, updateStoreAsync, getStoreDetailsAsync } from "../../apis/slices/omotabSlice"
import { useLocation } from 'react-router-dom';


const AddStoreItem = () => {
  const location = useLocation();
  const { isOpen, isEdit, itemId } = location.state || {}; // Handle undefined state

  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [showSuccess, setShowSuccess] = useState(false);
  const isEditing = !!itemId;
  console.log(itemId)
  const [formData, setFormData] = useState({
    productName: '',
    plan: '',
    description: '',
    shortDescription: '',
    itemDetail: '',
    productionDescription: '',
    overview: '',
    shippingPolicy: '',
    price: '',
    quantity: '',
    color: '',
    image: '',
    currency_code: 'NGN'
  });
  const storeData = useSelector((state) => state.omotab.storeDetails?.data?.omotabStore || {});

  /// Fetch data if editing
  useEffect(() => {
    if (isEditing) {
      dispatch(getStoreDetailsAsync({ dispatch, id: itemId }))
        .then(response => {
          console.log('ormal', response)
          console.log('storeData', storeData)
          if (storeData) {
            setFormData({
              productName: storeData.title || '',
              plan: storeData.plan || '', // Check if `plan` exists in the response
              description: storeData.descriptions || '',
              shortDescription: storeData.short_description || '',
              itemDetail: storeData.item_detail || '',
              productionDescription: storeData.production_description || '',
              overview: storeData.overview || '',
              shippingPolicy: storeData.shipping_policy || '',
              price: storeData.price || '',
              quantity: storeData.quantity || '',
              color: storeData.color || '',
              image: storeData.image || '',
              currency_code: storeData.currency_code || 'NGN'
            });
          }
        })
        .catch(error => console.error("Error fetching store details:", error));
    }
  }, [itemId, dispatch, isEditing]);

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

  const handleSubmit = () => {
    const payload = {
      title: formData.productName,
      descriptions: formData.description,
      short_description: formData.shortDescription,
      production_description: formData.productionDescription,
      quantity: formData.quantity,
      item_detail: formData.itemDetail,
      color: formData.color,
      overview: formData.overview,
      shipping_policy: formData.shippingPolicy,
      image: formData.image,
      currency_code: formData.currency_code,
      price: parseFloat(formData.price) || 0,
      status: formData.status || '1',
      extra: formData.extra,
      feature: typeof formData.feature === "string" ? formData.feature.split(",") : formData.feature || []
    };

    if (isEditing) {
      dispatch(updateStoreAsync({ dispatch, id: itemId, data: payload }));
    } else {
      dispatch(createStoreAsync({ data: payload }));
    }

    setShowSuccess(true);
    navigate('/produuct-list');
  };


  return (
    <>
      <div className={`py-[7rem] px-[5rem] ${isOpen ? "xl:ml-[260px]" : ""}`}>
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-400">Home</span>
            <span className="text-gray-400">/</span>
            <span className="text-gray-400">Store</span>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">Add Store Item</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-2">
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Add Store Item</h1>
              <div className="h-[1px] w-full bg-black mb-8"></div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Product Name</label>
                  <input
                    type="text"
                    name="productName"
                    value={formData.productName}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter product name"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Select Plan</label>
                  <select
                    name="plan"
                    value={formData.plan}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">Select plan</option>
                    <option value="basic">Basic</option>
                    <option value="premium">Premium</option>
                  </select>
                </div>

                <div className="space-y-2 col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    rows="4"
                    placeholder="Enter description"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Short Description</label>
                  <input
                    type="text"
                    name="shortDescription"
                    value={formData.shortDescription}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Item Detail</label>
                  <input
                    type="text"
                    name="itemDetail"
                    value={formData.itemDetail}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div className="space-y-2 col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Production Description</label>
                  <textarea
                    name="productionDescription"
                    value={formData.productionDescription}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    rows="4"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Overview</label>
                  <textarea
                    name="overview"
                    value={formData.overview}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    rows="4"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Shipping Policy</label>
                  <textarea
                    name="shippingPolicy"
                    value={formData.shippingPolicy}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    rows="4"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Price</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Quantity</label>
                  <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div className="space-y-2 col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Select Color</label>
                  <select
                    name="color"
                    value={formData.color}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">Select color</option>
                    <option value="red">Red</option>
                    <option value="blue">Blue</option>
                    <option value="green">Green</option>
                    <option value="black">Black</option>
                    <option value="white">White</option>
                  </select>
                </div>

                <div className="space-y-2 col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Upload Image</label>
                  <div className="bg-green-50 p-8 rounded-lg text-center">
                    <input
                      type="file"
                      name="image"
                      onChange={handleImageChange}
                      accept="image/*"
                      className="w-full"
                    />
                    <p className="text-sm text-gray-500 mt-2">Upload product images (PNG, JPG, JPEG)</p>
                    <p className="text-sm text-gray-500">Maximum file size: 5MB</p>
                  </div>
                </div>


              </div>
            </div>
          </div>
          <div className="col-span-1">
            <h2 className="text-xl font-bold text-gray-900 mb-8">Summary</h2>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="bg-green-50 rounded-lg p-6">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Product Name:</span>
                    <span className="font-medium">{formData.productName || 'Not set'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Plan:</span>
                    <span className="font-medium">{formData.plan || 'Not set'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Description:</span>
                    <span className="font-medium">{formData.description || 'Not set'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Short Description:</span>
                    <span className="font-medium">{formData.shortDescription || 'Not set'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Item Detail:</span>
                    <span className="font-medium">{formData.itemDetail || 'Not set'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Production Description:</span>
                    <span className="font-medium">{formData.productionDescription || 'Not set'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Overview:</span>
                    <span className="font-medium">{formData.overview || 'Not set'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping Policy:</span>
                    <span className="font-medium">{formData.shippingPolicy || 'Not set'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Price:</span>
                    <span className="font-medium">₦{formData.price || 'Not set'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Quantity:</span>
                    <span className="font-medium">{formData.quantity || 'Not set'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Color:</span>
                    <span className="font-medium">{formData.color || 'Not set'}</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6">
                <button
                  onClick={handleSubmit}
                  className="w-full py-3 bg-[#27AE60] text-white rounded-lg font-medium hover:bg-[#219652] transition-colors"
                >
                  Add Store Item
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 text-center">
            <img src={success} alt="success" className="w-16 h-16 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-2 text-[#27AE60]">SUCCESS!</h2>
            <p className="text-xl text-gray-600 mb-6">Store Item Added Successfully</p>
            <button
              onClick={() => setShowSuccess(false)}
              className="px-6 py-2 bg-[#27AE60] text-white rounded-lg font-medium"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default AddStoreItem
