import { createSlice } from "@reduxjs/toolkit";
import {
    getAPICall,
    postAPICall,
    deleteAPICall,
    putAPICall,
} from "../client/methodCalls";
import { config } from "../client/config";

const { BASEURL } = config;

const initialState = {
    courses: {
        isLoading: false,
        response: null,
    },
    addCourse: {
        isLoading: false,
        response: null,
    },
    courseParticipants: {
        isLoading: false,
        response: null,
    },
    addParticipant: {
        isLoading: false,
        response: null,
    },
    participantDetails: {
        isLoading: false,
        response: null,
    },
    updateParticipant: {
        isLoading: false,
        response: null,
    },
    deleteParticipant: {
        isLoading: false,
        response: null,
    },
    participantStats: {
        isLoading: false,
        response: null,
    },
    toggleParticipantStatus: {
        isLoading: false,
        response: null,
    },
    deleteCourse: {
        isLoading: false,
        response: null,
    },

};

export const learningCenterSlice = createSlice({
    name: "learningCenter",
    initialState,
    reducers: {
        getCourses: (state, action) => {
            state.courses = action.payload;
        },
        addCourse: (state, action) => {
            state.addCourse = action.payload;
        },
        getCourseParticipants: (state, action) => {
            state.courseParticipants = action.payload;
        },
        addParticipant: (state, action) => {
            state.addParticipant = action.payload;
        },
        getParticipantDetails: (state, action) => {
            state.participantDetails = action.payload;
        },
        updateParticipant: (state, action) => {
            state.updateParticipant = action.payload;
        },
        deleteParticipant: (state, action) => {
            state.deleteParticipant = action.payload;
        },
        getParticipantStats: (state, action) => {
            state.participantStats = action.payload;
        },
        toggleParticipantStatus: (state, action) => {
            state.toggleParticipantStatus = action.payload;
        },
        deleteCourse: (state, action) => {
            state.deleteCourse = action.payload;
        },
    },
});

export const getCoursesAsync = async ({ dispatch, callbackFn, data, token }) => {
    try {
        dispatch(getCourses({ isLoading: true, response: null }));
        const URL = `${BASEURL}learning-center/courses`;

        const result = await getAPICall(URL, data, token);
        callbackFn && callbackFn(result);

        dispatch(getCourses({ isLoading: false, response: result.data }));
        return result;
    } catch (err) {
        dispatch(getCourses({ isLoading: false }));
        console.error("Error fetching courses:", err);
    }
};

export const addCourseAsync = async ({ dispatch, callbackFn, data, token }) => {
    try {
        dispatch(addCourse({ isLoading: true, response: null }));
        const URL = `${BASEURL}learning-center/add-course`;

        const result = await postAPICall(URL, data, token);
        callbackFn && callbackFn(result);

        dispatch(addCourse({ isLoading: false, response: result.data }));
        return result;
    } catch (err) {
        dispatch(addCourse({ isLoading: false }));
        console.error("Error adding course:", err);
    }
};

export const getCourseParticipantsAsync = async ({ dispatch, callbackFn, courseId, data, token }) => {
    try {
        dispatch(getCourseParticipants({ isLoading: true, response: null }));
        const URL = `${BASEURL}learning-center/course/participants/${courseId}`;

        const result = await getAPICall(URL, data, token);
        callbackFn && callbackFn(result);

        dispatch(getCourseParticipants({ isLoading: false, response: result.data }));
        return result;
    } catch (err) {
        dispatch(getCourseParticipants({ isLoading: false }));
        console.error("Error fetching course participants:", err);
    }
};


export const addParticipantAsync = async ({ dispatch, callbackFn, data, token }) => {
    try {
        dispatch(addParticipant({ isLoading: true, response: null }));
        const URL = `${BASEURL}learning-center/add-participant`;

        const result = await postAPICall(URL, data, token);
        callbackFn && callbackFn(result);

        dispatch(addParticipant({ isLoading: false, response: result.data }));
        return result;
    } catch (err) {
        dispatch(addParticipant({ isLoading: false }));
        console.error("Error adding participant:", err);
    }
};

export const updateParticipantAsync = async ({ dispatch, callbackFn, participantId, data, token }) => {
    try {
        dispatch(updateParticipant({ isLoading: true, response: null }));
        const URL = `${BASEURL}learning-center/participant/${participantId}`;

        const result = await putAPICall(URL, data, token);
        callbackFn && callbackFn(result);

        dispatch(updateParticipant({ isLoading: false, response: result.data }));
        return result;
    } catch (err) {
        dispatch(updateParticipant({ isLoading: false }));
        console.error("Error updating participant:", err);
    }
};

export const deleteParticipantAsync = async ({ dispatch, callbackFn, participantId, token }) => {
    try {
        dispatch(deleteParticipant({ isLoading: true, response: null }));
        const URL = `${BASEURL}learning-center/participant/${participantId}`;

        const result = await deleteAPICall(URL, token);
        callbackFn && callbackFn(result);

        dispatch(deleteParticipant({ isLoading: false, response: result.data }));
        return result;
    } catch (err) {
        dispatch(deleteParticipant({ isLoading: false }));
        console.error("Error deleting participant:", err);
    }
};

// New function to get participant stats
export const getParticipantStatsAsync = async ({ dispatch, callbackFn, token }) => {
    try {
        dispatch(getParticipantStats({ isLoading: true, response: null }));
        const URL = `${BASEURL}learning-center/participant-stats`;

        const result = await getAPICall(URL, {}, token);
        callbackFn && callbackFn(result);

        dispatch(getParticipantStats({ isLoading: false, response: result.data }));
        return result;
    } catch (err) {
        dispatch(getParticipantStats({ isLoading: false }));
        console.error("Error fetching participant stats:", err);
    }
};

export const getParticipantDetailsAsync = async ({ dispatch, callbackFn, participantId, token }) => {
    try {
        dispatch(getParticipantDetails({ isLoading: true, response: null }));
        const URL = `${BASEURL}learning-center/participant/${participantId}`;

        const result = await getAPICall(URL, {}, token);
        callbackFn && callbackFn(result);

        dispatch(getParticipantDetails({ isLoading: false, response: result.data }));
        return result;
    } catch (err) {
        dispatch(getParticipantDetails({ isLoading: false }));
        console.error("Error fetching participant details:", err);
    }
};

export const toggleParticipantStatusAsync = async ({ dispatch, callbackFn, participantId, token }) => {
    try {
        dispatch(toggleParticipantStatus({ isLoading: true, response: null }));
        const URL = `${BASEURL}learning-center/participant/toggle-status/${participantId}`;

        const result = await postAPICall(URL, {}, token);
        callbackFn && callbackFn(result);

        dispatch(toggleParticipantStatus({ isLoading: false, response: result.data }));
        return result;
    } catch (err) {
        dispatch(toggleParticipantStatus({ isLoading: false }));
        console.error("Error toggling participant status:", err);
    }
};

export const deleteCourseAsync = async ({ dispatch, callbackFn, courseId, token }) => {
    try {
        dispatch(deleteCourse({ isLoading: true, response: null }));
        const URL = `${BASEURL}learning-center/delete-course/${courseId}`;

        const result = await postAPICall(URL, {}, token);
        callbackFn && callbackFn(result);

        dispatch(deleteCourse({ isLoading: false, response: result.data }));
        return result;
    } catch (err) {
        dispatch(deleteCourse({ isLoading: false }));
        console.error("Error deleting course:", err);
    }
};

export const {
    getCourses,
    addCourse,
    getCourseParticipants,
    addParticipant,
    getParticipantDetails,
    updateParticipant,
    deleteParticipant,
    getParticipantStats,
    toggleParticipantStatus,
    deleteCourse
} = learningCenterSlice.actions;

export default learningCenterSlice.reducer;
