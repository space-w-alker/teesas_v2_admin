import { createSlice } from "@reduxjs/toolkit";
import { getAPICall } from "../client/methodCalls";
import { config } from "../client/config";

const { BASEURL, GET_LEARNING_REGISTRATIONS, GET_LEARNING_REGISTRATION_BY_ID } = config;

export const learningRegistrationSlice = createSlice({
    name: "learningRegistration",
    initialState: {
        getLearningRegistrationsResponse: {
            response: {},
            isLoading: false,
        },
        getLearningRegistrationByIdResponse: {
            response: {},
            isLoading: false,
        },
    },
    reducers: {
        getLearningRegistrations: (state, action) => {
            state.getLearningRegistrationsResponse = action.payload;
        },
        getLearningRegistrationById: (state, action) => {
            state.getLearningRegistrationByIdResponse = action.payload;
        },
        reset: (state) => {
            state.getLearningRegistrationsResponse = {
                response: {},
                isLoading: false,
            };
        }
    }
});

// Get all learning registrations with pagination
export const getLearningRegistrationsAsync = async ({ dispatch, callbackFn, data, token }) => {
    try {
        dispatch(getLearningRegistrations({ isLoading: true }));
        const URL = `${BASEURL}${GET_LEARNING_REGISTRATIONS}`;
        const result = await getAPICall(URL, data, token).then((res) => {
            callbackFn && callbackFn(res);
            return res;
        });
        dispatch(getLearningRegistrations({ isLoading: false, response: result.data }));
    } catch (err) {
        dispatch(getLearningRegistrations({ isLoading: false }));
        if (callbackFn) callbackFn({ data: { status: 500, message: err.message } });
    }
};

// Get single learning registration by ID
export const getLearningRegistrationByIdAsync = async ({ dispatch, callbackFn, registrationId, token }) => {
    try {
        dispatch(getLearningRegistrationById({ isLoading: true }));
        const URL = `${BASEURL}${GET_LEARNING_REGISTRATION_BY_ID}/${registrationId}`;
        const result = await getAPICall(URL, {}, token).then((res) => {
            callbackFn && callbackFn(res);
            return res;
        });
        dispatch(getLearningRegistrationById({ isLoading: false, response: result.data }));
    } catch (err) {
        dispatch(getLearningRegistrationById({ isLoading: false }));
        if (callbackFn) callbackFn({ data: { status: 500, message: err.message } });
    }
};

export const { getLearningRegistrations, getLearningRegistrationById, reset } = learningRegistrationSlice.actions;

export const getLearningRegistrationsResponse = (state) => state.learningRegistration.getLearningRegistrationsResponse;
export const getLearningRegistrationByIdResponse = (state) => state.learningRegistration.getLearningRegistrationByIdResponse;

export default learningRegistrationSlice.reducer;

