import { createSlice } from "@reduxjs/toolkit";
import { postAPICall, getAPICall, postFileAPICall, deleteAPICall } from "../client/methodCalls";
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
        deleteQuestionSuccess: (state, action) => {
            state.questionsList = state.questionsList.filter(
                (question) => question.class_id !== action.payload.class_id
            );
        },
        updateQuestionSuccess: (state, action) => {
            const updatedQuestions = state.questionsList.map((question) =>
                question.class_id === action.payload.class_id ? action.payload : question
            );
            state.questionsList = updatedQuestions;
        },
    },
});

export const {
    listQuestionsSuccess,
    addQuestionSuccess,
    bulkUploadSuccess,
    subjectsWithQuestionsSuccess,
    deleteQuestionSuccess,
    updateQuestionSuccess,
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

// Thunk to delete a question
export const deleteQuestionAsync = ({ dispatch, class_id, token, callbackFn }) => {
    return async () => {
        try {
            const URL = `${BASEURL}mock/delete/${class_id}`;
            const response = await deleteAPICall(URL, true, token);
            if (response?.data?.status === 200) {
                callbackFn && callbackFn(response.data);
                dispatch(deleteQuestionSuccess(response.data));
            } else {
                toast.error("Failed to delete question.");
            }
        } catch (error) {
            toast.error("Error deleting question.");
        }
    };
};

// Thunk to update a question
export const updateQuestionAsync = ({ dispatch, class_id, data, token, callbackFn }) => {
    return async () => {
        try {
            const URL = `${BASEURL}mock/update/${class_id}`;
            const response = await postAPICall(URL, data, true, token);
            console.log('trr', response);

            if (response?.data?.status == 200) {
                console.log('trr', response);
                callbackFn && callbackFn(response);
                dispatch(updateQuestionSuccess(response));
                // toast.success("Question updated successfully!");


            } else {
                // toast.error("Failed to update question.");
            }
        } catch (error) {
            toast.error("Error updating question.");
        }
    };
};

export default questionsSlice.reducer;
