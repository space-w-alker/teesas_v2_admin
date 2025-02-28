import { createSlice } from "@reduxjs/toolkit";
import { postAPICall, getAPICall, postFileAPICall } from "../client/methodCalls";
import { toast } from "react-toastify";
import { config } from "../client/config";

const { BASEURL } = config;

export const questionsSlice = createSlice({
    name: "questions",
    initialState: {
        questionsList: [],
        addQuestionResponse: {},
        bulkUploadResponse: {},
        subjectsWithQuestions: {},
    },
    reducers: {
        listQuestionsSuccess: (state, action) => {
            state.questionsList = action.payload;
        },
        addQuestionSuccess: (state, action) => {
            state.addQuestionResponse = action.payload;
        },
        bulkUploadSuccess: (state, action) => {
            state.bulkUploadResponse = action.payload;
        },
        subjectsWithQuestionsSuccess: (state, action) => {
            state.subjectsWithQuestions = action.payload;
        },
    },
});

export const {
    listQuestionsSuccess,
    addQuestionSuccess,
    bulkUploadSuccess,
    subjectsWithQuestionsSuccess,
} = questionsSlice.actions;

// Thunk to add questions
export const addQuestionAsync = ({ dispatch, data, token, callbackFn }) => {
    return async () => {
        try {
            const URL = `${BASEURL}mock/add-questions`;
            const response = await postAPICall(URL, data, true, token);
            if (response?.data?.status === 200) {
                callbackFn && callbackFn(response.data);
                dispatch(addQuestionSuccess(response.data));
            } else {
                toast.error("Failed to add question.");
            }
        } catch (error) {
            toast.error("Error adding question.");
        }
    };
};

// Thunk to upload questions in bulk
export const bulkUploadAsync = ({ dispatch, formData, token, callbackFn }) => {
    return async () => {
        try {
            const URL = `${BASEURL}mock/add-questions-bulk`;
            const response = await postFileAPICall(URL, formData, true, token);
            if (response?.data?.status === 200) {
                callbackFn && callbackFn(response.data);
                dispatch(bulkUploadSuccess(response.data));
            } else {
                toast.error("Failed to upload questions in bulk.");
            }
        } catch (error) {
            toast.error("Error uploading questions in bulk.");
        }
    };
};

// Thunk to get subjects with questions
export const getSubjectsWithQuestionsAsync = ({ dispatch, data, token, callbackFn }) => {
    return async () => {
        try {
            const URL = `${BASEURL}mock/get-subject-with-question`;
            const response = await postAPICall(URL, data, true, token);
            if (response?.data?.status === 200) {
                callbackFn && callbackFn(response.data);
                dispatch(subjectsWithQuestionsSuccess(response.data));
            } else {
                toast.error("Failed to fetch subjects with questions.");
            }
        } catch (error) {
            toast.error("Error fetching subjects with questions.");
        }
    };
};

export default questionsSlice.reducer;
