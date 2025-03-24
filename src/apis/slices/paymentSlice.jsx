import { createSlice } from "@reduxjs/toolkit";
import { getAPICall } from "../client/methodCalls";
import { config } from "../client/config";

const { BASEURL, GET_PAYMENTS, GET_PAYMENTS_DETAILS } = config;

const initialState = {
    isLoading: false,
    data: null,
    error: null,
    details: {
        isLoading: false,
        data: null,
        error: null
    }
};

export const paymentSlice = createSlice({
    name: "payments",
    initialState,
    reducers: {
        setPaymentsList: (state, action) => {
            state.isLoading = action.payload.isLoading;
            state.data = action.payload.data;
            state.error = action.payload.error;
        },
        setPaymentDetails: (state, action) => {
            state.details = action.payload;
        }
    }
});

export const getPaymentsAsync = (page = 1, limit = 5) => async (dispatch) => {
    try {
        dispatch(setPaymentsList({ isLoading: true, data: null, error: null }));
        const URL = `${BASEURL}${GET_PAYMENTS}?page=${page}&limit=${limit}`;
        const result = await getAPICall(URL);

        if (result?.data?.status === 200) {
            dispatch(setPaymentsList({
                isLoading: false,
                data: result.data.data,
                error: null
            }));
        } else {
            throw new Error('Failed to fetch payments');
        }
    } catch (error) {
        dispatch(setPaymentsList({ isLoading: false, data: null, error: error.message }));
    }
};

export const getPaymentDetailsAsync = (id) => async (dispatch) => {
    try {
        dispatch(setPaymentDetails({ isLoading: true, data: null, error: null }));
        const URL = `${BASEURL}${GET_PAYMENTS_DETAILS}/${id}/details`;
        const result = await getAPICall(URL);

        if (result?.data?.status === 200) {
            const paymentData = result.data.data;
            dispatch(setPaymentDetails({
                isLoading: false,
                data: paymentData,
                error: null
            }));
        }
    } catch (error) {
        dispatch(setPaymentDetails({ isLoading: false, data: null, error: error.message }));
    }
};

export const { setPaymentsList, setPaymentDetails } = paymentSlice.actions;
export const selectPayments = (state) => state.payments;
export const selectPaymentDetails = (state) => state.payments.details;
export default paymentSlice.reducer;
