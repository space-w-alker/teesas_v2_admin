import { createSlice } from "@reduxjs/toolkit";
import { getAPICall } from "../client/methodCalls";
import { config } from "../client/config";
import { toast } from "react-toastify";

const { BASEURL } = config;

const initialState = {
    isLoading: false,
    data: null,
    error: null,
    report: {
        isLoading: false,
        data: null,
        error: null
    },
    videoGrowth: {
        isLoading: false,
        data: null,
        error: null
    },
    subjects: {
        isLoading: false,
        data: null,
        error: null
    },
    adminReport: {
        isLoading: false,
        data: null,
        error: null
    }
};

export const performanceSlice = createSlice({
    name: "performance",
    initialState,
    reducers: {
        setPerformanceData: (state, action) => {
            state.isLoading = action.payload.isLoading;
            state.data = action.payload.data;
            state.error = action.payload.error;
        },
        setReportData: (state, action) => {
            state.report = action.payload;
        },
        setVideoGrowthData: (state, action) => {
            state.videoGrowth = action.payload;
        },
        setSubjectsData: (state, action) => {
            state.subjects = action.payload;
        },
        setAdminReportData: (state, action) => {
            state.adminReport = action.payload;
        }
    }
});

export const getSubjectsAsync = async ({ dispatch, callbackFn, data, token }) => {
  try {
    const URL = `${BASEURL}content/get-subjects-admin?class_id=${data.classId}&user_id=${data.userId}`;
    const result = await getAPICall(URL, {}, token);
    callbackFn && callbackFn(result);
  } catch (err) {
    callbackFn && callbackFn({ error: err });
  }
};

export const getAdminReportPerformanceAsync = async ({ dispatch, callbackFn, userId, token }) => {
  try {
    dispatch(setAdminReportData({ isLoading: true, data: null, error: null }));
    const URL = `${BASEURL}performance/get-report-performance-admin?user_id=${userId}`;
    const result = await getAPICall(URL, {}, token);
    
    if (result?.data?.status === 200) {
      dispatch(setAdminReportData({
        isLoading: false,
        data: result.data.data,
        error: null
      }));
      callbackFn && callbackFn(result);
    } else {
      throw new Error('Failed to fetch admin report performance data');
    }
  } catch (err) {
    dispatch(setAdminReportData({ isLoading: false, data: null, error: err.message }));
    callbackFn && callbackFn({ error: err });
  }
};

export const getPerformanceAsync = (userId, callback) => async (dispatch) => {
    try {
        dispatch(setPerformanceData({ isLoading: true, data: null, error: null }));
        const URL = `${BASEURL}performance/mock-practice-permonce?user_id=${userId}`;
        const result = await getAPICall(URL);
        console.log(result.data.data.mockPracticeTest);
        if (result?.data?.status === 200) {
            dispatch(setPerformanceData({
                isLoading: false,
                data: result.data.data.mockPracticeTest,
                error: null
            }));
            if (callback) callback(null, result.data.data.mockPracticeTest);
        } else {
            throw new Error('Failed to fetch performance data');
        }
    } catch (error) {
        dispatch(setPerformanceData({ isLoading: false, data: null, error: error.message }));
        if (callback) callback(error.message);
    }
};


export const getReportPerformanceAsync =
  (testAttemptId, callback) => async (dispatch) => {
    try {
      dispatch(setReportData({ isLoading: true, data: null, error: null }));
      const URL = `${BASEURL}performance/get-report-performance?test_attemt_id=${testAttemptId}`;
      const result = await getAPICall(URL);

      if (result?.data?.status === 200) {
        dispatch(
          setReportData({
            isLoading: false,
            data: result.data.data,
            error: null,
          })
        );
        if (callback) callback(null, result.data.data);
      } else {
        throw new Error("Failed to fetch report performance");
      }
    } catch (error) {
      dispatch(
        setReportData({ isLoading: false, data: null, error: error.message })
      );
      if (callback) callback(error.message);
    }
  };

export const getVideoGrowthAsync = (userId, year) => async (dispatch) => {
    try {
        dispatch(setVideoGrowthData({ isLoading: true, data: null, error: null }));
        const URL = `${BASEURL}performance/get-video-growth?user_id=${userId}&year=${year}`;
        const result = await getAPICall(URL);

        if (result?.data?.status === 200) {
            dispatch(setVideoGrowthData({
                isLoading: false,
                data: result.data.data,
                error: null
            }));
        } else {
            throw new Error('Failed to fetch video growth data');
        }
    } catch (error) {
        dispatch(setVideoGrowthData({ isLoading: false, data: null, error: error.message }));
    }
};

export const { 
    setPerformanceData, 
    setReportData, 
    setVideoGrowthData,
    setSubjectsData,
    setAdminReportData
} = performanceSlice.actions;

export const selectPerformance = (state) => state.performance;
export const selectReportData = (state) => state.performance.report;
export const selectVideoGrowthData = (state) => state.performance.videoGrowth;
export const selectSubjectsData = (state) => state.performance.subjects;
export const selectAdminReportData = (state) => state.performance.adminReport;

export default performanceSlice.reducer;