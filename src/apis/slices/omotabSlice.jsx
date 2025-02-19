import { createSlice } from "@reduxjs/toolkit";
import { postAPICall, getAPICall, getViaPostAPICall, deleteAPICall, putAPICall } from "../client/methodCalls";
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
      const response = await getViaPostAPICall(URL, data, true, token);
      // console.log('thunk', response);
      if (response?.data?.status === 200) {
        callbackFn && callbackFn(response.data);
        dispatch(getStoreListSuccess(response.data));
      } else {
        toast.error("Failed to fetch store list.");
      }
    } catch (error) {
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
      const URL = `${BASEURL}omotab/store`;
      const response = await postAPICall(URL, data, token);
      console.log('response', response);
      if (response?.data?.status === 200) {
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