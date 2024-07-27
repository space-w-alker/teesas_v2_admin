import { createSlice } from "@reduxjs/toolkit";
import { getAPICall, postAPICall,postFileAPICall } from "../client/methodCalls";
import { toast } from "react-toastify";

import { config } from "../client/config";

const {GET_ADMIN_ROLES, GET_ADMIN_ROLE_PERMISSION, UPDATE_ROLE_PERMISSION,BASEURL,ADD_ADMIN_USER,GET_ADMIN_USERS,GET_ADMIN_USER,GET_DASHBOARD  } = config;

export const adminSlice = createSlice({
  name: "admin",
  initialState: {
    getAdminRolesResponse: {
      response: {},
    },
    getAdminRolePermissionResponse: {
      response: {},
    },
    updateRolePermissionResponse: { 
      response:{},
    },
    addAdminUserResponse: {
      response: {},
    },
    getAdminUsersResponse: {
      reaponse: {},
    },
    getAdminUserResponse: {
      response: {},
    },
    getDashBoardResponse: {
      response: {},
    },
  },
  reducers: {
    getAdminRoles: (state, action) => {
      state.getAdminRolesResponse = action.payload;
    },
    getAdminRolePermission: (state, action) => {
      state.getAdminRolePermissionResponse = action.payload;
    },
    updateRolePermission: (state, action) => {
      state.updateRolePermissionResponse = action.payload;
    },
    GetLeaderBoard: (state, action) => {
      state.getLeaderBoardResponse = action.payload;
    },
    addAdminUser: (state, action) => {
      state.addAdminUserResponse = action.payload;
    },
    getAdminUsers: (state, action) => {
      state.getAdminUsersResponse = action.payload;
    },
    getAdminUser: (state, action) => {
      state.getAdminUserResponse = action.payload;
    },
    getDashBoard: (state, action) => {
      state.getDashBoardResponse = action.payload;
    },

    reset: (state, action) => {
      state.getAdminRolesResponse = {
        isLoading: false,
      };
    },
  },
});


export const getDashBoardAsync = async ({ dispatch, callbackFn, data, token }) => {
  try {
    const URL = `${BASEURL}${GET_DASHBOARD}`;
    const result = getAPICall(URL, data, token).then((res) => {
      callbackFn && callbackFn(res);
      return res;
    });
    dispatch(getDashBoard({ isLoading: false, response: result.data }));
  } catch (err) {
    dispatch(getDashBoard({ isLoading: false }));
  }
};

export const getAdminRolesAsync = async ({ dispatch, callbackFn, data, token }) => {
  try {
    const URL = `${BASEURL}${GET_ADMIN_ROLES}`;
    const result = getAPICall(URL, data, token).then((res) => {
      callbackFn && callbackFn(res);
      return res;
    });
    dispatch(getAdminRoles({ isLoading: false, response: result.data }));
  } catch (err) {
    dispatch(getAdminRoles({ isLoading: false }));
  }
};

export const getAdminRolePermissionAsync = async ({ dispatch, callbackFn, data, token }) => {
  try {
    const URL = `${BASEURL}${GET_ADMIN_ROLE_PERMISSION}`;
    const result = getAPICall(URL, data, token).then((res) => {
      callbackFn && callbackFn(res);
      return res;
    });
    dispatch(getAdminRolePermission({ isLoading: false, response: result.data }));
  } catch (err) {
    dispatch(getAdminRolePermission({ isLoading: false }));
  }
};

export const updateRolePermissionAsync = async ({ dispatch, body, callbackFn,token }) => {
  try {
    // dispatch(UserLogin({ isLoading: true }));
    const URL = `${BASEURL}${UPDATE_ROLE_PERMISSION}`;
    const result = await postAPICall(URL, body,true,token).then((res) => {
      callbackFn && callbackFn(res);
      return res;
    });
    dispatch(updateRolePermission({ isLoading: false, response: result.data }));
  } catch (error) {
    dispatch(updateRolePermission({ isLoading: false }));
  }
};

export const addAdminUserAsync = async ({ dispatch, body, callbackFn,token }) => {
    try {
      // dispatch(UserLogin({ isLoading: true }));
      const URL = `${BASEURL}${ADD_ADMIN_USER}`;
      const result = await postFileAPICall(URL, body,token).then((res) => {
        callbackFn && callbackFn(res);
        return res;
      });
      dispatch(addAdminUser({ isLoading: false, response: result.data }));
    } catch (error) {
      dispatch(addAdminUser({ isLoading: false }));
    }
  };
export const getAdminUsersAsync = async ({
  dispatch,
  data,
  token,
  callbackFn,
}) => {
  try {
    const URL = `${BASEURL}${GET_ADMIN_USERS}`;
    await getAPICall(URL, data, token).then((res) => {
      if (res?.data?.status === 200) {
        const data = res?.data;
        callbackFn && callbackFn(data);
        dispatch(getAdminUsers(data));
      } else {
        toast.error(res?.data?.message);
      }
    });
  } catch (error) {
    console.log( error);
  }
};



export const getAdminUserAsync = async ({
  dispatch,
  data,
  token,
  callbackFn,
}) => {
  try {
    const URL = `${BASEURL}${GET_ADMIN_USER}`;
    await getAPICall(URL, data, token).then((res) => {
      if (res?.data?.status === 200) {
        const data = res?.data;
        callbackFn && callbackFn(data);
        dispatch(getAdminUser(data));
      } else {
        toast.error(res?.data?.message);
      }
    });
  } catch (error) {
    console.log('error from get mock tests by subscription-->', error);
  }
};



export const resetAsync = () => async (dispatch) => {
  dispatch(reset());
};
export const { getAdminRoles, getAdminRolePermission,updateRolePermission, getAdminUsers,
    addAdminUser,
  getAdminUser, getDashBoard} =
  adminSlice.actions;
export const getAdminRolesResponse = (state) => state.admin.getAdminRolesResponse;
export const getAdminRolePermissionResponse = (state) => state.admin.getAdminRolePermissionResponse;
export const updateRolePermissionResponse = (state) => state.admin.updateRolePermissionResponse;

export default adminSlice.reducer;
