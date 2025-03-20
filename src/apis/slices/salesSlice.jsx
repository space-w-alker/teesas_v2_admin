import { createSlice } from "@reduxjs/toolkit";
import { postAPICall, getAPICall, putAPICall, deleteAPICall } from "../client/methodCalls";
import { toast } from "react-toastify";
import { config } from "../client/config";

const { BASEURL } = config;

export const salesSlice = createSlice({
    name: "sales",
    initialState: {
        // Sales Team
        salesTeamDetails: {},
        salesTeamList: {
            salesTeam: [],
            pagination: {
                totalItems: 0,
                totalPages: 0,
                currentPage: 1,
                limit: 10
            }
        },
        addSalesTeamResponse: {},
        updateSalesTeamResponse: {},
        deleteSalesTeamResponse: {},
    },
    reducers: {
        // Sales Team reducers
        getSalesTeamDetailsSuccess: (state, action) => {
            state.salesTeamDetails = action.payload;
        },
        listSalesTeamSuccess: (state, action) => {
            state.salesTeamList = action.payload;
        },
        addSalesTeamSuccess: (state, action) => {
            state.addSalesTeamResponse = action.payload;
        },
        updateSalesTeamSuccess: (state, action) => {
            state.updateSalesTeamResponse = action.payload;
        },
        deleteSalesTeamSuccess: (state, action) => {
            state.deleteSalesTeamResponse = action.payload;
        },

        // Reset state
        resetState: (state) => {
            // Sales Team
            state.salesTeamDetails = {};
            state.salesTeamList = {
                salesTeam: [],
                pagination: {
                    totalItems: 0,
                    totalPages: 0,
                    currentPage: 1,
                    limit: 10
                }
            };
            state.addSalesTeamResponse = {};
            state.updateSalesTeamResponse = {};
            state.deleteSalesTeamResponse = {};
        },
    },
});

// ==================== SALES TEAM THUNKS ====================

// Get Sales Team Details
export const getSalesTeamDetailsAsync = ({ dispatch, id, token, callbackFn }) => {
    return async () => {
        try {
            const URL = `${BASEURL}sales-team/details?id=${id}`;
            const response = await getAPICall(URL, {}, token);
            if (response?.data?.status === 200) {
                dispatch(getSalesTeamDetailsSuccess(response.data));
                callbackFn && callbackFn(response.data);
            } else {
                toast.error("Failed to fetch Sales Team details.");
            }
        } catch (error) {
            toast.error("Error fetching Sales Team details: " + error);
        }
    };
};

// Add Sales Team
export const addSalesTeamAsync = ({ dispatch, data, token, callbackFn }) => {
    return async () => {
        try {
            const URL = `${BASEURL}sales-team/add`;
            const response = await postAPICall(URL, data, token);
            if (response.data?.status === 200) {
                dispatch(addSalesTeamSuccess(response.data));
                toast.success("Sales Team member added successfully");
                callbackFn && callbackFn(response.data);
            } else {
                toast.error("Failed to add Sales Team member.");
            }
        } catch (error) {
            toast.error("Error adding Sales Team member: " + error);
        }
    };
};

// List Sales Team
export const listSalesTeamAsync = ({ dispatch, page = 1, limit = 10, search = "", token, callbackFn }) => {
    return async () => {
        try {
            const URL = `${BASEURL}sales-team/list?page=${page}&limit=${limit}&search=${search}`;
            const response = await getAPICall(URL, {}, token);
            // console.log(response?.data?.status);
            if (response?.data?.status == 200) {
                dispatch(listSalesTeamSuccess(response.data));
                callbackFn && callbackFn(response.data);
            } else {
                toast.error("Failed to fetch Sales Team list.");
            }
        } catch (error) {
            toast.error("Error fetching Sales Team list: " + error);
        }
    };
};

// Update Sales Team
export const updateSalesTeamAsync = ({ dispatch, id, formData, token, callbackFn }) => {
    return async () => {
        try {
            const URL = `${BASEURL}sales-team/update/${id}`;
            const response = await putAPICall(URL, formData, true, token);
            if (response?.data?.status === 200) {
                dispatch(updateSalesTeamSuccess(response.data));
                toast.success("Sales Team member updated successfully");
                callbackFn && callbackFn(response.data);
            } else {
                toast.error("Failed to update Sales Team member.");
            }
        } catch (error) {
            toast.error("Error updating Sales Team member: " + error);
        }
    };
};

// Delete Sales Team
export const deleteSalesTeamAsync = ({ dispatch, id, token, callbackFn }) => {
    return async () => {
        try {
            const URL = `${BASEURL}sales-team/delete/${id}`;
            const response = await deleteAPICall(URL, {}, token);
            if (response?.data?.status === 200) {
                dispatch(deleteSalesTeamSuccess(response.data));
                toast.success("Sales Team member deleted successfully");
                callbackFn && callbackFn(response.data);
            } else {
                toast.error("Failed to delete Sales Team member.");
            }
        } catch (error) {
            toast.error("Error deleting Sales Team member: " + error);
        }
    };
};

// Export all actions
export const {
    // Sales Team
    getSalesTeamDetailsSuccess,
    listSalesTeamSuccess,
    addSalesTeamSuccess,
    updateSalesTeamSuccess,
    deleteSalesTeamSuccess,

    // Reset
    resetState
} = salesSlice.actions;

// Export selectors
// Sales Team
export const salesTeamDetails = (state) => state.sales.salesTeamDetails;
export const salesTeamList = (state) => state.sales.salesTeamList;
export const salesTeamItems = (state) => state.sales.salesTeamList.salesTeam || [];
export const salesTeamPagination = (state) => state.sales.salesTeamList.pagination || {
    totalItems: 0,
    totalPages: 0,
    currentPage: 1,
    limit: 10
};
export const addSalesTeamResponse = (state) => state.sales.addSalesTeamResponse;
export const updateSalesTeamResponse = (state) => state.sales.updateSalesTeamResponse;
export const deleteSalesTeamResponse = (state) => state.sales.deleteSalesTeamResponse;

export default salesSlice.reducer;