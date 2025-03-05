import { createSlice } from "@reduxjs/toolkit";
import {
  getAPICall,
  postAPICall,
  postFileAPICall,
  deleteAPICall,
  putAPICall
} from "../client/methodCalls";
import { toast } from "react-toastify";

import { config } from "../client/config";

const {
  BASEURL,
  USERLOGIN,
  SIGNUP,
  VERFICATION,
  ChangeNewPassword,
  USER,
  GETUSER,
  ADDUSER,
  GETUSERSCSV,
  GET_COURSES,
  CHANGE_PASSWORD,
  UPLOAD_USERS,
  UPDATE_USER,
  GET_USER_BY_ID,
  VERIFY_CODE,
  SetNewPassword,
  RESET_PASSWORD, DELETE_USER
} = config;

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    loginResponse: {
      isLoading: false,
    },
    signupResponse: {
      isLoading: false,
    },
    changePasswordResponse: {
      isLoading: false,
    },
    verifyCodeResponse: {
      isLoading: false,
    },
    resetPassword: {
      isLoading: false,

    },
    // resetPasswordResponse: {
    //   isLoading: false,
    // },
    Verifyresponse: {
      isLoading: false,
    },
    Userresponse: {
      isLoading: false,
    },
    getuserresponse: {
      isLoading: false,
    },
    adduserresponse: {
      isLoading: false,
    },
    getUsersCsvResponse: {
      isLoading: false,
    },
    getCoursesResponse: {
      isLoading: false,
    },
    uploadUsersResponse: {
      isLoading: false,
    },
    updateUserResponse: {
      isLoading: false,
    },
    getUserByIdResponse: {
      isLoading: false,
    },
    deleteUserResponse: {
      isLoading: false,
    },
  },
  reducers: {
    login: (state, action) => {
      state.loginResponse = action.payload;
    },
    signup: (state, action) => {
      state.signupResponse = action.payload;
    },
    changePassword: (state, action) => {
      state.changePasswordResponse = action.payload;
    },
    verifyCode: (state, action) => {
      state.verifyCodeResponse = action.payload;
    },
    setNewPassword: (state, action) => {
      state.isLoading = action.payload.isLoading;
      state.response = action.payload.response;
    },

    setlogout: (state, action) => {
      state.isLoading = action.payload.isLoading;
      state.response = action.payload.response;
    },
    // resetPassword: (state, action) => {
    //   state.resetPasswordResponse = action.payload;
    // },
    verify: (state, action) => {
      state.Verifyresponse = action.payload;
    },

    user: (state, action) => {
      state.Userresponse = action.payload;
    },

    getuser: (state, action) => {
      state.getuserresponse = action.payload;
    },

    adduser: (state, action) => {
      state.adduserresponse = action.payload;
    },
    getUsersCsv: (state, action) => {
      state.getUsersCsvResponse = action.payload;
    },
    getCourses: (state, action) => {
      state.getCoursesResponse = action.payload;
    },
    uploadUsers: (state, action) => {
      state.uploadUsersResponse = action.payload;
    },
    updateUser: (state, action) => {
      state.updateUserResponse = action.payload;
    },
    getUserById: (state, action) => {
      state.getUserByIdResponse = action.payload;
    },
    deleteUser: (state, action) => {
      state.deleteUserResponse = action.payload;
    },

    reset: (state, action) => {
      state.loginResponse = {
        isLoading: false,
      };
    },

    // setLoading(state,value){
    //   state.loading=value.payload;
    // }
  },
});

// export const loginAsync = (params) => async (dispatch) => {

//   try {
//     dispatch(login({ isLoading: true }));
//     const result = await postAPICall(LOGIN, params);
//     dispatch(login({ isLoading: false, response: result.data }));
//   } catch (error) {
//     dispatch(login({ isLoading: false }));
//   }
// };

export const loginAsync = async ({ dispatch, body, callbackFn }) => {
  try {
    const URL = `${BASEURL}${USERLOGIN}`;
    const result = await postAPICall(URL, body);

    if (result?.data?.status === 200) {
      dispatch(login({ isLoading: false, response: result.data }));
      localStorage.setItem('authToken', result.data.data.token);
      localStorage.setItem('userRole', result.data.data.role);
      callbackFn(result);
    }
  } catch (error) {
    console.error('Login error:', error);
  }
};
export const signupAsync = async ({ dispatch, body, callbackFn }) => {
  try {
    const URL = `${BASEURL}${SIGNUP}`;
    const result = await postAPICall(URL, body);

    if (result?.data?.status === 200) {
      dispatch(signup({ isLoading: false, response: result.data }));
      callbackFn(result);
    } else {
      throw new Error(result?.data?.message || 'Signup failed');
    }
  } catch (error) {
    console.error('Signup error:', error);
    dispatch(signup({ isLoading: false, error: error.message }));
  }
};


export const changePasswordAsync = async ({ dispatch, body, token, callbackFn }) => {
  try {
    const URL = `${BASEURL}${ChangeNewPassword}`;
    const result = await putAPICall(URL, body, true, token).then((res) => {
      callbackFn && callbackFn(res);
      return res;
    });
    dispatch(changePassword({ isLoading: false, response: result.data }));
  } catch (error) {
    dispatch(changePassword({ isLoading: false }));
  }
};


export const verifyCodeAsync = async ({
  dispatch,
  body,
  callbackFn,
  token,
}) => {
  try {
    // dispatch(UserLogin({ isLoading: true }));
    const URL = `${BASEURL}${VERIFY_CODE}`;
    const result = await postAPICall(URL, body, true, token).then((res) => {
      callbackFn && callbackFn(res);
      return res;
    });
    dispatch(verifyCode({ isLoading: false, response: result.data }));
  } catch (error) {
    dispatch(verifyCode({ isLoading: false }));
  }
};
export const setNewPasswordAsync = async ({ dispatch, body, callbackFn }) => {
  try {
    const URL = `${BASEURL}${SetNewPassword}`;
    const result = await postAPICall(URL, body).then((res) => {
      callbackFn && callbackFn(res);
      return res;
    });
    dispatch(setNewPassword({ isLoading: false, response: result.data }));
  } catch (error) {
    dispatch(setNewPassword({ isLoading: false }));
  }
};

// export const resetPasswordAsync = async ({
//   dispatch,
//   body,
//   callbackFn,
//   token,
// }) => {
//   try {
//     // dispatch(UserLogin({ isLoading: true }));
//     const URL = `${BASEURL}${VERIFY_CODE}`;
//     const result = await postAPICall(URL, body, true, token).then((res) => {
//       callbackFn && callbackFn(res);
//       return res;
//     });
//     dispatch(resetPassword({ isLoading: false, response: result.data }));
//   } catch (error) {
//     dispatch(resetPassword({ isLoading: false }));
//   }
// };





export const verificationCodeAsync = async ({ dispatch, body, callbackFn }) => {
  try {
    const URL = `${BASEURL}${VERFICATION}`;
    const result = await postAPICall(URL, body).then((res) => {
      callbackFn && callbackFn(res);
      return res;
    });
    dispatch(verify({ isLoading: false, response: result.data }));
  } catch (error) {
    dispatch(verify({ isLoading: false }));
  }
};

export const userAsync = async ({ dispatch, callbackFn, data, token }) => {
  try {
    const URL = `${BASEURL}${USER}`;

    await getAPICall(URL, data, token).then((res) => {
      if (res?.data?.status === 200) {
        const data = res?.data;
        callbackFn && callbackFn(data);
        dispatch(user({ isLoading: false, response: result.data }));
      } else {
        toast.error(res?.data?.message);
      }
    });
  } catch (err) {
    dispatch(user({ isLoading: false }));
  }
};

export const getuserAsync = async ({ dispatch, body, callbackFn, token }) => {
  try {
    const URL = `${BASEURL}${GETUSER}`;
    const result = postAPICall(URL, body, true, token).then((res) => {
      callbackFn && callbackFn(res);
      return res;
    });
    dispatch(getuser({ isLoading: false, response: result.data }));
  } catch (err) {
    dispatch(getuser({ isLoading: false }));
  }
};

export const addUserAsync = async ({ dispatch, body, callbackFn, token }) => {
  try {
    // dispatch(UserLogin({ isLoading: true }));
    const URL = `${BASEURL}${ADDUSER}`;
    const result = await postFileAPICall(URL, body, token).then((res) => {
      callbackFn && callbackFn(res);
      return res;
    });
    dispatch(adduser({ isLoading: false, response: result.data }));
  } catch (error) {
    dispatch(adduser({ isLoading: false }));
  }
};
export const getUserCsvAsync = async ({
  dispatch,
  callbackFn,
  data,
  token,
}) => {
  try {
    const URL = `${BASEURL}${GETUSERSCSV}`;
    const result = getAPICall(URL, data, token).then((res) => {
      callbackFn && callbackFn(res);
      return res;
    });
    dispatch(getUsersCsv({ isLoading: false, response: result.data }));
  } catch (err) {
    dispatch(getUsersCsv({ isLoading: false }));
  }
};

export const getCoursesAsync = async ({
  dispatch,
  data,
  callbackFn,
  token,
}) => {
  try {
    const URL = `${BASEURL}${GET_COURSES}`;
    const result = getAPICall(URL, { course_type: "EDOBEST" }, token).then((res) => {
      callbackFn && callbackFn(res);
      return res;
    });
    dispatch(getCourses({ isLoading: false, response: result.data }));
  } catch (err) {
    dispatch(getCourses({ isLoading: false }));
  }
};

export const resetAsync = () => async (dispatch) => {
  dispatch(reset());
};

export const uploadUsersAsync = async ({
  dispatch,
  body,
  callbackFn,
  token,
}) => {
  try {
    // dispatch(UserLogin({ isLoading: true }));
    const URL = `${BASEURL}${UPLOAD_USERS}`;
    const result = await postFileAPICall(URL, body, token).then((res) => {
      callbackFn && callbackFn(res);
      return res;
    });
    dispatch(uploadUsers({ isLoading: false, response: result.data }));
  } catch (error) {
    dispatch(uploadUsers({ isLoading: false }));
  }
};

export const updateUserAsync = async ({
  dispatch,
  body,
  callbackFn,
  token,
}) => {
  try {
    // dispatch(UserLogin({ isLoading: true }));
    const URL = `${BASEURL}${UPDATE_USER}`;
    const result = await postFileAPICall(URL, body, token).then((res) => {
      callbackFn && callbackFn(res);
      return res;
    });
    dispatch(updateUser({ isLoading: false, response: result.data }));
  } catch (error) {
    dispatch(updateUser({ isLoading: false }));
  }
};

export const getUserByIdAsync = async ({
  dispatch,
  callbackFn,
  data,
  token,
}) => {
  try {
    const URL = `${BASEURL}${GET_USER_BY_ID}`;

    await getAPICall(URL, data, token).then((res) => {
      if (res?.data?.status === 200) {
        const data = res?.data;
        callbackFn && callbackFn(data);
        dispatch(getUserById({ isLoading: false, response: result.data }));
      } else {
        toast.error(res?.data?.message);
      }
    });
  } catch (err) {
    dispatch(getUserById({ isLoading: false }));
  }
};

export const deleteUserAsync = async ({
  dispatch,
  callbackFn,
  data,
  token,
}) => {
  try {
    const URL = `${BASEURL}${DELETE_USER}`;

    await deleteAPICall(URL, data, token).then((res) => {
      if (res?.data?.status === 200) {
        const data = res?.data;
        callbackFn && callbackFn(data);
        dispatch(deleteUser({ isLoading: false, response: result.data }));
      } else {
        toast.error(res?.data?.message);
      }
    });
  } catch (err) {
    dispatch(deleteUser({ isLoading: false }));
  }
};

export const {
  login,
  signup,
  reset,
  verify,
  setNewPassword,
  user,
  getuser,
  adduser,
  getUsersCsv,
  getCourses,
  changePassword,
  uploadUsers,
  updateUse,
  getUserById,
  resetPassword,
  verifyCode,
  deleteUser

} = authSlice.actions;
export const loginResponse = (state) => state.auth.loginResponse;
export const signupResponse = (state) => state.auth.signupResponse;
export const Verifyresponse = (state) => state.auth.Verifyresponse;
export const Userresponse = (state) => state.auth.Userresponse;
export const getUserresponse = (state) => state.auth.GetUserresponse;
export const adduserresponse = (state) => state.auth.adduserresponse;
export const getUsersCsvResponse = (state) => state.auth.getUsersCsvResponse;

export default authSlice.reducer;
