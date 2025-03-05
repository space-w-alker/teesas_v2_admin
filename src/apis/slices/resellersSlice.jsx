import { createSlice } from "@reduxjs/toolkit";
import { getAPICall, postAPICall, putAPICall } from "../client/methodCalls";
import { config } from "../client/config";

const { BASEURL, RESELLER_LIST } = config;

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
    },
    action: {
        isLoading: false,
        success: false,
        error: null,
        message: null
    }
};

export const resellersSlice = createSlice({
    name: "resellers",
    initialState,
    reducers: {
        setResellersList: (state, action) => {
            state.list = action.payload;
        },
        setResellerDetails: (state, action) => {
            state.details = action.payload;
        },
        setResellerAction: (state, action) => {
            state.action = action.payload;
        },
        resetResellerAction: (state) => {
            state.action = initialState.action;
        }
    }
});

export const {
    setResellersList,
    setResellerDetails,
    setResellerAction,
    resetResellerAction
} = resellersSlice.actions;

export const getResellersAsync = (page = 1) => async (dispatch) => {
    try {
        dispatch(setResellersList({
            isLoading: true,
            data: null,
            statistics: null,
            pagination: null,
            error: null
        }));

        const URL = `${BASEURL}${RESELLER_LIST}`;
        const result = await getAPICall(URL);

        if (result?.data?.status === 200) {
            dispatch(setResellersList({
                isLoading: false,
                data: result.data.data.reseller_forms,
                statistics: result.data.data.statistics,
                pagination: result.data.data.pagination,
                error: null
            }));
        } else {
            dispatch(setResellersList({
                isLoading: false,
                data: [],
                statistics: null,
                pagination: null,
                error: result?.data?.message || "Failed to fetch resellers"
            }));
        }
    } catch (error) {
        dispatch(setResellersList({
            isLoading: false,
            data: null,
            statistics: null,
            pagination: null,
            error: error.message
        }));
    }
};

export const getResellerDetailsAsync = (resellerId) => async (dispatch) => {
    try {
        dispatch(setResellerDetails({ isLoading: true, data: null, error: null }));

        const URL = `${BASEURL}admin/resellers/${resellerId}`;
        console.log("Fetching reseller details from URL:", URL);

        const result = await getAPICall(URL);
        console.log("Reseller details API response:", result?.data);

        if (result?.data) {
            dispatch(setResellerDetails({
                isLoading: false,
                data: result.data.data || result.data,
                error: null
            }));
            return true;
        } else {
            dispatch(setResellerDetails({
                isLoading: false,
                data: null,
                error: result?.data?.message || "Failed to fetch reseller details"
            }));
            return false;
        }
    } catch (error) {
        console.error("Error fetching reseller details:", error);
        dispatch(setResellerDetails({
            isLoading: false,
            data: null,
            error: error.message
        }));
        return false;
    }
};

// New action for rejecting resellers
export const rejectResellerAsync = (resellerId, rejectData) => async (dispatch) => {
    try {
        dispatch(setResellerAction({
            isLoading: true,
            success: false,
            error: null,
            message: null
        }));

        const URL = `${BASEURL}admin/resellers/${resellerId}/reject`;
        console.log("Rejecting reseller with ID:", resellerId);

        const result = await putAPICall(URL, rejectData);
        console.log("Reject reseller API response:", result?.data);

        if (result?.data?.status === 200) {
            dispatch(setResellerAction({
                isLoading: false,
                success: true,
                error: null,
                message: result.data.message || "Reseller rejected successfully"
            }));

            // Refresh the reseller details
            dispatch(getResellerDetailsAsync(resellerId));
            return true;
        } else {
            dispatch(setResellerAction({
                isLoading: false,
                success: false,
                error: result?.data?.message || "Failed to reject reseller",
                message: null
            }));
            return false;
        }
    } catch (error) {
        console.error("Error rejecting reseller:", error);
        dispatch(setResellerAction({
            isLoading: false,
            success: false,
            error: error.message,
            message: null
        }));
        return false;
    }
};

// New action for approving resellers
export const approveResellerAsync = (resellerId, approveData) => async (dispatch) => {
    try {
        dispatch(setResellerAction({
            isLoading: true,
            success: false,
            error: null,
            message: null
        }));

        const URL = `${BASEURL}admin/resellers/${resellerId}/approve`;
        console.log("Approving reseller with ID:", resellerId);

        const result = await putAPICall(URL, approveData);
        console.log("Approve reseller API response:", result?.data);

        if (result?.data?.status === 200) {
            dispatch(setResellerAction({
                isLoading: false,
                success: true,
                error: null,
                message: result.data.message || "Reseller approved successfully"
            }));

            // Refresh the reseller details
            dispatch(getResellerDetailsAsync(resellerId));
            return true;
        } else {
            dispatch(setResellerAction({
                isLoading: false,
                success: false,
                error: result?.data?.message || "Failed to approve reseller",
                message: null
            }));
            return false;
        }
    } catch (error) {
        console.error("Error approving reseller:", error);
        dispatch(setResellerAction({
            isLoading: false,
            success: false,
            error: error.message,
            message: null
        }));
        return false;
    }
};

export const selectResellersList = (state) => state.resellers.list;
export const selectResellerDetails = (state) => state.resellers.details;
export const selectResellerAction = (state) => state.resellers.action;

export default resellersSlice.reducer;