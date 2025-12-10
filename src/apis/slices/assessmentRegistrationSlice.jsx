import { createSlice } from "@reduxjs/toolkit";
import { getAPICall } from "../client/methodCalls";
import { config } from "../client/config";

const { BASEURL, GET_ASSESSMENT_REGISTRATIONS, GET_ASSESSMENT_REGISTRATION_BY_ID } = config;

export const assessmentRegistrationSlice = createSlice({
    name: "assessmentRegistration",
    initialState: {
        getAssessmentRegistrationsResponse: {
            response: {},
            isLoading: false,
        },
        getAssessmentRegistrationByIdResponse: {
            response: {},
            isLoading: false,
        },
    },
    reducers: {
        getAssessmentRegistrations: (state, action) => {
            state.getAssessmentRegistrationsResponse = action.payload;
        },
        getAssessmentRegistrationById: (state, action) => {
            state.getAssessmentRegistrationByIdResponse = action.payload;
        },
        reset: (state) => {
            state.getAssessmentRegistrationsResponse = {
                response: {},
                isLoading: false,
            };
        }
    }
});

// Get all assessment registrations with pagination
export const getAssessmentRegistrationsAsync = async ({ dispatch, callbackFn, data, token }) => {
    try {
        dispatch(getAssessmentRegistrations({ isLoading: true }));
        const URL = `${BASEURL}${GET_ASSESSMENT_REGISTRATIONS}`;
        const result = await getAPICall(URL, data, token).then((res) => {
            callbackFn && callbackFn(res);
            return res;
        });
        dispatch(getAssessmentRegistrations({ isLoading: false, response: result.data }));
    } catch (err) {
        dispatch(getAssessmentRegistrations({ isLoading: false }));
        if (callbackFn) callbackFn({ data: { status: 500, message: err.message } });
    }
};

// Get single assessment registration by ID
export const getAssessmentRegistrationByIdAsync = async ({ dispatch, callbackFn, registrationId, token }) => {
    try {
        dispatch(getAssessmentRegistrationById({ isLoading: true }));
        const URL = `${BASEURL}${GET_ASSESSMENT_REGISTRATION_BY_ID}/${registrationId}`;
        const result = await getAPICall(URL, {}, token).then((res) => {
            callbackFn && callbackFn(res);
            return res;
        });
        dispatch(getAssessmentRegistrationById({ isLoading: false, response: result.data }));
    } catch (err) {
        dispatch(getAssessmentRegistrationById({ isLoading: false }));
        if (callbackFn) callbackFn({ data: { status: 500, message: err.message } });
    }
};

export const { getAssessmentRegistrations, getAssessmentRegistrationById, reset } = assessmentRegistrationSlice.actions;

export const getAssessmentRegistrationsResponse = (state) => state.assessmentRegistration.getAssessmentRegistrationsResponse;
export const getAssessmentRegistrationByIdResponse = (state) => state.assessmentRegistration.getAssessmentRegistrationByIdResponse;

export default assessmentRegistrationSlice.reducer;

