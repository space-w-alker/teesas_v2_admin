import { createSlice } from "@reduxjs/toolkit";
import { postAPICall, getAPICall, getViaPostAPICall, deleteAPICall, putAPICall, postFileAPICall } from "../client/methodCalls";
import { toast } from "react-toastify";
import { config } from "../client/config";

const { BASEURL } = config;

export const omotabSlice = createSlice({
  name: "omotab",
  initialState: {
    storeList: [],
    storeDetails: {},
    orders: {
      isLoading: false,
      data: null,
      error: null
    },
    createOrder: {
      isLoading: false,
      success: false,
      error: null
    },
    updateOrder: {
      isLoading: false,
      success: false,
      error: null
    }
  },
  reducers: {
    getStoreListSuccess: (state, action) => {
      // Fix: Properly handle payload instead of ignoring first argument
      state.storeList = action.payload;
    },
    getStoreDetailsSuccess: (state, action) => {
      state.storeDetails = action.payload;
    },
    deleteStoreSuccess: (state, action) => {
      state.storeDetails = action.payload;
    },
    addStoreSuccess: (state, action) => {
      state.storeDetails = action.payload;
    },
    updateStoreSuccess: (state, action) => {
      state.storeDetails = action.payload;
    },
    resetState: (state) => {
      state.storeList = [];
      state.storeDetails = {};
    },
    setOrders: (state, action) => {
      state.orders = action.payload;
    },
    setCreateOrder: (state, action) => {
      state.createOrder = action.payload;
    },
    setUpdateOrder: (state, action) => {
      state.updateOrder = action.payload;
    }
  },
});

// Thunk to fetch store list
export const listStoresAsync = ({ dispatch, data, token, callbackFn }) => {
  return async () => {
    try {
      const URL = `${BASEURL}omotab/store-list`;

      // Build query params for pagination and search
      const queryParams = {
        page: data.page || 1,
        limit: data.limit || 10,
        search: data.search || '',
        ...data
      };

      const response = await getViaPostAPICall(URL, queryParams, true, token);

      if (response?.data?.status === 200) {
        // Fix: Get correct data path and dispatch only the data
        const storeData = response.data.data.omotabStore;
        console.log('Store data:', storeData); // Debug log

        if (callbackFn) {
          callbackFn(storeData);
        }

        // Fix: Remove empty first argument
        dispatch(getStoreListSuccess(storeData));
      } else {
        toast.error("Failed to fetch store list.");
      }
    } catch (error) {
      console.error('Store list fetch error:', error); // Debug log
      toast.error("Error fetching store list.");
    }
  };
};

// Thunk to fetch store details
export const getStoreDetailsAsync = ({ dispatch, id, token, callbackFn }) => {
  return async () => {
    try {
      const URL = `${BASEURL}omotab/store-list?id=${id}`;
      const response = await getAPICall(URL, {}, token);
      console.log('thunkd', response);
      if (response?.data?.status === 200) {
        callbackFn && callbackFn(response.data);
        dispatch(getStoreDetailsSuccess(response.data));
      } else {
        toast.error("Failed to fetch store details.");
      }
    } catch (error) {
      toast.error("Error fetching store details.");
    }
  };
};

// Thunk to create a store
export const createStoreAsync = ({ dispatch, data, token, callbackFn }) => {
  return async () => {
    try {
      const URL = `${BASEURL}omotab/admin-store`;
      const response = await postFileAPICall(URL, data, token);
      // console.log('response', response?.data?.status);
      if (response?.data?.status == 200) {
        callbackFn && callbackFn(response);
        // dispatch(addStoreSuccess(response));
        toast.success("Store created successfully.")
      } else {
        toast.error("Failed to create store.");
      }
    } catch (error) {
      toast.error("Error creating store.");
    }
  };
};

// Thunk to update a store
export const updateStoreAsync = ({ dispatch, id, data, token, callbackFn }) => {
  return async () => {
    try {
      const URL = `${BASEURL}omotab/update/${id}`;
      const response = await putAPICall(URL, data, token);
      if (response?.data?.status == 200) {
        callbackFn && callbackFn(response);
        dispatch(updateStoreSuccess(response));
        toast.success("Store updated successfully.");
      } else {
        toast.error("Failed to update store.");
      }
    } catch (error) {
      toast.error("Error updating store.");
    }
  };
};

// Thunk to delete a store
export const deleteStoreAsync = ({ dispatch, id, token, callbackFn }) => {
  return async () => {
    try {
      const URL = `${BASEURL}omotab/delete/${id}`;
      const response = await deleteAPICall(URL, token);
      console.log(response.data.status);
      if (response?.data?.status == 200) {
        // callbackFn && callbackFn(response);
        dispatch(deleteStoreSuccess(id));
        toast.success("Store deleted successfully.");
      } else {
        toast.error("Failed to delete store.");
      }
    } catch (error) {
      toast.error("Error deleting store.");
    }
  };
};

// Create new order
export const createOrderAsync = ({ dispatch, data, token }) => {
  return async () => {
    try {
      dispatch(setCreateOrder({ isLoading: true, success: false, error: null }));
      const URL = `${BASEURL}omotab/orders/create`;

      const response = await postAPICall(URL, data, token);

      if (response?.data?.status === 200) {
        dispatch(setCreateOrder({ isLoading: false, success: true, error: null }));
        toast.success("Order created successfully");
        return true;
      } else {
        throw new Error(response?.data?.message || "Failed to create order");
      }
    } catch (error) {
      dispatch(setCreateOrder({ isLoading: false, success: false, error: error.message }));
      toast.error(error.message || "Error creating order");
      return false;
    }
  };
};

// Get orders list with pagination and filters
export const getOrdersAsync = ({ dispatch, page = 1, limit = 10, search = '', status = '' }) => {
  return async () => {
    try {
      dispatch(setOrders({ isLoading: true, data: null, error: null }));

      let URL = `${BASEURL}omotab/orders/list?page=${page}&limit=${limit}`;
      if (search) URL += `&search=${encodeURIComponent(search)}`;
      if (status) URL += `&status=${encodeURIComponent(status)}`;

      const response = await getAPICall(URL);

      if (response?.data?.status === 200) {
        dispatch(setOrders({
          isLoading: false,
          data: response.data.data,
          error: null
        }));
      } else {
        throw new Error(response?.data?.message || "Failed to fetch orders");
      }
    } catch (error) {
      dispatch(setOrders({ isLoading: false, data: null, error: error.message }));
      toast.error(error.message || "Error fetching orders");
    }
  };
};

// Update order status
export const updateOrderStatusAsync = ({ dispatch, orderId, status, token }) => {
  return async () => {
    try {
      dispatch(setUpdateOrder({ isLoading: true, success: false, error: null }));
      const URL = `${BASEURL}omotab/orders/${orderId}/status`;

      const response = await putAPICall(URL, { status }, token);

      if (response?.data?.status === 200) {
        dispatch(setUpdateOrder({ isLoading: false, success: true, error: null }));
        toast.success("Order status updated successfully");
        return true;
      } else {
        throw new Error(response?.data?.message || "Failed to update order status");
      }
    } catch (error) {
      dispatch(setUpdateOrder({ isLoading: false, success: false, error: error.message }));
      toast.error(error.message || "Error updating order status");
      return false;
    }
  };
};

export const { getStoreListSuccess, getStoreDetailsSuccess, addStoreSuccess, updateStoreSuccess, deleteStoreSuccess, resetState, setOrders, setCreateOrder, setUpdateOrder } = omotabSlice.actions;

export const storeList = (state) => state.omotab.storeList;
export const storeDetails = (state) => state.omotab.storeDetails;
export const selectOrders = (state) => state.omotab.orders;
export const selectCreateOrder = (state) => state.omotab.createOrder;
export const selectUpdateOrder = (state) => state.omotab.updateOrder;

export default omotabSlice.reducer;