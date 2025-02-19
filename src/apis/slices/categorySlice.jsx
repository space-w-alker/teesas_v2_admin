import { createSlice } from "@reduxjs/toolkit";
import { getAPICall } from "../client/methodCalls";
import { toast } from "react-toastify";
import { config } from "../client/config";

const { BASEURL } = config;

export const categorySlice = createSlice({
    name: "category",
    initialState: {
        categoryDetails: {},
        categoryList: [],
        classDetails: {},
        chapterList: [],
        lessonList: [],
    },
    reducers: {
        getCategoryDetailsSuccess: (state, action) => {
            state.categoryDetails = action.payload;
        },
        listCategoriesSuccess: (state, action) => {
            state.categoryList = action.payload;
        },
        getClassDetailsSuccess: (state, action) => {
            state.classDetails = action.payload;
        },
        listChaptersSuccess: (state, action) => {
            state.chapterList = action.payload;
        },
        listLessonsSuccess: (state, action) => {
            state.lessonList = action.payload;
        },
        resetState: (state) => {
            state.categoryDetails = {};
            state.categoryList = [];
        },
    },
});

// Thunk to fetch category details
export const getCategoryDetailsAsync = ({ dispatch, id, token }) => {
    return async () => {
        try {
            const URL = `${BASEURL}/admin/category/${id}/details`;
            const response = await getAPICall(URL, {}, token);
            if (response?.data?.status === 200) {
                dispatch(getCategoryDetailsSuccess(response.data));
            } else {
                toast.error("Failed to fetch category details.");
            }
        } catch (error) {
            toast.error("Error fetching category details.");
        }
    };
};

// Thunk to fetch category list
export const listCategoriesAsync = ({ dispatch, token }) => {
    return async () => {
        try {
            const URL = `${BASEURL}/admin/category/list`;
            const response = await getAPICall(URL, {}, token);
            if (response?.data?.status === 200) {
                dispatch(listCategoriesSuccess(response.data));
            } else {
                toast.error("Failed to fetch category list.");
            }
        } catch (error) {
            toast.error("Error fetching category list.");
        }
    };
};
export const getClassDetailsAsync = ({ dispatch, id, token }) => {
    return async () => {
        try {
            const URL = `${BASEURL}/admin/class/${id}/details`;
            const response = await getAPICall(URL, {}, token);
            if (response?.data?.status === 200) {
                dispatch(getClassDetailsSuccess(response.data));
            } else {
                toast.error("Failed to fetch class details.");
            }
        } catch (error) {
            toast.error("Error fetching class details." + error);
        }
    };
};

export const listChaptersAsync = ({ dispatch, id, token }) => {
    return async () => {
        try {
            const URL = `${BASEURL}/admin/chapter/list/${id}`;
            const response = await getAPICall(URL, {}, token);
            if (response?.data?.status === 200) {
                dispatch(listChaptersSuccess(response.data));
            } else {
                toast.error("Failed to fetch chapters.");
            }
        } catch (error) {
            toast.error("Error fetching chapters." + error);
        }
    };
};

export const listLessonsAsync = ({ dispatch, id, token }) => {
    return async () => {
        try {
            const URL = `${BASEURL}/admin/lesson/list/${id}`;
            const response = await getAPICall(URL, {}, token);
            if (response?.data?.status === 200) {
                dispatch(listLessonsSuccess(response.data));
            } else {
                toast.error("Failed to fetch lessons.");
            }
        } catch (error) {
            toast.error("Error fetching lessons." + error);
        }
    };
};

export const { getCategoryDetailsSuccess, listCategoriesSuccess, getClassDetailsSuccess, listChaptersSuccess, listLessonsSuccess, resetState } = categorySlice.actions;

export const categoryDetails = (state) => state.category.categoryDetails;
export const categoryList = (state) => state.category.categoryList;
export const chapterList = (state) => state.category.chapterList;
export const lessonList = (state) => state.category.lessonList;
export const classDetails = (state) => state.category.classDetails;

export default categorySlice.reducer;