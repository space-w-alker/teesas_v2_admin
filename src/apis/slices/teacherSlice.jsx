import { createSlice } from "@reduxjs/toolkit";
import {
  getAPICall,
  postAPICall,
  postFileAPICall,
  deleteAPICall,
} from "../client/methodCalls";
import { toast } from "react-toastify";

import { config } from "../client/config";

const {
  GET_TEACHERS,
  GET_TEACHER_STATISTICS,
  UPDATE_TEACHER,
  BASEURL,
  ADD_TEACHER,
  GET_TEACHER_DETAILS,
  GET_LOCAL_GOV,
  GET_LIVE_CLASS_TEACHERS,
  UPDATE_WITHDRAW_REQUEST,
  GET_WITHDRAW_REQUEST,
} = config;

export const teacherSlice = createSlice({
  name: "teacher",
  initialState: {
    getTeachersResponse: {
      response: {},
    },
    getTeacherStatsResponse: {
      response: {},
    },
    updateTeacherResponse: {
      response: {},
    },
    addTeacherResponse: {
      response: {},
    },
    getTeacherDetailsResponse: {
      response: {},
    },
    getLocalGovResponse: {
      response: {},
    },
    getLiveClassTeachersResponse: {
      response: {},
    },
    deleteTeacherResponse: {
      response: {},
    },
    getWithdrawRequestResponse: {
      response: {},
    },
    updateWithdrawRequestResponse: {
      response: {},
    },
  },
  reducers: {
    getTeachers: (state, action) => {
      state.getTeachersResponse = action.payload;
    },
    getTeacherStats: (state, action) => {
      state.getTeacherStatsResponse = action.payload;
    },
    updateTeacher: (state, action) => {
      state.updateTeacherResponse = action.payload;
    },
    addTeacher: (state, action) => {
      state.addTeacherResponse = action.payload;
    },
    getTeacherDetails: (state, action) => {
      state.getTeacherDetailsResponse = action.payload;
    },
    getLocalGov: (state, action) => {
      state.getLocalGovResponse = action.payload;
    },
    getLiveClassTeachers: (state, action) => {
      state.getLiveClassTeachersResponse = action.payload;
    },
    deleteTeacher: (state, action) => {
      state.deleteTeacherResponse = action.payload;
    },
    getWithdrawRequest: (state, action) => {
      state.getWithdrawRequestResponse = action.payload;
    },
    updateWithdrawRequest: (state, action) => {
      state.updateWithdrawRequestResponse = action.payload;
    },

    reset: (state, action) => {
      state.getAdminRolesResponse = {
        isLoading: false,
      };
    },
  },
});

export const getTeachersAsync = async ({
  dispatch,
  callbackFn,
  data,
  token,
}) => {
  try {
    const URL = `${BASEURL}${GET_TEACHERS}`;
    const result = getAPICall(URL, data, token).then((res) => {
      callbackFn && callbackFn(res);
      return res;
    });
    dispatch(getTeachers({ isLoading: false, response: result.data }));
  } catch (err) {
    dispatch(getTeachers({ isLoading: false }));
  }
};

export const deleteTeacherAsync = async ({
  dispatch,
  callbackFn,
  id,
  token,
}) => {
  try {
    const URL = `${BASEURL}admin_teacher/${id}`;

    await deleteAPICall(URL, {}, token).then((res) => {
      if (res?.data?.status === 200) {
        const data = res?.data;
        callbackFn && callbackFn(data);
        dispatch(deleteTeacher({ isLoading: false, response: result.data }));
      } else {
        toast.error("Can not Delete Teacher Live class is Created");
      }
    });
  } catch (err) {
    dispatch(deleteTeacher({ isLoading: false }));
  }
};

export const getTeacherStatsAsync = async ({
  dispatch,
  callbackFn,
  data,
  token,
}) => {
  try {
    const URL = `${BASEURL}${GET_TEACHER_STATISTICS}`;
    const result = getAPICall(URL, data, token).then((res) => {
      callbackFn && callbackFn(res);
      return res;
    });
    dispatch(getTeacherStats({ isLoading: false, response: result.data }));
  } catch (err) {
    dispatch(getTeacherStats({ isLoading: false }));
  }
};

export const updateTeacherAsync = async ({
  dispatch,
  body,
  callbackFn,
  token,
}) => {
  try {
    // dispatch(UserLogin({ isLoading: true }));
    const URL = `${BASEURL}${UPDATE_TEACHER}`;
    const result = await postAPICall(URL, body, true, token).then((res) => {
      callbackFn && callbackFn(res);
      return res;
    });
    dispatch(updateTeacher({ isLoading: false, response: result.data }));
  } catch (error) {
    dispatch(updateTeacher({ isLoading: false }));
  }
};

export const getTeacherDetailsAsync = async ({
  dispatch,
  callbackFn,
  data,
  token,
}) => {
  try {
    const URL = `${BASEURL}${GET_TEACHER_DETAILS}`;
    const result = getAPICall(URL, data, token).then((res) => {
      callbackFn && callbackFn(res);
      return res;
    });
    dispatch(getTeacherDetails({ isLoading: false, response: result.data }));
  } catch (err) {
    dispatch(getTeacherDetails({ isLoading: false }));
  }
};

export const addTeacherAsync = async ({
  dispatch,
  body,
  callbackFn,
  token,
}) => {
  try {
    // dispatch(UserLogin({ isLoading: true }));
    const URL = `${BASEURL}${ADD_TEACHER}`;
    const result = await postAPICall(URL, body, token).then((res) => {
      callbackFn && callbackFn(res);
      return res;
    });
    dispatch(addTeacher({ isLoading: false, response: result.data }));
  } catch (error) {
    dispatch(addTeacher({ isLoading: false }));
  }
};

export const getLocalGovAsync = async ({
  dispatch,
  callbackFn,
  data,
  token,
}) => {
  try {
    const URL = `${BASEURL}${GET_LOCAL_GOV}`;
    const result = getAPICall(URL, data, token).then((res) => {
      callbackFn && callbackFn(res);
      return res;
    });
    dispatch(getLocalGov({ isLoading: false, response: result.data }));
  } catch (err) {
    dispatch(getLocalGov({ isLoading: false }));
  }
};

export const getLiveClassTeachersAsync = async ({
  dispatch,
  callbackFn,
  data,
  token,
}) => {
  try {
    const URL = `${BASEURL}${GET_LIVE_CLASS_TEACHERS}`;
    const result = getAPICall(URL, data, token).then((res) => {
      callbackFn && callbackFn(res);
      return res;
    });
    dispatch(getLiveClassTeachers({ isLoading: false, response: result.data }));
  } catch (err) {
    dispatch(getLiveClassTeachers({ isLoading: false }));
  }
};

export const getWithdrawRequestAsync = async ({
  dispatch,
  callbackFn,
  data,
  token,
}) => {
  try {
    const URL = `${BASEURL}${GET_WITHDRAW_REQUEST}`;
    const result = getAPICall(URL, data, token).then((res) => {
      callbackFn && callbackFn(res);
      return res;
    });
    dispatch(getWithdrawRequest({ isLoading: false, response: result.data }));
  } catch (err) {
    dispatch(getWithdrawRequest({ isLoading: false }));
  }
};

export const updateWithdrawRequestAsync = async ({
  dispatch,
  body,
  callbackFn,
  token,
}) => {
  try {
    // dispatch(UserLogin({ isLoading: true }));
    const URL = `${BASEURL}${UPDATE_WITHDRAW_REQUEST}`;
    const result = await postAPICall(URL, body, true, token).then((res) => {
      callbackFn && callbackFn(res);
      return res;
    });
    dispatch(
      updateWithdrawRequest({ isLoading: false, response: result.data })
    );
  } catch (error) {
    dispatch(updateWithdrawRequest({ isLoading: false }));
  }
};

export const resetAsync = () => async (dispatch) => {
  dispatch(reset());
};
export const {
  getTeachers,
  getTeacherStats,
  updateTeacher,
  addTeacher,
  getTeacherDetails,
  getLocalGov,
  getLiveClassTeachers,
  deleteTeacher,
  getWithdrawRequest,
  updateWithdrawRequest,
} = teacherSlice.actions;

export const getTeachersResponse = (state) => state.teacher.getTeachersResponse;

export default teacherSlice.reducer;
