import React, { useEffect, useState } from 'react'
import UserCard from '../common/UserCard'
import { FaChevronLeft } from "react-icons/fa"
import { useNavigate } from 'react-router-dom'
import { TailSpin } from "react-loader-spinner"
import SearchButton from "../../assets/images/Searchbutton.png"
import Vector from "../../assets/images/Vector.png"
import container from "../../assets/images/container.png"
import book from '../../assets/images/receip.png'
import Custombutton from '../common/Custombutton'
import Reactangle from '../../assets/images/Rectangle copy.png'
import { useDispatch, useSelector } from 'react-redux'
import { deleteStoreAsync, listStoresAsync, getOrdersAsync, updateOrderDeliveryStatusAsync } from '../../apis/slices/omotabSlice'
import Headcomponent from '../common/Headcomponent';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { toast } from "react-toastify";

const StatCard = ({ title, count }) => (
  <div className="bg-white rounded-xl shadow-sm p-4">
    <div className="flex items-start gap-4">
      <div className="flex flex-col">
        <p className="text-gray-600 text-sm font-medium">{title}</p>
        <p className=" text-2xl mt-2 text-gray-900">{count}</p>
      </div>
    </div>
  </div>
);

const ProductList = ({ isOpen }) => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const listStore = useSelector((state) => state.omotab.storeList || []);
  const orders = useSelector((state) => state.omotab.orders || {});
  const updateOrderState = useSelector((state) => state.omotab.updateOrder || {});

  const dispatch = useDispatch();
  const [sort, setSort] = useState({
    data: "",
    filterList: "",  
    sort: "",
    search: "",
    page: 1,
    limit: 10
  });

  const [orderFilters, setOrderFilters] = useState({
    search: '',
    page: 1,
    limit: 10,
    status: ''
  });

  // Add state for status dropdown
  const [openStatusDropdown, setOpenStatusDropdown] = useState(null);
  const token = localStorage.getItem("authToken");

  // Add click outside handler to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (openStatusDropdown && !event.target.closest('.status-dropdown')) {
        setOpenStatusDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openStatusDropdown]);

  // Auto-reload functionality
  useEffect(() => {
    // Initial data load
    setLoading(true);
    dispatch(listStoresAsync({
      dispatch,
      data: sort,
      callbackFn: () => setLoading(false)
    }));
    
    dispatch(getOrdersAsync({
      dispatch,
      page: orderFilters.page,
      limit: orderFilters.limit,
      search: orderFilters.search,
      status: orderFilters.status
    }));
    
    // Set up auto-reload when returning to this page
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        setLoading(true);
        dispatch(listStoresAsync({
          dispatch,
          data: sort,
          callbackFn: () => setLoading(false)
        }));
        
        dispatch(getOrdersAsync({
          dispatch,
          page: orderFilters.page,
          limit: orderFilters.limit,
          search: orderFilters.search,
          status: orderFilters.status
        }));
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    setLoading(true);
    dispatch(listStoresAsync({
      dispatch,
      data: sort,
      callbackFn: () => setLoading(false)
    }));
  }, [sort]);

  useEffect(() => {
    dispatch(getOrdersAsync({
      dispatch,
      page: orderFilters.page,
      limit: orderFilters.limit,
      search: orderFilters.search,
      status: orderFilters.status
    }));
  }, [orderFilters]);

  const handleSearchChange = (e) => {
    setSort((prevSort) => ({
      ...prevSort,
      search: e.target.value,
      page: 1 // Reset to first page on new search
    }));
  };

  const handleOrderSearchChange = (e) => {
    setOrderFilters(prev => ({
      ...prev,
      search: e.target.value,
      page: 1
    }));
  };

  const statsData = orders?.data?.statistics || {
    totalProducts: 0,
    totalSales: 0,
    pendingOrders: 0,
    completedOrders: 0
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  const groupOrdersByDate = (orders) => {
    const grouped = {};
    orders?.forEach(order => {
      const date = formatDate(order.createdAt);
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push({
        id: order.id,
        orderNumber: order.id,
        amount: `₦${order.amount}`,
        status: order.status,
        image: order.omotab?.image
      });
    });
    return Object.entries(grouped).map(([date, orders]) => ({
      date,
      orders
    }));
  };

  const recentOrders = groupOrdersByDate(orders?.data?.orders || []);

  const storeItems = listStore?.data?.map(item => ({
    id: item.id,
    name: item.title,
    image: item.image,
    price: `${item.currency_code}${" "}${item.price}`
  }));

  const handleDelete = async (id) => {
    setLoading(true);
    await dispatch(deleteStoreAsync({ dispatch, id }));
    await dispatch(listStoresAsync({ dispatch, data: sort }));
    setLoading(false);
  };

  const totalPages = Math.ceil((listStore?.pagination?.total || 0) / sort.limit);
  const totalOrderPages = Math.ceil((orders?.data?.pagination?.total || 0) / orderFilters.limit);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setSort(prev => ({ ...prev, page: newPage }));
    }
  };

  const handleOrderPageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalOrderPages) {
      setOrderFilters(prev => ({ ...prev, page: newPage }));
    }
  };

  return (
    <div className={`py-[7rem] lg:px-[5rem] flex flex-col gap-2 px-[10px] ${isOpen ? "xl:ml-[260px]" : ""}`}>
      {loading && (
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 9999 }}>
          <TailSpin color="green" radius={5} />
        </div>
      )}

      <div className='flex justify-start items-center lg:gap-3'>
        <FaChevronLeft onClick={() => navigate(-1)} className="cursor-pointer" />
        <div className='font-normal text-[14px] lg:text-[16px] leading-[20px] text-[#B6B6B6]'>
          Home / <span className='text-black font-medium'>Store Overview</span>
        </div>
      </div>

      <h2 className="mt-6 mb-3 font-bold text-[22px] leading-[28px] text-[#2C2E32]">
        Store Overview
      </h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-2">
        <StatCard title="Total Products" count={statsData?.totalProducts} />
        <StatCard title="Total Sales" count={`₦${statsData?.totalSales}`} />
        <StatCard title="Pending Orders" count={statsData?.pendingOrders} />
        <StatCard title="Delivered Orders" count={statsData?.completedOrders} />
      </div>

      {/* Add Store Button */}
      <div className="flex justify-end mt-2">
        <button
          className="bg-green-500 text-white px-6 py-2 rounded-lg font-medium "
          onClick={() => navigate('/store/add')}
        >
          + Add Store
        </button>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl p-6 mt-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">Recent Orders</h3>
          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search orders..."
                className="pl-10 pr-4 py-2 border rounded-lg"
                value={orderFilters.search}
                onChange={handleOrderSearchChange}
              />
              <img src={SearchButton} className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" alt="search" />
            </div>
            <select
              className="border rounded-lg px-4 py-2"
              value={orderFilters.status}
              onChange={(e) => setOrderFilters(prev => ({ ...prev, status: e.target.value, page: 1 }))}
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="success">Success</option>
              <option value="failed">Failed</option>
            </select>
          </div>
        </div>

        <div className="border-t pt-4">
          {recentOrders.map(dateGroup => (
            <div key={dateGroup.date}>
              <h4 className="text-gray-600 mb-4">{dateGroup.date}</h4>
              {dateGroup.orders.map(order => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-4 hover:shadow-lg hover:bg-green-50 transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-center gap-4" onClick={() => navigate(`/store/order-details/${order.orderNumber}`, {
                    state: {
                      orderNumber: order.orderNumber,
                      amount: order.amount,
                      status: order.status
                    }
                  })}>
                    <div className="p-2 bg-green-50 rounded-full">
                      <img src={order.image || book} className="w-8 h-8" alt="book" />
                    </div>
                    <div>
                      <p className="font-medium">Order #{order.orderNumber}</p>
                    </div>
                  </div>

                  {/* Updated Status and Amount Display with Dropdown */}
                  <div className="flex items-center gap-6">
                    <div className="flex items-center relative status-dropdown">
                      <div
                        className={`px-4 py-1.5 rounded-full text-sm font-medium flex items-center gap-2 cursor-pointer transition-all duration-300 hover:shadow-md ${order.status === 'pending' ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200' :
                            order.status === 'success' || order.status === 'delivered' ? 'bg-green-100 text-green-800 hover:bg-green-200' :
                              'bg-red-100 text-red-800 hover:bg-red-200'
                          }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenStatusDropdown(openStatusDropdown === order.id ? null : order.id);
                        }}
                      >
                        <span className={`w-2 h-2 rounded-full ${order.status === 'pending' ? 'bg-yellow-500' :
                            order.status === 'success' || order.status === 'delivered' ? 'bg-green-500' :
                              'bg-red-500'
                          }`}></span>
                        <span className="capitalize">{order.status}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 transition-transform ${openStatusDropdown === order.id ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>

                      {/* Dropdown menu */}
                      {openStatusDropdown === order.id && (
                        <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
                          <div className="py-1">
                            <p className="px-4 py-2 text-xs text-gray-500 border-b">Update Status</p>
                            {['pending', 'confirmed', 'packed', 'out-for-delivery', 'delivered', 'cancelled'].map((status) => (
                              <button
                                key={status}
                                className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                                  order.status === status ? 'bg-gray-50 font-medium' : ''
                                }`}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  dispatch(updateOrderDeliveryStatusAsync({
                                    dispatch,
                                    orderId: order.id,
                                    status: status,
                                    token,
                                    callbackFn: () => {
                                      setOpenStatusDropdown(null);
                                      // Refresh orders after status update
                                      dispatch(getOrdersAsync({
                                        dispatch,
                                        page: orderFilters.page,
                                        limit: orderFilters.limit,
                                        search: orderFilters.search,
                                        status: orderFilters.status
                                      }));
                                    }
                                  }));
                                }}
                              >
                                <div className="flex items-center gap-2">
                                  <span className={`w-2 h-2 rounded-full ${
                                    status === 'pending' ? 'bg-yellow-500' :
                                    status === 'confirmed' ? 'bg-blue-500' :
                                    status === 'packed' ? 'bg-purple-500' :
                                    status === 'out-for-delivery' ? 'bg-indigo-500' :
                                    status === 'delivered' ? 'bg-green-500' :
                                    'bg-red-500'
                                  }`}></span>
                                  <span className="capitalize">{status.replace(/-/g, ' ')}</span>
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col items-end">
                      <p className="font-bold text-green-600 text-lg">{order.amount}</p>
                      <p className="text-xs text-gray-500">Paid amount</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Orders Pagination Controls */}
        <div className="user bg-white">
                   <Custombutton
            className={`px-3 py-1 rounded border ${orderFilters.page === 1 ? 'bg-gray-100 text-gray-400' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
            onClick={() => handleOrderPageChange(orderFilters.page - 1)}
            disabled={orderFilters.page === 1}
            value="Previous"
            icon={<FaArrowLeft />}
            backgroundcolor="bg-[#F2F2F2]"
            textcolor="text-[#000000]"
            imagePosition="left"
            width="w-[115px]"
          />
          <div className="text-sm text-gray-600">
            Showing {((orderFilters.page - 1) * orderFilters.limit) + 1} to {Math.min(orderFilters.page * orderFilters.limit, orders?.data?.pagination?.total || 0)} of {orders?.data?.pagination?.total || 0} orders
          </div>
          <Custombutton
            className={`px-3 py-1 rounded border ${orderFilters.page >= totalOrderPages ? 'bg-gray-100 text-gray-400' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
            onClick={() => handleOrderPageChange(orderFilters.page + 1)}
            disabled={orderFilters.page >= totalOrderPages}
            value="Next"
            icon={<FaArrowRight />}
            backgroundcolor="bg-[#F2F2F2]"
            textcolor="text-[#000000]"
            imagePosition="right"
          />
        </div>

        <div className="flex justify-center mt-6">
          <Custombutton
            value="View All"
            hidden="hidden"
            backgroundcolor="bg-[#F2F2F2]"
            textcolor="text-[#000000]"
            imagePosition="center"
          />
        </div>
      </div>

      {/* Store Items */}
      <div className="bg-white rounded-xl p-6 mt-6">
        <Headcomponent value="Store items" showSearch={true} showFilter={false}
          showMenu={false} onSearch={(e) => setSort((prevSort) => ({ ...prevSort, search: e }))} />

        <div className="border-t pt-4">
          {storeItems?.map(item => (
            <div
              key={item.id}
              className="flex items-center justify-between p-4 hover:shadow-lg hover:bg-green-50 transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="p-2 bg-green-50 rounded-full">
                  <img src={Reactangle} className="w-8 h-8" alt="book" />
                </div>
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-green-400 font-bold mt-2">{item.price}</p>
                </div>
              </div>
              <div className="flex gap-4 items-center mb-6">
                <Custombutton
                  value="View"
                  onClick={() => navigate(`/store/item-details/${item.id}`, {
                    state: {
                      id: item.id,
                      name: item.name,
                      price: item.price,
                      feauture: item.extra,
                    }
                  })}
                  textcolor="text-[#27AE60]"
                  backgroundcolor="bg-transparent"
                  extraStyle="font-medium"
                />
                <Custombutton
                  value="Edit"
                  onClick={() =>
                    navigate('/store/add', {
                      state: {
                        isEdit: true,
                        isOpen: true,
                        itemId: item.id,
                      },
                    })
                  }
                  textcolor="text-[#27AE60]"
                  backgroundcolor="bg-transparent"
                  extraStyle="font-medium"
                />
                <Custombutton
                  value="Delete"
                  onClick={() => handleDelete(item.id)}
                  textcolor="text-red-600"
                  backgroundcolor="bg-transparent"
                  extraStyle="font-medium"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Store Items Pagination Controls */}
        <div className="user bg-white">
          <Custombutton
            className={`px-3 py-1 rounded border ${sort.page === 1 ? 'bg-gray-100 text-gray-400' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
            onClick={() => handlePageChange(sort.page - 1)}
            disabled={sort.page === 1}
            value="Previous"
            icon={<FaArrowLeft />}
            backgroundcolor="bg-[#F2F2F2]"
            textcolor="text-[#000000]"
            imagePosition="left"
            width="w-[115px]"
          />
          <div className="text-sm text-gray-600">
            Showing {((sort.page - 1) * sort.limit) + 1} to {Math.min(sort.page * sort.limit, listStore?.pagination?.total || 0)} of {listStore?.pagination?.total || 0} entries
          </div>
          <Custombutton
            className={`px-3 py-1 rounded border ${sort.page >= totalPages ? 'bg-gray-100 text-gray-400' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
            onClick={() => handlePageChange(sort.page + 1)}
            disabled={sort.page >= totalPages}
            value="Next"
            icon={<FaArrowRight />}
            backgroundcolor="bg-[#F2F2F2]"
            textcolor="text-[#000000]"
            imagePosition="right"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductList;
