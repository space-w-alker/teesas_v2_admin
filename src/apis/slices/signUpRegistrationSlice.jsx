import { createSlice } from "@reduxjs/toolkit";
import { getAPICall } from "../client/methodCalls";
import { config } from "../client/config";

const { BASEURL, GET_SIGNUP_REGISTRATIONS, GET_SIGNUP_REGISTRATION_BY_ID } = config;

export const signUpRegistrationSlice = createSlice({
    name: "signUpRegistration",
    initialState: {
        getSignUpRegistrationsResponse: {
            response: {},
            isLoading: false,
        },
        getSignUpRegistrationByIdResponse: {
            response: {},
            isLoading: false,
        },
    },
    reducers: {
        getSignUpRegistrations: (state, action) => {
            state.getSignUpRegistrationsResponse = action.payload;
        },
        getSignUpRegistrationById: (state, action) => {
            state.getSignUpRegistrationByIdResponse = action.payload;
        },
        reset: (state) => {
            state.getSignUpRegistrationsResponse = {
                response: {},
                isLoading: false,
            };
        }
    }
});

// Get all sign-up registrations with pagination
export const getSignUpRegistrationsAsync = async ({ dispatch, callbackFn, data, token }) => {
    try {
        dispatch(getSignUpRegistrations({ isLoading: true }));
        const URL = `${BASEURL}${GET_SIGNUP_REGISTRATIONS}`;
        const result = await getAPICall(URL, data, token).then((res) => {
            callbackFn && callbackFn(res);
            return res;
        });
        dispatch(getSignUpRegistrations({ isLoading: false, response: result.data }));
    } catch (err) {
        dispatch(getSignUpRegistrations({ isLoading: false }));
        if (callbackFn) callbackFn({ data: { status: 500, message: err.message } });
    }
};

// Get single sign-up registration by ID
export const getSignUpRegistrationByIdAsync = async ({ dispatch, callbackFn, registrationId, token }) => {
    try {
        dispatch(getSignUpRegistrationById({ isLoading: true }));
        const URL = `${BASEURL}${GET_SIGNUP_REGISTRATION_BY_ID}/${registrationId}`;
        const result = await getAPICall(URL, {}, token).then((res) => {
            callbackFn && callbackFn(res);
            return res;
        });
        dispatch(getSignUpRegistrationById({ isLoading: false, response: result.data }));
    } catch (err) {
        dispatch(getSignUpRegistrationById({ isLoading: false }));
        if (callbackFn) callbackFn({ data: { status: 500, message: err.message } });
    }
};

export const { getSignUpRegistrations, getSignUpRegistrationById, reset } = signUpRegistrationSlice.actions;

export const getSignUpRegistrationsResponse = (state) => state.signUpRegistration.getSignUpRegistrationsResponse;
export const getSignUpRegistrationByIdResponse = (state) => state.signUpRegistration.getSignUpRegistrationByIdResponse;

export default signUpRegistrationSlice.reducer;

