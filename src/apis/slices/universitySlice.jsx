import { createSlice } from "@reduxjs/toolkit";
import { getAPICall, postFileAPICall, deleteAPICall, putAPICall } from "../client/methodCalls";
import { config } from "../client/config";
const {
    BASEURL,
    GET_UNIVERSITY,
    ADD_UNIVERSITY,
    UPDATE_UNIVERSITY,
    DELETE_UNIVERSITY
} = config;


const initialState = {
    universities: {
        isLoading: false,
        data: null,
        error: null
    },
    createUniversity: {
        isLoading: false,
        data: null,
        error: null
    },
    updateUniversity: {
        isLoading: false,
        data: null,
        error: null
    },
    deleteUniversity: {
        isLoading: false,
        data: null,
        error: null
    }
};

const universitySlice = createSlice({
    name: "university",
    initialState,
    reducers: {
        setUniversities: (state, action) => {
            state.universities = action.payload;
        },
        setCreateUniversity: (state, action) => {
            state.createUniversity = action.payload;
        },
        setUpdateUniversity: (state, action) => {
            state.updateUniversity = action.payload;
        },
        setDeleteUniversity: (state, action) => {
            state.deleteUniversity = action.payload;
        }
    },
});



export const getUniversitiesAsync = (page = 1, limit = 10) => async (dispatch) => {
    try {
        dispatch(setUniversities({ isLoading: true, data: null, error: null }));
        const URL = `${BASEURL}${GET_UNIVERSITY}?page=${page}&limit=${limit}`;
        const result = await getAPICall(URL);

        if (result?.data?.status === 200) {
            dispatch(setUniversities({
                isLoading: false,
                data: {
                    universities: result.data.data.universities,
                    pagination: result.data.data.pagination
                },
                error: null
            }));
            return result.data;
        } else {
            throw new Error(result?.data?.message || 'Failed to fetch universities list');
        }
    } catch (error) {
        dispatch(setUniversities({ isLoading: false, data: null, error: error.message }));
        return { error: error.message };
    }
};


export const createUniversityAsync = (formData) => async (dispatch) => {
    try {
        dispatch(setCreateUniversity({ isLoading: true, data: null, error: null }));

        const URL = `${BASEURL}${ADD_UNIVERSITY}`;


        const result = await postFileAPICall(URL, formData);
        if (result?.data?.status === 200 || result?.data?.status === 201) {
            dispatch(setCreateUniversity({
                isLoading: false,
                data: result.data.data,
                error: null
            }));
            return { success: true, data: result.data };
        } else {
            throw new Error(result?.data?.message || 'Failed to create university');
        }
    } catch (error) {
        if (error.message && error.message.toLowerCase().includes('success')) {
            dispatch(setCreateUniversity({
                isLoading: false,
                data: error.response?.data?.data || null,
                error: null
            }));
            return { success: true, message: error.message };
        }

        console.error("Error creating university:", error);
        dispatch(setCreateUniversity({
            isLoading: false,
            data: null,
            error: error.message || "Unknown error occurred"
        }));
        return { error: error.message || "Unknown error occurred" };
    }
};



export const updateUniversityAsync = (id, formData) => async (dispatch) => {
    try {
        dispatch(setUpdateUniversity({ isLoading: true, data: null, error: null }));
        const URL = `${BASEURL}${UPDATE_UNIVERSITY}/${id}`;
        const updateData = {};
        for (let [key, value] of formData.entries()) {

            if (!(value instanceof File)) {
                updateData[key] = value;
            }
        }
        const result = await putAPICall(URL, updateData);

        if (result?.data?.message === "University updated successfully") {
            dispatch(setUpdateUniversity({
                isLoading: false,
                data: result.data.data,
                error: null
            }));
            dispatch(getUniversitiesAsync());

            return { success: true, data: result.data };
        } else {
            throw new Error(result?.data?.message || 'Failed to update university');
        }
    } catch (error) {
        console.error("Error updating university:", error);
        dispatch(setUpdateUniversity({
            isLoading: false,
            data: null,
            error: error.message || "Unknown error occurred"
        }));
        return { error: error.message || "Unknown error occurred" };
    }
};


export const deleteUniversityAsync = (id) => async (dispatch) => {
    try {
        dispatch(setDeleteUniversity({ isLoading: true, data: null, error: null }));

        const URL = `${BASEURL}${DELETE_UNIVERSITY}/${id}`;

        const result = await deleteAPICall(URL);

        if (result?.data?.status === 200 || result?.data?.status === 201) {
            dispatch(setDeleteUniversity({
                isLoading: false,
                data: result.data.data,
                error: null
            }));
            dispatch(getUniversitiesAsync());

            return { success: true, data: result.data };
        } else {
            throw new Error(result?.data?.message || 'Failed to delete university');
        }
    } catch (error) {
        if (error.message && error.message.toLowerCase().includes('success')) {
            dispatch(setDeleteUniversity({
                isLoading: false,
                data: error.response?.data?.data || null,
                error: null
            }));
            dispatch(getUniversitiesAsync());

            return { success: true, message: error.message };
        }

        console.error("Error deleting university:", error);
        dispatch(setDeleteUniversity({
            isLoading: false,
            data: null,
            error: error.message || "Unknown error occurred"
        }));
        return { error: error.message || "Unknown error occurred" };
    }
};

export const {
    setUniversities,
    setCreateUniversity,
    setUpdateUniversity,
    setDeleteUniversity
} = universitySlice.actions;

export default universitySlice.reducer;