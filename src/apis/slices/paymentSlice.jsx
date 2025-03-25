import { createSlice } from "@reduxjs/toolkit";
import { getAPICall, postAPICall } from "../client/methodCalls";
import { config } from "../client/config";
import { toast } from "react-toastify";

const { BASEURL, GET_PAYMENTS, GET_PAYMENTS_DETAILS } = config;

const initialState = {
    isLoading: false,
    data: null,
    error: null,
    details: {
        isLoading: false,
        data: null,
        error: null
    },
    bankTransfers: {
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
        },
        setBankTransfers: (state, action) => {
            state.bankTransfers = action.payload;
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
        const URL = `${BASEURL}${GET_PAYMENTS_DETAILS}/${id}`;
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

export const getBankTransfersAsync = (page = 1, limit = 10) => async (dispatch) => {
    try {
        dispatch(setBankTransfers({ isLoading: true, data: null, error: null }));
        const URL = `${BASEURL}admin/payments/bank-transfer?page=${page}&limit=${limit}`;
        const result = await getAPICall(URL);

        if (result?.data?.status === 200) {
            dispatch(setBankTransfers({
                isLoading: false,
                data: result.data.data,
                error: null
            }));
        } else {
            throw new Error('Failed to fetch bank transfers');
        }
    } catch (error) {
        dispatch(setBankTransfers({ isLoading: false, data: null, error: error.message }));
    }
};

export const confirmBankTransferAsync = (id) => async (dispatch) => {
    try {
        const URL = `${BASEURL}admin/payments/bank-transfer/confirm/${id}`;
        const result = await postAPICall(URL);

        if (result?.data?.status === 200) {
            toast.success("Bank transfer confirmed successfully");
            // Refresh the details
            dispatch(getPaymentDetailsAsync(id));
            return true;
        } else {
            throw new Error(result?.data?.message || 'Failed to confirm bank transfer');
        }
    } catch (error) {
        toast.error(error.message || "Failed to confirm bank transfer");
        return false;
    }
};

export const rejectBankTransferAsync = (id) => async (dispatch) => {
    try {
        const URL = `${BASEURL}admin/payments/bank-transfer/reject/${id}`;
        const result = await postAPICall(URL);

        if (result?.data?.status === 200) {
            toast.success("Bank transfer rejected successfully");
            // Refresh the details
            dispatch(getPaymentDetailsAsync(id));
            return true;
        } else {
            throw new Error(result?.data?.message || 'Failed to reject bank transfer');
        }
    } catch (error) {
        toast.error(error.message || "Failed to reject bank transfer");
        return false;
    }
};

export const { setPaymentsList, setPaymentDetails, setBankTransfers } = paymentSlice.actions;
export const selectPayments = (state) => state.payments;
export const selectPaymentDetails = (state) => state.payments.details;
export const selectBankTransfers = (state) => state.payments.bankTransfers;
export default paymentSlice.reducer;
