import { createSlice } from "@reduxjs/toolkit";
import { getAPICall } from "../client/methodCalls";
import { config } from "../client/config";

const { BASEURL, GET_GENERAL_ENQUIRIES, GET_GENERAL_ENQUIRY_BY_ID } = config;

export const enquirySlice = createSlice({
    name: "enquiry",
    initialState: {
        getEnquiriesResponse: {
            response: {},
            isLoading: false,
        },
        getEnquiryByIdResponse: {
            response: {},
            isLoading: false,
        },
    },
    reducers: {
        getEnquiries: (state, action) => {
            state.getEnquiriesResponse = action.payload;
        },
        getEnquiryById: (state, action) => {
            state.getEnquiryByIdResponse = action.payload;
        },
        reset: (state) => {
            state.getEnquiriesResponse = {
                response: {},
                isLoading: false,
            };
        }
    }
});

// Get all general enquiries with pagination
export const getEnquiriesAsync = async ({ dispatch, callbackFn, data, token }) => {
    try {
        dispatch(getEnquiries({ isLoading: true }));
        const URL = `${BASEURL}${GET_GENERAL_ENQUIRIES}`;
        const result = await getAPICall(URL, data, token).then((res) => {
            callbackFn && callbackFn(res);
            return res;
        });
        dispatch(getEnquiries({ isLoading: false, response: result.data }));
    } catch (err) {
        dispatch(getEnquiries({ isLoading: false }));
        if (callbackFn) callbackFn({ data: { status: 500, message: err.message } });
    }
};

// Get single enquiry by ID
export const getEnquiryByIdAsync = async ({ dispatch, callbackFn, enquiryId, token }) => {
    try {
        dispatch(getEnquiryById({ isLoading: true }));
        const URL = `${BASEURL}${GET_GENERAL_ENQUIRY_BY_ID}/${enquiryId}`;
        const result = await getAPICall(URL, {}, token).then((res) => {
            callbackFn && callbackFn(res);
            return res;
        });
        dispatch(getEnquiryById({ isLoading: false, response: result.data }));
    } catch (err) {
        dispatch(getEnquiryById({ isLoading: false }));
        if (callbackFn) callbackFn({ data: { status: 500, message: err.message } });
    }
};

export const { getEnquiries, getEnquiryById, reset } = enquirySlice.actions;

export const getEnquiriesResponse = (state) => state.enquiry.getEnquiriesResponse;
export const getEnquiryByIdResponse = (state) => state.enquiry.getEnquiryByIdResponse;

export default enquirySlice.reducer;

