import { createSlice } from "@reduxjs/toolkit";
import { postAPICall, getAPICall, putAPICall, deleteAPICall } from "../client/methodCalls";
import { toast } from "react-toastify";
import { config } from "../client/config";

const { BASEURL } = config;

export const rolesSlice = createSlice({
    name: "roles",
    initialState: {
        // Roles
        roleDetails: {},
        rolesList: {
            roles: [],
            pagination: {
                totalItems: 0,
                totalPages: 0,
                currentPage: 1,
                limit: 10
            }
        },
        addRoleResponse: {},
        updateRoleResponse: {},
        deleteRoleResponse: {},

        // Permissions
        permissionsList: [],
        addRolePermissionResponse: {}, // Add this line
    },
    reducers: {
        // Role reducers
        getRoleDetailsSuccess: (state, action) => {
            state.roleDetails = action.payload;
        },
        listRolesSuccess: (state, action) => {
            state.rolesList = action.payload;
        },
        addRoleSuccess: (state, action) => {
            state.addRoleResponse = action.payload;
        },
        updateRoleSuccess: (state, action) => {
            state.updateRoleResponse = action.payload;
        },
        deleteRoleSuccess: (state, action) => {
            state.deleteRoleResponse = action.payload;
        },

        // Permissions reducers
        listPermissionsSuccess: (state, action) => {
            state.permissionsList = action.payload;
        },
        addRolePermissionSuccess: (state, action) => { // Add this reducer
            state.addRolePermissionResponse = action.payload;
        },

        // Reset state
        resetState: (state) => {
            // Roles
            state.roleDetails = {};
            state.rolesList = {
                roles: [],
                pagination: {
                    totalItems: 0,
                    totalPages: 0,
                    currentPage: 1,
                    limit: 10
                }
            };
            state.addRoleResponse = {};
            state.updateRoleResponse = {};
            state.deleteRoleResponse = {};

            // Permissions
            state.permissionsList = [];
            state.addRolePermissionResponse = {}; // Add this line
        },
    },
});

// ==================== ROLES THUNKS ====================

// Get Role Details
export const getRoleDetailsAsync = ({ dispatch, id, token, callbackFn }) => {
    return async () => {
        try {
            const URL = `${BASEURL}admin/roles/details?id=${id}`;
            const response = await getAPICall(URL, {}, token);
            if (response?.data?.status === 200) {
                dispatch(getRoleDetailsSuccess(response.data));
                callbackFn && callbackFn(response.data);
            } else {
                toast.error("Failed to fetch role details.");
            }
        } catch (error) {
            toast.error("Error fetching role details: " + error);
        }
    };
};

// Add Role
export const addRoleAsync = ({ dispatch, data, token, callbackFn }) => {
    return async () => {
        try {
            const URL = `${BASEURL}admin/roles/create`;
            const response = await postAPICall(URL, data, token);
            if (response.data?.status === 200) {
                dispatch(addRoleSuccess(response.data));
                toast.success("Role added successfully");
                callbackFn && callbackFn(response.data);
            } else {
                toast.error("Failed to add role.");
            }
        } catch (error) {
            toast.error("Error adding role: " + error);
        }
    };
};

// List Roles
export const listRolesAsync = ({ dispatch, page = 1, limit = 10, token, callbackFn }) => {
    return async () => {
        try {
            const URL = `${BASEURL}admin/roles/list?page=${page}&limit=${limit}`;
            const response = await getAPICall(URL, {}, token);
            if (response?.data?.status === 200) {
                dispatch(listRolesSuccess(response.data));
                callbackFn && callbackFn(response.data);
            } else {
                toast.error("Failed to fetch roles list.");
            }
        } catch (error) {
            toast.error("Error fetching roles list: " + error);
        }
    };
};

// Update Role
export const updateRoleAsync = ({ dispatch, id, data, token, callbackFn }) => {
    return async () => {
        try {
            const URL = `${BASEURL}admin/roles/update/${id}`;
            const response = await putAPICall(URL, data, false, token);
            if (response?.data?.status === 200) {
                dispatch(updateRoleSuccess(response.data));
                toast.success("Role updated successfully");
                callbackFn && callbackFn(response.data);
            } else {
                toast.error("Failed to update role.");
            }
        } catch (error) {
            toast.error("Error updating role: " + error);
        }
    };
};

// Delete Role
export const deleteRoleAsync = ({ dispatch, id, token, callbackFn }) => {
    return async () => {
        try {
            const URL = `${BASEURL}admin/roles/delete/${id}`;
            const response = await deleteAPICall(URL, {}, token);
            if (response?.data?.status === 200) {
                dispatch(deleteRoleSuccess(response.data));
                toast.success("Role deleted successfully");
                callbackFn && callbackFn(response.data);
            } else {
                toast.error("Failed to delete role.");
            }
        } catch (error) {
            toast.error("Error deleting role: " + error);
        }
    };
};

// Get All Permissions
export const listPermissionsAsync = ({ dispatch, token, callbackFn }) => {
    return async () => {
        try {
            const URL = `${BASEURL}admin/roles/permissions`;
            const response = await getAPICall(URL, {}, token);
            if (response?.data?.status === 200) {
                dispatch(listPermissionsSuccess(response.data));
                callbackFn && callbackFn(response.data);
            } else {
                toast.error("Failed to fetch permissions list.");
            }
        } catch (error) {
            toast.error("Error fetching permissions list: " + error);
        }
    };
};

// Add Role Permissions
export const addRolePermissionAsync = ({ dispatch, data, token, callbackFn }) => {
    return async () => {
        try {
            const URL = `${BASEURL}admin/roles/permissions/add`;
            const response = await postAPICall(URL, data, token);
            if (response.data?.status === 200) {
                dispatch(addRolePermissionSuccess(response.data));
                toast.success("Permissions added to role successfully");
                callbackFn && callbackFn(response.data);
            } else {
                toast.error("Failed to add permissions to role.");
            }
        } catch (error) {
            toast.error("Error adding permissions to role: " + error);
        }
    };
};

// Export all actions
export const {
    // Roles
    getRoleDetailsSuccess,
    listRolesSuccess,
    addRoleSuccess,
    updateRoleSuccess,
    deleteRoleSuccess,

    // Permissions
    listPermissionsSuccess,
    addRolePermissionSuccess, // Add this line

    // Reset
    resetState
} = rolesSlice.actions;

// Export selectors
// Roles
export const roleDetails = (state) => state.roles.roleDetails;
export const rolesList = (state) => state.roles.rolesList;
export const rolesItems = (state) => state.roles.rolesList.roles || [];
export const rolesPagination = (state) => state.roles.rolesList.pagination || {
    totalItems: 0,
    totalPages: 0,
    currentPage: 1,
    limit: 10
};
export const addRoleResponse = (state) => state.roles.addRoleResponse;
export const updateRoleResponse = (state) => state.roles.updateRoleResponse;
export const deleteRoleResponse = (state) => state.roles.deleteRoleResponse;

// Permissions
export const permissionsList = (state) => state.roles.permissionsList;
export const permissionsData = (state) => state.roles.permissionsList.data || [];
export const addRolePermissionResponse = (state) => state.roles.addRolePermissionResponse; // Add this selector

export default rolesSlice.reducer;