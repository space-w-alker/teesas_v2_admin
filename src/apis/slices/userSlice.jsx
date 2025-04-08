import { createSlice } from "@reduxjs/toolkit";
import { getAPICall, postAPICall, postFileAPICall, deleteAPICall, patchAPICall, getViaPostAPICall } from "../client/methodCalls";
import { toast } from "react-toastify";
import { config } from "../client/config";
import { useNavigate } from "react-router-dom";

const { BASEURL } = config;
export const userSlice = createSlice({
    name: "users",
    initialState: {
        userList: [],
        userDetails: {},
        addUserResponse: {},
        bulkUploadResponse: {},
        updateUserResponse: {},
        userSubscriptions: {},
    },
    reducers: {
        listUsersSuccess: (state, action) => {
            state.userList = action.payload;
        },
        getUserDetailsSuccess: (state, action) => {
            state.userDetails = action.payload;
        },
        addUserSuccess: (state, action) => {
            state.addUserResponse = action.payload;
        },
        bulkUploadSuccess: (state, action) => {
            state.bulkUploadResponse = action.payload;
        },
        updateUserSuccess: (state, action) => {
            state.updateUserResponse = action.payload;
        },
        deleteUserSuccess: (state, action) => {
            state.userList = state.userList.filter(
                (user) => user.id !== action.payload.id
            );
        },
        deactivateUserSuccess: (state, action) => {
            const userId = action.payload.id;
            const userIndex = state.userList.findIndex(user => user.id === userId);
            if (userIndex !== -1) {
                state.userList[userIndex].status = 'deactivated'; // Assuming you have a status field
            }
        },
        getUserSubscriptionsSuccess: (state, action) => {
            state.userSubscriptions = action.payload;
        },
    },
});

export const {
    listUsersSuccess,
    getUserDetailsSuccess,
    addUserSuccess,
    bulkUploadSuccess,
    updateUserSuccess,
    deleteUserSuccess,
    deactivateUserSuccess,
    getUserSubscriptionsSuccess,
} = userSlice.actions;

// Thunk to get users
export const fetchUsersAsync = ({ dispatch, params, token }) => {
    return async () => {
        try {
            const URL = `${BASEURL}admin/dashboard/users`;
            const response = await getViaPostAPICall(URL, params, token);
            if (response?.data) {
                dispatch(listUsersSuccess(response.data.data));
            } else {
                toast.error("Failed to fetch users.");
            }
        } catch (error) {
            toast.error("Error fetching users.");
        }
    };
};

// Thunk to get user details
export const fetchUserDetailsAsync = ({ dispatch, userId, token }) => {
    return async () => {
        try {
            const URL = `${BASEURL}admin/dashboard/users/${userId}/details`;
            const response = await getAPICall(URL, true, token);
            console.log('git her 1');

            if (response?.data) {
                dispatch(getUserDetailsSuccess(response.data));
            } else {
                toast.error("Failed to fetch user details.");
            }
        } catch (error) {
            toast.error("Error fetching user details.");
        }
    };
};

// Thunk to add a user
export const addUserAsync = ({ dispatch, data, token, callbackFn }) => {
    return async () => {
        try {
            const URL = `${BASEURL}admin/dashboard/users/add-single`;
            const response = await postFileAPICall(URL, data, true, token);
            dispatch(addUserSuccess(response.data));
            callbackFn && callbackFn({ success: true, data: response.data });

        } catch (error) {
            callbackFn && callbackFn({ success: false, message: error.message || 'An error occurred' });
        }
    };
};


// Thunk to upload users in bulk
export const bulkUploadUsersAsync = ({ dispatch, formData, token, callbackFn }) => {
    return async () => {
        try {
            const URL = `${BASEURL}admin/dashboard/users/create-bulk`;
            const response = await postFileAPICall(URL, formData, true, token);
            console.log(response);
            if (response?.data.status == 200) {
                dispatch(bulkUploadSuccess(response.data));
                callbackFn && callbackFn(response.data); // Call the callback function if provided
            } else {
                toast.error("Failed to upload users in bulk.");
            }
        } catch (error) {
            toast.error("Error uploading users in bulk.");
        }
    };
};

// Thunk to update a user
export const updateUserAsync = ({ dispatch, userId, data, callbackFn, token }) => {
    return async () => {
        try {
            const URL = `${BASEURL}admin/dashboard/users/${userId}/edit`;
            const response = await postFileAPICall(URL, data, true, token);
            console.log('res', response)
            if (response?.data.data) {
                callbackFn && callbackFn(response.data);

                dispatch(updateUserSuccess(response.data));
                toast.success('Updated successfully')
            } 
        } catch (error) {
            toast.error("Error updating user.");
        }
    };
};

// Thunk to delete a user
export const deleteUserAsync = ({ dispatch, userId, token, callbackFn }) => {
    return async () => {
        try {
            const URL = `${BASEURL}admin/dashboard/users/${userId}/delete`;
            const response = await deleteAPICall(URL, {}, token);
            console.log('y', response.data);
            if (response?.data.message) {
                dispatch(deleteUserSuccess(response));
                toast.success("delete user success.");
            }
        } catch (error) {

        }
    };
};

// Thunk to deactivate a user
export const deactivateUserAsync = ({ dispatch, userId, token }) => {
    return async () => {
        try {
            const URL = `${BASEURL}admin/dashboard/users/${userId}/deactivate`;
            const response = await patchAPICall(URL, {}, true, token);
            if (response?.data.message) {
                // dispatch(deactivateUserSuccess({ id: userId }));
                // toast.success(response?.data.message);
            }
        } catch (error) {
            toast.error("Error deactivating user.");
        }
    };
};

// Thunk to fetch user subscriptions
export const fetchUserSubscriptionsAsync = ({ dispatch, userId, token }) => {
    return async () => {
        try {
            const URL = `${BASEURL}subscriptions/admin-user-subscriptions/${userId}`;
            const response = await getAPICall(URL, true, token);

            if (response?.data && response.data.status === 200) {
                dispatch(getUserSubscriptionsSuccess(response.data.data));
            } else {
                toast.error("Failed to fetch user subscriptions.");
            }
        } catch (error) {
            toast.error("Error fetching user subscriptions.");
        }
    };
};

export default userSlice.reducer;
