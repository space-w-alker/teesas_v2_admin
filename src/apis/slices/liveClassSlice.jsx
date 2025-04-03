import { createSlice } from "@reduxjs/toolkit";
import { getAPICall, postAPICall, deleteAPICall, postFileAPICall } from "../client/methodCalls";
import { toast } from "react-toastify";

import { config } from "../client/config";

const {
  GET_LIVE_CLASSSES,
  GET_LIVE_CLASS,
  ADD_LIVE_CLASS,
  BASEURL,
  UPDATE_LIVE_CLASS,
  DELETE_LIVE_CLASS,
  RESERVE_LIVE_CLASS,
  GET_STUDENTS_LIVE_CLASS,
  GET_ADMIN_Subjects,
  GET_BANK_TRANSFER_DETAILS,
  ACCEPT_BANK_TRANSFER,
  REJECT_BANK_TRANSFER,
} = config;

export const liveClassSlice = createSlice({
  name: "liveClass",
  initialState: {
    getLiveClassesResponse: {
      response: {},
    },
    getLiveClassResponse: {
      response: {},
    },
    addLiveClassResponse: {
      response: {},
    },
    updateLiveClassResponse: {
      response: {},
    },
    deleteLiveClassResponse: {
      reaponse: {},
    },
    reserveLiveClassResponse: {
      reaponse: {},
    },
    getStudentsLiveClassesResponse: {
      response: {},
    },
    getSubjectsResponse: {
      response: {},
    },
    bulkUpload: {
      isLoading: false,
      data: null,
      success: false,
      error: null
    },
    bankTransferDetails: {
      isLoading: false,
      data: null,
      error: null
    }
  },
  reducers: {
    getLiveClasses: (state, action) => {
      state.getLiveClassesResponse = action.payload;
    },
    getLiveClass: (state, action) => {
      state.getLiveClassResponse = action.payload;
    },
    addLiveClass: (state, action) => {
      state.addLiveClassResponse = action.payload;
    },
    updateLiveClass: (state, action) => {
      state.updateLiveClassResponse = action.payload;
    },
    deleteLiveClass: (state, action) => {
      state.deleteLiveClassResponse = action.payload;
    },
    reserveLiveClass: (state, action) => {
      state.reserveLiveClassResponse = action.payload;
    },
    getStudentsLiveClasses: (state, action) => {
      state.getStudentsLiveClassesResponse = action.payload;
    },
    getSubjects: (state, action) => {
      state.getSubjectsResponse = action.payload;
    },
    setBankTransferDetails: (state, action) => {
      state.bankTransferDetails = action.payload;
    },
    reset: (state, action) => {
      state.getLiveClassesResponse = {
        reaponse: {},
      };
    },
    setBulkLiveClassUpload: (state, action) => {
      state.bulkUpload = action.payload;
    },
  },
});

export const getLiveClassesAsync = async ({
  dispatch,
  callbackFn,
  body,
  token,
}) => {
  try {
    const URL = `${BASEURL}${GET_LIVE_CLASSSES}`;
    const result = await postAPICall(URL, body, token).then((res) => {
      callbackFn && callbackFn(res);
      return res;
    });
    dispatch(getLiveClasses({ isLoading: false, response: result.data }));
  } catch (err) {
    dispatch(getLiveClasses({ isLoading: false }));
  }
};

export const getLiveClassAsync = async ({
  dispatch,
  callbackFn,
  data,
  token,
}) => {
  try {
    const URL = `${BASEURL}${GET_LIVE_CLASS}`;
    const result = getAPICall(URL, data, token).then((res) => {
      callbackFn && callbackFn(res);
      return res;
    });
    dispatch(getLiveClass({ isLoading: false, response: result.data }));
  } catch (err) {
    dispatch(getLiveClass({ isLoading: false }));
  }
};

export const getSubjectsAsync = async ({
  dispatch,
  callbackFn,
  data,
  token,
}) => {
  try {
    const URL = `${BASEURL}${GET_ADMIN_Subjects}/${data}`;
    const result = getAPICall(URL, {}, token).then((res) => {
      callbackFn && callbackFn(res);
      return res;
    });
    dispatch(getSubjects({ isLoading: false, response: result.data }));
  } catch (err) {
    dispatch(getSubjects({ isLoading: false }));
  }
};

export const addLiveClassAsync = async ({
  dispatch,
  body,
  callbackFn,
  token,
}) => {
  try {
    // dispatch(UserLogin({ isLoading: true }));
    const URL = `${BASEURL}${ADD_LIVE_CLASS}`;
    const result = await postAPICall(URL, body, true, token).then((res) => {
      callbackFn && callbackFn(res);
      return res;
    });
    dispatch(addLiveClass({ isLoading: false, response: result.data }));
  } catch (error) {
    dispatch(addLiveClass({ isLoading: false }));
  }
};

export const updateLiveClassAsync = async ({
  dispatch,
  body,
  callbackFn,
  token,
}) => {
  try {
    // dispatch(UserLogin({ isLoading: true }));
    const URL = `${BASEURL}${UPDATE_LIVE_CLASS}`;
    const result = await postAPICall(URL, body, true, token).then((res) => {
      callbackFn && callbackFn(res);
      return res;
    });
    dispatch(updateLiveClass({ isLoading: false, response: result.data }));
  } catch (error) {
    dispatch(updateLiveClass({ isLoading: false }));
  }
};

export const deleteLiveClassAsync = async ({
  dispatch,
  callbackFn,
  data,
  token,
}) => {
  try {
    // dispatch(UserLogin({ isLoading: true }));
    const URL = `${BASEURL}${DELETE_LIVE_CLASS}/${data?.id}`;
    const result = await deleteAPICall(URL, token).then((res) => {
      callbackFn && callbackFn(res);
      return res;
    });
    dispatch(deleteLiveClass({ isLoading: false, response: result.data }));
  } catch (error) {
    dispatch(deleteLiveClass({ isLoading: false }));
  }
};

export const reserveLiveClassAsync = async ({
  dispatch,
  body,
  callbackFn,
  token,
}) => {
  try {
    // dispatch(UserLogin({ isLoading: true }));
    const URL = `${BASEURL}${RESERVE_LIVE_CLASS}`;
    const result = await postAPICall(URL, body, true, token).then((res) => {
      callbackFn && callbackFn(res);
      return res;
    });
    dispatch(reserveLiveClass({ isLoading: false, response: result.data }));
  } catch (error) {
    dispatch(reserveLiveClass({ isLoading: false }));
  }
};

export const getStudentsLiveClassesAsync = async ({
  dispatch,
  callbackFn,
  data,
  token,
}) => {
  try {
    const URL = `${BASEURL}${GET_STUDENTS_LIVE_CLASS}`;
    const result = getAPICall(URL, data, token).then((res) => {
      callbackFn && callbackFn(res);
      return res;
    });
    dispatch(
      getStudentsLiveClasses({ isLoading: false, response: result.data })
    );
  } catch (err) {
    dispatch(getStudentsLiveClasses({ isLoading: false }));
  }
};

export const resetAsync = () => async (dispatch) => {
  dispatch(reset());
};

export const uploadBulkLiveClassesAsync = ({ file, classType, token, callbackFn }) => async (dispatch) => {
  try {
    dispatch(setBulkLiveClassUpload({ isLoading: true, data: null, success: false, error: null }));

    const formData = new FormData();
    formData.append('file', file);
    if (classType) {
      formData.append('class_type', classType);
    }

    const URL = `${BASEURL}live/create-live-classes-bulk`;
    const result = await postFileAPICall(URL, formData, token);

    if (result?.data?.status === 201 || result?.data?.status === 200) {
      dispatch(setBulkLiveClassUpload({
        isLoading: false,
        data: result.data,
        success: true,
        error: null
      }));
      callbackFn && callbackFn(result);
    } else {
      throw new Error(result?.data?.message || 'Failed to upload bulk live classes');
    }
  } catch (error) {
    dispatch(setBulkLiveClassUpload({
      isLoading: false,
      data: null,
      success: false,
      error: error.message || 'An error occurred during upload'
    }));
    callbackFn && callbackFn({ error });
  }
};

// Also add a reset function for the bulk upload state
export const resetBulkLiveClassUpload = () => (dispatch) => {
  dispatch(setBulkLiveClassUpload({
    isLoading: false,
    data: null,
    success: false,
    error: null
  }));
};

// Add this new async function to fetch bank transfer details
export const getBankTransferDetailsAsync = async ({
  dispatch,
  callbackFn,
  liveClassId,
  token,
}) => {
  try {
    dispatch(setBankTransferDetails({ isLoading: true, data: null, error: null }));
    const URL = `${BASEURL}${GET_BANK_TRANSFER_DETAILS}/${liveClassId}`;
    const result = await getAPICall(URL, {}, token);
    
    if (result?.data?.status === 200) {
      dispatch(setBankTransferDetails({ 
        isLoading: false, 
        data: result.data.data, 
        error: null 
      }));
    } else {
      dispatch(setBankTransferDetails({ 
        isLoading: false, 
        data: null, 
        error: result?.data?.message || "Failed to fetch bank transfer details" 
      }));
    }
    
    callbackFn && callbackFn(result);
    return result;
  } catch (err) {
    dispatch(setBankTransferDetails({ 
      isLoading: false, 
      data: null, 
      error: err.message || "An error occurred while fetching bank transfer details" 
    }));
    return { error: err };
  }
};

// Function to accept bank transfer
export const acceptBankTransferAsync = async ({
  dispatch,
  callbackFn,
  liveClassId,
  bankTransferId,
  token,
}) => {
  try {
    const URL = `${BASEURL}${ACCEPT_BANK_TRANSFER}`;
    const body = {
      live_class_id: liveClassId,
      bank_transfer_id: bankTransferId
    };
    
    const result = await postAPICall(URL, body, token);
    
    if (result?.data?.status === 200) {
      toast.success("Payment accepted successfully");
    } else {
      toast.error(result?.data?.message || "Failed to accept payment");
    }
    
    callbackFn && callbackFn(result);
    return result;
  } catch (err) {
    console.error("Error accepting bank transfer:", err);
    return { error: err };
  }
};

// Function to reject bank transfer
export const rejectBankTransferAsync = async ({
  dispatch,
  callbackFn,
  requestId,
  token,
}) => {
  try {
    const URL = `${BASEURL}${REJECT_BANK_TRANSFER}`;
    const body = {
      requestId: requestId
    };
    
    const result = await postAPICall(URL, body, token);
    
    if (result?.data?.status === 200) {
      toast.success("Payment rejected successfully");
    } else {
      toast.error(result?.data?.message || "Failed to reject payment");
    }
    
    callbackFn && callbackFn(result);
    return result;
  } catch (err) {
    console.error("Error rejecting bank transfer:", err);
    return { error: err };
  }
};

export const {
  getLiveClasses,
  getLiveClass,
  addLiveClass,
  updateLiveClass,
  deleteLiveClass,
  reserveLiveClass,
  getStudentsLiveClasses,
  getSubjects,
  setBankTransferDetails,
} = liveClassSlice.actions;

export const getLiveClassesResponse = (state) =>
  state.liveClass.getLiveClassesResponse;
export const getLiveClassResponse = (state) =>
  state.liveClass.getLiveClassResponse;
export const addLiveClassResponse = (state) =>
  state.liveClass.addLiveClassResponse;
export const selectBulkLiveClassUpload = (state) => state.liveClass.bulkUpload;
export const selectBankTransferDetails = (state) => state.liveClass.bankTransferDetails;

export default liveClassSlice.reducer;
