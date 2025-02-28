import { createSlice } from "@reduxjs/toolkit";
import { getAPICall } from "../client/methodCalls";
import { config } from "../client/config";

const { BASEURL, SUBSCRIBED_USERS, SUBSCRIPTION_STATS } = config;

const initialState = {
    subscribedUsers: {
        isLoading: false,
        data: null,
        paging: null,
        error: null
    },
    subscriptionStats: {
        isLoading: false,
        data: null,
        error: null
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
        }
    }
});

export const { setSubscribedUsers, setSubscriptionStats } = subscriptionsSlice.actions;

// Fixed versions of the async functions
export const getSubscribedUsersAsync = ({ dispatch, body, token, callbackFn }) => {
    try {
        dispatch(setSubscribedUsers({ isLoading: true, data: null, paging: null, error: null }));
        const URL = `${BASEURL}${SUBSCRIBED_USERS}`;

        getAPICall(URL, body, token)
            .then(result => {
                if (result?.data?.status === 200) {
                    // Updated to match the new response format
                    dispatch(setSubscribedUsers({
                        isLoading: false,
                        data: result.data.data.subscriptions,
                        paging: {
                            total: result.data.data.total,
                            page: result.data.data.page,
                            limit: result.data.data.limit
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
                dispatch(setSubscribedUsers({ isLoading: false, data: null, paging: null, error: error.message }));
                if (callbackFn) callbackFn({ error });
            });
    } catch (error) {
        dispatch(setSubscribedUsers({ isLoading: false, data: null, paging: null, error: error.message }));
        if (callbackFn) callbackFn({ error });
    }
};

export const getSubscriptionStatsAsync = ({ dispatch, token, callbackFn }) => {
    try {
        dispatch(setSubscriptionStats({ isLoading: true, data: null, error: null }));
        const URL = `${BASEURL}${SUBSCRIPTION_STATS}`;

        getAPICall(URL, {}, token)
            .then(result => {
                console.log("Subscription stats API response:", result);
                if (result?.data?.status === 200) {
                    dispatch(setSubscriptionStats({
                        isLoading: false,
                        data: result.data.data, // This contains all the stats including totalSubscribedUsers
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
                console.error("Error fetching subscription stats:", error);
                dispatch(setSubscriptionStats({ isLoading: false, data: null, error: error.message }));
                if (callbackFn) callbackFn({ error });
            });
    } catch (error) {
        console.error("Exception in getSubscriptionStatsAsync:", error);
        dispatch(setSubscriptionStats({ isLoading: false, data: null, error: error.message }));
        if (callbackFn) callbackFn({ error });
    }
};


// Fixed selector functions - these need to be corrected
export const selectSubscribedUsers = (state) => state.subscriptions.subscribedUsers;
export const selectSubscriptionStats = (state) => state.subscriptions.subscriptionStats;

export default subscriptionsSlice.reducer;
