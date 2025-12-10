import { createSlice } from "@reduxjs/toolkit";
import { getAPICall } from "../client/methodCalls";
import { config } from "../client/config";

const { BASEURL, GET_DEMO_REQUESTS, GET_DEMO_REQUEST_BY_ID } = config;

export const demoRequestSlice = createSlice({
    name: "demoRequest",
    initialState: {
        getDemoRequestsResponse: {
            response: {},
            isLoading: false,
        },
        getDemoRequestByIdResponse: {
            response: {},
            isLoading: false,
        },
    },
    reducers: {
        getDemoRequests: (state, action) => {
            state.getDemoRequestsResponse = action.payload;
        },
        getDemoRequestById: (state, action) => {
            state.getDemoRequestByIdResponse = action.payload;
        },
        reset: (state) => {
            state.getDemoRequestsResponse = {
                response: {},
                isLoading: false,
            };
        }
    }
});

// Get all demo requests with pagination
export const getDemoRequestsAsync = async ({ dispatch, callbackFn, data, token }) => {
    try {
        dispatch(getDemoRequests({ isLoading: true }));
        const URL = `${BASEURL}${GET_DEMO_REQUESTS}`;
        const result = await getAPICall(URL, data, token).then((res) => {
            callbackFn && callbackFn(res);
            return res;
        });
        dispatch(getDemoRequests({ isLoading: false, response: result.data }));
    } catch (err) {
        dispatch(getDemoRequests({ isLoading: false }));
        if (callbackFn) callbackFn({ data: { status: 500, message: err.message } });
    }
};

// Get single demo request by ID
export const getDemoRequestByIdAsync = async ({ dispatch, callbackFn, requestId, token }) => {
    try {
        dispatch(getDemoRequestById({ isLoading: true }));
        const URL = `${BASEURL}${GET_DEMO_REQUEST_BY_ID}/${requestId}`;
        const result = await getAPICall(URL, {}, token).then((res) => {
            callbackFn && callbackFn(res);
            return res;
        });
        dispatch(getDemoRequestById({ isLoading: false, response: result.data }));
    } catch (err) {
        dispatch(getDemoRequestById({ isLoading: false }));
        if (callbackFn) callbackFn({ data: { status: 500, message: err.message } });
    }
};

export const { getDemoRequests, getDemoRequestById, reset } = demoRequestSlice.actions;

export const getDemoRequestsResponse = (state) => state.demoRequest.getDemoRequestsResponse;
export const getDemoRequestByIdResponse = (state) => state.demoRequest.getDemoRequestByIdResponse;

export default demoRequestSlice.reducer;

