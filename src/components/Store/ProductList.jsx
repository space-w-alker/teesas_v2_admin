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
import { deleteStoreAsync, listStoresAsync } from '../../apis/slices/omotabSlice'



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
  const listStore = useSelector((state) => state.omotab.storeList?.data?.omotabStore || []);

  const dispatch = useDispatch();
  const [sort, setSort] = useState({
    data: "",
    filterList: "",  // Filters applied
    sort: "",
    search: "",
    page: 1,
    limit: 10
  });
  useEffect(() => {
    dispatch(listStoresAsync({ dispatch, data: sort }));
  }, [sort]);

  console.log(listStore);
  const statsData = {
    total_products: 150,
    total_sales: "45,000",
    pending_orders: 12,
    delivered_orders: 89
  }

  const recentOrders = [
    {
      date: "2024-01-20",
      orders: [
        {
          id: 1,
          orderNumber: "ORD001",

          amount: "₦5,000",
          status: "pending"
        },
        {
          id: 2,
          orderNumber: "ORD002",

          amount: "₦3,500",
          status: "success"
        }
      ]
    }
  ]

  const storeItems = listStore.map(item => ({
    id: item.id,
    name: item.title,
    image: item.image,
    price: `${item.currency_code}${" "}${item.price}`
  }));

  const handleDelete = (id) => {
    dispatch(deleteStoreAsync({ dispatch, id }));
    dispatch(listStoresAsync({ dispatch, data: sort }));
  };

  return (
    <div className={`py-[7rem] lg:px-[5rem] flex flex-col gap-2 px-[10px] ${isOpen ? "xl:ml-[260px]" : ""}`}>
      {loading && (
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 9999 }}>
          <TailSpin color="orange" radius={5} />
        </div>
      )}

      <div className='flex justify-start items-center lg:gap-3'>
        <FaChevronLeft />
        <div className='font-normal text-[14px] lg:text-[16px] leading-[20px] text-[#B6B6B6]'>
          Home / <span className='text-black font-medium'>Store Overview</span>
        </div>
      </div>

      <h2 className="mt-6 mb-3 font-bold text-[22px] leading-[28px] text-[#2C2E32]">
        Store Overview
      </h2>



      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-2">
        <StatCard title="Total Products" count={statsData.total_products} />
        <StatCard title="Total Sales" count={statsData.total_sales} />
        <StatCard title="Pending Orders" count={statsData.pending_orders} />
        <StatCard title="Delivered Orders" count={statsData.delivered_orders} />

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
              />
              <img src={SearchButton} className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" alt="search" />
            </div>
            <img src={Vector} className="w-6 h-6 cursor-pointer" alt="filter" />
            <img src={container} className="w-6 h-6 cursor-pointer" alt="menu" />
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
                  onClick={() => navigate('/store/order-details/', {
                    state: {
                      orderNumber: order.orderNumber,
                      amount: order.amount,
                      status: order.status
                    }
                  })}
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-green-50 rounded-full">
                      <img src={book} className="w-8 h-8" alt="book" />
                    </div>
                    <div>
                      <p className="font-medium">Order #{order.orderNumber}</p>
                      <div className="flex gap-2 mt-2">
                        <span className={`px-3 py-1 rounded-full text-sm ${order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          order.status === 'success' ? 'bg-green-100 text-green-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="font-bold text-green-400">{order.amount}</p>
                </div>
              ))}
            </div>
          ))}
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
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">Store Items</h3>
          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search items..."
                className="pl-10 pr-4 py-2 border rounded-lg"
              />
              <img src={SearchButton} className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" alt="search" />
            </div>
            <img src={Vector} className="w-6 h-6 cursor-pointer" alt="filter" />
            <img src={container} className="w-6 h-6 cursor-pointer" alt="menu" />
          </div>
        </div>
        <div className="border-t pt-4 ">
          {storeItems.map(item => (
            <div
              key={item.id}
              className="flex items-center justify-between p-4 hover:shadow-lg hover:bg-green-50 transition-all duration-300 cursor-pointer"
            // onClick={() => navigate(`/store/item-details/${item.id}`, {
            //   state: {
            //     id: item.id,
            //     name: item.name,
            //     price: item.price,
            //     feauture: item.extra,

            //   }
            // })}
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
              {/* custon buttons */}
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
                    navigate('/add-store-item', {
                      state: {
                        isEdit: true,
                        itemData: {
                          name: listDetailsStore.title,
                          price: listDetailsStore.price,
                          description: listDetailsStore.descriptions,
                          image: listDetailsStore.image,
                          feature: listDetailsStore.feature,
                        },
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
    </div >
  )
}

export default ProductList
