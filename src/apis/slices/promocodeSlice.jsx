import { createSlice } from "@reduxjs/toolkit";
import { getAPICall, postAPICall, deleteAPICall } from "../client/methodCalls";
import { toast } from "react-toastify";

import { config } from "../client/config";

const { BASEURL } = config;
export const promocodeSlice = createSlice({
    name: "promocode",
    initialState: {
        getPromocodesResponse: {
            isLoading: false,
            data: [],
            paging: { page: 1, totalPages: 1, total: 0 },
            error: null
        },
        addPromocodeResponse: {
            isLoading: false,
            data: null,
            error: null,
            success: false
        },
        deletePromocodeResponse: {
            isLoading: false,
            success: false,
            error: null
        },
        getClassesByCourseResponse: {
            isLoading: false,
            data: [],
            error: null
        },
        getPlansByClassResponse: {
            isLoading: false,
            data: [],
            error: null
        },
        getCoursesResponse: {
            isLoading: false,
            data: [],
            error: null
        },
        getCountriesResponse: {
            isLoading: false,
            data: [],
            error: null
        }
    },
    reducers: {
        setPromocodes: (state, action) => {
            state.getPromocodesResponse = action.payload;
        },
        setAddPromocode: (state, action) => {
            state.addPromocodeResponse = action.payload;
        },
        setClassesByCourse: (state, action) => {
            state.getClassesByCourseResponse = action.payload;
        },
        setPlansByClass: (state, action) => {
            state.getPlansByClassResponse = action.payload;
        },
        setCourses: (state, action) => {
            state.getCoursesResponse = action.payload;
        },
        setCountries: (state, action) => {
            state.getCountriesResponse = action.payload;
        },
        resetAddPromocode: (state) => {
            state.addPromocodeResponse = {
                isLoading: false,
                data: null,
                error: null,
                success: false
            };
        },
        setDeletePromocode: (state, action) => {
            state.deletePromocodeResponse = action.payload;
        },
        resetDeletePromocode: (state) => {
            state.deletePromocodeResponse = {
                isLoading: false,
                success: false,
                error: null
            };
        }
    },
});


export const {
    setPromocodes,
    setAddPromocode,
    setClassesByCourse,
    setPlansByClass,
    setDeletePromocode,
    setCourses,
    setCountries,
    resetAddPromocode,
    resetDeletePromocode
} = promocodeSlice.actions;

// Get all promocodes
export const getPromocodesAsync = ({ dispatch, data, token, callbackFn }) => {
    try {
        dispatch(setPromocodes({ isLoading: true, data: [], paging: null, error: null }));

        const { page = 1, limit = 10, search = '' } = data || {};
        const URL = `${BASEURL}promocodes/list?page=${page}&limit=${limit}${search ? `&search=${search}` : ''}`;

        getAPICall(URL, {}, token)
            .then(result => {
                if (result?.data?.status === 200) {
                    dispatch(setPromocodes({
                        isLoading: false,
                        data: result.data.data.data || [],
                        paging: {
                            total: result.data.data.total || 0,
                            page: result.data.data.page || 1,
                            limit: result.data.data.limit || 10
                        },
                        error: null
                    }));
                } else {
                    dispatch(setPromocodes({
                        isLoading: false,
                        data: [],
                        paging: { page: 1, limit: 10, total: 0 },
                        error: result?.data?.message || "Failed to fetch promocodes"
                    }));
                }
                if (callbackFn) callbackFn(result);
            })
            .catch(error => {
                dispatch(setPromocodes({
                    isLoading: false,
                    data: [],
                    paging: { page: 1, limit: 10, total: 0 },
                    error: error.message
                }));
                if (callbackFn) callbackFn({ error });
            });
    } catch (error) {
        dispatch(setPromocodes({
            isLoading: false,
            data: [],
            paging: { page: 1, limit: 10, total: 0 },
            error: error.message
        }));
        if (callbackFn) callbackFn({ error });
    }
};

// Create a new promocode
export const addPromocodeAsync = ({ dispatch, body, token, callbackFn }) => {
    try {
        dispatch(setAddPromocode({ isLoading: true, data: null, error: null, success: false }));

        const URL = `${BASEURL}promocodes/create`;

        postAPICall(URL, body, token)
            .then(result => {
                if (result?.data?.status === 201) {
                    dispatch(setAddPromocode({
                        isLoading: false,
                        data: result.data.data,
                        error: null,
                        success: true
                    }));
                } else {
                    dispatch(setAddPromocode({
                        isLoading: false,
                        data: null,
                        error: result?.data?.message || "Failed to create promocode",
                        success: false
                    }));
                }
                if (callbackFn) callbackFn(result);
            })
            .catch(error => {
                dispatch(setAddPromocode({
                    isLoading: false,
                    data: null,
                    error: error.message,
                    success: false
                }));
                if (callbackFn) callbackFn({ error });
            });
    } catch (error) {
        dispatch(setAddPromocode({
            isLoading: false,
            data: null,
            error: error.message,
            success: false
        }));
        if (callbackFn) callbackFn({ error });
    }
};

// Get classes by course ID
export const getClassesByCourseAsync = ({ dispatch, courseId, token, callbackFn }) => {
    try {
        dispatch(setClassesByCourse({ isLoading: true, data: [], error: null }));

        const URL = `${BASEURL}promocodes/classes/${courseId}`;

        getAPICall(URL, {}, token)
            .then(result => {
                if (result?.data?.status === 200) {
                    dispatch(setClassesByCourse({
                        isLoading: false,
                        data: result.data.data || [],
                        error: null
                    }));
                } else {
                    dispatch(setClassesByCourse({
                        isLoading: false,
                        data: [],
                        error: result?.data?.message || "Failed to fetch classes"
                    }));
                }
                if (callbackFn) callbackFn(result);
            })
            .catch(error => {
                dispatch(setClassesByCourse({
                    isLoading: false,
                    data: [],
                    error: error.message
                }));
                if (callbackFn) callbackFn({ error });
            });
    } catch (error) {
        dispatch(setClassesByCourse({
            isLoading: false,
            data: [],
            error: error.message
        }));
        if (callbackFn) callbackFn({ error });
    }
};

// Get plans by class ID
export const getPlansByClassAsync = ({ dispatch, classId, token, callbackFn }) => {
    try {
        dispatch(setPlansByClass({ isLoading: true, data: [], error: null }));

        const URL = `${BASEURL}promocodes/plans/${classId}`;

        getAPICall(URL, {}, token)
            .then(result => {
                if (result?.data?.status === 200) {
                    dispatch(setPlansByClass({
                        isLoading: false,
                        data: result.data.data || [],
                        error: null
                    }));
                } else {
                    dispatch(setPlansByClass({
                        isLoading: false,
                        data: [],
                        error: result?.data?.message || "Failed to fetch plans"
                    }));
                }
                if (callbackFn) callbackFn(result);
            })
            .catch(error => {
                dispatch(setPlansByClass({
                    isLoading: false,
                    data: [],
                    error: error.message
                }));
                if (callbackFn) callbackFn({ error });
            });
    } catch (error) {
        dispatch(setPlansByClass({
            isLoading: false,
            data: [],
            error: error.message
        }));
        if (callbackFn) callbackFn({ error });
    }
};

// Get all courses
export const getCoursesAsync = ({ dispatch, token, callbackFn }) => {
    try {
        dispatch(setCourses({ isLoading: true, data: [], error: null }));

        const URL = `${BASEURL}promocodes/courses`;

        getAPICall(URL, {}, token)
            .then(result => {
                if (result?.data?.status === 200) {
                    dispatch(setCourses({
                        isLoading: false,
                        data: result.data.data || [],
                        error: null
                    }));
                } else {
                    dispatch(setCourses({
                        isLoading: false,
                        data: [],
                        error: result?.data?.message || "Failed to fetch courses"
                    }));
                }
                if (callbackFn) callbackFn(result);
            })
            .catch(error => {
                dispatch(setCourses({
                    isLoading: false,
                    data: [],
                    error: error.message
                }));
                if (callbackFn) callbackFn({ error });
            });
    } catch (error) {
        dispatch(setCourses({
            isLoading: false,
            data: [],
            error: error.message
        }));
        if (callbackFn) callbackFn({ error });
    }
};

// Get all countries
export const getCountriesAsync = ({ dispatch, token, callbackFn }) => {
    try {
        dispatch(setCountries({ isLoading: true, data: [], error: null }));

        const URL = `${BASEURL}utils/get-countries`;

        getAPICall(URL, {}, token)
            .then(result => {
                if (result?.data?.status === 200) {
                    // Update this line to access the nested countries array
                    dispatch(setCountries({
                        isLoading: false,
                        data: result.data.data.countries || [], // Access the nested countries array
                        error: null
                    }));
                } else {
                    dispatch(setCountries({
                        isLoading: false,
                        data: [],
                        error: result?.data?.message || "Failed to fetch countries"
                    }));
                }
                if (callbackFn) callbackFn(result);
            })
            .catch(error => {
                dispatch(setCountries({
                    isLoading: false,
                    data: [],
                    error: error.message
                }));
                if (callbackFn) callbackFn({ error });
            });
    } catch (error) {
        dispatch(setCountries({
            isLoading: false,
            data: [],
            error: error.message
        }));
        if (callbackFn) callbackFn({ error });
    }
};

// Delete a promo code
export const deletePromocodeAsync = ({ dispatch, id, token, callbackFn }) => {
    try {
        dispatch(setDeletePromocode({ isLoading: true, success: false, error: null }));

        const URL = `${BASEURL}promocodes/${id}`;

        deleteAPICall(URL, token)
            .then(result => {
                if (result?.data?.status === 200) {
                    dispatch(setDeletePromocode({
                        isLoading: false,
                        success: true,
                        error: null
                    }));
                    // Show success toast
                    toast.success("Promo code deleted successfully");
                } else {
                    dispatch(setDeletePromocode({
                        isLoading: false,
                        success: false,
                        error: result?.data?.message || "Failed to delete promo code"
                    }));
                    // Show error toast
                    toast.error(result?.data?.message || "Failed to delete promo code");
                }
                if (callbackFn) callbackFn(result);
            })
            .catch(error => {
                dispatch(setDeletePromocode({
                    isLoading: false,
                    success: false,
                    error: error.message
                }));
                // Show error toast
                toast.error(error.message || "An error occurred");
                if (callbackFn) callbackFn({ error });
            });
    } catch (error) {
        dispatch(setDeletePromocode({
            isLoading: false,
            success: false,
            error: error.message
        }));
        // Show error toast
        toast.error(error.message || "An error occurred");
        if (callbackFn) callbackFn({ error });
    }
};



// Selectors
export const selectPromocodes = (state) => state.promocode.getPromocodesResponse;
export const selectAddPromocode = (state) => state.promocode.addPromocodeResponse;
export const selectClassesByCourse = (state) => state.promocode.getClassesByCourseResponse;
export const selectPlansByClass = (state) => state.promocode.getPlansByClassResponse;
export const selectCourses = (state) => state.promocode.getCoursesResponse;
export const selectCountries = (state) => state.promocode.getCountriesResponse;
export const selectDeletePromocode = (state) => state.promocode.deletePromocodeResponse;


export default promocodeSlice.reducer;
