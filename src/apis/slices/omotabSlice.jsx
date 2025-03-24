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
      console.log('response', response);
      if (response?.data?.data?.status === 200) {
        callbackFn && callbackFn(response);
        dispatch(addStoreSuccess(response));
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

export const { getStoreListSuccess, getStoreDetailsSuccess, addStoreSuccess, updateStoreSuccess, deleteStoreSuccess, resetState } = omotabSlice.actions;


export const storeList = (state) => state.omotab.storeList;
export const storeDetails = (state) => state.omotab.storeDetails;

export default omotabSlice.reducer;