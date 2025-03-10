import { createSlice } from "@reduxjs/toolkit";
import { getAPICall, postAPICall } from "../client/methodCalls";
import { toast } from "react-toastify";

import { config } from "../client/config";

const { GETUSERSFEEDBACK, GETUSERFEEDBACK, REPLYFEEDBACK, BASEURL, GET_LEADERBOARD, GET_MONTHLY_POINTS, GET_LOCAL_SCHOOLS, GET_PERFORMANCE_HISTORY, GET_USER_PROFILE, GET_USER_FEEDBACKS_CSV } = config;

export const feedBackSlice = createSlice({
  name: "feedBack",
  initialState: {
    getUsersFeedbackResponse: {
      response: {},
    },
    getUserFeedbackResponse: {
      response: {},
    },
    replyFeedbaclResponse: {
      response: {},
    },
    getLocalSchoolsResponse: {
      response: {},
    },
    getUserProfileResponse: {
      reaponse: {},
    },
    getPerformanceHistoryResponse: {
      response: {},
    },
    getUserFeedBacksCsvResponse: {
      reaponse: {},
    },
    getMonthlyReportResponse: {
      reaponse: {},
    }


  },
  reducers: {
    getUsersFeedback: (state, action) => {
      state.getUsersFeedbackResponse = action.payload;
    },
    getUserFeedback: (state, action) => {
      state.getUserFeedbackResponse = action.payload;
    },
    replyFeedback: (state, action) => {
      state.replyFeedbaclResponse = action.payload;
    },
    GetLeaderBoard: (state, action) => {
      state.getLeaderBoardResponse = action.payload;
    },
    GetLocalSchools: (state, action) => {
      state.getLocalSchoolsResponse = action.payload;
    },
    GetUserProfile: (state, action) => {
      state.getUserProfileResponse = action.payload;
    },
    GetPerformanceHistory: (state, action) => {
      state.getPerformanceHistoryResponse = action.payload;
    },
    getUserFeedBacksCsv: (state, action) => {
      state.getUserFeedBacksCsvResponse = action.payload;
    },
    GetMonthlyReport: (state, action) => {
      state.getMonthlyReportResponse = action.payload;
    },

    reset: (state, action) => {
      state.getUsersFeedbackResponse = {
        isLoading: false,
      };
    },
  },
});



export const getUsersFeedbackAsync = async ({ dispatch, callbackFn, data, token }) => {
  try {
    const URL = `${BASEURL}${GETUSERSFEEDBACK}`;
    const result = postAPICall(URL, data, true, token).then((res) => {
      callbackFn && callbackFn(res);
      return res;
    });
    dispatch(getUsersFeedback({ isLoading: false, response: result.data }));
  } catch (err) {
    dispatch(getUsersFeedback({ isLoading: false }));
  }
};

export const getUserFeedbackAsync = async ({ dispatch, callbackFn, data, token }) => {
  try {
    const URL = `${BASEURL}${GETUSERFEEDBACK}`;
    const result = getAPICall(URL, data, token).then((res) => {
      callbackFn && callbackFn(res);
      return res;
    });
    dispatch(getUsersFeedback({ isLoading: false, response: result.data }));
  } catch (err) {
    dispatch(getUsersFeedback({ isLoading: false }));
  }
};

export const replyFeedbackAsync = async ({ dispatch, body, callbackFn, token }) => {
  try {
    // dispatch(UserLogin({ isLoading: true }));
    const URL = `${BASEURL}${REPLYFEEDBACK}`;
    const result = await postAPICall(URL, body, true, token).then((res) => {
      callbackFn && callbackFn(res);
      return res;
    });
    dispatch(replyFeedback({ isLoading: false, response: result.data }));
  } catch (error) {
    dispatch(replyFeedback({ isLoading: false }));
  }
};

export const GetLeaderBoardAsync = async ({
  dispatch,
  data,
  token,
  callbackFn,
}) => {
  try {
    const URL = `${BASEURL}${GET_LEADERBOARD}`;
    await postAPICall(URL, data, token).then((res) => {
      if (res?.data?.status === 200) {
        const data = res?.data;
        callbackFn && callbackFn(data);
        dispatch(GetLeaderBoard(data));
      } else {
        toast.error(res?.data?.message);
      }
    });
  } catch (error) {
    console.log('error from get mock tests by subscription-->', error);
  }
};


export const GetLocalSchoolsAsync = async ({
  dispatch,
  data,
  token,
  callbackFn,
}) => {
  try {
    const URL = `${BASEURL}${GET_LOCAL_SCHOOLS}`;
    await getAPICall(URL, data, token).then((res) => {
      if (res?.data?.status === 200) {
        const data = res?.data;
        callbackFn && callbackFn(data);
        dispatch(GetLocalSchools(data));
      } else {
        toast.error(res?.data?.message);
      }
    });
  } catch (error) {
    console.log('error from get mock tests by subscription-->', error);
  }
};


export const GetUserProfileAsync = async ({
  dispatch,
  data,
  token,
  callbackFn,
}) => {
  try {
    const URL = `${BASEURL}${GET_USER_PROFILE}`;
    await getAPICall(URL, data, token).then((res) => {
      if (res?.data?.status === 200) {
        const data = res?.data;
        callbackFn && callbackFn(data);
        dispatch(GetUserProfile(data));
      } else {
        toast.error(res?.data?.message);
      }
    });
  } catch (error) {
    console.log('error from get mock tests by subscription-->', error);
  }
};

export const GetPerformanceHistoryAsync = async ({
  dispatch,
  data,
  token,
  callbackFn,
}) => {
  try {
    const URL = `${BASEURL}${GET_PERFORMANCE_HISTORY}`;
    await getAPICall(URL, data, token).then((res) => {
      if (res?.data?.status === 200) {
        const data = res?.data;
        callbackFn && callbackFn(data);
        dispatch(GetPerformanceHistory(data));
      } else {
        toast.error(res?.data?.message);
      }
    });
  } catch (error) {
    console.log('error from get mock tests by subscription-->', error);
  }
};

export const GetMonthlyReportAsync = async ({
  dispatch,
  data,
  token,
  callbackFn,
}) => {
  try {
    const URL = `${BASEURL}${GET_MONTHLY_POINTS}`;
    await getAPICall(URL, data, token).then((res) => {
      if (res?.data?.status === 200) {
        const data = res?.data;
        callbackFn && callbackFn(data);
        dispatch(GetMonthlyReport(data));
      } else {
        toast.error(res?.data?.message);
      }
    });
  } catch (error) {
    console.log('error from get mock tests by subscription-->', error);
  }
};

export const getUserFeedBacksCsvAsync = async ({ dispatch, callbackFn, data, token }) => {
  try {
    const URL = `${BASEURL}${GET_USER_FEEDBACKS_CSV}`;
    const result = getAPICall(URL, data, token).then((res) => {
      callbackFn && callbackFn(res);
      return res;
    });
    dispatch(getUserFeedBacksCsv({ isLoading: false, response: result.data }));
  } catch (err) {
    dispatch(getUserFeedBacksCsv({ isLoading: false }));
  }
};

export const resetAsync = () => async (dispatch) => {
  dispatch(reset());
};
export const { getUsersFeedback, getUserFeedback, replyFeedback, GetLeaderBoard,
  GetLocalSchools,
  GetUserProfile,
  GetPerformanceHistory, getUserFeedBacksCsv, GetMonthlyReport } =
  feedBackSlice.actions;
export const getUsersFeedbackResponse = (state) => state.feedBack.getUsersFeedbackResponse;
export const getUserFeedbackResponse = (state) => state.feedBack.getUserFeedbackResponse;
export const replyFeedbaclResponse = (state) => state.feedBack.replyFeedbaclResponse;

export default feedBackSlice.reducer;
