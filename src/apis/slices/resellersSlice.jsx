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

export const getResellersAsync = (page = 1, search = '') => async (dispatch) => {
    try {
        dispatch(setResellersList({ isLoading: true }));
        let URL = `${BASEURL}${RESELLER_LIST}?page=${page}`;

        if (search.trim()) {
            URL += `&search=${encodeURIComponent(search.trim())}`;
        }

        const result = await getAPICall(URL);
        console.log("API Response:", result?.data);

        if (result?.data?.status === 200) {
            // Check the actual structure of the response
            const responseData = result.data.data || {};

            // Make sure we have an array of resellers, even if empty
            const resellers = responseData.resellers || [];

            // If statistics show resellers but array is empty, try to get them from another property
            if (resellers.length === 0 && responseData.statistics?.total_resellers > 0) {
                console.log("Warning: Statistics show resellers exist but none were returned in the data array");

                // Check if resellers might be in a different property
                if (responseData.reseller_forms && Array.isArray(responseData.reseller_forms)) {
                    console.log("Found resellers in reseller_forms property");
                    dispatch(setResellersList({
                        isLoading: false,
                        data: responseData.reseller_forms,
                        pagination: responseData.pagination || { current_page: '1', total_pages: 1 },
                        statistics: responseData.statistics
                    }));
                    return;
                }
            }

            dispatch(setResellersList({
                isLoading: false,
                data: resellers,
                pagination: responseData.pagination || { current_page: '1', total_pages: 1 },
                statistics: responseData.statistics || {
                    total_resellers: 0,
                    approved_resellers: 0,
                    pending_approval: 0
                }
            }));
        } else {
            throw new Error(result?.data?.message || "Failed to fetch resellers");
        }
    } catch (error) {
        console.error("Error fetching resellers:", error);
        dispatch(setResellersList({
            isLoading: false,
            data: [], // Use empty array instead of null
            error: error.message
        }));
    }
};



export const getResellerDetailsAsync = (resellerId) => async (dispatch) => {
    try {
        dispatch(setResellerDetails({ isLoading: true, data: null, error: null }));

        const URL = `${BASEURL}admin/resellers/${resellerId}`;


        const result = await getAPICall(URL);


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

        const result = await postAPICall(URL, rejectData);
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

        const result = await postAPICall(URL, approveData);
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