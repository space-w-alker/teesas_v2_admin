import React, { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import book from '../../assets/images/receip.png';
import productImage from '../../assets/images/productImage.png';
import { getStoreDetailsAsync } from '../../apis/slices/omotabSlice';
import { useDispatch, useSelector } from 'react-redux';

const StoreItemDetails = ({ isOpen }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { id } = useParams();

  // Get item details from location state
  const itemName = location.state?.name || 'Item Name';
  const itemPrice = location.state?.price || '₦0';
  const itemFeature = location.state?.extra || '';
  const itemId = location.state?.id || '';

  // Get store details from Redux state
  const listDetailsStore = useSelector((state) => state.omotab.storeDetails?.data?.omotabStore || {});

  useEffect(() => {
    if (itemId) {
      dispatch(getStoreDetailsAsync({ dispatch, id }));
    }
  }, [dispatch, itemId]); // Added itemId to dependencies

  console.log(listDetailsStore);

  return (
    <div className={`py-[7rem] lg:px-[5rem] px-[10px] ${isOpen ? "xl:ml-[260px]" : ""} transition-all duration-300`}>
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-400">Home</span>
          <span className="text-gray-400">/</span>
          <span className="text-gray-400">Store</span>
          <span className="text-gray-400">/</span>
          <span className="text-gray-900 font-medium">{itemName}</span>
        </div>
      </div>

      <div className="bg-[#E9FDEE] rounded-xl p-6 mb-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white rounded-lg">
            <img src={book} alt="product" className="w-8 h-8" />
          </div>
          <div className="flex flex-col">
            <h2 className="font-bold text-gray-900">{itemName}</h2>
            <span className="text-[#F2994A] font-bold mt-2">{itemPrice}</span>
          </div>
        </div>
      </div>

      <div className="flex justify-center mb-6">
        <button className="px-8 py-2 text-[#27AE60] font-medium">Edit Item</button>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="border-b border-gray-200 pb-2 mb-4">
          <h3 className="text-lg font-bold text-gray-900">Product Details</h3>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="bg-white rounded-lg p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">Product Name:</p>
                <p className="font-medium">{itemName}</p>
              </div>
              <div>
                <p className="text-gray-600">Plan:</p>
                <p className="font-medium">{listDetailsStore?.extra}</p>
              </div>
              <div>
                <p className="text-gray-600">Price:</p>
                <p className="font-medium text-[#F2994A]">{listDetailsStore.currency_code}{" "}{listDetailsStore.price}</p>
              </div>
              <div>
                <p className="text-gray-600">Quantity:</p>
                <p className="font-medium">{listDetailsStore.quantity ?? 0}</p>
              </div>
              <div>
                <p className="text-gray-600">Description:</p>
                <p className="font-medium">{listDetailsStore.descriptions}</p>
              </div>
              <div>
                <p className="text-gray-600">Status:</p>
                <p className={`font-medium ${listDetailsStore.status === 1 ? 'text-[#27AE60]' : 'text-red-500'}`}>
                  {listDetailsStore.status === 1 ? 'In Stock' : 'Out of Stock'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="border-b border-gray-200 pb-2 mb-4">
          <h3 className="text-lg font-bold text-gray-900">Product Images</h3>
        </div>
        <div className="space-y-4">
          <div className="p-4 border border-gray-200 rounded-lg">
            <img src={listDetailsStore.image} alt="product" className="w-full h-[400px] object-cover rounded" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreItemDetails;
