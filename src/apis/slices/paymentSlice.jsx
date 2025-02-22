import { createSlice } from "@reduxjs/toolkit";
import { getAPICall } from "../client/methodCalls";
import { config } from "../client/config";

const { BASEURL, GET_PAYMENTS, GET_PAYMENTS_DETAILS } = config;

const initialState = {
    list: {
        isLoading: false,
        data: null,
        statistics: null,
        pagination: null,
        error: null
    },
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
            state.list = action.payload;
        },
        setPaymentDetails: (state, action) => {
            state.details = action.payload;
        }
    }
});

export const getPaymentsAsync = (page = 1, limit = 5) => async (dispatch) => {
    try {
        dispatch(setPaymentsList({ isLoading: true, data: null, statistics: null, pagination: null, error: null }));
        const URL = `${BASEURL}${GET_PAYMENTS}?page=${page}&limit=${limit}`;
        const result = await getAPICall(URL);

        if (result?.data?.response?.status === 200) {
            // Extract the first array from nested payments array
            const paymentsData = result.data.response.data.payments[0];

            dispatch(setPaymentsList({
                isLoading: false,
                data: paymentsData,
                statistics: result.data.response.data.statistics,
                pagination: result.data.response.data.pagination,
                error: null
            }));
        } else {
            throw new Error('Failed to fetch payments');
        }
    } catch (error) {
        dispatch(setPaymentsList({ isLoading: false, data: null, statistics: null, pagination: null, error: error.message }));
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
export const selectPayments = (state) => state.payments.list;
export const selectPaymentDetails = (state) => state.payments.details;
export default paymentSlice.reducer;
