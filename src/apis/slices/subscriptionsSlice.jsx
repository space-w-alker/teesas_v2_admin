import { createSlice } from "@reduxjs/toolkit";
import { getAPICall, postAPICall } from "../client/methodCalls";
import { config } from "../client/config";

const { BASEURL, SUBSCRIBED_USERS, SUBSCRIPTION_STATS, LIST_USERS_FOR_SUBSCRIPTION, ADD_SUBSCRIPTION, SUBSCRIPTION_WORKFLOW, AVAILABLE_SUBSCRIPTIONS } = config;

const initialState = {
    subscribedUsers: {
        isLoading: false,
        data: null,
        paging: {
            total: 0,
            page: 1,
            limit: 10,
            totalPages: 1
        },
        error: null
    },
    subscriptionStats: {
        isLoading: false,
        data: null,
        error: null
    },
    searchUsers: {
        isLoading: false,
        data: [],
        paging: { page: 1, totalPages: 1, total: 0 },
        error: null
    },
    subscriptionWorkflow: {
        isLoading: false,
        data: null,
        error: null
    },
    subscriptionCreation: {
        isLoading: false,
        data: null,
        error: null,
        success: false
    }
};

export const subscriptionsSlice = createSlice({
    name: "subscriptions",
    initialState,
    reducers: {
        setSubscribedUsers: (state, action) => {
            state.subscribedUsers = action.payload;
        },
        setSubscriptionStats: (state, action) => {
            state.subscriptionStats = action.payload;
        },
        setSearchUsers: (state, action) => {
            state.searchUsers = action.payload;
        },
        setSubscriptionWorkflow: (state, action) => {
            state.subscriptionWorkflow = action.payload;
        },
        setSubscriptionCreation: (state, action) => {
            state.subscriptionCreation = action.payload;
        },
        resetSubscriptionCreation: (state) => {
            state.subscriptionCreation = {
                isLoading: false,
                data: null,
                error: null,
                success: false
            };
        }
    }
});

export const {
    setSubscribedUsers,
    setSubscriptionStats,
    setSearchUsers,
    setSubscriptionWorkflow,
    setSubscriptionCreation,
    resetSubscriptionCreation
} = subscriptionsSlice.actions;

export const getSubscribedUsersAsync = ({ dispatch, body, token, callbackFn }) => {
    try {
        dispatch(setSubscribedUsers({ isLoading: true, data: null, paging: null, error: null }));
        const URL = `${BASEURL}${SUBSCRIBED_USERS}`;
        let requestParams = {
            ...body,
            limit: body.limit || 100
        };



        getAPICall(URL, requestParams, token)
            .then(result => {
                if (result?.data?.status === 200) {
                    dispatch(setSubscribedUsers({
                        isLoading: false,
                        data: result.data.data.subscriptions,
                        paging: {
                            total: result.data.data.total,
                            page: result.data.data.page,
                            limit: result.data.data.limit,
                            totalPages: result.data.data.totalPages
                        },
                        error: null
                    }));
                } else {
                    dispatch(setSubscribedUsers({
                        isLoading: false,
                        data: [],
                        paging: null,
                        error: result?.data?.message || "Failed to fetch subscriptions"
                    }));
                }
                if (callbackFn) callbackFn(result);
            })
            .catch(error => {
                console.error("API call error:", error);
                dispatch(setSubscribedUsers({ isLoading: false, data: null, paging: null, error: error.message }));
                if (callbackFn) callbackFn({ error });
            });
    } catch (error) {
        console.error("Exception in getSubscribedUsersAsync:", error);
        dispatch(setSubscribedUsers({ isLoading: false, data: null, paging: null, error: error.message }));
        if (callbackFn) callbackFn({ error });
    }
};

export const getSubscriptionStatsAsync = ({ dispatch, token, timeFilter = null, callbackFn }) => {
    try {
        dispatch(setSubscriptionStats({ isLoading: true, data: null, error: null }));

        const URL = `${BASEURL}${SUBSCRIPTION_STATS}${timeFilter ? `?timeFilter=${timeFilter}` : ''}`;

        getAPICall(URL, {}, token)
            .then(result => {
                if (result?.data?.status === 200) {
                    dispatch(setSubscriptionStats({
                        isLoading: false,
                        data: result.data.data,
                        error: null
                    }));

                } else {
                    dispatch(setSubscriptionStats({
                        isLoading: false,
                        data: null,
                        error: result?.data?.message || "Failed to fetch subscription stats"
                    }));
                }
                if (callbackFn) callbackFn(result);
            })
            .catch(error => {
                dispatch(setSubscriptionStats({ isLoading: false, data: null, error: error.message }));
                if (callbackFn) callbackFn({ error });
            });
    } catch (error) {
        dispatch(setSubscriptionStats({ isLoading: false, data: null, error: error.message }));
        if (callbackFn) callbackFn({ error });
    }
};


export const searchUsersAsync = ({ dispatch, body, token, isPagination = false, callbackFn }) => {
    try {
        if (!isPagination) {
            dispatch(setSearchUsers({ isLoading: true, data: [], paging: null, error: null }));
        }

        const URL = `${BASEURL}${LIST_USERS_FOR_SUBSCRIPTION}`;

        const requestBody = {
            filterList: body.filterList || "active:true",
            sort: body.sort || "name:ASC",
            search: body.search || "",
            page: body.page || 1,
            limit: body.limit || 10
        };

        postAPICall(URL, requestBody, token)
            .then(result => {
                if (result?.data?.status === 200) {
                    dispatch(setSearchUsers({
                        isLoading: false,
                        data: result.data.data.users || [],
                        paging: {
                            total: result.data.data.total || 0,
                            totalPages: result.data.data.totalPages || 1,
                            page: result.data.data.page || 1,
                            limit: result.data.data.limit || 10
                        },
                        error: null
                    }));
                } else {
                    dispatch(setSearchUsers({
                        isLoading: false,
                        data: [],
                        paging: { page: 1, totalPages: 1, total: 0 },
                        error: result?.data?.message || "Failed to fetch users"
                    }));
                }
                if (callbackFn) callbackFn(result);
            })
            .catch(error => {
                dispatch(setSearchUsers({
                    isLoading: false,
                    data: [],
                    paging: { page: 1, totalPages: 1, total: 0 },
                    error: error.message
                }));
                if (callbackFn) callbackFn({ error });
            });
    } catch (error) {
        dispatch(setSearchUsers({
            isLoading: false,
            data: [],
            paging: { page: 1, totalPages: 1, total: 0 },
            error: error.message
        }));
        if (callbackFn) callbackFn({ error });
    }
};

export const getSubscriptionWorkflowAsync = ({ dispatch, body, token, callbackFn }) => {
    try {
        dispatch(setSubscriptionWorkflow({ isLoading: true, data: null, error: null }));
        const URL = `${BASEURL}${SUBSCRIPTION_WORKFLOW}`;

        postAPICall(URL, body, token)
            .then(result => {
                if (result?.data?.status === 200) {
                    dispatch(setSubscriptionWorkflow({
                        isLoading: false,
                        data: result.data.data,
                        error: null
                    }));
                } else {
                    dispatch(setSubscriptionWorkflow({
                        isLoading: false,
                        data: null,
                        error: result?.data?.message || "Failed to fetch subscription workflow data"
                    }));
                }
                if (callbackFn) callbackFn(result);
            })
            .catch(error => {
                dispatch(setSubscriptionWorkflow({
                    isLoading: false,
                    data: null,
                    error: error.message
                }));
                if (callbackFn) callbackFn({ error });
            });
    } catch (error) {
        dispatch(setSubscriptionWorkflow({
            isLoading: false,
            data: null,
            error: error.message
        }));
        if (callbackFn) callbackFn({ error });
    }
};

export const createSubscriptionAsync = ({ dispatch, body, token, callbackFn }) => {
    try {
        dispatch(setSubscriptionCreation({ isLoading: true, data: null, error: null, success: false }));
        const URL = `${BASEURL}${ADD_SUBSCRIPTION}`;

        postAPICall(URL, body, token)
            .then(result => {
                if (result?.data?.status === 201) {
                    dispatch(setSubscriptionCreation({
                        isLoading: false,
                        data: result.data.data,
                        error: null,
                        success: true
                    }));
                } else {
                    dispatch(setSubscriptionCreation({
                        isLoading: false,
                        data: null,
                        error: result?.data?.message || "Failed to create subscription",
                        success: false
                    }));
                }
                if (callbackFn) callbackFn(result);
            })
            .catch(error => {
                dispatch(setSubscriptionCreation({
                    isLoading: false,
                    data: null,
                    error: error.message,
                    success: false
                }));
                if (callbackFn) callbackFn({ error });
            });
    } catch (error) {
        dispatch(setSubscriptionCreation({
            isLoading: false,
            data: null,
            error: error.message,
            success: false
        }));
        if (callbackFn) callbackFn({ error });
    }
};

export const getAvailableSubscriptionsAsync = ({ dispatch, userId, classId, token, callbackFn }) => {
    try {
        dispatch(setSubscriptionWorkflow({ isLoading: true, data: null, error: null }));
        const URL = `${BASEURL}/admin/dashboard/available-subscriptions?user_id=${userId}${classId ? `&class_id=${classId}` : ''}`;

        getAPICall(URL, {}, token)
            .then(result => {
                if (result?.data?.status === 200) {
                    dispatch(setSubscriptionWorkflow({
                        isLoading: false,
                        data: result.data.data,
                        error: null
                    }));
                } else {
                    dispatch(setSubscriptionWorkflow({
                        isLoading: false,
                        data: null,
                        error: result?.data?.message || "Failed to fetch available subscriptions"
                    }));
                }
                if (callbackFn) callbackFn(result);
            })
            .catch(error => {
                dispatch(setSubscriptionWorkflow({
                    isLoading: false,
                    data: null,
                    error: error.message
                }));
                if (callbackFn) callbackFn({ error });
            });
    } catch (error) {
        dispatch(setSubscriptionWorkflow({
            isLoading: false,
            data: null,
            error: error.message
        }));
        if (callbackFn) callbackFn({ error });
    }
};



export const selectSubscribedUsers = (state) => state.subscriptions.subscribedUsers;
export const selectSearchUsers = (state) => state.subscriptions.searchUsers;
export const selectSubscriptionStats = (state) => state.subscriptions.subscriptionStats;
export const selectSubscriptionWorkflow = (state) => state.subscriptions.subscriptionWorkflow;
export const selectSubscriptionCreation = (state) => state.subscriptions.subscriptionCreation;


export default subscriptionsSlice.reducer;
