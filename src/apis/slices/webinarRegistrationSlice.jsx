import { createSlice } from "@reduxjs/toolkit";
import { getAPICall } from "../client/methodCalls";
import { config } from "../client/config";

const { BASEURL, GET_WEBINAR_REGISTRATIONS, GET_WEBINAR_REGISTRATION_BY_ID } = config;

export const webinarRegistrationSlice = createSlice({
    name: "webinarRegistration",
    initialState: {
        getWebinarRegistrationsResponse: {
            response: {},
            isLoading: false,
        },
        getWebinarRegistrationByIdResponse: {
            response: {},
            isLoading: false,
        },
    },
    reducers: {
        getWebinarRegistrations: (state, action) => {
            state.getWebinarRegistrationsResponse = action.payload;
        },
        getWebinarRegistrationById: (state, action) => {
            state.getWebinarRegistrationByIdResponse = action.payload;
        },
        reset: (state) => {
            state.getWebinarRegistrationsResponse = {
                response: {},
                isLoading: false,
            };
        }
    }
});

// Get all webinar registrations with pagination
export const getWebinarRegistrationsAsync = async ({ dispatch, callbackFn, data, token }) => {
    try {
        dispatch(getWebinarRegistrations({ isLoading: true }));
        const URL = `${BASEURL}${GET_WEBINAR_REGISTRATIONS}`;
        const result = await getAPICall(URL, data, token).then((res) => {
            callbackFn && callbackFn(res);
            return res;
        });
        dispatch(getWebinarRegistrations({ isLoading: false, response: result.data }));
    } catch (err) {
        dispatch(getWebinarRegistrations({ isLoading: false }));
        if (callbackFn) callbackFn({ data: { status: 500, message: err.message } });
    }
};

// Get single webinar registration by ID
export const getWebinarRegistrationByIdAsync = async ({ dispatch, callbackFn, registrationId, token }) => {
    try {
        dispatch(getWebinarRegistrationById({ isLoading: true }));
        const URL = `${BASEURL}${GET_WEBINAR_REGISTRATION_BY_ID}/${registrationId}`;
        const result = await getAPICall(URL, {}, token).then((res) => {
            callbackFn && callbackFn(res);
            return res;
        });
        dispatch(getWebinarRegistrationById({ isLoading: false, response: result.data }));
    } catch (err) {
        dispatch(getWebinarRegistrationById({ isLoading: false }));
        if (callbackFn) callbackFn({ data: { status: 500, message: err.message } });
    }
};

export const { getWebinarRegistrations, getWebinarRegistrationById, reset } = webinarRegistrationSlice.actions;

export const getWebinarRegistrationsResponse = (state) => state.webinarRegistration.getWebinarRegistrationsResponse;
export const getWebinarRegistrationByIdResponse = (state) => state.webinarRegistration.getWebinarRegistrationByIdResponse;

export default webinarRegistrationSlice.reducer;

