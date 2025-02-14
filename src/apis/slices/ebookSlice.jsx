import { createSlice } from "@reduxjs/toolkit";
import { postAPICall, getAPICall, getViaPostAPICall } from "../client/methodCalls";
import { toast } from "react-toastify";
import { config } from "../client/config";

const { BASEURL } = config;

export const ebookSlice = createSlice({
  name: "ebook",
  initialState: {
    ebookDetails: {},
    addEbookResponse: {},
    ebookList: [],
    ebookdownloadedList: [],
    markDownloadResponse: {},
  },
  reducers: {
    getEbookDetailsSuccess: (state, action) => {
      state.ebookDetails = action.payload;
    },
    addEbookSuccess: (state, action) => {
      state.addEbookResponse = action.payload;
    },
    listEbooksSuccess: (state, action) => {
      state.ebookList = action.payload;
    },
    listDownloadedEbooksSuccess: (state, action) => {
      console.log(state.action);
      state.ebookdownloadedList = action.payload;
    },
    markDownloadSuccess: (state, action) => {
      state.markDownloadResponse = action.payload;
    },
    resetState: (state) => {
      state.ebookDetails = {};
      state.addEbookResponse = {};
      state.ebookList = [];
      state.markDownloadResponse = {};
    },
  },
});

// Thunk to fetch eBook details
export const getEbookDetailsAsync = ({ dispatch, id, token, callbackFn }) => {
  return async () => {
    try {
      const URL = `${BASEURL}ebook/details?id=${id}`;
      const response = await getAPICall(URL, {}, token);
      if (response?.data?.status === 200) {
        // callbackFn && callbackFn(response.data);
        dispatch(getEbookDetailsSuccess(response.data));
      } else {
        toast.error("Failed to fetch eBook details.");
      }
    } catch (error) {
      toast.error("Error fetching eBook details." + error);
    }
  };
};

// Thunk to add eBook
export const addEbookAsync = ({ dispatch, data, token, callbackFn }) => {
  return async () => {
    try {
      const URL = `${BASEURL}ebook/add`;
      const response = await postAPICall(URL, data, true, token);
      if (response?.data?.status === 200) {
        callbackFn && callbackFn(response.data);
        dispatch(addEbookSuccess(response.data));
      } else {
        toast.error("Failed to add eBook.");
      }
    } catch (error) {
      toast.error("Error adding eBook.");
    }
  };
};

// Thunk to list eBooks
export const listEbooksAsync = ({ dispatch, data, token, callbackFn }) => {
  return async () => {
    try {
      const URL = `${BASEURL}ebook/list`;
      console.log('t', data);
      const response = await getViaPostAPICall(URL, data, token);
      // console.log('ebook', response.data.data);
      if (response?.data?.status === 200) {
        // callbackFn && callbackFn(response.data);
        dispatch(listEbooksSuccess(response.data));
      } else {
        toast.error("Failed to fetch eBooks.");
      }
    } catch (error) {
      toast.error("Error fetching eBooks.");
    }
  };
};
export const listDownloadedEbooksAsync = ({ dispatch, data, token, callbackFn }) => {
  return async () => {
    try {
      const URL = `${BASEURL}ebook/list`;
      // console.log('t', data);
      const response = await getViaPostAPICall(URL, data, token);
      console.log('ebook download', response.data.status);
      if (response?.data?.status == 200) {
        // callbackFn && callbackFn(response.data);
        dispatch(listDownloadedEbooksSuccess(response.data));
      } else {
        toast.error("Failed to fetch eBooks.");
      }
    } catch (error) {
      toast.error("Error fetching eBooks.");
    }
  };
};

// Thunk to mark eBook as downloaded
export const markEbookDownloadAsync = ({ dispatch, ebookId, token, callbackFn }) => {
  return async () => {
    try {
      const URL = `${BASEURL}ebook/mark-download`;
      const response = await postAPICall(URL, { ebookId }, true, token);
      if (response?.data?.status === 200) {
        callbackFn && callbackFn(response.data);
        dispatch(markDownloadSuccess(response.data));
      } else {
        toast.error("Failed to mark eBook as downloaded.");
      }
    } catch (error) {
      toast.error("Error marking eBook as downloaded.");
    }
  };
};

export const { getEbookDetailsSuccess, addEbookSuccess, listEbooksSuccess, listDownloadedEbooksSuccess, markDownloadSuccess, resetState } = ebookSlice.actions;

export const ebookDetails = (state) => state.ebook.ebookDetails;
export const addEbookResponse = (state) => state.ebook.addEbookResponse;
export const ebookList = (state) => state.ebook.ebookList;
export const ebookdownloadedList = (state) => state.ebook.ebookdownloadedList;
export const markDownloadResponse = (state) => state.ebook.markDownloadResponse;

export default ebookSlice.reducer;
