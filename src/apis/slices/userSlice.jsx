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
    },
});

export const {
    listUsersSuccess,
    getUserDetailsSuccess,
    addUserSuccess,
    bulkUploadSuccess,
    updateUserSuccess,
    deleteUserSuccess,
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
            const response = await postAPICall(URL, data, true, token);
            console.log('test', response);
            if (response?.data.data) {
                callbackFn && callbackFn(response.data);
                dispatch(addUserSuccess(response.data));
                toast.success('User added successfully')

            } else {
                toast.error(response?.data.error);
            }
        } catch (error) {
            toast.error(error);
        }
    };
};

// Thunk to upload users in bulk
export const bulkUploadUsersAsync = ({ dispatch, formData, token }) => {
    return async () => {
        try {
            const URL = `${BASEURL}admin/dashboard/users/create-bulk`;
            const response = await postFileAPICall(URL, formData, true, token);
            console.log(201)
            if (response?.data) {
                dispatch(bulkUploadSuccess(response.data));
            } else {
                toast.error("Failed to upload users in bulk.");
            }
        } catch (error) {
            toast.error("Error uploading users in bulk.");
        }
    };
};

// Thunk to update a user
export const updateUserAsync = ({ dispatch, userId, data, token }) => {
    return async () => {
        try {
            const URL = `${BASEURL}admin/dashboard/users/${userId}/edit`;
            const response = await patchAPICall(URL, data, true, token);
            if (response?.data) {
                dispatch(updateUserSuccess(response.data));
            } else {
                toast.error("Failed to update user.");
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
            } else {
                toast.error("Failed to delete user.");
            }
        } catch (error) {
            toast.error("Error deleting user.");
        }
    };
};

export default userSlice.reducer;
